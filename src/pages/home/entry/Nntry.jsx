
import React, { Component } from "react";

import { Nntrydiv } from "./styled";

class Nntry extends Component {
  state = {
    data: [
      {
        icon:
          "//mstatic.soyoung.com/m/static/fe_m/view/home/img/wiki-06085b14f7.png",
        title: `موسوعة التجميل`,
        subtitle: `معلومات المشاريع`,
      },
      {
        icon:
          "//mstatic.soyoung.com/m/static/fe_m/view/home/img/diary-9600fbed24.png",
        title: `يوميات الجمال`,
        subtitle: `يوميات الخبراء`,
      },
      {
        icon:
          "//mstatic.soyoung.com/m/static/fe_m/view/home/img/doctor-5b5ac5d1d3.png",
        title: `تصنيف الأطباء`,
        subtitle: `ابحث عن طبيب`,
      },
      {
        icon:
          "//mstatic.soyoung.com/m/static/fe_m/view/home/img/hospital-e825185f4d.png",
        title: `تصنيف المؤسسات`,
        subtitle: `ابحث عن مؤسسة`,
      },
      {
        icon:
          "//mstatic.soyoung.com/m/static/fe_m/view/home/img/live-19db3052a6.png",
        title: `البث المباشر`,
        subtitle: `بث المشاريع`,
      },
      {
        icon: "//static.soyoung.com/sy-pre/wenda-1562123407993.png",
        title: `أسئلة الأطباء`,
        subtitle: `إجابات على الأسئلة`,
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
