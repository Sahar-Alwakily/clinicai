/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-30 10:58:19
 * @Description:
 */

import styled from "styled-components";

const Bannerdiv = styled.div`
  position: relative;
  margin-top: 0;
  padding: 0;
  padding-top: 1.6rem;
  height: 4.6rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.bgColor || '#667eea'} 0%, ${props => {
      // إنشاء لون أغمق قليلاً للـ gradient
      const color = props.bgColor || '#667eea';
      // تحويل hex إلى rgb
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      // جعل اللون أغمق بنسبة 20%
      const darkerR = Math.max(0, Math.floor(r * 0.8));
      const darkerG = Math.max(0, Math.floor(g * 0.8));
      const darkerB = Math.max(0, Math.floor(b * 0.8));
      return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
    }} 100%);
    z-index: 0;
    transition: background 0.5s ease;
  }
  
  .am-carousel {
    height: 3rem;
    position: relative;
    z-index: 1;
    padding: 0 0.3rem;
  }
  
  .am-carousel-wrap {
    height: 100%;
  }
  
  .am-carousel-wrap-dot {
    bottom: 0.2rem;
    
    span {
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
    }
    
    &.am-carousel-wrap-dot-active span {
      background: #fff;
      width: 0.24rem;
      border-radius: 0.06rem;
    }
  }
`;

const OfferCard = styled.div`
  position: relative;
  height: 3rem;
  border-radius: 0.24rem;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  
  .offer-image {
    width: 100%;
    height: 100%;
    border-radius: 0.24rem;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const OfferContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const OfferBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.26rem;
  font-weight: 700;
  padding: 0.06rem 0.16rem;
  border-radius: 0.16rem;
  margin-bottom: 0.12rem;
  align-self: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (min-width: 769px) {
    font-size: 0.3rem;
    padding: 0.08rem 0.2rem;
  }
`;

const OfferTitle = styled.h3`
  color: #fff;
  font-size: 0.28rem;
  font-weight: 700;
  margin: 0 0 0.08rem 0;
  line-height: 1.3;
  
  @media (min-width: 769px) {
    font-size: 0.32rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.26rem;
  }
`;

const OfferSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.2rem;
  margin: 0;
  line-height: 1.4;
  
  @media (min-width: 769px) {
    font-size: 0.22rem;
    }
  
  @media (max-width: 480px) {
    font-size: 0.18rem;
  }
`;

export { Bannerdiv, OfferCard, OfferContent, OfferBadge, OfferTitle, OfferSubtitle };
