import { transporter} from "@/utills/transporter";

export default async function roomUpdateMail(req, res) {
    res.json({ message: 'Room update mail sent.' })
}