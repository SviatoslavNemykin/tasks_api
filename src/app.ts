import express from "express"
import { createUserRepository } from "./repositories/user/user.js"
import { createAuthRouters, createUserRouters } from "./transport/routers/users/user.js"
import type { UserRepository } from "./domain/user/repository.js"
import { createUserHandler } from "./transport/handlers/user/users.js"
import { createUserServices } from "./services/user/user.js"


const app = express()
app.use(express.json())


const userRepository = createUserRepository()
const userServices = createUserServices(userRepository)
const userHandlers = createUserHandler(userServices)


const userRouter = createUserRouters(userHandlers)
const authRouter = createAuthRouters(userHandlers)

app.use('/users', userRouter)
app.use('/auth', authRouter)


// app.use()
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

function createUserService(userRepository: UserRepository) {
    throw new Error("Function not implemented.")
}

