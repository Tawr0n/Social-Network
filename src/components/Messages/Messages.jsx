import React from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";


const Messages = ({messages, dialogs, newMessageText, sendMessage, updateNewMessageText, isAuth}) => {

    const onSendMessage = () => {
        sendMessage()
    }
    const onMessageChange = (e) => {
        const message = e.target.value
        updateNewMessageText(message)
    }
    console.log(isAuth)
    if (!isAuth) return <Navigate to='/login'/>

    return (
        <section className={s.section}>
            <div className={s.dialogs}>
                {dialogs.map(d => <Dialog id={d.id} name={d.name} text={d.text} image={d.image} key={d.id}/>)}
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)}
                </div>
                <div className={s.chat__functional}>
                <textarea onChange={onMessageChange} value={newMessageText}
                          className={s.chat__input}
                          placeholder={'Написати повідомлення...'}/>
                    <button onClick={onSendMessage} className={s.chat__button}>Надіслати</button>
                </div>
            </div>
        </section>);
};

export default Messages;
