import { useEffect } from "react"
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react"

function ClubBudget() {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Create Budget Approval Request</Tab>
                    <Tab>Approved Requests</Tab>
                    <Tab>Pending Requests</Tab>
                    <Tab>Other details</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ClubBudget