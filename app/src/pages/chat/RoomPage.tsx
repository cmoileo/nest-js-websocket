import {useEffect, useState} from "react";
import UserList from "./UserList.tsx";
import Chat from "./Chat.tsx";
import MessageForm from "./MessageForm.tsx";
import socket from "../../utils/socket";

const RoomPage = () => {
    const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        // on new user connected
        socket.on('users', (data) => {
            console.log("data : ", data)
            setConnectedUsers(data)
        })
    }, [])

    return ( 
        <div>
            Room
            <UserList connectedUsers={connectedUsers} />
            <Chat />
            <MessageForm />
        </div>
     );
}
 
export default RoomPage;