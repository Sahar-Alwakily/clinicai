import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.2rem;
  margin: 0.2rem;
  direction: rtl;
  justify-content: ${props => props.hasSelection ? 'flex-start' : 'center'};
  align-items: center;
  position: relative;
`;

const ModelCard = styled.div`
  flex: ${props => props.hasSelection ? '1' : '0 0 auto'};
  max-width: ${props => props.hasSelection ? 'none' : '5rem'};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.2rem;
  padding: 0.2rem;
  position: relative;
  overflow: hidden;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

const ServicesCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 0.2rem;
  padding: 0.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  direction: rtl;
  transition: all 0.3s ease;
`;

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  border-radius: 0.15rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  min-height: 3.5rem;
`;

const SideButtonsContainer = styled.div`
  position: absolute;
  ${props => props.side === 'right' ? 'right: 0.15rem;' : 'left: 0.15rem;'}
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  z-index: 10;
  pointer-events: auto;
`;

const SideButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)' 
    : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.12rem 0.15rem;
  border-radius: 0.1rem;
  font-size: 0.16rem;
  cursor: pointer;
  border: ${props => props.active ? '2px solid #fff' : '2px solid transparent'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  text-align: center;
  min-width: 0.9rem;
  white-space: nowrap;
  
  &:hover {
    transform: translateX(${props => props.side === 'right' ? '-0.05rem' : '0.05rem'});
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)' 
      : 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)'};
  }
`;

const HotspotButton = styled.div`
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.08rem 0.12rem;
  border-radius: 0.15rem;
  font-size: 0.14rem;
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

const ServiceHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.15rem;
  margin-bottom: 0.2rem;
  text-align: center;
`;

const ServiceTitle = styled.h3`
  font-size: 0.24rem;
  margin: 0;
  font-weight: bold;
`;

const ServiceSubtitle = styled.p`
  font-size: 0.16rem;
  margin: 0.1rem 0 0 0;
  opacity: 0.9;
`;

const ServicesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.1rem;
  
  &::-webkit-scrollbar {
    width: 0.08rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 0.1rem;
  }
`;

const ServiceItem = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 0.15rem;
  margin-bottom: 0.12rem;
  border-radius: 0.1rem;
  border-right: 4px solid #667eea;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateX(-0.05rem);
    box-shadow: 0 4px 10px rgba(102, 126, 234, 0.2);
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  }
`;

const ServiceName = styled.div`
  font-size: 0.18rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.08rem;
  display: flex;
  align-items: center;
  gap: 0.08rem;
  
  &::before {
    content: "✨";
    font-size: 0.2rem;
  }
`;

const ServiceDescription = styled.div`
  font-size: 0.15rem;
  color: #555;
  line-height: 1.6;
