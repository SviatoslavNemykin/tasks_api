import fs from 'node:fs/promises';
import type { UserRepository } from "../../domain/user/repository.js";
import type { User } from '../../domain/user/entity.js';



export function createUserRepository(): UserRepository{
    return{
        async createUser(userData) {
            const fileData = await fs.readFile('data/users.json', 'utf8');
            const jsonArray: User[] = JSON.parse(fileData);
            
            const newUser: User = {
                ...userData,
                id: jsonArray.length + 1,
            };

            jsonArray.push(newUser);

            await fs.writeFile('data/users.json', JSON.stringify(jsonArray, null, 2), 'utf8');
            return newUser;
        },
    
        async getUserById(id) {
            const fileData = await fs.readFile('data/users.json', 'utf8')
            const users: User[] = JSON.parse(fileData)
            const user = users.find((user) => user.id === id)
            return user;
        },
         
        async getUserByEmail(email){//ПОЛУЧАТЬ ТОЛЬКО ПО 
            const fileData = await fs.readFile('data/users.json', 'utf8')
            const users: User[] = JSON.parse(fileData)
            const userEmail = users.find((user) => {
                return user.email === email
            })
            return userEmail
        }
    }

}



