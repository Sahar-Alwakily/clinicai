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
      { id: 1, text: "خصم 30% على جميع الخدمات اليوم فقط!", type: "offer", time: "منذ ساعتين", read: false },
      { id: 2, text: "جديد: خدمة استشارة مجانية متاحة الآن", type: "info", time: "منذ 5 ساعات", read: false },
      { id: 3, text: "تم تأكيد حجزك بنجاح", type: "success", time: "أمس", read: true },
      { id: 4, text: "تذكير: موعدك غداً الساعة 10 صباحاً", type: "reminder", time: "منذ يومين", read: true }
    ]
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
  }

  componentWillUnmount() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }

  render() {
    const { notifications, currentNotification, showNotifications, showNotificationList, notificationList } = this.state;
    const currentNotif = notifications[currentNotification];
    const unreadCount = notificationList.filter(n => !n.read).length;

    return (
      <>
        {showNotifications && currentNotif && (
          <NotificationBar type={currentNotif.type}>
            <div className="notification-content">
              <Icon type={currentNotif.type === "offer" ? "check-circle" : "info-circle"} size="xs" />
              <span className="notification-text">{currentNotif.text}</span>
            </div>
            <button className="close-btn" onClick={this.handleCloseNotification}>
              <Icon type="cross" size="xs" />
            </button>
          </NotificationBar>
        )}
        <Topbar hasNotification={showNotifications && currentNotif}>
          <Header>
            <HeaderContent>
              <div className="left-section">
                <Greeting>{this.getGreeting()}</Greeting>
                <City></City>
              </div>
              <div className="right-section">
                <NotificationIcon onClick={this.handleNotificationClick}>
                  <Icon type="bell" size="xs" />
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
                <h3>الإشعارات</h3>
                <button className="close-btn" onClick={this.handleCloseNotificationList}>
                  <Icon type="cross" size="xs" />
                </button>
              </div>
              <div className="notification-items">
                {notificationList.length === 0 ? (
                  <div className="empty-state">
                    <Icon type="bell" size="lg" />
                    <p>لا توجد إشعارات</p>
                  </div>
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
                            "info-circle"
                          } 
                          size="xs" 
                        />
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">{notif.text}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <div className="unread-dot" />}
                    </NotificationListItem>
                  ))
                )}
              </div>
            </NotificationList>
          </>
        )}
      </>
    );
  }
}
