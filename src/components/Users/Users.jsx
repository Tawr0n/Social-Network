import React from 'react';
import s from './Users.module.css'
import User from "./User/User";
import Preloader from "../UI/Preloader/Preloader";
import Pagination from "../UI/Pagination/Pagination";


const Users = (props) => {

    return (
        <section className={s.users}>
            <Pagination totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                        activePage={props.activePage} onPageClick={props.onPageClick} portionSize={5}/>
            {props.isLoading
                ? <Preloader/>
                : props.users.map(u => <User key={u.id}
                                             follow={props.follow} unfollow={props.unfollow}
                                             followingInProgress={props.followingInProgress}
                                             {...u} />)

            }
        </section>
    )
}
export default Users;
