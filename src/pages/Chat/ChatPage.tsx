import React, {useEffect, useState} from "react";
import {Button} from "antd";
import TextArea from "antd/lib/input/TextArea";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])


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

    const sendMessage = () => {
        if (!message) return
        ws.send(message)
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
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}
