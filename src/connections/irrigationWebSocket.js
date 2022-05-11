/* eslint-disable indent */
import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import PropTypes from "prop-types"

const IrrigationContext = createContext()
IrrigationContext.displayName = "IrrigationContext"

function IrrigationWebSocket({ initalState = { planterDetails: {}, moistureHistory: {} }, ...props }) {
    const [planterData, setPlanterData] = useState(initalState)
    const ws = useRef(null)

    const dataReducer = (data) => {
        switch (data.messageType) {
            case "IRRIGATION_ARRAY_DATA":
                if (
                    planterData.moistureHistory[data.id] == undefined ||
                    planterData.moistureHistory[data.id].length <= 1
                ) {
                    const moistureArray = formateDateInArray(data.payload)
                    setPlanterData((prevState) => {
                        return {
                            ...prevState,
                            moistureHistory: {
                                ...prevState.moistureHistory,
                                [data.id]: [...moistureArray],
                            },
                        }
                    })
                }
                break
            case "PLANTER_DATA": {
                setPlanterData((prevState) => {
                    const { irrigating, moistureLevel, upperLimit, lowerLimit, plants, datePlanted } = data.payload
                    const prevIrrigating = prevState.planterDetails[data.id]
                        ? prevState.planterDetails[data.id].irrigating
                        : null
                    const prevMoisturePercentage = prevState.planterDetails[data.id]
                        ? prevState.planterDetails[data.id].moisturePercentage
                        : null
                    return {
                        ...prevState,
                        planterDetails: {
                            ...prevState.planterDetails,
                            [data.id]: {
                                planterId: data.id,
                                title: data.payload.title,
                                irrigating: irrigating ? irrigating : prevIrrigating,
                                moisturePercentage: moistureLevel ? moistureLevel : prevMoisturePercentage,
                                upperLimit: upperLimit ? upperLimit : null,
                                lowerLimit: lowerLimit ? lowerLimit : null,
                                plants: plants ? plants : null,
                                datePlanted: datePlanted ? convertToDate(datePlanted) : null,
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

    const convertToDate = (date) => {
        return new Date(date.year, date.monthValue - 1, date.dayOfMonth)
    }

    const formateDateInArray = (payload) => {
        return payload.map((data) => {
            const { moistureLevel, irrigating, dateReceived } = data
            return {
                moisturePercentage: moistureLevel,
                irrigating: irrigating,
                dateReceived: formateDate(dateReceived),
            }
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

    return <IrrigationContext.Provider value={planterData} {...props} />
}

function useIrrigation() {
    const context = useContext(IrrigationContext)
    if (context === undefined) {
        throw new Error("useIrrigation must be used within a IrrigationWebSocket Provider")
    }
    return context
}

IrrigationWebSocket.propTypes = {
    initalState: PropTypes.object,
}

export { useIrrigation }

export default IrrigationWebSocket
