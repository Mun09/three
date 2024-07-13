import React from "react";
import { gaussianRandom, getRandomInt } from "./utils/random.ts";
import Star from "./Star.tsx";
import * as THREE from 'three';
import { rotatePoint } from "./utils/rotate.ts";

const ARM_X_MEAN = 1500;
const ARM_X_DIST = 3000;
const ARM_Z_MEAN = 900;
const ARM_Z_DIST = 1000;
const GALAXY_THICKNESS = 300;
const NUM_STARS = 5000;
const STAR_MIN_SIZE = 5;
const STAR_MAX_SIZE = 15;
const ARMS = 2;

const SPIRAL = 3.5;

function spiral(x: number, y: number, z: number, offset: number, translation: number[], rotation: number[]): THREE.Vector3 {
	const r = Math.sqrt(x ** 2 + z ** 2);
	let theta = offset;
	theta += x > 0 ? Math.atan(z / x) : Math.atan(z / x) + Math.PI;
	theta += (r / ARM_X_DIST) * SPIRAL;

    const nx = r * Math.cos(theta);
    const ny = y;
    const nz = r * Math.sin(theta);

    const n = rotatePoint([nx, ny, nz], rotation)
	return new THREE.Vector3(n[0] + translation[0], n[1] + translation[1], n[2] + translation[2]);
}

export default function Galaxy({center, rotation}) {
    const stars: JSX.Element[] = [];


    for (let arm = 0; arm < ARMS; arm++) {
        for (let star = 0; star < NUM_STARS / ARMS; star++) {
            const size: number = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
            const pos = spiral(
                gaussianRandom(ARM_X_MEAN, ARM_X_DIST),
                gaussianRandom(0, GALAXY_THICKNESS),
                gaussianRandom(ARM_Z_MEAN, ARM_Z_DIST),
                (arm * 2 * Math.PI) / ARMS,
                center,
                rotation
            );

            stars.push(<Star position={pos} size={size} />);
        }
    }

    return <group>{stars}</group>;
}