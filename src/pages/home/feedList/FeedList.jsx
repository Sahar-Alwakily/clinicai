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
      
      // Default placeholder image as SVG data URI
      const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Yp9mE2LHYp9mE2YQ8L3RleHQ+PC9zdmc+';
      const placeholderAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI2MCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Yp9mE2YQ8L3RleHQ+PC9zdmc+';
      
      return (
        <div key={dataItem.data.id || Math.random()}>
          <div className="image-wrapper">
            <img
              src={imgs.u || imgs || placeholderImage}
              alt={dataItem.data.summary || ''}
              onError={(e) => {
                // Prevent error from showing in console
                e.preventDefault?.();
                e.stopPropagation?.();
                // Set placeholder image instead of hiding
                if (e.target.src !== placeholderImage) {
                  e.target.src = placeholderImage;
                }
              }}
              onLoad={(e) => {
                // Silently handle load errors
                if (e.target.naturalWidth === 0 || e.target.naturalHeight === 0) {
                  e.target.src = placeholderImage;
                }
              }}
            />
          </div>

          <div className="card-content">
            <h3 className="treatment-name">{dataItem.data.treatment_name || dataItem.data.summary || ''}</h3>
            <div className="card-info">
              <div className="doctor-info">
                <img
                  src={user.avatar?.u || user.avatar || placeholderAvatar}
                  alt={user.user_name || ''}
                  onError={(e) => {
                    // Prevent error from showing in console
                    e.preventDefault?.();
                    e.stopPropagation?.();
                    // Set placeholder avatar instead of hiding
                    if (e.target.src !== placeholderAvatar) {
                      e.target.src = placeholderAvatar;
                    }
                  }}
                  onLoad={(e) => {
                    // Silently handle load errors
                    if (e.target.naturalWidth === 0 || e.target.naturalHeight === 0) {
                      e.target.src = placeholderAvatar;
                    }
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
