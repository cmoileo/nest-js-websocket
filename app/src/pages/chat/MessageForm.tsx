import chatService from "../../services/chat.service.ts";

const messageForm = () => {
    return (
        <form onSubmit={chatService.sendChatMessage} className="message-form">
            <input type="text" placeholder="Enter your message..." />
            <button type="submit">Send</button>
        </form>
    );
}

export default messageForm;