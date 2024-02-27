import {useEffect, useState} from "react";
import UserList from "./UserList.tsx";
import Chat from "./Chat.tsx";
import MessageForm from "./MessageForm.tsx";
import socket from "../../utils/socket";
import SideBar from './SideBar.tsx';

const RoomPage = () => {
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        // on new user connected
        socket.on('users', (data) => {
            console.log("data : ", data)
            setConnectedUsers(data)
        })
    }, [])

    return ( 
        <div className={"app"}>
            <div className="messages-c">
                <UserList connectedUsers={connectedUsers} />
                <Chat rooms={rooms} setRooms={setRooms} />
                <MessageForm />
            </div>
            <SideBar rooms={rooms} />
        </div>
     );
}
 
export default RoomPage;