import React from 'react'
import { useState } from 'react'
import { createEvent } from '@/operations/club.fetch'
import './Event.scss'

function Event() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [venue, setVenue] = useState("")
    const [clubId, setClubId] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name,
            description,
            date,
            venue,
            clubId
        }
        const res = await createEvent(data)
        console.log(res)
    }

    return (
        <>
            <div>Event Registration</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                <input type="text" placeholder="Venue" onChange={(e) => setVenue(e.target.value)} />
                <input type="text" placeholder="Club Id" onChange={(e) => setClubId(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Event