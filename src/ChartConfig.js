function getRandomInt() {
    return Math.floor(Math.random() * (21)) - 10
}

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
