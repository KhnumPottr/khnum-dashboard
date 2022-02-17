import React, { useState, useEffect, useRef, createContext } from "react"
import PropTypes from "prop-types"
import MoistureGraph from "../components/moistureGraph"

const { Provider, Consumer } = createContext()

function IrrigationWebSocket(props) {
    const initalState = []

    const [irrigtaionData, setIrrigtaionData] = useState(initalState)
    const ws = useRef(null)

    const updateData = (data) => {
        switch (data.messageType) {
            case "ARRAY_DATA":
                setIrrigtaionData((prevState) => [...prevState, { nodeName: data.nodeName, data: data.payload }])
                break
            default:
                throw { name: "NotImplementedError", message: "too lazy to implement" }
        }
    }

    useEffect(() => {
        ws.current = new WebSocket("ws://192.168.1.16:8080/moistureLevels")
        ws.current.onopen = () => console.log("ws opened")
        ws.current.onclose = () => console.log("ws closed")

        const wsCurrent = ws.current

        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data)
            updateData(message)
            console.log("e", message)
        }

        return () => {
            wsCurrent.close()
        }
    }, [])

    useEffect(() => {}, [irrigtaionData])
    return <Provider value={irrigtaionData}>{props.children}</Provider>
}

IrrigationWebSocket.propTypes = {
    children: PropTypes.array,
}

export { IrrigationWebSocket }

export default Consumer
