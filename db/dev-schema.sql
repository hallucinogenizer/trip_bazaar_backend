-- Create the todo-tasks table
CREATE TABLE "todo-tasks" (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    text TEXT NOT NULL
);

-- Insert sample tasks
INSERT INTO "todo-tasks" (text) VALUES ('Local task 1');
INSERT INTO "todo-tasks" (text) VALUES ('Local task 2');
