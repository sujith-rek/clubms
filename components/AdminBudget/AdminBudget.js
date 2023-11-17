import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Select,
  FormControl,
  Button,
  Input,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr, Th, Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react"
import { allocateBudgetToClub, updateBudget } from "@/operations/admin.fetch"
import { useState } from "react"

function AdminBudget({ clubs, budgetRequests }) {

  const [selectedClub, setSelectedClub] = useState(0)
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [adminStatus, setAdminStatus] = useState("PENDING")
  const [isOpen, setIsOpen] = useState(false)
  const [remarks, setRemarks] = useState("")

  const handleAllocateBudget = async () => {
    const data = {
      clubId: selectedClub,
      amount
    }
    const result = await allocateBudgetToClub(data)
    if (result.status === 200) {
      alert("Budget Allocated Successfully")
      window.location.reload()
    }
    else {
      alert("Error in allocating budget")
    }
  }

  const handleUpdateBudget = async (clubId) => {
    console.log(clubId)
    setIsOpen(true)
    setSelectedClub(clubId)
    setAmount(budgetRequests.find((request) => request.id === clubId).amount)
    setDescription(budgetRequests.find((request) => request.id === clubId).description)
    setAdminStatus(budgetRequests.find((request) => request.id === clubId).adminStatus)
    setRemarks(budgetRequests.find((request) => request.id === clubId).remarks)
  }

  const postUpdateBudget = async () => {
    const data = {
      id: selectedClub,
      adminStatus,
      remarks
    }
    const result = await updateBudget(data)
    if (result.status === 200) {
      alert("Budget Updated Successfully")
      window.location.reload()
    }
    else {
      alert("Error in updating budget")
    }
  }


  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Budget</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} disabled />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select placeholder="Select Status" value={adminStatus} onChange={(e) => setAdminStatus(e.target.value)}>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="PENDING">PENDING</option>
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Input placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </FormControl>
            <br />
            <FormControl>
              <Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={() => postUpdateBudget()}>Update</Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tabs>
        <TabList>
          <Tab>Allocate Budget</Tab>
          <Tab>To be Approved/Pending</Tab>
          <Tab>Approved</Tab>
          <Tab>Rejected</Tab>
          <Tab>Update Budget</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Select placeholder="Select Club" onChange={(e) => setSelectedClub(e.target.value)}>
              {clubs.map((club) => {
                return <option value={club.id}>{club.name}</option>
              })}
            </Select>
            <div>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
              </FormControl>
              <br />
              <Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={handleAllocateBudget}>Allocate</Button>
            </div>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Amount</Th>
                  <Th>Description</Th>
                  <Th>Attachments</Th>
                  <Th>Update?</Th>
                </Tr>
              </Thead>
              <Tbody>
                {budgetRequests.map((request) => {
                  if (request.adminStatus === "PENDING") {
                    return (
                      <Tr>
                        <Td>{request.amount}</Td>
                        <Td>{request.description}</Td>
                        <Td>{request.attachment}</Td>
                        <Td><Button colorScheme='blue' marginRight={"10px"} color={"white"} onClick={() => handleUpdateBudget(request.id)}>Update</Button></Td>
                      </Tr>
                    )
                  }
                })}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Amount</Th>
                  <Th>Description</Th>
                  <Th>Attachments</Th>
                </Tr>
              </Thead>
              <Tbody>
                {budgetRequests.map((request) => {
                  if (request.adminStatus === "APPROVED") {
                    return (
                      <Tr>
                        <Td>{request.amount}</Td>
                        <Td>{request.description}</Td>
                        <Td>{request.attachment}</Td>
                      </Tr>
                    )
                  }
                })}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Amount</Th>
                  <Th>Description</Th>
                  <Th>Attachments</Th>
                </Tr>
              </Thead>
              <Tbody>
                {budgetRequests.map((request) => {
                  if (request.adminStatus === "REJECTED") {
                    return (
                      <Tr>
                        <Td>{request.amount}</Td>
                        <Td>{request.description}</Td>
                        <Td>{request.attachment}</Td>
                      </Tr>
                    )
                  }
                })}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminBudget