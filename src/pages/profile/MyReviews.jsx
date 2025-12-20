import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const ReviewsContainer = styled.div`
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

const ReviewsList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const ReviewCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 0.2rem;
  padding: 0.2rem;
  margin-bottom: 0.15rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1.5px solid #e0e0e0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.03rem;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .review-header {
    display: flex;
    align-items: center;
    gap: 0.12rem;
    margin-bottom: 0.1rem;
    
    .clinic-image {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.1rem;
      overflow: hidden;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .clinic-info {
      flex: 1;
      
      .clinic-name {
        font-size: 0.2rem;
        font-weight: 600;
        color: #2d3748;
      }
      
      .review-date {
        font-size: 0.14rem;
        color: #999;
        margin-top: 0.03rem;
      }
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.05rem;
      font-size: 0.18rem;
    }
  }
  
  .review-content {
    font-size: 0.18rem;
    color: #4a5568;
    line-height: 1.5;
    margin-top: 0.1rem;
  }
  
  &:hover {
    transform: translateY(-0.02rem);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    border-radius: 0.16rem;
    
    .review-header {
      .clinic-image {
        width: 0.4rem;
        height: 0.4rem;
      }
      
      .clinic-info {
        .clinic-name {
          font-size: 0.18rem;
        }
        
        .review-date {
          font-size: 0.12rem;
        }
      }
      
      .rating {
        font-size: 0.16rem;
      }
    }
    
    .review-content {
      font-size: 0.16rem;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
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
class MyReviews extends Component {
  state = {
    reviews: [
      {
        id: 1,
        clinicName: "عيادة الجمال الحديث",
        clinicImage: "https://img2.soyoung.com/origin/20200721/6/daf7ec3daf387fb0857ab8290fa77302_120_120.png",
        rating: 5,
        date: "15 ديسمبر 2024",
        content: "تجربة رائعة! الطاقم محترف والنتائج ممتازة. أنصح بها بشدة."
      },
      {
        id: 2,
        clinicName: "مركز النخبة للتجميل",
        clinicImage: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png",
        rating: 4,
        date: "10 ديسمبر 2024",
        content: "خدمة جيدة والطبيب متخصص. النتائج جيدة لكن الأسعار مرتفعة قليلاً."
      },
      {
        id: 3,
        clinicName: "عيادة الأناقة",
        clinicImage: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png",
        rating: 5,
        date: "5 ديسمبر 2024",
        content: "أفضل عيادة! النظافة ممتازة والخدمة سريعة. سأعود مرة أخرى."
      }
    ]
  };

  render() {
    const { reviews } = this.state;

    return (
      <ReviewsContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>⭐ تقييماتي</h1>
        </Header>

        <ReviewsList>
          {reviews.length === 0 ? (
            <EmptyState>
              <div className="empty-icon">📭</div>
              <div className="empty-text">لا توجد تقييمات</div>
            </EmptyState>
          ) : (
            reviews.map(review => (
              <ReviewCard key={review.id}>
                <div className="review-header">
                  <div className="clinic-image">
                    <img src={review.clinicImage} alt={review.clinicName} />
                  </div>
                  <div className="clinic-info">
                    <div className="clinic-name">{review.clinicName}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                  <div className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ color: i < review.rating ? '#ffc107' : '#ddd' }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <div className="review-content">{review.content}</div>
              </ReviewCard>
            ))
          )}
        </ReviewsList>

        <BottomNav />
      </ReviewsContainer>
    );
  }
}

export default MyReviews;

