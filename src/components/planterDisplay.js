import React, { useContext } from "react"
import IrrigationContext from "../connections/irrigationWebSocket"
import MoistureGraph from "./moistureGraph"
import { Container } from "../styles/layout"
import { Title, SubTitle } from "../styles/text"

function PlanterDisplay() {
    const [irrigationData, setIrrigationData] = useContext(IrrigationContext)

    // if (irrigationData != undefined) {
    //     console.log(irrigationData)
    // irrigationData.map((element, key) => {
    //     return (
    //         <Container key={key}>
    //             <Title>{element.nodeName}</Title>
    //             <SubTitle>Moisture Level: {element.data[element.data.length - 1].moisturePercentage}%</SubTitle>
    //             <MoistureGraph data={element.data} />
    //         </Container>
    //     )
    // })
    // } else {
    //     return <div />
    // }

    return (
        <IrrigationContext.Consumer>
            {(cxt) => {
                console.log(cxt)
                cxt.map((element, key) => {
                    console.log(key)
                    return (
                        <Container key={key}>
                            <Title>{element.nodeName}</Title>
                            <SubTitle>
                                Moisture Level: {element.data[element.data.length - 1].moisturePercentage}%
                            </SubTitle>
                            <MoistureGraph data={element.data} />
                        </Container>
                    )
                })
            }}
        </IrrigationContext.Consumer>
    )
}

export default PlanterDisplay
