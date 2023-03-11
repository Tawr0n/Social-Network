import {UserType} from "../types/types";
import {instance} from "./api";

interface GetUsersResponseType {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(activePage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${activePage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
}
