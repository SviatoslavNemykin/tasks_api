import type { Task, TaskPriority, TaskStatus } from "./entity.js";

export interface TaskRepository {
    getAll(filters?: {
        userId?: number;
        status?: TaskStatus;
        priority?: TaskPriority;
    }): Promise<Task[]>;

    getById(id: number): Promise<Task | undefined>;

    create(task: Task): Promise<Task>;

    update(
        id: number,
        data: Partial<Pick<
            Task,
            "title" | "description" | "status" | "priority"
        >>
    ): Promise<Task | undefined>;

    delete(id: number): Promise<boolean>;
}