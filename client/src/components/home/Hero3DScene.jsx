import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnotMesh() {
  const meshRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Track mouse for parallax
  const handlePointerMove = useMemo(() => {
    return (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
  }, []);

  // Attach mouse listener
  useMemo(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;

    // Subtle mouse parallax (lerp toward mouse position)
    const targetX = mousePos.current.y * 0.3;
    const targetY = mousePos.current.x * 0.3;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.01;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.01;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={viewport.width > 10 ? 1.8 : 1.3}>
        <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#E87A3E"
          metalness={0.85}
          roughness={0.15}
          distort={0.15}
          speed={1.5}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#E87A3E"
        />
        <directionalLight
          position={[-3, -2, 4]}
          intensity={0.6}
          color="#8B9CFF"
        />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffffff" />

        <TorusKnotMesh />
      </Canvas>
    </div>
  );
}
