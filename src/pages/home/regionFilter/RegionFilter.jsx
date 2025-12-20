import React, { Component } from "react";
import styled from "styled-components";

const RegionFilterContainer = styled.div`
  background: #fff;
  padding: 0.2rem 0.25rem;
  margin-top: 0.15rem;
  direction: rtl;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  .regions-list {
    display: flex;
    gap: 0.12rem;
    white-space: nowrap;
    
    .region-item {
      flex-shrink: 0;
      padding: 0.12rem 0.2rem;
      background: ${props => props.active 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : '#f8f9fa'};
      color: ${props => props.active ? '#fff' : '#666'};
      border-radius: 0.2rem;
      font-size: 0.2rem;
      font-weight: ${props => props.active ? '600' : '500'};
      cursor: pointer;
      transition: all 0.3s ease;
      border: ${props => props.active 
        ? '1px solid #667eea' 
        : '1px solid #e0e0e0'};
      box-shadow: ${props => props.active 
        ? '0 2px 8px rgba(102, 126, 234, 0.2)' 
        : 'none'};
      
      &:hover {
        background: ${props => props.active 
          ? 'linear-gradient(135deg, #5a6ad0 0%, #6a5290 100%)' 
          : '#f0f4ff'};
        border-color: #667eea;
        color: ${props => props.active ? '#fff' : '#667eea'};
        transform: translateY(-0.02rem);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem 0.2rem;
    
    .regions-list .region-item {
      padding: 0.1rem 0.18rem;
      font-size: 0.18rem;
      border-radius: 0.16rem;
    }
  }
`;

class RegionFilter extends Component {
  state = {
    regions: [
      { id: "all", name: "الكل" },
      { id: "nose", name: "الأنف" },
      { id: "lips", name: "الشفاه" },
      { id: "eyes", name: "العيون" },
      { id: "forehead", name: "الجبهة" },
      { id: "cheeks", name: "الخدود" },
      { id: "chin", name: "الذقن" },
      { id: "jawline", name: "الفكين" },
      { id: "neck", name: "الرقبة" }
    ],
    selectedRegion: "all"
  };

  componentDidMount() {
    if (this.props.selectedRegion) {
      this.setState({ selectedRegion: this.props.selectedRegion });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRegion !== this.props.selectedRegion) {
      this.setState({ selectedRegion: this.props.selectedRegion });
    }
  }

  handleRegionClick = (regionId) => {
    this.setState({ selectedRegion: regionId });
    if (this.props.onRegionChange) {
      this.props.onRegionChange(regionId);
    }
  };

  render() {
    const { regions, selectedRegion } = this.state;

    return (
      <RegionFilterContainer>
        <div className="regions-list">
          {regions.map((region) => (
            <div
              key={region.id}
              className="region-item"
              active={selectedRegion === region.id}
              onClick={() => this.handleRegionClick(region.id)}
            >
              {region.name}
            </div>
          ))}
        </div>
      </RegionFilterContainer>
    );
  }
}

export default RegionFilter;

