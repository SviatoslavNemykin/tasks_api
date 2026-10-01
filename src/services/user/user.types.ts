import type { User } from "../../domain/user/entity.js";


export interface UserServices {
    createUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByEmail(email: string, password: string): Promise<Omit<User, "password"> | undefined>;
}

