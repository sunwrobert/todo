# Todo App Specification v0.1.0 [2026-01-03]

This document is **normative**. The words **MUST**, **SHOULD**, and **MAY** express requirement levels per RFC 2119.

## 1. Scope

This specification defines a task management application similar to Google Tasks with the following capabilities:

- **Task lists** containing ordered tasks
- **Unified storage interface** via Effect-TS services (local and remote implementations)
- **Real-time synchronization** across browser tabs and devices
- **Offline-first** architecture with automatic sync when online
- **Authentication** via Better Auth (Google sign-in)

Out of scope for v0.1.0:

- Subtasks / nested tasks
- Due dates, reminders, notifications
- Task notes or attachments
- Sharing / collaboration
- Mobile native apps
- Multiple account support (single Google account per browser)

## 2. Terminology

- **User**: An authenticated or anonymous user of the application.
- **List**: A named collection of tasks owned by a user.
- **Task**: A single todo item belonging to exactly one list.
- **Default List**: A system-created list for each user, cannot be deleted.
- **Storage**: The persistence layer (local or remote).
- **Sync Channel**: The real-time communication mechanism (BroadcastChannel for local, WebSocket/SSE for remote).

## 3. Data Model

### 3.1 User

| Field       | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| `id`        | `string` | Unique identifier (CUID2)           |
| `email`     | `string` | User email (nullable for anonymous) |
| `name`      | `string` | Display name (nullable)             |
| `createdAt` | `Date`   | Account creation timestamp          |
| `updatedAt` | `Date`   | Last update timestamp               |

### 3.2 List

| Field       | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| `id`        | `string`  | Unique identifier (CUID2)               |
| `userId`    | `string`  | Owner's user ID                         |
| `name`      | `string`  | List name (1-255 characters)            |
| `isDefault` | `boolean` | Whether this is the user's default list |
| `position`  | `number`  | Sort order among user's lists           |
| `createdAt` | `Date`    | Creation timestamp                      |
| `updatedAt` | `Date`    | Last update timestamp                   |

Constraints:

- A user MUST have exactly one list where `isDefault = true`.
- `name` MUST NOT be empty.
- `name` MUST be at most 255 characters.
- Duplicate list names ARE allowed.
- `position` SHOULD be unique per user (used for ordering).
- A user MUST NOT have more than **20 lists** (hard limit for v0.1.0).

### 3.3 Task

| Field       | Type      | Description                   |
| ----------- | --------- | ----------------------------- |
| `id`        | `string`  | Unique identifier (CUID2)     |
| `listId`    | `string`  | Parent list ID                |
| `content`   | `string`  | Task text (1-4096 characters) |
| `completed` | `boolean` | Whether the task is done      |
| `position`  | `number`  | Sort order within the list    |
| `createdAt` | `Date`    | Creation timestamp            |
| `updatedAt` | `Date`    | Last update timestamp         |

Constraints:

- A task MUST belong to exactly one list.
- `content` MUST NOT be empty.
- `content` MUST be plain text only (HTML/special characters escaped on display).
- `content` exceeding 4096 characters MUST be blocked with an inline validation error.
- `position` SHOULD be unique per list (used for ordering).
- A list MUST NOT have more than **500 tasks** (hard limit for v0.1.0).
- Any mutation (including completion toggle) MUST update `updatedAt`.

## 4. Storage Interface (Effect-TS)

### 4.1 Design Principle

The storage layer MUST be abstracted behind Effect-TS services. Consumers MUST NOT know whether they are using local (IndexedDB) or remote (API) storage.

### 4.2 Service Definition

```typescript
interface TodoStorage {
  // Lists
  readonly createList: (params: CreateListParams) => Effect<List, StorageError>
  readonly getList: (id: string) => Effect<List, StorageError | NotFoundError>
  readonly getLists: () => Effect<readonly List[], StorageError>
  readonly updateList: (id: string, params: UpdateListParams) => Effect<List, StorageError | NotFoundError>
  readonly deleteList: (id: string) => Effect<void, StorageError | NotFoundError | DefaultListError>

  // Tasks
  readonly createTask: (params: CreateTaskParams) => Effect<Task, StorageError>
  readonly getTask: (id: string) => Effect<Task, StorageError | NotFoundError>
  readonly getTasks: (listId: string) => Effect<readonly Task[], StorageError>
  readonly updateTask: (id: string, params: UpdateTaskParams) => Effect<Task, StorageError | NotFoundError>
  readonly deleteTask: (id: string) => Effect<void, StorageError | NotFoundError>
  readonly moveTask: (id: string, targetListId: string) => Effect<Task, StorageError | NotFoundError>
}
```

