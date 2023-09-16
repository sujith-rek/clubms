import {z} from "zod";


export const EventSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
    description: z.string({
        required_error: "Description is required"
    })
    .min(3, "Description must be at least 3 characters long")
    .max(50, "Description must be at most 50 characters long"),
    date: z.date({
        required_error: "Date is required"
    }),
    venue: z.string({
        required_error: "Venue is required"
    }),
    clubId: z.number({
        required_error: "clubId is required"
    })
})

