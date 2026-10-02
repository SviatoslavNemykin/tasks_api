import type { TaskStatus, TaskPriority } from "../../../domain/task/entity.js";

export interface TaskCreateRequest {
    userId: number;
    title: string;
    description: string;
    status?: TaskStatus;
    priority?: TaskPriority;
}

export interface TaskUpdateRequest {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
}