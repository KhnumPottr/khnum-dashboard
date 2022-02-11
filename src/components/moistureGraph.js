import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function MoistureGraph({ data }) {
    console.log("I am rendering")
    return (
        <AreaChart
            width={200}
            height={60}
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <XAxis dataKey="dateReceived" />
            <Tooltip />
            <Area type="monotone" dataKey="moisturePercentage" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    )
}

MoistureGraph.propTypes = {
    data: PropTypes.array,
}

export default MoistureGraph
