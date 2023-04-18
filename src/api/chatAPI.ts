let subscribers = [] as Array<SubscriberType>

let ws: WebSocket | null = null

const onCloseHandler = () => {
    console.log('Close ws')
    setTimeout(createChannel, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages))
};

function createChannel() {
    ws?.removeEventListener('close', onCloseHandler)

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)

        return () => {
            subscribers = subscribers.filter((s) => callback !== s)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter((s) => callback !== s)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', onCloseHandler)
        ws?.removeEventListener('message', onMessageHandler)
        ws?.close()
    }
}


type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
