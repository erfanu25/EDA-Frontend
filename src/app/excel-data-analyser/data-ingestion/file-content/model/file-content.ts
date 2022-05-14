import { Status } from "./status";

export interface FileContent {
    _id: string,
    name: string,
    status: Status,
    createdAt: number,
    scheduleAt: number,
    path: string

}
