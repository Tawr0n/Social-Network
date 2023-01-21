import React from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";


const Messages = ({dialogs, messages}) => {


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
