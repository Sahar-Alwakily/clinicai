import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";
import { getRemindersForTreatment, parseArabicDate, getTreatmentIcon } from "../../utils/remindersData";

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
    bookings: []
  };

  componentDidMount() {
    // جلب الحجوزات من localStorage أو استخدام بيانات افتراضية
    this.loadBookings();
  }

  loadBookings = () => {
    // محاولة جلب الحجوزات من localStorage
    const savedBookings = localStorage.getItem('userBookings');
    let bookingsData = [];
    
    if (savedBookings) {
      try {
        bookingsData = JSON.parse(savedBookings);
      } catch (e) {
        console.error('Error parsing saved bookings:', e);
      }
    }
    
    // إذا لم توجد حجوزات محفوظة، استخدم البيانات الافتراضية
    if (bookingsData.length === 0) {
      // إنشاء تاريخ قبل يومين لليزر فراكشنال
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const twoDaysAgoString = twoDaysAgo.toLocaleDateString('ar-SA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      // إنشاء تاريخ قبل 5 ساعات لليزر إزالة الشعر
      const fiveHoursAgo = new Date();
      fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);
      const fiveHoursAgoString = fiveHoursAgo.toLocaleDateString('ar-SA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      bookingsData = [
        {
          id: 1,
          clinicName: "عيادة الجمال الحديث",
          treatment: "فيلر الشفاه",
          date: "الأربعاء، 18 ديسمبر 2025",
          time: "10:30 صباحاً",
          doctor: "د. أحمد الخالدي",
          status: "confirmed",
          statusText: "مؤكد",
          price: "500 ر.س",
          emoji: "💉"
        },
        {
          id: 2,
          clinicName: "مركز النخبة للتجميل",
          treatment: "تنظيف البشرة العميق",
          date: "السبت، 21 ديسمبر 2025",
          time: "2:00 مساءً",
          doctor: "د. سارة المنصور",
          status: "pending",
          statusText: "بانتظار التأكيد",
          price: "350 ر.س",
          emoji: "✨"
        },
        {
          id: 5,
          clinicName: "عيادة الجمال الحديث",
          treatment: "ليزر إزالة الشعر",
          date: "بكرا",
          time: "10:00 صباحاً",
          doctor: "د. أحمد الخالدي",
          status: "confirmed",
          statusText: "مؤكد",
          price: "600 ر.س",
          emoji: "💫"
        },
        {
          id: 6,
          clinicName: "مركز النخبة للتجميل",
          treatment: "ليزر فراكشنال",
          date: twoDaysAgoString,
          time: "2:00 مساءً",
          doctor: "د. سارة المنصور",
          status: "completed",
          statusText: "مكتمل",
          price: "1200 ر.س",
          emoji: "✨"
        },
        {
          id: 7,
          clinicName: "عيادة الجمال الحديث",
          treatment: "ليزر إزالة الشعر",
          date: fiveHoursAgoString,
          time: fiveHoursAgo.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          doctor: "د. أحمد الخالدي",
          status: "completed",
          statusText: "مكتمل",
          price: "600 ر.س",
          emoji: "💫"
        },
        {
          id: 3,
          clinicName: "عيادة الجمال الحديث",
          treatment: "بوتكس الجبهة",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          time: "11:00 صباحاً",
          doctor: "د. أحمد الخالدي",
          status: "completed",
          statusText: "مكتمل",
          price: "800 ر.س",
          emoji: "💆"
        }
      ];
    }
    
    // تحويل الحجوزات إلى تذكيرات
    // فقط الحجوزات المكتملة (completed) لها تذكيرات
    const bookingsWithReminders = bookingsData
      .filter(booking => booking.status === "completed")
      .map(booking => {
        try {
          const bookingDate = parseArabicDate(booking.date, booking.time);
          const reminders = getRemindersForTreatment(booking.treatment);
          const serviceIcon = booking.emoji || getTreatmentIcon(booking.treatment);
          
          // التحقق من أن التاريخ صحيح
          if (isNaN(bookingDate.getTime())) {
            console.error('Invalid date for booking:', booking);
            return null;
          }
          
          return {
            id: booking.id,
            serviceName: booking.treatment,
            serviceIcon: serviceIcon,
            bookingDate: bookingDate,
            clinicName: booking.clinicName,
            doctor: booking.doctor,
            reminders: reminders
          };
        } catch (e) {
          console.error('Error processing booking:', booking, e);
          return null;
        }
      })
      .filter(booking => booking !== null);
    
    this.setState({ bookings: bookingsWithReminders });
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
    // فقط الحجوزات التي تمت (bookingDate في الماضي) لها تذكيرات
    const now = new Date();
    const activeBookings = bookings
      .filter(booking => {
        // التحقق من أن bookingDate هو Date object صحيح
        if (!booking.bookingDate || !(booking.bookingDate instanceof Date)) {
          return false;
        }
        // فقط الحجوزات التي تمت (في الماضي)
        return booking.bookingDate < now;
      })
      .map(booking => {
        const activeReminders = booking.reminders.filter(reminder => {
          const status = this.getReminderStatus(booking.bookingDate, reminder.duration);
          return status.active;
        });
        
        return {
          ...booking,
          reminders: activeReminders
        };
      })
      .filter(booking => booking.reminders.length > 0);

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
            <div className="empty-text" style={{ fontSize: '0.22rem', color: '#999', marginTop: '0.15rem' }}>
              لا توجد تذكيرات نشطة حالياً
            </div>
            <div style={{ fontSize: '0.18rem', color: '#bbb', marginTop: '0.1rem' }}>
              ستظهر التذكيرات بعد إتمام الحجوزات
            </div>
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
                  {booking.clinicName && (
                    <span style={{ marginRight: '0.1rem', color: '#999' }}>
                      • {booking.clinicName}
                    </span>
                  )}
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


