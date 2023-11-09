import { useState,useEffect } from 'react'
import { updateEvent } from '@/operations/club.fetch'
import "./EventUpdate.scss"

function EventUpdate({event}) {

    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [date, setDate] = useState(event.date)
    const [venue, setVenue] = useState(event.venue)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        setName(event.name)
        setDescription(event.description)
        setDate(event.date.slice(0, 10))
        setVenue(event.venue)
    },[event])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            description,
            date,
            venue,
            clubId: event.clubId,
            eventId: event.id
        }
        const res = await updateEvent(data)
        console.log(res)
        alert(res.message)
    }


    return (
        <>
            <div>Event Update</div>
            <button onClick={() => setUpdate(!update)}>Edit Event?</button>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={!update} />
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} disabled={!update} />
                <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date} disabled={!update} />
                <input type="text" placeholder="Venue" onChange={(e) => setVenue(e.target.value)} value={venue} disabled={!update} />
                <button type="submit" disabled={!update}>Update</button>
            </form>
        </>
    )

}

export default EventUpdate



