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

const TrackingAlert = styled.div`
  background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
  margin: 0.25rem;
  border-radius: 0.15rem;
  padding: 0.25rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  .alert-header {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    margin-bottom: 0.12rem;
    
    .icon {
      font-size: 0.35rem;
      animation: pulse 2s infinite;
    }
    
    .title {
      font-size: 0.24rem;
      font-weight: 600;
    }
    
    .badge {
      background: rgba(255,255,255,0.3);
      padding: 0.05rem 0.12rem;
      border-radius: 0.2rem;
      font-size: 0.16rem;
      margin-right: auto;
    }
  }
  
  .alert-content {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    
    .treatment-info {
      flex: 1;
      
      .treatment-name {
        font-size: 0.2rem;
        opacity: 0.95;
      }
      
      .days-left {
        font-size: 0.18rem;
        opacity: 0.8;
        margin-top: 0.05rem;
      }
    }
    
    .action-btn {
      background: white;
      color: #ff6b6b;
      border: none;
      padding: 0.12rem 0.2rem;
      border-radius: 0.3rem;
      font-size: 0.18rem;
      font-weight: 600;
      cursor: pointer;
      
      &:hover {
        background: #fff5f5;
      }
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const TrackingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 0.3rem;
  
  .modal-content {
    background: white;
    border-radius: 0.2rem;
    width: 100%;
    max-width: 6rem;
    max-height: 85vh;
    overflow-y: auto;
    
    .modal-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0.3rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      h2 {
        font-size: 0.28rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.1rem;
      }
      
      .close-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        font-size: 0.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    .modal-body {
      padding: 0.3rem;
    }
  }
`;

const TrackingSection = styled.div`
  margin-bottom: 0.3rem;
  
  .section-title {
    font-size: 0.22rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.15rem;
    display: flex;
    align-items: center;
    gap: 0.1rem;
  }
`;

const QuestionCard = styled.div`
  background: #f9f9f9;
  border-radius: 0.12rem;
  padding: 0.2rem;
  margin-bottom: 0.15rem;
  
  .question {
    font-size: 0.2rem;
    color: #333;
    margin-bottom: 0.15rem;
  }
  
  .options {
    display: flex;
    gap: 0.1rem;
    flex-wrap: wrap;
    
    .option {
      padding: 0.1rem 0.2rem;
      border-radius: 0.3rem;
      font-size: 0.18rem;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid #e0e0e0;
      background: white;
      
      &:hover {
        border-color: #667eea;
      }
      
      &.selected {
        background: #667eea;
        color: white;
        border-color: #667eea;
      }
      
      &.danger {
        &.selected {
          background: #f44336;
          border-color: #f44336;
        }
      }
      
      &.warning {
        &.selected {
          background: #ff9800;
          border-color: #ff9800;
        }
      }
      
      &.success {
        &.selected {
          background: #4caf50;
          border-color: #4caf50;
        }
      }
    }
  }
`;

