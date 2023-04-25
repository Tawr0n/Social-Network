import React, {KeyboardEventHandler, UIEventHandler, useEffect, useRef, useState} from "react";
import {Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {ChatMessageAPIType} from "../../api/chatAPI";


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
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

    const scrollHandler: UIEventHandler<HTMLDivElement> = (e) => {
        const {scrollHeight, scrollTop, clientHeight} = e.currentTarget;
        // console.log(scrollHeight + ' ' + scrollTop + ' ' + clientHeight)
        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 100) {
            setIsAutoScrollActive(true)
            return
        }
        setIsAutoScrollActive(false)
    }

    useEffect(() => {
        if (isAutoScrollActive)
            messagesRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'})
    }, [messages])

    return (
        <div style={{height: '500px', overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m) => <Message message={m} key={m.id}/>)}
            <div ref={messagesRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

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
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    const sendMessageOnPressEnterHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        e.preventDefault()
        sendMessageHandler()
    }
    return (
        <div>
            <br/>
            <div>
                <TextArea onPressEnter={sendMessageOnPressEnterHandler}
                          onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <br/>
            <div>
                <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
}
