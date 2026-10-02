import type { TaskRepository } from "../../domain/task/repository.js";
import type { UserRepository } from "../../domain/user/repository.js";
import type { TaskServices } from "./tasks.types.js";


export function createTaskServices(taskRepository: TaskRepository, userRepository: UserRepository): TaskServices {
    return {
        async getTasks(filters) {
            return await taskRepository.getAll(filters);
        },

        async getTaskById(id) {
            return await taskRepository.getById(id);
        },

        async createTask(data) {
            const user = await userRepository.getUserById(data.userId);
            if (!user) {
                return null; // Користувача не знайдено
            }

            const tasks = await taskRepository.getAll();
            const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
            const now = new Date().toISOString();

            const newTask = {
                ...data,
                id: newId,
                createdAt: now,
                updatedAt: now
            };

            return await taskRepository.create(newTask);
        },

        async updateTask(id, data) {
            return await taskRepository.update(id, data);
        },

        async deleteTask(id) {
            return await taskRepository.delete(id);
        }
    };
}