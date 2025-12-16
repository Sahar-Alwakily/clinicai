import React, { Component } from "react";
import { Icon } from "antd-mobile";
import { Citydiv, Citychoicediv } from "./styled";

export default class City extends Component {
  state = {
    city: "جاري تحديد موقعك...",
    israelCities: [],
    sortedCities: [],
    show: false,
    loading: true,
    userCoordinates: { lat: 0, lng: 0 },
    error: null,
    selectedRegion: "all", // all, north, center, south
  };

  // قاعدة بيانات مدن إسرائيل مصنفة حسب المناطق الجغرافية
  israelCitiesDatabase = [
    // منطقة الشمال
    { id: 1, name: "حيفا", region: "north" },
    { id: 2, name: "عكا", region: "north" },
    { id: 3, name: "الناصرة", region: "north" },
    { id: 4, name: "شفاعمرو", region: "north" },
    { id: 5, name: "طمرة", region: "north" },
    { id: 6, name: "ام الفحم", region: "north" },
    { id: 7, name: "عرابة", region: "north" },
    { id: 8, name: "سخنين", region: "north" },
    { id: 9, name: "دير حنا", region: "north" },
    { id: 10, name: "الرينة", region: "north" },
    { id: 11, name: "المغار", region: "north" },
    
    // منطقة المركز
    { id: 12, name: "تل أبيب", region: "center" },
    { id: 13, name: "القدس", region: "center" },
    { id: 14, name: "يافا", region: "center" },
    { id: 15, name: "اللد", region: "center" },
    { id: 16, name: "الرملة", region: "center" },
    { id: 17, name: "ريشون لتسيون", region: "center" },
    { id: 18, name: "رمات غان", region: "center" },
    { id: 19, name: "بتاح تكفا", region: "center" },
    { id: 20, name: "هرتسليا", region: "center" },
    { id: 21, name: "نتانيا", region: "center" },
    { id: 22, name: "الخضيرة", region: "center" },
    { id: 23, name: "الطيبة", region: "center" },
    { id: 24, name: "كفر قاسم", region: "center" },
    { id: 25, name: "جت", region: "center" },
    
    // منطقة الجنوب
    { id: 26, name: "بئر السبع", region: "south" },
    { id: 27, name: "إيلات", region: "south" },
    { id: 28, name: "عسقلان", region: "south" },
    { id: 29, name: "رهط", region: "south" },
  ];

