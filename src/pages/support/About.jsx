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
  
  .app-logo {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0.3rem;
  }
  
  .app-name {
    font-size: 0.28rem;
    font-weight: 700;
    color: #2d3748;
    text-align: center;
    margin-bottom: 0.1rem;
  }
  
  .app-version {
    font-size: 0.18rem;
    color: #718096;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  
  .app-description {
    font-size: 0.18rem;
    color: #4a5568;
    line-height: 1.6;
    text-align: center;
    margin-top: 0.15rem;
  }
`;

@withRouter
class About extends Component {
  render() {
    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>ℹ️ عن التطبيق</h1>
        </Header>

        <ContentSection>
          <div className="app-logo">🏥</div>
          <div className="app-name">ClinicAI</div>
          <div className="app-version">الإصدار 1.0.0</div>
          <div className="app-description">
            تطبيق ClinicAI هو منصة شاملة للعلاجات التجميلية والعناية بالبشرة.
            نوفر لك أفضل الأطباء والعيادات مع سهولة في الحجز والمتابعة.
          </div>
        </ContentSection>

        <BottomNav />
      </Container>
    );
  }
}

export default About;

