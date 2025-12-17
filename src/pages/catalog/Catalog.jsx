import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { 
  CatalogContainer, 
  CatalogHeader, 
  CatalogLayout, 
  Sidebar, 
  SidebarItem, 
  MainContent, 
  ServiceGrid, 
  ServiceCard, 
  ServiceIcon, 
  BackButton 
} from "./styled";
import BottomNav from "../../components/bottomNav/BottomNav";

@withRouter
class Catalog extends Component {
  state = {
    selectedCategory: "all",
    categories: [
      { id: "all", name: "مواضيع ساخنة ذات صلة" },
      { id: "skin-lifting", name: "شد الجلد ورفعه" },
      { id: "hyaluronic", name: "حمض الهيالورونيك" },
      { id: "skin-management", name: "إدارة الجلد" },
      { id: "eye-surgery", name: "جراحة تجميل العيون" },
      { id: "nose-aesthetics", name: "تجميل الأنف" },
      { id: "face-slimming", name: "محيط تنحيف الوجه" },
      { id: "fat-filling", name: "ملء الدهون" },
      { id: "breast-surgery", name: "جراحة تجميل الثدي" },
      { id: "body-contouring", name: "تشكيل الجسم" },
      { id: "dental-aesthetics", name: "جمال الأسنان" },
      { id: "semi-permanent-makeup", name: "مكياج شبه دائم" },
    ],
    services: [
      // جميع الخدمات
      { id: 1, name: "عيون", category: "eye-surgery", icon: "👁️" },
      { id: 2, name: "حمض الهيالورونيك", category: "hyaluronic", icon: "💉" },
      { id: 3, name: "طب الأسنان عن طريق الفم", category: "dental-aesthetics", icon: "🦷" },
      { id: 4, name: "زراعة الشعر والعناية بالشعر", category: "all", icon: "💇" },
      { id: 5, name: "ملء الدهون", category: "fat-filling", icon: "✨" },
      { id: 103, name: "ملء الدهون الذاتي", category: "fat-filling", icon: "💉" },
      { id: 104, name: "ملء الدهون الذاتي للوجه", category: "fat-filling", icon: "😊" },
      { id: 105, name: "ملء الدهون الذاتي للخدود", category: "fat-filling", icon: "😊" },
      { id: 106, name: "ملء الدهون الذاتي للشفاه", category: "fat-filling", icon: "💋" },
      { id: 107, name: "ملء الدهون الذاتي للذقن", category: "fat-filling", icon: "👤" },
      { id: 108, name: "ملء الدهون الذاتي للأنف", category: "fat-filling", icon: "👃" },
      { id: 109, name: "ملء الدهون الذاتي تحت العينين", category: "fat-filling", icon: "👁️" },
      { id: 110, name: "ملء الدهون الذاتي للصدر", category: "fat-filling", icon: "👗" },
      { id: 111, name: "ملء الدهون الذاتي للأرداف", category: "fat-filling", icon: "🍑" },
      { id: 112, name: "ملء الدهون الذاتي للفخذين", category: "fat-filling", icon: "🦵" },
      { id: 113, name: "ملء الدهون الذاتي لليدين", category: "fat-filling", icon: "✋" },
      { id: 114, name: "ملء الدهون بالهيالورونيك", category: "fat-filling", icon: "💎" },
      { id: 115, name: "ملء الدهون بالكولاجين", category: "fat-filling", icon: "✨" },
      { id: 116, name: "ملء الدهون للندبات", category: "fat-filling", icon: "🔧" },
      { id: 117, name: "ملء الدهون للوجه الكامل", category: "fat-filling", icon: "😊" },
      { id: 6, name: "إدارة الجلد", category: "skin-management", icon: "🧴" },
      { id: 7, name: "جمال البشرة", category: "skin-management", icon: "✨" },
      { id: 8, name: "تشكيل الجسم", category: "body-contouring", icon: "💪" },
      { id: 9, name: "منتج جديد صريح", category: "all", icon: "🆕" },
      { id: 10, name: "حقن جي سبوت", category: "all", icon: "💉" },
      { id: 11, name: "تحت الخط", category: "all", icon: "📏" },
      { id: 12, name: "بيكو ثانية", category: "skin-lifting", icon: "⚡" },
      { id: 13, name: "فحص سرطان عنق الرحم", category: "all", icon: "🔬" },
      { id: 14, name: "سحب ساخن", category: "skin-lifting", icon: "🔥" },
      { id: 15, name: "إزالة تجاعيد الرقبة في الجسم", category: "skin-lifting", icon: "👔" },
      { id: 16, name: "العناصر الموسمية", category: "all", icon: "🍂" },
      { id: 17, name: "الشفاه", category: "semi-permanent-makeup", icon: "💋" },
      { id: 18, name: "الفك العلوي والسفلي", category: "dental-aesthetics", icon: "🦷" },
      { id: 19, name: "جراحة تجميل الفك", category: "dental-aesthetics", icon: "⚕️" },
      { id: 20, name: "وشم الحواجب شبه الدائم", category: "semi-permanent-makeup", icon: "👁️" },
      { id: 21, name: "الشفرين الصغيرين", category: "all", icon: "🌸" },
      { id: 22, name: "زرع شعري", category: "all", icon: "💇" },
      // إبرة النضارة
      { id: 23, name: "إبرة نضارة أساسية", category: "skin-management", icon: "💉" },
      { id: 24, name: "إبرة نضارة متقدمة", category: "skin-management", icon: "✨" },
      { id: 25, name: "إبرة نضارة الذهبية", category: "skin-management", icon: "🌟" },
      { id: 26, name: "إبرة نضارة الكولاجين", category: "skin-management", icon: "💎" },
      { id: 27, name: "جلوتاثيون", category: "skin-management", icon: "💎" },
      { id: 28, name: "فيتامين C", category: "skin-management", icon: "🍊" },
      { id: 29, name: "فيتامين B12", category: "skin-management", icon: "💊" },
      { id: 30, name: "فيتامين E", category: "skin-management", icon: "💧" },
      { id: 31, name: "فيتامين D", category: "skin-management", icon: "☀️" },
      // حقن الوريدي
      { id: 32, name: "حقن وريدي فيتامين C", category: "skin-management", icon: "💉" },
      { id: 33, name: "حقن وريدي جلوتاثيون", category: "skin-management", icon: "💎" },
      { id: 34, name: "حقن وريدي فيتامين B12", category: "skin-management", icon: "💊" },
      { id: 35, name: "حقن وريدي فيتامينات متعددة", category: "skin-management", icon: "💉" },
      { id: 36, name: "حقن وريدي الكولاجين", category: "skin-management", icon: "✨" },
      { id: 37, name: "حقن وريدي المغنيسيوم", category: "skin-management", icon: "⚡" },
      { id: 38, name: "حقن وريدي البيوتين", category: "skin-management", icon: "💪" },
      // تنظيف البشرة
      { id: 39, name: "تنظيف البشرة الأساسي", category: "skin-management", icon: "🧼" },
      { id: 40, name: "تنظيف عميق", category: "skin-management", icon: "🧽" },
      { id: 41, name: "تنظيف بالموجات فوق الصوتية", category: "skin-management", icon: "🔊" },
      { id: 42, name: "تنظيف بالبخار", category: "skin-management", icon: "💨" },
      { id: 43, name: "تنظيف كيميائي", category: "skin-management", icon: "🧪" },
      { id: 44, name: "تنظيف بالكربون", category: "skin-management", icon: "⚫" },
      // تفتيح البشرة
      { id: 45, name: "تفتيح البشرة بالجلوتاثيون", category: "skin-management", icon: "✨" },
      { id: 46, name: "تفتيح بالليزر", category: "skin-management", icon: "💫" },
      { id: 47, name: "تفتيح بالتقشير الكيميائي", category: "skin-management", icon: "🧪" },
      { id: 48, name: "تفتيح منطقة الوجه", category: "skin-management", icon: "😊" },
      { id: 49, name: "تفتيح منطقة الرقبة", category: "skin-management", icon: "👔" },
      { id: 50, name: "تفتيح منطقة اليدين", category: "skin-management", icon: "✋" },
      { id: 51, name: "تفتيح منطقة الصدر", category: "breast-surgery", icon: "👗" },
      // البوتوكس
      { id: 52, name: "بوتوكس الجبهة", category: "skin-lifting", icon: "😊" },
      { id: 53, name: "بوتوكس العينين", category: "eye-surgery", icon: "👀" },
      { id: 54, name: "بوتوكس الشفاه", category: "semi-permanent-makeup", icon: "💋" },
      { id: 55, name: "بوتوكس الرقبة", category: "skin-lifting", icon: "👔" },
      { id: 56, name: "بوتوكس الوجه الكامل", category: "skin-lifting", icon: "😊" },
      { id: 57, name: "بوتوكس الفك", category: "dental-aesthetics", icon: "🦷" },
      // الفيلر
      { id: 58, name: "فيلر الشفاه", category: "semi-permanent-makeup", icon: "💋" },
      { id: 59, name: "فيلر الخدود", category: "hyaluronic", icon: "😊" },
      { id: 60, name: "فيلر الأنف", category: "nose-aesthetics", icon: "👃" },
      { id: 61, name: "فيلر الذقن", category: "face-slimming", icon: "👤" },
      { id: 62, name: "فيلر تحت العينين", category: "eye-surgery", icon: "💉" },
      { id: 63, name: "فيلر الوجنتين", category: "hyaluronic", icon: "😊" },
      { id: 64, name: "فيلر المعابد", category: "face-slimming", icon: "😊" },
      // منطقة الصدر
      { id: 65, name: "تفتيح منطقة الصدر", category: "breast-surgery", icon: "👗" },
      { id: 66, name: "شد منطقة الصدر", category: "breast-surgery", icon: "💪" },
      { id: 67, name: "إزالة الشعر بالليزر - الصدر", category: "breast-surgery", icon: "💫" },
      { id: 68, name: "ترطيب منطقة الصدر", category: "breast-surgery", icon: "💧" },
      // منطقة العينين
      { id: 69, name: "إزالة الهالات السوداء", category: "eye-surgery", icon: "👁️" },
      { id: 70, name: "فيلر تحت العينين", category: "eye-surgery", icon: "💉" },
      { id: 71, name: "شد الجفون", category: "eye-surgery", icon: "👀" },
      { id: 72, name: "تفتيح منطقة العينين", category: "eye-surgery", icon: "✨" },
      { id: 73, name: "إزالة الانتفاخ تحت العينين", category: "eye-surgery", icon: "👁️" },
      // منطقة الأنف
      { id: 74, name: "فيلر الأنف", category: "nose-aesthetics", icon: "👃" },
      { id: 75, name: "إزالة الرؤوس السوداء", category: "nose-aesthetics", icon: "⚫" },
      { id: 76, name: "تفتيح منطقة الأنف", category: "nose-aesthetics", icon: "✨" },
      { id: 77, name: "تصحيح شكل الأنف", category: "nose-aesthetics", icon: "👃" },
      // منطقة الشفاه
      { id: 78, name: "فيلر الشفاه", category: "semi-permanent-makeup", icon: "💋" },
      { id: 79, name: "تفتيح الشفاه", category: "semi-permanent-makeup", icon: "✨" },
      { id: 80, name: "مكياج شبه دائم للشفاه", category: "semi-permanent-makeup", icon: "💄" },
      { id: 81, name: "تصحيح شكل الشفاه", category: "semi-permanent-makeup", icon: "💋" },
      // شد البشرة
      { id: 82, name: "شد الوجه", category: "skin-lifting", icon: "😊" },
      { id: 83, name: "شد الرقبة", category: "skin-lifting", icon: "👔" },
      { id: 84, name: "شد اليدين", category: "skin-lifting", icon: "✋" },
      { id: 85, name: "شد البطن", category: "body-contouring", icon: "💪" },
      { id: 86, name: "شد الفخذين", category: "body-contouring", icon: "🦵" },
      // إزالة الشعر بالليزر
      { id: 87, name: "إزالة شعر الوجه", category: "all", icon: "💫" },
      { id: 88, name: "إزالة شعر الجسم", category: "body-contouring", icon: "💫" },
      { id: 89, name: "إزالة شعر المنطقة الحساسة", category: "all", icon: "🌸" },
      { id: 90, name: "إزالة شعر الإبطين", category: "body-contouring", icon: "💫" },
      { id: 91, name: "إزالة شعر الساقين", category: "body-contouring", icon: "🦵" },
      // العناية بالبشرة
      { id: 92, name: "قناع الترطيب", category: "skin-management", icon: "💧" },
      { id: 93, name: "قناع التفتيح", category: "skin-management", icon: "✨" },
      { id: 94, name: "قناع الكولاجين", category: "skin-management", icon: "💎" },
      { id: 95, name: "علاج حب الشباب", category: "skin-management", icon: "🧴" },
      { id: 96, name: "علاج البقع الداكنة", category: "skin-management", icon: "🔬" },
      { id: 97, name: "علاج المسام الواسعة", category: "skin-management", icon: "🔍" },
      // خدمات إضافية
      { id: 98, name: "علاج التجاعيد", category: "skin-lifting", icon: "😊" },
      { id: 99, name: "علاج الخطوط الدقيقة", category: "skin-lifting", icon: "👁️" },
      { id: 100, name: "ترطيب عميق للبشرة", category: "skin-management", icon: "💧" },
      { id: 101, name: "علاج الجفاف", category: "skin-management", icon: "🌵" },
      { id: 102, name: "علاج الحساسية", category: "skin-management", icon: "🌿" },
    ]
  };

