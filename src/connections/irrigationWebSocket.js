import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import PropTypes from "prop-types"

const IrrigationContext = createContext()
IrrigationContext.displayName = "IrrigationContext"

function IrrigationWebSocket({ children }) {
    const [planterData, setPlanterData] = useState({ planterDetails: {}, moistureHistory: {} })
    const ws = useRef(null)

    const dataReducer = (data) => {
        switch (data.messageType) {
            case "IRRIGATION_ARRAY_DATA":
                if (
                    planterData.moistureHistory[data.id] == undefined ||
                    planterData.moistureHistory[data.id].length <= 1
                ) {
                    setPlanterData((prevState) => {
                        return {
                            ...prevState,
                            moistureHistory: {
                                ...prevState.moistureHistory,
                                [data.id]: [...formateDateInArray(data.payload)],
                            },
                        }
                    })
                }
                break
            case "PLANTER_DATA": {
                setPlanterData((prevState) => {
                    const { irrigating, moistureLevel, upperLimit, lowerLimit, plants, datePlanted } = data.payload
                    return {
                        ...prevState,
                        planterDetails: {
                            ...prevState.planterDetails,
                            [data.id]: {
                                planterId: data.id,
                                title: data.payload.title,
                                irrigating: irrigating ? irrigating : false,
                                moisturePercentage: moistureLevel ? moistureLevel : null,
                                upperLimit: upperLimit ? upperLimit : null,
                                lowerLimit: lowerLimit ? lowerLimit : null,
                                plants: plants ? plants : null,
                                datePlanted: datePlanted ? datePlanted : null,
                            },
                        },
                    }
                })
                break
            }
            default:
                throw { name: "NotImplementedError", message: "too lazy to implement" }
        }
    }

    // const dataReducer = (data) => {
    //     console.log(data)
    //     switch (data.messageType) {
    //         case "IRRIGATION_ARRAY_DATA":
    //             if (irrigationData.nodes[data.id] == undefined || irrigationData.nodes[data.id].data.length <= 1) {
    //                 setIrrigationData((prevState) => {
    //                     return {
    //                         ...prevState,
    //                         nodes: {
    //                             ...prevState.nodes,
    //                             [data.id]: { id: data.id, data: formateDateInArray(data.payload) },
    //                         },
    //                     }
    //                 })
    //             }
    //             break
    //         case "PLANTER_DATA": {
    //             let updateData
    //             if (irrigationData.nodes[data.planterId] == undefined) {
    //                 updateData = [
    //                     {
    // title: data.payload.title,
    // irrigating: data.payload.irrigating,
    // moisturePercentage: data.payload.moistureLevel,
    // dateReceived: formateDate(data.dateReceived),
    //                     },
    //                 ]
    //             } else {
    //                 updateData = [
    //                     ...irrigationData.nodes[data.id].data,
    //                     {
    //                         title: data.payload.title,
    //                         irrigating: data.payload.irrigating,
    //                         moisturePercentage: data.payload.moistureLevel,
    //                         dateReceived: formateDate(data.dateReceived),
    //                     },
    //                 ]
    //             }
    //             setIrrigationData((prevState) => {
    //                 return {
    //                     ...prevState,
    //                     nodes: {
    //                         ...prevState.nodes,
    //                         [data.id]: {
    //                             ...prevState[data.id],
    //                             data: updateData,
    //                         },
    //                     },
    //                 }
    //             })
    //             break
    //         }
    //         default:
    //             throw { name: "NotImplementedError", message: "too lazy to implement" }
    //     }
    // }

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
            const { moistureLevel, dateReceived } = data
            return { moisturePercentage: moistureLevel, dateReceived: formateDate(dateReceived) }
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

        setPlanterData((prevState) => {
            return { ...prevState, send: sendMessage }
        })

        return () => {
            wsCurrent.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <IrrigationContext.Provider value={planterData}>{children}</IrrigationContext.Provider>
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
