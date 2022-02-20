import React from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import DoughnutMoistureGraph from "./doughnutMoistureGraph"
import { Container, Card } from "../styles/layout"
import { DoughnutContainer, Percentage, Doughnut } from "../styles/graphDisplays"
import { Title } from "../styles/text"
import { RiSeedlingFill } from "react-icons/ri"

function PlanterSummaryDisplay() {
    const planterData = useIrrigation()
    if (planterData.length === 0) return <Container />
    return (
        <Container>
            {Object.keys(planterData).map((key) => {
                return (
                    <Card key={key}>
                        <Title>
                            {key}
                            <RiSeedlingFill />
                        </Title>
                        <DoughnutContainer>
                            <Percentage>
                                {planterData[key].data[planterData[key].data.length - 1].moisturePercentage}
                            </Percentage>
                            <Doughnut>
                                <DoughnutMoistureGraph planter={key} />
                            </Doughnut>
                        </DoughnutContainer>
                    </Card>
                )
            })}
        </Container>
    )
}

export default PlanterSummaryDisplay
