import React from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";


const Messages = ({messagesPage, sendMessage, updateNewMessageText}) => {

    const textareaMessage = React.createRef()
    const onSendMessage = () => {
        sendMessage()
    }
    const onMessageChange = () => {
        const message = textareaMessage.current.value
        updateNewMessageText(message)
    }

    return (<section className={s.section}>
        <div className={s.dialogs}>
            {messagesPage.dialogs.map(d => <Dialog id={d.id} name={d.name} text={d.text}/>)}
        </div>
        <div className={s.chat}>
            <div className={s.messages}>
                {messagesPage.messages.map(m => <Message id={m.id} message={m.message}/>)}
            </div>
            <div className={s.chat__functional}>
                <textarea onChange={onMessageChange} value={messagesPage.newMessageText} ref={textareaMessage}
                          className={s.chat__input}
                          placeholder={'Написати повідомлення...'}/>
                <button onClick={onSendMessage} className={s.chat__button}>Надіслати</button>
            </div>
        </div>
    </section>);
};

export default Messages;
