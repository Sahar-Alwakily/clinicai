import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 1.5rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.5rem 0.3rem 0.8rem;
  color: white;
  text-align: center;
  position: relative;
  
  .settings-btn {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    background: rgba(255,255,255,0.2);
    border: none;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.3rem;
  }
  
  .avatar {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    background: white;
    margin: 0 auto 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  .name {
    font-size: 0.32rem;
    font-weight: 700;
    margin-bottom: 0.08rem;
  }
  
  .email {
    font-size: 0.2rem;
    opacity: 0.9;
  }
  
  .edit-profile {
    margin-top: 0.2rem;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 0.2rem;
    cursor: pointer;
    
    &:hover {
      background: rgba(255,255,255,0.3);
    }
  }
`;

const StatsRow = styled.div`
  display: flex;
  background: white;
  margin: -0.4rem 0.25rem 0.25rem;
  border-radius: 0.15rem;
  padding: 0.25rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: relative;
  z-index: 10;
  
  .stat {
    flex: 1;
    text-align: center;
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
      font-size: 0.18rem;
      color: #999;
      margin-top: 0.05rem;
    }
  }
`;

const Section = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .section-title {
    padding: 0.2rem 0.25rem;
    font-size: 0.24rem;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    gap: 0.12rem;
    
    .icon {
      font-size: 0.3rem;
    }
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.22rem 0.25rem;
  border-bottom: 1px solid #f8f8f8;
  cursor: pointer;
  transition: background 0.2s;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #fafafa;
  }
  
  &:active {
    background: #f5f5f5;
  }
  
  .menu-icon {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.32rem;
    margin-left: 0.2rem;
    
    &.blue { background: #e3f2fd; }
    &.green { background: #e8f5e9; }
    &.purple { background: #f3e5f5; }
    &.orange { background: #fff3e0; }
    &.red { background: #ffebee; }
    &.teal { background: #e0f2f1; }
    &.pink { background: #fce4ec; }
    &.indigo { background: #e8eaf6; }
  }
  
  .menu-content {
    flex: 1;
    
    .title {
      font-size: 0.22rem;
      color: #333;
      font-weight: 500;
    }
    
    .subtitle {
      font-size: 0.18rem;
      color: #999;
      margin-top: 0.03rem;
    }
  }
  
  .arrow {
    color: #ccc;
    font-size: 0.25rem;
  }
  
  .badge {
    background: #f44336;
    color: white;
    font-size: 0.16rem;
    padding: 0.03rem 0.1rem;
    border-radius: 0.2rem;
    margin-left: 0.1rem;
  }
`;

const LogoutButton = styled.div`
  margin: 0.3rem 0.25rem;
  background: white;
  border-radius: 0.15rem;
  padding: 0.2rem;
  text-align: center;
  color: #f44336;
  font-size: 0.24rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  &:hover {
    background: #fff5f5;
  }
`;

const VersionText = styled.div`
  text-align: center;
  padding: 0.2rem;
  color: #ccc;
  font-size: 0.18rem;
`;

@withRouter
class Profile extends Component {
  state = {
    user: {
      name: "سارة أحمد",
      email: "sara.ahmed@email.com",
      avatar: "👩",
      phone: "+966 50 123 4567"
    },
    stats: {
      bookings: 12,
      reviews: 8,
      favorites: 15
    }
  };

