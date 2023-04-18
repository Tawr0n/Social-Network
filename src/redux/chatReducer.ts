import {InferActionsTypes, ThunkType} from "./reduxStore";
import {chatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

const MESSAGES_RECEIVED = 'social-network/chat/MESSAGES_RECEIVED'

const initialState: InitialAuthStateType = {
    messages: []
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialAuthStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        default:
            return state
    }

}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECEIVED,
        messages
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType<ActionsTypes, void> => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType<ActionsTypes, void> => (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType<ActionsTypes, void> => () => {
    chatAPI.sendMessage(message)
}


export default chatReducer

export type InitialAuthStateType = {
    messages: ChatMessageType[]
}
type ActionsTypes = InferActionsTypes<typeof actions>