  // تحديد الموقع تلقائياً
  detectUserLocation = () => {
    if ("geolocation" in navigator) {
      this.setState({ loading: true, city: "جاري تحديد موقعك..." });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          this.setState({
            userCoordinates: { lat: latitude, lng: longitude },
            sortedCities: this.israelCitiesDatabase,
            israelCities: this.israelCitiesDatabase,
            loading: false,
            error: null
          });
          
          // اختيار أقرب مدينة
          this.chooseNearestCity(latitude, longitude);
          
        },
        (error) => {
          console.error("خطأ في تحديد الموقع:", error);
          
          let errorMessage = "بئر السبع";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "الموقع غير مسموح";
          }
          
          this.setState({
            city: errorMessage,
            israelCities: this.israelCitiesDatabase,
            sortedCities: this.israelCitiesDatabase,
            loading: false,
            error: errorMessage
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      this.setState({
        city: "بئر السبع",
        israelCities: this.israelCitiesDatabase,
        sortedCities: this.israelCitiesDatabase,
        loading: false,
      });
    }
  };

  // اختيار أقرب مدينة (وهمي للتبسيط)
  chooseNearestCity = (lat, lng) => {
    // في التطبيق الحقيقي، هنا تحسب المسافات
    // لكن للتبسيط، نختار مدينة عشوائية
    const randomCity = this.israelCitiesDatabase[Math.floor(Math.random() * this.israelCitiesDatabase.length)];
    
    this.setState({
      city: randomCity.name,
    });
    
    localStorage.setItem('autoDetectedCity', randomCity.name);
  };

  // تصفية المدن حسب المنطقة
  filterCitiesByRegion = (region) => {
    this.setState({ selectedRegion: region });
  };

  // اختيار مدينة يدوياً
  choicecity = (cityName) => {
    this.setState({
      city: cityName,
      show: false,
    });
    
    localStorage.setItem('selectedCity', cityName);
    localStorage.setItem('isManualSelection', 'true');
  };

  toggleCityList = () => {
    this.setState({ show: !this.state.show });
  };

  // إعادة تحديد الموقع
  refreshLocation = () => {
    localStorage.removeItem('isManualSelection');
    this.detectUserLocation();
  };

  render() {
    const { sortedCities, show, city, loading, error, selectedRegion } = this.state;
    const isManualSelection = localStorage.getItem('isManualSelection') === 'true';

    // تصفية المدن حسب المنطقة المختارة
    const filteredCities = selectedRegion === "all" 
      ? sortedCities 
      : sortedCities.filter(city => city.region === selectedRegion);

    return (
      <>
        <Citydiv onClick={this.toggleCityList}>
          <div className="city-display">
            <div className="city-name">{city}</div>
            {isManualSelection && <div className="manual-indicator">✓</div>}
          </div>
          <Icon type="down" size="xxs" className="arrow-icon" />
        </Citydiv>
        
        {show && (
          <Citychoicediv>
            <div className="city-modal">
              
              {/* الهيدر */}
              <div className="modal-header">
                <div className="header-left">
                  <div className="current-location">
                    <Icon type="environment" className="location-icon" />
                    <span className="location-text">{city}</span>
                  </div>
                  {error && <div className="location-error">{error}</div>}
                </div>
                <div className="refresh-location" onClick={this.refreshLocation}>
                  <Icon type="reload" />
                </div>
              </div>

              {/* فلاتر التصنيف */}
              <div className="city-filters">
                <div 
                  className={`filter-btn ${selectedRegion === "all" ? "active" : ""}`}
                  onClick={() => this.filterCitiesByRegion("all")}
                >
                  جميع المدن
                </div>
                <div 
                  className={`filter-btn ${selectedRegion === "north" ? "active" : ""}`}
                  onClick={() => this.filterCitiesByRegion("north")}
                >
                  الشمال
                </div>
                <div 
                  className={`filter-btn ${selectedRegion === "center" ? "active" : ""}`}
                  onClick={() => this.filterCitiesByRegion("center")}
                >
                  المركز
                </div>
                <div 
                  className={`filter-btn ${selectedRegion === "south" ? "active" : ""}`}
                  onClick={() => this.filterCitiesByRegion("south")}
                >
                  الجنوب
                </div>
              </div>

              {/* قائمة المدن */}
              <div className="cities-container">
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>جاري تحميل المدن...</p>
                  </div>
                ) : (
                  <div className="cities-grid">
                    {filteredCities.map((cityItem) => (
                      <div
                        key={cityItem.id}
                        className={`city-card ${city === cityItem.name ? "selected" : ""}`}
                        onClick={() => this.choicecity(cityItem.name)}
                      >
                        <div className="city-card-content">
                          <div className="city-card-name">{cityItem.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* زر الإغلاق */}
              <div className="modal-footer">
                <button className="close-modal-btn" onClick={this.toggleCityList}>
                  إغلاق
                </button>
              </div>

            </div>
          </Citychoicediv>
        )}
      </>
    );
  }

  componentDidMount() {
    const isManualSelection = localStorage.getItem('isManualSelection') === 'true';
    const savedCity = localStorage.getItem('selectedCity');
    
    if (isManualSelection && savedCity) {
      this.setState({
        city: savedCity,
        israelCities: this.israelCitiesDatabase,
        sortedCities: this.israelCitiesDatabase,
        loading: false
      });
    } else {
      this.detectUserLocation();
    }
  }
}