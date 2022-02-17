import React, { createRef } from "react"
import PropTypes from "prop-types"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function MoistureGraph({ data }) {
    const chartRef = createRef()
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 300,
            easing: "linear",
        },
        plugins: {
            filler: {
                propagate: true,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    fontColor: "rgba(4, 214, 144, 0.1)",
                    maxTicksLimit: 7,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    }

    const chartData = {
        labels: data.map((set) => {
            return set.dateReceived
        }),
        datasets: [
            {
                label: "Irrigation",
                data: data.map((set) => {
                    return set.moisturePercentage
                }),
                borderWidth: 2,
                backgroundColor: "#4F9D69",
                borderColor: "#4F9D69",
            },
        ],
    }
    return (
        <div>
            <Line ref={chartRef} data={chartData} options={options} />
        </div>
    )
}

MoistureGraph.propTypes = {
    data: PropTypes.array,
}

export default MoistureGraph
