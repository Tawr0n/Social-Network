import React, {useEffect, useState} from "react";
import {Button} from "antd";
import TextArea from "antd/lib/input/TextArea";


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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const onCloseHandler = () => {
            console.log('Close ws')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', onCloseHandler)

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', onCloseHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', onCloseHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    const onMessageHandler = (e: MessageEvent) => {
        let newMessages = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, ...newMessages])
    };
    useEffect(() => {
        wsChannel?.addEventListener('message', onMessageHandler)

        return () => {
            wsChannel?.removeEventListener('message', onMessageHandler)
        }
    }, [wsChannel])


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
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const onOpenHandler = () => {
        setReadyStatus('ready')
    }
    useEffect(() => {
        wsChannel?.addEventListener('open', onOpenHandler)

        return () => {
            wsChannel?.removeEventListener('open', onOpenHandler)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
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
                <Button disabled={wsChannel === null || readyStatus !== 'ready'}
                        onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}
