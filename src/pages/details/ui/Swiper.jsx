import React, { Component } from "react";
import { Carousel } from "antd-mobile";

import { Swiperdiv } from "./styled";

export default class Swiper extends Component {
  render() {
    return (
      <Swiperdiv>
        <Carousel
          dots={false}
          swiping={true}
          autoplay={false}
          infinite
          resetAutoplay={false}
        >
          {[
            "https://img2.soyoung.com/tieba/android/post/20200725/4/de34e1c1a65ddc49ac96222baa9b1595.jpg",
            "https://img2.soyoung.com/tieba/android/post/20200725/8/4921c1feac59c32bca475150da75c8c5.jpg",
          ].map((type) => (
            <div className="v-item" key={type}>
              <div
                className="diary-picture-tag"
                style={{ top: "31.1979%", left: "52.3611%" }}
              >
                <div className="point-mask">
                  <div className="point"></div>
                  <div className="line"></div>
                </div>
                <div className="tag-box">
                  <div className="bg"></div>
                  <div className="content">
                    <i className="iconfont icon-tag-diy">+</i>
                    <a href="#;">هذا وصف للصورة</a>
                  </div>
                </div>
              </div>
              <img src={type} alt="" />
            </div>
          ))}
        </Carousel>
        <div className="pagination swiper-pagination swiper-pagination-custom">
          <span className="swiper-pagination-current">1</span>
          <span>|</span>
          <span className="swiper-pagination-total">9</span>
        </div>
      </Swiperdiv>
    );
  }
}
