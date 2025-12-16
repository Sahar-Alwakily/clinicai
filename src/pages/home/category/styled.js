

import styled from "styled-components";

const Categorydiv = styled.div`
  padding: 0.3rem 0.25rem;
  background: #fff;
  margin-top: 0.15rem;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
    
    h3 {
      font-size: 0.28rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
    
    .see-all {
      font-size: 0.22rem;
      color: #667eea;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        color: #764ba2;
      }
    }
  }
  
  .am-grid {
    .am-grid-item {
      padding: 0.15rem 0.08rem;
      
      .am-grid-item-content {
        padding: 0;
      }
    }
  }
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.12rem;
    border-radius: 0.14rem;
    width: 100%;
    
    &:hover {
      background: #f8f9ff;
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    .icon-wrapper {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.12rem;
      box-shadow: 0 3px 10px rgba(102, 126, 234, 0.25);
      transition: all 0.3s ease;
      flex-shrink: 0;
      
      img {
        width: 0.5rem;
        height: 0.5rem;
        object-fit: contain;
        filter: brightness(0) invert(1);
      }
    }
    
    &:hover .icon-wrapper {
      box-shadow: 0 5px 14px rgba(102, 126, 234, 0.35);
      transform: scale(1.05);
    }
    
    .category-text {
      display: block;
      text-align: center;
      color: #333;
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      word-break: break-word;
      hyphens: auto;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.4rem 0.4rem;
    margin-top: 0.2rem;
    
    .section-header {
      margin-bottom: 0.3rem;
      
      h3 {
        font-size: 0.32rem;
      }
      
      .see-all {
        font-size: 0.24rem;
      }
    }
    
    .am-grid {
      .am-grid-item {
        padding: 0.2rem 0.12rem;
      }
    }
    
    .category-item {
      padding: 0.15rem;
      
      .icon-wrapper {
        width: 0.9rem;
        height: 0.9rem;
        margin-bottom: 0.15rem;
        
        img {
          width: 0.55rem;
          height: 0.55rem;
        }
      }
      
      .category-text {
        font-size: 0.22rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem 0.2rem;
    
    .section-header {
      h3 {
        font-size: 0.26rem;
      }
      
      .see-all {
        font-size: 0.2rem;
      }
    }
    
    .category-item {
      .icon-wrapper {
        width: 0.75rem;
        height: 0.75rem;
        
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
      
      .category-text {
        font-size: 0.18rem;
      }
    }
  }
`;

export { Categorydiv };
