'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { IcosahedronGeometry } from 'three';

export default function Footer() {
  return (
    <footer className="text-quaternary mx-auto max-w-2xl border-t border-dashed border-gray-200 py-12 pb-24 pt-4 text-sm dark:border-gray-200 dark:text-gray-600">
      <FooterGraphic />
      <p className="flex flex-col gap-4">
        © 2022 - {new Date().getFullYear()} Pertermann. All Rights Reserved.
        <span>
          www.pertermann.de v.{new Date().getFullYear()}.
          {(new Date().getMonth() + 1).toString().padStart(2, '0')}
        </span>
        <span>
          This website is open source on{' '}
          <a
            href="https://github.com/PrtmPhlp/pertermann.de"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub :)
          </a>
        </span>
      </p>
    </footer>
  );
}

function PixelatedSphere() {
  const sphereRef = useRef();
  useFrame(({ clock }: { clock: any }) => {
    if (sphereRef.current) {
      (sphereRef.current as any).rotation.y = clock.getElapsedTime() * 1.2;
      (sphereRef.current as any).rotation.z = clock.getElapsedTime() * 0.7;
    }
  });

  const vertices: [number, number, number][] = [];
  const tempGeo = new IcosahedronGeometry(1, 4);
  const positionAttribute = tempGeo.attributes.position;

  for (let i = 0; i < positionAttribute.count; i++) {
    vertices.push([
      positionAttribute.getX(i),
      positionAttribute.getY(i),
      positionAttribute.getZ(i),
    ]);
  }

  return (
    <group ref={sphereRef as any}>
      {vertices.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="gray" />
        </mesh>
      ))}
    </group>
  );
}

function Birds() {
  const groupRef = useRef();

  useFrame(({ clock }: { clock: any }) => {
    if (!groupRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    (groupRef.current as any).children.forEach(
      (
        bird: { position: { x: number; y: number; z: number } },
        index: number,
      ) => {
        const angle = (elapsedTime + index * 0.2) % (2 * Math.PI);
        const radius = 2.3 + Math.random() * 0.0001;
        bird.position.x =
          radius * Math.cos(angle) - Math.sin(elapsedTime * 0.5 + index);
        bird.position.y =
          radius * Math.sin(angle) * Math.sin(elapsedTime * 0.5 + index);
        bird.position.z = radius * Math.cos(elapsedTime * 0.5 + index);
      },
    );
  });

  const birds = [...Array(48)].map((_, i) => {
    const size = i % 2 === 0 ? 0.015 : 0.025;
    return (
      <mesh key={i} position={[1, 0, 0]}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color="gray" />
      </mesh>
    );
  });

  return <group ref={groupRef as any}>{birds}</group>;
}

function FooterGraphic() {
  return (
    <Canvas camera={{ fov: 40, position: [0, 0, 5] }} gl={{ antialias: false }}>
      <PixelatedSphere />
      <Birds />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
