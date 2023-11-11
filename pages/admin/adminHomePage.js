import { useState, useEffect } from 'react';

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    }
    if (context.req.session.user.role === 'CLUB') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'CC') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    } else if (context.req.session.user.role === 'STUDENT') {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/club/clubLogin'
            }
        }
    } else {
        const user = context.req.session.user;
        return {
            props: { user: user }
        }
    }
}

export default function AdminHomePage(props) {
    const user = props.user;
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data from your backend API
        // This is just a placeholder. Replace it with your actual API call.
        fetch('/api/event/fetchAllEvents')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.events)) {
                    setEvents(data.events);
                } else {
                    // Handle non-array data
                    console.error('Expected an array from /api/event/fetchAllEvents, got:', data);
                }
            });
    }, []);

    const handleApprove = (eventId) => {
        const token = localStorage.getItem('admin'); // assuming the token is stored under 'admin' key
    
        fetch('/api/event/approveEvent', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventId })
        })
        .then(response => response.json())
        .then(data => {
            // Update the events state to reflect the approval
            setEvents(events.map(event =>
                event.id === eventId ? { ...event, approval: data.eventApproval } : event
            ));
        });
    };

    return (
        <div>
            <h1>Admin Home Page</h1>
            {events.map(event => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <button onClick={() => handleApprove(event.id)}>Approve</button>
                </div>
            ))}
        </div>
    );
}