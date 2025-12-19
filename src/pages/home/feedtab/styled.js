/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 11:09:47
 * @Description:
 */

import styled from "styled-components";

const Feedtabdiv = styled.div`
  position: relative;
  padding: 0.2rem 0.25rem;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  ul {
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    font-size: 0;
    padding: 0;
    margin: 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
    gap: 0.1rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    li {
      flex-shrink: 0;
      list-style: none;
      
      div {
        font-size: 0.24rem;
        font-weight: 500;
        position: relative;
        color: #666;
        margin-left: 0.2rem;
        display: flex;
        padding: 0.15rem 0.2rem;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 0.2rem;
        background: #f8f9fa;
        border: 1px solid transparent;
        min-width: fit-content;
        
        span {
          position: relative;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        &:hover {
          background: #f0f4ff;
          border-color: #e0e7ff;
          transform: translateY(-0.02rem);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
      
      .active {
        font-size: 0.26rem;
        font-weight: 700;
        color: #667eea;
        background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%);
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
        
        span {
          color: #667eea;
        }
      }
      
      .active::after {
        content: "";
        position: absolute;
        height: 0.04rem;
        left: 50%;
        bottom: -0.01rem;
        transform: translateX(-50%);
        width: 70%;
        border-radius: 2rem;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
      }
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.25rem 0.4rem;
    max-width: 1200px;
    margin: 0 auto;
    
    ul {
      gap: 0.12rem;
    }
    
    ul li {
      div {
        font-size: 0.26rem;
        margin-left: 0.3rem;
        padding: 0.18rem 0.24rem;
      }
      
      .active {
        font-size: 0.28rem;
        padding: 0.18rem 0.24rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.18rem 0.2rem;
    
    ul {
      gap: 0.08rem;
    }
    
    ul li {
      div {
        font-size: 0.22rem;
        margin-left: 0.15rem;
        padding: 0.12rem 0.16rem;
      }
      
      .active {
        font-size: 0.24rem;
        padding: 0.12rem 0.16rem;
      }
    }
  }
`;

export { Feedtabdiv };
