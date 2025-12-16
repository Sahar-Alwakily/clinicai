
import React, { Component } from "react";
import { Commentdiv } from "./styled";

export default class Comment extends Component {
  render() {
    return (
      <Commentdiv>
        <div className="comment-wr">
          <div className="comment-head">
            <p className="words">
              التعليقات<span className="small">(43)</span>
            </p>
          </div>
          <div className="photo-comments comments-input-wr">
            <img
              src="//static.soyoung.com/sy-pre/avatar2_100_100-1560846196935.jpeg"
              alt=""
              className="cur-user-avatar"
            />
            <span type="text" className="comment-input">
              التعليقات الصادقة هي الأكثر حباً
            </span>
          </div>
          <div className="comments">
            <div className="comment">
              <div className="user-info clearfix" style={{ padding: "0" }}>
                <div className="avatar-box">
                  <img
                    className="avatar"
                    src="https://img2.soyoung.com/user/20170727/1/20170727080050545_100_100.jpg"
                  />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div className="nameInfo">
                    <div className="name">أحب إيسون</div>
                  </div>
                  <div className="words">
                    <p>😘</p>
                  </div>
                  <div className="relative">
                    <div className="left-border"></div>
                    <div className="replies">
                      <div className="reply">
                        <div className="user-name">
                          gypsy_fJ405
                          <div className="is-author">الكاتب</div>:
                        </div>
                        <span className="content">😘😘😘</span>
                      </div>
                    </div>
                  </div>
                  <div className="status">
                    <div className="left">أمس</div>
                    <div className="right">
                      <span>رد</span>
                      <div className="separator"></div>
                      <div className="heart-box">
                        <i className="dolike heart iconfont icon-heart"></i>❤1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-info clearfix" style={{ padding: "0" }}>
                <div className="avatar-box">
                  <img
                    className="avatar"
                    src="https://img1.soyoung.com/avatar2_100_100.png"
                  />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div className="nameInfo">
                    <div className="name">أوكسجينj24a2</div>
                  </div>
                  <div className="words">
                    <p>ممتع جداً 😄</p>
                  </div>
                  <div className="relative">
                    <div className="left-border"></div>
                    <div className="replies">
                      <div className="reply">
                        <div className="user-name">
                          gypsy_fJ405
                          <div className="is-author">الكاتب</div>:
                        </div>
                        <span className="content">ماذا حدث؟ 😂</span>
                      </div>
                    </div>
                  </div>
                  <div className="status">
                    <div className="left">30 يوليو</div>
                    <div className="right">
                      <span>رد</span>
                      <div className="separator"></div>
                      <div className="heart-box">
                        <i className="dolike heart iconfont icon-heart"></i>❤1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="more-comment">عرض جميع التعليقات الـ43</div>
        </div>
      </Commentdiv>
    );
  }
}
