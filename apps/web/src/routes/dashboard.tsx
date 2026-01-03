import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getUser } from "@/functions/get-user";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/dashboard")({
  validateSearch: z.object({
    listId: z.string().optional(),
  }),
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const { listId } = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard" });
  const queryClient = useQueryClient();
  const listsQuery = useQuery(orpc.todo.getLists.queryOptions());

  useEffect(() => {
    if (listId || !listsQuery.data?.length) {
      return;
    }
    const defaultList =
      listsQuery.data.find((list) => list.isDefault) ?? listsQuery.data[0];
    if (defaultList) {
      void navigate({
        search: (prev) => ({ ...prev, listId: defaultList.id }),
      });
    }
  }, [listId, listsQuery.data, navigate]);

  const activeList =
    listsQuery.data?.find((list) => list.id === listId) ?? null;

  const tasksQuery = useQuery(
    orpc.todo.getTasks.queryOptions({
      input: { listId: listId ?? "" },
      enabled: Boolean(listId),
    })
  );

  const createListForm = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: ({ value }) => {
      createListMutation.mutate({
        name: value.name.trim(),
      });
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(1, "List name is required.").max(255),
      }),
    },
  });

  const createTaskForm = useForm({
    defaultValues: {
      content: "",
    },
    onSubmit: ({ value }) => {
      if (!listId) {
        toast.error("Select a list first.");
        return;
      }
      createTaskMutation.mutate({
        listId,
        content: value.content.trim(),
      });
    },
    validators: {
      onSubmit: z.object({
        content: z.string().min(1, "Task content is required.").max(4096),
      }),
    },
  });

  const createListMutation = useMutation(
    orpc.todo.createList.mutationOptions({
      onSuccess: () => {
        createListForm.reset();
        void queryClient.invalidateQueries({
          queryKey: orpc.todo.getLists.queryKey(),
        });
      },
      onError: (error) => {
        toast.error(error.message ?? "Unable to create list.");
      },
    })
  );

  const deleteListMutation = useMutation(
    orpc.todo.deleteList.mutationOptions({
      onSuccess: () => {
        void navigate({
          search: (prev) => ({ ...prev, listId: undefined }),
        });
        void queryClient.invalidateQueries({
          queryKey: orpc.todo.getLists.queryKey(),
        });
      },
      onError: (error) => {
        toast.error(error.message ?? "Unable to delete list.");
      },
    })
  );

  const createTaskMutation = useMutation(
    orpc.todo.createTask.mutationOptions({
      onSuccess: () => {
        createTaskForm.reset();
        if (listId) {
          void queryClient.invalidateQueries({
            queryKey: orpc.todo.getTasks.queryKey({
              input: { listId },
            }),
          });
        }
      },
      onError: (error) => {
        toast.error(error.message ?? "Unable to create task.");
      },
    })
  );

  const updateTaskMutation = useMutation(
    orpc.todo.updateTask.mutationOptions({
      onSuccess: () => {
        if (listId) {
          void queryClient.invalidateQueries({
            queryKey: orpc.todo.getTasks.queryKey({
              input: { listId },
            }),
          });
        }
      },
      onError: (error) => {
        toast.error(error.message ?? "Unable to update task.");
      },
    })
  );

  const deleteTaskMutation = useMutation(
    orpc.todo.deleteTask.mutationOptions({
      onSuccess: () => {
        if (listId) {
          void queryClient.invalidateQueries({
            queryKey: orpc.todo.getTasks.queryKey({
              input: { listId },
            }),
          });
        }
      },
      onError: (error) => {
        toast.error(error.message ?? "Unable to delete task.");
      },
    })
  );

  const tasks = tasksQuery.data ?? [];
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="grid h-full gap-6 p-6 lg:grid-cols-[260px_1fr]">
      <aside className="bg-card/70 border-border/50 flex flex-col gap-4 rounded-2xl border p-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Lists
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void createListForm.handleSubmit();
            }}
            className="flex gap-2"
          >
            <createListForm.Field name="name">
              {(field) => (
                <div className="flex flex-1 flex-col gap-1">
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="New list"
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error?.message} className="text-xs text-red-500">
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </createListForm.Field>
            <createListForm.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  size="sm"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  Add
                </Button>
              )}
            </createListForm.Subscribe>
          </form>
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
          {listsQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading lists...</p>
          ) : listsQuery.data?.length ? (
            listsQuery.data.map((list) => {
              const isActive = list.id === listId;
              return (
                <button
                  key={list.id}
                  type="button"
                  onClick={() =>
                    void navigate({
                      search: (prev) => ({ ...prev, listId: list.id }),
                    })
                  }
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/40 text-foreground"
                  }`}
                >
                  <span className="truncate">{list.name}</span>
                  {list.isDefault ? (
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Default
                    </span>
                  ) : null}
                </button>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No lists yet.</p>
          )}
        </div>
      </aside>

      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Welcome {session?.user.name}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold">
              {activeList?.name ?? "Select a list"}
            </h1>
            {activeList && !activeList.isDefault ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteListMutation.mutate({ id: activeList.id })}
                disabled={deleteListMutation.isPending}
              >
                Delete list
              </Button>
            ) : null}
          </div>
        </header>

        <div className="bg-card/70 border-border/50 rounded-2xl border p-4">
          {activeList ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void createTaskForm.handleSubmit();
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-wrap gap-2">
                <createTaskForm.Field name="content">
                  {(field) => (
                    <div className="flex flex-1 flex-col gap-1">
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Add a task"
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-xs text-red-500"
                        >
                          {error?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </createTaskForm.Field>
                <createTaskForm.Subscribe>
                  {(state) => (
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!state.canSubmit || state.isSubmitting}
                    >
                      Add task
                    </Button>
                  )}
                </createTaskForm.Subscribe>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {tasksQuery.isLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading tasks...
                    </p>
                  ) : incompleteTasks.length ? (
                    incompleteTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-muted/20 flex items-center justify-between gap-3 rounded-2xl px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={(checked) =>
                              updateTaskMutation.mutate({
                                id: task.id,
                                completed: Boolean(checked),
                              })
                            }
                          />
                          <span className="text-sm">{task.content}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteTaskMutation.mutate({ id: task.id })
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No tasks yet. Add one above.
                    </p>
                  )}
                </div>

                {completedTasks.length ? (
                  <div className="space-y-2 border-t border-border/50 pt-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Completed
                    </p>
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-muted/10 flex items-center justify-between gap-3 rounded-2xl px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={(checked) =>
                              updateTaskMutation.mutate({
                                id: task.id,
                                completed: Boolean(checked),
                              })
                            }
                          />
                          <span className="text-sm line-through text-muted-foreground">
                            {task.content}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteTaskMutation.mutate({ id: task.id })
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a list to view tasks.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
