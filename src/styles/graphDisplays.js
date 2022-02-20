import styled from "styled-components"

export const DoughnutContainer = styled.div({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
})

export const Percentage = styled.p({
    zIndex: 10,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "4rem",
    margin: "0",
    color: "#4F9D69",
})

export const Doughnut = styled.div({
    top: 0,
    left: 0,
})
