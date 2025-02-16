function getRandomInt() {
    //returns random integer from -10 to 10, inclusive.
    return Math.floor(Math.random() * (21)) - 10
}

//scatter chart data with one point (-10 <= x,y <= 10)
export const randomData = () => ({
    datasets: [
        {
            backgroundColor: '#f87979',
            data: [
                {
                    x: getRandomInt(),
                    y: getRandomInt()
                }
            ]
        }
    ]
})

//options for scatter chart, sets border size
export const options = {
    responsive: true,
    maintainAspectRatio: true,
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
