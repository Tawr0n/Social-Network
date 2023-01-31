import React from 'react';
import s from './Users.module.css'
import User from "./User/User";



const Users = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let activePage = props.activePage
    let slicedPages
    if (activePage < 3) {
        slicedPages = pages.slice(0, 5)
    } else if (pagesCount - activePage < 3) {
        slicedPages = pages.slice(pagesCount - 5, pagesCount)
    } else {
        slicedPages = pages.slice(activePage - 3, activePage + 2)
    }
    return (
        <section className={s.users}>
            <div className={s.pagination}>
                {
                    slicedPages.map(p => <span onClick={(e) => props.onPageClick(p)}
                                               className={props.activePage === p
                                                   ? `${s.pageNumber_selected} ${s.pageNumber}`
                                                   : s.pageNumber} key={p}>{p}</span>)
                }
            </div>
            {
                props.users.map(u => <User key={u.id}
                                                followToggle={props.followToggle} {...u} />)
            }
        </section>
    )
}
export default Users;
