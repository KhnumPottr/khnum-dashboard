import React, { useState, useEffect } from "react"

const MoistureLevels = () => {
    const [levels, setLevels] = useState("")
    const [socket, setSocket] = useState(new WebSocket("ws://127.0.0.1:8080/moistureLevels"))

    

    useEffect(() => {

        socket.onmessage = function (event) {
            const json:string = JSON.parse(event.data)
            console.log(json)
            setLevels(json)
        }

    },[])
    

    return(
        <>
            <h4>Levels</h4>
            {/* <p>{levels}</p> */}
        </>
    )

}

export default MoistureLevels