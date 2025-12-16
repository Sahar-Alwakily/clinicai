
import React, { Component } from "react";
import { Icon } from "antd-mobile";
import { Filtergroupdiv, CityModal, CityList, CityItem } from "./styled";

export default class Filtergroup extends Component {
  state = {
    selectedCity: "بئر السبع",
    showCityModal: false,
    userCity: "بئر السبع",
    sortedCities: [],
  };

  // قاعدة بيانات مدن إسرائيل مع إحداثيات تقريبية
  israelCitiesDatabase = [
    // منطقة الجنوب
    { id: 26, name: "بئر السبع", region: "south", lat: 31.2518, lng: 34.7913 },
    { id: 29, name: "رهط", region: "south", lat: 31.3935, lng: 34.7549 },
    { id: 28, name: "عسقلان", region: "south", lat: 31.6688, lng: 34.5743 },
    { id: 27, name: "إيلات", region: "south", lat: 29.5577, lng: 34.9519 },
    
    // منطقة المركز
    { id: 12, name: "تل أبيب", region: "center", lat: 32.0853, lng: 34.7818 },
    { id: 13, name: "القدس", region: "center", lat: 31.7683, lng: 35.2137 },
    { id: 14, name: "يافا", region: "center", lat: 32.0504, lng: 34.7522 },
    { id: 15, name: "اللد", region: "center", lat: 31.9519, lng: 34.8881 },
    { id: 16, name: "الرملة", region: "center", lat: 31.9286, lng: 34.8656 },
    { id: 17, name: "ريشون لتسيون", region: "center", lat: 31.9710, lng: 34.7894 },
    { id: 18, name: "رمات غان", region: "center", lat: 32.0820, lng: 34.8100 },
    { id: 19, name: "بتاح تكفا", region: "center", lat: 32.0871, lng: 34.8878 },
    { id: 20, name: "هرتسليا", region: "center", lat: 32.1624, lng: 34.8447 },
    { id: 21, name: "نتانيا", region: "center", lat: 32.3320, lng: 34.8599 },
    { id: 22, name: "الخضيرة", region: "center", lat: 32.4340, lng: 34.9200 },
    { id: 23, name: "الطيبة", region: "center", lat: 32.2667, lng: 35.0083 },
    { id: 24, name: "كفر قاسم", region: "center", lat: 32.1142, lng: 34.9764 },
    { id: 25, name: "جت", region: "center", lat: 32.2333, lng: 34.9500 },
    
    // منطقة الشمال
    { id: 1, name: "حيفا", region: "north", lat: 32.7940, lng: 34.9896 },
    { id: 2, name: "عكا", region: "north", lat: 32.9199, lng: 35.0825 },
    { id: 3, name: "الناصرة", region: "north", lat: 32.6996, lng: 35.3035 },
    { id: 4, name: "شفاعمرو", region: "north", lat: 32.8056, lng: 35.1697 },
    { id: 5, name: "طمرة", region: "north", lat: 32.8500, lng: 35.2000 },
    { id: 6, name: "ام الفحم", region: "north", lat: 32.5197, lng: 35.1536 },
    { id: 7, name: "عرابة", region: "north", lat: 32.8500, lng: 35.3333 },
    { id: 8, name: "سخنين", region: "north", lat: 32.8667, lng: 35.3000 },
    { id: 9, name: "دير حنا", region: "north", lat: 32.8667, lng: 35.3667 },
    { id: 10, name: "الرينة", region: "north", lat: 32.7167, lng: 35.3167 },
    { id: 11, name: "المغار", region: "north", lat: 32.8833, lng: 35.4167 },
  ];

  componentDidMount() {
    // جلب المدينة المحفوظة أو المدينة الحالية
    const savedCity = localStorage.getItem('selectedCity') || localStorage.getItem('autoDetectedCity') || "بئر السبع";
    this.setState({ 
      selectedCity: savedCity,
      userCity: savedCity,
      sortedCities: this.israelCitiesDatabase
    }, () => {
      this.sortCitiesByDistance();
    });
  }

  // حساب المسافة بين نقطتين (Haversine formula)
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // ترتيب المدن حسب القرب
  sortCitiesByDistance = () => {
    const { userCity } = this.state;
    const userCityData = this.israelCitiesDatabase.find(c => c.name === userCity);
    
    if (!userCityData) {
      this.setState({ sortedCities: this.israelCitiesDatabase });
      return;
    }
    
    const sortedCities = [...this.israelCitiesDatabase].sort((a, b) => {
      const distA = this.calculateDistance(userCityData.lat, userCityData.lng, a.lat, a.lng);
      const distB = this.calculateDistance(userCityData.lat, userCityData.lng, b.lat, b.lng);
      return distA - distB;
    });
    
    this.setState({ sortedCities });
  };

  handleCityClick = () => {
    this.setState({ showCityModal: !this.state.showCityModal });
  };

  handleCitySelect = (cityName) => {
    this.setState({ 
      selectedCity: cityName,
      showCityModal: false 
    });
    localStorage.setItem('selectedCity', cityName);
    // إعادة ترتيب المدن حسب المدينة الجديدة
    setTimeout(() => {
      this.setState({ userCity: cityName });
      this.sortCitiesByDistance();
    }, 100);
  };

  render() {
    const { selectedCity, showCityModal, sortedCities } = this.state;
    const citiesToShow = sortedCities && sortedCities.length > 0 ? sortedCities : this.israelCitiesDatabase;

    return (
      <>
        <Filtergroupdiv>
          <div className="inner">
            <div className="item" onClick={this.handleCityClick}>
              <span id="city-filter">{selectedCity}</span>
              <Icon type="down" />
            </div>
            <span className="one-y line"></span>
            <div className="item" data-popup="sales-filter">
              <span id="sales-filter">البيع</span>
              <Icon type="down" />
            </div>
            <span className="one-y line"></span>
            <div className="item" data-popup="sort-filter">
              <span id="sort-filter">الترتيب الذكي</span>
              <Icon type="down" />
            </div>
            <span className="one-y line"></span>
            <div className="item" data-popup="filter">
              <span id="filter">تصفية</span>
              <Icon type="down" />
            </div>
          </div>
          
          <div className="secondary-filters">
            <div className="filter-item">
              <span>اعتماد العلامة التجارية</span>
              <Icon type="down" size="xxs" />
            </div>
            <div className="filter-item">
              <span>مستشفى حكومي</span>
              <Icon type="down" size="xxs" />
            </div>
            <div className="filter-item">
              <span>سلسلة معروفة</span>
              <Icon type="down" size="xxs" />
            </div>
            <div className="filter-item">
              <span>المشروع</span>
              <Icon type="down" size="xxs" />
            </div>
            <div className="filter-item">
              <span>فعالية المشروع</span>
              <Icon type="down" size="xxs" />
            </div>
          </div>
          <div className="one-x" style={{ background: "#f0f0f0" }}></div>
        </Filtergroupdiv>
        
        {showCityModal && (
          <CityModal onClick={() => this.setState({ showCityModal: false })}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>اختر المدينة</h3>
                <button className="close-btn" onClick={() => this.setState({ showCityModal: false })}>
                  ✕
                </button>
              </div>
              <CityList>
                {citiesToShow.map((city) => (
                  <CityItem
                    key={city.id}
                    active={selectedCity === city.name}
                    onClick={() => this.handleCitySelect(city.name)}
                  >
                    {city.name}
                    {selectedCity === city.name && <span className="check">✓</span>}
                  </CityItem>
                ))}
              </CityList>
            </div>
          </CityModal>
        )}
      </>
    );
  }
}