### 4.3 Error Types

| Error              | Description                            |
| ------------------ | -------------------------------------- |
| `StorageError`     | Generic storage failure                |
| `NotFoundError`    | Requested entity does not exist        |
| `DefaultListError` | Attempted to delete a default list     |
| `ValidationError`  | Input validation failed                |
| `LimitError`       | Entity limit exceeded (lists or tasks) |

### 4.4 Implementations

Two implementations MUST be provided:

1. **LocalStorage**: Uses IndexedDB via `idb` or similar. MUST work offline.
2. **RemoteStorage**: Uses oRPC calls to the server API.

The active implementation MUST be selected based on:

- User authentication state
- Network connectivity

### 4.5 Position Management

When reordering items (tasks or lists):

- All items MUST be reindexed with clean integer positions (1, 2, 3, ...).
- This ensures predictable ordering and avoids fractional position drift.
- Reindexing generates sync events for all affected items.

### 4.6 Storage Initialization

If IndexedDB initialization fails (e.g., quota exceeded, permission denied):

- The app MUST fall back to in-memory storage.
- The app MUST display a persistent warning that data will not be saved.
- The app MUST remain functional for the session.

## 5. Synchronization

### 5.1 Sync Events

All mutations MUST emit sync events. Events MUST include the full entity data (no additional fetches required):

```typescript
type SyncEvent =
  | { type: "list:created"; list: List }
  | { type: "list:updated"; list: List }
  | { type: "list:deleted"; listId: string }
  | { type: "task:created"; task: Task }
  | { type: "task:updated"; task: Task }
  | { type: "task:deleted"; taskId: string }
  | { type: "task:moved"; task: Task; fromListId: string }
```

### 5.2 Local Sync (Offline / Anonymous)

When the user is offline or not authenticated:

- The application MUST use `BroadcastChannel` API for cross-tab sync.
- All mutations MUST be broadcast to other tabs in the same origin.
- Receiving tabs MUST update their local state accordingly.

Channel name: `todo-sync`

### 5.3 Remote Sync (Online / Authenticated)

When the user is online and authenticated:

- The server MUST provide a real-time channel (WebSocket or SSE).
- Mutations MUST be pushed to all connected clients for the same user.
- The client MUST subscribe on authentication and reconnect on disconnect.
- BroadcastChannel MUST be disabled when WebSocket is active (no dual sync).

### 5.4 Conflict Resolution

For v0.1.0, **last-write-wins** (LWW) strategy with delete precedence:

- The `updatedAt` timestamp determines the winning write for updates.
- **Deletions always win** regardless of timestamp (if device A deletes and device B updates, the entity stays deleted).
- Clients MUST accept server state as authoritative on conflict.

Future versions MAY implement CRDT-based merging.

### 5.5 Offline Queue

When offline, the client:

- MUST queue mutations locally.
- MUST replay queued mutations when connectivity is restored.
- MUST handle failures with exponential backoff (max **30 seconds**).
- If a mutation fails permanently (e.g., target list was deleted):
  - MUST show a toast notification explaining the failure.
  - MUST discard the failed mutation and continue with the queue.
  - MUST NOT block on user input.

### 5.6 Reconnection Sync

When WebSocket reconnects after a disconnect:

- The client MUST track a `lastSyncCursor` (timestamp of last received event).
- On reconnect, the client MUST request delta changes since `lastSyncCursor`.
- The server MUST return all events since that timestamp.
- Local pending changes MUST be preserved and replayed after sync.

## 6. API (oRPC)

### 6.1 Procedures

The server MUST expose the following oRPC procedures under the `todo` namespace:

#### Lists

| Procedure         | Input                      | Output   | Auth     |
| ----------------- | -------------------------- | -------- | -------- |
| `todo.createList` | `{ name: string }`         | `List`   | Required |
| `todo.getList`    | `{ id: string }`           | `List`   | Required |
| `todo.getLists`   | `{}`                       | `List[]` | Required |
| `todo.updateList` | `{ id, name?, position? }` | `List`   | Required |
| `todo.deleteList` | `{ id: string }`           | `void`   | Required |

