import { useState } from "react"
import BudgetUpdate from "../BudgetUpdate/BudgetUpdate";
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Card,
    Input,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { postBudgetRequest } from "@/operations/budget.fetch";

function ClubBudget({ requests, clubId, otherDetails }) {

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState('');
    const [update, setUpdate] = useState(false);
    const [requestId, setRequestId] = useState(0);

    const handleSubmit = async () => {
        const data = {
            amount: parseInt(amount),
            description,
            attachment,
            clubId: clubId,
        }
        const response = await postBudgetRequest(data);
        if (response.status === 200) {
            alert("Budget Request Created Successfully");
            window.location.reload();
        }
        else {
            alert("Error in creating budget request");
        }
    }


    return (
        <>
            <Modal isOpen={update} onClose={() => setUpdate(!update)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <BudgetUpdate request={requests.find(request => request.id === requestId)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Tabs>
                <TabList>
                    <Tab>Budget Approval Request</Tab>
                    <Tab>Approved Requests</Tab>
                    <Tab>Pending Requests</Tab>
                    <Tab>Rejected Requests</Tab>
                    <Tab>Other details</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <>
                            <FormControl>
                                <FormLabel>Amount</FormLabel>
                                <Input onChange={(e) => setAmount(e.target.value)} type="number" />
                            </FormControl>
                        </>
                        <>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input onChange={(e) => setDescription(e.target.value)} type="text" />
                            </FormControl>
                        </>
                        <>
                            <FormControl>
                                <FormLabel>Attachment Links</FormLabel>
                                <Input onChange={(e) => setAttachment(e.target.value)} type="text" />
                            </FormControl>
                        </>
                        <br />
                        <Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={() => handleSubmit()}>Create Budget Request</Button>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="striped" colorScheme="black">
                            <Thead>
                                <Tr>
                                    <Th>Amount</Th>
                                    <Th>Description</Th>
                                    <Th>Attachment</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {requests.map((request) => {
                                    if (request.adminStatus === "APPROVED")
                                        return (
                                            <Tr>
                                                <Th>{request.amount}</Th>
                                                <Th>{request.description}</Th>
                                                <Th>{request.attachment}</Th>
                                            </Tr>
                                        )
                                })}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="striped" colorScheme="black">
                            <Thead>
                                <Tr>
                                    <Th>Amount</Th>
                                    <Th>Description</Th>
                                    <Th>Attachment</Th>
                                    <Th>Status</Th>
                                    <Th>Update?</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {requests.map((request) => {
                                    if (request.adminStatus === "PENDING")
                                        return (
                                            <Tr>
                                                <Th>{request.amount}</Th>
                                                <Th>{request.description}</Th>
                                                <Th>{request.attachment}</Th>
                                                <Th>{request.adminStatus}</Th>
                                                <Th><Button onClick={() => {
                                                    setUpdate(!update);
                                                    setRequestId(request.id);
                                                }} colorScheme='blue' marginRight={"10px"} color={"white"}
                                                >Update</Button></Th>
                                            </Tr>
                                        )
                                })}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="striped" colorScheme="black">
                            <Thead>
                                <Tr>
                                    <Th>Amount</Th>
                                    <Th>Description</Th>
                                    <Th>Attachment</Th>
                                    <Th>Status</Th>
                                    <Th>Reject Reason</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {requests.map((request) => {
                                    if (request.adminStatus === "REJECTED")
                                        return (
                                            <Tr>
                                                <Th>{request.amount}</Th>
                                                <Th>{request.description}</Th>
                                                <Th>{request.attachment}</Th>
                                                <Th>{request.adminStatus}</Th>
                                                <Th>{request.adminRemarks}</Th>
                                            </Tr>
                                        )
                                })}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "black" }}>Club Budget Details</h1>
                        <br />
                        <div>
                            <h2>Allocated Budget</h2>
                            <h3>{otherDetails.allocated}</h3>
                            <br />
                            <h2>Spent</h2>
                            <h3>{otherDetails.spent}</h3>
                            <br />
                            <h2>Remaining</h2>
                            <h3>{otherDetails.remaining < 0 ? `Spent ${otherDetails.remaining * -1} extra` : otherDetails.remaining}</h3>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs >
        </>
    )
}

export default ClubBudget