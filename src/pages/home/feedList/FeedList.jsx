import React, { Component } from "react";

import { FeedListdiv } from "./styled";

export default class FeedList extends Component {
  render() {
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
            {this.props.data[0] &&
              this.props.data[0].map((dataItem) => (
                <div key={dataItem.data.id}>
                  <div
                    style={{
                      height: "0.72rem",
                      paddingBottom: `${
                        (dataItem.data.imgs.h / dataItem.data.imgs.w) * 100
                      }%`,
                    }}
                  >
                    <img
                      src={dataItem.data.imgs.u}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>

                  <p>{dataItem.data.summary}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " space-around",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src={dataItem.data.user.avatar.u}
                        alt=""
                        style={{
                          width: "0.36rem",
                          height: "0.36rem",
                          borderRadius: "50%",
                        }}
                      />
                      <i>{dataItem.data.user.user_name}</i>
                    </div>
                    <em>{dataItem.data.view_cnt}</em>
                  </div>
                </div>
              ))}
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
            {this.props.data[1] &&
              this.props.data[1].map((dataItem) => (
                <div key={dataItem.data.id}>
                  <div
                    style={{
                      height: "0.72rem",
                      paddingBottom: `${
                        (dataItem.data.imgs.h / dataItem.data.imgs.w) * 100
                      }%`,
                    }}
                  >
                    <img
                      src={dataItem.data.imgs.u}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>

                  <p>{dataItem.data.summary}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " space-around",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src={dataItem.data.user.avatar.u}
                        alt=""
                        style={{
                          width: "0.36rem",
                          height: "0.36rem",
                          borderRadius: "50%",
                        }}
                      />
                      <i>{dataItem.data.user.user_name}</i>
                    </div>
                    <em>{dataItem.data.view_cnt}</em>
                  </div>
                </div>
              ))}
          </div>
        </FeedListdiv>
      </>
    );
  }
}
