import {Chart} from "chart.js";

let pointsOn = false

export function flipPointsOn() {
    pointsOn = !pointsOn
}

function getRandomInt() {
    //returns random integer from -10 to 10, inclusive.
    return Math.floor(Math.random() * (21)) - 10
}

export const newData = (datasets, position) => {

    if (datasets.length === 0) {
        return {
            datasets: [
                {
                    data: [
                        {
                            x: position.x,
                            y: position.y
                        }]


                }]
        }
    }
    let newDatasets = [{
        data: [
            {
                x: position.x,
                y: position.y
            }
        ]
    }]
    if (datasets.length > 1)
        return {datasets: newDatasets.concat(datasets.slice(1))}

    return {datasets: newDatasets}
}


//scatter chart data with one point (-10 <= x,y <= 10)
export const addData = (datasets, position) => {
    if (datasets.length === 1)
        return {
        datasets: [
            {
                data: datasets[0].data.concat([
                    {
                        x: position.x,
                        y: position.y
                    }])


            }
        ]}
    return    { datasets: [
        {
            data: datasets[0].data.concat([
                {
                    x: position.x,
                    y: position.y
                }])


        }
    ].concat(datasets.slice(1))}

}

export const clearData = () => ({
    datasets: []
})


//options for scatter chart, sets border size

export const addPoint = (datasets, position) => {
    if (datasets === undefined)
        return {
            datasets: [
                {
                    data: [
                    ],

                },
                {
                    data: [
                        {
                            x: position.x,
                            y: position.y,


                        }
                    ],
                    backgroundColor: "#ff0000",
                    borderColor: "#ff0000",
                }]
        }
    return {
        datasets: datasets.concat(
            [{
                data: [
                    {
                        x: position.x,
                        y: position.y,


                    }
                ],
                backgroundColor: "#ff0000",
                borderColor: "#ff0000",
            }])
    }
}

export const removePoints = (datasets) => ({
    datasets: [
        datasets[0]
    ]
})

export const addAnnotatePoint = (datasets, position, message) => {
    if (datasets === undefined)
        return {
            datasets: [
                {
                    data: [
                    ],

                },
                {
                    data: [
                        {
                            x: position.x,
                            y: position.y,


                        }
                    ],
                    backgroundColor: "#ff0000",
                    borderColor: "#ff0000",
                }]
        }
    return {
        datasets: datasets.concat(
            [{
                label: message,
                data: [
                    {
                        x: position.x,
                        y: position.y,


                    }
                ],
                backgroundColor: "#ff0000",
                borderColor: "#ff0000",
            }])
    }
}



