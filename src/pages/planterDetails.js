import React from "react"
import PlanterDetailsDisplay from "../components/planterDetailsDisplay"
import { Container, Header } from "../styles/layout"
import { Title } from "../styles/text"
import { Link, useParams } from "react-router-dom"
import { SuccessButton } from "../styles/input"

function PlanterDetails() {
    const plantId = useParams().id

    return (
        <Container>
            <Header>
                <Title>{plantId}</Title>
                <Link to={"/"}>
                    <SuccessButton>Return to Dash</SuccessButton>
                </Link>
            </Header>
            <PlanterDetailsDisplay />
        </Container>
    )
}

export default PlanterDetails
