import { fetchAvailableEvents } from "@/operations/student.fetch"
import { useEffect, useState } from "react"

export default function StudentHomePage() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchAvailableEvents().then((res) => {
            setEvents(res.events)
        })
    }, [])

    return (
        <div>
            <h1>Student Home Page</h1>

            {
                events.map((event) => {
                    return (
                        <div>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                            <p>{event.venue}</p>
                        </div>
                    )
                })
            }


        </div>
    )
}