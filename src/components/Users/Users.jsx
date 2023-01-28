import React from 'react';
import s from './Users.module.css'
import User from "./User/User";
import axios from "axios";

class Users extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
        }
    }

    render() {
        return (
            <section className={s.users}>
                {
                    this.props.users.map(u => <User key={u.id}
                                                    followToggle={this.props.followToggle} {...u} />)
                }
            </section>
        )
    }
}

export default Users;
