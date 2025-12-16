import React, { Component } from "react";
import { Previewtextdiv } from "./styled";

export default class Previewtext extends Component {
  render() {
    return (
      <Previewtextdiv>
        <div className="main-user-info clearfix padding-side">
          <div className="pub-usercard">
            <div className="pub-usercard-avatar">
              <img
                alt="avatar"
                src="https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJyGYtE3bqKJ4ty6fu1RqGsicgI1sn4jnibodfdtC8TFfKqZPgFFSiaQIgwL3vv14NcMCvxnnf5ibnapw/132"
              />
            </div>
            <div className="pub-usercard-info">
              <p className="pub-usercard-name">
                <span>gypsy_fJ405</span>
                <em className="level level-5"></em>
              </p>
              <p className="pub-usercard-time">5 مقالات منشورة</p>
            </div>
            <div className="item-btn">
              <div className="item-follow" data-fid="21941947"></div>
            </div>
          </div>
        </div>
      </Previewtextdiv>
    );
  }
}
