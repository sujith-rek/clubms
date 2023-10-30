import './RoomBookCreate.scss'
import { useState } from 'react'
import { roomBook } from '@/operations/club.fetch'

function RoomBookCreate() {

    const [date, setDate] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { date, from, to, clubId: 1, description }
        const res = await roomBook(data)
        console.log(res)
        alert(res.message)
    }

    return (
        <>
            <div>RoomBookCreate</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
                <input
                    type="time"
                    placeholder="From"
                    onChange={(e) => setFrom(e.target.value)}
                    value={from}
                />
                <input
                    type="time"
                    placeholder="To"
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <button type="submit">Book</button>
            </form>

        </>
    )
}

export default RoomBookCreate