import express from 'express';
import * as handlersUser from "../../handlers/user/users.js";

export function createUserRouters(UserHandler: handlersUser.UserHandler) {
    const router = express.Router();
    router.get("/:id", UserHandler.getUserById);
    return router;
}

export function createAuthRouters(UserHandler: handlersUser.UserHandler) {
    const router = express.Router();
    router.post("/register", UserHandler.createUser);
    router.post("/login", UserHandler.getUserByEmail);

    return router;
}