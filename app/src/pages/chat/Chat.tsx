import {useEffect, useState} from "react";
import socket from "../../utils/socket.ts";
import instance from "../../services/api.service.ts";
import axios from "axios";
const Chat = () => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/messages/`)
            .then((res) => {
                setChats(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    socket.on('chat', (data) => {
        console.log("data : ", data)
        setChats(data.allMessages)
    })
    return (
        <div>
            {chats.map((chat) => {
                return (
                    <div key={chat.id}>
                        <h3>{chat.username}</h3>
                        <p>{chat.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Chat;