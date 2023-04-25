import {InferActionsTypes, ThunkType} from "./reduxStore";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {v4 as uuidv4} from 'uuid';


const MESSAGES_RECEIVED = 'social-network/chat/MESSAGES_RECEIVED'
const MESSAGES_RESET = 'social-network/chat/MESSAGES_RESET'
const STATUS_CHANGED = 'social-network/chat/STATUS_CHANGED'


const initialState: InitialAuthStateType = {
    messages: [],
    status: 'pending'
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialAuthStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages
                    .map((m) => ({id: uuidv4(), ...m}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case MESSAGES_RESET:
            return {
                ...state,
                messages: []
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }

}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: MESSAGES_RECEIVED,
        messages
    } as const),
    messagesReset: () => ({
        type: MESSAGES_RESET
    } as const),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED,
        status
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType<ActionsTypes, void> => (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messagesReceived', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType<ActionsTypes, void> => (dispatch) => {
    chatAPI.unsubscribe('messagesReceived', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(actions.messagesReset())
}

export const sendMessage = (message: string): ThunkType<ActionsTypes, void> => () => {
    chatAPI.sendMessage(message)
}


export default chatReducer

export type InitialAuthStateType = {
    messages: ChatMessageType[]
    status: StatusType
}
type ActionsTypes = InferActionsTypes<typeof actions>
type ChatMessageType = ChatMessageAPIType & { id: string }
