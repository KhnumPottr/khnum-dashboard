import React from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import DoughnutMoistureGraph from "./graphs/doughnutMoistureGraph"
import { Section, Card, SectionWidthHalf, CardButtons } from "../styles/layout"
import { DoughnutContainer, Percentage } from "../styles/graphDisplays"
import { SubTitle, Paragraph, Label, Value } from "../styles/text"
import { SuccessButton } from "../styles/input"
import { RiSeedlingFill } from "react-icons/ri"
import { Link } from "react-router-dom"

function PlanterSummaryDisplay() {
    const planterData = useIrrigation()
    if (planterData.length === 0) return <Section />
    return (
        <Section>
            {Object.keys(planterData).map((key) => {
                if (key !== "send") {
                    return (
                        <Card small key={key}>
                            <SectionWidthHalf>
                                <SubTitle>
                                    {key}
                                    <RiSeedlingFill />
                                </SubTitle>
                                <Paragraph>
                                    <Label>Age:</Label>
                                    <Value>76 Days</Value>
                                </Paragraph>
                                <Paragraph>
                                    <Label>Days till next watering:</Label>
                                    <Value>14 days</Value>
                                </Paragraph>
                                <Paragraph>
                                    <Label>Plants:</Label>
                                    <Value>Flowers, Tomatoes, Beans, Roses, Basil</Value>
                                </Paragraph>
                                <CardButtons>
                                    <Link to={`/planter/${key}`} key={key}>
                                        <SuccessButton>Details</SuccessButton>
                                    </Link>
                                </CardButtons>
                            </SectionWidthHalf>
                            <SectionWidthHalf>
                                <DoughnutContainer>
                                    <Percentage>
                                        {planterData[key].data[planterData[key].data.length - 1].moisturePercentage}
                                    </Percentage>
                                    <DoughnutMoistureGraph planter={key} />
                                </DoughnutContainer>
                            </SectionWidthHalf>
                        </Card>
                    )
                }
            })}
        </Section>
    )
}

export default PlanterSummaryDisplay
