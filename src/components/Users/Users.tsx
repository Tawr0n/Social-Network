import React from 'react';
import s from './Users.module.css'
import User from "./User/User";
import Preloader from "../UI/Preloader/Preloader";
import Pagination from "../UI/Pagination/Pagination";
import {UserType} from "../../types/types";

type PropsType = {
    users: Array<UserType>
    activePage: number
    totalUsersCount: number
    pageSize: number
    isLoading: boolean
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
    onPageClick: (pageNumber: number) => void
}
const Users: React.FC<PropsType> = (props) => {

    return (
        <section className={s.users}>
            <Pagination totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                        activePage={props.activePage} onPageClick={props.onPageClick} portionSize={5}/>
            {props.isLoading
                ? <Preloader/>
                : props.users.map(u => <User key={u.id} user={u}
                                             follow={props.follow} unfollow={props.unfollow}
                                             followingInProgress={props.followingInProgress}/>)

            }
        </section>
    )
}
export default Users;
