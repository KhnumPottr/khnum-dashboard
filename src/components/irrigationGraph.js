import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Chart as ChartJS, registerables, Filler } from "chart.js"
import { Line } from "react-chartjs-2"
import { useIrrigation } from "../connections/irrigationWebSocket"

ChartJS.register(...registerables, Filler)

function IrrigationGraph({ planter }) {
    const irrigationData = useIrrigation()

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Irrigation",
                data: [],
                fill: true,
                backgroundColor: "#4F9D69",
                borderColor: "#4F9D69",
                fillColor: "#4F9D69",
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
        if (irrigationData[planter] != undefined) {
            const plottingData = irrigationData[planter].data
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
    }, [irrigationData, planter])

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
        legend: {
            display: false,
        },
    }

    return <Line data={data} options={options} />
}

IrrigationGraph.propTypes = {
    planter: PropTypes.string,
}

export default IrrigationGraph
