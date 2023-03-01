import React, {FC} from 'react';
import s from '../Messages.module.css'
import {MessageType} from "../../../types/types";

type PropsType = {
    message: MessageType
}
const Message: FC<PropsType> = ({message}) => {
    return (<div className={s.message}>{message.message}</div>)
}

export default Message;
