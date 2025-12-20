import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

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

@withRouter
class SkinAnalysis extends Component {
  state = {
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

  render() {
    const { analysis } = this.state;

    return (
      <SkinAnalysisContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🔬 تحليل البشرة</h1>
        </Header>

        <AnalysisCard>
          <AnalysisItem>
            <div className="item-label">نوع البشرة</div>
            <div className="item-value">{analysis.skinType}</div>
          </AnalysisItem>
          
          <AnalysisItem>
            <div className="item-label">المشاكل</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.08rem', marginTop: '0.05rem' }}>
              {analysis.concerns.map((concern, index) => (
                <span
                  key={index}
                  style={{
                    background: '#ffebee',
                    color: '#c62828',
                    padding: '0.05rem 0.1rem',
                    borderRadius: '0.1rem',
                    fontSize: '0.14rem',
                    fontWeight: 500
                  }}
                >
                  {concern}
                </span>
              ))}
            </div>
          </AnalysisItem>
          
          <AnalysisItem>
            <div className="item-label">التوصيات</div>
            <div style={{ marginTop: '0.08rem' }}>
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="item-description" style={{ marginBottom: '0.05rem' }}>
                  • {rec}
                </div>
              ))}
            </div>
          </AnalysisItem>
          
          <AnalysisItem>
            <div className="item-label">آخر تحديث</div>
            <div className="item-value">{analysis.lastUpdate}</div>
          </AnalysisItem>
        </AnalysisCard>

        <BottomNav />
      </SkinAnalysisContainer>
    );
  }
}

export default SkinAnalysis;

