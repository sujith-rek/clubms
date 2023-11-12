import React from 'react'
import { useState } from 'react'
import { createEvent } from '@/operations/club.fetch'
import {
    FormControl,
    FormLabel,
    Input,
    Button,

} from '@chakra-ui/react'
import './EventCreate.scss'

function EventCreate({ clubIdFromProps }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [venue, setVenue] = useState("")

    const handleSubmit = async () => {
        if(name === '' || description === '' || date === "" || venue === "") {
            alert('Please fill in all the fields');
            return;
        }
        const data = {
            name,
            description,
            date,
            venue,
            clubId: parseInt(clubIdFromProps)
        }
        const res = await createEvent(data)
        alert(res.message)
        window.location.reload()
    }

    return (
        <>
            <div>Event Registration</div>
            <div>
                <div>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input onChange={(e) => setName(e.target.value)} type='text' />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input onChange={(e) => setDescription(e.target.value)} type='text' />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel>Venue</FormLabel>
                        <Input onChange={(e) => setVenue(e.target.value)} type='text' />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input onChange={(e) => setDate(e.target.value)} type='datetime-local' />
                    </FormControl>
                </div>
                <br />
                <Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={() => handleSubmit()}>Create Event</Button>
            </div>
        </>
    )
}

export default EventCreate