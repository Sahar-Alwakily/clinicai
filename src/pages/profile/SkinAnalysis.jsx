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
        // Extract regions map
        results.regions.forEach(region => {
          if (region.thumbnail) {
            regions[region.id] = {
              thumbnail: region.thumbnail,
              region: region.region
            };
          }
        });
      }
      
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
        
        // Store regions for thumbnails
        regions: regions,
        originalImage: originalImage,
        
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
    if (analysis.advancedSkin && analysis.advancedSkin.hydration === 'طبيعي' || analysis.advancedSkin.hydration === 'جيد') {
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

  // توليد توصيات لكل مشكلة مع صور مصغرة
  generateProblemRecommendations = (analysis) => {
    const recommendations = [];
    
    if (!analysis.skinProblems) return recommendations;
    
    // الهالات السوداء والتجويف
    if (analysis.skinProblems.darkCircles && analysis.skinProblems.darkCircles.present) {
      const darkCirclesSeverity = analysis.skinProblems.darkCircles.severity || 'متوسط';
      const solutions = [
        'استخدام كريمات تحتوي على فيتامين C وريتينول',
        'الحصول على قسط كافٍ من النوم (7-8 ساعات)',
        'استخدام كريمات مرطبة خاصة بمنطقة تحت العين',
        'تجنب فرك العينين',
        'استخدام واقي الشمس يومياً'
      ];
      
      // إضافة حلول إضافية حسب الشدة
      if (darkCirclesSeverity === 'شديد' || darkCirclesSeverity === 'واضح') {
        solutions.push('العلاج بالليزر أو الفيلر تحت العين');
        solutions.push('العلاج بالبوتوكس للخطوط حول العين');
        solutions.push('استخدام كريمات تحتوي على كافيين');
      }
      
      recommendations.push({
        problem: 'الهالات السوداء والتجويف',
        severity: darkCirclesSeverity,
        thumbnail: analysis.regions?.underEyes?.thumbnail || analysis.regions?.eyes?.thumbnail || analysis.originalImage,
        solutions: solutions
      });
    }
    
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
    
    // التصبغات
    if (analysis.skinProblems.pigmentation && analysis.skinProblems.pigmentation.level !== 'لا يوجد') {
      recommendations.push({
        problem: 'التصبغات والبقع الداكنة',
        severity: analysis.skinProblems.pigmentation.level,
        thumbnail: analysis.regions?.skin?.thumbnail || analysis.originalImage,
        solutions: [
          'استخدام واقي الشمس SPF 50+ يومياً',
          'استخدام منتجات تحتوي على فيتامين C أو نياسيناميد',
          'تجنب التعرض المباشر لأشعة الشمس',
          'استخدام كريمات تفتيح تحتوي على هيدروكينون (بوصفة طبية)',
          'العلاج بالليزر أو التقشير الكيميائي',
          'استخدام منتجات تحتوي على أحماض ألفا هيدروكسي'
        ]
      });
    }
    
    // التجاعيد
    if (analysis.wrinkles && (analysis.wrinkles.severity === 'عالي' || analysis.wrinkles.severity === 'متوسط')) {
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
    
    // الترهل
    if (analysis.sagging && analysis.sagging.severity === 'عالي') {
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

        <AnalysisCard style={{ marginTop: '0.2rem', padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <SectionTitle style={{ color: 'white', margin: 0 }}>📷 تحليل الوجه</SectionTitle>
          </div>
          <SoYoungFaceAnalysis 
            onAnalysisComplete={this.handleAnalysisComplete}
            onModelsLoaded={() => console.log('SoYoung models loaded')}
          />
        </AnalysisCard>

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
              <SectionTitle style={{ marginTop: '0.2rem' }}>⚠️ للمشاكل الوجه نوصي الحلول</SectionTitle>
              
              {aiAnalysis.problemRecommendations.map((problem, index) => (
                <AnalysisItem key={index} style={{ 
                  background: 'rgba(255, 243, 205, 0.3)',
                  borderRadius: '0.1rem',
                  padding: '0.15rem',
                  marginBottom: '0.15rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'flex-start' }}>
                    {/* صورة مصغرة */}
                    {problem.thumbnail && (
                      <div style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '0.08rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '2px solid #667eea'
                      }}>
                        <img 
                          src={problem.thumbnail} 
                          alt={problem.problem}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}
                    
                    {/* معلومات المشكلة والحلول */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', marginBottom: '0.08rem' }}>
                        <div className="item-label" style={{ margin: 0, fontSize: '0.18rem', fontWeight: 700 }}>
                          {problem.problem}
                        </div>
                        <Badge type={problem.severity === 'شديد' || problem.severity === 'عالي' ? 'danger' : 'warning'}>
                          {problem.severity}
                        </Badge>
                      </div>
                      
                      {/* الحلول */}
                      <div style={{ marginTop: '0.1rem' }}>
                        <div style={{ 
                          fontSize: '0.15rem', 
                          fontWeight: 600, 
                          color: '#667eea',
                          marginBottom: '0.08rem'
                        }}>
                          الحلول المقترحة:
                        </div>
                        <div style={{ 
                          padding: '0.1rem',
                          background: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '0.08rem',
                          fontSize: '0.14rem',
                          lineHeight: '1.6'
                        }}>
                          {problem.solutions.map((solution, solIndex) => (
                            <div key={solIndex} style={{ marginBottom: '0.05rem', color: '#4a5568' }}>
                              • {solution}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnalysisItem>
              ))}
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

