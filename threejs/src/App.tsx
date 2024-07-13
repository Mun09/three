import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { getRandomFloat, getRandomInt } from "./utils/random.ts";
import * as THREE from 'three';
import Star from "./Star.tsx";
import Galaxy from "./Galaxy.tsx";
import './App.css';

const genBackgroundStars = () => {
    const stars: JSX.Element[] = [];
    for(let i=0; i<500; i++) {
        const size: number = getRandomInt(15, 20);
        const pos: THREE.Vector3 = new THREE.Vector3(
            getRandomInt(-50000, 50000),
            getRandomInt(-50000, 50000),
            getRandomInt(-50000, 50000),
        );
        stars.push(<Star key={i} position={pos} size={size} />);
    }
    return stars;
}

const genGalaxies = () => {
    const GALAXY_LIMIT = 5;
    const BORDER = 20000;

    const galaxies: JSX.Element[] = [];
    for (let i = 0; i < GALAXY_LIMIT; i++) { // 3개의 Galaxy 생성
        const center = [
            getRandomInt(-BORDER, BORDER),
            getRandomInt(-BORDER, BORDER),
            getRandomInt(-BORDER, BORDER),
        ];
    
        const rotation = [
            getRandomFloat(0, 2 * Math.PI),
            getRandomFloat(0, 2 * Math.PI),
            getRandomFloat(0, 2 * Math.PI)
        ]

        console.log(rotation);

        galaxies.push(<Galaxy key={i} center={center} rotation={rotation} />); // 각 Galaxy에 100개의 Star
    }
    return galaxies;
};

function App() {
    return (
        <Canvas
            camera={{
                position: [10000, 10000, 10000],
                rotation: [-0.5, 0, 0],
                far: 100000
            }}
            >
        <color attach="background" args={["#000"]} />  
        <ambientLight color={"#fff"} intensity={5} />
        <axesHelper args={[20000]} />
        <OrbitControls />
        { genBackgroundStars() }
        { genGalaxies() }
        </Canvas>
    );
}

export default App;