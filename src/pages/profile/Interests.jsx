import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const InterestsContainer = styled.div`
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

const InterestsGrid = styled.div`
  padding: 0.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.15rem;
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.2rem;
    padding: 0.3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const InterestCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1.5px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.03rem;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .interest-icon {
    font-size: 0.5rem;
    margin-bottom: 0.1rem;
    filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.2));
  }
  
  .interest-name {
    font-size: 0.18rem;
    font-weight: 600;
    color: #2d3748;
    margin-top: 0.05rem;
  }
  
  .interest-count {
    font-size: 0.14rem;
    color: #718096;
    margin-top: 0.05rem;
  }
  
  &:hover {
    transform: translateY(-0.04rem);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
    background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);
    
    &::before {
      transform: scaleX(1);
    }
    
    .interest-icon {
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(-0.02rem);
  }
  
  &.selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: white;
    
    &::before {
      transform: scaleX(1);
      background: rgba(255, 255, 255, 0.3);
    }
    
    .interest-name {
      color: white;
    }
    
    .interest-count {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    border-radius: 0.16rem;
    
    .interest-icon {
      font-size: 0.45rem;
    }
    
    .interest-name {
      font-size: 0.16rem;
    }
    
    .interest-count {
      font-size: 0.12rem;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
  
  .empty-icon {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }
  
  .empty-text {
    font-size: 0.22rem;
    margin-top: 0.15rem;
  }
`;

@withRouter
class Interests extends Component {
  state = {
    interests: [
      { id: 1, name: "البوتوكس", icon: "💉", count: 12, selected: true },
      { id: 2, name: "الفيلر", icon: "✨", count: 8, selected: true },
      { id: 3, name: "الليزر", icon: "🔬", count: 15, selected: false },
      { id: 4, name: "شد الوجه", icon: "👤", count: 5, selected: true },
      { id: 5, name: "تجميل الأنف", icon: "👃", count: 10, selected: false },
      { id: 6, name: "تجميل الشفاه", icon: "💋", count: 7, selected: true },
      { id: 7, name: "إزالة الشعر", icon: "💫", count: 20, selected: true },
      { id: 8, name: "تنظيف البشرة", icon: "🧴", count: 18, selected: false },
      { id: 9, name: "الميزوثيرابي", icon: "💆", count: 6, selected: false },
      { id: 10, name: "الخيوط", icon: "🧵", count: 4, selected: true },
      { id: 11, name: "البرايمر", icon: "🎨", count: 9, selected: false },
      { id: 12, name: "الوخز بالإبر", icon: "📍", count: 3, selected: false },
    ]
  };

  handleInterestToggle = (interestId) => {
    this.setState(prevState => ({
      interests: prevState.interests.map(interest =>
        interest.id === interestId
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    }));
  };

  render() {
    const { interests } = this.state;
    const selectedCount = interests.filter(i => i.selected).length;

    return (
      <InterestsContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>✨ اهتماماتي</h1>
        </Header>

        <div style={{ padding: '0.2rem 0.25rem', background: '#fff', margin: '0.2rem 0.25rem', borderRadius: '0.15rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.18rem', color: '#666', textAlign: 'center', padding: '0.15rem' }}>
            تم اختيار <span style={{ color: '#667eea', fontWeight: 600 }}>{selectedCount}</span> من {interests.length} علاج
          </div>
        </div>

        <InterestsGrid>
          {interests.map(interest => (
            <InterestCard
              key={interest.id}
              className={interest.selected ? 'selected' : ''}
              onClick={() => this.handleInterestToggle(interest.id)}
            >
              <div className="interest-icon">{interest.icon}</div>
              <div className="interest-name">{interest.name}</div>
              <div className="interest-count">{interest.count} علاج متاح</div>
            </InterestCard>
          ))}
        </InterestsGrid>

        <BottomNav />
      </InterestsContainer>
    );
  }
}

export default Interests;

