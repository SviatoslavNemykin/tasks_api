import fs from 'node:fs/promises';
import type { TaskRepository } from "../../domain/task/repository.js";
import type { Task } from '../../domain/task/entity.js';

export function createTaskRepository(): TaskRepository {
    const filePath = 'data/tasks.json';

    const getTasksFromFile = async (): Promise<Task[]> => {
        try {
            const fileData = await fs.readFile(filePath, 'utf8');
            return JSON.parse(fileData) as Task[];
        } catch {
            return [];
        }
    };

    const saveTasksToFile = async (tasks: Task[]) => {
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
    };

    return {
        async getAll(filters) {
            const tasks = await getTasksFromFile();
            if (!filters) return tasks;

            return tasks.filter(task => {
                let isMatch = true;
                if (filters.userId && task.userId !== filters.userId) isMatch = false;
                if (filters.status && task.status !== filters.status) isMatch = false;
                if (filters.priority && task.priority !== filters.priority) isMatch = false;
                return isMatch;
            });
        },

        async getById(id) {
            const tasks = await getTasksFromFile();
            return tasks.find((task) => task.id === id);
        },

        async create(task) {
            const tasks = await getTasksFromFile();
            tasks.push(task);
            await saveTasksToFile(tasks);
            return task;
        },

        async update(id, data) {
            const tasks = await getTasksFromFile();
            const index = tasks.findIndex((task) => task.id === id);
            
            if (index === -1) return undefined;

            const existingTask = tasks[index]!;

            const updatedTask: Task = {
                id: existingTask.id,
                userId: existingTask.userId,
                title: data.title !== undefined ? data.title : existingTask.title,
                description: data.description !== undefined ? data.description : existingTask.description,
                status: data.status !== undefined ? data.status : existingTask.status,
                priority: data.priority !== undefined ? data.priority : existingTask.priority,
                createdAt: existingTask.createdAt,
                updatedAt: new Date().toISOString()
            };
            
            tasks[index] = updatedTask;
            await saveTasksToFile(tasks);
            return updatedTask;
        },

        async delete(id) {
            const tasks = await getTasksFromFile();
            const filteredTasks = tasks.filter((task) => task.id !== id);
            
            if (tasks.length === filteredTasks.length) return false;

            await saveTasksToFile(filteredTasks);
            return true;
        }
    };
}