import styled from "styled-components";

export const CatalogContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
  direction: rtl;
  overflow-x: hidden;
`;

export const CatalogHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.2rem 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.15rem;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  border-bottom: none;
  
  h1 {
    font-size: 0.28rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    flex: 1;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 769px) {
    padding: 0.25rem 0.35rem;
    
    h1 {
      font-size: 0.32rem;
    }
  }
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.45rem;
  height: 0.45rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  
  svg {
    width: 0.24rem;
    height: 0.24rem;
    stroke: #fff;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const CatalogLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 0.7rem);
  gap: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 0.65rem);
    padding: 0.15rem;
    gap: 0.15rem;
  }
`;

export const Sidebar = styled.div`
  width: 2.8rem;
  background: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.2rem 0.15rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0.7rem;
  max-height: calc(100vh - 0.9rem);
  
  &::-webkit-scrollbar {
    width: 0.06rem;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
  }
  
  @media (min-width: 769px) {
    width: 3.2rem;
    padding: 0.25rem 0.2rem;
    top: 0.8rem;
    max-height: calc(100vh - 1rem);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    max-height: 3rem;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.15rem;
    border-radius: 0.15rem;
    
    &::-webkit-scrollbar {
      height: 0.06rem;
      width: auto;
    }
  }
`;

export const SidebarItem = styled.div`
  padding: 0.15rem 0.18rem;
  margin-bottom: 0.1rem;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)'};
  border-radius: 0.15rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.18rem;
  color: ${props => props.active ? '#fff' : '#333'};
  font-weight: ${props => props.active ? '600' : '500'};
  white-space: nowrap;
  border: ${props => props.active 
    ? '1px solid rgba(255, 255, 255, 0.3)' 
    : '1px solid #e0e0e0'};
  text-align: right;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.active 
    ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0.04rem;
    height: 100%;
    background: ${props => props.active 
      ? 'rgba(255, 255, 255, 0.5)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    transform: ${props => props.active ? 'scaleY(1)' : 'scaleY(0)'};
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)'};
    transform: translateX(-0.03rem);
    box-shadow: ${props => props.active 
      ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
      : '0 4px 12px rgba(102, 126, 234, 0.15)'};
    border-color: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : '#667eea'};
    
    &::before {
      transform: scaleY(1);
    }
  }
  
  &:active {
    transform: translateX(-0.01rem) scale(0.98);
  }
  
  @media (min-width: 769px) {
    font-size: 0.2rem;
    padding: 0.18rem 0.2rem;
    margin-bottom: 0.12rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.16rem;
    padding: 0.12rem 0.15rem;
    margin-bottom: 0;
    margin-left: 0.1rem;
    min-width: fit-content;
    flex-shrink: 0;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: transparent;
  padding: 0.2rem;
  border-radius: 0.2rem;
  
  &::-webkit-scrollbar {
    width: 0.06rem;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0.1rem;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
  }
  
  @media (min-width: 769px) {
    padding: 0.3rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.15rem;
    margin-left: 0;
  }
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
  gap: 0.15rem;
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(1.8rem, 1fr));
    gap: 0.2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(1.3rem, 1fr));
    gap: 0.12rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(1.1rem, 1fr));
    gap: 0.1rem;
  }
`;

export const ServiceCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 0.18rem;
  padding: 0.2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 1.6rem;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
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
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-0.05rem) scale(1.02);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
    border-color: #667eea;
    background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      width: 200%;
      height: 200%;
    }
    
    .service-icon {
      transform: scale(1.1) rotate(5deg);
    }
    
    .service-name {
      color: #667eea;
    }
  }
  
  &:active {
    transform: translateY(-0.02rem) scale(1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
  
  .service-name {
    font-size: 0.16rem;
    font-weight: 600;
    color: #2d3748;
    margin-top: 0.1rem;
    line-height: 1.4;
    word-break: break-word;
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }
  
  @media (min-width: 769px) {
    padding: 0.25rem;
    border-radius: 0.2rem;
    min-height: 1.8rem;
    
    .service-name {
      font-size: 0.18rem;
      margin-top: 0.12rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    min-height: 1.4rem;
    border-radius: 0.15rem;
    
    .service-name {
      font-size: 0.14rem;
      margin-top: 0.08rem;
    }
  }
`;

export const ServiceIcon = styled.div`
  font-size: 0.5rem;
  margin-bottom: 0.08rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  @media (min-width: 769px) {
    font-size: 0.6rem;
    margin-bottom: 0.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.4rem;
    margin-bottom: 0.06rem;
  }
`;
