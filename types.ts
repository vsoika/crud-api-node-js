import { UUID } from "node:crypto";

export type TUser = {
    id: UUID,
    username: string,
    age: number,
    hobbies: string[]
}