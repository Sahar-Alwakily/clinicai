import styled from "styled-components";

export const Citydiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.08rem 0.12rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  min-width: 1.2rem;
  border: 1px solid rgba(251, 207, 232, 0.3);
  backdrop-filter: blur(10px);
  
  &:hover {
    box-shadow: 0 3px 10px rgba(236, 72, 153, 0.15);
    border-color: rgba(236, 72, 153, 0.5);
    transform: translateY(-1px);
  }
  
  .city-display {
    display: flex;
    align-items: center;
    gap: 0.06rem;
    
    .city-name {
      font-weight: 600;
      font-size: 0.22rem;
      color: #374151;
      max-width: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .manual-indicator {
      background: linear-gradient(135deg, #EC4899, #F472B6);
      color: white;
      width: 0.14rem;
      height: 0.14rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.1rem;
      font-weight: bold;
    }
  }
  
  .arrow-icon {
    color: #EC4899;
    transition: transform 0.3s ease;
    font-size: 0.18rem;
  }
  
  &:hover .arrow-icon {
    transform: translateY(1px);
  }
  
  @media (min-width: 769px) {
    padding: 0.1rem 0.14rem;
    min-width: 1.4rem;
    
    .city-display .city-name {
      font-size: 0.24rem;
      max-width: 1.2rem;
    }
  }
`;

export const Citychoicediv = styled.div`
  .city-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 50%, #FDF2F8 100%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
  
  .modal-header {
    background: rgba(255, 255, 255, 0.95);
    padding: 0.15rem 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(236, 72, 153, 0.1);
    border-radius: 0 0 0.16rem 0.16rem;
    backdrop-filter: blur(10px);
    
    .header-left {
      .current-location {
        display: flex;
        align-items: center;
        gap: 0.08rem;
        
        .location-icon {
          color: #EC4899;
          font-size: 0.2rem;
        }
        
        .location-text {
          font-size: 0.22rem;
          font-weight: 600;
          color: #374151;
        }
      }
      
      .location-error {
        color: #EF4444;
        font-size: 0.12rem;
        margin-top: 0.04rem;
      }
    }
    
    .refresh-location {
      background: rgba(251, 207, 232, 0.3);
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(236, 72, 153, 0.2);
      
      .am-icon {
        color: #EC4899;
        font-size: 0.16rem;
      }
      
      &:hover {
        background: linear-gradient(135deg, #EC4899, #F472B6);
        border-color: #EC4899;
        
        .am-icon {
          color: white;
        }
      }
    }
  }
  
  .city-filters {
    display: flex;
    gap: 0.08rem;
    padding: 0.15rem;
    background: rgba(255, 255, 255, 0.9);
    margin: 0.15rem;
    border-radius: 0.12rem;
    box-shadow: 0 2px 8px rgba(236, 72, 153, 0.08);
    backdrop-filter: blur(10px);
    
    .filter-btn {
      flex: 1;
      padding: 0.1rem 0.08rem;
      text-align: center;
      border-radius: 0.08rem;
      background: rgba(251, 207, 232, 0.2);
      color: #6B7280;
      font-weight: 600;
      font-size: 0.18rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      &:hover {
        background: rgba(251, 207, 232, 0.3);
        color: #374151;
      }
      
      &.active {
        background: linear-gradient(135deg, #EC4899, #F472B6);
        color: white;
        border-color: #EC4899;
        box-shadow: 0 2px 6px rgba(236, 72, 153, 0.25);
      }
    }
    
    @media (min-width: 769px) {
      padding: 0.18rem;
      margin: 0.2rem;
      gap: 0.1rem;
      
      .filter-btn {
        padding: 0.12rem 0.1rem;
        font-size: 0.2rem;
      }
    }
  }
  
  .cities-container {
    flex: 1;
    padding: 0 0.15rem 0.15rem;
    overflow-y: auto;
    
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 2.4rem;
      
      .spinner {
        width: 0.4rem;
        height: 0.4rem;
        border: 2px solid rgba(251, 207, 232, 0.3);
        border-top: 2px solid #EC4899;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 0.15rem;
      }
      
      p {
        color: #6B7280;
        font-size: 0.18rem;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  }
  
  .cities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
    gap: 0.1rem;
    
    .city-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 0.12rem;
      padding: 0.14rem 0.12rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(236, 72, 153, 0.08);
      border: 1.5px solid rgba(251, 207, 232, 0.3);
      backdrop-filter: blur(10px);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
        border-color: rgba(236, 72, 153, 0.5);
      }
      
      &.selected {
        border-color: #EC4899;
        background: linear-gradient(135deg, rgba(251, 207, 232, 0.3), rgba(255, 255, 255, 0.9));
        box-shadow: 0 3px 10px rgba(236, 72, 153, 0.2);
        
        .city-card-name {
          color: #EC4899;
          font-weight: 700;
        }
      }
      
      .city-card-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        
        .city-card-name {
          font-size: 0.2rem;
          font-weight: 600;
          color: #374151;
          line-height: 1.4;
        }
      }
    }
    
    @media (min-width: 769px) {
      grid-template-columns: repeat(auto-fill, minmax(1.2rem, 1fr));
      gap: 0.12rem;
      
      .city-card {
        padding: 0.16rem 0.14rem;
        border-radius: 0.14rem;
        
        .city-card-content .city-card-name {
          font-size: 0.22rem;
        }
      }
    }
    
    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(0.9rem, 1fr));
      gap: 0.08rem;
      
      .city-card {
        padding: 0.12rem 0.1rem;
        
        .city-card-content .city-card-name {
          font-size: 0.18rem;
        }
      }
    }
  }
  
  .modal-footer {
    padding: 0.15rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.16rem 0.16rem 0 0;
    box-shadow: 0 -2px 8px rgba(236, 72, 153, 0.1);
    backdrop-filter: blur(10px);
    
    .close-modal-btn {
      width: 100%;
      padding: 0.12rem;
      background: linear-gradient(135deg, #EC4899, #F472B6);
      color: white;
      border: none;
      border-radius: 0.1rem;
      font-size: 0.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(236, 72, 153, 0.25);
      
      &:hover {
        background: linear-gradient(135deg, #DB2777, #EC4899);
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(236, 72, 153, 0.35);
      }
    }
    
    @media (min-width: 769px) {
      padding: 0.18rem;
      
      .close-modal-btn {
        padding: 0.14rem;
        font-size: 0.22rem;
      }
    }
  }
`;
