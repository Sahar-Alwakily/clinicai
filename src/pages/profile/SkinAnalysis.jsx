import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";
import SoYoungFaceAnalysis from "../../components/FaceAnalysis/SoYoungFaceAnalysis";

const SkinAnalysisContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 1.5rem;
  direction: rtl;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.3rem 0.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 0.24rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }
  
  h1 {
    font-size: 0.28rem;
    font-weight: 700;
    margin: 0;
    flex: 1;
    color: white;
  }
`;

const AnalysisCard = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const AnalysisItem = styled.div`
  margin-bottom: 0.15rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .item-label {
    font-size: 0.18rem;
    color: #718096;
    margin-bottom: 0.05rem;
  }
  
  .item-value {
    font-size: 0.2rem;
    font-weight: 600;
    color: #2d3748;
  }
  
  .item-description {
    font-size: 0.16rem;
    color: #4a5568;
    margin-top: 0.05rem;
    line-height: 1.5;
  }
`;

const ScoreBar = styled.div`
  margin-top: 0.08rem;
  height: 0.08rem;
  background: #e0e0e0;
  border-radius: 0.04rem;
  overflow: hidden;
  position: relative;
  
  .score-fill {
    height: 100%;
    background: ${props => {
      if (props.score >= 70) return 'linear-gradient(90deg, #ff6b6b 0%, #ff5252 100%)';
      if (props.score >= 40) return 'linear-gradient(90deg, #ffa726 0%, #ff9800 100%)';
      return 'linear-gradient(90deg, #66bb6a 0%, #4caf50 100%)';
    }};
    width: ${props => props.score}%;
    transition: width 0.5s ease;
  }
  
  .score-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.12rem;
    font-weight: 600;
    color: #333;
    z-index: 1;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.05rem 0.1rem;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  font-weight: 500;
  margin-left: 0.05rem;
  
  ${props => props.type === 'success' && `
    background: #e8f5e9;
    color: #2e7d32;
  `}
  
  ${props => props.type === 'warning' && `
    background: #fff3e0;
    color: #e65100;
  `}
  
  ${props => props.type === 'danger' && `
    background: #ffebee;
    color: #c62828;
  `}
