import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import PropTypes from "prop-types"

const IrrigationContext = createContext()

function IrrigationWebSocket({ children }) {
    const [irrigationData, setIrrigationData] = useState({})
    const ws = useRef(null)

    const dataReducer = (data) => {
        switch (data.messageType) {
            case "ARRAY_DATA":
                if (!Object.prototype.hasOwnProperty.call(irrigationData, `${data.nodeName}`)) {
                    setIrrigationData((prevState) => {
                        return {
                            ...prevState,
                            [data.nodeName]: { nodeName: data.nodeName, data: formateDateInArray(data.payload) },
                        }
                    })
                }
                break
            case "DATA": {
                setIrrigationData((prevState) => {
                    return {
                        ...prevState,
                        [data.nodeName]: {
                            ...prevState[data.nodeName],
                            data: [
                                {
                                    moisturePercentage: data.payload,
                                    dateReceived: formateDate(data.dateReceived),
                                },
                            ],
                        },
                    }
                })
                break
            }
            default:
                throw { name: "NotImplementedError", message: "too lazy to implement" }
        }
    }

    const formateDate = (date) => {
        return new Date(
            date.year,
            date.monthValue - 1,
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
        ws.current = new WebSocket("ws://127.0.0.1:8080/moistureLevels")
        ws.current.onopen = () => console.log("ws opened")
        ws.current.onclose = () => console.log("ws closed")

        const wsCurrent = ws.current

        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data)
            dataReducer(message)
        }

        ws.current.send

        return () => {
            wsCurrent.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <IrrigationContext.Provider value={irrigationData}>{children}</IrrigationContext.Provider>
}

function useIrrigation() {
    const context = useContext(IrrigationContext)
    if (context === undefined) {
        throw new Error("useIrrigation must be used within a IrrigationWebSocket Provider")
    }
    return context
}

IrrigationWebSocket.propTypes = {
    children: PropTypes.array,
}

export { useIrrigation }

export default IrrigationWebSocket
