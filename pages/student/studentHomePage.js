import { fetchAvailableEvents } from "@/operations/student.fetch"
import { useEffect, useState } from "react"

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    if (context.req.session.user.role === 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/adminHomePage'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/cc/ccHomepage'
            }
        }
    } else if (context.req.session.user.role === 'CLUB') {
        return {
            redirect: {
                permanent: false,
                destination: '/club/clubHomePage'
            }
        }
    } else {
        const user = context.req.session.user;
        return {
            props: { user: user }
        }
    }
}

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