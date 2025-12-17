/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 16:23:03
 * @Description:
 */

import styled from "styled-components";

const Filtergroupdiv = styled.div`
  position: sticky;
  top: 0.9rem;
  width: 100%;
  z-index: 99;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #f0f0f0;
  
  @media (min-width: 769px) {
    top: 1rem;
  }
  
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.12rem 0.2rem;
    gap: 0.1rem;
    
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.06rem;
      font-size: 0.22rem;
      color: #666;
      line-height: 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      padding: 0.08rem 0.12rem;
      border-radius: 0.08rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(251, 207, 232, 0.1);
        color: #EC4899;
      }
      
      .am-icon {
        font-size: 0.18rem;
        color: #999;
      }
      
      .one-y {
        display: none !important;
      }
    }
    
    .line {
      width: 1px;
      height: 0.3rem;
      background: #e0e0e0;
      flex-shrink: 0;
    }
    
    .one-x {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #f0f0f0;
    }
  }
  
  .secondary-filters {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.15rem;
    gap: 0.08rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    border-bottom: 1px solid #f0f0f0;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    .filter-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 0.04rem;
      padding: 0.06rem 0.1rem;
      background: #f8f9fa;
      border-radius: 0.06rem;
      font-size: 0.18rem;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      
      &:hover {
        background: rgba(251, 207, 232, 0.2);
        color: #EC4899;
      }
      
      .am-icon {
        font-size: 0.14rem;
        color: #999;
      }
    }
  }
  
  @media (min-width: 769px) {
    top: 1rem;
    
    .inner {
      padding: 0.15rem 0.3rem;
      border-bottom: 1px solid #f0f0f0;
      
      .item {
        font-size: 0.22rem;
        padding: 0.1rem 0.15rem;
      }
    }
    
    .secondary-filters {
      padding: 0.12rem 0.2rem;
      gap: 0.1rem;
      
      .filter-item {
        font-size: 0.2rem;
        padding: 0.08rem 0.12rem;
      }
    }
  }
`;

const Productlistdiv = styled.div`
  background: #f5f7fa;
  padding: 0.2rem;
  flex: 1;
  overflow-y: auto;
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  .product-card {
    background: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: translateY(-2px);
    }
    
    .image-container {
      position: relative;
      width: 100%;
      height: 2.2rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }
      
      &:hover img {
        transform: scale(1.05);
      }
      
      .favorite-icon {
        position: absolute;
        top: 0.12rem;
        right: 0.12rem;
        width: 0.45rem;
        height: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        
        svg {
          width: 0.22rem;
          height: 0.22rem;
        }
        
        &:hover {
          background: #fff;
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
          transform: scale(0.95);
        }
      }
      
      .discount-badge {
        position: absolute;
        top: 0.12rem;
        left: 0.12rem;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
        color: white;
        padding: 0.06rem 0.12rem;
        border-radius: 0.08rem;
        font-size: 0.16rem;
        font-weight: 700;
      }
    }
    
    .product-info {
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      flex: 1;
      
      .brand {
        display: flex;
        align-items: center;
        gap: 0.08rem;
        
        .brand-icon {
          width: 0.3rem;
          height: 0.3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.16rem;
        }
        
        .brand-name {
          font-size: 0.18rem;
          color: #888;
          font-weight: 500;
        }
      }
      
      .title {
        font-size: 0.22rem;
        color: #333;
        font-weight: 600;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .rating {
        display: flex;
        align-items: center;
        gap: 0.08rem;
        
        .stars {
          color: #ffc107;
          font-size: 0.18rem;
        }
        
        .count {
          font-size: 0.16rem;
          color: #999;
        }
      }
      
      .price-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 0.1rem;
        border-top: 1px solid #f0f0f0;
        
        .price {
          display: flex;
          align-items: baseline;
          gap: 0.04rem;
          
          .currency {
            font-size: 0.16rem;
            color: #EC4899;
            font-weight: 600;
          }
          
          .amount {
            font-size: 0.28rem;
            color: #EC4899;
            font-weight: 700;
          }
          
          .old-price {
            font-size: 0.16rem;
            color: #bbb;
            text-decoration: line-through;
            margin-right: 0.08rem;
          }
        }
      }
      
      .book-button {
        background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%);
        color: #fff;
        border: none;
        border-radius: 0.12rem;
        padding: 0.15rem;
        font-size: 0.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        margin-top: 0.12rem;
        box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        
        &:hover {
          background: linear-gradient(135deg, #DB2777 0%, #EC4899 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    
    .product-grid {
      gap: 0.15rem;
    }
    
    .product-card {
      border-radius: 0.15rem;
      
      .image-container {
        height: 1.8rem;
        
        .favorite-icon {
          width: 0.4rem;
          height: 0.4rem;
          top: 0.1rem;
          right: 0.1rem;
          
          svg {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
      }
      
      .product-info {
        padding: 0.15rem;
        
        .brand .brand-name {
          font-size: 0.16rem;
        }
        
        .title {
          font-size: 0.2rem;
        }
        
        .price-row .price {
          .currency {
            font-size: 0.14rem;
          }
          
          .amount {
            font-size: 0.24rem;
          }
        }
        
        .book-button {
          padding: 0.12rem;
          font-size: 0.18rem;
        }
      }
    }
  }
`;

const CityModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .modal-content {
    background: #fff;
    border-radius: 0.2rem;
    width: 90%;
    max-width: 6rem;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.3s ease;
    
    @keyframes slideUp {
      from {
        transform: translateY(50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .modal-header {
      padding: 0.2rem;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h3 {
        margin: 0;
        font-size: 0.24rem;
        font-weight: 600;
        color: #333;
      }
      
      .close-btn {
        background: transparent;
        border: none;
        font-size: 0.24rem;
        color: #999;
        cursor: pointer;
        padding: 0.05rem;
        width: 0.3rem;
        height: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
        
        &:hover {
          background: #f5f5f5;
          color: #333;
        }
      }
    }
  }
`;

const CityList = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: 0.1rem;
`;

const CityItem = styled.div`
  padding: 0.12rem 0.2rem;
  margin: 0.05rem 0;
  background: ${props => props.active ? 'rgba(236, 72, 153, 0.1)' : '#fff'};
  border-radius: 0.08rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.2rem;
  color: ${props => props.active ? '#EC4899' : '#333'};
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.active ? 'rgba(236, 72, 153, 0.3)' : 'transparent'};
  
  &:hover {
    background: rgba(251, 207, 232, 0.2);
    border-color: rgba(236, 72, 153, 0.3);
  }
  
  .check {
    color: #EC4899;
    font-weight: 700;
    font-size: 0.18rem;
          }
  
  @media (min-width: 769px) {
    font-size: 0.22rem;
    padding: 0.14rem 0.22rem;
  }
`;

export { Filtergroupdiv, Productlistdiv, CityModal, CityList, CityItem };




