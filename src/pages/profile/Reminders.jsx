import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const RemindersContainer = styled.div`
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
  }
`;

const ReminderCard = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.2rem;
  padding: 0.25rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-right: 4px solid ${props => {
    if (props.urgent) return '#f44336';
    if (props.warning) return '#ff9800';
    return '#4caf50';
  }};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0.06rem;
    height: 100%;
    background: linear-gradient(180deg, 
      ${props => {
        if (props.urgent) return '#f44336';
        if (props.warning) return '#ff9800';
        return '#4caf50';
      }} 0%, 
      ${props => {
        if (props.urgent) return '#d32f2f';
        if (props.warning) return '#f57c00';
        return '#388e3c';
      }} 100%);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.15rem;
    
    .service-info {
      display: flex;
      align-items: center;
      gap: 0.12rem;
      flex: 1;
      
      .service-icon {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.12rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem;
        color: white;
      }
      
      .service-name {
        font-size: 0.22rem;
        font-weight: 600;
        color: #2d3748;
      }
    }
    
    .time-badge {
      background: ${props => {
        if (props.urgent) return '#ffebee';
        if (props.warning) return '#fff3e0';
        return '#e8f5e9';
      }};
      color: ${props => {
        if (props.urgent) return '#f44336';
        if (props.warning) return '#ff9800';
        return '#4caf50';
      }};
      padding: 0.05rem 0.12rem;
      border-radius: 0.12rem;
      font-size: 0.16rem;
      font-weight: 600;
    }
  }
  
  .booking-date {
    font-size: 0.18rem;
    color: #718096;
    margin-bottom: 0.15rem;
    display: flex;
    align-items: center;
    gap: 0.08rem;
    
    &::before {
      content: '📅';
      font-size: 0.16rem;
    }
  }
  
  .reminders-list {
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    
    .reminder-item {
      display: flex;
      align-items: flex-start;
      gap: 0.1rem;
      padding: 0.12rem;
      background: #f8f9fa;
      border-radius: 0.1rem;
      border-right: 2px solid ${props => {
        if (props.urgent) return '#f44336';
        if (props.warning) return '#ff9800';
        return '#4caf50';
      }};
      
      .reminder-icon {
        font-size: 0.2rem;
        margin-top: 0.02rem;
      }
      
      .reminder-content {
        flex: 1;
        
        .reminder-text {
          font-size: 0.18rem;
          color: #2d3748;
          font-weight: 500;
          line-height: 1.5;
        }
        
        .reminder-time {
          font-size: 0.14rem;
          color: #718096;
          margin-top: 0.04rem;
        }
      }
      
      .status-icon {
        font-size: 0.2rem;
        color: ${props => {
          if (props.active) return '#4caf50';
          return '#ccc';
        }};
      }
    }
  }
  
  .completed-badge {
    position: absolute;
    top: 0.15rem;
    left: 0.15rem;
    background: #4caf50;
    color: white;
    padding: 0.04rem 0.1rem;
    border-radius: 0.1rem;
    font-size: 0.14rem;
    font-weight: 600;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 0.5rem;
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
class Reminders extends Component {
  state = {
    bookings: [
      {
        id: 1,
        serviceName: "ليزر إزالة الشعر",
        serviceIcon: "💫",
        bookingDate: new Date("2025-01-15T10:00:00"),
        reminders: [
          {
            id: 1,
            text: "لا تستخدمي كريم خلال 24 ساعة",
            duration: 24, // ساعات
            type: "restriction",
            active: true
          },
          {
            id: 2,
            text: "لا استحمام ساخن خلال 24 ساعة",
            duration: 24,
            type: "restriction",
            active: true
          },
          {
            id: 3,
            text: "لا تقشير خلال 3 أيام",
            duration: 72, // ساعات (3 أيام)
            type: "restriction",
            active: true
          }
        ]
      },
      {
        id: 2,
        serviceName: "ليزر فراكشنال",
        serviceIcon: "✨",
        bookingDate: new Date("2025-01-14T14:00:00"),
        reminders: [
          {
            id: 1,
            text: "استخدمي واقي الشمس SPF 50+",
            duration: 168, // 7 أيام
            type: "care",
            active: true
          },
          {
            id: 2,
            text: "تجنبي التعرض المباشر للشمس",
            duration: 168,
            type: "restriction",
            active: true
          },
          {
            id: 3,
            text: "لا تقشير أو استخدام منتجات حامضية",
            duration: 120, // 5 أيام
            type: "restriction",
            active: true
          },
          {
            id: 4,
            text: "استخدمي مرطب خفيف فقط",
            duration: 72, // 3 أيام
            type: "care",
            active: true
          }
        ]
      },
      {
        id: 3,
        serviceName: "بوتوكس الجبهة",
        serviceIcon: "💉",
        bookingDate: new Date("2025-01-10T11:00:00"),
        reminders: [
          {
            id: 1,
            text: "لا تلمسي المنطقة المحقونة",
            duration: 4, // ساعات
            type: "restriction",
            active: false // مكتمل
          },
          {
            id: 2,
            text: "لا تميلي رأسك للأسفل",
            duration: 4,
            type: "restriction",
            active: false
          },
          {
            id: 3,
            text: "تجنبي التمارين الرياضية",
            duration: 24,
            type: "restriction",
            active: false
          }
        ]
      }
    ]
  };

  getReminderStatus = (bookingDate, duration) => {
    const now = new Date();
    const bookingTime = new Date(bookingDate);
    const hoursSinceBooking = (now - bookingTime) / (1000 * 60 * 60);
    const hoursRemaining = duration - hoursSinceBooking;
    
    if (hoursRemaining <= 0) {
      return { active: false, urgent: false, warning: false, timeText: "انتهى" };
    }
    
    if (hoursRemaining <= 6) {
      return { active: true, urgent: true, warning: false, timeText: `متبقي ${Math.ceil(hoursRemaining)} ساعة` };
    }
    
    if (hoursRemaining <= 24) {
      return { active: true, urgent: false, warning: true, timeText: `متبقي ${Math.ceil(hoursRemaining)} ساعة` };
    }
    
    const daysRemaining = Math.ceil(hoursRemaining / 24);
    return { active: true, urgent: false, warning: false, timeText: `متبقي ${daysRemaining} يوم` };
  };

  formatDate = (date) => {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString('ar-SA', options);
  };

  render() {
    const { bookings } = this.state;
    
    // فلترة التذكيرات النشطة فقط
    const activeBookings = bookings.map(booking => {
      const activeReminders = booking.reminders.filter(reminder => {
        const status = this.getReminderStatus(booking.bookingDate, reminder.duration);
        return status.active;
      });
      
      return {
        ...booking,
        reminders: activeReminders
      };
    }).filter(booking => booking.reminders.length > 0);

    return (
      <RemindersContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>🔔 التذكيرات</h1>
        </Header>

        {activeBookings.length === 0 ? (
          <EmptyState>
            <div className="empty-icon">📭</div>
            <div className="empty-text">لا توجد تذكيرات نشطة حالياً</div>
          </EmptyState>
        ) : (
          activeBookings.map((booking) => {
            const hasUrgent = booking.reminders.some(r => {
              const status = this.getReminderStatus(booking.bookingDate, r.duration);
              return status.urgent;
            });
            
            const hasWarning = booking.reminders.some(r => {
              const status = this.getReminderStatus(booking.bookingDate, r.duration);
              return status.warning;
            });

            return (
              <ReminderCard
                key={booking.id}
                urgent={hasUrgent}
                warning={hasWarning && !hasUrgent}
              >
                <div className="card-header">
                  <div className="service-info">
                    <div className="service-icon">{booking.serviceIcon}</div>
                    <div className="service-name">{booking.serviceName}</div>
                  </div>
                  {hasUrgent && <div className="time-badge">عاجل</div>}
                  {hasWarning && !hasUrgent && <div className="time-badge">قريب</div>}
                </div>
                
                <div className="booking-date">
                  تاريخ الحجز: {this.formatDate(booking.bookingDate)}
                </div>

                <div className="reminders-list">
                  {booking.reminders.map((reminder) => {
                    const status = this.getReminderStatus(booking.bookingDate, reminder.duration);
                    const isUrgent = status.urgent;
                    const isWarning = status.warning;
                    
                    return (
                      <div
                        key={reminder.id}
                        className="reminder-item"
                        urgent={isUrgent}
                        warning={isWarning && !isUrgent}
                        active={status.active}
                      >
                        <span className="reminder-icon">
                          {reminder.type === "restriction" ? "⚠️" : "💡"}
                        </span>
                        <div className="reminder-content">
                          <div className="reminder-text">{reminder.text}</div>
                          <div className="reminder-time">{status.timeText}</div>
                        </div>
                        <span className="status-icon">
                          {status.active ? "✓" : "○"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ReminderCard>
            );
          })
        )}

        <BottomNav />
      </RemindersContainer>
    );
  }
}

export default Reminders;


