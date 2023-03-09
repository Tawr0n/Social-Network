import {UserType} from "../types/types";
import {instance} from "./api";

interface GetUsersResponseType {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(activePage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${activePage}&count=${pageSize}`)
            .then(res => res.data)
    },
}
