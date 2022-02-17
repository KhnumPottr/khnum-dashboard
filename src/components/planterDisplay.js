import React from "react"
import Consumer from "../connections/irrigationWebSocket"
import MoistureGraph from "./moistureGraph"
import { Container } from "../styles/layout"
import { Title, SubTitle } from "../styles/text"

function PlanterDisplay() {
    return (
        <Consumer>
            {(context) => {
                if (context.length != undefined) {
                    context.forEach((element) => {
                        return (
                            <Container>
                                <Title>{element.nodeName}</Title>
                                <SubTitle>
                                    Moisture Level: {element.data[element.data.length - 1].moisturePercentage}%
                                </SubTitle>
                                <MoistureGraph data={element.data} />
                            </Container>
                        )
                    })
                }
            }}
        </Consumer>
    )
}

export default PlanterDisplay
