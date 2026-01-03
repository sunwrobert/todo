CREATE TABLE `todo_list` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`is_default` integer DEFAULT false NOT NULL,
	`position` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `todo_list_userId_idx` ON `todo_list` (`user_id`);--> statement-breakpoint
CREATE TABLE `todo_task` (
	`id` text PRIMARY KEY NOT NULL,
	`list_id` text NOT NULL,
	`content` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`position` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`list_id`) REFERENCES `todo_list`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `todo_task_listId_idx` ON `todo_task` (`list_id`);