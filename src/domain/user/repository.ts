import type { User } from "./entity.js";

export interface UserRepository {
    createUser(user: User): Promise<User | undefined>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User|undefined>;
}

