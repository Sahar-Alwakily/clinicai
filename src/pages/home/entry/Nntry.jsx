
import React, { Component } from "react";

import { Nntrydiv } from "./styled";

class Nntry extends Component {
  state = {
    data: [
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/wiki-06085b14f7.png",
        title: "تحليل الوجه",
        subtitle: "اعرفي مشكلتك بدقة",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/hospital-e825185f4d.png",
        title: "مناطق الوجه",
        subtitle: "اختاري المنطقة",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/diary-9600fbed24.png",
        title: "الحلول التجميلية",
        subtitle: "الخيارات المناسبة لك",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/live-19db3052a6.png",
        title: "قبل وبعد",
        subtitle: "نتائج حقيقية",
      },
      {
        icon: "//mstatic.soyoung.com/m/static/fe_m/view/home/img/doctor-5b5ac5d1d3.png",
        title: "الأطباء",
        subtitle: "اختاري بثقة",
      },
      {
        icon: "//static.soyoung.com/sy-pre/wenda-1562123407993.png",
        title: "اسألي طبيب",
        subtitle: "إجابة سريعة",
      },
    ],
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
                  }}
                  key={dataItem.title}
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
