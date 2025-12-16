import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 0.1rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  .time {
    font-size: 0.16rem;
    font-weight: 600;
    color: #000;
  }
  
  .status-icons {
    display: flex;
    align-items: center;
    gap: 0.08rem;
    
    span {
      font-size: 0.14rem;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.12rem 0.3rem;
    
    .time {
      font-size: 0.18rem;
    }
  }
`;

export const Header = styled.div`
  background: #fff;
  padding: 0.12rem 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.12rem;
  border-bottom: 1px solid #f0f0f0;
  
  @media (min-width: 769px) {
    padding: 0.15rem 0.3rem;
  }
`;

export const HamburgerIcon = styled.div`
  font-size: 0.24rem;
  color: #333;
  cursor: pointer;
  padding: 0.05rem;
  flex-shrink: 0;
  
  @media (min-width: 769px) {
    font-size: 0.28rem;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    padding: 0.08rem 0.3rem 0.08rem 0.12rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.2rem;
    font-size: 0.16rem;
    background: #f8f9fa;
    color: #333;
    
    &::placeholder {
      color: #999;
    }
    
    &:focus {
      outline: none;
      border-color: #EC4899;
      background: #fff;
    }
  }
  
  svg {
    position: absolute;
    left: 0.1rem;
    color: #999;
    width: 0.18rem;
    height: 0.18rem;
  }
  
  @media (min-width: 769px) {
    input {
      padding: 0.1rem 0.35rem 0.1rem 0.15rem;
      font-size: 0.18rem;
    }
    
    svg {
      width: 0.2rem;
      height: 0.2rem;
    }
  }
`;

export const PageTitle = styled.div`
  background: #fff;
  padding: 0.15rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  
  .title-section {
    flex: 1;
    
    h1 {
      font-size: 0.28rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.04rem 0;
    }
  }
  
  @media (min-width: 769px) {
    padding: 0.2rem 0.3rem;
    
    .title-section h1 {
      font-size: 0.32rem;
    }
  }
`;

export const ProductCount = styled.p`
  font-size: 0.16rem;
  color: #666;
  margin: 0;
  
  @media (min-width: 769px) {
    font-size: 0.18rem;
  }
`;

export const SortFilterIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  
  svg {
    width: 0.24rem;
    height: 0.24rem;
    color: #666;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #EC4899;
    }
  }
  
  @media (min-width: 769px) {
    gap: 0.2rem;
    
    svg {
      width: 0.28rem;
      height: 0.28rem;
    }
  }
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.4rem;
  height: 0.4rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  color: #333;
  
  svg {
    width: 0.24rem;
    height: 0.24rem;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: 769px) {
    width: 0.45rem;
    height: 0.45rem;
    
    svg {
      width: 0.28rem;
      height: 0.28rem;
    }
  }
`;

