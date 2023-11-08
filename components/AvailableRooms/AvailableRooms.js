import useRoom from "@/hooks/useRoom"
import { roomBook } from "@/operations/club.fetch";
import { useState } from "react";

export default function AvailableRooms({room,clubId}) {
    const {toTime, fromTime} = useRoom();
    const [desc, setDesc] = useState('')
    const handleClick = async () => {
        console.log(fromTime, toTime);
        if(desc === '') {
            alert('Please fill all the fields');
            return;
        }
        const data = {
            "from" : fromTime,
            "to" : toTime,
            clubId,
            "description" : desc,
        }
        const res = await roomBook(data)
        if(res.status === 200) {
            alert(res.message);
            window.location.reload()
        } else {
            alert(res.message);
        }
    }
    return (
        <div>
            <p>{room.id}</p>
            <p>{room.roomNumber}</p>
            <p>{room.roomBlock}</p>
            <p>{room.capacity}</p>
            <input onChange={(e) => setDesc(e.target.value)} placeholder="description"  />
            <button onClick={handleClick}>Book this room</button>
        </div>
    )
}