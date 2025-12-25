import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const TrendsContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 1.5rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
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

const Section = styled.div`
  background: white;
  margin: 0.25rem;
  border-radius: 0.2rem;
  padding: 0.3rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    margin-bottom: 0.25rem;
    
    .icon {
      font-size: 0.35rem;
    }
    
    h2 {
      font-size: 0.28rem;
      color: #333;
      margin: 0;
      font-weight: 600;
    }
  }
`;

const TrendingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f9f9f9;
  }
  
  .rank {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.22rem;
    margin-left: 0.2rem;
    
    &.top1 { background: #FFD700; color: #fff; }
    &.top2 { background: #C0C0C0; color: #fff; }
    &.top3 { background: #CD7F32; color: #fff; }
    &.normal { background: #e8e8e8; color: #666; }
  }
  
  .info {
    flex: 1;
    
    .name {
      font-size: 0.24rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.05rem;
    }
    
    .stats {
      font-size: 0.18rem;
      color: #999;
    }
  }
  
  .trend {
    display: flex;
    align-items: center;
    gap: 0.05rem;
    padding: 0.08rem 0.15rem;
    border-radius: 0.3rem;
    font-size: 0.18rem;
    font-weight: 600;
    
    &.up {
      background: #e8f5e9;
      color: #2ecc71;
    }
    
    &.hot {
      background: #fff3e0;
      color: #ff9800;
    }
  }
`;

const DoctorCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  background: #f9f9f9;
  border-radius: 0.15rem;
  margin-bottom: 0.15rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f0f0;
    transform: translateX(-0.05rem);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .avatar {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.35rem;
    margin-left: 0.2rem;
  }
  
  .doctor-info {
    flex: 1;
    
    .name {
      font-size: 0.24rem;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.05rem;
    }
    
    .specialty {
      font-size: 0.18rem;
      color: #666;
      margin-bottom: 0.05rem;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.08rem;
      font-size: 0.18rem;
      
      .stars {
        color: #ffc107;
      }
      
      .count {
        color: #999;
      }
    }
  }
  
  .bookings {
    text-align: center;
    
    .number {
      font-size: 0.28rem;
      color: #2ecc71;
      font-weight: 700;
    }
    
    .label {
      font-size: 0.16rem;
      color: #999;
    }
  }
`;

const NewsCard = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  .image {
    width: 1.5rem;
    height: 1rem;
    border-radius: 0.1rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.4rem;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    
    .title {
      font-size: 0.22rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.08rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .meta {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      font-size: 0.18rem;
      color: #999;
      
      .tag {
        background: #e8f5e9;
        color: #2ecc71;
        padding: 0.03rem 0.1rem;
        border-radius: 0.05rem;
        font-size: 0.16rem;
      }
    }
  }
`;

@withRouter
class Trends extends Component {
  state = {
    trendingTreatments: [
      { id: 1, name: "فيلر الشفاه", stats: "2,450 حجز هذا الشهر", trend: "+45%", isHot: true },
      { id: 2, name: "بوتكس الجبهة", stats: "1,890 حجز هذا الشهر", trend: "+32%" },
      { id: 3, name: "تجميل الأنف", stats: "1,650 حجز هذا الشهر", trend: "+28%" },
      { id: 4, name: "شد الوجه بالخيوط", stats: "1,200 حجز هذا الشهر", trend: "+22%" },
      { id: 5, name: "حقن البلازما للوجه", stats: "980 حجز هذا الشهر", trend: "+18%" },
    ],
    topDoctors: [
      { id: 1, name: "د. أحمد الخالدي", specialty: "جراحة تجميل الوجه", rating: 4.9, reviews: 324, bookings: 156 },
      { id: 2, name: "د. سارة المنصور", specialty: "طب الجلدية والتجميل", rating: 4.8, reviews: 256, bookings: 134 },
      { id: 3, name: "د. محمد العلي", specialty: "جراحة تجميل الأنف", rating: 4.9, reviews: 198, bookings: 112 },
    ],
    news: [
      { id: 1, title: "تقنية جديدة لشد الوجه بدون جراحة تصل للمنطقة", tag: "جديد", date: "منذ ساعتين", emoji: "✨" },
      { id: 2, title: "أفضل 5 علاجات للبشرة في الشتاء ينصح بها الخبراء", tag: "نصائح", date: "منذ 5 ساعات", emoji: "💆" },
      { id: 3, title: "الفيلر vs البوتكس: أيهما أفضل لك؟ دليل شامل", tag: "مقارنة", date: "منذ يوم", emoji: "💉" },
    ]
  };

  render() {
    return (
      <TrendsContainer>
        <Header>
          <h1>🔥 الترندات</h1>
          <p>اكتشف أحدث صيحات التجميل</p>
        </Header>

        {/* العلاجات الأكثر طلباً */}
        <Section>
          <div className="section-title">
            <span className="icon">📈</span>
            <h2>الأكثر طلباً هذا الشهر</h2>
          </div>
          {this.state.trendingTreatments.map((item, index) => (
            <TrendingItem key={item.id}>
              <div className={`rank ${index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : 'normal'}`}>
                {index + 1}
              </div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="stats">{item.stats}</div>
              </div>
              <div className={`trend ${item.isHot ? 'hot' : 'up'}`}>
                {item.isHot && '🔥'} {item.trend}
              </div>
            </TrendingItem>
          ))}
        </Section>

        {/* أطباء مميزون */}
        <Section>
          <div className="section-title">
            <span className="icon">👨‍⚕️</span>
            <h2>أطباء مميزون</h2>
          </div>
          {this.state.topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id}>
              <div className="avatar">👨‍⚕️</div>
              <div className="doctor-info">
                <div className="name">{doctor.name}</div>
                <div className="specialty">{doctor.specialty}</div>
                <div className="rating">
                  <span className="stars">{'⭐'.repeat(Math.floor(doctor.rating))}</span>
                  <span>{doctor.rating}</span>
                  <span className="count">({doctor.reviews} تقييم)</span>
                </div>
              </div>
              <div className="bookings">
                <div className="number">{doctor.bookings}</div>
                <div className="label">حجز</div>
              </div>
            </DoctorCard>
          ))}
        </Section>

        {/* ما الجديد */}
        <Section>
          <div className="section-title">
            <span className="icon">📰</span>
            <h2>ما الجديد في عالم التجميل</h2>
          </div>
          {this.state.news.map((item) => (
            <NewsCard key={item.id}>
              <div className="image">{item.emoji}</div>
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="meta">
                  <span className="tag">{item.tag}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </NewsCard>
          ))}
        </Section>

        <BottomNav />
      </TrendsContainer>
    );
  }
}

export default Trends;