#### Tasks

| Procedure         | Input                                     | Output   | Auth     |
| ----------------- | ----------------------------------------- | -------- | -------- |
| `todo.createTask` | `{ listId, content }`                     | `Task`   | Required |
| `todo.getTask`    | `{ id: string }`                          | `Task`   | Required |
| `todo.getTasks`   | `{ listId: string }`                      | `Task[]` | Required |
| `todo.updateTask` | `{ id, content?, completed?, position? }` | `Task`   | Required |
| `todo.deleteTask` | `{ id: string }`                          | `void`   | Required |
| `todo.moveTask`   | `{ id, targetListId }`                    | `Task`   | Required |

### 6.2 Real-time Endpoint

| Endpoint         | Protocol  | Description                |
| ---------------- | --------- | -------------------------- |
| `/api/todo/sync` | WebSocket | Bidirectional sync channel |

Alternative: SSE at `/api/todo/events` (receive-only, mutations via oRPC).

### 6.3 Data Fetching

- All tasks for a list MUST be fetched in a single request (no pagination for v0.1.0).
- Given the 500 task limit per list, this is acceptable for performance.

## 7. Authentication

### 7.1 Provider

Authentication MUST use Better Auth with Google OAuth provider.

Single Google account per browser (no account switcher in v0.1.0).

### 7.2 Anonymous Mode

- Users MAY use the app without signing in.
- Anonymous users MUST have data stored locally only (IndexedDB).
- Upon sign-in, if local anonymous data exists:
  - The app MUST prompt the user to migrate or discard local data.
  - If user declines migration: local data is preserved but inaccessible while signed in.
  - Local data remains available if the user signs out.
  - Server data and local anonymous data are kept completely separate.

### 7.3 Session

- Sessions MUST be managed by Better Auth.
- The client MUST include session credentials with all authenticated requests.
- On session expiry:
  - The client MUST attempt silent token refresh automatically.
  - If refresh fails, prompt user to re-authenticate.
  - Pending offline changes MUST be preserved during re-authentication.

## 8. User Interface

### 8.1 Overall Layout

The app follows a Google Tasks-inspired design:

```
+------------------+----------------------------------------+
|     SIDEBAR      |              MAIN CONTENT              |
+------------------+----------------------------------------+
| [+ Create]       |  +--------+  +--------+  +--------+   |
|                  |  | List 1 |  | List 2 |  | List 3 |   |
| v My Lists       |  |        |  |        |  |        |   |
|   > My Tasks (3) |  | Tasks  |  | Tasks  |  | Tasks  |   |
|   > Work (5)     |  |        |  |        |  |        |   |
|   > Shopping (2) |  +--------+  +--------+  +--------+   |
|                  |  +--------+                           |
| [+ New List]     |  | List 4 |  (flows under List 1)     |
|                  |  +--------+                           |
+------------------+----------------------------------------+
```

### 8.2 Sidebar

- **Create button** (top): Opens a modal with task name input and list dropdown selector.
- **Collapsible "My Lists" section**: Shows all user lists.
- **List items**: Display list name with incomplete task count badge (e.g., "Work (5)").
- **"+ New List" button** (bottom): Opens modal with name input field.

### 8.3 Main Content Area

- **3-column masonry layout** (Pinterest-style): Lists flow top-to-bottom, left-to-right.
- A 4th list appears directly under the 1st list, not after the 3rd.
- Lists are draggable for reordering:
  - Show ghost placeholder during drag.
  - Smooth animation on drop.
- **Responsive**: Collapses to 1 column on mobile/narrow screens.

### 8.4 List Card

Each list is displayed as a card containing:

1. **Title** (top): List name, editable on click.
2. **"+ Add a task" button**: Reveals an inline text input below when clicked.
3. **Incomplete tasks**: Sorted by position (ascending).
4. **Completed section** (collapsible):
   - Always starts collapsed (state not persisted).
   - Contains completed tasks, sorted by position.
   - Completed tasks move to this section automatically.

### 8.5 Task Row

```
[checkbox] Task content text                    [delete]
                                               (on hover)
```

