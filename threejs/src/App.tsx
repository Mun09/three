import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { getRandomInt } from "./utils/random.ts";
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
        <Galaxy />
        </Canvas>
    );
}

export default App;