import React, {FC} from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CustomField} from "../UI/FormsControls/FormsControls";
import {FieldValidatorType, maxLengthCreator, required} from "../../validators/validators";
import {MessagesPropsType} from "./MessagesContainer";

type FormDataType = { newMessageText: string }
const Messages: FC<MessagesPropsType> = ({messages, dialogs, sendMessage}) => {

    const addNewMessage = (formData: FormDataType) => {
        sendMessage(formData.newMessageText)
    }

    return (
        <section className={s.section}>
            <div className={s.dialogs}>
                {dialogs.map(d => <Dialog dialog={d} key={d.id}/>)}
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {messages.map(m => <Message message={m} key={m.id}/>)}
                </div>
                <SendMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </section>);
};
const maxLength: FieldValidatorType = maxLengthCreator(10)
const SendMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.chat__form}>
            <Field validate={[required, maxLength]} name={'newMessageText'} className={s.chat__input}
                   placeholder={'Написати повідомлення...'}
                   component={CustomField} FieldType={'textarea'}/>
            <button className={s.chat__button}>Надіслати</button>
        </form>
    )
}
const SendMessageReduxForm = reduxForm<FormDataType>({form: 'dialog'})(SendMessageForm)

export default Messages;
