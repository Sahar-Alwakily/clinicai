/*
 * @Author: heping
 * @Date: 2020-07-29 21:02:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-31 08:45:35
 * @Description:
 */

import styled from "styled-components";

const NotificationBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${props => props.type === "offer" 
    ? "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)" 
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  padding: 0.12rem 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  .notification-logo {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.1rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 0.05rem;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }
    
    @media (max-width: 480px) {
      width: 0.35rem;
      height: 0.35rem;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    flex: 1;
    
    .am-icon {
      color: #fff;
      font-size: 0.22rem;
    }
    
    .notification-text {
      color: #fff;
      font-size: 0.22rem;
      font-weight: 500;
      line-height: 1.4;
    }
  }
  
  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    .am-icon {
      color: #fff;
      font-size: 0.2rem;
      opacity: 0.8;
    }
    
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.1rem 0.2rem;
    
    .notification-content .notification-text {
      font-size: 0.2rem;
    }
  }
`;

const Topbar = styled.div`
  position: fixed;
  top: ${props => props.hasNotification ? "0.5rem" : "0"};
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${props => props.isScrolled 
    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
    : "transparent"};
  box-shadow: ${props => props.isScrolled 
    ? "0 2px 10px rgba(0, 0, 0, 0.1)" 
    : "none"};
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    top: ${props => props.hasNotification ? "0.45rem" : "0"};
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 0.15rem 0.25rem 0.25rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    padding: 0.2rem 0.4rem 0.3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.15rem;
  
  .left-section {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    flex: 1;
  }
  
  .right-section {
    display: flex;
    align-items: center;
    gap: 0.15rem;
  }
  
  @media (min-width: 769px) {
    margin-bottom: 0.2rem;
    gap: 0.2rem;
  }
