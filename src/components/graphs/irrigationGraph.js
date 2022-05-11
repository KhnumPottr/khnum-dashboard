import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Chart as ChartJS, registerables, Filler } from "chart.js"
import { Line } from "react-chartjs-2"
import { useIrrigation } from "../../connections/irrigationWebSocket"

ChartJS.register(...registerables, Filler)

function IrrigationGraph({ planterId }) {
    const { moistureHistory } = useIrrigation()
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Irrigation",
                data: [],
                fill: true,
                backgroundColor: "rgba(46, 94, 170, 1)",
                borderColor: "rgba(46, 94, 170, 1)",
                fillColor: "rgba(46, 94, 170, 1)",
                tension: 0.5,
            },
        ],
    })
    const handleIncomingValues = (incoming) => {
        return incoming.map((e) => {
            return e.moisturePercentage
        })
    }
    const handleIncomingLabels = (incoming) => {
        return incoming.map((e) => {
            return e.dateReceived
        })
    }

    useEffect(() => {
        if (moistureHistory[planterId] != undefined) {
            const plottingData = moistureHistory[planterId]
            setData((prevData) => {
                return {
                    labels: [...prevData.labels, ...handleIncomingLabels(plottingData)],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [...prevData.datasets[0].data, ...handleIncomingValues(plottingData)],
                        },
                    ],
                }
            })
        }
    }, [moistureHistory, planterId])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
        },
        scales: {
            y: {
                color: "blue",
                min: 0,
                max: 100,
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#e9ebf0",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#e9ebf0",
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
        legend: {
            display: false,
        },
    }

    return <Line data={data} options={options} />
}

IrrigationGraph.propTypes = {
    planterId: PropTypes.string,
}

export default IrrigationGraph
