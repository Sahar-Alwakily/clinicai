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
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.15rem;
  margin-top: 0.15rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.1rem;
  font-size: 0.18rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-0.02rem);
  }
`;

@withRouter
class Privacy extends Component {
  render() {
    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🔒 الخصوصية والأمان</h1>
        </Header>

        <ContentSection>
          <h3 style={{ fontSize: '0.22rem', fontWeight: 600, marginBottom: '0.15rem', color: '#2d3748' }}>كلمة المرور</h3>
          <ActionButton onClick={() => alert('تغيير كلمة المرور')}>
            تغيير كلمة المرور
          </ActionButton>
        </ContentSection>

        <ContentSection style={{ marginTop: '0.2rem' }}>
          <h3 style={{ fontSize: '0.22rem', fontWeight: 600, marginBottom: '0.15rem', color: '#2d3748' }}>التحقق</h3>
          <div style={{ fontSize: '0.18rem', color: '#4a5568', marginBottom: '0.1rem' }}>
            رقم الهاتف: +966 50 123 4567
          </div>
          <ActionButton onClick={() => alert('التحقق من الهاتف')}>
            التحقق من الهاتف
          </ActionButton>
        </ContentSection>

        <BottomNav />
      </Container>
    );
  }
}

export default Privacy;

