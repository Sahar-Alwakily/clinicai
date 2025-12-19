import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0.15rem 0 0.2rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  border-top: 1px solid #f0f0f0;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.1rem 0.2rem;
  transition: all 0.2s ease;
  
  &.center-item {
    position: relative;
    top: -0.25rem;
    
    .icon-wrapper {
      width: 1rem;
      height: 1rem;
      background: #e8e8e8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.08rem;
      
      svg {
        width: 0.5rem;
        height: 0.5rem;
        fill: #666;
      }
    }
    
    &.active .icon-wrapper {
      background: #2ecc71;
      
      svg {
        fill: #fff;
      }
    }
  }
  
  svg {
    width: 0.4rem;
    height: 0.4rem;
    fill: #999;
    margin-bottom: 0.06rem;
    transition: all 0.2s ease;
  }
  
  span {
    font-size: 0.2rem;
    color: #999;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  &.active {
    svg {
      fill: #2ecc71;
    }
    
    span {
      color: #2ecc71;
    }
  }
`;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const BookingIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
  </svg>
);

const TrendIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const CategoryIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const BottomNav = ({ history, location }) => {
  const currentPath = location.pathname;
  
  const navItems = [
    { path: "/home", label: "الرئيسية", Icon: HomeIcon },
    { path: "/bookings", label: "حجوزاتي", Icon: BookingIcon },
    { path: "/trends", label: "ترندات", Icon: TrendIcon, isCenter: true },
    { path: "/catalog", label: "الفئات", Icon: CategoryIcon },
    { path: "/profile", label: "حسابي", Icon: ProfileIcon },
  ];
  
  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          className={`${currentPath === item.path ? "active" : ""} ${item.isCenter ? "center-item" : ""}`}
          onClick={() => history.push(item.path)}
        >
          {item.isCenter ? (
            <div className="icon-wrapper">
              <item.Icon />
            </div>
          ) : (
            <item.Icon />
          )}
          <span>{item.label}</span>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default withRouter(BottomNav);






