import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  margin: 0.2rem;
  direction: rtl;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: ${props => props.hasSelection ? 'flex-start' : 'center'};
  align-items: stretch;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ModelWrapper = styled.div`
  flex: ${props => props.hasSelection ? '0 0 45%' : '0 0 auto'};
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-width: ${props => props.hasSelection ? 'auto' : '5.5rem'};
`;

const ModelHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.2rem;
  color: #fff;
  text-align: center;
  font-size: 0.2rem;
  font-weight: bold;
`;

const CanvasWrapper = styled.div`
  position: relative;
  height: 4rem;
  background: linear-gradient(180deg, #f8f9ff 0%, #e8ecff 100%);
`;

const SideButtonsWrapper = styled.div`
  position: absolute;
  ${props => props.side === 'right' ? 'right: 0.2rem;' : 'left: 0.2rem;'}
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  z-index: 20;
`;

const RegionBtn = styled.button`
  background: #fff;
  color: #667eea;
  border: 2px solid ${props => props.active ? '#ff6b6b' : '#e0e7ff'};
  padding: 0.1rem 0.18rem;
  border-radius: 0.12rem;
  font-size: 0.15rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active 
    ? '0 4px 12px rgba(255, 107, 107, 0.3)' 
    : '0 2px 6px rgba(0, 0, 0, 0.08)'};
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateX(${props => props.side === 'right' ? '-0.08rem' : '0.08rem'});
    border-color: #ff6b6b;
    background: ${props => props.active ? '#ff6b6b' : '#fff5f5'};
    color: ${props => props.active ? '#fff' : '#ff6b6b'};
    box-shadow: 0 6px 16px rgba(255, 107, 107, 0.25);
    
    &::before {
      left: 100%;
    }
  }
  
  ${props => props.active && `
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: #fff;
    border-color: #ff6b6b;
  `}
`;

const HotspotLabel = styled.div`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)' 
    : 'rgba(255, 255, 255, 0.98)'};
  color: ${props => props.active ? '#fff' : '#333'};
  padding: 0.1rem 0.15rem;
  border-radius: 0.2rem;
  font-size: 0.14rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: ${props => props.active ? '2px solid #fff' : '2px solid transparent'};
  white-space: nowrap;
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
`;

const ServicesPanel = styled.div`
  flex: ${props => props.hasSelection ? '0 0 55%' : '0'};
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.hasSelection ? '1' : '0'};
  transform: ${props => props.hasSelection ? 'translateX(0)' : 'translateX(20px)'};
  max-height: ${props => props.hasSelection ? 'none' : '0'};
  direction: rtl;
`;

const ServicesHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.25rem;
  color: #fff;
`;

const ServicesTitle = styled.h2`
  font-size: 0.26rem;
  margin: 0 0 0.08rem 0;
  font-weight: bold;
`;

const ServicesSubtitle = styled.p`
  font-size: 0.16rem;
  margin: 0;
  opacity: 0.95;
`;

const ServicesContent = styled.div`
  padding: 0.2rem;
  max-height: 3.5rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 0.1rem;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0.1rem;
    
    &:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }
  }
`;

const ServiceCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid #e0e7ff;
  border-right: 4px solid #667eea;
  border-radius: 0.12rem;
  padding: 0.18rem;
  margin-bottom: 0.15rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0.05rem;
    height: 100%;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s;
  }
  
  &:hover {
    transform: translateX(-0.08rem);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
    
    &::before {
      width: 0.1rem;
    }
  }
`;

const ServiceName = styled.div`
  font-size: 0.18rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  
  &::before {
    content: "💎";
    font-size: 0.18rem;
  }
`;

const ServiceDesc = styled.div`
  font-size: 0.15rem;
  color: #666;
  line-height: 1.7;
