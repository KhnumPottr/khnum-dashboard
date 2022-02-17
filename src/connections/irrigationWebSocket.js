import React, { useState, useEffect, useRef, createContext } from "react"
import PropTypes from "prop-types"

const IrrigationContext = createContext()

function IrrigationWebSocket(props) {
    const [irrigationData, setIrrigationData] = useState([])
    const ws = useRef(null)

    const updateData = (data) => {
        switch (data.messageType) {
            case "ARRAY_DATA":
                setIrrigationData((prevState) => [
                    ...prevState,
                    { nodeName: data.nodeName, data: formateDateInArray(data.payload) },
                ])
                break
            default:
                throw { name: "NotImplementedError", message: "too lazy to implement" }
        }
    }

    const formateDate = (date) => {
        return new Date(
            date.year,
            date.monthValue,
            date.dayOfMonth,
            date.hour,
            date.minute,
            date.second
        ).toLocaleDateString("en", { day: "numeric", month: "short" })
    }

    const formateDateInArray = (payload) => {
        return payload.map((data) => {
            return { moisturePercentage: data.moisturePercentage, dateReceived: formateDate(data.dateReceived) }
        })
    }

    useEffect(() => {
        ws.current = new WebSocket("ws://192.168.1.16:8080/moistureLevels")
        ws.current.onopen = () => console.log("ws opened")
        ws.current.onclose = () => console.log("ws closed")

        const wsCurrent = ws.current

        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data)
            updateData(message)
        }

        return () => {
            wsCurrent.close()
        }
    }, [])

    // useEffect(() => {}, [irrigationData])
    return <IrrigationContext.Provider value={irrigationData}>{props.children}</IrrigationContext.Provider>
}

IrrigationWebSocket.propTypes = {
    children: PropTypes.object,
}

export { IrrigationWebSocket }

export default IrrigationContext
