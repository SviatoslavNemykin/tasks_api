import fs from 'node:fs/promises';
import type { UserRepository } from "../../domain/user/repository.js";
import type { User } from '../../domain/user/entity.js';

export function createUserRepository(): UserRepository {
    return {
        async getAllUsers() {
            try {
                const fileData = await fs.readFile('data/users.json', 'utf8');
                return JSON.parse(fileData) as User[];
            } catch {
                return [];
            }
        },

        async createUser(user) {
            const users = await this.getAllUsers();
            users.push(user);
            await fs.writeFile('data/users.json', JSON.stringify(users, null, 2), 'utf8');
            return user;
        },

        async getUserById(id) {
            const users = await this.getAllUsers();
            return users.find((user) => user.id === id);
        },

        async getUserByEmail(email) {
            const users = await this.getAllUsers();
            return users.find((user) => user.email === email);
        }
    };
}