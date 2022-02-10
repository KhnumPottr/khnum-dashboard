import React, { useState, useEffect, useRef } from "react"

function IrrigationWebSocket() {
    const [isPaused, setIsPaused] = useState(false)
    const ws = useRef(null)

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:8080/moistureLevels")
        ws.current.onopen = () => console.log("ws opened")
        ws.current.onclose = () => console.log("ws closed")

        const wsCurrent = ws.current

        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data)
            console.log("e", message)
        }

        return () => {
            wsCurrent.close()
        }
    }, [])

    useEffect(() => {
        if (!ws.current) return
    }, [isPaused])

    return <h2>Levels</h2>
}

export default IrrigationWebSocket
