import React from "react";
import { gaussianRandom, getRandomInt } from "./utils/random.ts";
import Star from "./Star.tsx";
import * as THREE from 'three';

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

function spiral(x: number, y: number, z: number, offset: number) {
	const r = Math.sqrt(x ** 2 + z ** 2);
	let theta = offset;
	theta += x > 0 ? Math.atan(z / x) : Math.atan(z / x) + Math.PI;
	theta += (r / ARM_X_DIST) * SPIRAL;
	return new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta));
}

export default function Galaxy() {
    const stars: JSX.Element[] = [];

    for (let arm = 0; arm < ARMS; arm++) {
        for (let star = 0; star < NUM_STARS / ARMS; star++) {
            const size: number = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
            const pos = spiral(
                gaussianRandom(ARM_X_MEAN, ARM_X_DIST),
                gaussianRandom(0, GALAXY_THICKNESS),
                gaussianRandom(ARM_Z_MEAN, ARM_Z_DIST),
                (arm * 2 * Math.PI) / ARMS
            );

            stars.push(<Star position={pos} size={size} />);
        }
    }

    return <group>{stars}</group>;
}