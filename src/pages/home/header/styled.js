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
  z-index: 10;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease;
  
  @media (max-width: 480px) {
    top: ${props => props.hasNotification ? "0.45rem" : "0"};
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.15rem 0.25rem 0.25rem;
  box-sizing: border-box;
  
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 6rem;
  max-height: 80vh;
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 201;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
  overflow: hidden;
  
  @keyframes slideUp {
    from {
      transform: translate(-50%, -40%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
  
  .notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.25rem;
    border-bottom: 1px solid #f0f0f0;
    
    h3 {
      margin: 0;
      font-size: 0.24rem;
      font-weight: 600;
      color: #333;
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
        color: #999;
        font-size: 0.2rem;
      }
      
      &:hover {
        .am-icon {
          color: #333;
        }
      }
    }
  }
  
  .notification-items {
    flex: 1;
    overflow-y: auto;
    padding: 0.1rem 0;
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
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
    width: 95%;
    max-width: none;
    max-height: 70vh;
    
    .notification-header {
      padding: 0.15rem 0.2rem;
      
      h3 {
        font-size: 0.22rem;
      }
    }
  }
`;

const NotificationListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.15rem 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.unread ? '#f8f9ff' : '#fff'};
  border-right: ${props => props.unread ? '3px solid #EC4899' : '3px solid transparent'};
  position: relative;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:active {
    background: #f0f0f0;
  }
  
  .notification-icon {
    flex-shrink: 0;
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => 
      props.notifType === "offer" ? "rgba(236, 72, 153, 0.1)" :
      props.notifType === "success" ? "rgba(34, 197, 94, 0.1)" :
      props.notifType === "reminder" ? "rgba(251, 191, 36, 0.1)" :
      "rgba(102, 126, 234, 0.1)"
    };
    border-radius: 50%;
    
    .am-icon {
      color: ${props => 
        props.notifType === "offer" ? "#EC4899" :
        props.notifType === "success" ? "#22c55e" :
        props.notifType === "reminder" ? "#fbbf24" :
        "#667eea"
      };
      font-size: 0.2rem;
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
      font-size: 0.18rem;
      color: #333;
      line-height: 1.4;
      font-weight: ${props => props.unread ? '600' : '400'};
    }
    
    .notification-time {
      font-size: 0.14rem;
      color: #999;
    }
  }
  
  .unread-dot {
    position: absolute;
    top: 0.15rem;
    left: 0.15rem;
    width: 0.12rem;
    height: 0.12rem;
    background: #EC4899;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem 0.2rem;
    gap: 0.12rem;
    
    .notification-icon {
      width: 0.35rem;
      height: 0.35rem;
      
      .am-icon {
        font-size: 0.18rem;
      }
    }
    
    .notification-content {
      .notification-text {
        font-size: 0.16rem;
      }
      
      .notification-time {
        font-size: 0.12rem;
      }
    }
    
    .unread-dot {
      width: 0.1rem;
      height: 0.1rem;
      top: 0.12rem;
      left: 0.12rem;
    }
  }
`;

export { Header, Topbar, HeaderContent, Greeting, UserInfo, NotificationIcon, SearchSection, SearchBar, DownloadBtn, NotificationBar, NotificationList, NotificationListItem, NotificationOverlay };
