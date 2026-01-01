import React, { Component } from "react";
import { Productlistdiv } from "./styled";
import { getTreatmentImage } from "../../../utils/defaultImages";

export default class Productlist extends Component {
  // بيانات وهمية لخدمات متنوعة
  getDefaultServices = () => {
    return [
      {
        pid: "1",
        title: "إبرة نضارة متقدمة",
        brand: "عيادة الجمال",
        price: 890,
        img_cover: { u: getTreatmentImage(0) }
      },
      {
        pid: "2",
        title: "بوتوكس الجبهة والعينين",
        brand: "مركز التجميل",
        price: 1200,
        img_cover: { u: getTreatmentImage(1) }
      },
      {
        pid: "3",
        title: "فيلر الخدود والوجنتين",
        brand: "عيادة النضارة",
        price: 1500,
        img_cover: { u: getTreatmentImage(2) }
      },
      {
        pid: "4",
        title: "تنظيف البشرة العميق",
        brand: "عيادة العناية",
        price: 450,
        img_cover: { u: getTreatmentImage(3) }
      },
      {
        pid: "5",
        title: "تفتيح البشرة بالجلوتاثيون",
        brand: "مركز التجميل الفاخر",
        price: 1100,
        img_cover: { u: getTreatmentImage(4) }
      },
      {
        pid: "6",
        title: "فيلر الشفاه والأنف",
        brand: "عيادة الجمال المتخصص",
        price: 1800,
        img_cover: { u: getTreatmentImage(5) }
      },
      {
        pid: "7",
        title: "إزالة الهالات السوداء",
        brand: "عيادة العيون",
        price: 950,
        img_cover: { u: getTreatmentImage(1) }
      },
      {
        pid: "8",
        title: "شد الوجه والرقبة",
        brand: "مركز التجميل المتقدم",
        price: 2500,
        img_cover: { u: getTreatmentImage(6) }
      },
      {
        pid: "9",
        title: "حقن وريدي فيتامين C",
        brand: "عيادة النضارة الطبية",
        price: 750,
        img_cover: { u: getTreatmentImage(3) }
      },
      {
        pid: "10",
        title: "ملء الدهون الذاتي للوجه",
        brand: "مركز التجميل الطبيعي",
        price: 2200,
        img_cover: { u: getTreatmentImage(7) }
      },
      {
        pid: "11",
        title: "بوتوكس الشفاه",
        brand: "عيادة الجمال",
        price: 850,
        img_cover: { u: getTreatmentImage(0) }
      },
      {
        pid: "12",
        title: "فيلر تحت العينين",
        brand: "مركز التجميل",
        price: 1300,
        img_cover: { u: getTreatmentImage(1) }
      },
      {
        pid: "13",
        title: "تفتيح منطقة الوجه",
        brand: "عيادة النضارة",
        price: 980,
        img_cover: { u: getTreatmentImage(2) }
      },
      {
        pid: "14",
        title: "شد الجفون",
        brand: "عيادة العناية",
        price: 1600,
        img_cover: { u: getTreatmentImage(3) }
      },
      {
        pid: "15",
        title: "فيلر الذقن",
        brand: "مركز التجميل الفاخر",
        price: 1400,
        img_cover: { u: getTreatmentImage(4) }
      },
      {
        pid: "16",
        title: "إبرة نضارة الذهبية",
        brand: "عيادة الجمال المتخصص",
        price: 1200,
        img_cover: { u: getTreatmentImage(5) }
      },
      {
        pid: "17",
        title: "حقن وريدي جلوتاثيون",
        brand: "عيادة العيون",
        price: 1050,
        img_cover: { u: getTreatmentImage(1) }
      },
      {
        pid: "18",
        title: "ملء الدهون بالهيالورونيك",
        brand: "مركز التجميل المتقدم",
        price: 1900,
        img_cover: { u: getTreatmentImage(6) }
      },
      {
        pid: "19",
        title: "مكياج شبه دائم للشفاه",
        brand: "عيادة النضارة الطبية",
        price: 1100,
        img_cover: { u: getTreatmentImage(3) }
      },
      {
        pid: "20",
        title: "تفتيح منطقة الصدر",
        brand: "مركز التجميل الطبيعي",
        price: 1350,
        img_cover: { u: getTreatmentImage(7) }
      },
      {
        pid: "21",
        title: "بوتوكس الرقبة",
        brand: "عيادة الجمال",
        price: 1150,
        img_cover: { u: getTreatmentImage(0) }
      },
      {
        pid: "22",
        title: "فيلر المعابد",
        brand: "مركز التجميل",
        price: 1250,
        img_cover: { u: getTreatmentImage(1) }
      },
      {
        pid: "23",
        title: "إزالة التجاعيد",
        brand: "عيادة النضارة",
        price: 1650,
        img_cover: { u: getTreatmentImage(2) }
      },
      {
        pid: "24",
        title: "قناع الكولاجين",
        brand: "عيادة العناية",
        price: 550,
        img_cover: { u: getTreatmentImage(3) }
      },
      {
        pid: "25",
        title: "علاج حب الشباب",
        brand: "مركز التجميل الفاخر",
        price: 680,
        img_cover: { u: getTreatmentImage(4) }
      }
    ];
  };

