/**
 * TechVisualization.jsx
 *
 * A professional, lightweight 3D visualization showing technology expertise.
 * Simplified version without external font dependencies.
 */

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Technology data with business context
const technologies = [
  {
    id: 'react',
    name: 'React',
    nameJP: 'React',
    color: '#61DAFB',
    description: 'Component-based UI development',
    descriptionJP: 'コンポーネントベースのUI開発',
    position: [0, 0, 0],
    scale: 1.2,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    nameJP: 'JavaScript',
    color: '#F7DF1E',
    description: 'Core web development language',
    descriptionJP: 'Web開発の基盤言語',
    orbitRadius: 2.2,
    orbitSpeed: 0.3,
    orbitOffset: 0,
    scale: 0.8,
  },
  {
    id: 'cloud',
    name: 'Cloud',
    nameJP: 'クラウド',
    color: '#FF9900',
    description: 'Scalable cloud-based systems',
    descriptionJP: 'スケーラブルなクラウドシステム',
    orbitRadius: 2.2,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 0.66,
    scale: 0.8,
  },
  {
    id: 'ai',
    name: 'AI',
    nameJP: 'AI',
    color: '#10B981',
    description: 'Practical AI in business systems',
    descriptionJP: '業務システムでのAI活用',
    orbitRadius: 2.2,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 1.33,
    scale: 0.8,
  },
  {
    id: 'crm',
    name: 'CRM',
    nameJP: 'CRM',
    color: '#00A1E0',
    description: 'Customer & case management',
    descriptionJP: '顧客・ケース管理',
    orbitRadius: 3.2,
    orbitSpeed: 0.2,
    orbitOffset: Math.PI * 0.5,
    scale: 0.7,
  },
  {
    id: 'database',
    name: 'Data',
    nameJP: 'データ',
    color: '#8B5CF6',
    description: 'Structured data management',
    descriptionJP: '構造化データ管理',
    orbitRadius: 3.2,
    orbitSpeed: 0.2,
    orbitOffset: Math.PI * 1.5,
    scale: 0.7,
  },
];

// Individual technology node
const TechNode = ({ tech, time, onHover, isHovered, lang }) => {
  const meshRef = useRef();
  const glowRef = useRef();

  const position = useMemo(() => {
    if (tech.position) return tech.position;
    return [0, 0, 0];
  }, [tech]);

  useFrame(() => {
    if (tech.orbitRadius && meshRef.current) {
      const angle = time.current * tech.orbitSpeed + tech.orbitOffset;
      meshRef.current.position.x = Math.cos(angle) * tech.orbitRadius;
      meshRef.current.position.z = Math.sin(angle) * tech.orbitRadius;
      meshRef.current.position.y = Math.sin(angle * 2) * 0.2;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }

    if (glowRef.current) {
      const targetOpacity = isHovered ? 0.3 : 0;
      glowRef.current.material.opacity += (targetOpacity - glowRef.current.material.opacity) * 0.1;
    }
  });

  const baseScale = tech.scale || 1;
  const hoverScale = isHovered ? 1.2 : 1;

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(tech); }}
      onPointerOut={() => onHover(null)}
    >
      {/* Glow effect */}
      <mesh ref={glowRef} scale={baseScale * 2}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={tech.color} transparent opacity={0} />
      </mesh>

      {/* Main sphere */}
      <mesh scale={baseScale * hoverScale}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={isHovered ? 0.4 : 0.15}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* HTML label - more reliable than 3D text */}
      <Html
        position={[0, 0.55 * baseScale, 0]}
        center
        style={{
          transition: 'all 0.2s',
          opacity: 1,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      >
        <div
          className="px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap pointer-events-none select-none"
          style={{
            color: isHovered ? '#fff' : '#9CA3AF',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {lang === 'jp' ? tech.nameJP : tech.name}
        </div>
      </Html>
    </group>
  );
};

// Orbital ring
const OrbitalRing = ({ radius, opacity = 0.1 }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#6366F1" transparent opacity={opacity} />
    </line>
  );
};

// Main scene
const Scene = ({ hoveredTech, setHoveredTech, lang }) => {
  const time = useRef(0);
  const groupRef = useRef();

  useFrame((_, delta) => {
    time.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-3, 2, -3]} intensity={0.2} color="#6366F1" />

      <group ref={groupRef}>
        <OrbitalRing radius={2.2} opacity={0.12} />
        <OrbitalRing radius={3.2} opacity={0.08} />

        {technologies.map((tech) => (
          <TechNode
            key={tech.id}
            tech={tech}
            time={time}
            onHover={setHoveredTech}
            isHovered={hoveredTech?.id === tech.id}
            lang={lang}
          />
        ))}
      </group>
    </>
  );
};

// Info panel
const InfoPanel = ({ tech, lang }) => {
  if (!tech) return null;

  return (
    <div
      className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 backdrop-blur-md rounded-xl border border-white/10"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }}
        />
        <span className="text-white font-semibold">
          {lang === 'jp' ? tech.nameJP : tech.name}
        </span>
      </div>
      <p className="text-gray-400 text-sm mt-2">
        {lang === 'jp' ? tech.descriptionJP : tech.description}
      </p>
    </div>
  );
};

// Main component with error boundary
const TechVisualization = ({ lang = 'en' }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-black/40 rounded-2xl">
        <p className="text-gray-500">3D visualization unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 to-black/60">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
      >
        <Scene
          hoveredTech={hoveredTech}
          setHoveredTech={setHoveredTech}
          lang={lang}
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <InfoPanel tech={hoveredTech} lang={lang} />

      {!hoveredTech && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
          {lang === 'jp' ? 'ノードにホバーして詳細を表示' : 'Hover over nodes to explore'}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TechVisualization;
