import { Card } from "evergreen-ui"
import React, { useState, useEffect, useRef } from "react"
import MoistureGraph from "../components/moistureGraph"

//{ nodeName: String, data: [{ percentage: Number, dateRecived: Date }] }

function IrrigationWebSocket() {
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
        ws.current = new WebSocket("ws://127.0.0.1:8080/moistureLevels")
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
    return (
        <div>
            {irrigtaionData.map((node, index) => {
                return (
                    <div key={index}>
                        <h4>Node: {node.nodeName}</h4>
                        <MoistureGraph data={node.data} />
                    </div>
                )
            })}
        </div>
    )
}

export default IrrigationWebSocket
