import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const MedicalHistoryContainer = styled.div`
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

const ContentSection = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const HistoryItem = styled.div`
  padding: 0.15rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .item-title {
    font-size: 0.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.05rem;
  }
  
  .item-date {
    font-size: 0.16rem;
    color: #718096;
  }
  
  .item-description {
    font-size: 0.18rem;
    color: #4a5568;
    margin-top: 0.08rem;
    line-height: 1.5;
  }
`;

@withRouter
class MedicalHistory extends Component {
  state = {
    history: [
      {
        id: 1,
        title: "بوتوكس الجبهة",
        date: "15 نوفمبر 2024",
        description: "تم إجراء حقن البوتوكس في منطقة الجبهة بنجاح. النتائج ممتازة."
      },
      {
        id: 2,
        title: "فيلر الشفاه",
        date: "20 أكتوبر 2024",
        description: "حقن الفيلر في الشفاه. النتيجة طبيعية وجميلة."
      },
      {
        id: 3,
        title: "ليزر إزالة الشعر",
        date: "5 سبتمبر 2024",
        description: "جلسة ليزر لإزالة الشعر من الوجه. النتائج جيدة."
      }
    ]
  };

  render() {
    const { history } = this.state;

    return (
      <MedicalHistoryContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>📋 السجل الطبي</h1>
        </Header>

        <ContentSection>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
              لا توجد سجلات طبية
            </div>
          ) : (
            history.map(item => (
              <HistoryItem key={item.id}>
                <div className="item-title">{item.title}</div>
                <div className="item-date">{item.date}</div>
                <div className="item-description">{item.description}</div>
              </HistoryItem>
            ))
          )}
        </ContentSection>

        <BottomNav />
      </MedicalHistoryContainer>
    );
  }
}

export default MedicalHistory;

