import { EventSchema } from "@/schemas/event.schema"
import { eventCreate, eventApprovalCreate } from "@/services/events.service"


export default async function createEvent(req, res) {
  const { name, description, date, venue, clubId } = req.body
  const eventData = {
    name,
    description,
    date: new Date(date),
    venue,
    clubId
  }
  try {
    EventSchema.parse(eventData)
    const event = await eventCreate(data)
    await eventApprovalCreate({ eventId: event.id })
    res.json({ message: 'Event created successfully', event })
  } catch (e) {
    res.status(400)
    res.json({ message: e.message })
  }
}
