
import React, { Component } from "react";

import { Nntrydiv } from "./styled";

class Nntry extends Component {
  state = {
    data: [

      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/hospital-e825185f4d.png",
        title: "مناطق الوجه",
        subtitle: "اختاري المنطقة",
        topic: "مناطق الوجه",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/diary-9600fbed24.png",
        title: "الحلول التجميلية",
        subtitle: "الخيارات المناسبة لك",
        topic: "الحلول التجميلية",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/live-19db3052a6.png",
        title: "قبل وبعد",
        subtitle: "نتائج حقيقية",
        topic: "قبل وبعد",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/doctor-5b5ac5d1d3.png",
        title: "الأطباء",
        subtitle: "اختاري بثقة",
        topic: "الأطباء",
      },
      {
        icon: "//static.soyoung.com/sy-pre/wenda-1562123407993.png",
        title: "اسألي طبيب",
        subtitle: "إجابة سريعة",
        topic: "اسألي طبيب",
      },
    ],
  };
  
  handleClick = (topic) => {
    if (this.props.onTopicClick) {
      this.props.onTopicClick(topic);
    }
  };
  
  render() {
    return (
      <>
        <Nntrydiv>
          <div className="swiper-wrapper">
            <ul>
              {this.state.data.map((dataItem) => (
                <li
                  data-href="/item"
                  className="jumpWithCityId"
                  style={{
                    background: `url(${dataItem.icon}) no-repeat right bottom`,
                    backgroundSize: "20px 18px",
                    cursor: "pointer",
                  }}
                  key={dataItem.title}
                  onClick={() => this.handleClick(dataItem.topic)}
                >
                  <div className="title">{dataItem.title}</div>
                  <div className="subtitle">{dataItem.subtitle}</div>
                </li>
              ))}
            </ul>
          </div>
        </Nntrydiv>
      </>
    );
  }
}

export default Nntry;
