import styled from "styled-components";

const Categorydiv = styled.div`
  padding: 0.4rem 0.3rem;
  background: #fff5f7;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
    width: 100%;
  }
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.15rem 0.1rem;
    border-radius: 0.12rem;
    
    &:hover {
      transform: translateY(-0.02rem);
    }
    
    &:active {
      transform: translateY(0) scale(0.98);
    }
    
    .icon-wrapper {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.1rem;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      
      img {
        width: 0.6rem;
        height: 0.6rem;
        object-fit: cover;
        border-radius: 50%;
      }
      
      .see-all-icon {
        font-size: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
    
    &:hover .icon-wrapper {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      transform: scale(1.05);
    }
    
    .category-text {
      display: block;
      text-align: center;
      color: #333;
      font-size: 0.18rem;
      font-weight: 500;
      line-height: 1.3;
      margin-top: 0.08rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.5rem 0.4rem;
    margin-top: 0.25rem;
    
    .categories-grid {
      gap: 0.3rem;
    }
    
    .category-item {
      padding: 0.2rem 0.15rem;
      
      .icon-wrapper {
        width: 1rem;
        height: 1rem;
        margin-bottom: 0.12rem;
        
        img {
          width: 0.7rem;
          height: 0.7rem;
        }
        
        .see-all-icon {
          font-size: 0.6rem;
        }
      }
      
      .category-text {
        font-size: 0.2rem;
        margin-top: 0.1rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.35rem 0.25rem;
    margin-top: 0.15rem;
    
    .categories-grid {
      grid-template-columns: repeat(5, 1fr);
      gap: 0.2rem;
    }
    
    .category-item {
      padding: 0.12rem 0.08rem;
      
      .icon-wrapper {
        width: 0.85rem;
        height: 0.85rem;
        margin-bottom: 0.08rem;
        
        img {
          width: 0.55rem;
          height: 0.55rem;
        }
        
        .see-all-icon {
          font-size: 0.45rem;
        }
      }
      
      .category-text {
        font-size: 0.16rem;
        margin-top: 0.06rem;
      }
    }
  }
`;

export { Categorydiv };
