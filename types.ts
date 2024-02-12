import { UUID } from "node:crypto";

export type USER = {
    id: string | UUID,
    username: string,
    age: number,
    hobbies: string[]
}