function rotateX(point, rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const [x, y, z] = point;
    return [
        x,
        y * cos - z * sin,
        y * sin + z * cos
    ];
}

function rotateY(point, rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const [x, y, z] = point;
    return [
        x * cos + z * sin,
        y,
        -x * sin + z * cos
    ];
}

function rotateZ(point, rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const [x, y, z] = point;
    return [
        x * cos - y * sin,
        x * sin + y * cos,
        z
    ];
}

export function rotatePoint(point, angles) {
    let rotatedPoint = rotateX(point, angles[0]);
    rotatedPoint = rotateY(rotatedPoint, angles[1]);
    rotatedPoint = rotateZ(rotatedPoint, angles[2]);
    return rotatedPoint;
}
