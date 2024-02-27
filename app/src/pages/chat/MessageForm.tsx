import chatService from "../../services/chat.service.ts";
import { FormEvent } from "react";

const MessageForm = () => {
    const url = window.location.href;
    const room: string = url.split("=").pop() || "general";
    console.log("room : ", room)

    const handleSubmit = (e: FormEvent) => {
        chatService.sendChatMessage(e, room);
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <input type="text" placeholder="Enter your message..." />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;