  handleBack = () => {
    this.props.history.push("/home");
  };

  handleCategoryClick = (categoryId) => {
    this.setState({ selectedCategory: categoryId });
  };

  handleServiceClick = (service) => {
    // يمكن إضافة تفاصيل الخدمة أو الانتقال لصفحة الحجز
    console.log("Service clicked:", service);
  };

  getFilteredServices = () => {
    if (this.state.selectedCategory === "all") {
      return this.state.services;
    }
    return this.state.services.filter(service => service.category === this.state.selectedCategory);
  };

  render() {
    const filteredServices = this.getFilteredServices();

    return (
      <CatalogContainer>
        <CatalogHeader>
          <BackButton onClick={this.handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
          <h1>جميع الفئات</h1>
        </CatalogHeader>
        
        <CatalogLayout>
          <Sidebar>
            {this.state.categories.map((category) => (
              <SidebarItem
                key={category.id}
                active={this.state.selectedCategory === category.id}
                onClick={() => this.handleCategoryClick(category.id)}
              >
                {category.name}
              </SidebarItem>
            ))}
          </Sidebar>
          
          <MainContent>
            <ServiceGrid>
              {filteredServices.map((service) => (
                <ServiceCard 
                  key={service.id}
                  onClick={() => this.handleServiceClick(service)}
                >
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <div className="service-name">{service.name}</div>
                </ServiceCard>
              ))}
            </ServiceGrid>
          </MainContent>
        </CatalogLayout>
        <BottomNav />
      </CatalogContainer>
    );
  }
}

export default Catalog;
