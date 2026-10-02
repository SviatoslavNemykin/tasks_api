import type { UserRepository } from "../../domain/user/repository.js";
import type { UserServices } from "./user.types.js";

export function createUserServices(userRepository: UserRepository): UserServices {
    return {
        async createUser(user) {
            const users = await userRepository.getAllUsers();

            const isEmailTaken = users.some((u) => u.email === user.email);
            if (isEmailTaken) {
                return undefined;
            }

            const newUser = {
                ...user,
                id: users.length + 1
            };

            return await userRepository.createUser(newUser);
        },

        async getUserById(id) {
            return await userRepository.getUserById(id);
        },

        async getUserByEmail(email, password) {
            const user = await userRepository.getUserByEmail(email);

            if (!user || user.password !== password) {
                return undefined;
            }

            return user;
        }
    };
}