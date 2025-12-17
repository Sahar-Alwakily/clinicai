import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`;

export const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.3rem 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.15rem;
  
  h1 {
    font-size: 0.32rem;
    font-weight: 700;
    color: white;
    margin: 0;
    flex: 1;
  }
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
  height: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.28rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const SearchBar = styled.div`
  margin: 0.2rem;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 0.15rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  
  .search-icon {
    position: absolute;
    right: 0.2rem;
    font-size: 0.28rem;
    color: #999;
  }
  
  input {
    width: 100%;
    padding: 0.2rem 0.55rem 0.2rem 0.5rem;
    border: none;
    font-size: 0.22rem;
    color: #333;
    background: transparent;
    
    &::placeholder {
      color: #aaa;
    }
    
    &:focus {
      outline: none;
    }
  }
  
  .clear-btn {
    position: absolute;
    left: 0.2rem;
    font-size: 0.22rem;
    color: #999;
    cursor: pointer;
    padding: 0.05rem;
    
    &:hover {
      color: #666;
    }
  }
`;

export const PageTitle = styled.div`
  padding: 0.1rem 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductCount = styled.span`
  font-size: 0.2rem;
  color: #888;
  font-weight: 500;
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 0.12rem;
  padding: 0 0.2rem 0.2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  .filter-tab {
    flex-shrink: 0;
    padding: 0.12rem 0.22rem;
    background: white;
    border-radius: 0.3rem;
    font-size: 0.2rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    white-space: nowrap;
    
    &:hover {
      background: #f0f0f0;
    }
    
    &.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
    }
  }
`;
