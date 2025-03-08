function getRandomInt() {
    //returns random integer from -10 to 10, inclusive.
    return Math.floor(Math.random() * (21)) - 10
}
export const randomData = () => ({
    datasets: [
        {
            data: [
                {
                    x: getRandomInt(),
                    y: getRandomInt()
                }
                ]

        }
    ]
})


//scatter chart data with one point (-10 <= x,y <= 10)
export const randomAddData = (dataset) => ({
    datasets: [
        {
            data: dataset[0].data.concat([
                {
                    x: getRandomInt(),
                    y: getRandomInt()
                }])


        }
    ]
})


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
            min: -10,//these values will be set for whatever the device's size is
            max: 10
        },
        y: {
            position: "right",
            min: -10,//these values will be set for whatever the device's size is
            max: 10
        },
    }
}
