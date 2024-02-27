import socket from "../utils/socket"

const sendChatMessage = async (e: FormDataEvent, room: string) => {
    e.preventDefault()
    socket.emit("chat", {
        message: e.target[0].value,
        room: room
    })
}

const ChatService = {
    sendChatMessage,
}

export default ChatService;