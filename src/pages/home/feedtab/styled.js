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
  padding: 0.25rem 0.25rem 0.15rem;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  
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
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    li {
      flex-shrink: 0;
      list-style: none;
      
      div {
        font-size: 0.22rem;
        font-weight: 500;
        position: relative;
        color: #666;
        margin-left: 0.3rem;
        display: flex;
        padding: 0.12rem 0.16rem;
        box-sizing: border-box;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 0.16rem;
        
        span {
          position: relative;
          transition: all 0.3s ease;
        }
        
        &:hover {
          background: #f8f9ff;
        }
      }
      
      .active {
        font-size: 0.26rem;
        font-weight: 700;
        color: #667eea;
        background: #f8f9ff;
        
        span {
          color: #667eea;
        }
      }
      
      .active::after {
        content: "";
        position: absolute;
        height: 0.05rem;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 60%;
        border-radius: 2rem;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      }
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.3rem 0.4rem 0.2rem;
    max-width: 1200px;
    margin: 0 auto;
    
    ul li {
      div {
        font-size: 0.26rem;
        margin-left: 0.4rem;
        padding: 0.15rem 0.2rem;
      }
      
      .active {
        font-size: 0.3rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0.2rem 0.15rem;
    
    ul li {
      div {
        font-size: 0.2rem;
        margin-left: 0.25rem;
        padding: 0.1rem 0.14rem;
      }
      
      .active {
        font-size: 0.24rem;
      }
    }
  }
`;

export { Feedtabdiv };
