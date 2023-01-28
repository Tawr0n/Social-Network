import React from 'react';
import s from './Users.module.css'
import User from "./User/User";

const Users = ({users, followToggle, setUsers}) => {
    if (users.length === 0) {
        setUsers([
            {
                id: 1,
                fullName: 'Kit Yaroslav',
                image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
                isFollowed: true,
                status: 'I`m a ukrainian',
                location: {country: 'Ukraine', city: 'Lviv'}
            },
            {
                id: 2,
                fullName: 'Pennings Daniel',
                image: 'https://i.pinimg.com/736x/c5/83/0d/c5830de74df706029f95b41d36f420a2.jpg',
                isFollowed: false,
                status: 'Летючий голандець',
                location: {country: 'Ukraine', city: 'Lviv'}
            },
        ])
    }

    return (
        <section className={s.users}>
            {
                users.map(u => <User key={u.id} followToggle={followToggle} {...u} />)
            }
        </section>
    );
};

export default Users;
