import React from 'react';
import s from '../Messages.module.css'
import {NavLink} from "react-router-dom";

const isActive = ({isActive}) => isActive ? s.dialog_active : s.dialog

const Dialog = (props) => {
    return (
        <NavLink className={isActive} to={`/messages/${props.id}`}>
            <div className={s.avatar}>
                <img src={props.image} alt=""/>
            </div>
            <div className={s.info}>
                <h3 className={s.name}>{props.name}</h3>
                <div className={s.text}>{props.text}</div>
            </div>
        </NavLink>);
};

export default Dialog;
