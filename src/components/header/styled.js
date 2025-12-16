/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 14:39:30
 * @Description:
 */

import styled from "styled-components";

const Headdiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 0.9rem;
  z-index: 999;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f0f0f0;
  
  .nav-bar {
    width: 100%;
    position: relative;
    height: 0.9rem;
    
    .history-back {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      text-decoration: none;
      z-index: 1;
      font-size: 0.28rem;
      padding: 0.1rem 0.2rem;
      color: #EC4899;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      
      &:hover {
        background: rgba(251, 207, 232, 0.2);
        transform: translateY(-50%) scale(1.1);
      }
      
      &:active {
        transform: translateY(-50%) scale(0.95);
      }
    }
  }
  
  .text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: #374151;
    font-size: 0.28rem;
    background-color: #fff;
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .inner {
      text-align: center;
      padding: 0 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      color: #BE185D;
      background: linear-gradient(135deg, #EC4899, #F472B6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .one-x {
      background: #f0f0f0;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
    }
  }
  
  @media (min-width: 769px) {
    line-height: 1rem;
    
    .nav-bar {
      height: 1rem;
      
      .history-back {
        font-size: 0.32rem;
        padding: 0.12rem 0.24rem;
      }
    }
    
    .text {
      height: 1rem;
      font-size: 0.32rem;
    }
  }
`;

export { Headdiv };
