import { createContext, useState } from "react";

export const RoomContext = createContext({});

export function RoomProvider({children, ...props}) {
    const [rooms, setRooms] = useState([]);
    const [toTime, setToTime] = useState('');
    const [fromTime, setFromTime] = useState('');
    const room = {
        rooms,
        setRooms,
        toTime,
        setToTime,
        fromTime,
        setFromTime,
        ...props
    }
    return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>
}