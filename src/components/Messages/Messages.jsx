import React from 'react';
import s from './Messages.module.css'
import {NavLink} from "react-router-dom";


const Dialog = (props) => {
    return (
        <NavLink to={`/messages/${props.id}`}>
            <div className={s.dialog}>
                <div className={s.avatar}>
                    <img src="" alt=""/>
                </div>
                <div className={s.info}>
                    <h3 className={s.name}>{props.name}</h3>
                    <div className={s.text}>{props.text}</div>
                </div>
            </div>
        </NavLink>
    );
};

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Messages = () => {
    return (
        <section className={s.section}>
            <div className={s.dialogs}>
                <Dialog name={'Албус'} text={'Прибуду о 20:00 у суботу'} id={'1'}/>
                <Dialog name={'Северус'} text={'І не забудь.'} id={'2'}/>
                <Dialog name={'Рон'} text={'Як життя, старий?'} id={'3'}/>
            </div>
            <div className={s.messages}>
                <Message message={'Експеліармус'}/>
                <Message message={'Акціо'}/>
            </div>
        </section>
    );
};

export default Messages;
