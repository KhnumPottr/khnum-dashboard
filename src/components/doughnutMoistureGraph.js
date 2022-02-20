import React, { useState, createRef, useEffect } from "react"
import PropTypes from "prop-types"
import { Chart as ChartJS, registerables, Filler } from "chart.js"
import { Doughnut, Chart } from "react-chartjs-2"
import { useIrrigation } from "../connections/irrigationWebSocket"

ChartJS.register(...registerables, Filler)

function DoughnutMoistureGraph({ planter }) {
    const irrigationData = useIrrigation()

    const [graphConfig, setGraphConfig] = useState({
        labels: [],
        datasets: [
            {
                label: "Irrigation",
                data: [],
                fill: true,
                backgroundColor: ["#4F9D69", "rgba(220,220,220,0)"],
                borderColor: ["#4F9D69", "rgba(220,220,220,0)"],
                fillColor: "#4F9D69",
            },
        ],
    })

    const handleIncomingValue = (incoming) => {
        return incoming.slice(-1).pop().moisturePercentage
    }

    useEffect(() => {
        console.log("Updating")
        const percentage = handleIncomingValue(irrigationData[planter].data)
        if (irrigationData[planter] != undefined) {
            setGraphConfig((prevData) => {
                return {
                    labels: [],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [percentage, 100 - percentage],
                        },
                    ],
                }
            })
        }
    }, [irrigationData, planter])

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    }

    return <Doughnut data={graphConfig} options={options} />
}

DoughnutMoistureGraph.propTypes = {
    planter: PropTypes.string,
}

export default DoughnutMoistureGraph
