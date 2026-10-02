import type { Response, Request } from "express";
import type { TaskServices } from "../../../services/tasks/tasks.types.js";
import type { TaskCreateRequest, TaskUpdateRequest } from "../../dto/task/requests.js";
import type { TaskStatus, TaskPriority } from "../../../domain/task/entity.js";

const VALID_STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];
const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

export interface TaskHandler {
    createTask(req: Request<{}, any, TaskCreateRequest>, res: Response): Promise<Response>;
    getTasks(req: Request, res: Response): Promise<Response>;
    getTaskById(req: Request, res: Response): Promise<Response>;
    updateTask(req: Request<{ id: string }, any, TaskUpdateRequest>, res: Response): Promise<Response>;
    deleteTask(req: Request<{ id: string }>, res: Response): Promise<Response>;
}

export function createTaskHandler(taskServices: TaskServices): TaskHandler {
    return {
        async createTask(req, res) {
            const { userId, title, description, status = "todo", priority = "medium" } = req.body;

            if (!userId || !title || !description) {
                return res.status(400).json({ message: "userId, title, and description are required" });
            }

            if (!VALID_STATUSES.includes(status as TaskStatus) || !VALID_PRIORITIES.includes(priority as TaskPriority)) {
                return res.status(400).json({ message: "Invalid status or priority value" });
            }

            const task = await taskServices.createTask({
                userId, title, description,
                status: status as TaskStatus,
                priority: priority as TaskPriority
            });

            if (!task) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(201).json(task);
        },

        async getTasks(req, res) {
            const { userId, status, priority } = req.query;

            const filters: any = {};
            if (userId) filters.userId = Number(userId);
            if (status) filters.status = status;
            if (priority) filters.priority = priority;

            const tasks = await taskServices.getTasks(filters);
            return res.status(200).json(tasks);
        },

        async getTaskById(req, res) {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid task ID" });

            const task = await taskServices.getTaskById(id);
            if (!task) return res.status(404).json({ message: "Task not found" });

            return res.status(200).json(task);
        },

        async updateTask(req, res) {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid task ID" });

            const { title, description, status, priority } = req.body;

            if (status && !VALID_STATUSES.includes(status as TaskStatus)) {
                return res.status(400).json({ message: "Invalid status value" });
            }
            if (priority && !VALID_PRIORITIES.includes(priority as TaskPriority)) {
                return res.status(400).json({ message: "Invalid priority value" });
            }

            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (description !== undefined) updateData.description = description;
            if (status !== undefined) updateData.status = status;
            if (priority !== undefined) updateData.priority = priority;

            const updatedTask = await taskServices.updateTask(id, updateData);

            if (!updatedTask) return res.status(404).json({ message: "Task not found" });

            return res.status(200).json(updatedTask);
        },

        async deleteTask(req, res) {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid task ID" });

            const isDeleted = await taskServices.deleteTask(id);
            if (!isDeleted) return res.status(404).json({ message: "Task not found" });

            return res.status(200).json({ message: "Task deleted successfully" });
        }
    };
}