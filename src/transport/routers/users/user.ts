import express from 'express';
import { Router } from "express";
import * as handlersUser from "../../handlers/user/users.js"




export function createUserRouters(UserHandler: handlersUser.UserHandler){
    const router = express.Router();
    router.post("/register", UserHandler.createUser);
    router.post("/login", UserHandler.getUserByEmail);
    router.get("/:id", UserHandler.getUserById);
    return router;
}