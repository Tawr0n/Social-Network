import React from 'react';
import s from '../Messages.module.css'
import {NavLink} from "react-router-dom";


const Dialog = (props) => {
    return (<NavLink to={`/messages/${props.id}`}>
        <div className={s.dialog}>
            <div className={s.avatar}>
                <img src="" alt=""/>
            </div>
            <div className={s.info}>
                <h3 className={s.name}>{props.name}</h3>
                <div className={s.text}>{props.text}</div>
            </div>
        </div>
    </NavLink>);
};

export default Dialog;
