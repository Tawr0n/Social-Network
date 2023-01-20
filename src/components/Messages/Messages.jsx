import React from 'react';
import s from './Messages.module.css'
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

const Message = (props) => {
    return (<div className={s.message}>{props.message}</div>)
}

const Messages = () => {
    const dialogs = [
        {id: 1, name: 'Албус', text: 'Прибуду о 20:00 у суботу'},
        {id: 2, name: 'Северус', text: 'І не забудь.'},
        {id: 3, name: 'Рон', text: 'Як життя, старий?'},
    ]
    const messages = [{id: 1, message: 'Експеліармус'}, {id: 2, message: 'Акціо'},]

    return (<section className={s.section}>
        <div className={s.dialogs}>
            {dialogs.map(d => <Dialog id={d.id} name={d.name} text={d.text}/>)}
        </div>
        <div className={s.messages}>
            {messages.map(m => <Message id={m.id} message={m.message}/>)}
        </div>
    </section>);
};

export default Messages;
