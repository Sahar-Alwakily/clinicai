import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const AllergiesContainer = styled.div`
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

const InfoCard = styled.div`
  padding: 0.15rem;
  margin-bottom: 0.15rem;
  background: ${props => props.type === 'allergy' ? '#ffebee' : '#e3f2fd'};
  border-radius: 0.1rem;
  border-right: 3px solid ${props => props.type === 'allergy' ? '#f44336' : '#2196f3'};
  
  .card-title {
    font-size: 0.18rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.05rem;
  }
  
  .card-content {
    font-size: 0.16rem;
    color: #4a5568;
    line-height: 1.5;
  }
`;

@withRouter
class Allergies extends Component {
  state = {
    allergies: [
      { id: 1, name: "حساسية من البنسلين", severity: "متوسطة" },
      { id: 2, name: "حساسية من بعض الكريمات", severity: "خفيفة" }
    ],
    medications: [
      { id: 1, name: "فيتامين د", dosage: "1000 وحدة يومياً" },
      { id: 2, name: "أوميغا 3", dosage: "كبسولة واحدة يومياً" }
    ]
  };

  render() {
    const { allergies, medications } = this.state;

    return (
      <AllergiesContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>⚠️ الحساسية والأدوية</h1>
        </Header>

        <ContentSection>
          <h3 style={{ fontSize: '0.22rem', fontWeight: 600, marginBottom: '0.15rem', color: '#2d3748' }}>الحساسيات</h3>
          {allergies.length === 0 ? (
            <div style={{ padding: '0.15rem', color: '#999', fontSize: '0.16rem' }}>لا توجد حساسيات مسجلة</div>
          ) : (
            allergies.map(allergy => (
              <InfoCard key={allergy.id} type="allergy">
                <div className="card-title">{allergy.name}</div>
                <div className="card-content">الشدة: {allergy.severity}</div>
              </InfoCard>
            ))
          )}
        </ContentSection>

        <ContentSection style={{ marginTop: '0.2rem' }}>
          <h3 style={{ fontSize: '0.22rem', fontWeight: 600, marginBottom: '0.15rem', color: '#2d3748' }}>الأدوية الحالية</h3>
          {medications.length === 0 ? (
            <div style={{ padding: '0.15rem', color: '#999', fontSize: '0.16rem' }}>لا توجد أدوية مسجلة</div>
          ) : (
            medications.map(med => (
              <InfoCard key={med.id} type="medication">
                <div className="card-title">{med.name}</div>
                <div className="card-content">الجرعة: {med.dosage}</div>
              </InfoCard>
            ))
          )}
        </ContentSection>

        <BottomNav />
      </AllergiesContainer>
    );
  }
}

export default Allergies;

