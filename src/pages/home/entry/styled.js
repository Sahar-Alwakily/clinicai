/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 10:52:49
 * @Description:
 */

import styled from "styled-components";

const Nntrydiv = styled.div`
  padding: 0.25rem;
  background: #fff;
  margin-top: 0.15rem;
  
  .swiper-wrapper {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    ul {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      transition-duration: 0ms;
      transform: translate3d(0px, 0px, 0px);
      transition-timing-function: ease-out;
      margin: 0;
      z-index: 1;
      display: flex;
      transition-property: transform, -webkit-transform;
      box-sizing: content-box;
      height: 100%;
      position: relative;
      width: 100%;
      padding: 0;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      li {
        flex-shrink: 0;
        position: relative;
        color: #666;
        text-decoration: none;
        width: 1.8rem;
        height: 1.1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border-radius: 0.16rem;
        padding: 0.15rem;
        box-sizing: border-box;
        background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
        background-size: 0.45rem 0.45rem;
        background-position: bottom 0.12rem right 0.12rem;
        background-repeat: no-repeat;
        margin-left: 0.15rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;
        
        &:first-child {
          margin-left: 0;
        }
        
        &:hover {
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
          border-color: #667eea;
        }
        
        &:active {
          transform: translateY(0);
        }
        
        .title {
          font-size: 0.22rem;
          font-weight: 600;
          color: #333;
          line-height: 0.3rem;
          margin-bottom: 0.08rem;
        }
        
        .subtitle {
          font-size: 0.18rem;
          color: #666;
          line-height: 0.26rem;
        }
      }
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.3rem 0.4rem;
    margin-top: 0.2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    
    .swiper-wrapper ul li {
      width: 2rem;
      height: 1.2rem;
      padding: 0.2rem;
      margin-left: 0.2rem;
      border-radius: 0.2rem;
      background-size: 0.55rem 0.55rem;
      background-position: bottom 0.18rem right 0.18rem;
      
      .title {
        font-size: 0.26rem;
        line-height: 0.34rem;
        margin-bottom: 0.1rem;
        }
      
      .subtitle {
        font-size: 0.2rem;
        line-height: 0.28rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0.2rem;
    
    .swiper-wrapper ul li {
      width: 1.6rem;
      height: 1rem;
      padding: 0.12rem;
      margin-left: 0.12rem;
      
      .title {
        font-size: 0.2rem;
        line-height: 0.28rem;
      }
      
      .subtitle {
        font-size: 0.16rem;
        line-height: 0.24rem;
      }
    }
  }
`;

export { Nntrydiv };
