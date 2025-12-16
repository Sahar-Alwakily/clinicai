import styled from "styled-components";

const Categorydiv = styled.div`
  padding: 0.4rem 0.3rem;
  background: linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%);
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    padding: 0 0.05rem;
    
    h3 {
      font-size: 0.3rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
      letter-spacing: -0.01rem;
    }
    
    .see-all {
      font-size: 0.22rem;
      color: #6366f1;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0.05rem 0.1rem;
      border-radius: 0.08rem;
      
      &:hover {
        color: #4f46e5;
        background: #f0f0ff;
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .am-grid {
    background: transparent;
    
    .am-grid-item {
      padding: 0.1rem;
      
      .am-grid-item-content {
        padding: 0;
        background: transparent;
        border: none;
      }
    }
  }
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.2rem 0.15rem;
    border-radius: 0.16rem;
    width: 100%;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    min-height: 1.2rem;
    
    &:hover {
      background: #ffffff;
      border-color: #e0e7ff;
      transform: translateY(-0.03rem);
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 4px rgba(99, 102, 241, 0.12);
    }
    
    .icon-wrapper {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 0.14rem;
      background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.1rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      
      img {
        width: 0.42rem;
        height: 0.42rem;
        object-fit: contain;
        position: relative;
        z-index: 1;
        filter: brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(1352%) hue-rotate(230deg) brightness(98%) contrast(92%);
      }
    }
    
    &:hover .icon-wrapper {
      background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
      transform: scale(1.08);
      
      &::before {
        opacity: 1;
      }
    }
    
    .category-text {
      display: block;
      text-align: center;
      color: #374151;
      font-size: 0.19rem;
      font-weight: 500;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      word-break: break-word;
      margin-top: 0.05rem;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      letter-spacing: -0.005rem;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.5rem 0.4rem;
    margin-top: 0.25rem;
    border-radius: 0.24rem;
    
    .section-header {
      margin-bottom: 0.35rem;
      padding: 0 0.08rem;
      
      h3 {
        font-size: 0.34rem;
      }
      
      .see-all {
        font-size: 0.24rem;
        padding: 0.06rem 0.12rem;
      }
    }
    
    .am-grid {
      .am-grid-item {
        padding: 0.12rem;
      }
    }
    
    .category-item {
      padding: 0.25rem 0.18rem;
      min-height: 1.35rem;
      border-radius: 0.18rem;
      
      .icon-wrapper {
        width: 0.8rem;
        height: 0.8rem;
        margin-bottom: 0.12rem;
        border-radius: 0.16rem;
        
        img {
          width: 0.48rem;
          height: 0.48rem;
        }
      }
      
      .category-text {
        font-size: 0.21rem;
        margin-top: 0.06rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.35rem 0.25rem;
    margin-top: 0.15rem;
    
    .section-header {
      margin-bottom: 0.25rem;
      
      h3 {
        font-size: 0.28rem;
      }
      
      .see-all {
        font-size: 0.2rem;
        padding: 0.04rem 0.08rem;
      }
    }
    
    .category-item {
      padding: 0.18rem 0.12rem;
      min-height: 1.1rem;
      
      .icon-wrapper {
        width: 0.65rem;
        height: 0.65rem;
        margin-bottom: 0.08rem;
        
        img {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      
      .category-text {
        font-size: 0.18rem;
        margin-top: 0.04rem;
      }
    }
  }
`;

export { Categorydiv };
