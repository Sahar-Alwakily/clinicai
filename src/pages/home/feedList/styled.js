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
  direction: rtl;
  
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    
    > div {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
      border-radius: 0.2rem;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border: 1.5px solid #e0e0e0;
      position: relative;
      
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
        z-index: 1;
      }
      
      &:hover {
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
        transform: translateY(-0.04rem) scale(1.01);
        border-color: #667eea;
        background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
        
        &::before {
          transform: scaleX(1);
        }
        
        img:first-of-type {
          transform: scale(1.05);
        }
      }
      
      &:active {
        transform: translateY(-0.02rem) scale(1);
      }
      
      .image-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        
        img {
          width: 100%;
          display: block;
          transition: transform 0.3s ease;
          object-fit: cover;
        }
      }
      
      p {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        max-height: 0.6rem;
        font-size: 0.22rem;
        line-height: 0.3rem;
        color: #2d3748;
        margin: 0.15rem;
        overflow: hidden;
        font-weight: 600;
        text-overflow: ellipsis;
      }
      
      > div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.12rem 0.15rem;
        border-top: 1px solid #f0f0f0;
        background: rgba(248, 249, 250, 0.5);
        
        > div {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          
          img {
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            object-fit: cover;
          }
          
          i {
            font-size: 0.18rem;
            color: #4a5568;
            font-style: normal;
            font-weight: 500;
          }
        }
        
        em {
          font-size: 0.18rem;
          color: #718096;
          font-style: normal;
          display: flex;
          align-items: center;
          gap: 0.05rem;
          font-weight: 500;
          
          &::before {
            content: '👁️';
            font-size: 0.16rem;
            opacity: 0.7;
          }
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
        border-radius: 0.24rem;
        
        p {
          font-size: 0.24rem;
          line-height: 0.32rem;
          margin: 0.2rem;
          max-height: 0.64rem;
        }
        
        > div:last-child {
          padding: 0.15rem 0.2rem;
          
          > div {
            gap: 0.12rem;
            
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
            
            &::before {
              font-size: 0.18rem;
            }
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
        border-radius: 0.16rem;
        
        p {
          font-size: 0.2rem;
          line-height: 0.28rem;
          margin: 0.12rem;
          max-height: 0.56rem;
        }
        
        > div:last-child {
          padding: 0.1rem 0.12rem;
          
          > div {
            gap: 0.08rem;
            
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
            
            &::before {
              font-size: 0.14rem;
            }
          }
        }
      }
    }
  }
`;

export { FeedListdiv };
