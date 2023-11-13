import { useState, useEffect } from 'react'
import { updateEvent } from '@/operations/club.fetch'
import "./EventUpdate.scss"
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react'

function EventUpdate({ event }) {

    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [date, setDate] = useState(event.date)
    const [venue, setVenue] = useState(event.venue)
    const [update, setUpdate] = useState(false)
    const [time, setTime] = useState(event.date.slice(9, 14))

    useEffect(() => {
        console.log(event.date)
        setName(event.name)
        setDescription(event.description)
        setDate(new Date(event.date).toISOString().slice(0, 10))
        setVenue(event.venue)
        setTime(new Date(event.date).toISOString().slice(11, 16))
    }, [event])


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
        window.location.reload()
    }


    return (
        <>
            <div>Event Update</div>
            <Button marginTop={"10px"} marginBottom={"10px"} colorScheme="teal" variant="solid" onClick={() => setUpdate(!update)}>
                Edit Event?
            </Button>
            <div>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={!update} />
                </FormControl>
            </div>
            <div>
                <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} disabled={!update} />
                </FormControl>
            </div>
            <div>
                <FormControl id="date" isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date} disabled={!update} />
                </FormControl>
            </div>
            <div>
                <FormControl id="time" isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input type="time" placeholder="Time" onChange={(e) => setTime(e.target.value)} value={time} disabled={!update} />
                </FormControl>
            </div>
            <div>
                <FormControl id="venue" isRequired>
                    <FormLabel>Venue</FormLabel>
                    <Input type="text" placeholder="Venue" onChange={(e) => setVenue(e.target.value)} value={venue} disabled={!update} />
                </FormControl>
            </div>
            <div>
                <Button marginTop={"10px"} marginBottom={"10px"} colorScheme="teal" variant="solid" onClick={handleSubmit} disabled={!update}>
                    Update
                </Button>
            </div>
        </>
    )

}

export default EventUpdate



