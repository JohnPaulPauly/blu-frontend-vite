 function euclideanDistance2D  (x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function pathDistance (positions) {
    let distance = 0
    for (let i = 1; i < positions.length; i++)
        distance += euclideanDistance2D(positions[i-1].x, positions[i-1].y, positions[i].x, positions[i].y)
    return distance
}
