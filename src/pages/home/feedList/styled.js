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
      
      .card-content {
        padding: 0.15rem;
        
        .treatment-name {
          font-size: 0.22rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 0.12rem 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 0.6rem;
        }
        
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          
          .doctor-info {
            display: flex;
            align-items: flex-start;
            gap: 0.08rem;
            
            img {
              width: 0.28rem;
              height: 0.28rem;
              border-radius: 50%;
              border: 2px solid #fff;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
              object-fit: cover;
              flex-shrink: 0;
              margin-top: 0.02rem;
            }
            
            .doctor-details {
              display: flex;
              flex-direction: column;
              gap: 0.04rem;
              flex: 1;
              min-width: 0;
              
              .doctor-name {
                font-size: 0.16rem;
                color: #4a5568;
                font-weight: 600;
                line-height: 1.3;
              }
              
              .location {
                font-size: 0.14rem;
                color: #718096;
                font-weight: 400;
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          
          .stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.08rem;
            border-top: 1px solid #f0f0f0;
            
            .views {
              font-size: 0.16rem;
              color: #718096;
              display: flex;
              align-items: center;
              gap: 0.04rem;
              font-weight: 500;
              
              .views-icon {
                font-size: 0.14rem;
                opacity: 0.7;
              }
            }
            
            .price {
              font-size: 0.18rem;
              color: #667eea;
              font-weight: 700;
            }
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
        
        .card-content {
          padding: 0.2rem;
          
          .treatment-name {
            font-size: 0.24rem;
            margin-bottom: 0.15rem;
            min-height: 0.64rem;
          }
          
          .card-info {
            gap: 0.12rem;
            
            .doctor-info {
              gap: 0.1rem;
              
              img {
                width: 0.32rem;
                height: 0.32rem;
              }
              
              .doctor-details {
                gap: 0.05rem;
                
                .doctor-name {
                  font-size: 0.18rem;
                }
                
                .location {
                  font-size: 0.16rem;
                }
              }
            }
            
            .stats {
              padding-top: 0.1rem;
              
              .views {
                font-size: 0.18rem;
                
                .views-icon {
                  font-size: 0.16rem;
                }
              }
              
              .price {
                font-size: 0.2rem;
              }
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
        
        .card-content {
          padding: 0.12rem;
          
          .treatment-name {
            font-size: 0.2rem;
            margin-bottom: 0.1rem;
            min-height: 0.56rem;
          }
          
          .card-info {
            gap: 0.08rem;
            
            .doctor-info {
              gap: 0.06rem;
              
              img {
                width: 0.24rem;
                height: 0.24rem;
              }
              
              .doctor-details {
                gap: 0.03rem;
                
                .doctor-name {
                  font-size: 0.14rem;
                }
                
                .location {
                  font-size: 0.12rem;
                }
              }
            }
            
            .stats {
              padding-top: 0.06rem;
              
              .views {
                font-size: 0.14rem;
                
                .views-icon {
                  font-size: 0.12rem;
                }
              }
              
              .price {
                font-size: 0.16rem;
              }
            }
          }
        }
      }
    }
  }
`;

export { FeedListdiv };