`;

// معلومات المناطق والخدمات
const faceRegions = {
  eyes: {
    name: "العين",
    description: "علاجات تجميلية متخصصة لمنطقة العين",
    services: [
      {
        name: "حقن البوتوكس",
        description: "إزالة التجاعيد والخطوط الدقيقة حول العين بشكل آمن وفعال"
      },
      {
        name: "رفع الجفون العلوية",
        description: "جراحة تجميلية لرفع الجفون وإزالة الجلد الزائد"
      },
      {
        name: "تجميل شكل العين",
        description: "تحسين شكل العين وإبراز جمالها الطبيعي"
      },
      {
        name: "إزالة الهالات السوداء",
        description: "علاج فعال للهالات السوداء والانتفاخات تحت العين"
      },
      {
        name: "شد الجلد حول العين",
        description: "إزالة التجاعيد وشد الجلد المترهل حول منطقة العين"
      }
    ],
    position: [0, 0.3, 0.8],
    side: 'right'
  },
  nose: {
    name: "الأنف",
    description: "خدمات تجميلية شاملة لمنطقة الأنف",
    services: [
      {
        name: "حقن البوتوكس",
        description: "تقليل حجم الأنف وإزالة التجاعيد حول الأنف"
      },
      {
        name: "رفع الأنف",
        description: "رفع طرف الأنف وتحسين شكله بدون جراحة"
      },
      {
        name: "تصغير الأنف",
        description: "تقليل حجم الأنف باستخدام تقنيات غير جراحية"
      },
      {
        name: "تنظيف الأنف",
        description: "إزالة الرؤوس السوداء والمسام الواسعة"
      },
      {
        name: "تجميل شكل الأنف",
        description: "تحسين شكل الأنف وتناسقه مع ملامح الوجه"
      }
    ],
    position: [0, 0, 0.9],
    side: 'right'
  },
  chin: {
    name: "الذقن",
    description: "علاجات لتشكيل وبروز منطقة الذقن",
    services: [
      {
        name: "حقن حمض الهيالورونيك",
        description: "بروز الذقن وتشكيله بشكل طبيعي ومتناسق"
      },
      {
        name: "بروز الذقن",
        description: "إبراز الذقن وتحسين خط الفك"
      },
      {
        name: "تشكيل الذقن",
        description: "تحسين شكل الذقن وتناسقه مع باقي الوجه"
      },
      {
        name: "شد الجلد في منطقة الذقن",
        description: "إزالة الترهل وشد الجلد في منطقة الذقن"
      }
    ],
    position: [0, -0.6, 0.7],
    side: 'right'
  },
  forehead: {
    name: "الجبهة",
    description: "علاجات لإزالة التجاعيد وتنحيف الوجه",
    services: [
      {
        name: "حقن البوتوكس",
        description: "إزالة التجاعيد الأفقية في الجبهة بشكل فوري"
      },
      {
        name: "إزالة التجاعيد",
        description: "علاج شامل للتجاعيد والخطوط الدقيقة في الجبهة"
      },
      {
        name: "تنحيف الوجه",
        description: "تقليل حجم الجبهة وتحسين شكل الوجه العام"
      },
      {
        name: "شد الجلد",
        description: "شد الجلد المترهل في منطقة الجبهة"
      }
    ],
    position: [0, 0.7, 0.6],
    side: 'right'
  },
  lips: {
    name: "الشفاه",
    description: "خدمات تجميلية للشفاه والفم",
    services: [
      {
        name: "حقن حمض الهيالورونيك",
        description: "تكبير الشفاه بشكل طبيعي ومتناسق"
      },
      {
        name: "تكبير الشفاه",
        description: "زيادة حجم الشفاه وتحسين شكلها"
      },
      {
        name: "تجميل شكل الشفاه",
        description: "تحسين شكل الشفاه وإبراز جمالها"
      },
      {
        name: "إزالة التجاعيد حول الفم",
        description: "علاج التجاعيد والخطوط حول منطقة الفم"
      }
    ],
    position: [0, -0.3, 0.8],
    side: 'left'
  },
  cheeks: {
    name: "الخدود",
    description: "علاجات لبروز وشد منطقة الخدود",
    services: [
      {
        name: "حقن حمض الهيالورونيك",
        description: "بروز الخدود وإبراز ملامح الوجه"
      },
      {
        name: "بروز الخدود",
        description: "إبراز الخدود وتحسين شكل الوجه"
      },
      {
        name: "شد الخدود",
        description: "شد الجلد المترهل في منطقة الخدود"
      },
      {
        name: "إزالة التجاعيد",
        description: "علاج التجاعيد والخطوط في منطقة الخدود"
      }
    ],
    position: [0.5, 0, 0.5],
    side: 'left'
  },
  neck: {
    name: "الرقبة",
    description: "علاجات لشد وتجميل منطقة الرقبة",
    services: [
      {
        name: "حقن البوتوكس",
        description: "إزالة التجاعيد والخطوط في الرقبة"
      },
      {
        name: "شد الرقبة",
        description: "شد الجلد المترهل في منطقة الرقبة"
      },
      {
        name: "إزالة التجاعيد",
        description: "علاج شامل للتجاعيد في منطقة الرقبة"
      },
      {
        name: "تنحيف الرقبة",
        description: "تقليل حجم الرقبة وتحسين شكلها"
      }
    ],
    position: [0, -0.8, 0.5],
    side: 'left'
  },
  jawline: {
    name: "الفكين",
    description: "علاجات لتشكيل وبروز خط الفك",
    services: [
      {
        name: "حقن حمض الهيالورونيك",
        description: "تشكيل خط الفك وإبرازه بشكل طبيعي"
      },
      {
        name: "تشكيل الفكين",
        description: "تحسين شكل الفكين وتناسقهما مع الوجه"
      },
      {
        name: "شد الجلد",
        description: "شد الجلد المترهل في منطقة الفكين"
      },
      {
        name: "تنحيف الوجه",
        description: "تقليل حجم الوجه وتحسين شكله العام"
      }
    ],
    position: [-0.5, -0.2, 0.5],
    side: 'left'
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

  const handleRegionClick = (region) => {
    setActiveHotspot(region.id);
    setSelectedRegion(region);
    if (onSelectCategory) {
      onSelectCategory(region.name);
    }
  };

  const hasSelection = !!selectedRegion;

  // تقسيم المناطق حسب الجانب
  const rightRegions = Object.entries(faceRegions)
    .filter(([_, region]) => region.side === 'right')
    .map(([id, region]) => ({ id, ...region }));

  const leftRegions = Object.entries(faceRegions)
    .filter(([_, region]) => region.side === 'left')
    .map(([id, region]) => ({ id, ...region }));

  return (
    <Container hasSelection={hasSelection}>
      {/* الأزرار على اليمين - تظهر فقط عندما لا يكون هناك اختيار */}
      {!hasSelection && (
        <SideButtonsContainer side="right">
          {rightRegions.map((region) => (
            <SideButton
              key={region.id}
              side="right"
              active={activeHotspot === region.id}
              onClick={() => handleRegionClick(region)}
            >
              {region.name}
            </SideButton>
          ))}
        </SideButtonsContainer>
      )}

      {/* الكارد الأول: الموديل */}
      <ModelCard hasSelection={hasSelection}>
        <CanvasContainer>
          <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, 5, 5]} intensity={0.6} />
            <pointLight position={[0, 5, 5]} intensity={0.8} />
            
            <Suspense fallback={<LoadingFallback />}>
              <FaceModelMesh 
                onHotspotClick={handleRegionClick} 
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
        </CanvasContainer>
      </ModelCard>

      {/* الأزرار على الشمال - تظهر فقط عندما لا يكون هناك اختيار */}
      {!hasSelection && (
        <SideButtonsContainer side="left">
          {leftRegions.map((region) => (
            <SideButton
              key={region.id}
              side="left"
              active={activeHotspot === region.id}
              onClick={() => handleRegionClick(region)}
            >
              {region.name}
            </SideButton>
          ))}
        </SideButtonsContainer>
      )}

      {/* الكارد الثاني: معلومات الخدمات - يظهر فقط عند الاختيار */}
      {selectedRegion && (
        <ServicesCard>
          <ServiceHeader>
            <ServiceTitle>{selectedRegion.name}</ServiceTitle>
            <ServiceSubtitle>{selectedRegion.description}</ServiceSubtitle>
          </ServiceHeader>
          <ServicesList>
            {selectedRegion.services.map((service, index) => (
              <ServiceItem key={index}>
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceItem>
            ))}
          </ServicesList>
        </ServicesCard>
      )}
    </Container>
  );
}
