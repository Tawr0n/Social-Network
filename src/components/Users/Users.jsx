import React from 'react';
import s from './Users.module.css'
import User from "./User/User";
import axios from "axios";

const Users = ({users, followToggle, setUsers}) => {
    const getUsers = () => {
        if (users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                setUsers(response.data.items)
            })

        }
    }

    return (
        <section className={s.users}>
            {
                users.length
                    ? users.map(u => <User key={u.id} followToggle={followToggle} {...u} />)
                    : <button onClick={getUsers}>Get users</button>
            }
        </section>
    );
};

export default Users;
