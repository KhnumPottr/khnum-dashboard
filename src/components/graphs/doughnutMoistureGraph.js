import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Chart as ChartJS, registerables, Filler } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useIrrigation } from "../../connections/irrigationWebSocket"

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
