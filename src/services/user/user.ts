import type { UserRepository } from "../../domain/user/repository.js";
import type { UserServices } from "./user.types.js";

export function createUserServices(userRepository: UserRepository): UserServices {
    return {
        async createUser(user) {
            // 1. Получаем всех пользователей через репозиторий
            const users = await userRepository.getAllUsers();

            // 2. Проверяем, существует ли уже пользователь с таким email
            const isEmailTaken = users.some((u) => u.email === user.email);
            if (isEmailTaken) {
                return undefined;
            }

            // 3. Генерируем новый ID прямо в сервисе
            const newUser = {
                ...user,
                id: users.length + 1
            };

            // 4. Сохраняем готового пользователя
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