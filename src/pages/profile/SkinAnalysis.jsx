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
    
    // توصيات بناءً على التجاعيد
    if (analysis.wrinkles.severity === 'عالي') {
      recommendations.push("استخدام كريمات تحتوي على ريتينول");
      recommendations.push("واقي الشمس SPF 50+ يومياً");
      recommendations.push("تجنب التعرض المباشر لأشعة الشمس");
    } else if (analysis.wrinkles.severity === 'متوسط') {
      recommendations.push("ترطيب البشرة بانتظام");
      recommendations.push("استخدام واقي الشمس");
    }
    
    // توصيات بناءً على الترهل
    if (analysis.sagging.severity === 'عالي') {
      recommendations.push("تمارين وجهية يومية");
      recommendations.push("استخدام منتجات رفع وتقوية البشرة");
    }
    
    // توصيات بناءً على نوع البشرة
    if (analysis.skinType.type.includes('فاتحة')) {
      recommendations.push("استخدام واقي شمس قوي");
      recommendations.push("حماية إضافية من أشعة الشمس");
    }
    
    // توصيات بناءً على الحواجب
    if (analysis.eyebrows && analysis.eyebrows.needsCorrection) {
      recommendations.push("تصحيح شكل الحواجب لتحسين التناسق");
    }
    
    // توصيات بناءً على الفم
    if (analysis.mouth && analysis.mouth.needsFiller) {
      recommendations.push(analysis.mouth.recommendation || "استخدام فيلر للشفاه");
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

            <AnalysisItem>
              <div className="item-label">التوصيات</div>
              <div style={{ marginTop: '0.08rem' }}>
                {aiAnalysis.recommendations.map((rec, index) => (
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

