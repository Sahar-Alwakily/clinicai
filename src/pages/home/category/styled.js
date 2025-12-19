import styled from "styled-components";

const Categorydiv = styled.div`
  padding: 0.15rem 0.2rem;
  background: #fff;
  margin-top: 0.15rem;
  direction: rtl;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.15rem;
    padding: 0.05rem 0;
    width: 100%;
  }
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.15rem 0.1rem;
    border-radius: 0.15rem;
    background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
    border: 1px solid #f0f0f5;
    position: relative;
    overflow: hidden;
    width: 100%;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 0.02rem;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-0.03rem);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.12);
      border-color: #667eea;
      background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);
      
      &::before {
        transform: scaleX(1);
      }
      
      .icon-wrapper {
        transform: scale(1.08);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
      }
      
      .category-text {
        color: #667eea;
      }
    }
    
    &:active {
      transform: translateY(-0.01rem);
    }
    
    .icon-wrapper {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.08rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      position: relative;
      z-index: 1;
      
      img {
        width: 0.5rem;
        height: 0.5rem;
        object-fit: cover;
        border-radius: 50%;
      }
      
      .see-all-icon {
        font-size: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
    
    .category-text {
      display: block;
      text-align: center;
      color: #2d3748;
      font-size: 0.16rem;
      font-weight: 500;
      line-height: 1.3;
      margin-top: 0.03rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-wrap: break-word;
      max-width: 100%;
      transition: color 0.3s ease;
      position: relative;
      z-index: 1;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.18rem 0.25rem;
    margin-top: 0.18rem;
    
    .categories-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 0.18rem;
      padding: 0.06rem 0;
    }
    
    .category-item {
      padding: 0.18rem 0.12rem;
      border-radius: 0.18rem;
      
      .icon-wrapper {
        width: 0.8rem;
        height: 0.8rem;
        margin-bottom: 0.1rem;
        
        img {
          width: 0.55rem;
          height: 0.55rem;
        }
        
        .see-all-icon {
          font-size: 0.45rem;
        }
      }
      
      .category-text {
        font-size: 0.17rem;
        margin-top: 0.04rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem 0.15rem;
    margin-top: 0.12rem;
    
    .categories-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 0.12rem;
      padding: 0.04rem 0;
    }
    
    .category-item {
      padding: 0.12rem 0.08rem;
      border-radius: 0.12rem;
      
      .icon-wrapper {
        width: 0.7rem;
        height: 0.7rem;
        margin-bottom: 0.06rem;
        
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
        
        .see-all-icon {
          font-size: 0.35rem;
        }
      }
      
      .category-text {
        font-size: 0.15rem;
        margin-top: 0.02rem;
      }
    }
  }
`;

export { Categorydiv };
