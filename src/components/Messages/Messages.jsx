import React from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {CustomField} from "../UI/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../validators/validators";


const Messages = ({messages, dialogs, sendMessage}) => {

    const addNewMessage = (formData) => {
        sendMessage(formData.newMessageText)
    }

    return (
        <section className={s.section}>
            <div className={s.dialogs}>
                {dialogs.map(d => <Dialog id={d.id} name={d.name} text={d.text} image={d.image} key={d.id}/>)}
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)}
                </div>
                <SendMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </section>);
};
const maxLength = maxLengthCreator(10)
const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.chat__form}>
            <Field validate={[required, maxLength]} name={'newMessageText'} className={s.chat__input}
                   placeholder={'Написати повідомлення...'}
                   component={CustomField} FieldType={'textarea'}/>
            <button className={s.chat__button}>Надіслати</button>
        </form>
    )
}
const SendMessageReduxForm = reduxForm({form: 'dialog'})(SendMessageForm)

export default Messages;
