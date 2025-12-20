import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";
import FaceAnalysis from "../../components/FaceAnalysis/FaceAnalysis";

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

  handleAnalysisComplete = (aiAnalysis) => {
    const recommendations = this.generateRecommendations(aiAnalysis);
    
    this.setState({
      aiAnalysis: {
        ...aiAnalysis,
        recommendations,
        lastUpdate: new Date().toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    });
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

        <AnalysisCard style={{ marginTop: '0.2rem' }}>
          <SectionTitle>📷 تحليل الوجه</SectionTitle>
          <FaceAnalysis onAnalysisComplete={this.handleAnalysisComplete} />
        </AnalysisCard>

        {aiAnalysis && (
          <AnalysisCard>
            <SectionTitle>📊 نتائج التحليل</SectionTitle>
            
            <AnalysisItem>
              <div className="item-label">العمر المتوقع</div>
              <div className="item-value">
                {aiAnalysis.age} سنة
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.05rem 0.1rem',
                  borderRadius: '0.1rem',
                  fontSize: '0.14rem',
                  fontWeight: 500,
                  background: '#e3f2fd', 
                  color: '#1565c0', 
                  marginRight: '0.05rem' 
                }}>
                  {aiAnalysis.gender}
                </span>
              </div>
            </AnalysisItem>

            <AnalysisItem>
              <div className="item-label">نوع البشرة</div>
              <div className="item-value">
                {aiAnalysis.skinType.type}
                {aiAnalysis.skinType.confidence > 0 && (
                  <span style={{ fontSize: '0.14rem', color: '#718096', marginRight: '0.05rem' }}>
                    ({aiAnalysis.skinType.confidence}% دقة)
                  </span>
                )}
              </div>
            </AnalysisItem>

            <AnalysisItem>
              <div className="item-label">التجاعيد</div>
              <div className="item-value">
                <Badge type={this.getSeverityBadgeType(aiAnalysis.wrinkles.severity)}>
                  {aiAnalysis.wrinkles.severity}
                </Badge>
              </div>
              <ScoreBar score={aiAnalysis.wrinkles.score}>
                <div className="score-fill" />
                <div className="score-text">{aiAnalysis.wrinkles.score}%</div>
              </ScoreBar>
              <div className="item-description">
                الجبهة: {aiAnalysis.wrinkles.forehead} | العينان: {aiAnalysis.wrinkles.eyes} | حول الفم: {aiAnalysis.wrinkles.mouth}
              </div>
            </AnalysisItem>

            <AnalysisItem>
              <div className="item-label">الترهل</div>
              <div className="item-value">
                <Badge type={this.getSeverityBadgeType(aiAnalysis.sagging.severity)}>
                  {aiAnalysis.sagging.severity}
                </Badge>
              </div>
              <ScoreBar score={aiAnalysis.sagging.score}>
                <div className="score-fill" />
                <div className="score-text">{aiAnalysis.sagging.score}%</div>
              </ScoreBar>
            </AnalysisItem>

            <AnalysisItem>
              <div className="item-label">خطوط الوجه</div>
              <div className="item-value">
                <Badge type={this.getSeverityBadgeType(aiAnalysis.facialLines.severity)}>
                  {aiAnalysis.facialLines.severity}
                </Badge>
              </div>
              <div className="item-description">
                خطوط الأنف-الشفاه: {aiAnalysis.facialLines.nasolabial} | 
                خطوط ماريونيت: {aiAnalysis.facialLines.marionette} | 
                خطوط الجبهة: {aiAnalysis.facialLines.forehead}
              </div>
            </AnalysisItem>

            {aiAnalysis.eyebrows && (
              <AnalysisItem>
                <div className="item-label">الحواجب</div>
                <div className="item-value">
                  <Badge type={aiAnalysis.eyebrows.needsCorrection ? 'warning' : 'success'}>
                    {aiAnalysis.eyebrows.symmetry}
                  </Badge>
                  {aiAnalysis.eyebrows.needsCorrection && (
                    <Badge type="danger" style={{ marginRight: '0.05rem' }}>
                      تحتاج تصحيح
                    </Badge>
                  )}
                </div>
                <div className="item-description">
                  الفرق في الارتفاع: {aiAnalysis.eyebrows.heightDifference}% | 
                  النتيجة: {aiAnalysis.eyebrows.score}/100
                </div>
              </AnalysisItem>
            )}

            {aiAnalysis.mouth && (
              <AnalysisItem>
                <div className="item-label">الفم</div>
                <div className="item-value">
                  الحجم: {aiAnalysis.mouth.size}
                  {aiAnalysis.mouth.needsFiller && (
                    <Badge type="warning" style={{ marginRight: '0.05rem' }}>
                      يحتاج فيلر
                    </Badge>
                  )}
                </div>
                <div className="item-description">
                  العرض: {aiAnalysis.mouth.width} | 
                  الارتفاع: {aiAnalysis.mouth.height} | 
                  السماكة: {aiAnalysis.mouth.thickness}
                  {aiAnalysis.mouth.recommendation && (
                    <div style={{ marginTop: '0.05rem', color: '#c62828', fontWeight: 500 }}>
                      💡 {aiAnalysis.mouth.recommendation}
                    </div>
                  )}
                </div>
              </AnalysisItem>
            )}

            {/* التحليلات المتقدمة للجلد */}
            {aiAnalysis.advancedSkin && (
              <>
                <SectionTitle style={{ marginTop: '0.2rem' }}>🔬 تحليل الجلد المتقدم</SectionTitle>
                
                <AnalysisItem>
                  <div className="item-label">نوع البشرة</div>
                  <div className="item-value">{aiAnalysis.advancedSkin.type}</div>
                  <div className="item-description">
                    الترطيب: {aiAnalysis.advancedSkin.hydration} | 
                    الزهم: {aiAnalysis.advancedSkin.sebum} | 
                    الملمس: {aiAnalysis.advancedSkin.texture} | 
                    المسام: {aiAnalysis.advancedSkin.pores}
                  </div>
                </AnalysisItem>
              </>
            )}

            {/* المشاكل الجلدية */}
            {aiAnalysis.skinProblems && (
              <>
                <SectionTitle style={{ marginTop: '0.2rem' }}>⚠️ المشاكل الجلدية</SectionTitle>
                
                {aiAnalysis.skinProblems.acne && (
                  <AnalysisItem>
                    <div className="item-label">حب الشباب</div>
                    <div className="item-value">
                      {aiAnalysis.skinProblems.acne.active ? (
                        <>
                          <Badge type="danger">نشط</Badge>
                          <Badge type={aiAnalysis.skinProblems.acne.severity === 'شديد' ? 'danger' : aiAnalysis.skinProblems.acne.severity === 'متوسط' ? 'warning' : 'success'} style={{ marginRight: '0.05rem' }}>
                            {aiAnalysis.skinProblems.acne.severity}
                          </Badge>
                        </>
                      ) : aiAnalysis.skinProblems.acne.scars ? (
                        <Badge type="warning">آثار</Badge>
                      ) : (
                        <Badge type="success">لا يوجد</Badge>
                      )}
                    </div>
                    {aiAnalysis.skinProblems.acne.active && (
                      <>
                        {aiAnalysis.skinProblems.acne.types && aiAnalysis.skinProblems.acne.types.length > 0 && (
                          <div className="item-description">
                            الأنواع: {aiAnalysis.skinProblems.acne.types.join('، ')}
                          </div>
                        )}
                        {aiAnalysis.skinProblems.acne.location && (
                          <div className="item-description">
                            المواقع: 
                            {aiAnalysis.skinProblems.acne.location.tzone && aiAnalysis.skinProblems.acne.location.tzone.present && (
                              <span> T-zone ({aiAnalysis.skinProblems.acne.location.tzone.count})</span>
                            )}
                            {aiAnalysis.skinProblems.acne.location.cheeks && aiAnalysis.skinProblems.acne.location.cheeks.present && (
                              <span> الخدود ({aiAnalysis.skinProblems.acne.location.cheeks.count})</span>
                            )}
                          </div>
                        )}
                        {aiAnalysis.skinProblems.acne.totalSpots && (
                          <div className="item-description">
                            العدد الإجمالي: {aiAnalysis.skinProblems.acne.totalSpots} بقعة
                          </div>
                        )}
                      </>
                    )}
                  </AnalysisItem>
                )}

                {/* التحليل الطبي لحب الشباب */}
                {aiAnalysis.skinProblems.medicalAcne && aiAnalysis.skinProblems.medicalAcne.types && aiAnalysis.skinProblems.medicalAcne.types.length > 0 && (
                  <AnalysisItem>
                    <div className="item-label">التشخيص الطبي</div>
                    <div style={{ marginTop: '0.08rem' }}>
                      {aiAnalysis.skinProblems.medicalAcne.types.map((type, index) => (
                        <div key={index} className="item-description" style={{ marginBottom: '0.08rem' }}>
                          <strong>{type.arabicName}</strong> ({type.name})
                          <div style={{ fontSize: '0.14rem', color: '#718096', marginTop: '0.03rem' }}>
                            {type.description}
                          </div>
                          {type.severity && (
                            <Badge type={type.severity === 'شديد' ? 'danger' : type.severity === 'متوسط' ? 'warning' : 'success'} style={{ marginTop: '0.03rem' }}>
                              {type.severity}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    {aiAnalysis.skinProblems.medicalAcne.recommendations && aiAnalysis.skinProblems.medicalAcne.recommendations.length > 0 && (
                      <div className="item-description" style={{ marginTop: '0.1rem', padding: '0.1rem', background: '#fff3cd', borderRadius: '0.05rem' }}>
                        <strong>التوصيات الطبية:</strong>
                        {aiAnalysis.skinProblems.medicalAcne.recommendations.map((rec, index) => (
                          <div key={index} style={{ marginTop: '0.05rem' }}>• {rec}</div>
                        ))}
                      </div>
                    )}
                  </AnalysisItem>
                )}

                {aiAnalysis.skinProblems.pigmentation && (
                  <AnalysisItem>
                    <div className="item-label">التصبغات</div>
                    <div className="item-value">
                      <Badge type={aiAnalysis.skinProblems.pigmentation.level === 'لا يوجد' ? 'success' : 'warning'}>
                        {aiAnalysis.skinProblems.pigmentation.level}
                      </Badge>
                    </div>
                    {aiAnalysis.skinProblems.pigmentation.types && aiAnalysis.skinProblems.pigmentation.types.length > 0 && (
                      <div className="item-description">
                        الأنواع: {aiAnalysis.skinProblems.pigmentation.types.join('، ')}
                      </div>
                    )}
                  </AnalysisItem>
                )}

                {aiAnalysis.skinProblems.darkCircles && (
                  <AnalysisItem>
                    <div className="item-label">الهالات السوداء</div>
                    <div className="item-value">
                      {aiAnalysis.skinProblems.darkCircles.present ? (
                        <Badge type="warning">موجودة ({aiAnalysis.skinProblems.darkCircles.severity})</Badge>
                      ) : (
                        <Badge type="success">غير موجودة</Badge>
                      )}
                    </div>
                  </AnalysisItem>
                )}

                {aiAnalysis.skinProblems.wrinkles && (
                  <AnalysisItem>
                    <div className="item-label">التجاعيد التفصيلية</div>
                    <div className="item-description">
                      الجبهة: {aiAnalysis.skinProblems.wrinkles.forehead} | 
                      العينان: {aiAnalysis.skinProblems.wrinkles.eyes} | 
                      الفم: {aiAnalysis.skinProblems.wrinkles.mouth} | 
                      المجموع: {aiAnalysis.skinProblems.wrinkles.total}
                    </div>
                  </AnalysisItem>
                )}
              </>
            )}

            {/* نسب الوجه */}
            {aiAnalysis.facialProportions && (
              <>
                <SectionTitle style={{ marginTop: '0.2rem' }}>📐 نسب الوجه</SectionTitle>
                
                <AnalysisItem>
                  <div className="item-label">التناسق</div>
                  <div className="item-value">{aiAnalysis.facialProportions.symmetry}%</div>
                  <ScoreBar score={aiAnalysis.facialProportions.symmetry}>
                    <div className="score-fill" />
                    <div className="score-text">{aiAnalysis.facialProportions.symmetry}%</div>
                  </ScoreBar>
                </AnalysisItem>

                <AnalysisItem>
                  <div className="item-label">النسبة الذهبية</div>
                  <div className="item-value">{aiAnalysis.facialProportions.goldenRatio}%</div>
                  <ScoreBar score={aiAnalysis.facialProportions.goldenRatio}>
                    <div className="score-fill" />
                    <div className="score-text">{aiAnalysis.facialProportions.goldenRatio}%</div>
                  </ScoreBar>
                </AnalysisItem>

                <AnalysisItem>
                  <div className="item-label">شكل الوجه</div>
                  <div className="item-value">{aiAnalysis.facialProportions.faceShape}</div>
                </AnalysisItem>
              </>
            )}

            {/* المناطق المحددة */}
            {aiAnalysis.specificRegions && (
              <>
                <SectionTitle style={{ marginTop: '0.2rem' }}>📍 المناطق المحددة</SectionTitle>
                
                {aiAnalysis.specificRegions.tzone && (
                  <AnalysisItem>
                    <div className="item-label">منطقة T-zone</div>
                    <div className="item-description">
                      الزهم: {aiAnalysis.specificRegions.tzone.sebum} | 
                      المسام: {aiAnalysis.specificRegions.tzone.pores} | 
                      الحالة: {aiAnalysis.specificRegions.tzone.condition}
                    </div>
                  </AnalysisItem>
                )}

                {aiAnalysis.specificRegions.underEyes && (
                  <AnalysisItem>
                    <div className="item-label">تحت العينين</div>
                    <div className="item-description">
                      الهالات: {aiAnalysis.specificRegions.underEyes.darkCircles} | 
                      التجاعيد: {aiAnalysis.specificRegions.underEyes.wrinkles} | 
                      الترطيب: {aiAnalysis.specificRegions.underEyes.hydration}
                    </div>
                  </AnalysisItem>
                )}

                {aiAnalysis.specificRegions.cheeks && (
                  <AnalysisItem>
                    <div className="item-label">الخدود</div>
                    <div className="item-description">
                      الملمس: {aiAnalysis.specificRegions.cheeks.texture} | 
                      الترطيب: {aiAnalysis.specificRegions.cheeks.hydration} | 
                      الحالة: {aiAnalysis.specificRegions.cheeks.condition}
                    </div>
                  </AnalysisItem>
                )}

                {aiAnalysis.specificRegions.lips && (
                  <AnalysisItem>
                    <div className="item-label">الشفاه</div>
                    <div className="item-description">
                      الحجم: {aiAnalysis.specificRegions.lips.size} | 
                      الحالة: {aiAnalysis.specificRegions.lips.condition}
                    </div>
                  </AnalysisItem>
                )}

                {aiAnalysis.specificRegions.neck && (
                  <AnalysisItem>
                    <div className="item-label">الرقبة</div>
                    <div className="item-description">
                      الوضوح: {aiAnalysis.specificRegions.neck.definition} | 
                      الحالة: {aiAnalysis.specificRegions.neck.condition}
                    </div>
                  </AnalysisItem>
                )}
              </>
            )}

            {/* العلاجات المقترحة */}
            {aiAnalysis.treatments && aiAnalysis.treatments.length > 0 && (
              <>
                <SectionTitle style={{ marginTop: '0.2rem' }}>💊 العلاجات المقترحة</SectionTitle>
                {aiAnalysis.treatments.map((treatment, index) => (
                  <AnalysisItem key={index}>
                    <div className="item-label">
                      {treatment.name}
                      <Badge 
                        type={treatment.priority === 'عالٍ' ? 'danger' : treatment.priority === 'متوسط' ? 'warning' : 'success'}
                        style={{ marginRight: '0.05rem' }}
                      >
                        {treatment.priority}
                      </Badge>
                    </div>
                    <div className="item-description">{treatment.description}</div>
                  </AnalysisItem>
                ))}
              </>
            )}

            <AnalysisItem>
              <div className="item-label">التوصيات العامة</div>
              <div style={{ marginTop: '0.08rem' }}>
                {aiAnalysis.recommendations && aiAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="item-description" style={{ marginBottom: '0.05rem' }}>
                    • {rec}
                  </div>
                ))}
              </div>
            </AnalysisItem>

            <AnalysisItem>
              <div className="item-label">تاريخ التحليل</div>
              <div className="item-value">{aiAnalysis.lastUpdate}</div>
            </AnalysisItem>
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