`;

// معلومات المناطق والخدمات
const faceRegions = {
  undereyes: {
    name: "تحت العين",
    description: "علاجات تجميلية متخصصة لمنطقة تحت العين",
    services: [
      {
        name: "إزالة الهالات السوداء",
        description: "علاج فعال للهالات السوداء والانتفاخات تحت العين"
      },
      {
        name: "حقن الفيلر",
        description: "ملء التجاويف تحت العين وإزالة الانتفاخات"
      },
      {
        name: "شد الجلد",
        description: "شد الجلد المترهل تحت العين"
      }
    ],
    position: [0.4, 0.4, 0.7],
    side: 'right'
  },
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
        name: "شد الجلد حول العين",
        description: "إزالة التجاعيد وشد الجلد المترهل حول منطقة العين"
      }
    ],
    position: [0.4, 0.4, 0.7],
    side: 'right'
  },
  temple: {
    name: "الصدغ",
    description: "علاجات تجميلية لمنطقة الصدغ",
    services: [
      {
        name: "حقن الفيلر",
        description: "ملء منطقة الصدغ وإبراز ملامح الوجه"
      },
      {
        name: "شد الجلد",
        description: "شد الجلد المترهل في منطقة الصدغ"
      }
    ],
    position: [0.5, 0.3, 0.6],
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
    position: [0.3, 0, 0.85],
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
    position: [0.4, -0.7, 0.6],
    side: 'right'
  },
  doublechin: {
    name: "الذقن المزدوج",
    description: "علاجات لإزالة الذقن المزدوج",
    services: [
      {
        name: "إزالة الدهون",
        description: "إزالة الدهون الزائدة في منطقة الذقن المزدوج"
      },
      {
        name: "شد الجلد",
        description: "شد الجلد المترهل في منطقة الذقن المزدوج"
      },
      {
        name: "تنحيف الذقن",
        description: "تقليل حجم الذقن المزدوج وتحسين شكل الوجه"
      }
    ],
    position: [0.3, -0.8, 0.5],
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
    position: [0.3, 0.8, 0.5],
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
    position: [-0.4, -0.4, 0.7],
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
    position: [-0.6, 0.1, 0.4],
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
    position: [-0.3, -0.9, 0.4],
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
    position: [-0.7, -0.2, 0.4],
    side: 'left'
  }
};

function Hotspot({ position, name, onClick, active }) {
  return (
    <Html position={position} center>
      <HotspotLabel active={active} onClick={onClick}>
        {name}
      </HotspotLabel>
    </Html>
  );
}

// أسماء المناطق في المودل
const regionNames = ['cheeks', 'doublechin', 'forehead', 'jawline', 'lips', 'neck', 'nose', 'temple', 'undereyes'];

function FaceModelMesh({ onHotspotClick, activeHotspot, selectedRegion, onRegionSelect }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/assets/models/face.glb");
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [waveProgress, setWaveProgress] = useState(0);
  const waveRef = useRef(0);
  const meshesRef = useRef(new Map());
  
  // لون التحديد: بنفسجي شفاف يميل للوردي
  const highlightColor = new THREE.Color(0x9d4edd); // بنفسجي
  const highlightColorPink = new THREE.Color(0xe91e63); // وردي

  // تأثير الموجة عند الانتقال
  useEffect(() => {
    if (selectedRegion) {
      waveRef.current = 0;
      setWaveProgress(0);
      const interval = setInterval(() => {
        waveRef.current += 0.08;
        setWaveProgress(waveRef.current);
        if (waveRef.current >= 2) {
          clearInterval(interval);
          waveRef.current = 0;
        }
      }, 16);
      return () => clearInterval(interval);
    }
  }, [selectedRegion]);

  // البحث عن meshes المناطق وإعدادها
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();
        
        // التحقق إذا كان هذا mesh من المناطق المطلوبة
        const regionId = regionNames.find(region => meshName.includes(region));
        
        if (regionId) {
          // حفظ المادة الأصلية
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          // جعل mesh قابل للتفاعل
          child.userData.regionName = meshName;
          child.userData.regionId = regionId;
          child.userData.isRegion = true;
          
          // إضافة event listeners
          child.onPointerOver = (e) => {
            e.stopPropagation();
            setHoveredRegion(regionId);
            document.body.style.cursor = 'pointer';
          };
          
          child.onPointerOut = () => {
            setHoveredRegion(null);
            document.body.style.cursor = 'auto';
          };
          
          child.onClick = (e) => {
            e.stopPropagation();
            if (onRegionSelect) {
              onRegionSelect(regionId);
            }
          };
          
          // حفظ المرجع
          meshesRef.current.set(regionId, child);
        }
      }
    });
  }, [scene, onRegionSelect]);

  // تحديث ألوان المناطق مع تأثير الموجة
  useFrame(() => {
    if (!scene) return;

    meshesRef.current.forEach((mesh, regionId) => {
      const isActive = selectedRegion === regionId;
      const isHovered = hoveredRegion === regionId;
      
      if (isActive || isHovered) {
        // إنشاء مادة جديدة مع تأثير الموجة
        if (!mesh.userData.highlightMaterial) {
          mesh.userData.highlightMaterial = new THREE.MeshStandardMaterial({
            color: highlightColor,
            transparent: true,
            opacity: 0.4,
            emissive: highlightColorPink,
            emissiveIntensity: 0.3,
            side: THREE.DoubleSide
          });
        }
        
        const material = mesh.userData.highlightMaterial;
        
        if (isActive) {
          // تأثير الموجة: نبضة ناعمة
          const waveEffect = Math.sin(waveProgress * Math.PI) * 0.15 + 0.35;
          material.opacity = waveEffect;
          material.emissiveIntensity = Math.sin(waveProgress * Math.PI) * 0.2 + 0.4;
        } else {
          // تأثير hover
          material.opacity = 0.3;
          material.emissiveIntensity = 0.2;
        }
        
        mesh.material = material;
      } else {
        // إعادة المادة الأصلية
        if (mesh.userData.originalMaterial) {
          mesh.material = mesh.userData.originalMaterial;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} position={[0, -0.3, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div style={{ 
        color: '#667eea', 
        fontSize: '0.24rem',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        جاري التحميل...
      </div>
    </Html>
  );
}

export default function FaceModel({ onSelectCategory }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleRegionClick = (region) => {
    if (transitioning) return;
    
    setTransitioning(true);
    setActiveHotspot(region.id);
    setSelectedRegionId(region.id);
    
    // تأثير الموجة عند الانتقال
    setTimeout(() => {
      setSelectedRegion(region);
      if (onSelectCategory) {
        onSelectCategory(region.name);
      }
      setTransitioning(false);
    }, 300);
  };

  const handleMeshRegionSelect = (regionId) => {
    if (transitioning) return;
    
    const region = Object.entries(faceRegions).find(([id]) => id === regionId);
    if (region) {
      handleRegionClick({ id: regionId, ...region[1] });
    }
  };

  const hasSelection = !!selectedRegion;

  const rightRegions = Object.entries(faceRegions)
    .filter(([_, region]) => region.side === 'right')
    .map(([id, region]) => ({ id, ...region }));

  const leftRegions = Object.entries(faceRegions)
    .filter(([_, region]) => region.side === 'left')
    .map(([id, region]) => ({ id, ...region }));

  return (
    <MainContainer>
      <ContentWrapper hasSelection={hasSelection}>
        {/* كارد الموديل */}
        <ModelWrapper hasSelection={hasSelection}>
          <ModelHeader>نموذج الوجه التفاعلي</ModelHeader>
          <CanvasWrapper>
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <directionalLight position={[-5, 5, 5]} intensity={0.6} />
              <pointLight position={[0, 5, 5]} intensity={0.8} />
              
              <Suspense fallback={<LoadingFallback />}>
                <FaceModelMesh 
                  onHotspotClick={handleRegionClick} 
                  activeHotspot={activeHotspot}
                  selectedRegion={selectedRegionId}
                  onRegionSelect={handleMeshRegionSelect}
                />
              </Suspense>
              
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={2}
                maxDistance={4}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                target={[0, 0, 0]}
                autoRotate={false}
              />
            </Canvas>
            
            {/* الأزرار الجانبية داخل Canvas */}
            {!hasSelection && (
              <>
                {/* الأزرار على اليمين (الجبهة، العين، الأنف، الذقن) */}
                <SideButtonsWrapper side="right">
                  {rightRegions.map((region) => (
                    <RegionBtn
                      key={region.id}
                      side="right"
                      active={activeHotspot === region.id}
                      onClick={() => handleRegionClick(region)}
                    >
                      {region.name}
                    </RegionBtn>
                  ))}
                </SideButtonsWrapper>
                
                {/* الأزرار على الشمال (الفكين، الخدود، الشفاه، الرقبة) */}
                <SideButtonsWrapper side="left">
                  {leftRegions.map((region) => (
                    <RegionBtn
                      key={region.id}
                      side="left"
                      active={activeHotspot === region.id}
                      onClick={() => handleRegionClick(region)}
                    >
                      {region.name}
                    </RegionBtn>
                  ))}
                </SideButtonsWrapper>
              </>
            )}
          </CanvasWrapper>
        </ModelWrapper>

        {/* لوحة الخدمات */}
        <ServicesPanel hasSelection={hasSelection}>
          {selectedRegion && (
            <>
              <ServicesHeader>
                <ServicesTitle>{selectedRegion.name}</ServicesTitle>
                <ServicesSubtitle>{selectedRegion.description}</ServicesSubtitle>
              </ServicesHeader>
              <ServicesContent>
                {selectedRegion.services.map((service, index) => (
                  <ServiceCard key={index}>
                    <ServiceName>{service.name}</ServiceName>
                    <ServiceDesc>{service.description}</ServiceDesc>
                  </ServiceCard>
                ))}
              </ServicesContent>
            </>
          )}
        </ServicesPanel>
      </ContentWrapper>
    </MainContainer>
  );
}
