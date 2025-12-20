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
            <div
              style={{
                height: "0.72rem",
                paddingBottom: imgs.h && imgs.w 
                  ? `${(imgs.h / imgs.w) * 100}%`
                  : "56.25%",
                position: "relative",
              }}
            >
              <img
                src={imgs.u || imgs || ''}
                alt={dataItem.data.summary || ''}
                style={{ 
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          <p>{dataItem.data.summary || ''}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={user.avatar?.u || user.avatar || ''}
                alt={user.user_name || ''}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <i>{user.user_name || ''}</i>
            </div>
            <em>{dataItem.data.view_cnt || 0}</em>
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
