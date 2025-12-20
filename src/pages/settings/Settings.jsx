import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const SettingsContainer = styled.div`
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

const SettingsList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const SettingItem = styled.div`
  background: white;
  padding: 0.2rem;
  margin-bottom: 0.15rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafa;
  }
  
  .setting-label {
    font-size: 0.2rem;
    color: #333;
    font-weight: 500;
  }
  
  .setting-value {
    font-size: 0.18rem;
    color: #999;
  }
`;

@withRouter
class Settings extends Component {
  render() {
    return (
      <SettingsContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>⚙️ الإعدادات</h1>
        </Header>

        <SettingsList>
          <SettingItem onClick={() => this.props.history.push("/notifications-settings")}>
            <span className="setting-label">إعدادات الإشعارات</span>
            <span className="setting-value">‹</span>
          </SettingItem>
          <SettingItem onClick={() => this.props.history.push("/privacy")}>
            <span className="setting-label">الخصوصية والأمان</span>
            <span className="setting-value">‹</span>
          </SettingItem>
          <SettingItem onClick={() => this.props.history.push("/language")}>
            <span className="setting-label">اللغة</span>
            <span className="setting-value">العربية ‹</span>
          </SettingItem>
          <SettingItem onClick={() => this.props.history.push("/payment-methods")}>
            <span className="setting-label">طرق الدفع</span>
            <span className="setting-value">‹</span>
          </SettingItem>
        </SettingsList>

        <BottomNav />
      </SettingsContainer>
    );
  }
}

export default Settings;

