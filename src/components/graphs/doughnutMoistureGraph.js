import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Chart as ChartJS, registerables, Filler } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useIrrigation } from "../../connections/irrigationWebSocket"

ChartJS.register(...registerables, Filler)

function DoughnutMoistureGraph({ planterId, percentage }) {
    const { moistureHistory } = useIrrigation()

    const [graphConfig, setGraphConfig] = useState({
        labels: [],
        datasets: [
            {
                label: "Irrigation",
                data: [],
                fill: true,
                backgroundColor: ["rgba(46, 94, 170, 1)", "rgba(220,220,220,0)"],
                borderColor: ["rgba(46, 94, 170, 1)", "rgba(220,220,220,0)"],
                fillColor: "rgba(46, 94, 170, 1)",
            },
        ],
    })

    const handleIncomingValue = (incoming) => {
        return incoming.slice(-1).pop().moisturePercentage
    }

    useEffect(() => {
        if (moistureHistory[planterId] != undefined) {
            const latestReading = handleIncomingValue(moistureHistory[planterId].pop())
            setGraphConfig((prevData) => {
                return {
                    labels: [],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [latestReading.moisturePercentage, 100 - latestReading.moisturePercentage],
                        },
                    ],
                }
            })
        } else {
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
    }, [moistureHistory, planterId, percentage])

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
    planterId: PropTypes.string,
    percentage: PropTypes.number,
}

export default DoughnutMoistureGraph
