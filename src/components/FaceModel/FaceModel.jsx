import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import styled from "styled-components";

const ModelContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.2rem;
  margin: 0.2rem;
  position: relative;
  overflow: hidden;
  
  .instructions {
    position: absolute;
    bottom: 0.15rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    padding: 0.1rem 0.2rem;
    border-radius: 0.3rem;
    font-size: 0.18rem;
    color: #333;
    z-index: 10;
    white-space: nowrap;
  }
`;

const HotspotButton = styled.div`
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.08rem 0.15rem;
  border-radius: 0.2rem;
  font-size: 0.16rem;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.05);
    background: #ff6b6b;
    color: #fff;
  }
`;

// نقاط الوجه التفاعلية
const faceHotspots = [
  { id: "eyes", name: "العين", position: [0, 0.3, 0.8], category: "منطقة العين" },
  { id: "nose", name: "الأنف", position: [0, 0, 0.9], category: "منطقة الأنف" },
  { id: "lips", name: "الشفاه", position: [0, -0.3, 0.8], category: "جراحة تجميل الشفاه" },
  { id: "forehead", name: "الجبهة", position: [0, 0.7, 0.6], category: "إزالة التجاعيد وتنحيف الوجه" },
  { id: "cheeks", name: "الخدود", position: [0.5, 0, 0.5], category: "حمض الهيالورونيك" },
  { id: "chin", name: "الذقن", position: [0, -0.6, 0.7], category: "تشكيل وتنحيف الجسم" },
];

function Hotspot({ position, name, onClick, active }) {
  return (
    <Html position={position} center>
      <HotspotButton active={active} onClick={onClick}>
        {name}
      </HotspotButton>
    </Html>
  );
}

function FaceModelMesh({ onHotspotClick, activeHotspot }) {
  const meshRef = useRef();
  const { scene } = useGLTF("/assets/models/model.glb");
  
  // تفعيل الألوان والمواد الأصلية للموديل
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene.clone(true)} scale={1.5} position={[0, -0.5, 0]} />
      {faceHotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          name={hotspot.name}
          active={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </group>
  );
}

function FallbackModel({ onHotspotClick, activeHotspot }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* رأس بسيط */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f5c6a5" />
      </mesh>
      
      {/* نقاط تفاعلية */}
      {faceHotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          name={hotspot.name}
          active={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        fontSize: '0.24rem',
        textAlign: 'center'
      }}>
        جاري التحميل...
      </div>
    </Html>
  );
}

export default function FaceModel({ onSelectCategory }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [useGLB, setUseGLB] = useState(true);

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(hotspot.id);
    if (onSelectCategory) {
      onSelectCategory(hotspot.category);
    }
  };

  return (
    <ModelContainer>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={0.6} />
        
        <Suspense fallback={<LoadingFallback />}>
          {useGLB ? (
            <FaceModelMesh 
              onHotspotClick={handleHotspotClick} 
              activeHotspot={activeHotspot}
            />
          ) : (
            <FallbackModel 
              onHotspotClick={handleHotspotClick} 
              activeHotspot={activeHotspot}
            />
          )}
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div className="instructions">
        👆 اضغط على منطقة الوجه لعرض العلاجات
      </div>
    </ModelContainer>
  );
}


