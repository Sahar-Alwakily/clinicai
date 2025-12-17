import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const BookingsContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 1.5rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.4rem 0.3rem 0.5rem;
  color: white;
  
  h1 {
    font-size: 0.4rem;
    margin: 0 0 0.1rem;
    font-weight: 700;
  }
  
  p {
    font-size: 0.22rem;
    opacity: 0.9;
    margin: 0;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  background: white;
  padding: 0.15rem;
  margin: 0.25rem;
  border-radius: 0.15rem;
  gap: 0.1rem;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.15rem;
  border-radius: 0.1rem;
  font-size: 0.22rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.active {
    background: #667eea;
    color: white;
  }
  
  &:not(.active) {
    color: #666;
    
    &:hover {
      background: #f0f0f0;
    }
  }
`;

const BookingCard = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.2rem;
  padding: 0.3rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .booking-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.2rem;
    
    .clinic-info {
      display: flex;
      gap: 0.2rem;
      
      .clinic-logo {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.12rem;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.4rem;
      }
      
      .details {
        .clinic-name {
          font-size: 0.26rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.05rem;
        }
        
        .treatment {
          font-size: 0.2rem;
          color: #666;
        }
      }
    }
    
    .status {
      padding: 0.08rem 0.15rem;
      border-radius: 0.3rem;
      font-size: 0.18rem;
      font-weight: 500;
      
      &.confirmed {
        background: #e8f5e9;
        color: #2ecc71;
      }
      
      &.pending {
        background: #fff3e0;
        color: #ff9800;
      }
      
      &.completed {
        background: #e3f2fd;
        color: #2196f3;
      }
      
      &.cancelled {
        background: #ffebee;
        color: #f44336;
      }
    }
  }
  
  .booking-details {
    background: #f9f9f9;
    border-radius: 0.12rem;
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    
    .detail-row {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      margin-bottom: 0.12rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .icon {
        font-size: 0.28rem;
      }
      
      .text {
        font-size: 0.2rem;
        color: #555;
      }
    }
  }
  
  .booking-actions {
    display: flex;
    gap: 0.15rem;
    
    button {
      flex: 1;
      padding: 0.15rem;
      border-radius: 0.1rem;
      font-size: 0.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      
      &.primary {
        background: #667eea;
        color: white;
        
        &:hover {
          background: #5a6fd6;
        }
      }
      
      &.secondary {
        background: #f0f0f0;
        color: #666;
        
        &:hover {
          background: #e0e0e0;
        }
      }
      
      &.danger {
        background: #ffebee;
        color: #f44336;
        
        &:hover {
          background: #ffcdd2;
        }
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1rem 0.5rem;
  
  .icon {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  
  h3 {
    font-size: 0.28rem;
    color: #333;
    margin: 0 0 0.1rem;
  }
  
  p {
    font-size: 0.2rem;
    color: #999;
    margin: 0 0 0.3rem;
  }
  
  button {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.15rem 0.4rem;
    border-radius: 0.3rem;
    font-size: 0.22rem;
    cursor: pointer;
    
    &:hover {
      background: #5a6fd6;
    }
  }
`;

const StatsBar = styled.div`
  display: flex;
  background: white;
  margin: 0.25rem;
  border-radius: 0.15rem;
  padding: 0.2rem;
  gap: 0.1rem;
  
  .stat-item {
    flex: 1;
    text-align: center;
    padding: 0.1rem;
    border-left: 1px solid #f0f0f0;
    
    &:last-child {
      border-left: none;
    }
    
    .number {
      font-size: 0.35rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .label {
      font-size: 0.16rem;
      color: #999;
    }
  }
`;

@withRouter
class Bookings extends Component {
  state = {
    activeTab: "upcoming",
    bookings: {
      upcoming: [
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
        }
      ],
      completed: [
        {
          id: 3,
          clinicName: "عيادة الجمال الحديث",
          treatment: "بوتكس الجبهة",
          date: "الإثنين، 10 ديسمبر 2025",
          time: "11:00 صباحاً",
          doctor: "د. أحمد الخالدي",
          status: "completed",
          statusText: "مكتمل",
          price: "800 ر.س",
          emoji: "💆"
        }
      ],
      cancelled: [
        {
          id: 4,
          clinicName: "مركز الأناقة",
          treatment: "ليزر إزالة الشعر",
          date: "الخميس، 5 ديسمبر 2025",
          time: "4:00 مساءً",
          doctor: "د. نورة العتيبي",
          status: "cancelled",
          statusText: "ملغي",
          price: "600 ر.س",
          emoji: "🔬"
        }
      ]
    },
    stats: {
      total: 12,
      upcoming: 2,
      completed: 8,
      cancelled: 2
    }
  };

  renderBookingCard = (booking) => {
    const { activeTab } = this.state;
    
    return (
      <BookingCard key={booking.id}>
        <div className="booking-header">
          <div className="clinic-info">
            <div className="clinic-logo">{booking.emoji}</div>
            <div className="details">
              <div className="clinic-name">{booking.clinicName}</div>
              <div className="treatment">{booking.treatment}</div>
            </div>
          </div>
          <div className={`status ${booking.status}`}>{booking.statusText}</div>
        </div>
        
        <div className="booking-details">
          <div className="detail-row">
            <span className="icon">📅</span>
            <span className="text">{booking.date}</span>
          </div>
          <div className="detail-row">
            <span className="icon">🕐</span>
            <span className="text">{booking.time}</span>
          </div>
          <div className="detail-row">
            <span className="icon">👨‍⚕️</span>
            <span className="text">{booking.doctor}</span>
          </div>
          <div className="detail-row">
            <span className="icon">💰</span>
            <span className="text">{booking.price}</span>
          </div>
        </div>
        
        <div className="booking-actions">
          {activeTab === "upcoming" && (
            <>
              <button className="primary">تعديل الموعد</button>
              <button className="danger">إلغاء</button>
            </>
          )}
          {activeTab === "completed" && (
            <>
              <button className="primary">إضافة تقييم</button>
              <button className="secondary">حجز مرة أخرى</button>
            </>
          )}
          {activeTab === "cancelled" && (
            <button className="primary">إعادة الحجز</button>
          )}
        </div>
      </BookingCard>
    );
  };

  render() {
    const { activeTab, bookings, stats } = this.state;
    const currentBookings = bookings[activeTab] || [];

    return (
      <BookingsContainer>
        <Header>
          <h1>📋 حجوزاتي</h1>
          <p>إدارة مواعيدك بسهولة</p>
        </Header>

        <StatsBar>
          <div className="stat-item">
            <div className="number">{stats.total}</div>
            <div className="label">إجمالي</div>
          </div>
          <div className="stat-item">
            <div className="number">{stats.upcoming}</div>
            <div className="label">قادمة</div>
          </div>
          <div className="stat-item">
            <div className="number">{stats.completed}</div>
            <div className="label">مكتملة</div>
          </div>
        </StatsBar>

        <TabsContainer>
          <Tab 
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => this.setState({ activeTab: "upcoming" })}
          >
            القادمة ({bookings.upcoming.length})
          </Tab>
          <Tab 
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => this.setState({ activeTab: "completed" })}
          >
            المكتملة ({bookings.completed.length})
          </Tab>
          <Tab 
            className={activeTab === "cancelled" ? "active" : ""}
            onClick={() => this.setState({ activeTab: "cancelled" })}
          >
            الملغية ({bookings.cancelled.length})
          </Tab>
        </TabsContainer>

        {currentBookings.length > 0 ? (
          currentBookings.map(this.renderBookingCard)
        ) : (
          <EmptyState>
            <div className="icon">📭</div>
            <h3>لا توجد حجوزات</h3>
            <p>لم تقم بأي حجوزات {activeTab === "upcoming" ? "قادمة" : activeTab === "completed" ? "مكتملة" : "ملغية"} بعد</p>
            <button onClick={() => this.props.history.push("/home")}>
              استكشف العلاجات
            </button>
          </EmptyState>
        )}

        <BottomNav />
      </BookingsContainer>
    );
  }
}

export default Bookings;