const PhotoUpload = styled.div`
  border: 2px dashed #ddd;
  border-radius: 0.15rem;
  padding: 0.3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
  
  .upload-icon {
    font-size: 0.6rem;
    margin-bottom: 0.1rem;
  }
  
  .upload-text {
    font-size: 0.2rem;
    color: #666;
  }
  
  .upload-hint {
    font-size: 0.16rem;
    color: #999;
    margin-top: 0.05rem;
  }
  
  .uploaded-photos {
    display: flex;
    gap: 0.15rem;
    flex-wrap: wrap;
    margin-top: 0.2rem;
    justify-content: center;
    
    .photo-item {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.1rem;
      background: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.5rem;
      position: relative;
      
      .remove-btn {
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        background: #f44336;
        color: white;
        border: none;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        font-size: 0.18rem;
        cursor: pointer;
      }
    }
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.1rem;
  justify-content: center;
  margin: 0.2rem 0;
  
  .star {
    font-size: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 0.1rem;
  padding: 0.15rem;
  font-size: 0.2rem;
  resize: none;
  min-height: 1.2rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.2rem;
  border-radius: 0.1rem;
  font-size: 0.24rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

@withRouter
class Bookings extends Component {
  state = {
    activeTab: "upcoming",
    showTrackingModal: false,
    trackingData: {
      treatment: "ليزر فراكشنال",
      date: "10 ديسمبر 2025",
      daysAfter: 3,
      questions: {
        redness: null,
        irritation: null,
        pain: null,
        pigmentation: null,
        swelling: null
      },
      photos: [],
      rating: 0,
      notes: "",
      doctorMessage: ""
    },
    pendingTracking: [
      {
        id: 1,
        treatment: "ليزر فراكشنال",
        date: "10 ديسمبر 2025",
        daysAfter: 3,
        urgent: true
      }
    ],
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
        },
        {
          id: 6,
          clinicName: "مركز النخبة للتجميل",
          treatment: "ليزر فراكشنال",
          date: (() => {
            const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
            return date.toLocaleDateString('ar-SA', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          })(),
          time: "2:00 مساءً",
          doctor: "د. سارة المنصور",
          status: "completed",
          statusText: "مكتمل",
          price: "1200 ر.س",
          emoji: "✨"
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
      upcoming: 3,
      completed: 9,
      cancelled: 2
    }
  };

  componentDidMount() {
    // حفظ الحجوزات في localStorage لمشاركتها مع Reminders
    this.saveBookingsToStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    // حفظ الحجوزات عند التحديث
    if (prevState.bookings !== this.state.bookings) {
      this.saveBookingsToStorage();
    }
  }

  saveBookingsToStorage = () => {
    // دمج جميع الحجوزات في مصفوفة واحدة
    const allBookings = [
      ...this.state.bookings.upcoming,
      ...this.state.bookings.completed,
      ...this.state.bookings.cancelled
    ];
    
    try {
      localStorage.setItem('userBookings', JSON.stringify(allBookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage:', e);
    }
  };

  handleQuestionAnswer = (question, answer) => {
    this.setState(prev => ({
      trackingData: {
        ...prev.trackingData,
        questions: {
          ...prev.trackingData.questions,
          [question]: answer
        }
      }
    }));
  };

  handleRating = (rating) => {
    this.setState(prev => ({
      trackingData: {
        ...prev.trackingData,
        rating
      }
    }));
  };

  handlePhotoUpload = () => {
    // Simulate photo upload
    this.setState(prev => ({
      trackingData: {
        ...prev.trackingData,
        photos: [...prev.trackingData.photos, { id: Date.now(), emoji: "📸" }]
      }
    }));
  };

  removePhoto = (photoId) => {
    this.setState(prev => ({
      trackingData: {
        ...prev.trackingData,
        photos: prev.trackingData.photos.filter(p => p.id !== photoId)
      }
    }));
  };

  submitTracking = () => {
    alert("تم إرسال تقرير المتابعة إلى الطبيب بنجاح! ✅");
    this.setState({ 
      showTrackingModal: false,
      pendingTracking: []
    });
  };

  renderTrackingModal = () => {
    const { trackingData } = this.state;
    
    return (
      <TrackingModal onClick={() => this.setState({ showTrackingModal: false })}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>📋 تتبع العلاج</h2>
            <button className="close-btn" onClick={() => this.setState({ showTrackingModal: false })}>×</button>
          </div>
          
          <div className="modal-body">
            {/* معلومات العلاج */}
            <TrackingSection>
              <div className="section-title">💉 {trackingData.treatment}</div>
              <p style={{ fontSize: '0.18rem', color: '#666', margin: 0 }}>
                تاريخ الجلسة: {trackingData.date} • اليوم {trackingData.daysAfter} بعد العلاج
              </p>
            </TrackingSection>

            {/* أسئلة المتابعة */}
            <TrackingSection>
              <div className="section-title">❓ كيف حالك بعد العلاج؟</div>
              
              <QuestionCard>
                <div className="question">هل يوجد احمرار في المنطقة المعالجة؟</div>
                <div className="options">
                  <div 
                    className={`option success ${trackingData.questions.redness === 'none' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('redness', 'none')}
                  >لا يوجد</div>
                  <div 
                    className={`option warning ${trackingData.questions.redness === 'mild' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('redness', 'mild')}
                  >خفيف</div>
                  <div 
                    className={`option danger ${trackingData.questions.redness === 'severe' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('redness', 'severe')}
                  >شديد</div>
                </div>
              </QuestionCard>

              <QuestionCard>
                <div className="question">هل تشعرين بتهيج أو حكة؟</div>
                <div className="options">
                  <div 
                    className={`option success ${trackingData.questions.irritation === 'none' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('irritation', 'none')}
                  >لا يوجد</div>
                  <div 
                    className={`option warning ${trackingData.questions.irritation === 'mild' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('irritation', 'mild')}
                  >خفيف</div>
                  <div 
                    className={`option danger ${trackingData.questions.irritation === 'severe' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('irritation', 'severe')}
                  >شديد</div>
                </div>
              </QuestionCard>

              <QuestionCard>
                <div className="question">هل تشعرين بألم؟</div>
                <div className="options">
                  <div 
                    className={`option success ${trackingData.questions.pain === 'none' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pain', 'none')}
                  >لا يوجد</div>
                  <div 
                    className={`option warning ${trackingData.questions.pain === 'mild' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pain', 'mild')}
                  >خفيف</div>
                  <div 
                    className={`option danger ${trackingData.questions.pain === 'severe' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pain', 'severe')}
                  >شديد</div>
                </div>
              </QuestionCard>

              <QuestionCard>
                <div className="question">هل ظهرت تصبغات أو بقع؟</div>
                <div className="options">
                  <div 
                    className={`option success ${trackingData.questions.pigmentation === 'none' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pigmentation', 'none')}
                  >لا يوجد</div>
                  <div 
                    className={`option warning ${trackingData.questions.pigmentation === 'mild' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pigmentation', 'mild')}
                  >خفيف</div>
                  <div 
                    className={`option danger ${trackingData.questions.pigmentation === 'severe' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('pigmentation', 'severe')}
                  >واضح</div>
                </div>
              </QuestionCard>

              <QuestionCard>
                <div className="question">هل يوجد تورم أو انتفاخ؟</div>
                <div className="options">
                  <div 
                    className={`option success ${trackingData.questions.swelling === 'none' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('swelling', 'none')}
                  >لا يوجد</div>
                  <div 
                    className={`option warning ${trackingData.questions.swelling === 'mild' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('swelling', 'mild')}
                  >خفيف</div>
                  <div 
                    className={`option danger ${trackingData.questions.swelling === 'severe' ? 'selected' : ''}`}
                    onClick={() => this.handleQuestionAnswer('swelling', 'severe')}
                  >شديد</div>
                </div>
              </QuestionCard>
            </TrackingSection>

            {/* رفع الصور */}
            <TrackingSection>
              <div className="section-title">📷 صور المنطقة المعالجة</div>
              <PhotoUpload onClick={this.handlePhotoUpload}>
                <div className="upload-icon">📸</div>
                <div className="upload-text">اضغط لالتقاط أو رفع صورة</div>
                <div className="upload-hint">ساعدي الطبيب برؤية حالة بشرتك</div>
                {trackingData.photos.length > 0 && (
                  <div className="uploaded-photos">
                    {trackingData.photos.map(photo => (
                      <div key={photo.id} className="photo-item">
                        {photo.emoji}
                        <button className="remove-btn" onClick={(e) => { e.stopPropagation(); this.removePhoto(photo.id); }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </PhotoUpload>
            </TrackingSection>

            {/* تقييم الجلسة */}
            <TrackingSection>
              <div className="section-title">⭐ تقييم الجلسة</div>
              <RatingStars>
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star}
                    className="star"
                    onClick={() => this.handleRating(star)}
                  >
                    {star <= trackingData.rating ? '⭐' : '☆'}
                  </span>
                ))}
              </RatingStars>
            </TrackingSection>

            {/* ملاحظات إضافية */}
            <TrackingSection>
              <div className="section-title">📝 ملاحظات للطبيب</div>
              <TextArea 
                placeholder="اكتبي أي ملاحظات أو أسئلة للطبيب..."
                value={trackingData.notes}
                onChange={(e) => this.setState(prev => ({
                  trackingData: { ...prev.trackingData, notes: e.target.value }
                }))}
              />
            </TrackingSection>

            <SubmitButton onClick={this.submitTracking}>
              📤 إرسال التقرير للطبيب
            </SubmitButton>
          </div>
        </div>
      </TrackingModal>
    );
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
    const { activeTab, bookings, stats, pendingTracking, showTrackingModal } = this.state;
    const currentBookings = bookings[activeTab] || [];

    return (
      <BookingsContainer>
        <Header>
          <h1>📋 حجوزاتي</h1>
          <p>إدارة مواعيدك بسهولة</p>
        </Header>

        {/* تنبيه تتبع العلاج */}
        {pendingTracking.length > 0 && (
          <TrackingAlert onClick={() => this.setState({ showTrackingModal: true })}>
            <div className="alert-header">
              <span className="icon">🔔</span>
              <span className="title">تتبع العلاج</span>
              <span className="badge">مطلوب</span>
            </div>
            <div className="alert-content">
              <div className="treatment-info">
                <div className="treatment-name">
                  {pendingTracking[0].treatment} - اليوم {pendingTracking[0].daysAfter}
                </div>
                <div className="days-left">
                  أجيبي على الأسئلة وأرسلي صور للطبيب
                </div>
              </div>
              <button className="action-btn">ابدأي الآن</button>
            </div>
          </TrackingAlert>
        )}

        {showTrackingModal && this.renderTrackingModal()}

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

