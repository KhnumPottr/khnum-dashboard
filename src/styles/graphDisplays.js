import styled from "styled-components"

export const DoughnutContainer = styled.div({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    height: "100%",
    width: "100%",
})

export const LineContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "40rem",
    width: "100%",
})

export const Percentage = styled.p({
    zIndex: 10,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3rem",
    margin: "0",
    color: "rgba(46, 94, 170, 1)",
})

export const Doughnut = styled.div({
    top: 0,
    left: 0,
    height: "5rem",
    width: "5rem",
})
