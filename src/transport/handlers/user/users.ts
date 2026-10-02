import type {Response, Request} from "express"
import type { RouteParams, UserCreateRequest } from "../../dto/user/requests.js";
import type { UserResponse } from "../../dto/user/responses.js";
import type { MessageErrors } from "../../dto/user/errors.js";
import type { UserServices } from "../../../services/user/user.types.js";


export interface UserHandler {
    createUser(
        req: Request<{}, UserResponse | MessageErrors, UserCreateRequest, {}>,
        res: Response<UserResponse | MessageErrors>
    ): Promise<Response<UserResponse | MessageErrors> | void>;

    getUserById(
        req: Request<RouteParams, UserResponse | MessageErrors, {}, {}>,
        res: Response<UserResponse | MessageErrors>
    ): Promise<Response<UserResponse | MessageErrors> | void>;

    getUserByEmail(
        req: Request<{}, UserResponse | MessageErrors, UserCreateRequest, {}>,
        res: Response<UserResponse | MessageErrors>
    ): Promise<Response<UserResponse | MessageErrors> | void>;
}

    
export function createUserHandler(userServices: UserServices): UserHandler{
    return{
        async createUser(req, res){
            const {name, email, password, createdAt} = req.body
            if (!name || !email || !password ){
                return res.status(400).json({
                    message: "all fields are required"
                })
            }
            try{
                const user = await userServices.createUser({id: 0, name, email, password, createdAt})
                if(!user){
                    return res.status(400).json({
                        message: "email already exists"
                    })
                }
                return res.status(201).json(user)
            } catch(error){
                return res.status(400).json({
                    message: "incorrect data"
                })
            }
        },


        async getUserById(req, res) {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Invalid user ID"
                })}
            
            const user = await userServices.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
                
            }
            return res.status(200).json(user)
        },

        async getUserByEmail(req, res){
            const {email, password} = req.body
            if (!email || !password){
                return res.status(400).json({
                    message: "all fields are required"
                })
            }
            try{
                const user = await userServices.getUserByEmail(email, password)
                if(!user){
                    return res.status(404).json({
                        message: "incorrect data"
                    })
                }
                return res.status(201).json(user)
            } catch(error){
                return res.status(400).json({
                    message: "incorrect data"
                })
            }
        }
        
    }
}
    