  render() {
    const { user, stats } = this.state;

    return (
      <ProfileContainer>
        <ProfileHeader>
          <button className="settings-btn" onClick={() => this.props.history.push("/settings")}>
            ⚙️
          </button>
          <div className="avatar">{user.avatar}</div>
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
          <button className="edit-profile">تعديل الملف الشخصي</button>
        </ProfileHeader>

        <StatsRow>
          <div className="stat">
            <div className="number">{stats.bookings}</div>
            <div className="label">حجوزاتي</div>
          </div>
          <div className="stat">
            <div className="number">{stats.reviews}</div>
            <div className="label">تقييماتي</div>
          </div>
          <div className="stat">
            <div className="number">{stats.favorites}</div>
            <div className="label">المفضلة</div>
          </div>
        </StatsRow>

        {/* الملف الطبي */}
        <Section>
          <div className="section-title">
            <span className="icon">🏥</span>
            الملف الطبي
          </div>
          <MenuItem onClick={() => this.props.history.push("/medical-history")}>
            <div className="menu-icon blue">📋</div>
            <div className="menu-content">
              <div className="title">السجل الطبي</div>
              <div className="subtitle">تاريخك الطبي والعمليات السابقة</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/allergies")}>
            <div className="menu-icon red">⚠️</div>
            <div className="menu-content">
              <div className="title">الحساسية والأدوية</div>
              <div className="subtitle">الحساسيات والأدوية الحالية</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/skin-analysis")}>
            <div className="menu-icon purple">🔬</div>
            <div className="menu-content">
              <div className="title">تحليل البشرة</div>
              <div className="subtitle">نتائج تحليل بشرتك</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
        </Section>

        {/* الحجوزات والمواعيد */}
        <Section>
          <div className="section-title">
            <span className="icon">📅</span>
            الحجوزات والمواعيد
          </div>
          <MenuItem onClick={() => this.props.history.push("/bookings")}>
            <div className="menu-icon green">📆</div>
            <div className="menu-content">
              <div className="title">حجوزاتي</div>
              <div className="subtitle">المواعيد القادمة والسابقة</div>
            </div>
            <span className="badge">2</span>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/reminders")}>
            <div className="menu-icon orange">🔔</div>
            <div className="menu-content">
              <div className="title">التذكيرات</div>
              <div className="subtitle">تذكيرات المواعيد والعلاجات</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
        </Section>

        {/* اهتماماتي */}
        <Section>
          <div className="section-title">
            <span className="icon">💖</span>
            اهتماماتي
          </div>
          <MenuItem onClick={() => this.props.history.push("/favorites")}>
            <div className="menu-icon pink">❤️</div>
            <div className="menu-content">
              <div className="title">المفضلة</div>
              <div className="subtitle">العيادات والعلاجات المحفوظة</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/interests")}>
            <div className="menu-icon teal">✨</div>
            <div className="menu-content">
              <div className="title">اهتماماتي</div>
              <div className="subtitle">العلاجات التي تهمك</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/my-reviews")}>
            <div className="menu-icon orange">⭐</div>
            <div className="menu-content">
              <div className="title">تقييماتي</div>
              <div className="subtitle">التقييمات التي أضفتها</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
        </Section>

        {/* الإعدادات */}
        <Section>
          <div className="section-title">
            <span className="icon">⚙️</span>
            الإعدادات
          </div>
          <MenuItem onClick={() => this.props.history.push("/notifications-settings")}>
            <div className="menu-icon blue">🔔</div>
            <div className="menu-content">
              <div className="title">الإشعارات</div>
              <div className="subtitle">إدارة إشعارات التطبيق</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/privacy")}>
            <div className="menu-icon indigo">🔒</div>
            <div className="menu-content">
              <div className="title">الخصوصية والأمان</div>
              <div className="subtitle">كلمة المرور والتحقق</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/language")}>
            <div className="menu-icon green">🌍</div>
            <div className="menu-content">
              <div className="title">اللغة</div>
              <div className="subtitle">العربية</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/payment-methods")}>
            <div className="menu-icon purple">💳</div>
            <div className="menu-content">
              <div className="title">طرق الدفع</div>
              <div className="subtitle">البطاقات والمحافظ</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
        </Section>

        {/* الدعم والمساعدة */}
        <Section>
          <div className="section-title">
            <span className="icon">💬</span>
            الدعم والمساعدة
          </div>
          <MenuItem onClick={() => this.props.history.push("/help")}>
            <div className="menu-icon blue">❓</div>
            <div className="menu-content">
              <div className="title">مركز المساعدة</div>
              <div className="subtitle">الأسئلة الشائعة</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/contact")}>
            <div className="menu-icon green">📞</div>
            <div className="menu-content">
              <div className="title">تواصل معنا</div>
              <div className="subtitle">الدعم الفني</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/about")}>
            <div className="menu-icon teal">ℹ️</div>
            <div className="menu-content">
              <div className="title">عن التطبيق</div>
              <div className="subtitle">معلومات التطبيق</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
          <MenuItem onClick={() => this.props.history.push("/terms")}>
            <div className="menu-icon orange">📄</div>
            <div className="menu-content">
              <div className="title">الشروط والأحكام</div>
              <div className="subtitle">سياسة الاستخدام</div>
            </div>
            <span className="arrow">‹</span>
          </MenuItem>
        </Section>

        <LogoutButton onClick={() => this.props.history.push("/login")}>
          🚪 تسجيل الخروج
        </LogoutButton>

        <VersionText>
          الإصدار 1.0.0
        </VersionText>

        <BottomNav />
      </ProfileContainer>
    );
  }
}

export default Profile;


