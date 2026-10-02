import type { UserRepository } from "../../domain/user/repository.js";
import type { UserServices } from "./user.types.js";


export function createUserServices(userRepository: UserRepository): UserServices {
    return {
        async createUser(user){
            
            const createUser = await userRepository.createUser(user)
            if(createUser === undefined){
                return undefined
            }
            return createUser
        },
        async getUserById(id){
            const user = await userRepository.getUserById(id)
            return user
        },
        async getUserByEmail(email, password){
            const user = await userRepository.getUserByEmail(email)

            if(!user || user.password !== password){
                return undefined
            }

            return user
        }
    }
}


