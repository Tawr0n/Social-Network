const subscribers = {
    messagesReceived: [] as Array<MessagesReceivedSubscriberType>,
    statusChanged: [] as Array<StatusChangedSubscriberType>
}

let ws: WebSocket | null = null

const onOpenHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const onCloseHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.messagesReceived.forEach(s => s(newMessages))
};

const onErrorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('RESTART PAGE')
}

function cleanUp() {
    ws?.removeEventListener('close', onCloseHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.removeEventListener('open', onOpenHandler)
    ws?.removeEventListener('error', onErrorHandler)
}

function notifySubscribersAboutStatus(status: StatusType) {
    subscribers.statusChanged.forEach((s) => s(status))
}

function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
    ws.addEventListener('open', onOpenHandler)
    ws.addEventListener('error', onErrorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    subscribe(event: EventType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event].push(callback)

        return () => {
            // @ts-ignore
            subscribers[event] = subscribers[event].filter((s) => callback !== s)
        }
    },
    unsubscribe(event: EventType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter((s) => callback !== s)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stop() {
        subscribers.messagesReceived = []
        subscribers.statusChanged = []
        cleanUp()
        ws?.close()
    }
}


type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type EventType = 'messagesReceived' | 'statusChanged'
