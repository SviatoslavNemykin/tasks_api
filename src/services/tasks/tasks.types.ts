import type { Task, TaskPriority, TaskStatus } from "../../domain/task/entity.js";

export interface TaskServices {
    getTasks(filters?: { userId?: number; status?: TaskStatus; priority?: TaskPriority }): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | undefined>;
    createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task | null>;
    updateTask(id: number, data: Partial<Pick<Task, "title" | "description" | "status" | "priority">>): Promise<Task | undefined>;
    deleteTask(id: number): Promise<boolean>;
}