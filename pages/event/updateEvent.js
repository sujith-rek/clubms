import EventUpdate from "@/components/EventUpdate/EventUpdate";
import { fetchEvent } from "@/operations/club.fetch";
import { eventFindUnique } from "@/services/events.service";


function updateEvent({event}){
    return (
        <div>
            <EventUpdate event={event}/>
        </div>
    )
}

export default updateEvent

export async function getServerSideProps(context) {
    // const { eventId, clubId } = context.query
    let eventId = 3
    let clubId = 1
    const res = await eventFindUnique(eventId)
    console.log(res)
    const event = JSON.parse(JSON.stringify(res))
    return {
        props: {
            event
        }
    }
}