import AvailableRooms from '@/components/AvailableRooms/AvailableRooms'
import useRoom from '@/hooks/useRoom'
import { fetchRooms } from '@/operations/club.fetch'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react'
export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    }
    if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/clubLogin'
            }
        }
    } else {
        const user = context.req.session.user;
        return {
            props: { user: user }
        }
    }
}

export default function ClubHomePage({ user }) {
    const [date, setDate] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const { rooms, setRooms, setToTime, setFromTime } = useRoom();
    const [isFetching, setIsFetching] = useState(false);
    const seeAvailRooms = async () => {
        if (from === '' || to === '') {
            alert('Please fil all the fields');
            return;
        }
        try {
            setIsFetching(false)
            const response = await fetchRooms({
                startDate: new Date(from).toISOString(),
                endDate: new Date(to).toISOString,
            });
            if (response.status === 200) {
                setRooms(response.rooms);
                setToTime(to);
                setFromTime(from);
                setIsFetching(true)
            } else {
                console.log(response.message)
            }
        } catch (e) {
            alert(e.message);
        }
    }
    return (
        <div>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <div>
                <div>
                    <FormControl>
                        <FormLabel>From</FormLabel>
                        <Input onChange={(e) => setFrom(e.target.value)} type='datetime-local' />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel>To</FormLabel>
                        <Input onChange={(e) => setTo(e.target.value)} type='datetime-local' />
                    </FormControl>
                </div>
                <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={seeAvailRooms}>Fetch Rooms</Button>
            </div>
            {isFetching ?
                <div>{rooms.map((room,index) => {
                    return (
                        <AvailableRooms key={index} room={room} clubId={user.id} />
                    )
                })}</div> : null
            }
        </div>
    )
}