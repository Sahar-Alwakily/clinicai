import React, { Component } from "react";
import { Grid } from "antd-mobile";
import { withRouter } from "react-router-dom";

import _ from "lodash";

import { Categorydiv } from "./styled";
@withRouter
class Category extends Component {
  state = {
    data: [
      {
        icon:
          "https://img2.soyoung.com/origin/20200721/6/daf7ec3daf387fb0857ab8290fa77302_120_120.png?imageView2/0/format/webp",
        text: `محيط الوجه`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200721/6/b5069cd9a7d5d3b208eb81057175e2ac_120_120.png?imageView2/0/format/webp",
        text: `حمض الهيالورونيك`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200721/7/9a87253568bfb4db9a3d8f19c7b79bc6_120_120.png?imageView2/0/format/webp",
        text: `إزالة التجاعيد وتنحيف الوجه`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png?imageView2/0/format/webp",
        text: `منطقة العين`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200721/3/fa67f15b7512390a00d5037f149d1147_120_120.png?imageView2/0/format/webp",
        text: `منطقة الأنف`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/4/adef799e0114a207e991daac3c1db1dc_120_120.png?imageView2/0/format/webp",
        text: `حشو الدهون`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/9/85256f54946e4bf3d031d0f4fe96a8be_120_120.png?imageView2/0/format/webp",
        text: `التجميل اليومي`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/6/4ea77600e2444d5620a67a3ad1f2e3a8_120_120.png?imageView2/0/format/webp",
        text: `منطقة الصدر`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/1/254348321c151ecebf79e9a35f12bd39_120_120.png?imageView2/0/format/webp",
        text: `تشكيل وتنحيف الجسم`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/5/015621b692ce248101a5ae892197c3ab_120_120.png?imageView2/0/format/webp",
        text: `طب الأسنان`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/7/5ac45a3c400f79ff0f0d1bc455087426_120_120.png?imageView2/0/format/webp",
        text: `مكافحة الشيخوخة وشد البشرة`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png?imageView2/0/format/webp",
        text: `العناية بالبشرة`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/1/b5deda8352d549692fd31c78b79b3438_120_120.png?imageView2/0/format/webp",
        text: `زراعة الشعر والعناية به`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200518/8/b34302ad95addcbc57919b2b68e54c6c_120_120.png?imageView2/0/format/webp",
        text: `المكياج شبه الدائم`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png?imageView2/0/format/webp",
        text: `ترطيب وتفتيح البشرة`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/6/2731d3fed0ca114e027434584fa4e414_120_120.png?imageView2/0/format/webp",
        text: `وجه V الصغير`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/0/37c3f1256707215eeb7912e89f588562_120_120.png?imageView2/0/format/webp",
        text: `جراحة التجميل الخاصة`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200508/7/2c253db9236b6adae1b1c65d2283a8a6_120_120.png?imageView2/0/format/webp",
        text: `جراحة تجميل الشفاه`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200518/5/d5974e20fa0b31b7e98af00cad0f778d_120_120.png?imageView2/0/format/webp",
        text: `إصلاح العمليات الفاشلة`,
      },
      {
        icon:
          "https://img2.soyoung.com/origin/20200518/2/f20c77faa2a1c29afd00a43a25c87324_120_120.png?imageView2/0/format/webp",
        text: `أخرى`,
      },
    ],
  };
  gotoinfo = (name) => {
    return () => {
      this.props.history.push(`/mianbulunkuo:${name}`);
    };
  };
  render() {
    return (
      <>
        <Categorydiv>
          <div className="section-header">
            <h3>الخدمات المتاحة</h3>
            <span className="see-all" onClick={() => this.props.history.push("/catalog")}>عرض الكل</span>
          </div>
          <Grid
            data={this.state.data}
            activeStyle={false}
            columnNum={2}
            isCarousel={false}
            dots={false}
            renderItem={(dataItem) => (
              <div
                className="category-item"
                onClick={this.gotoinfo(dataItem.text)}
              >
                <div className="icon-wrapper">
                  <img
                    src={dataItem.icon}
                    alt={dataItem.text}
                  />
                </div>
                <span className="category-text">{dataItem.text}</span>
              </div>
            )}
          />
        </Categorydiv>
      </>
    );
  }
}

export default Category;