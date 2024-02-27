import socket from "../utils/socket";

const RoomService = {
    createRoom: (roomName: string) => {
        window.location.href = "/rooms?room=" + roomName;
        return new Promise((resolve, reject) => {
            socket.emit('createRoom', roomName);

            socket.on('roomCreated', (room: string, clients ) => {
                if (room === roomName) {
                    resolve({ room, clients });
                } else {
                    reject('La room créée ne correspond pas à celle demandée.');
                }
                window.location.href = "/room?room=" + room;
            });

            socket.on('error', (error: WebSocketEventMap) => {
                reject(error);
            });
        });
    }
};

export default RoomService;
