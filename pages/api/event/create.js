import { EventSchema } from "@/schemas/event.schema"
import { eventCreate } from "@/services/events.service"


export default async function createEvent(req, res) {
  const { name, description, date, venue, clubId } = req.body
  const data = {
    name,
    description,
    date: new Date(date),
    venue,
    clubId
  }
  console.log(data)
  try {
    
    EventSchema.parse(data)
    const event = await eventCreate(data)
    res.json({ message: 'Event created successfully', event })
  } catch (e) {
    res.status(400)
    res.json({ message: e.message })
  }
}
