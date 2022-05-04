/* eslint-disable quotes */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react"
import { render, screen } from "@testing-library/react"
import IrrigationControl from "../irrigationControl"
import { MdOutlineWaterDrop, MdWaterDrop, MdModeEdit, MdRemoveCircle } from "react-icons/md"
import { Table } from "rsuite"

describe("GIVEN irrigation control is rendered", () => {
    test("WHEN type is irrigate THEN irrigtaion button is rendered", () => {
        const type = "irrigate"
        const onClick = () => {}
        const { container } = render(<IrrigationControl type={type} onClick={onClick} />)

        const button = container.querySelector('[accessibilityLabel ="trigger irrigation"]')
        console.log(button)
        console.log(button.children[1])
        // expect(button.color).toEqual("yellow")
        expect(button.children[2]).toEqual(<MdWaterDrop />)
    })
})
