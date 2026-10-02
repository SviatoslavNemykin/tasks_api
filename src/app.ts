import express from "express";
import { createUserRepository } from "./repositories/user/user.js";
import { createTaskRepository } from "./repositories/task/task.js";

import { createUserServices } from "./services/user/user.js";
import { createTaskServices } from "./services/tasks/tasks.js";

import { createUserHandler } from "./transport/handlers/user/users.js";
import { createTaskHandler } from "./transport/handlers/task/tasks.js";

import { createAuthRouters, createUserRouters } from "./transport/routers/users/user.js";
import { createTaskRouters } from "./transport/routers/tasks/tasks.js";

const app = express();
app.use(express.json());

// 1. Repositories
const userRepository = createUserRepository();
const taskRepository = createTaskRepository();

// 2. Services (Dependency Injection)
const userServices = createUserServices(userRepository);
const taskServices = createTaskServices(taskRepository, userRepository); // передаємо userRepository для валідації

// 3. Handlers
const userHandlers = createUserHandler(userServices);
const taskHandlers = createTaskHandler(taskServices);

// 4. Routers
const userRouter = createUserRouters(userHandlers);
const authRouter = createAuthRouters(userHandlers);
const taskRouter = createTaskRouters(taskHandlers);

// 5. Connect to App
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});