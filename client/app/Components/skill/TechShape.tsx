"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const TechShape = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Icosahedron args={[1, 15]} ref={meshRef} scale={2.5}>
                <MeshDistortMaterial
                    color="#4F46E5" // Indigo-600, you can change this to match theme
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                />
            </Icosahedron>
        </Float>
    );
};

export default TechShape;
