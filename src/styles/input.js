import styled from "styled-components"

const Button = styled.button({
    display: "inline-block",
    padding: "0.3rem 1.2rem",
    margin: "0 0.1rem 0.1rem 0",
    border: "0.16em solid rgba(255,255,255,0)",
    borderRadius: "2rem",
    boxSizing: "border-box",
    textDecoration: "none",
    color: "#FFFFFF",
    textAlign: "center",
    transition: "all 0.2s",
    "&:hover": {
        borderColor: "rgba(255,255,255,1)",
    },
})

export const SuccessButton = styled(Button)({
    backgroundColor: "rgba(88, 129, 87, 1)",
})

export const WarningButton = styled(Button)({
    backgroundColor: "rgba(254, 95, 85, .5)",
})

export const ErrorButton = styled(Button)({
    backgroundColor: "rgba(254, 95, 85, 1)",
})
