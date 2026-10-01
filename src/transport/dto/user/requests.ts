export interface RouteParams{
    id: string | undefined
}
export interface UserCreateRequest{
    name: string,
    email: string,
    password: string,
    createdAt: string
}