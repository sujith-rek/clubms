import { useState } from "react"
import { FormControl, Input, Button, FormLabel } from "@chakra-ui/react"
import { updateBudgetRequest } from "@/operations/budget.fetch"

function BudgetUpdate({ request }) {
    const [update, setUpdate] = useState(false)
    const [amount, setAmount] = useState(request.amount)
    const [description, setDescription] = useState(request.description)
    const [attachment, setAttachment] = useState(request.attachment)


    const handleSubmit = async () => {

        const data = {
            id: request.id,
            clubId: request.clubId,
            amount: parseInt(amount),
            description,
            attachment,
        }
        const response = await updateBudgetRequest(data)
        if (response.status === 200) {
            alert("Budget Request Updated Successfully")
            window.location.reload()
        }
        else {
            alert("Error in updating budget request")
        }
    }

    return (
        <>
            <Button marginTop={"10px"} marginBottom={"10px"} colorScheme="teal" variant="solid" onClick={() => setUpdate(!update)}>
                Edit Request?
            </Button>
            <div>
                <FormControl id="amount" isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input type="number" placeholder="Amount" value={amount} disabled={!update} onChange={(e) => setAmount(e.target.value)} />
                </FormControl>
            </div>
            <div>
                <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type="text" placeholder="Description" value={description} disabled={!update} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
            </div>
            <div>
                <FormControl id="attachment" isRequired>
                    <FormLabel>Attachment</FormLabel>
                    <Input type="text" placeholder="Attachment" value={attachment} disabled={!update} onChange={(e) => setAttachment(e.target.value)} />
                </FormControl>
            </div>
            <br />
            <Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={() => handleSubmit()}>Update Budget Request</Button>
        </>
    )
}

export default BudgetUpdate