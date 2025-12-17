/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-30 10:58:19
 * @Description:
 */

import styled from "styled-components";

const Bannerdiv = styled.div`
  margin-top: 1.2rem;
  padding: 0 0.3rem;
  height: 3rem;
  
  .am-carousel {
    height: 100%;
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
  background: linear-gradient(135deg, ${props => props.bgColor || '#667eea'} 0%, ${props => props.bgColor || '#764ba2'} 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 0.3rem;
  box-sizing: border-box;
  
  .offer-image {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.2rem;
    overflow: hidden;
    margin-left: 0.3rem;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const OfferContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
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
