import { render } from "@testing-library/react"
import React from "react"
import IrrigationWebSocket from "../../connections/irrigationWebSocket"

// jest.mock("useRef(null)", () => console.log("mocked socket"))

describe("Websocket Tests", () => {
    it("Testing websocket mock call", () => {
        render(<IrrigationWebSocket />)
        expect(true).toBeTruthy()
    })
})