  render() {
    const apiServices = this.props.itemproductlist || [];
    const defaultServices = this.getDefaultServices();
    const allServices = apiServices.length > 0 
      ? [...apiServices, ...defaultServices.slice(0, 5)] 
      : defaultServices;
    
    const favorites = this.props.favorites || [];
    const onToggleFavorite = this.props.onToggleFavorite || (() => {});

    return (
      <Productlistdiv>
        <div className="product-grid">
          {allServices.map((item) => {
            const isFavorite = favorites.includes(item.pid);
            const imageUrl = item.img_cover?.u || item.img_cover || "";
            const brand = item.brand || item.hospital_name || item.doctor_name || "خدمة تجميلية";
            const title = item.title || item.name || "خدمة";
            const price = item.price || item.price_online || 0;

            return (
              <div
                key={item.pid}
                className="product-card"
              >
                <div className="image-container">
                  <img 
                    src={imageUrl || getTreatmentImage(parseInt(item.pid) % 8)} 
                    alt={title}
                    onError={(e) => {
                      e.preventDefault?.();
                      e.stopPropagation?.();
                      if (e.target.src !== getTreatmentImage(parseInt(item.pid) % 8)) {
                        e.target.src = getTreatmentImage(parseInt(item.pid) % 8);
                      }
                    }}
                  />
                  <div 
                    className="favorite-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.pid);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill={isFavorite ? "#EF4444" : "none"} stroke={isFavorite ? "#EF4444" : "#999"}>
                      <path d="M17.3663 3.84172C16.9405 3.41589 16.4352 3.0781 15.8793 2.84763C15.3234 2.61716 14.7279 2.49805 14.1271 2.49805C13.5263 2.49805 12.9308 2.61716 12.3749 2.84763C11.819 3.0781 11.3137 3.41589 10.8879 3.84172L9.99997 4.72964L9.11205 3.84172C8.2562 2.98587 7.09077 2.49849 5.87285 2.49849C4.65493 2.49849 3.4895 2.98587 2.63365 3.84172C1.7778 4.69757 1.29041 5.863 1.29041 7.08092C1.29041 8.29884 1.7778 9.46427 2.63365 10.3201L3.52157 11.208L9.99997 17.6864L16.4784 11.208L17.3663 10.3201C17.7921 9.8943 18.1299 9.38899 18.3604 8.83308C18.5909 8.27717 18.71 7.68167 18.71 7.08092C18.71 6.48017 18.5909 5.88467 18.3604 5.32876C18.1299 4.77285 17.7921 4.26754 17.3663 3.84172Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {price > 1000 && <div className="discount-badge">-15%</div>}
                </div>
                <div className="product-info">
                  <div className="brand">
                    <div className="brand-icon">🏥</div>
                    <span className="brand-name">{brand}</span>
                  </div>
                  <div className="title">{title}</div>
                  <div className="rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="count">(128)</span>
                  </div>
                  <div className="price-row">
                    <div className="price">
                      <span className="currency">₪</span>
                      <span className="amount">{price}</span>
                      {price > 1000 && <span className="old-price">{Math.round(price * 1.15)}</span>}
                    </div>
                  </div>
                  <button 
                    className="book-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Book now:", item.pid);
                    }}
                  >
                    احجز الآن
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Productlistdiv>
    );
  }
}
