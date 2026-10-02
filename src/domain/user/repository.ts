import type { User } from "./entity.js";

export interface UserRepository {
    getAllUsers(): Promise<User[]>;
    createUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User|undefined>;
}
