import { useContext } from "react";
import { RoomContext } from "@/context/roomContext";

export default function useRoom() {
    return useContext(RoomContext);
}