function getRandomInt() {
    //returns random integer from -10 to 10, inclusive.
    return Math.floor(Math.random() * (21)) - 10
}

//scatter chart data with one point (-10 <= x,y <= 10)
export const randomData = (dataset) => ({
    datasets: [
        {
            backgroundColor: '#ff0000',
            data: dataset.append(
                {
                    x: getRandomInt(),
                    y: getRandomInt()
                })


        }
    ]
})

export const moveData = (x,y) => ({

    datasets: [
        {
            backgroundColor: '#ff0000',
            data: [
                {
                    x: (x + Math.floor(Math.random() * (3) ) -1),
                    y: (y + Math.floor(Math.random() * (3) ) -1)
                }
            ]
        }
    ]
})

export const addData = function (val_in) {
    const datasets = val_in.datasets
    datasets[0].data.push({
        x: (datasets[0].data[datasets[0].data.length - 1].x + (Math.random() * (3) ) -1),
        y: (datasets[0].data[datasets[0].data.length - 1].y + (Math.random() * (3) ) -1)
    })
    return {datasets: datasets}
}

//options for scatter chart, sets border size
export const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    showLine: true,
    scales: {
        x: {
            position: "top",
            min: -10,
            max: 10
        },
        y: {
            position: "right",
            min: -10,
            max: 10
        },
    }
}
