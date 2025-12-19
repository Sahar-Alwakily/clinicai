/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 10:52:49
 * @Description:
 */

import styled from "styled-components";

const Nntrydiv = styled.div`
  padding: 0.2rem;
  background: #fff;
  margin-top: 0.15rem;
  direction: rtl;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  
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
      gap: 0.12rem;
      transition-property: transform, -webkit-transform;
      box-sizing: content-box;
      height: 100%;
      position: relative;
      width: 100%;
      padding: 0.1rem 0;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      li {
        flex-shrink: 0;
        position: relative;
        color: #666;
        text-decoration: none;
        width: 1.7rem;
        height: 1.15rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        border-radius: 0.18rem;
        padding: 0.18rem 0.15rem;
        box-sizing: border-box;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
        background-size: 0.5rem 0.5rem;
        background-position: bottom 0.15rem right 0.15rem;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1.5px solid #f0f0f5;
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
        
        &:hover {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
          transform: translateY(-0.04rem);
          border-color: #667eea;
          background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
          
          &::before {
            transform: scaleX(1);
          }
          
          .title {
            color: #667eea;
          }
        }
        
        &:active {
          transform: translateY(-0.02rem);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        
        .title {
          font-size: 0.2rem;
          font-weight: 600;
          color: #2d3748;
          line-height: 0.28rem;
          margin-bottom: 0.06rem;
          transition: color 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .subtitle {
          font-size: 0.15rem;
          color: #718096;
          line-height: 0.22rem;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.25rem 0.35rem;
    margin-top: 0.2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    
    .swiper-wrapper ul {
      gap: 0.15rem;
      padding: 0.12rem 0;
      
      li {
        width: 1.9rem;
        height: 1.25rem;
        padding: 0.2rem 0.18rem;
        border-radius: 0.2rem;
        background-size: 0.55rem 0.55rem;
        background-position: bottom 0.18rem right 0.18rem;
        
        .title {
          font-size: 0.22rem;
          line-height: 0.3rem;
          margin-bottom: 0.08rem;
        }
        
        .subtitle {
          font-size: 0.16rem;
          line-height: 0.24rem;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    
    .swiper-wrapper ul {
      gap: 0.1rem;
      padding: 0.08rem 0;
      
      li {
        width: 1.5rem;
        height: 1rem;
        padding: 0.14rem 0.12rem;
        border-radius: 0.15rem;
        background-size: 0.45rem 0.45rem;
        background-position: bottom 0.12rem right 0.12rem;
        
        .title {
          font-size: 0.18rem;
          line-height: 0.26rem;
          margin-bottom: 0.05rem;
        }
        
        .subtitle {
          font-size: 0.14rem;
          line-height: 0.2rem;
        }
      }
    }
  }
`;

export { Nntrydiv };
