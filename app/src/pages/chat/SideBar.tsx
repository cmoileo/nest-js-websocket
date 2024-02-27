import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {FormEvent} from "react";
import RoomService from '../../services/room.service';

const SideBar = ({rooms}) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        RoomService.createRoom(e.target[0].value)
    }
    console.log('rooms : ', rooms)
    return (
        <aside>
            <h3>Available rooms :</h3>
            <ul>
                {
                    rooms.map((room: any) => {
                        const roomUrl = `/rooms?room=${room.name}`
                        return <li key={room.id}><a href={roomUrl}>{room.name}</a></li>
                    })
                }
            </ul>
            <form action={submit} onSubmit={(e: FormEvent) => handleSubmit(e)} className="create-room">
                <h3>Create room :</h3>
                <input type="text"/>
                <button type="submit">Create</button>
            </form>
        </aside>
    )
}

export default SideBar;