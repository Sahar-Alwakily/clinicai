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
    
    return (
      <>
        <FeedListdiv>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              width: "50%",
              overflow: "hidden",
              marginRight: " 0.18rem",
            }}
          >
            {leftColumn.map((dataItem) => {
              if (!dataItem || !dataItem.data) return null;
              const imgs = dataItem.data.imgs || {};
              const user = dataItem.data.user || {};
              return (
                <div key={dataItem.data.id || Math.random()}>
                  <div
                    style={{
                      height: "0.72rem",
                      paddingBottom: imgs.h && imgs.w 
                        ? `${(imgs.h / imgs.w) * 100}%`
                        : "56.25%",
                    }}
                  >
                    <img
                      src={imgs.u || imgs || ''}
                      alt=""
                      style={{ width: "100%" }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <p>{dataItem.data.summary || ''}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " space-around",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src={user.avatar?.u || user.avatar || ''}
                        alt=""
                        style={{
                          width: "0.36rem",
                          height: "0.36rem",
                          borderRadius: "50%",
                        }}
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
            })}
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
            {rightColumn.map((dataItem) => {
              if (!dataItem || !dataItem.data) return null;
              const imgs = dataItem.data.imgs || {};
              const user = dataItem.data.user || {};
              return (
                <div key={dataItem.data.id || Math.random()}>
                  <div
                    style={{
                      height: "0.72rem",
                      paddingBottom: imgs.h && imgs.w 
                        ? `${(imgs.h / imgs.w) * 100}%`
                        : "56.25%",
                    }}
                  >
                    <img
                      src={imgs.u || imgs || ''}
                      alt=""
                      style={{ width: "100%" }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <p>{dataItem.data.summary || ''}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " space-around",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src={user.avatar?.u || user.avatar || ''}
                        alt=""
                        style={{
                          width: "0.36rem",
                          height: "0.36rem",
                          borderRadius: "50%",
                        }}
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
            })}
          </div>
        </FeedListdiv>
      </>
    );
  }
}
