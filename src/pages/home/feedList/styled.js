/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-30 19:43:07
 * @Description:
 */

import styled from "styled-components";

const FeedListdiv = styled.div`
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  gap: 0.15rem;
  background: #f8f9fa;
  
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    
    > div {
      background: #fff;
      border-radius: 0.16rem;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
      }
      
      img {
        width: 100%;
        display: block;
        border-radius: 0.16rem 0.16rem 0 0;
      }
      
  p {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
        max-height: 0.6rem;
        font-size: 0.22rem;
        line-height: 0.3rem;
        color: #333;
        margin: 0.15rem;
    overflow: hidden;
        font-weight: 500;
      }
      
      > div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.12rem 0.15rem;
        border-top: 1px solid #f0f0f0;
        
        > div {
          display: flex;
          align-items: center;
          gap: 0.08rem;
          
          img {
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
            border: 1px solid #f0f0f0;
          }
          
          i {
            font-size: 0.18rem;
            color: #666;
            font-style: normal;
          }
        }
        
        em {
          font-size: 0.18rem;
          color: #999;
          font-style: normal;
        }
      }
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.3rem 0.4rem;
    gap: 0.2rem;
    max-width: 1200px;
    margin: 0 auto;
    
    > div {
      gap: 0.2rem;
      
      > div {
        border-radius: 0.2rem;
        
        p {
          font-size: 0.24rem;
          line-height: 0.32rem;
          margin: 0.2rem;
        }
        
        > div:last-child {
          padding: 0.15rem 0.2rem;
          
          > div {
            img {
              width: 0.36rem;
              height: 0.36rem;
            }
            
            i {
              font-size: 0.2rem;
            }
          }
          
          em {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0.15rem;
    gap: 0.12rem;
    
    > div {
      gap: 0.12rem;
      
      > div {
        p {
          font-size: 0.2rem;
          line-height: 0.28rem;
          margin: 0.12rem;
        }
        
        > div:last-child {
          padding: 0.1rem 0.12rem;
          
          > div {
            img {
              width: 0.28rem;
              height: 0.28rem;
            }
            
            i {
              font-size: 0.16rem;
            }
          }
          
          em {
            font-size: 0.16rem;
          }
        }
      }
    }
  }
`;

export { FeedListdiv };
