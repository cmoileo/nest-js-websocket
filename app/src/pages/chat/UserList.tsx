import socket from "../../utils/socket.ts";

const UserList = ({connectedUsers}) => {
    return ( 
        <div>
            <p>Connected users : </p>
            <ul>
                {connectedUsers.map((user, index) => {
                    return (
                        <li key={index}>
                            {user.user.username}
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default UserList;