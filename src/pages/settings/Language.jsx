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

const LanguageList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const LanguageItem = styled.div`
  background: white;
  padding: 0.2rem 0.25rem;
  margin-bottom: 0.15rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${props => props.selected ? '2px solid #667eea' : '2px solid transparent'};
  
  &:hover {
    background: #fafafa;
  }
  
  .language-name {
    font-size: 0.2rem;
    color: #333;
    font-weight: 500;
  }
  
  .check-icon {
    font-size: 0.24rem;
    color: #667eea;
  }
`;

@withRouter
class Language extends Component {
  state = {
    selectedLanguage: "ar",
    languages: [
      { id: "ar", name: "العربية", flag: "🇸🇦" },
      { id: "en", name: "English", flag: "🇬🇧" }
    ]
  };

  handleLanguageSelect = (langId) => {
    this.setState({ selectedLanguage: langId });
  };

  render() {
    const { languages, selectedLanguage } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🌍 اللغة</h1>
        </Header>

        <LanguageList>
          {languages.map(lang => (
            <LanguageItem
              key={lang.id}
              selected={selectedLanguage === lang.id}
              onClick={() => this.handleLanguageSelect(lang.id)}
            >
              <span className="language-name">{lang.flag} {lang.name}</span>
              {selectedLanguage === lang.id && <span className="check-icon">✓</span>}
            </LanguageItem>
          ))}
        </LanguageList>

        <BottomNav />
      </Container>
    );
  }
}

export default Language;

