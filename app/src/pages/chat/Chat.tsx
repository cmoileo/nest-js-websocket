import {SetStateAction, useEffect, useState} from "react";
import socket from "../../utils/socket";
import axios from "axios";
import { transformDateFunc } from '../../utils/transformDate';

const Chat = ({rooms, setRooms}) => {
    const [chats, setChats] = useState([])
    const url = window.location.href;
    const room: string = url.split("=").pop() || "general";
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/messages/`)
            .then((res: Response) => {
                setChats(res.data)
            })
            .catch((err: Error) => {
                console.log(err)
            })
    }, [])

    socket.on('chat', (data: any) => {
        console.log("data : ", data)
        setChats(data.allMessages)
        setRooms(data.allRooms)
        console.log(rooms)
    })
    return (
        <div class={"chat-c"}>
            {chats.map((chat) => {
                if (chat.roomName === room) {
                    return (
                        <div class={"chat"} key={chat.id}>
                            <a href={`/chat/${chat.username}`}>
                                <h3>{chat.username}</h3>
                            </a>
                            <p>{chat.message}</p>
                            <label htmlFor="heure">{transformDateFunc(chat.createdAt)}</label>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Chat;