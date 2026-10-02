import express from 'express';
import type { TaskHandler } from "../../handlers/task/tasks.js";

export function createTaskRouters(taskHandler: TaskHandler) {
    const router = express.Router();
    
    router.post("/", taskHandler.createTask);
    router.get("/", taskHandler.getTasks);
    router.get("/:id", taskHandler.getTaskById);
    router.patch("/:id", taskHandler.updateTask);
    router.delete("/:id", taskHandler.deleteTask);
    
    return router;
}