import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import BottomNav from "../../components/bottomNav/BottomNav";

const NotificationsContainer = styled.div`
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
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 0.12rem;
    flex: 1;
    
    .notification-logo {
      width: 0.4rem;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      padding: 0.05rem;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(0) invert(1);
      }
    }
    
    h1 {
      font-size: 0.28rem;
      font-weight: 700;
      margin: 0;
      color: white;
    }
  }
`;

const NotificationList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const NotificationListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.15rem 0.25rem;
  margin-bottom: 0.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.unread ? '#f8f9ff' : '#fff'};
  border-radius: 0.12rem;
  border-right: ${props => props.unread ? '3px solid #EC4899' : '3px solid transparent'};
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: #f5f5f5;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    background: #f0f0f0;
  }
  
  .notification-icon {
    flex-shrink: 0;
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => 
      props.notifType === "offer" ? "rgba(236, 72, 153, 0.1)" :
      props.notifType === "success" ? "rgba(34, 197, 94, 0.1)" :
      props.notifType === "reminder" ? "rgba(251, 191, 36, 0.1)" :
      props.notifType === "like" ? "rgba(236, 72, 153, 0.1)" :
      props.notifType === "comment" ? "rgba(102, 126, 234, 0.1)" :
      props.notifType === "follow" ? "rgba(34, 197, 94, 0.1)" :
      props.notifType === "mention" ? "rgba(102, 126, 234, 0.1)" :
      "rgba(102, 126, 234, 0.1)"
    };
    border-radius: 50%;
    
    .am-icon {
      color: ${props => 
        props.notifType === "offer" ? "#EC4899" :
        props.notifType === "success" ? "#22c55e" :
        props.notifType === "reminder" ? "#fbbf24" :
        props.notifType === "like" ? "#EC4899" :
        props.notifType === "comment" ? "#667eea" :
        props.notifType === "follow" ? "#22c55e" :
        props.notifType === "mention" ? "#667eea" :
        "#667eea"
      };
      font-size: 0.2rem;
    }
  }
  
  .notification-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    
    .notification-text {
      margin: 0;
      font-size: 0.18rem;
      color: #333;
      line-height: 1.4;
      font-weight: ${props => props.unread ? '600' : '400'};
    }
    
    .notification-time {
      font-size: 0.14rem;
      color: #999;
    }
  }
  
  .unread-dot {
    position: absolute;
    top: 0.15rem;
    left: 0.15rem;
    width: 0.12rem;
    height: 0.12rem;
    background: #EC4899;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem 0.2rem;
    gap: 0.12rem;
    
    .notification-icon {
      width: 0.35rem;
      height: 0.35rem;
      
      .am-icon {
        font-size: 0.18rem;
      }
    }
    
    .notification-content {
      .notification-text {
        font-size: 0.16rem;
      }
      
      .notification-time {
        font-size: 0.12rem;
      }
    }
    
    .unread-dot {
      width: 0.1rem;
      height: 0.1rem;
      top: 0.12rem;
      left: 0.12rem;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: #999;
  text-align: center;
  
  .am-icon {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
    opacity: 0.5;
  }
  
  p {
    margin: 0;
    font-size: 0.22rem;
  }
`;

@withRouter
class Notifications extends Component {
  state = {
    notificationList: [
      { 
        id: 1, 
        userName: "سارة أحمد", 
        action: "أعجبت بحجزك", 
        type: "like", 
        time: "منذ ساعتين", 
        date: "اليوم",
        read: false,
        avatar: "👩",
        thumbnail: null,
        subtitle: "حجز ليزر إزالة الشعر"
      },
      { 
        id: 2, 
        userName: "محمد علي", 
        action: "أعجبه منشورك", 
        type: "like", 
        time: "منذ 4 ساعات", 
        date: "اليوم",
        read: false,
        avatar: "👨",
        thumbnail: null,
        subtitle: "قبل وبعد - ليزر فراكشنال"
      },
      { 
        id: 3, 
        userName: "فاطمة خالد", 
        action: "علق على منشورك", 
        type: "comment", 
        time: "منذ 6 ساعات", 
        date: "اليوم",
        read: false,
        avatar: "👩‍🦰",
        thumbnail: "https://via.placeholder.com/60x60/667eea/ffffff?text=UI",
        subtitle: "تجربتي مع البوتوكس"
      },
      { 
        id: 4, 
        userName: "أحمد سالم", 
        action: "أعجبه منشورك", 
        type: "like", 
        time: "منذ 6 ساعات", 
        date: "اليوم",
        read: false,
        avatar: "👨‍🦱",
        thumbnail: "https://via.placeholder.com/60x60/764ba2/ffffff?text=Menu",
        subtitle: "قائمة الخدمات"
      },
      { 
        id: 5, 
        userName: "نورا العتيبي", 
        action: "أعجبت بحجزك", 
        type: "like", 
        time: "30 أكتوبر", 
        date: "هذا الأسبوع",
        read: true,
        avatar: "👩‍💼",
        thumbnail: "https://via.placeholder.com/60x60/EC4899/ffffff?text=UI",
        subtitle: "قائمة الطعام - 30 أكتوبر"
      },
      { 
        id: 6, 
        userName: "عيادة الجمال", 
        action: "بدأت متابعتك", 
        type: "follow", 
        time: "30 أغسطس", 
        date: "هذا الأسبوع",
        read: true,
        avatar: "🏥",
        thumbnail: "https://via.placeholder.com/60x60/22c55e/ffffff?text=Design",
        subtitle: "عملك - 30 أغسطس"
      },
      { 
        id: 7, 
        userName: "جستن بولت", 
        action: "ذكرك في", 
        type: "mention", 
        time: "5 نوفمبر", 
        date: "هذا الأسبوع",
        read: true,
        avatar: "👤",
        thumbnail: null,
        subtitle: "منشورك - 5 نوفمبر"
      },
      { 
        id: 8, 
        userName: "جستن بولت", 
        action: "أعجب بمنشورك", 
        type: "like", 
        time: "5 نوفمبر", 
        date: "هذا الأسبوع",
        read: true,
        avatar: "👨",
        thumbnail: "https://via.placeholder.com/60x60/667eea/ffffff?text=Post",
        subtitle: "منشورك - 5 نوفمبر"
      }
    ]
  };

  handleNotificationItemClick = (notificationId) => {
    // Mark notification as read
    this.setState(prevState => ({
      notificationList: prevState.notificationList.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    }));
  };

  render() {
    const { notificationList } = this.state;
    const unreadCount = notificationList.filter(n => !n.read).length;

    return (
      <NotificationsContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <div className="header-content">
            <div className="notification-logo">
              <img src="/icon.svg" alt="ClinicAI Logo" />
            </div>
            <h1>الإشعارات</h1>
          </div>
        </Header>

        <NotificationList>
          {notificationList.length === 0 ? (
            <EmptyState>
              <Icon type="bell" size="lg" />
              <p>لا توجد إشعارات</p>
            </EmptyState>
          ) : (
            notificationList.map(notif => (
              <NotificationListItem
                key={notif.id}
                onClick={() => this.handleNotificationItemClick(notif.id)}
                unread={!notif.read}
                notifType={notif.type}
              >
                <div className="notification-icon">
                  <Icon 
                    type={
                      notif.type === "offer" ? "check-circle" :
                      notif.type === "success" ? "check-circle-o" :
                      notif.type === "reminder" ? "clock-circle" :
                      notif.type === "like" ? "like" :
                      notif.type === "comment" ? "message" :
                      notif.type === "follow" ? "user" :
                      notif.type === "mention" ? "message" :
                      "info-circle"
                    } 
                    size="xs" 
                  />
                </div>
                <div className="notification-content">
                  <p className="notification-text">
                    {notif.userName && (
                      <>
                        <span style={{ color: '#667eea', fontWeight: 600 }}>{notif.userName}</span> {notif.action}
                      </>
                    )}
                    {!notif.userName && notif.text}
                  </p>
                  <span className="notification-time">{notif.subtitle || notif.time}</span>
                </div>
                {!notif.read && <div className="unread-dot" />}
              </NotificationListItem>
            ))
          )}
        </NotificationList>

        <BottomNav />
      </NotificationsContainer>
    );
  }
}

export default Notifications;

