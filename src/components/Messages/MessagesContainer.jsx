import React from 'react';
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/messagesReducer";
import Messages from "./Messages";


const MessagesContainer = ({store}) => {
    const state = store.getState()
    const sendMessage = () => {
        store.dispatch(sendMessageAC())
    }
    const onMessageChange = (message) => {
        store.dispatch(updateNewMessageTextAC(message))
    }

    return <Messages messages={state.messagesPage.messages} dialogs={state.messagesPage.dialogs}
                     newMessageText={state.messagesPage.newMessageText}
                     sendMessage={sendMessage} updateNewMessageText={onMessageChange}/>
};

export default MessagesContainer;
