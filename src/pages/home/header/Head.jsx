import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Header, Topbar, HeaderContent, Greeting, UserInfo, NotificationIcon, SearchSection, SearchBar, NotificationBar, NotificationList, NotificationListItem, NotificationOverlay } from "./styled";
import City from "@/city/City";
import Mine from "@/mine/Mine";
import { Icon } from "antd-mobile";

@withRouter
export default class Head extends Component {
  state = {
    notifications: [
      { id: 1, text: "خصم 30% على جميع الخدمات اليوم فقط!", type: "offer" },
      { id: 2, text: "جديد: خدمة استشارة مجانية متاحة الآن", type: "info" }
    ],
    currentNotification: 0,
    showNotifications: true,
    showNotificationList: false,
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
    ],
    isScrolled: false
  };

  getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };

  handleSearchClick = () => {
    this.props.history.push("/newsearch");
  };

  handleCloseNotification = () => {
    this.setState({ showNotifications: false });
  };

  handleNotificationClick = () => {
    this.setState(prevState => ({
      showNotificationList: !prevState.showNotificationList
    }));
  };

  handleCloseNotificationList = () => {
    this.setState({ showNotificationList: false });
  };

  handleNotificationItemClick = (notificationId) => {
    // Mark notification as read
    this.setState(prevState => ({
      notificationList: prevState.notificationList.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    }));
  };

  componentDidMount() {
    // تغيير الإشعارات تلقائياً كل 4 ثوان
    if (this.state.notifications.length > 1) {
      this.notificationInterval = setInterval(() => {
        this.setState(prevState => ({
          currentNotification: (prevState.currentNotification + 1) % prevState.notifications.length
        }));
      }, 4000);
    }

    // إضافة event listener للـ scroll
    this.handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeScrolled = scrollTop > 50; // تغيير اللون بعد 50px من التمرير
      
      if (shouldBeScrolled !== this.state.isScrolled) {
        this.setState({ isScrolled: shouldBeScrolled });
      }
    };

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
    
    // إزالة event listener للـ scroll
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    const { notifications, currentNotification, showNotifications, showNotificationList, notificationList, isScrolled } = this.state;
    const currentNotif = notifications[currentNotification];
    const unreadCount = notificationList.filter(n => !n.read).length;

    return (
      <>
        {showNotifications && currentNotif && (
          <NotificationBar type={currentNotif.type}>
            <div className="notification-logo">
              <img src="/icon.svg" alt="ClinicAI Logo" />
            </div>
            <div className="notification-content">
              <Icon type={currentNotif.type === "offer" ? "check-circle" : "info-circle"} size="xs" />
              <span className="notification-text">{currentNotif.text}</span>
            </div>
            <button className="close-btn" onClick={this.handleCloseNotification}>
              <Icon type="cross" size="xs" />
            </button>
          </NotificationBar>
        )}
        <Topbar hasNotification={showNotifications && currentNotif} isScrolled={isScrolled}>
          <Header isScrolled={isScrolled}>
            <HeaderContent>
              <div className="left-section">
                <Greeting>{this.getGreeting()}</Greeting>
            <City></City>
              </div>
              <div className="right-section">
                <NotificationIcon onClick={this.handleNotificationClick}>
                  <div className="notification-logo">
                    <img src="/icon.svg" alt="ClinicAI Logo" />
                  </div>
                  {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                </NotificationIcon>
            <Mine></Mine>
              </div>
            </HeaderContent>
            <SearchSection>
              <SearchBar onClick={this.handleSearchClick}>
                <Icon type="search" size="xxs" />
                <span>ابحث عن خدمة...</span>
              </SearchBar>
            </SearchSection>
          </Header>
        </Topbar>
        {showNotificationList && (
          <>
            <NotificationOverlay onClick={this.handleCloseNotificationList} />
            <NotificationList>
              <div className="notification-header">
                <div className="header-top">
                  <h2>الإشعارات</h2>
                  <div className="filter-btn" onClick={(e) => e.stopPropagation()}>
                    <div className="filter-icon">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
                <div className="header-subtitle">
                  لديك <span className="highlight">{unreadCount} إشعارات</span> اليوم
                </div>
              </div>
              <div className="notification-content-wrapper">
                {notificationList.length === 0 ? (
                  <div className="empty-state">
                    <Icon type="bell" size="lg" />
                    <p>لا توجد إشعارات</p>
                  </div>
                ) : (
                  <>
                    {/* قسم اليوم */}
                    {notificationList.filter(n => n.date === "اليوم").length > 0 && (
                      <div className="notification-section">
                        <div className="section-title">اليوم</div>
                        {notificationList
                          .filter(n => n.date === "اليوم")
                          .map(notif => (
                            <NotificationListItem
                              key={notif.id}
                              onClick={() => this.handleNotificationItemClick(notif.id)}
                              unread={!notif.read}
                              notifType={notif.type}
                            >
                              <div className="status-dot" />
                              <div className="avatar-container">
                                <div className="avatar">
                                  {notif.avatar && !notif.avatar.includes('http') ? (
                                    <span>{notif.avatar}</span>
                                  ) : (
                                    <img src={notif.avatar || "https://via.placeholder.com/60/667eea/ffffff?text=U"} alt={notif.userName} />
                                  )}
                                </div>
                                <div className={`avatar-badge ${notif.type}`}>
                                  {notif.type === "like" && "❤️"}
                                  {notif.type === "comment" && "💬"}
                                  {notif.type === "follow" && "👤"}
                                  {notif.type === "mention" && "💬"}
                                </div>
                              </div>
                              <div className="notification-content">
                                <p className="notification-text">
                                  <span className="user-name">{notif.userName}</span> {notif.action}
                                </p>
                                <span className="notification-subtitle">{notif.subtitle} - {notif.time}</span>
                              </div>
                              {notif.thumbnail && (
                                <div className="notification-thumbnail">
                                  <img src={notif.thumbnail} alt="Thumbnail" />
                                </div>
                              )}
                              {!notif.thumbnail && notif.type === "like" && (
                                <div className="notification-thumbnail">
                                  <div className="thumbnail-placeholder" style={{ background: '#ffebee' }}>
                                    <span style={{ color: '#ff4757', fontSize: '0.16rem' }}>❤️</span>
                                  </div>
                                </div>
                              )}
                            </NotificationListItem>
                          ))}
                      </div>
                    )}
                    
                    {/* قسم هذا الأسبوع */}
                    {notificationList.filter(n => n.date === "هذا الأسبوع").length > 0 && (
                      <div className="notification-section">
                        <div className="section-title">هذا الأسبوع</div>
                        {notificationList
                          .filter(n => n.date === "هذا الأسبوع")
                          .map(notif => (
                            <NotificationListItem
                              key={notif.id}
                              onClick={() => this.handleNotificationItemClick(notif.id)}
                              unread={!notif.read}
                              notifType={notif.type}
                            >
                              <div className="status-dot" />
                              <div className="avatar-container">
                                <div className="avatar">
                                  {notif.avatar && !notif.avatar.includes('http') ? (
                                    <span>{notif.avatar}</span>
                                  ) : (
                                    <img src={notif.avatar || "https://via.placeholder.com/60/667eea/ffffff?text=U"} alt={notif.userName} />
                                  )}
                                </div>
                                <div className={`avatar-badge ${notif.type}`}>
                                  {notif.type === "like" && "❤️"}
                                  {notif.type === "comment" && "💬"}
                                  {notif.type === "follow" && "👤"}
                                  {notif.type === "mention" && "💬"}
                                </div>
                              </div>
                              <div className="notification-content">
                                <p className="notification-text">
                                  <span className="user-name">{notif.userName}</span> {notif.action}
                                </p>
                                <span className="notification-subtitle">{notif.subtitle} - {notif.time}</span>
                              </div>
                              {notif.thumbnail && (
                                <div className="notification-thumbnail">
                                  <img src={notif.thumbnail} alt="Thumbnail" />
                                </div>
                              )}
                              {!notif.thumbnail && notif.type === "like" && (
                                <div className="notification-thumbnail">
                                  <div className="thumbnail-placeholder" style={{ background: '#4A90E2' }}>
                                    <span style={{ color: '#fff', fontSize: '0.16rem' }}>●</span>
                                  </div>
                                </div>
                              )}
                            </NotificationListItem>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </NotificationList>
          </>
        )}
      </>
    );
  }
}
