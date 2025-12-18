import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import styled from "styled-components";

const ModelContainer = styled.div`
  width: 100%;
  height: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.2rem;
  margin: 0.2rem;
  position: relative;
  overflow: hidden;
  display: flex;
`;

const ModelCanvas = styled.div`
  flex: 1;
  position: relative;
`;

const ServicesPanel = styled.div`
  width: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.2rem;
  overflow-y: auto;
  border-left: 2px solid rgba(102, 126, 234, 0.3);
  direction: rtl;
  
  &::-webkit-scrollbar {
    width: 0.05rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 0.1rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 0.22rem;
  color: #667eea;
  margin: 0 0 0.15rem 0;
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #667eea;
  font-weight: bold;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled.li`
  padding: 0.1rem;
  margin: 0.08rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  border-radius: 0.1rem;
  font-size: 0.16rem;
  color: #333;
  border-right: 3px solid #667eea;
  transition: all 0.3s;
  
  &:hover {
    transform: translateX(-0.05rem);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
  
  &::before {
    content: "✨";
    margin-left: 0.08rem;
  }
`;

const HotspotButton = styled.div`
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.08rem 0.12rem;
  border-radius: 0.15rem;
  font-size: 0.15rem;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border: ${props => props.active ? '2px solid #fff' : '2px solid transparent'};
  
  &:hover {
    transform: scale(1.1);
    background: #ff6b6b;
    color: #fff;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);
  }
`;

const HotspotLabel = styled.div`
  position: absolute;
  ${props => props.side === 'left' ? 'left: 0.15rem;' : 'right: 0.15rem;'}
  top: ${props => props.top || '50%'};
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  z-index: 10;
`;

const LabelButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.1rem 0.15rem;
  border-radius: 0.1rem;
  font-size: 0.16rem;
  cursor: pointer;
  border: ${props => props.active ? '2px solid #fff' : '2px solid transparent'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  min-width: 0.8rem;
  text-align: center;
  
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }
`;

// معلومات المناطق والخدمات
const faceRegions = {
  eyes: {
    name: "العين",
    services: [
      "حقن البوتوكس لإزالة التجاعيد",
      "رفع الجفون العلوية",
      "تجميل شكل العين",
      "إزالة الهالات السوداء",
      "شد الجلد حول العين"
    ],
    position: [0, 0.3, 0.8],
    labelSide: "right",
    labelTop: "20%"
  },
  nose: {
    name: "الأنف",
    services: [
      "حقن البوتوكس",
      "رفع الأنف",
      "تصغير الأنف",
      "تنظيف الأنف",
      "تجميل شكل الأنف"
    ],
    position: [0, 0, 0.9],
    labelSide: "right",
    labelTop: "35%"
  },
  chin: {
    name: "الذقن",
    services: [
      "حقن حمض الهيالورونيك",
      "بروز الذقن",
      "تشكيل الذقن",
      "شد الجلد في منطقة الذقن"
    ],
    position: [0, -0.6, 0.7],
    labelSide: "right",
    labelTop: "65%"
  },
  forehead: {
    name: "الجبهة",
    services: [
      "حقن البوتوكس",
      "إزالة التجاعيد",
      "تنحيف الوجه",
      "شد الجلد"
    ],
    position: [0, 0.7, 0.6],
    labelSide: "right",
    labelTop: "5%"
  },
  lips: {
    name: "الشفاه",
    services: [
      "حقن حمض الهيالورونيك",
      "تكبير الشفاه",
      "تجميل شكل الشفاه",
      "إزالة التجاعيد حول الفم"
    ],
    position: [0, -0.3, 0.8],
    labelSide: "left",
    labelTop: "50%"
  },
  cheeks: {
    name: "الخدود",
    services: [
      "حقن حمض الهيالورونيك",
      "بروز الخدود",
      "شد الخدود",
      "إزالة التجاعيد"
    ],
    position: [0.5, 0, 0.5],
    labelSide: "left",
    labelTop: "35%"
  },
  neck: {
    name: "الرقبة",
    services: [
      "حقن البوتوكس",
      "شد الرقبة",
      "إزالة التجاعيد",
      "تنحيف الرقبة"
    ],
    position: [0, -0.8, 0.5],
    labelSide: "left",
    labelTop: "80%"
  },
  jawline: {
    name: "الفكين",
    services: [
      "حقن حمض الهيالورونيك",
      "تشكيل الفكين",
      "شد الجلد",
      "تنحيف الوجه"
    ],
    position: [-0.5, -0.2, 0.5],
    labelSide: "left",
    labelTop: "20%"
  }
};

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
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={2} position={[0, -0.3, 0]} />
      {Object.entries(faceRegions).map(([id, region]) => (
        <Hotspot
          key={id}
          position={region.position}
          name={region.name}
          active={activeHotspot === id}
          onClick={() => onHotspotClick({ id, ...region })}
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
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleHotspotClick = (region) => {
    setActiveHotspot(region.id);
    setSelectedRegion(region);
    if (onSelectCategory) {
      onSelectCategory(region.name);
    }
  };

  const handleLabelClick = (regionId) => {
    const region = { id: regionId, ...faceRegions[regionId] };
    handleHotspotClick(region);
  };

  const leftRegions = Object.entries(faceRegions).filter(([_, region]) => region.labelSide === 'left');
  const rightRegions = Object.entries(faceRegions).filter(([_, region]) => region.labelSide === 'right');

  return (
    <ModelContainer>
      <ModelCanvas>
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, 5]} intensity={0.6} />
          <pointLight position={[0, 5, 5]} intensity={0.8} />
          
          <Suspense fallback={<LoadingFallback />}>
            <FaceModelMesh 
              onHotspotClick={handleHotspotClick} 
              activeHotspot={activeHotspot}
            />
          </Suspense>
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={4}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>

        {/* التسميات على اليمين */}
        <HotspotLabel side="right">
          {rightRegions.map(([id, region]) => (
            <LabelButton
              key={id}
              active={activeHotspot === id}
              onClick={() => handleLabelClick(id)}
              style={{ marginTop: region.labelTop === '5%' ? '0' : 'auto' }}
            >
              {region.name}
            </LabelButton>
          ))}
        </HotspotLabel>

        {/* التسميات على الشمال */}
        <HotspotLabel side="left">
          {leftRegions.map(([id, region]) => (
            <LabelButton
              key={id}
              active={activeHotspot === id}
              onClick={() => handleLabelClick(id)}
            >
              {region.name}
            </LabelButton>
          ))}
        </HotspotLabel>
      </ModelCanvas>

      {/* لوحة الخدمات */}
      {selectedRegion && (
        <ServicesPanel>
          <ServiceTitle>{selectedRegion.name}</ServiceTitle>
          <ServiceList>
            {selectedRegion.services.map((service, index) => (
              <ServiceItem key={index}>{service}</ServiceItem>
            ))}
          </ServiceList>
        </ServicesPanel>
      )}
    </ModelContainer>
  );
}
