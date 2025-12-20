import React, { Component } from "react";

import { FeedListdiv } from "./styled";

export default class FeedList extends Component {
  render() {
    const data = this.props.data || [];
    const leftColumn = data[0] || [];
    const rightColumn = data[1] || [];
    
    // If no data, show empty state
    if (leftColumn.length === 0 && rightColumn.length === 0) {
      return (
        <FeedListdiv>
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#999',
            fontSize: '0.24rem'
          }}>
            لا توجد بيانات للعرض
          </div>
        </FeedListdiv>
      );
    }
    
    const renderCard = (dataItem) => {
      if (!dataItem || !dataItem.data) return null;
      const imgs = dataItem.data.imgs || {};
      const user = dataItem.data.user || {};
      
      return (
        <div key={dataItem.data.id || Math.random()}>
          <div className="image-wrapper">
            <img
              src={imgs.u || imgs || ''}
              alt={dataItem.data.summary || ''}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <div className="card-content">
            <h3 className="treatment-name">{dataItem.data.treatment_name || dataItem.data.summary || ''}</h3>
            <div className="card-info">
              <div className="doctor-info">
                <img
                  src={user.avatar?.u || user.avatar || ''}
                  alt={user.user_name || ''}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="doctor-details">
                  <span className="doctor-name">{dataItem.data.doctor_name || user.user_name || ''}</span>
                  {dataItem.data.location && (
                    <span className="location">📍 {dataItem.data.location}</span>
                  )}
                </div>
              </div>
              <div className="stats">
                <span className="views">
                  <span className="views-icon">👁️</span>
                  {dataItem.data.view_cnt || 0}
                </span>
                {dataItem.data.price && (
                  <span className="price">{dataItem.data.price} ر.س</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    return (
      <>
        <FeedListdiv>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              width: "50%",
              overflow: "hidden",
              marginRight: "0.18rem",
            }}
          >
            {leftColumn.map(renderCard)}
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              width: "50%",
              overflow: "hidden",
              marginRight: "0px",
            }}
          >
            {rightColumn.map(renderCard)}
          </div>
        </FeedListdiv>
      </>
    );
  }
}