- **Checkbox**: Always visible, toggles completion.
- **Content**: Plain text, click to edit inline.
- **Delete button**: Appears on hover (right side).
- Drag handle for reordering (within list or across lists).

### 8.6 Task Interactions

- **Create**: Click "+ Add a task" button, type content, press Enter.
  - Input clears and keeps focus for rapid entry (auto-advance).
  - Press Escape to cancel/blur.
- **Edit**: Click on task text to make it editable inline.
  - Press Enter to save, Escape to cancel.
- **Complete**: Click checkbox. Task moves to bottom (completed section).
- **Delete**: Click delete button (hover). Single task deletion only (no bulk delete).
- **Reorder**: Drag and drop within same list or to different list.
  - Cross-list drag moves the task to the target list.

### 8.7 List Deletion

When deleting a list with tasks:

- Show confirmation dialog with task count.
- "Delete list and X tasks?" with Cancel/Delete buttons.
- Cascade delete: all tasks are deleted with the list.
- Default list cannot be deleted (delete button hidden/disabled).

### 8.8 UI State Management

- **Optimistic updates**: Changes appear immediately without sync indicators.
- **State reset**: On page load/navigation, always start at default list, scroll to top.
- **No state persistence** for UI preferences (scroll position, expanded sections).

### 8.9 Keyboard Support (Minimal)

- **Enter**: Submit/create task.
- **Escape**: Cancel edit, blur input.
- **Tab**: Standard focus navigation.

JavaScript is required for all functionality (no progressive enhancement).

## 9. Error Handling

### 9.1 Validation Errors

- **Task content > 4096 chars**: Block submission, show inline error with character count.
- **List name > 255 chars**: Block submission, show inline error.
- **Empty content/name**: Block submission, show inline error.

### 9.2 Limit Errors

- **> 20 lists**: Block creation, show error message.
- **> 500 tasks per list**: Block creation, show error message.

### 9.3 Storage Errors

- **IndexedDB failure**: Fall back to in-memory, show persistent warning.
- **Network failure**: Queue mutations, retry with exponential backoff (max 30s).
- **Server error (5xx)**: Show toast, retry automatically.
- **Rate limit (429)**: Backoff and retry (max 30s).

### 9.4 Sync Errors

- **Failed queue replay**: Toast notification, discard failed mutation, continue.
- **Conflict (delete vs update)**: Delete wins, no user notification needed.

## 10. Future Considerations

The following features are planned for future versions:

- **v0.2.0**: Due dates and time-based reminders
- **v0.3.0**: Subtasks (one level of nesting)
- **v0.4.0**: Task notes and file attachments
- **v0.5.0**: List sharing and collaboration
- **v1.0.0**: Mobile apps (React Native)

## 11. Testing Requirements

Tests MUST cover:

1. **Storage interface**
   - Both LocalStorage and RemoteStorage implementations
   - CRUD operations for lists and tasks
   - Error handling (not found, validation, default list deletion)
   - Entity limits (20 lists, 500 tasks)

2. **Synchronization**
   - BroadcastChannel events fire correctly
   - Cross-tab state updates
   - WebSocket connection and reconnection
   - Offline queue replay
   - Delta sync on reconnect
   - Delete-wins conflict resolution

3. **Authentication**
   - Anonymous mode works without network
   - Sign-in flow completes successfully
   - Session persistence across page reloads
   - Session expiry and silent refresh
   - Data migration prompt on sign-in

4. **Data integrity**
   - Default list cannot be deleted
   - Tasks cannot exist without a list
   - Position values remain consistent after reordering (reindex)
   - Cascade delete removes all tasks with list

5. **UI behavior**
   - Optimistic updates appear immediately
   - Completed tasks move to bottom
   - Cross-list drag and drop
   - List card reordering with animation
   - Responsive layout (3-column to 1-column)

## Changelog

### v0.1.0 (2026-01-03)

- Initial specification draft
- Core data model (User, List, Task)
- Effect-TS storage interface
- Real-time sync via BroadcastChannel and WebSocket
- Better Auth with Google OAuth
- Detailed UI specification (Google Tasks-inspired)
- Entity limits (20 lists, 500 tasks per list)
- Conflict resolution (LWW with delete precedence)
- Offline queue with exponential backoff
