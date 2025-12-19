import React, { Component } from "react";
import { Carousel } from "antd-mobile";
import { Bannerdiv, OfferCard, OfferContent, OfferBadge, OfferTitle, OfferSubtitle } from "./styled";

export default class Banner extends Component {
  state = {
    currentIndex: 0,
    offers: [
      {
        id: 1,
        image: "https://img2.soyoung.com/upload/20190828/8/30759ba66fc5ef672146880005e2ff04.jpg?imageView2/0/format/webp",
        discount: "30%",
        title: "عرض اليوم الخاص!",
        subtitle: "خصم 30% على جميع الخدمات - صالح اليوم فقط",
        color: "#667eea"
      },
      {
        id: 2,
        image: "https://img2.soyoung.com/upload/20200221/5/ff5367085413b470a022e1ff315502ee.jpg?imageView2/0/format/webp",
        discount: "25%",
        title: "عرض الجمعة الخاص!",
        subtitle: "خصم 25% على خدمات التجميل",
        color: "#f093fb"
      },
      {
        id: 3,
        image: "https://img2.soyoung.com/upload/20200405/2/fd86cb65e0a0a43bf8810e59e4eb7f1e.jpg?imageView2/0/format/webp",
        discount: "40%",
        title: "عرض جديد!",
        subtitle: "خصم 40% على العناية بالبشرة",
        color: "#fa709a"
      }
    ]
  };

  handleSlideChange = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex, offers } = this.state;
    const currentColor = offers[currentIndex]?.color || "#667eea";
    
    return (
      <>
        <Bannerdiv bgColor={currentColor}>
          <Carousel
            dots={true}
            swiping={true}
            autoplay
            infinite
            speed={500}
            autoplayInterval={4000}
            resetAutoplay={false}
            afterChange={this.handleSlideChange}
          >
            {this.state.offers.map((offer) => (
              <OfferCard key={offer.id}>
                <OfferContent>
                  <OfferBadge>{offer.discount}</OfferBadge>
                  <OfferTitle>{offer.title}</OfferTitle>
                  <OfferSubtitle>{offer.subtitle}</OfferSubtitle>
                </OfferContent>
                <div className="offer-image">
                  <img src={offer.image} alt={offer.title} />
                </div>
              </OfferCard>
            ))}
          </Carousel>
        </Bannerdiv>
      </>
    );
  }
}
