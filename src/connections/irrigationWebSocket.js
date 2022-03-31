import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import PropTypes from "prop-types"

const IrrigationContext = createContext()

function IrrigationWebSocket({ children }) {
    const [irrigationData, setIrrigationData] = useState({ nodes: {} })
    const ws = useRef(null)

    const dataReducer = (data) => {
        switch (data.messageType) {
            case "ARRAY_DATA":
                if (
                    irrigationData.nodes[data.nodeName] == undefined ||
                    irrigationData.nodes[data.nodeName].data.length <= 1
                ) {
                    setIrrigationData((prevState) => {
                        return {
                            ...prevState,
                            nodes: {
                                ...prevState.nodes,
                                [data.nodeName]: { nodeName: data.nodeName, data: formateDateInArray(data.payload) },
                            },
                        }
                    })
                }
                break
            case "DATA": {
                let updateData
                if (irrigationData.nodes[data.nodeName] == undefined) {
                    updateData = [
                        {
                            moisturePercentage: data.payload,
                            dateReceived: formateDate(data.dateReceived),
                        },
                    ]
                } else {
                    updateData = [
                        ...irrigationData.nodes[data.nodeName].data,
                        {
                            moisturePercentage: data.payload,
                            dateReceived: formateDate(data.dateReceived),
                        },
                    ]
                }
                setIrrigationData((prevState) => {
                    return {
                        ...prevState,
                        nodes: {
                            ...prevState.nodes,
                            [data.nodeName]: {
                                ...prevState[data.nodeName],
                                data: updateData,
                            },
                        },
                    }
                })
                break
            }
            case "SWITCH":
                setIrrigationData((prevState) => {
                    return {
                        ...prevState,
                        irrigationState: data.payload,
                    }
                })
                break
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

    const sendMessage = (message) => {
        if (ws.current) {
            ws.current.send(message)
        }
    }

    useEffect(() => {
        ws.current = new WebSocket(`ws://${process.env.REACT_APP_WEBSOCKET_ADDRESS}/clientData`)
        const wsCurrent = ws.current

        wsCurrent.onmessage = (e) => {
            const message = JSON.parse(e.data)
            dataReducer(message)
        }

        setIrrigationData((prevState) => {
            return { ...prevState, send: sendMessage }
        })

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