`;

const Greeting = styled.div`
  color: #fff;
  font-size: 0.26rem;
  font-weight: 600;
  margin-right: 0.15rem;
  white-space: nowrap;
  
  @media (min-width: 769px) {
    font-size: 0.3rem;
    margin-right: 0.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.24rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.12rem;
  
  img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  span {
    color: #fff;
    font-size: 0.22rem;
    font-weight: 500;
  }
  
  @media (min-width: 769px) {
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
    
    span {
      font-size: 0.26rem;
    }
  }
`;

const NotificationIcon = styled.div`
  position: relative;
  width: 0.6rem;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .notification-logo {
    width: 0.35rem;
    height: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }
  }
  
  .am-icon {
    color: #fff;
    font-size: 0.28rem;
  }
  
  .badge {
    position: absolute;
    top: -0.04rem;
    right: -0.04rem;
    background: #ff4757;
    color: #fff;
    font-size: 0.16rem;
    width: 0.26rem;
    height: 0.26rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #667eea;
    font-weight: 600;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  @media (min-width: 769px) {
    width: 0.7rem;
    height: 0.7rem;
    
    .notification-logo {
      width: 0.4rem;
      height: 0.4rem;
    }
    
    .am-icon {
      font-size: 0.32rem;
    }
    
    .badge {
      width: 0.3rem;
      height: 0.3rem;
      font-size: 0.18rem;
    }
  }
`;

const SearchSection = styled.div`
  margin-top: 0.15rem;
  
  @media (min-width: 769px) {
    margin-top: 0.2rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.12rem;
  background: #fff;
  border-radius: 0.4rem;
  padding: 0.15rem 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .am-icon {
    color: #999;
    font-size: 0.24rem;
  }
  
  span {
    color: #999;
    font-size: 0.22rem;
    flex: 1;
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (min-width: 769px) {
    padding: 0.18rem 0.3rem;
    border-radius: 0.5rem;
    
    .am-icon {
      font-size: 0.28rem;
    }
    
    span {
      font-size: 0.26rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem 0.2rem;
    
    span {
      font-size: 0.2rem;
    }
  }
`;

const DownloadBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.08rem 0.24rem;
  background: #72dacf;
  color: #fff;
  font-size: 0.24rem;
  font-weight: 500;
  border-radius: 0.13rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.2rem;
  white-space: nowrap;
  
  &:hover {
    background: #5bc4b8;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(114, 218, 207, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NotificationList = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: #4A90E2;
  z-index: 201;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
  overflow-y: auto;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  .notification-header {
    padding: 0.5rem 0.3rem 0.3rem;
    background: #4A90E2;
    
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.15rem;
      
      h2 {
        margin: 0;
        font-size: 0.48rem;
        font-weight: 700;
        color: #fff;
      }
      
      .filter-btn {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        
        .filter-icon {
          width: 0.24rem;
          height: 0.24rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.02rem;
          
          .dot {
            width: 0.08rem;
            height: 0.08rem;
            background: #fff;
            border-radius: 1px;
          }
        }
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    
    .header-subtitle {
      font-size: 0.22rem;
      color: rgba(255, 255, 255, 0.9);
      
      .highlight {
        color: #fff;
        font-weight: 600;
      }
    }
  }
  
  .notification-content-wrapper {
    flex: 1;
    background: #fff;
    border-radius: 0.3rem 0.3rem 0 0;
    padding: 0.3rem 0.25rem 0.5rem;
    overflow-y: auto;
  }
  
  .notification-section {
    margin-bottom: 0.3rem;
    
    .section-title {
      font-size: 0.24rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.2rem;
      padding: 0 0.1rem;
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    color: #999;
    
    .am-icon {
      font-size: 0.6rem;
      margin-bottom: 0.2rem;
      opacity: 0.5;
    }
    
    p {
      margin: 0;
      font-size: 0.2rem;
    }
  }
  
  @media (max-width: 480px) {
    .notification-header {
      padding: 0.4rem 0.25rem 0.25rem;
      
      .header-top h2 {
        font-size: 0.42rem;
      }
      
      .header-subtitle {
        font-size: 0.2rem;
      }
    }
    
    .notification-content-wrapper {
      padding: 0.25rem 0.2rem 0.4rem;
    }
  }
`;

const NotificationListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.15rem 0.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fff;
  position: relative;
  border-radius: 0.1rem;
  margin-bottom: 0.1rem;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:active {
    background: #f0f0f0;
  }
  
  .status-dot {
    position: absolute;
    right: 0.05rem;
    top: 0.2rem;
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 50%;
    background: ${props => props.unread ? '#ff4757' : '#22c55e'};
    flex-shrink: 0;
  }
  
  .avatar-container {
    position: relative;
    flex-shrink: 0;
    margin-right: 0.12rem;
    
    .avatar {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.35rem;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .avatar-badge {
      position: absolute;
      bottom: -0.02rem;
      right: -0.02rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #fff;
      font-size: 0.12rem;
      
      &.heart {
        background: #ff4757;
        color: #fff;
      }
      
      &.comment {
        background: #4A90E2;
        color: #fff;
      }
      
      &.follow {
        background: #22c55e;
        color: #fff;
      }
      
      &.like {
        background: #ff4757;
        color: #fff;
      }
      
      &.mention {
        background: #4A90E2;
        color: #fff;
      }
    }
  }
  
  .notification-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    
    .notification-text {
      margin: 0;
      font-size: 0.2rem;
      color: #666;
      line-height: 1.5;
      font-weight: 400;
      
      .user-name {
        color: #4A90E2;
        font-weight: 600;
      }
    }
    
    .notification-subtitle {
      font-size: 0.16rem;
      color: #999;
      margin-top: 0.02rem;
    }
  }
  
  .notification-thumbnail {
    flex-shrink: 0;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.08rem;
    overflow: hidden;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .thumbnail-placeholder {
      width: 100%;
      height: 100%;
      background: ${props => 
        props.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.18rem;
      font-weight: 600;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem 0.08rem;
    gap: 0.12rem;
    
    .avatar-container .avatar {
      width: 0.5rem;
      height: 0.5rem;
      font-size: 0.3rem;
    }
    
    .notification-content {
      .notification-text {
        font-size: 0.18rem;
      }
      
      .notification-subtitle {
        font-size: 0.14rem;
      }
    }
    
    .notification-thumbnail {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
`;

export { Header, Topbar, HeaderContent, Greeting, UserInfo, NotificationIcon, SearchSection, SearchBar, DownloadBtn, NotificationBar, NotificationList, NotificationListItem, NotificationOverlay };