`;

const SectionTitle = styled.div`
  font-size: 0.2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0.2rem 0 0.15rem 0;
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #667eea;
`;

@withRouter
class SkinAnalysis extends Component {
  state = {
    aiAnalysis: null,
    analysis: {
      skinType: "بشرة دهنية",
      concerns: ["حب الشباب", "البقع الداكنة", "المسام الواسعة"],
      recommendations: [
        "استخدام منتجات خالية من الزيوت",
        "تنظيف البشرة مرتين يومياً",
        "استخدام واقي الشمس SPF 50+"
      ],
      lastUpdate: "10 ديسمبر 2024"
    }
  };

  handleAnalysisComplete = async (results) => {
    // Handle SoYoungFaceAnalysis results structure (has fullAnalysis property)
    let aiAnalysis;
    let originalImage = null;
    let regions = {};
    
    if (results && results.fullAnalysis) {
      // Convert SoYoungFaceAnalysis format to expected format
      const fullAnalysis = results.fullAnalysis;
      
      // Get original image and regions if available
      if (results.regions && results.regions.length > 0) {
        // Try to get image from first region thumbnail
        originalImage = results.regions[0]?.thumbnail;
      // Extract regions map (including forehead and smileLines)
      results.regions.forEach(region => {
        if (region.thumbnail) {
          regions[region.id] = {
            thumbnail: region.thumbnail,
            region: region.region
          };
        }
      });
      
      // Extract forehead and smileLines regions if available
      const foreheadRegion = results.regions.find(r => r.id === 'forehead');
      if (foreheadRegion && foreheadRegion.thumbnail) {
        regions.forehead = {
          thumbnail: foreheadRegion.thumbnail,
          region: foreheadRegion.region
        };
      }
      
      const smileLinesRegion = results.regions.find(r => r.id === 'smileLines');
      if (smileLinesRegion && smileLinesRegion.thumbnail) {
        regions.smileLines = {
          thumbnail: smileLinesRegion.thumbnail,
          region: smileLinesRegion.region
        };
      }
      }
      
      // Store regions data for problem recommendations
      const regionsData = results.regions || [];
      
      // Extract underEyes region if dark circles are present
      if (fullAnalysis.skinProblems && fullAnalysis.skinProblems.darkCircles && fullAnalysis.skinProblems.darkCircles.present) {
        if (!regions.underEyes && results.regions) {
          // Use eyes region for under eyes if available
          const eyesRegion = results.regions.find(r => r.id === 'eyes');
          if (eyesRegion && eyesRegion.thumbnail) {
            regions.underEyes = {
              thumbnail: eyesRegion.thumbnail,
              region: eyesRegion.region
            };
          }
        }
      }
      
      // Store original image for fallback
      if (results.overall && !originalImage) {
        originalImage = this.analysisData?.image || results.overall.image;
      }
      
      // Build aiAnalysis object in expected format
      aiAnalysis = {
        age: fullAnalysis.age || results.overall?.age || 30,
        gender: fullAnalysis.gender === 'Male' ? 'ذكر' : fullAnalysis.gender === 'Female' ? 'أنثى' : 'غير محدد',
        
        // Skin type from advanced analysis
        skinType: fullAnalysis.advancedSkin ? {
          type: fullAnalysis.advancedSkin.type || 'مختلطة',
          confidence: fullAnalysis.advancedSkin.confidence || 75
        } : { type: 'مختلطة', confidence: 75 },
        
        // Advanced skin analysis
        advancedSkin: fullAnalysis.advancedSkin || {
          type: 'مختلطة',
          hydration: 'طبيعي',
          sebum: 'متوسط',
          pores: 'متوسطة',
          texture: 'متوسطة'
        },
        
        // Skin problems
        skinProblems: fullAnalysis.skinProblems || {
          acne: { active: false },
          pigmentation: { level: 'لا يوجد' },
          darkCircles: { present: false }
        },
        
        // Facial proportions
        facialProportions: fullAnalysis.facialProportions || {
          symmetry: 75,
          goldenRatio: 75,
          faceShape: 'بيضاوي'
        },
        
        // Specific regions analysis (for smile lines, fine lines, etc.)
        specificRegions: fullAnalysis.specificRegions || {},
        
        // Store regions for thumbnails
        regions: regions,
        originalImage: originalImage,
        regionsData: regionsData, // Store full regions data for recommendations
        
        // Default values for other required fields
        wrinkles: {
          severity: 'منخفض',
          score: 30,
          forehead: 0,
          eyes: 0,
          mouth: 0
        },
        sagging: {
          severity: 'منخفض',
          score: 25
        },
        facialLines: {
          severity: 'خفيف',
          nasolabial: 0,
          marionette: 0,
          forehead: 0
        },
        eyebrows: {
          symmetry: 'متناسقة',
          needsCorrection: false,
          score: 100,
          heightDifference: '0'
        },
        mouth: {
          size: 'متوسط',
          needsFiller: false,
          width: '0',
          height: '0',
          thickness: '0'
        },
        treatments: [],
        expressions: fullAnalysis.expressions || {}
      };
    } else {
      // Original format (from FaceAnalysis component)
      aiAnalysis = results;
    }
    
    // Calculate age appearance analysis
    const ageAppearanceAnalysis = this.calculateAgeAppearance(aiAnalysis);
    
    // Generate problem-specific recommendations with thumbnails
    const problemRecommendations = this.generateProblemRecommendations(aiAnalysis);
    
    const recommendations = this.generateRecommendations(aiAnalysis);
    
    this.setState({
      aiAnalysis: {
        ...aiAnalysis,
        ageAppearanceAnalysis,
        problemRecommendations,
        recommendations
      }
    });
  };

  // حساب تحليل مظهر العمر
  calculateAgeAppearance = (analysis) => {
    const detectedAge = analysis.age || 30;
    let ageDifference = 0;
    const factors = [];
    
    // تحليل المشاكل التي تجعل الوجه يبدو أكبر
    if (analysis.skinProblems) {
      if (analysis.skinProblems.wrinkles && analysis.skinProblems.wrinkles.total > 5) {
        ageDifference += 2;
        factors.push('التجاعيد');
      }
      
      if (analysis.skinProblems.darkCircles && analysis.skinProblems.darkCircles.present) {
        ageDifference += 1.5;
        factors.push('الهالات السوداء');
      }
      
      if (analysis.skinProblems.pigmentation && analysis.skinProblems.pigmentation.level !== 'لا يوجد') {
        ageDifference += 1;
        factors.push('التصبغات');
      }
      
      if (analysis.wrinkles && analysis.wrinkles.severity === 'عالي') {
        ageDifference += 2;
        if (!factors.includes('التجاعيد')) factors.push('التجاعيد');
      }
      
      if (analysis.sagging && analysis.sagging.severity === 'عالي') {
        ageDifference += 1.5;
        factors.push('الترهل');
      }
    }
    
    // تحليل المشاكل التي تجعل الوجه يبدو أصغر
    if (analysis.advancedSkin && (analysis.advancedSkin.hydration === 'طبيعي' || analysis.advancedSkin.hydration === 'جيد')) {
      ageDifference -= 0.5;
    }
    
    const apparentAge = detectedAge + ageDifference;
    const isOlder = apparentAge > detectedAge;
    const isYounger = apparentAge < detectedAge;
    
    return {
      detectedAge,
      apparentAge: Math.round(apparentAge),
      ageDifference: Math.round(ageDifference * 10) / 10,
      isOlder,
      isYounger,
      factors,
      description: isOlder 
        ? `مظهر العمر المتوقع للبشرة: ${Math.round(apparentAge)} سنة (أكبر من عمرك الحقيقي بـ ${Math.round(ageDifference)} سنة). هذا بسبب: ${factors.join('، ')}.`
        : isYounger
        ? `مظهر العمر المتوقع للبشرة: ${Math.round(apparentAge)} سنة (أصغر من عمرك الحقيقي بـ ${Math.abs(Math.round(ageDifference))} سنة).`
        : `مظهر العمر المتوقع للبشرة: ${detectedAge} سنة (متوافق مع عمرك الحقيقي).`
    };
  };

  // التحقق من حجم الأنف
  checkNoseSize = (analysis) => {
    // إذا كان هناك region للأنف و score منخفض، يعتبر كبير/ضخم
    if (analysis.regionsData) {
      const noseRegion = analysis.regionsData.find(r => r.id === 'nose');
      // إذا كان score أقل من 75، يعتبر الأنف كبير/ضخم
      if (noseRegion && noseRegion.score < 75) {
        return true;
      }
    }
    
    // إذا كان هناك معلومات عن الأنف من facialProportions
    if (analysis.facialProportions && analysis.facialProportions.personalityAnalysis) {
      // يمكن إضافة تحليل إضافي هنا
    }
    
    return false;
  };

  // توليد قائمة المشاكل لكل منطقة (بدون حلول)
  generateProblemRecommendations = (analysis) => {
    const recommendations = [];
    
    // قائمة المناطق التي تمت إضافتها كمشاكل (لتجنب التكرار)
    const addedRegions = new Set();
    
    // التحقق من مشاكل الأنف
    const hasNoseProblems = this.checkNoseSize(analysis);
    
    // التحقق من الهالات السوداء - التحقق من present أو severity
    const hasDarkCircles = analysis.skinProblems && 
                          analysis.skinProblems.darkCircles && 
                          (analysis.skinProblems.darkCircles.present || 
                           (analysis.skinProblems.darkCircles.severity && 
                            analysis.skinProblems.darkCircles.severity !== 'لا يوجد' &&
                            analysis.skinProblems.darkCircles.severity !== 'خفيف'));
    
    // التحقق من مشاكل الفم - توسيع الشروط لتشمل السواد والترطيب دائماً
    const hasMouthProblems = analysis.mouth && (
      analysis.mouth.needsFiller || 
      analysis.mouth.size === 'صغير' || 
      analysis.mouth.size === 'كبير' ||
      (analysis.mouth.thickness && parseFloat(analysis.mouth.thickness) < 0.3) ||
      analysis.mouth.darkness ||
      (analysis.skinProblems && analysis.skinProblems.pigmentation && analysis.skinProblems.pigmentation.level !== 'لا يوجد') ||
      true // إضافة الفم دائماً إذا كان موجوداً
    );
    
    // إضافة جميع المناطق من results.regions (باستثناء المناطق التي لها مشاكل محددة)
    if (analysis.regionsData && analysis.regionsData.length > 0) {
      analysis.regionsData.forEach(region => {
        const regionNames = {
          'eyes': 'العيون',
          'nose': 'الأنف',
          'mouth': 'الفم',
          'jawline': 'خط الفك',
          'cheeks': 'الخدود',
          'skin': 'البشرة'
        };
        
        const arabicName = regionNames[region.id] || region.name;
        
        // تخطي الأنف إذا كان هناك مشاكل (سيتم إضافتها لاحقاً)
        if (region.id === 'nose' && hasNoseProblems) {
          addedRegions.add('nose');
          return;
        }
        
        // تخطي الفم إذا كان هناك مشاكل (سيتم إضافتها لاحقاً)
        if (region.id === 'mouth' && hasMouthProblems) {
          addedRegions.add('mouth');
          return;
        }
        
        // تخطي العيون إذا كانت هناك هالات سوداء (سيتم إضافتها لاحقاً)
        if (region.id === 'eyes' && hasDarkCircles) {
          addedRegions.add('eyes');
          return;
        }
        
        // تخطي البشرة - سيتم إضافتها في قسم منفصل
        if (region.id === 'skin') {
          addedRegions.add('skin');
          return;
        }
        
        // إزالة الحالات الممتازة - لا نعرض المناطق الممتازة
        // فقط نعرض المناطق التي تحتاج تحسين
        if (region.score < 80) {
          let solutions = [];
          
          if (region.id === 'nose') {
            solutions = [
              'تنظيف الأنف بلطف',
              'استخدام منتجات لتقليص المسام',
              'تجنب لمس الأنف',
              'استخدام واقي الشمس',
              'ترطيب منطقة الأنف'
            ];
          } else if (region.id === 'jawline') {
            solutions = [
              'تمارين وجهية لتقوية خط الفك',
              'استخدام منتجات رفع وتقوية',
              'العلاج بالخيوط (Thread Lift)',
              'العلاج بالليزر أو الموجات الراديوية',
              'شد الوجه الجراحي في الحالات المتقدمة'
            ];
          } else if (region.id === 'cheeks') {
            solutions = [
              'ترطيب الخدود بانتظام',
              'استخدام منتجات تحتوي على فيتامين C',
              'تجنب التعرض المباشر لأشعة الشمس',
              'استخدام واقي الشمس',
              'العلاج بالفيلر للخدود إذا لزم الأمر'
            ];
          }
          
          if (solutions.length > 0) {
            recommendations.push({
              problem: arabicName,
              severity: region.score >= 60 ? 'جيدة' : 'تحتاج تحسين',
              thumbnail: region.thumbnail,
              solutions: solutions
            });
            addedRegions.add(region.id);
          }
        }
      });
    }
    
    // العيون - تحليل شامل: الهالات، التجويف، الخطوط، التجاعيد
    if (analysis.skinProblems && 
        analysis.skinProblems.darkCircles && 
        !addedRegions.has('eyes')) {
      const darkCircles = analysis.skinProblems.darkCircles;
      const problems = [];
      
      // 1. الهالات السوداء
      if (darkCircles.present || 
          (darkCircles.severity && darkCircles.severity !== 'لا يوجد') ||
          (darkCircles.avgBrightness !== undefined && darkCircles.avgBrightness < 140)) {
        problems.push('الهالات');
      }
      
      // 2. التجويف
      if (darkCircles.present || 
          (darkCircles.severity && darkCircles.severity !== 'لا يوجد') ||
          (darkCircles.avgBrightness !== undefined && darkCircles.avgBrightness < 140)) {
        problems.push('التجويف');
      }
      
      // 3. الخطوط (Crow's feet)
      if (analysis.wrinkles && analysis.wrinkles.crowFeet && analysis.wrinkles.crowFeet > 0) {
        problems.push('الخطوط');
      } else if (analysis.skinProblems && analysis.skinProblems.wrinkles && analysis.skinProblems.wrinkles.crowFeet && analysis.skinProblems.wrinkles.crowFeet > 0) {
        problems.push('الخطوط');
      }
      
      // 4. التجاعيد
      if (analysis.wrinkles && analysis.wrinkles.total > 0) {
        problems.push('التجاعيد');
      } else if (analysis.skinProblems && analysis.skinProblems.wrinkles && analysis.skinProblems.wrinkles.total > 0) {
        problems.push('التجاعيد');
      }
      
      // إضافة دائماً إذا كانت هناك أي مشاكل
      if (problems.length > 0) {
        recommendations.push({
          region: 'العيون',
          problems: problems,
          thumbnail: analysis.regions?.underEyes?.thumbnail || analysis.regions?.eyes?.thumbnail || analysis.originalImage
        });
        addedRegions.add('eyes');
      }
    }
    
    // الأنف - تحليل شامل: النقاط السوداء، الحبوب البيضاء، كبر الأنف
    if (!addedRegions.has('nose')) {
      const problems = [];
      
      // 1. النقاط السوداء (من حب الشباب في منطقة الأنف)
      if (analysis.skinProblems && analysis.skinProblems.acne) {
        const noseAcne = analysis.skinProblems.acne.location?.nose || 0;
        if (noseAcne > 0 || (analysis.skinProblems.acne.types && analysis.skinProblems.acne.types.includes('رؤوس سوداء'))) {
          problems.push('النقاط السوداء');
        }
      }
      
      // 2. الحبوب البيضاء (من حب الشباب)
      if (analysis.skinProblems && analysis.skinProblems.acne) {
        const noseAcne = analysis.skinProblems.acne.location?.nose || 0;
        if (noseAcne > 0 || (analysis.skinProblems.acne.types && analysis.skinProblems.acne.types.includes('رؤوس بيضاء'))) {
          problems.push('الحبوب البيضاء');
        }
      }
      
      // 3. كبر الأنف
      if (hasNoseProblems) {
        problems.push('كبر الأنف');
      }
      
      // إضافة دائماً إذا كانت هناك أي مشاكل
      if (problems.length > 0) {
        recommendations.push({
          region: 'الأنف',
          problems: problems,
          thumbnail: analysis.regions?.nose?.thumbnail || analysis.originalImage
        });
        addedRegions.add('nose');
      }
    }
    
    // الفم - تحليل شامل: الرطوبة ومشاكل الفم
    if (analysis.mouth && !addedRegions.has('mouth')) {
      const problems = [];
      
      // 1. الرطوبة (قلة الترطيب)
      if (analysis.mouth.thickness && parseFloat(analysis.mouth.thickness) < 0.3) {
        problems.push('قلة الرطوبة');
      }
      
      // 2. السواد
      if (analysis.mouth.darkness || 
          (analysis.skinProblems && analysis.skinProblems.pigmentation && 
           analysis.skinProblems.pigmentation.level !== 'لا يوجد')) {
        problems.push('السواد');
      }
      
      // 3. صغر الحجم
      if (analysis.mouth.size === 'صغير' || analysis.mouth.needsFiller) {
        problems.push('صغر الحجم');
      }
      
      // 4. كبر الحجم
      if (analysis.mouth.size === 'كبير') {
        problems.push('كبر الحجم');
      }
      
      // 5. خطوط الابتسامة
      if (analysis.specificRegions && analysis.specificRegions.lips && analysis.specificRegions.lips.smileLines && analysis.specificRegions.lips.smileLines.present) {
        problems.push('خطوط الابتسامة');
      }
      
      // إضافة دائماً إذا كانت هناك أي مشاكل
      if (problems.length > 0) {
        recommendations.push({
          region: 'الفم',
          problems: problems,
          thumbnail: analysis.regions?.mouth?.thumbnail || analysis.originalImage
        });
        addedRegions.add('mouth');
      }
    }
    
    // قسم البشرة - تحليل شامل: نوع البشرة + حالة البشرة العامة
    // إضافة قسم البشرة دائماً إذا كانت البيانات موجودة
    if (analysis.advancedSkin) {
      const skinInfo = [];
      const skinProblems = [];
      const skinSolutions = [];
      
      // نوع البشرة - إضافة دائماً بشكل واضح
      if (analysis.advancedSkin.type) {
        skinInfo.push(`نوع البشرة: ${analysis.advancedSkin.type}`);
      } else {
        skinInfo.push('نوع البشرة: غير محدد');
      }
      
      // حالة البشرة العامة
      if (analysis.advancedSkin.isDry || analysis.advancedSkin.dryness === 'جافة' || analysis.advancedSkin.dryness === 'قليلة الترطيب') {
        skinProblems.push('الجفاف');
        skinSolutions.push('استخدام مرطبات قوية للبشرة');
        skinSolutions.push('شرب الماء بكميات كافية (8-10 أكواب يومياً)');
        skinSolutions.push('تجنب المنتجات القاسية والكحولية');
        skinSolutions.push('استخدام مرطبات تحتوي على حمض الهيالورونيك');
        skinSolutions.push('استخدام قناع مرطب أسبوعياً');
      }
      
      if (analysis.advancedSkin.isOily || analysis.advancedSkin.oiliness === 'دهنية') {
        skinProblems.push('الدهنية');
        skinSolutions.push('استخدام منتجات خالية من الزيوت');
        skinSolutions.push('تنظيف البشرة مرتين يومياً بمنتج لطيف');
        skinSolutions.push('استخدام منتجات تقليل الزهم');
        skinSolutions.push('استخدام ورق التونر لامتصاص الزيوت الزائدة');
        skinSolutions.push('تجنب المنتجات الثقيلة والدهنية');
      }
      
      if (analysis.advancedSkin.isUnevenTexture || analysis.advancedSkin.textureEvenness === 'غير متساوي') {
        skinProblems.push('الملمس غير المتساوي');
        skinSolutions.push('تقشير البشرة أسبوعياً (1-2 مرات)');
        skinSolutions.push('استخدام منتجات تحتوي على أحماض ألفا هيدروكسي (AHA)');
        skinSolutions.push('ترطيب البشرة بانتظام');
        skinSolutions.push('استخدام منتجات تحتوي على ريتينول');
        skinSolutions.push('العلاج بالتقشير الكيميائي');
      }
      
      // إضافة معلومات إضافية
      if (analysis.advancedSkin.hydration) {
        skinInfo.push(`الترطيب: ${analysis.advancedSkin.hydration}`);
      }
      if (analysis.advancedSkin.sebum) {
        skinInfo.push(`الزهم: ${analysis.advancedSkin.sebum}`);
      }
      if (analysis.advancedSkin.texture) {
        skinInfo.push(`الملمس: ${analysis.advancedSkin.texture}`);
      }
      if (analysis.advancedSkin.pores) {
        skinInfo.push(`المسام: ${analysis.advancedSkin.pores}`);
      }
      
      // إضافة قسم البشرة دائماً (حتى لو لم تكن هناك مشاكل)
      recommendations.push({
        problem: 'البشرة',
        severity: skinProblems.length > 0 ? 'تحتاج عناية' : 'جيدة',
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: skinSolutions.length > 0 ? skinSolutions : [
          'المحافظة على نظام عناية يومي منتظم',
          'استخدام واقي الشمس SPF 50+ يومياً',
          'ترطيب البشرة بانتظام',
          'تنظيف البشرة مرتين يومياً'
        ],
        skinInfo: skinInfo,
        skinProblems: skinProblems
      });
    }
    
    if (!analysis.skinProblems) return recommendations;
    
    // حب الشباب
    if (analysis.skinProblems.acne && analysis.skinProblems.acne.active) {
      recommendations.push({
        problem: 'حب الشباب',
        severity: analysis.skinProblems.acne.severity || 'متوسط',
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: [
          'تنظيف البشرة مرتين يومياً بمنتج لطيف',
          'استخدام منتجات تحتوي على ساليسيليك أسيد أو بنزويل بيروكسايد',
          'تجنب لمس الوجه',
          'استخدام منتجات خالية من الزيوت',
          'تغيير أغطية الوسائد بانتظام',
          'استشارة طبيب جلدية للعلاجات الطبية إذا كانت الحالة شديدة'
        ]
      });
    }
    
    // التصبغات - تحليل شامل: البقع، فرط التصبغ، الكلف
    if (analysis.skinProblems.pigmentation && analysis.skinProblems.pigmentation.level !== 'لا يوجد') {
      const pigmentation = analysis.skinProblems.pigmentation;
      const problems = [];
      const solutions = [
        'استخدام واقي الشمس SPF 50+ يومياً',
        'استخدام منتجات تحتوي على فيتامين C أو نياسيناميد',
        'تجنب التعرض المباشر لأشعة الشمس',
        'استخدام منتجات تحتوي على أحماض ألفا هيدروكسي'
      ];
      
      if (pigmentation.types && pigmentation.types.length > 0) {
        problems.push(...pigmentation.types);
      } else {
        problems.push('البقع الداكنة');
      }
      
      // إضافة حلول خاصة للكلف
      if (pigmentation.melasma === 'موجود') {
        solutions.push('استخدام كريمات تفتيح تحتوي على هيدروكينون (بوصفة طبية)');
        solutions.push('العلاج بالليزر أو التقشير الكيميائي');
        solutions.push('تجنب الهرمونات التي قد تسبب الكلف');
      }
      
      // إضافة حلول خاصة لفرط التصبغ
      if (pigmentation.hyperpigmentation === 'موجود') {
        solutions.push('استخدام منتجات تحتوي على أزيليك أسيد');
        solutions.push('العلاج بالليزر للبقع الداكنة');
      }
      
      recommendations.push({
        problem: `التصبغات - ${problems.join(' و ')}`,
        severity: pigmentation.level,
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: solutions
      });
    }
    
    // التجاعيد - كل نوع في قسم منفصل مع صورة
    if (analysis.skinProblems && analysis.skinProblems.wrinkles) {
      const wrinkles = analysis.skinProblems.wrinkles;
      
      // خطوط الجبهة - قسم منفصل
      if (wrinkles.forehead && wrinkles.forehead > 0) {
        const severity = wrinkles.forehead > 5 ? 'عالي' : wrinkles.forehead > 2 ? 'متوسط' : 'خفيف';
        recommendations.push({
          problem: 'خطوط الجبهة',
          severity: severity,
          thumbnail: analysis.regions?.forehead?.thumbnail || analysis.regions?.skin?.thumbnail || analysis.originalImage,
          solutions: [
            'استخدام كريمات مضادة للشيخوخة تحتوي على ريتينول',
            'استخدام واقي الشمس SPF 50+ يومياً',
            'العلاج بالبوتوكس للخطوط الديناميكية في الجبهة',
            'ترطيب البشرة بانتظام',
            'تجنب التعرض المباشر لأشعة الشمس',
            'استخدام كريمات تحتوي على ببتيدات'
          ],
          count: wrinkles.forehead
        });
      }
      
      // Crow's feet (خطوط العين) - قسم منفصل
      if (wrinkles.crowFeet && wrinkles.crowFeet > 0) {
        const severity = wrinkles.crowFeet > 5 ? 'عالي' : wrinkles.crowFeet > 2 ? 'متوسط' : 'خفيف';
        recommendations.push({
          problem: 'خطوط العين - Crow\'s feet',
          severity: severity,
          thumbnail: analysis.regions?.eyes?.thumbnail || analysis.originalImage,
          solutions: [
            'العلاج بالبوتوكس حول العين',
            'استخدام كريمات خاصة بمنطقة العين',
            'استخدام واقي الشمس حول العين',
            'ترطيب منطقة العين بانتظام',
            'تجنب فرك العينين',
            'استخدام منتجات تحتوي على فيتامين C'
          ],
          count: wrinkles.crowFeet
        });
      }
      
      // خطوط الابتسامة (Nasolabial) - قسم منفصل
      if (wrinkles.smileLines && wrinkles.smileLines > 0) {
        const severity = wrinkles.smileLines > 5 ? 'عالي' : wrinkles.smileLines > 2 ? 'متوسط' : 'خفيف';
        recommendations.push({
          problem: 'خطوط الابتسامة',
          severity: severity,
          thumbnail: analysis.regions?.smileLines?.thumbnail || analysis.regions?.mouth?.thumbnail || analysis.originalImage,
          solutions: [
            'استخدام فيلر للخطوط الثابتة',
            'العلاج بالبوتوكس للخطوط الديناميكية',
            'ترطيب البشرة بانتظام',
            'استخدام كريمات مضادة للشيخوخة',
            'تجنب التدخين',
            'العلاج بالليزر أو التقشير الكيميائي'
          ],
          count: wrinkles.smileLines
        });
      }
      
      // الخطوط الدقيقة حول الفم (Marionette) - قسم منفصل
      if (wrinkles.fineLinesAroundMouth && wrinkles.fineLinesAroundMouth > 0) {
        const severity = wrinkles.fineLinesAroundMouth > 5 ? 'عالي' : wrinkles.fineLinesAroundMouth > 2 ? 'متوسط' : 'خفيف';
        recommendations.push({
          problem: 'الخطوط الدقيقة حول الفم',
          severity: severity,
          thumbnail: analysis.regions?.mouth?.thumbnail || analysis.originalImage,
          solutions: [
            'ترطيب منطقة الفم بانتظام',
            'استخدام فيلر للشفاه والمنطقة حول الفم',
            'استخدام كريمات مضادة للشيخوخة',
            'تجنب لعق الشفاه',
            'شرب الماء بكميات كافية',
            'العلاج بالبوتوكس للخطوط الديناميكية'
          ],
          count: wrinkles.fineLinesAroundMouth
        });
      }
    } else if (analysis.wrinkles && (analysis.wrinkles.severity === 'عالي' || analysis.wrinkles.severity === 'متوسط')) {
      // Fallback للبيانات القديمة
      recommendations.push({
        problem: 'التجاعيد',
        severity: analysis.wrinkles.severity,
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: [
          'استخدام كريمات مضادة للشيخوخة تحتوي على ريتينول',
          'استخدام واقي الشمس SPF 50+ يومياً',
          'ترطيب البشرة بانتظام',
          'تجنب التدخين والتعرض للشمس',
          'العلاج بالبوتوكس للخطوط الديناميكية',
          'استخدام فيلر للخطوط الثابتة',
          'العلاج بالليزر أو التقشير الكيميائي'
        ]
      });
    }
    
    // الترهل - تحليل شامل: المناطق المترهلة، قلة المرونة
    if (analysis.skinProblems && analysis.skinProblems.sagging) {
      const sagging = analysis.skinProblems.sagging;
      const problems = [];
      const solutions = [
        'تمارين وجهية يومية',
        'استخدام منتجات تحتوي على ببتيدات وكولاجين',
        'استخدام أجهزة شد الوجه المنزلية'
      ];
      
      if (sagging.hasLooseSkin) {
        problems.push('جلد مترهل');
      }
      
      if (sagging.reducedElasticity) {
        problems.push('قلة المرونة');
      }
      
      if (sagging.areas) {
        if (sagging.areas.cheeks === 'مترهل') {
          problems.push('ترهل الخدود');
          solutions.push('العلاج بالفيلر للخدود');
        }
        if (sagging.areas.jawline === 'مترهل') {
          problems.push('ترهل خط الفك');
          solutions.push('العلاج بالخيوط (Thread Lift)');
        }
        if (sagging.areas.underEyes === 'مترهل') {
          problems.push('ترهل تحت العينين');
          solutions.push('العلاج بالفيلر تحت العين');
        }
      }
      
      if (problems.length > 0 || sagging.severity === 'عالي' || sagging.severity === 'متوسط') {
        recommendations.push({
          problem: `الترهل - ${problems.length > 0 ? problems.join(' و ') : 'ترهل الجلد'}`,
          severity: sagging.severity || 'متوسط',
          thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
          solutions: [
            ...solutions,
            'العلاج بالليزر أو الموجات الراديوية',
            'شد الوجه الجراحي في الحالات المتقدمة'
          ]
        });
      }
    } else if (analysis.sagging && (analysis.sagging.severity === 'عالي' || analysis.sagging.severity === 'متوسط')) {
      recommendations.push({
        problem: 'الترهل',
        severity: analysis.sagging.severity,
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: [
          'تمارين وجهية يومية',
          'استخدام منتجات تحتوي على ببتيدات وكولاجين',
          'العلاج بالخيوط (Thread Lift)',
          'العلاج بالليزر أو الموجات الراديوية',
          'شد الوجه الجراحي في الحالات المتقدمة',
          'استخدام أجهزة شد الوجه المنزلية'
        ]
      });
    }
    
    
    return recommendations;
  };

  generateRecommendations = (analysis) => {
    const recommendations = [];
    
    // توصيات بناءً على العمر
    if (analysis.age > 40) {
      recommendations.push("استخدام منتجات مضادة للشيخوخة");
      recommendations.push("ترطيب البشرة يومياً");
    }
    
    // توصيات بناءً على التحليل المتقدم للجلد
    if (analysis.advancedSkin) {
      if (analysis.advancedSkin.hydration === 'جاف') {
        recommendations.push("استخدام مرطبات قوية للبشرة");
        recommendations.push("شرب الماء بكميات كافية يومياً");
      }
      
      if (analysis.advancedSkin.type === 'دهنية') {
        recommendations.push("استخدام منتجات خالية من الزيوت");
        recommendations.push("تنظيف البشرة مرتين يومياً");
      }
      
      if (analysis.advancedSkin.poresScore > 60) {
        recommendations.push("تقشير البشرة أسبوعياً");
        recommendations.push("استخدام منتجات لتقليص المسام");
      }
    }
    
    // توصيات بناءً على المشاكل الجلدية
    if (analysis.skinProblems) {
      if (analysis.skinProblems.acne && analysis.skinProblems.acne.active) {
        recommendations.push("استخدام منتجات مضادة لحب الشباب");
        recommendations.push("تجنب لمس الوجه");
      }
      
      if (analysis.skinProblems.pigmentation && analysis.skinProblems.pigmentation.level !== 'لا يوجد') {
        recommendations.push("استخدام واقي الشمس SPF 50+ يومياً");
        recommendations.push("تجنب التعرض المباشر لأشعة الشمس");
      }
      
      if (analysis.skinProblems.darkCircles && analysis.skinProblems.darkCircles.present) {
        recommendations.push("النوم لفترات كافية");
        recommendations.push("استخدام كريمات خاصة بالهالات السوداء");
      }
    }
    
    // توصيات بناءً على التجاعيد
    if (analysis.wrinkles && analysis.wrinkles.severity === 'عالي') {
      recommendations.push("استخدام كريمات تحتوي على ريتينول");
      recommendations.push("واقي الشمس SPF 50+ يومياً");
    } else if (analysis.wrinkles && analysis.wrinkles.severity === 'متوسط') {
      recommendations.push("ترطيب البشرة بانتظام");
      recommendations.push("استخدام واقي الشمس");
    }
    
    // توصيات بناءً على الترهل
    if (analysis.sagging && analysis.sagging.severity === 'عالي') {
      recommendations.push("تمارين وجهية يومية");
      recommendations.push("استخدام منتجات رفع وتقوية البشرة");
    }
    
    // توصيات بناءً على نسب الوجه
    if (analysis.facialProportions && analysis.facialProportions.symmetry < 85) {
      recommendations.push("مراجعة أخصائي لتحسين التناسق الوجهي");
    }
    
    // توصيات بناءً على الحواجب
    if (analysis.eyebrows && analysis.eyebrows.needsCorrection) {
      recommendations.push("تصحيح شكل الحواجب لتحسين التناسق");
    }
    
    // توصيات بناءً على الفم
    if (analysis.mouth && analysis.mouth.needsFiller) {
      // لا نضيف التوصية هنا لأنها موجودة في العلاجات المقترحة
    }
    
    if (recommendations.length === 0) {
      recommendations.push("المحافظة على نظام عناية يومي منتظم");
      recommendations.push("شرب الماء بكميات كافية");
      recommendations.push("استخدام واقي الشمس");
    }
    
    return recommendations;
  };

  getSeverityBadgeType = (severity) => {
    if (severity === 'عالي' || severity === 'واضح') return 'danger';
    if (severity === 'متوسط') return 'warning';
    return 'success';
  };

  render() {
    const { analysis, aiAnalysis } = this.state;

    return (
      <SkinAnalysisContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🔬 تحليل البشرة بالذكاء الاصطناعي</h1>
        </Header>

        {/* إخفاء قسم تحليل الوجه بعد اكتمال التحليل */}
        {!aiAnalysis && (
          <AnalysisCard style={{ marginTop: '0.2rem', padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <SectionTitle style={{ color: 'white', margin: 0 }}>📷 تحليل الوجه</SectionTitle>
            </div>
            <SoYoungFaceAnalysis 
              onAnalysisComplete={this.handleAnalysisComplete}
              onModelsLoaded={() => console.log('SoYoung models loaded')}
            />
          </AnalysisCard>
        )}

        {aiAnalysis && (
        <AnalysisCard>
            <SectionTitle>📊 نتائج التحليل</SectionTitle>
          
          {/* 1. شكل الوجه - أول شيء */}
          {aiAnalysis.facialProportions && (
            <>
              <SectionTitle style={{ marginTop: '0.2rem' }}>👤 شكل الوجه</SectionTitle>
              
              <AnalysisItem>
                <div className="item-label">شكل الوجه</div>
                <div className="item-value" style={{ fontSize: '0.22rem', fontWeight: 700, color: '#667eea' }}>
                  {aiAnalysis.facialProportions.faceShape}
                </div>
              </AnalysisItem>
            </>
          )}

          {/* 2. تحليل الشخصية والانطباع */}
          {aiAnalysis.facialProportions && aiAnalysis.facialProportions.personalityAnalysis && (
            <>
              <SectionTitle style={{ marginTop: '0.2rem' }}>🧠 تحليل الشخصية والانطباع</SectionTitle>
              
              {aiAnalysis.facialProportions.personalityAnalysis.faceShapeDescription && (
                <AnalysisItem>
                  <div className="item-label">شكل الوجه</div>
                  <div className="item-description" style={{ 
                    fontSize: '0.16rem', 
                    lineHeight: '1.6',
                    color: '#4a5568',
                    marginTop: '0.08rem'
                  }}>
                    {aiAnalysis.facialProportions.personalityAnalysis.faceShapeDescription}
                  </div>
                </AnalysisItem>
              )}

              {aiAnalysis.facialProportions.personalityAnalysis.ageAppearance && (
                <AnalysisItem>
                  <div className="item-label">مظهر العمر</div>
                  <div className="item-description" style={{ 
                    fontSize: '0.16rem', 
                    lineHeight: '1.6',
                    color: '#4a5568',
                    marginTop: '0.08rem'
                  }}>
                    {aiAnalysis.facialProportions.personalityAnalysis.ageAppearance}
                  </div>
                </AnalysisItem>
              )}

              {aiAnalysis.facialProportions.personalityAnalysis.intelligence && (
                <AnalysisItem>
                  <div className="item-label">الذكاء</div>
                  <div className="item-description" style={{ 
                    fontSize: '0.16rem', 
                    lineHeight: '1.6',
                    color: '#4a5568',
                    marginTop: '0.08rem'
                  }}>
                    {aiAnalysis.facialProportions.personalityAnalysis.intelligence}
                  </div>
                </AnalysisItem>
              )}

              {aiAnalysis.facialProportions.personalityAnalysis.distance && (
                <AnalysisItem>
                  <div className="item-label">المسافة والانطباع</div>
                  <div className="item-description" style={{ 
                    fontSize: '0.16rem', 
                    lineHeight: '1.6',
                    color: '#4a5568',
                    marginTop: '0.08rem'
                  }}>
                    {aiAnalysis.facialProportions.personalityAnalysis.distance}
                  </div>
                </AnalysisItem>
              )}
            </>
          )}

          {/* 3. العمر المتوقع للبشرة */}
          {aiAnalysis.ageAppearanceAnalysis && (
            <>
              <SectionTitle style={{ marginTop: '0.2rem' }}>⏰ العمر المتوقع للبشرة</SectionTitle>
              
              <AnalysisItem>
                <div className="item-label">العمر المتوقع</div>
                <div className="item-value">
                  {aiAnalysis.ageAppearanceAnalysis.apparentAge} سنة
                  {aiAnalysis.ageAppearanceAnalysis.isOlder && (
                    <Badge type="warning" style={{ marginRight: '0.05rem' }}>
                      أكبر بـ {Math.abs(aiAnalysis.ageAppearanceAnalysis.ageDifference)} سنة
                    </Badge>
                  )}
                  {aiAnalysis.ageAppearanceAnalysis.isYounger && (
                    <Badge type="success" style={{ marginRight: '0.05rem' }}>
                      أصغر بـ {Math.abs(aiAnalysis.ageAppearanceAnalysis.ageDifference)} سنة
                    </Badge>
                  )}
                </div>
                <div className="item-description" style={{ 
                  fontSize: '0.16rem', 
                  lineHeight: '1.6',
                  color: '#4a5568',
                  marginTop: '0.08rem'
                }}>
                  {aiAnalysis.ageAppearanceAnalysis.description}
                </div>
              </AnalysisItem>
            </>
          )}


          {/* 4. المشاكل الجلدية مع الصور المصغرة والتوصيات */}
          {aiAnalysis.problemRecommendations && aiAnalysis.problemRecommendations.length > 0 && (
            <>
              <SectionTitle style={{ marginTop: '0.2rem' }}>⚠️ المشاكل المكتشفة</SectionTitle>
              
              {aiAnalysis.problemRecommendations.map((item, index) => {
                // تخطي الحالات الممتازة - لا نعرضها
                if (item.isExcellent) return null;
                
                return (
                  <AnalysisItem key={index} style={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.15rem',
                    padding: '0.2rem',
                    marginBottom: '0.2rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'flex-start' }}>
                      {/* صورة مصغرة */}
                      {item.thumbnail && (
                        <div style={{
                          width: '1.2rem',
                          height: '1.2rem',
                          borderRadius: '0.1rem',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '2px solid rgba(102, 126, 234, 0.2)',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          <img 
                            src={item.thumbnail} 
                            alt={item.region || item.problem}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      )}
                      
                      {/* قائمة المشاكل المرقمة */}
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: '0.2rem', 
                          fontWeight: 700,
                          color: '#1a202c',
                          marginBottom: '0.12rem'
                        }}>
                          {item.region || item.problem}:
                        </div>
                        <div style={{
                          paddingRight: '0.15rem'
                        }}>
                          {item.problems && item.problems.map((problem, pIndex) => (
                            <div key={pIndex} style={{
                              fontSize: '0.17rem',
                              color: '#4a5568',
                              marginBottom: '0.08rem',
                              lineHeight: '1.6'
                            }}>
                              {pIndex + 1}. {problem}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnalysisItem>
                );
              })}
            </>
          )}
        </AnalysisCard>
        )}

        {!aiAnalysis && (
          <AnalysisCard>
            <div style={{ textAlign: 'center', padding: '0.2rem', color: '#718096', fontSize: '0.16rem' }}>
              📸 قم بالتقاط صورة لوجهك لبدء التحليل بالذكاء الاصطناعي
            </div>
          </AnalysisCard>
        )}

        <BottomNav />
      </SkinAnalysisContainer>
    );
  }
}

export default SkinAnalysis;

