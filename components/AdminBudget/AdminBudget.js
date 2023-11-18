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
  Card,
  Box,
  CardBody,
  Text
} from "@chakra-ui/react"
import { allocateBudgetToClub, updateBudget } from "@/operations/admin.fetch"
import { useState } from "react"

function AdminBudget({ clubs, budgetRequests, allBudgets, userBudget }) {

  const [selectedClub, setSelectedClub] = useState(0)
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [adminStatus, setAdminStatus] = useState("PENDING")
  const [isOpen, setIsOpen] = useState(false)
  const [remarks, setRemarks] = useState("")

  const handleAllocateBudget = async () => {
    const budget = allBudgets.find(b => b.clubId === parseInt(selectedClub));
    const data = {
      id: budget.id,
      clubId: selectedClub,
      amount
    }
    const result = await allocateBudgetToClub(data)
    if (result.status === 200) {
      alert("Budget Allocated Successfully")
      window.location.reload()
    }
    else {
      console.log(result)
      alert("Error in allocating budget")
    }
  }

  const handleUpdateBudget = async (clubId) => {
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
          <Tab>Club budget details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Select placeholder="Select Club" onChange={(e) => setSelectedClub(e.target.value)}>
              {clubs.map((club) => {
                return <option value={club.id} key={club.id}>{club.name}</option>
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
                      <Tr key={request.id}>
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
                      <Tr key={request.id}>
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
                      <Tr key={request.id}>
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
            <div display={"flex"} justifycontent={"space-evenly"} flexwrap={"wrap"} >
              {
                userBudget.map((budget) => {
                  return (
                    <Card margin={"1rem"} width={"20rem"} bg={budget.Budget[0].remaining < 0 ? "red.400" : budget.Budget[0].spent > budget.Budget[0].remaining ? "orange.300" : "green.300"} key={budget.id}>
                      <CardBody>
                        <Box>
                          <Text size='md'>
                            Name - {budget.name}
                          </Text>
                        </Box>
                        <Box marginTop={"0.5rem"}>
                          <Text size='md'>
                            Allocated - {budget.Budget[0].allocated}
                          </Text>
                        </Box>
                        <Box marginTop={"0.5rem"}>
                          <Text size='md'>
                            Spent - {budget.Budget[0].spent}
                          </Text>
                        </Box>
                        <Box marginTop={"0.5rem"}>
                          <Text size='md'>
                            Remaining - {budget.Budget[0].remaining}
                          </Text>
                        </Box>
                      </CardBody>
                    </Card>
                  )
                }
                )
              }
            </div>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminBudget