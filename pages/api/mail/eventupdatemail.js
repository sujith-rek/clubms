import { transporter } from "@/utills/transporter";

export default async function eventUpdateMail(req, res) {
    res.json({ message: 'Event update mail sent.' })
}

