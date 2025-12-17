import styled from "styled-components";

export const CatalogContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`;

export const CatalogHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding: 0.15rem 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.12rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
  
  h1 {
    font-size: 0.28rem;
    font-weight: 700;
    color: #333;
    margin: 0;
    flex: 1;
    text-align: center;
  }
  
  @media (min-width: 769px) {
    padding: 0.2rem 0.3rem;
    
    h1 {
      font-size: 0.32rem;
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
`;

export const CatalogLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 0.6rem);
  
  @media (max-width: 768px) {
    height: calc(100vh - 0.55rem);
  }
`;

export const Sidebar = styled.div`
  width: 2.5rem;
  background: #e8e8e8;
  overflow-y: auto;
  padding: 0.2rem 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0.6rem;
  bottom: 0;
  height: calc(100vh - 0.6rem);
  z-index: 10;
  
  @media (min-width: 769px) {
    width: 3rem;
    top: 0.7rem;
    height: calc(100vh - 0.7rem);
  }
  
  @media (max-width: 768px) {
    width: 2.2rem;
    top: 0.55rem;
    height: calc(100vh - 0.55rem);
  }
`;

export const SidebarItem = styled.div`
  padding: 0.12rem 0.2rem;
  margin: 0.05rem 0.15rem;
  background: ${props => props.active ? '#fff' : '#f5f5f5'};
  border-radius: 0.08rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.2rem;
  color: #333;
  font-weight: ${props => props.active ? '600' : '400'};
  white-space: nowrap;
  border: ${props => props.active ? '1px solid #ddd' : '1px solid transparent'};
  text-align: right;
  
  &:hover {
    background: #fff;
    border-color: #ddd;
  }
  
  @media (min-width: 769px) {
    font-size: 0.22rem;
    padding: 0.14rem 0.22rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.18rem;
    padding: 0.1rem 0.15rem;
    margin: 0.04rem 0.12rem;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 0.2rem;
  margin-left: 2.5rem;
  
  @media (min-width: 769px) {
    padding: 0.3rem;
    margin-left: 3rem;
  }
  
  @media (max-width: 768px) {
    margin-left: 2.2rem;
  }
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1.2rem, 1fr));
  gap: 0.12rem;
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
    gap: 0.15rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
    gap: 0.1rem;
  }
`;

export const ServiceCard = styled.div`
  background: #fff;
  border-radius: 0.12rem;
  padding: 0.15rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 1.4rem;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .service-name {
    font-size: 0.18rem;
    font-weight: 500;
    color: #333;
    margin-top: 0.08rem;
    line-height: 1.3;
    word-break: break-word;
  }
  
  @media (min-width: 769px) {
    padding: 0.2rem;
    border-radius: 0.14rem;
    min-height: 1.6rem;
    
    .service-name {
      font-size: 0.2rem;
      margin-top: 0.1rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.12rem;
    min-height: 1.2rem;
    
    .service-name {
      font-size: 0.16rem;
      margin-top: 0.06rem;
    }
  }
`;

export const ServiceIcon = styled.div`
  font-size: 0.4rem;
  margin-bottom: 0.05rem;
  
  @media (min-width: 769px) {
    font-size: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.35rem;
  }
`;
