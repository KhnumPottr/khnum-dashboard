import styled from "styled-components"

export const Page = styled.div({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
})

export const Container = styled.div({
    minHeight: "20rem",
    margin: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
})

export const Section = styled.div({
    width: "100vw",
    minHeight: "20rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
})

export const SectionWidthHalf = styled.div({
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignContent: "center",
})

export const Card = styled.div({
    minHeight: "20rem",
    minWidth: "20rem",
    maxWidth: (props) => {
        return props.small ? "30rem" : props.medium ? "60rem" : props.large ? "90rem" : "30rem"
    },
    width: (props) => {
        return props.small ? "30vw" : props.medium ? "60vw" : props.large ? "90vw" : "30vw"
    },
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "1rem",
})

export const CardButtons = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-end",
    flexWrap: "wrap",
})

export const Header = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
})
