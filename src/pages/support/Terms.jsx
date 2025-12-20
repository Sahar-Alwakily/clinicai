import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const Container = styled.div`
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
  
  .section-title {
    font-size: 0.22rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.1rem;
    margin-top: 0.15rem;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  .section-content {
    font-size: 0.18rem;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 0.15rem;
  }
`;

@withRouter
class Terms extends Component {
  render() {
    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>📄 الشروط والأحكام</h1>
        </Header>

        <ContentSection>
          <div className="section-title">1. قبول الشروط</div>
          <div className="section-content">
            باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بجميع الشروط والأحكام المذكورة هنا.
          </div>

          <div className="section-title">2. استخدام الخدمة</div>
          <div className="section-content">
            يجب استخدام التطبيق للأغراض القانونية فقط ووفقاً للقوانين المعمول بها.
          </div>

          <div className="section-title">3. الحجوزات والدفع</div>
          <div className="section-content">
            جميع الحجوزات قابلة للإلغاء قبل 24 ساعة من الموعد. الدفع يتم عند الحجز أو في العيادة.
          </div>

          <div className="section-title">4. الخصوصية</div>
          <div className="section-content">
            نحن ملتزمون بحماية خصوصيتك. جميع البيانات محمية وفقاً لسياسة الخصوصية.
          </div>

          <div className="section-title">5. المسؤولية</div>
          <div className="section-content">
            التطبيق يوفر منصة للربط بين المستخدمين والأطباء. نحن غير مسؤولين عن جودة الخدمات المقدمة من قبل الأطباء.
          </div>
        </ContentSection>

        <BottomNav />
      </Container>
    );
  }
}

export default Terms;

