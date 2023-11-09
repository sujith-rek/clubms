import React from 'react'
import { useState } from 'react'
import { createEvent } from '@/operations/club.fetch'
import './EventCreate.scss'

function EventCreate({clubIdFromProps}) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [venue, setVenue] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            description,
            date,
            venue,
            clubId : parseInt(clubIdFromProps)
        }
        const res = await createEvent(data)
        alert(res.message)
        window.location.reload()
    }

    return (
        <>
            <div>Event Registration</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                <input type="text" placeholder="Venue" onChange={(e) => setVenue(e.target.value)} />  
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default EventCreate