CREATE TABLE `todo_list_items_db` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_completed` boolean NOT NULL,
	`creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`text` text NOT NULL,
	CONSTRAINT `todo_list_items_db_id` PRIMARY KEY(`id`)
);
