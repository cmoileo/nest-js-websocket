import socket from "../utils/socket"

const sendChatMessage = async (e: FormDataEvent) => {
    e.preventDefault()
    socket.emit("chat", {
        message: e.target[0].value,
        username: "ern2"
    })
}

const ChatService = {
    sendChatMessage,
}

export default ChatService;