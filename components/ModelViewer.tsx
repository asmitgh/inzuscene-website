// components/ModelViewer.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


type ModelViewerProps = {
  url: string;
  mouseX: number;
  mouseY: number;
  onLoad?: () => void;
};

function Model({ url, onModelLoad }: { url: string; onModelLoad?: () => void }) {
  const gltf = useGLTF(url, true);
  const ref = useRef<THREE.Group>(null!);

  // notify parent when loaded
  useEffect(() => {
    if (gltf && onModelLoad) onModelLoad();
  }, [gltf, onModelLoad]);

  return <primitive ref={ref} object={gltf.scene} />;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ url, mouseX, mouseY, onLoad }) => {
  const container = useRef<HTMLDivElement>(null!);

  // normalize mouse position to [-0.5, 0.5]
  const normX = (mouseX / window.innerWidth) - 0.5;
  const normY = (mouseY / window.innerHeight) - 0.5;

  return (
    <div ref={container} style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 1, 3], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Model
          url={url}
          onModelLoad={onLoad}
        />
        {/* slight auto-rotation & mouse hover tilt */}
        <AutoRotate mouseX={normX} mouseY={normY} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

// helper component: rotates the model group
function AutoRotate({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (group.current) {
      // slow continuous spin
      group.current.rotation.y += delta * 0.3;
      // slight tilt toward mouse
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouseY * 0.5,
        0.1
      );
      group.current.rotation.y += mouseX * 0.2;
    }
  });
  return <group ref={group} />;
}
