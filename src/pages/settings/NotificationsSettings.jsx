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

const SettingItem = styled.div`
  background: white;
  padding: 0.2rem 0.25rem;
  margin: 0.15rem 0.25rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .setting-info {
    flex: 1;
    
    .setting-title {
      font-size: 0.2rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.05rem;
    }
    
    .setting-desc {
      font-size: 0.16rem;
      color: #718096;
    }
  }
  
  .toggle {
    width: 0.5rem;
    height: 0.28rem;
    background: ${props => props.active ? '#667eea' : '#ccc'};
    border-radius: 0.14rem;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    
    .toggle-circle {
      width: 0.24rem;
      height: 0.24rem;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 0.02rem;
      ${props => props.active ? 'right: 0.02rem;' : 'right: 0.24rem;'}
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  }
`;

@withRouter
class NotificationsSettings extends Component {
  state = {
    settings: {
      pushNotifications: true,
      emailNotifications: false,
      smsNotifications: true,
      appointmentReminders: true,
      offersNotifications: true
    }
  };

  handleToggle = (settingKey) => {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [settingKey]: !prevState.settings[settingKey]
      }
    }));
  };

  render() {
    const { settings } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🔔 إعدادات الإشعارات</h1>
        </Header>

        <SettingItem active={settings.pushNotifications} onClick={() => this.handleToggle('pushNotifications')}>
          <div className="setting-info">
            <div className="setting-title">الإشعارات الفورية</div>
            <div className="setting-desc">تلقي إشعارات على الجهاز</div>
          </div>
          <div className="toggle" active={settings.pushNotifications}>
            <div className="toggle-circle"></div>
          </div>
        </SettingItem>

        <SettingItem active={settings.emailNotifications} onClick={() => this.handleToggle('emailNotifications')}>
          <div className="setting-info">
            <div className="setting-title">الإشعارات عبر البريد</div>
            <div className="setting-desc">إرسال إشعارات إلى بريدك الإلكتروني</div>
          </div>
          <div className="toggle" active={settings.emailNotifications}>
            <div className="toggle-circle"></div>
          </div>
        </SettingItem>

        <SettingItem active={settings.smsNotifications} onClick={() => this.handleToggle('smsNotifications')}>
          <div className="setting-info">
            <div className="setting-title">الإشعارات عبر الرسائل</div>
            <div className="setting-desc">إرسال إشعارات عبر الرسائل النصية</div>
          </div>
          <div className="toggle" active={settings.smsNotifications}>
            <div className="toggle-circle"></div>
          </div>
        </SettingItem>

        <SettingItem active={settings.appointmentReminders} onClick={() => this.handleToggle('appointmentReminders')}>
          <div className="setting-info">
            <div className="setting-title">تذكيرات المواعيد</div>
            <div className="setting-desc">تذكيرك بمواعيدك القادمة</div>
          </div>
          <div className="toggle" active={settings.appointmentReminders}>
            <div className="toggle-circle"></div>
          </div>
        </SettingItem>

        <SettingItem active={settings.offersNotifications} onClick={() => this.handleToggle('offersNotifications')}>
          <div className="setting-info">
            <div className="setting-title">إشعارات العروض</div>
            <div className="setting-desc">إشعارات العروض والخصومات</div>
          </div>
          <div className="toggle" active={settings.offersNotifications}>
            <div className="toggle-circle"></div>
          </div>
        </SettingItem>

        <BottomNav />
      </Container>
    );
  }
}

export default NotificationsSettings;

