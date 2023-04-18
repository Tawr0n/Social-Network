import React, {useEffect, useState} from "react";
import {Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {ChatMessageType} from "../../api/chatAPI";


export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)

    return (
        <div style={{height: '500px', overflowY: "auto"}}>
            {messages.map((m: ChatMessageType, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <div>
                <img src={message.photo ? message.photo : 'https://placehold.co/50'} alt="avatar"
                     style={{width: "50px"}}/>
                <b style={{margin: "10px"}}>{message.userName}</b>
            </div>
            <div style={{margin: "10px 0"}}>
                <span>{message.message}</span>
            </div>

        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <br/>
            <div>
                <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <br/>
            <div>
                <Button disabled={false} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
}
