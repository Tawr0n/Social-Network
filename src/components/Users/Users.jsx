import React from 'react';
import s from './Users.module.css'
import User from "./User/User";
import axios from "axios";

class Users extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
        }
    }

    onPageClick = (pageNumber) => {
        this.props.setActivePage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        let activePage = this.props.activePage
        let slicedPages
        if (activePage < 3) {
            slicedPages = pages.slice(0, 5)
        } else if (pagesCount - activePage < 3) {
            slicedPages = pages.slice(pagesCount - 5, pagesCount)
        } else {
            slicedPages = pages.slice(activePage - 3, activePage + 2)
        }

       /* let pagesLeft = ((activePage - 5) < 0) ? 0 : (activePage - 5)
        let pagesRight = activePage + 4

        let slicedPages = (pagesRight - pagesLeft) < 9
            ? pages.slice(0, 9)
            : pages.slice(pagesLeft, pagesRight)*/

        return (

            <section className={s.users}>
                <div>
                    {
                        slicedPages.map(p => <span onClick={(e) => this.onPageClick(p)}
                                             className={this.props.activePage === p
                                                 ? `${s.pageNumber_selected} ${s.pageNumber}`
                                                 : s.pageNumber} key={p} >{p}</span>)
                    }
                </div>
                {
                    this.props.users.map(u => <User key={u.id}
                                                    followToggle={this.props.followToggle} {...u} />)
                }
            </section>
        )
    }
}

export default Users;
