import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvatarModel from "./AvatarModel";

class DiagnosisSteps extends Component {
  state = {
    currentStep: 1,
    totalSteps: 6, // سيتم تحديثه ديناميكياً
    formData: {
      // معلومات العميل
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      location: "",
      gender: "",
      pregnancy: null, // للإناث فقط
      breastfeeding: null, // للإناث فقط
      
      // الأسئلة الطبية
      wantsMedicalQuestions: null, // null = لم يقرر، true = نعم، false = لا
      
      // الوضع الصحي العام
      healthStatus: "",
      exercise: null,
      menstrualCycle: null, // للإناث فقط
      
      // الحساسية
      allergiesText: "",
      allergyBread: false,
      allergyMilk: false,
      
      // المكملات والأدوية
      supplements: null,
      supplementsType: "",
      dailyMedications: { medications: null, type: "" },
      energyDrinks: null,
      smoking: null,
      
      // الأمراض الجلدية
      skinDiseases: null,
      skinDetails: "",
      
      // الأمراض المزمنة
      chronicConditions: {
        "shortBreath": null,
        "heartDisease": null,
        "bloodClot": null,
        "hormoneDisorder": null,
        "thyroid": null,
        "immuneDisease": null,
        "headache": null,
        "epilepsy": null,
        "anemia": null,
        "bloodPressure": null,
        "kidney": null,
        "diabetes": null,
        "pcod": null,
        "cancer": null,
      },
      
      // مستحضرات التجميل
      cosmetics: {
        "soap": null,
        "moisturizer": null,
        "sunscreen": null,
        "exfoliation": null,
        "serum": null,
        "otherMedications": "",
      },
      
      // أدوية يومية إضافية
      dailyMedicationsExtra: {
        "contraceptive": null,
        "antidepressant": null,
        "sedative": null,
        "sleepingPill": null,
        "biotica": null,
        "roaccutane": null,
        "other": "",
      },
      
      // العلاجات السابقة
      previousTreatments: "",
      
      // تشخيص البشرة
      skinType: "",
      age: "",
      lifestyle: "",
      
      // الأفاتار
      avatarModel: "",
      
      // الاهتمامات
      interests: []
    },
    errors: {}
  };

  // خيارات الجنس
  genderOptions = [
    { id: "male", label: "ذكر", icon: "👨", color: "#3B82F6" },
    { id: "female", label: "أنثى", icon: "👩", color: "#EC4899" }
  ];

  // خيارات الحمل والرضاعة
  pregnancyOptions = [
    { id: false, label: "لا", icon: "🙅‍♀️", color: "#6B7280" },
    { id: true, label: "نعم", icon: "🤰", color: "#F59E0B" }
  ];

  breastfeedingOptions = [
    { id: false, label: "لا", icon: "🚫", color: "#6B7280" },
    { id: true, label: "نعم", icon: "🤱", color: "#8B5CF6" }
  ];

  // أنواع البشرة
  skinTypes = [
    { id: "normal", label: "بشرة عادية", icon: "😊", color: "#10B981" },
    { id: "dry", label: "بشرة جافة", icon: "🏜️", color: "#F59E0B" },
    { id: "oily", label: "بشرة دهنية", icon: "✨", color: "#3B82F6" },
    { id: "combination", label: "بشرة مختلطة", icon: "🎭", color: "#8B5CF6" },
    { id: "sensitive", label: "بشرة حساسة", icon: "🌸", color: "#EC4899" }
  ];

  // الفئات العمرية
  ageGroups = [
    { id: "under20", label: "أقل من 20 سنة", range: "15-20", color: "#F59E0B" },
    { id: "20-30", label: "20-30 سنة", range: "20-30", color: "#10B981" },
    { id: "30-40", label: "30-40 سنة", range: "30-40", color: "#3B82F6" },
    { id: "40-50", label: "40-50 سنة", range: "40-50", color: "#8B5CF6" },
    { id: "over50", label: "أكثر من 50 سنة", range: "50+", color: "#EC4899" }
  ];

  // أسلوب الحياة
  lifestyleOptions = [
    { id: "active", label: "نشط", icon: "🏃‍♀️", desc: "أمارس الرياضة بانتظام", color: "#10B981" },
    { id: "moderate", label: "معتدل", icon: "🚶‍♀️", desc: "أمارس الرياضة أحياناً", color: "#3B82F6" },
    { id: "sedentary", label: "قليل الحركة", icon: "🛋️", desc: "قليل الحركة والنشاط", color: "#6B7280" }
  ];

  // نماذج الأفاتار
  avatarModels = [
    { id: "female_model1", label: "نموذج أنثوي 1", emoji: "👩‍🦰", color: "#EC4899", gender: "female" },
    { id: "female_model2", label: "نموذج أنثوي 2", emoji: "👩‍🦱", color: "#8B5CF6", gender: "female" },
    { id: "male_model1", label: "نموذج ذكري 1", emoji: "👨‍🦰", color: "#3B82F6", gender: "male" },
    { id: "male_model2", label: "نموذج ذكري 2", emoji: "👨‍🦱", color: "#10B981", gender: "male" }
  ];

  // الاهتمامات في عالم التجميل
  interestsList = [
    { id: "botox", label: "بوتوكس", icon: "💉", color: "#EC4899" },
    { id: "filler", label: "فيلر", icon: "💊", color: "#3B82F6" },
    { id: "nose", label: "تجميل الأنف", icon: "👃", color: "#8B5CF6" },
    { id: "lip", label: "تجميل الشفاه", icon: "💋", color: "#F59E0B" },
    { id: "face_lift", label: "شد الوجه", icon: "✨", color: "#10B981" },
    { id: "laser", label: "علاجات الليزر", icon: "⚡", color: "#F59E0B" },
    { id: "skin_care", label: "العناية بالبشرة", icon: "🧴", color: "#10B981" },
    { id: "hair_removal", label: "إزالة الشعر", icon: "💇‍♀️", color: "#EC4899" },
    { id: "teeth", label: "تبييض الأسنان", icon: "🦷", color: "#3B82F6" },
    { id: "eyebrow", label: "الحواجب", icon: "👁️", color: "#8B5CF6" },
    { id: "eyelash", label: "الرموش", icon: "👀", color: "#F59E0B" },
    { id: "body", label: "تشكيل الجسم", icon: "💪", color: "#10B981" }
  ];

  // خرائط الأمراض المزمنة
  chronicConditionsMap = {
    "shortBreath": "ضيق نفس",
    "heartDisease": "أمراض قلب",
    "bloodClot": "تخثر الدم",
    "hormoneDisorder": "اضطرابات هرمونية",
    "thyroid": "غدة درقية",
    "immuneDisease": "أمراض جهاز المناعة",
    "headache": "صداع / أوجاع رأس",
    "epilepsy": "صرع",
    "anemia": "فقر دم",
    "bloodPressure": "ضغط دم",
    "kidney": "الكلى",
    "diabetes": "سكري",
    "pcod": "تكيس مبايض",
    "cancer": "سرطان"
  };

  cosmeticsMap = {
    "soap": "صابون",
    "moisturizer": "كريم ترطيب",
    "sunscreen": "واقي شمس",
    "exfoliation": "تقشير",
    "serum": "سيروم",
    "otherMedications": "أدوية أخرى"
  };

  dailyMedicationsExtraMap = {
    "contraceptive": "منع حمل (حبوب أو غيرها)",
    "antidepressant": "حبوب اكتئاب",
    "sedative": "حبوب تهدئة",
    "sleepingPill": "حبوب نوم",
    "biotica": "انتبيّوتيكا (العشر أيام الأخيرة)",
    "roaccutane": "روكوتان (آخر ثلاثة أشهر)",
    "other": "أخرى"
  };

  // حساب عدد الخطوات الإجمالي
  getTotalSteps = () => {
    const { wantsMedicalQuestions } = this.state.formData;
    // إذا اختار الإجابة على الأسئلة الطبية، نضيف 4 خطوات إضافية
    if (wantsMedicalQuestions === true) {
      return 9; // 1: معلومات، 2: سؤال، 3-6: أسئلة طبية، 7: بشرة، 8: أفاتار، 9: اهتمامات
    }
    return 5; // 1: معلومات، 2: سؤال، 3: بشرة، 4: أفاتار، 5: اهتمامات
  };

  // ============ التنقل بين الخطوات ============
  goToNextStep = () => {
    const { currentStep, formData } = this.state;
    
    // إذا كانت الخطوة 2 واختار التخطي، نتجاوز مباشرة إلى الخطوة 3 (تشخيص البشرة)
    if (currentStep === 2 && formData.wantsMedicalQuestions === false) {
      this.setState({ 
        currentStep: 3,
        errors: {}
      });
      return;
    }
    
    // التحقق من صحة البيانات للخطوات الأخرى
    if (this.validateCurrentStep()) {
      const totalSteps = this.getTotalSteps();
      
      if (currentStep < totalSteps) {
        this.setState(prevState => ({ 
          currentStep: prevState.currentStep + 1,
          errors: {}
        }));
      } else {
        this.props.onComplete(this.state.formData);
      }
    }
  };

  goToPreviousStep = () => {
    const { currentStep, formData } = this.state;
    
    // إذا كانت الخطوة 3 واختار التخطي، نرجع للخطوة 2
    if (currentStep === 3 && formData.wantsMedicalQuestions === false) {
      this.setState({ 
        currentStep: 2,
        errors: {}
      });
      return;
    }
    
    if (currentStep > 1) {
      this.setState(prevState => ({ 
        currentStep: prevState.currentStep - 1,
        errors: {}
      }));
    } else {
      this.props.onBack();
    }
  };

  // ============ التحقق من صحة البيانات ============
  validateCurrentStep = () => {
    const { currentStep, formData } = this.state;
    const errors = {};

    switch (currentStep) {
      case 1: // معلومات العميل
        if (!formData.firstName.trim()) errors.firstName = "الرجاء إدخال الاسم";
        if (!formData.lastName.trim()) errors.lastName = "الرجاء إدخال اسم العائلة";
        if (!formData.idNumber.trim()) errors.idNumber = "الرجاء إدخال رقم الهوية";
        if (!formData.email.trim()) errors.email = "الرجاء إدخال البريد الإلكتروني";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "البريد الإلكتروني غير صالح";
        }
        if (!formData.location.trim()) errors.location = "الرجاء إدخال المكان";
        if (!formData.gender) errors.gender = "الرجاء اختيار الجنس";
        if (formData.gender === "female") {
          if (formData.pregnancy === null) errors.pregnancy = "الرجاء تحديد حالة الحمل";
          if (formData.breastfeeding === null) errors.breastfeeding = "الرجاء تحديد حالة الرضاعة";
        }
        break;
      
      case 2: // الأسئلة الطبية
        if (formData.wantsMedicalQuestions === null) {
          errors.wantsMedicalQuestions = "الرجاء اختيار خيار";
        }
        break;
      
      case 3: // الوضع الصحي العام (إذا اختار الإجابة)
      case 4: // الحساسية
      case 5: // المكملات والأدوية
      case 6: // الأمراض الجلدية والمزمنة
        // لا حاجة للتحقق، كلها اختيارية
        break;
      
      case 7: // تشخيص البشرة (إذا اختار الإجابة) أو 3 (إذا اختار التخطي)
        if (!formData.skinType) errors.skinType = "الرجاء اختيار نوع البشرة";
        if (!formData.age) errors.age = "الرجاء اختيار الفئة العمرية";
        if (!formData.lifestyle) errors.lifestyle = "الرجاء اختيار أسلوب الحياة";
        break;
      
      case 4: // الأفاتار
        if (!formData.avatarModel) errors.avatarModel = "الرجاء اختيار النموذج";
        break;
      
      case 5: // الاهتمامات
        if (formData.interests.length === 0) {
          errors.interests = "الرجاء اختيار اهتمام واحد على الأقل";
        }
        break;
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  // ============ معالجة تغيير البيانات ============
  handleInputChange = (field, value) => {
    this.setState(prevState => ({
      formData: { ...prevState.formData, [field]: value },
      errors: { ...prevState.errors, [field]: "" }
    }));
  };

  handleInterestToggle = (interestId) => {
    this.setState(prevState => {
      const interests = [...prevState.formData.interests];
      const index = interests.indexOf(interestId);
      
      if (index > -1) {
        interests.splice(index, 1);
      } else {
        interests.push(interestId);
      }

      return {
        formData: { ...prevState.formData, interests }
      };
    });
  };

  // دالة لأزرار نعم/لا
  renderYesNo = (label, value, setValue, isSmall = false) => (
    <div className={`yes-no-group ${isSmall ? "small" : ""}`}>
      <label className="yes-no-label">{label}:</label>
      <div className="yes-no-options">
        <label className="yes-no-option">
          <input
            type="radio"
            name={`${label}-yesno`}
            checked={value === true}
            onChange={() => setValue(true)}
          />
          <span>نعم</span>
        </label>
        <label className="yes-no-option">
          <input
            type="radio"
            name={`${label}-yesno`}
            checked={value === false}
            onChange={() => setValue(false)}
          />
          <span>لا</span>
        </label>
      </div>
    </div>
  );

  // ============ رندر كل خطوة ============
  renderStepContent = () => {
    const { currentStep, formData } = this.state;
    const { wantsMedicalQuestions } = formData;

    switch (currentStep) {
      case 1: // معلومات العميل
        return (
          <div className="step-content personal-info">
            <h3>معلوماتك الشخصية</h3>
            <p className="step-description">
              الرجاء إدخال معلوماتك الأساسية
            </p>
            
            <div className="input-field">
              <label>الاسم *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => this.handleInputChange("firstName", e.target.value)}
                placeholder="أدخل اسمك"
                className={this.state.errors.firstName ? "error" : ""}
              />
              {this.state.errors.firstName && 
                <span className="field-error">{this.state.errors.firstName}</span>}
            </div>

            <div className="input-field">
              <label>اسم العائلة *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => this.handleInputChange("lastName", e.target.value)}
                placeholder="أدخل اسم العائلة"
                className={this.state.errors.lastName ? "error" : ""}
              />
              {this.state.errors.lastName && 
                <span className="field-error">{this.state.errors.lastName}</span>}
            </div>

            <div className="input-field">
              <label>رقم الهوية *</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => this.handleInputChange("idNumber", e.target.value)}
                placeholder="أدخل رقم الهوية"
                className={this.state.errors.idNumber ? "error" : ""}
              />
              {this.state.errors.idNumber && 
                <span className="field-error">{this.state.errors.idNumber}</span>}
            </div>

            <div className="input-field">
              <label>البريد الإلكتروني *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => this.handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                className={this.state.errors.email ? "error" : ""}
              />
              {this.state.errors.email && 
                <span className="field-error">{this.state.errors.email}</span>}
            </div>

            <div className="input-field">
              <label>المكان *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => this.handleInputChange("location", e.target.value)}
                placeholder="المدينة، الدولة"
                className={this.state.errors.location ? "error" : ""}
              />
              {this.state.errors.location && 
                <span className="field-error">{this.state.errors.location}</span>}
            </div>

            <div className="options-section">
              <label>الجنس *</label>
              <div className="options-grid">
                {this.genderOptions.map(gender => (
                  <div
                    key={gender.id}
                    className={`option-card ${formData.gender === gender.id ? "selected" : ""}`}
                    onClick={() => {
                      this.handleInputChange("gender", gender.id);
                      if (gender.id === "male") {
                        this.handleInputChange("pregnancy", null);
                        this.handleInputChange("breastfeeding", null);
                      }
                    }}
                    style={{ borderColor: gender.color }}
                  >
                    <div className="option-icon" style={{ color: gender.color }}>
                      {gender.icon}
                    </div>
                    <div className="option-label">{gender.label}</div>
                  </div>
                ))}
              </div>
              {this.state.errors.gender && 
                <div className="step-error">{this.state.errors.gender}</div>}
            </div>

            {formData.gender === "female" && (
              <>
                <div className="options-section">
                  <label>هل أنت حامل؟ *</label>
                  <div className="options-grid">
                    {this.pregnancyOptions.map(option => (
                      <div
                        key={option.id}
                        className={`option-card ${formData.pregnancy === option.id ? "selected" : ""}`}
                        onClick={() => this.handleInputChange("pregnancy", option.id)}
                        style={{ borderColor: option.color }}
                      >
                        <div className="option-icon" style={{ color: option.color }}>
                          {option.icon}
                        </div>
                        <div className="option-label">{option.label}</div>
                      </div>
                    ))}
                  </div>
                  {this.state.errors.pregnancy && 
                    <div className="step-error">{this.state.errors.pregnancy}</div>}
                </div>

                <div className="options-section">
                  <label>هل أنت مرضعة؟ *</label>
                  <div className="options-grid">
                    {this.breastfeedingOptions.map(option => (
                      <div
                        key={option.id}
                        className={`option-card ${formData.breastfeeding === option.id ? "selected" : ""}`}
                        onClick={() => this.handleInputChange("breastfeeding", option.id)}
                        style={{ borderColor: option.color }}
                      >
                        <div className="option-icon" style={{ color: option.color }}>
                          {option.icon}
                        </div>
                        <div className="option-label">{option.label}</div>
                      </div>
                    ))}
                  </div>
                  {this.state.errors.breastfeeding && 
                    <div className="step-error">{this.state.errors.breastfeeding}</div>}
                </div>
              </>
            )}
          </div>
        );

      case 2: // سؤال الأسئلة الطبية
        return (
          <div className="step-content medical-questions-choice">
            <h3>الأسئلة الطبية</h3>
            <p className="step-description">
              هل تريد الإجابة على الأسئلة الطبية الآن؟
            </p>
            
            <div className="medical-choice-buttons">
              <button
                type="button"
                className={`choice-button yes-button ${formData.wantsMedicalQuestions === true ? "selected" : ""}`}
                onClick={() => {
                  this.handleInputChange("wantsMedicalQuestions", true);
                }}
              >
                <div className="choice-icon">✅</div>
                <div className="choice-text">
                  <div className="choice-title">نعم، أريد الإجابة الآن</div>
                  <div className="choice-desc">سأجيب على الأسئلة الطبية</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`choice-button no-button ${formData.wantsMedicalQuestions === false ? "selected" : ""}`}
                onClick={() => {
                  this.handleInputChange("wantsMedicalQuestions", false);
                }}
              >
                <div className="choice-icon">⏭️</div>
                <div className="choice-text">
                  <div className="choice-title">لا، سأجيب لاحقاً</div>
                  <div className="choice-desc">سأتخطى الأسئلة الطبية الآن</div>
                </div>
              </button>
            </div>

            {formData.wantsMedicalQuestions === false && (
              <div className="skip-message">
                <div className="message-icon">ℹ️</div>
                <p>يمكنك الإجابة على الأسئلة الطبية في أي وقت من إعدادات الحساب</p>
              </div>
            )}

            {this.state.errors.wantsMedicalQuestions && 
              <div className="step-error">{this.state.errors.wantsMedicalQuestions}</div>}
          </div>
        );

      case 3: // الوضع الصحي العام (إذا اختار الإجابة)
        if (wantsMedicalQuestions === false) {
          // إذا اختار التخطي، نتجاوز إلى تشخيص البشرة (case 7)
          return this.renderStepContent();
        }
        return (
          <div className="step-content medical-health">
            <h3>الوضع الصحي العام</h3>
            <p className="step-description">
              معلومات عن صحتك العامة
            </p>
            
            <div className="input-field">
              <label>الحالة الصحية الحالية</label>
              <textarea
                value={formData.healthStatus}
                onChange={(e) => this.handleInputChange("healthStatus", e.target.value)}
                placeholder="وصف الحالة الصحية..."
                rows={3}
                className="textarea-field"
              />
            </div>

            <div className="yes-no-section">
              {this.renderYesNo("ممارسة الرياضة", formData.exercise, (val) => this.handleInputChange("exercise", val))}
              {formData.gender === "female" && this.renderYesNo("انتظام الدورة الشهرية", formData.menstrualCycle, (val) => this.handleInputChange("menstrualCycle", val))}
            </div>
          </div>
        );

      case 4: // الحساسية
        if (wantsMedicalQuestions === false) {
          return this.renderStepContent();
        }
        return (
          <div className="step-content medical-allergies">
            <h3>الحساسية</h3>
            <p className="step-description">
              معلومات عن الحساسية
            </p>
            
            <div className="input-field">
              <label>أنواع الحساسية</label>
              <textarea
                value={formData.allergiesText}
                onChange={(e) => this.handleInputChange("allergiesText", e.target.value)}
                placeholder="اذكر أنواع الحساسية..."
                rows={3}
                className="textarea-field"
              />
            </div>

            <div className="checkbox-section">
              <label>حساسيات شائعة</label>
              <div className="checkbox-grid">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.allergyBread}
                    onChange={(e) => this.handleInputChange("allergyBread", e.target.checked)}
                  />
                  <span>حساسية الخبز</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.allergyMilk}
                    onChange={(e) => this.handleInputChange("allergyMilk", e.target.checked)}
                  />
                  <span>حساسية الحليب</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 5: // المكملات والأدوية
        if (wantsMedicalQuestions === false) {
          return this.renderStepContent();
        }
        return (
          <div className="step-content medical-medications">
            <h3>المكملات الغذائية والأدوية</h3>
            <p className="step-description">
              معلومات عن المكملات والأدوية
            </p>
            
            <div className="yes-no-section">
              {this.renderYesNo("مكملات غذائية", formData.supplements, (val) => this.handleInputChange("supplements", val))}
              {formData.supplements && (
                <div className="input-field">
                  <label>نوع المكملات</label>
                  <input
                    type="text"
                    value={formData.supplementsType}
                    onChange={(e) => this.handleInputChange("supplementsType", e.target.value)}
                    placeholder="نوع المكملات..."
                  />
                </div>
              )}
              
              {this.renderYesNo("أدوية يومية", formData.dailyMedications.medications, (val) => 
                this.handleInputChange("dailyMedications", { ...formData.dailyMedications, medications: val })
              )}
              {formData.dailyMedications.medications && (
                <div className="input-field">
                  <label>نوع الأدوية</label>
                  <input
                    type="text"
                    value={formData.dailyMedications.type}
                    onChange={(e) => this.handleInputChange("dailyMedications", { ...formData.dailyMedications, type: e.target.value })}
                    placeholder="نوع الأدوية..."
                  />
                </div>
              )}
              
              {this.renderYesNo("مشروبات الطاقة", formData.energyDrinks, (val) => this.handleInputChange("energyDrinks", val))}
              {this.renderYesNo("تدخين", formData.smoking, (val) => this.handleInputChange("smoking", val))}
            </div>
          </div>
        );

      case 6: // الأمراض الجلدية والمزمنة
        if (wantsMedicalQuestions === false) {
          return this.renderStepContent();
        }
        return (
          <div className="step-content medical-diseases">
            <h3>الأمراض الجلدية والمزمنة</h3>
            <p className="step-description">
              معلومات عن الأمراض
            </p>
            
            <div className="yes-no-section">
              {this.renderYesNo("هل تعاني من أمراض جلدية؟", formData.skinDiseases, (val) => this.handleInputChange("skinDiseases", val))}
              {formData.skinDiseases && (
                <div className="input-field">
                  <label>تفاصيل الأمراض الجلدية</label>
                  <textarea
                    value={formData.skinDetails}
                    onChange={(e) => this.handleInputChange("skinDetails", e.target.value)}
                    placeholder="وصف الأمراض الجلدية..."
                    rows={3}
                    className="textarea-field"
                  />
                </div>
              )}
            </div>

            <div className="chronic-diseases-section">
              <label>الأمراض المزمنة والحالات الطبية</label>
              <div className="chronic-grid">
                {Object.keys(formData.chronicConditions).map((key) => (
                  <div key={key} className="chronic-item">
                    {this.renderYesNo(this.chronicConditionsMap[key], formData.chronicConditions[key], (val) =>
                      this.handleInputChange("chronicConditions", { ...formData.chronicConditions, [key]: val }),
                      true
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="cosmetics-section">
              <label>مستحضرات التجميل والعناية</label>
              <div className="cosmetics-grid">
                {Object.keys(formData.cosmetics).map((key) => key === "otherMedications" ? (
                  <div key={key} className="full-width">
                    <div className="input-field">
                      <label>أدوية أخرى</label>
                      <input
                        type="text"
                        value={formData.cosmetics["otherMedications"]}
                        onChange={(e) => this.handleInputChange("cosmetics", { ...formData.cosmetics, "otherMedications": e.target.value })}
                        placeholder="أدوية أخرى..."
                      />
                    </div>
                  </div>
                ) : (
                  <div key={key} className="cosmetic-item">
                    {this.renderYesNo(this.cosmeticsMap[key], formData.cosmetics[key], (val) =>
                      this.handleInputChange("cosmetics", { ...formData.cosmetics, [key]: val }),
                      true
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="medications-extra-section">
              <label>أدوية يومية إضافية</label>
              <div className="medications-grid">
                {Object.keys(formData.dailyMedicationsExtra).map((key) => key === "other" ? (
                  <div key={key} className="full-width">
                    <div className="input-field">
                      <label>أخرى</label>
                      <input
                        type="text"
                        value={formData.dailyMedicationsExtra["other"]}
                        onChange={(e) => this.handleInputChange("dailyMedicationsExtra", { ...formData.dailyMedicationsExtra, "other": e.target.value })}
                        placeholder="أدوية أخرى..."
                      />
                    </div>
                  </div>
                ) : (
                  <div key={key} className="medication-item">
                    {this.renderYesNo(this.dailyMedicationsExtraMap[key], formData.dailyMedicationsExtra[key], (val) =>
                      this.handleInputChange("dailyMedicationsExtra", { ...formData.dailyMedicationsExtra, [key]: val }),
                      true
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="input-field">
              <label>العلاجات والعمليات السابقة</label>
              <textarea
                value={formData.previousTreatments}
                onChange={(e) => this.handleInputChange("previousTreatments", e.target.value)}
                placeholder="وصف العمليات أو العلاجات السابقة..."
                rows={3}
                className="textarea-field"
              />
            </div>
          </div>
        );

      case 7: // تشخيص البشرة
      case 3: // تشخيص البشرة (إذا اختار التخطي)
        // إذا اختار التخطي وكانت الخطوة 3، أو اختار الإجابة وكانت الخطوة 7
        if ((wantsMedicalQuestions === false && currentStep === 3) || 
            (wantsMedicalQuestions === true && currentStep === 7)) {
          return (
          <div className="step-content skin-diagnosis">
            <h3>تشخيص البشرة</h3>
            <p className="step-description">
              هذه المعلومات تساعدنا في تخصيص المنتجات المناسبة لك
            </p>
            
            <div className="options-section">
              <label>نوع البشرة *</label>
              <div className="options-grid">
                {this.skinTypes.map(type => (
                  <div
                    key={type.id}
                    className={`option-card ${formData.skinType === type.id ? "selected" : ""}`}
                    onClick={() => this.handleInputChange("skinType", type.id)}
                    style={{ borderColor: type.color }}
                  >
                    <div className="option-icon" style={{ color: type.color }}>
                      {type.icon}
                    </div>
                    <div className="option-label">{type.label}</div>
                  </div>
                ))}
              </div>
              {this.state.errors.skinType && 
                <div className="step-error">{this.state.errors.skinType}</div>}
            </div>

            <div className="options-section">
              <label>الفئة العمرية *</label>
              <div className="options-grid">
                {this.ageGroups.map(age => (
                  <div
                    key={age.id}
                    className={`option-card ${formData.age === age.id ? "selected" : ""}`}
                    onClick={() => this.handleInputChange("age", age.id)}
                    style={{ borderColor: age.color }}
                  >
                    <div className="option-range" style={{ color: age.color }}>
                      {age.range}
                    </div>
                    <div className="option-label">{age.label}</div>
                  </div>
                ))}
              </div>
              {this.state.errors.age && 
                <div className="step-error">{this.state.errors.age}</div>}
            </div>

            <div className="options-section">
              <label>أسلوب الحياة *</label>
              <div className="options-grid">
                {this.lifestyleOptions.map(lifestyle => (
                  <div
                    key={lifestyle.id}
                    className={`option-card ${formData.lifestyle === lifestyle.id ? "selected" : ""}`}
                    onClick={() => this.handleInputChange("lifestyle", lifestyle.id)}
                    style={{ borderColor: lifestyle.color }}
                  >
                    <div className="option-icon" style={{ color: lifestyle.color }}>
                      {lifestyle.icon}
                    </div>
                    <div className="option-label">{lifestyle.label}</div>
                    <div className="option-desc">{lifestyle.desc}</div>
                  </div>
                ))}
              </div>
              {this.state.errors.lifestyle && 
                <div className="step-error">{this.state.errors.lifestyle}</div>}
            </div>
          </div>
          );
        }
        return null;

      case 8: // الأفاتار (إذا اختار الإجابة)
      case 4: // الأفاتار (إذا اختار التخطي)
        if ((wantsMedicalQuestions === false && currentStep === 4) || 
            (wantsMedicalQuestions === true && currentStep === 8)) {
          const filteredAvatarModels = this.avatarModels.filter(model => {
            if (formData.gender === "female") {
              return model.gender === "female";
            } else if (formData.gender === "male") {
              return model.gender === "male";
            }
            return true;
          });

          return (
          <div className="step-content avatar-selection">
            <h3>اختر نموذجك ثلاثي الأبعاد</h3>
            <p className="step-description">
              سيظهر هذا النموذج في حسابك ويمكنك تغييره لاحقاً
            </p>
            
            <div className="avatar-grid">
              {filteredAvatarModels.map(model => (
                <div
                  key={model.id}
                  className={`avatar-card ${formData.avatarModel === model.id ? "selected" : ""}`}
                  onClick={() => this.handleInputChange("avatarModel", model.id)}
                  style={{ borderColor: model.color }}
                >
                  <div className="avatar-emoji">{model.emoji}</div>
                  <div className="avatar-label">{model.label}</div>
                </div>
              ))}
            </div>
            
            {this.state.errors.avatarModel && 
              <div className="step-error">{this.state.errors.avatarModel}</div>}
            
            {formData.avatarModel && 
              <AvatarModel 
                modelId={formData.avatarModel} 
                gender={formData.gender} 
              />}
          </div>
          );
        }
        return null;

      case 9: // الاهتمامات (إذا اختار الإجابة)
      case 5: // الاهتمامات (إذا اختار التخطي)
        if ((wantsMedicalQuestions === false && currentStep === 5) || 
            (wantsMedicalQuestions === true && currentStep === 9)) {
          return (
          <div className="step-content preferences">
            <h3>ما هي اهتماماتك في عالم التجميل؟</h3>
            <p className="step-description">
              (لإرسال العروض والإعلانات المناسبة لك)
            </p>
            
            <div className="interests-grid">
              {this.interestsList.map(interest => (
                <div
                  key={interest.id}
                  className={`interest-card ${formData.interests.includes(interest.id) ? "selected" : ""}`}
                  onClick={() => this.handleInterestToggle(interest.id)}
                  style={{ borderColor: interest.color }}
                >
                  <div className="interest-icon" style={{ color: interest.color }}>
                    {interest.icon}
                  </div>
                  <div className="interest-label">{interest.label}</div>
                </div>
              ))}
            </div>

            {this.state.errors.interests && 
              <div className="step-error">{this.state.errors.interests}</div>}
          </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  // ============ رندر المكون الرئيسي ============
  render() {
    const { currentStep, formData } = this.state;
    const { wantsMedicalQuestions } = formData;
    const totalSteps = this.getTotalSteps();
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
      <div className="diagnosis-steps-container">
        {/* شريط التقدم */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="step-info">
            <span className="current-step">الخطوة {currentStep}</span>
            <span className="step-title">
              {currentStep === 1 && "معلومات العميل"}
              {currentStep === 2 && "الأسئلة الطبية"}
              {currentStep === 3 && wantsMedicalQuestions === true && "الوضع الصحي العام"}
              {currentStep === 3 && wantsMedicalQuestions === false && "تشخيص البشرة"}
              {currentStep === 4 && wantsMedicalQuestions === true && "الحساسية"}
              {currentStep === 4 && wantsMedicalQuestions === false && "الأفاتار"}
              {currentStep === 5 && wantsMedicalQuestions === true && "المكملات والأدوية"}
              {currentStep === 5 && wantsMedicalQuestions === false && "الاهتمامات"}
              {currentStep === 6 && "الأمراض الجلدية"}
              {currentStep === 7 && "تشخيص البشرة"}
              {currentStep === 8 && "الأفاتار"}
              {currentStep === 9 && "الاهتمامات"}
            </span>
            <span className="total-steps">من {totalSteps}</span>
          </div>
        </div>

        {/* محتوى الخطوة */}
        <div className="step-wrapper">
          {this.renderStepContent()}
        </div>

        {/* أزرار التنقل */}
        <div className="navigation-buttons">
          <button 
            className="nav-btn prev-btn"
            onClick={this.goToPreviousStep}
          >
            {currentStep === 1 ? "رجوع" : "السابق"}
          </button>
          
          <button 
            className="nav-btn next-btn"
            onClick={this.goToNextStep}
          >
            {currentStep >= totalSteps ? "إنهاء التسجيل" : "التالي"}
          </button>
        </div>

        {/* التصميمات */}
        <style>{`
          .diagnosis-steps-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 25px 20px;
            background: linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 50%, #FDF2F8 100%);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(236, 72, 153, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(251, 207, 232, 0.3);
          }
          
          .progress-container {
            margin-bottom: 28px;
          }
          
          .progress-bar {
            height: 6px;
            background: rgba(251, 207, 232, 0.3);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 12px;
            position: relative;
          }
          
          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #EC4899 0%, #F472B6 50%, #FBBF24 100%);
            border-radius: 10px;
            transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
          }
          
          .step-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #9CA3AF;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.3px;
          }
          
          .step-title {
            flex: 1;
            text-align: center;
            font-size: 13px;
            color: #EC4899;
            font-weight: 600;
            letter-spacing: 0.2px;
          }
          
          .step-wrapper {
            min-height: 380px;
            padding: 15px 0;
          }
          
          .step-content h3 {
            text-align: center;
            color: #BE185D;
            font-size: 20px;
            margin-bottom: 10px;
            font-weight: 700;
            letter-spacing: -0.3px;
            background: linear-gradient(135deg, #EC4899, #F472B6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .step-description {
            text-align: center;
            color: #6B7280;
            margin-bottom: 28px;
            font-size: 12px;
            line-height: 1.7;
            font-weight: 400;
          }
          
          .input-field {
            margin-bottom: 20px;
          }
          
          .input-field label {
            display: block;
            color: #6B7280;
            margin-bottom: 7px;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.2px;
          }
          
          .input-field input {
            width: 100%;
            padding: 12px 14px;
            border: 1.5px solid rgba(251, 207, 232, 0.5);
            border-radius: 12px;
            font-size: 13px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(255, 255, 255, 0.8);
            box-sizing: border-box;
            color: #374151;
          }
          
          .input-field input:focus {
            outline: none;
            border-color: #EC4899;
            background: white;
            box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.1), 0 2px 8px rgba(236, 72, 153, 0.15);
            transform: translateY(-1px);
          }
          
          .input-field input.error {
            border-color: #EF4444;
            background: #FEF2F2;
          }
          
          .field-error {
            display: block;
            color: #EF4444;
            font-size: 11px;
            margin-top: 6px;
            font-weight: 500;
          }
          
          .options-section {
            margin-bottom: 28px;
          }
          
          .options-section label {
            display: block;
            color: #6B7280;
            margin-bottom: 12px;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.2px;
          }
          
          .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
          }
          
          .option-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 14px 10px;
            border-radius: 14px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid rgba(251, 207, 232, 0.4);
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.08);
            backdrop-filter: blur(10px);
          }
          
          .option-card:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.2);
            border-color: rgba(236, 72, 153, 0.6);
          }
          
          .option-card.selected {
            border-color: currentColor;
            background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(251, 207, 232, 0.3));
            box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25), inset 0 0 20px rgba(236, 72, 153, 0.05);
            transform: translateY(-2px);
          }
          
          .option-icon {
            font-size: 32px;
            margin-bottom: 8px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }
          
          .option-range {
            font-size: 22px;
            margin-bottom: 8px;
            font-weight: 700;
          }
          
          .option-label {
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            letter-spacing: 0.1px;
          }
          
          .option-desc {
            font-size: 10px;
            color: #9CA3AF;
            margin-top: 4px;
            line-height: 1.4;
          }
          
          .step-error {
            text-align: center;
            color: #EF4444;
            margin-top: 15px;
            font-size: 11px;
            background: rgba(254, 242, 242, 0.8);
            padding: 10px;
            border-radius: 10px;
            border: 1px solid rgba(254, 202, 202, 0.6);
            font-weight: 500;
          }
          
          .medical-choice-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 420px;
            margin: 0 auto 25px;
          }
          
          .choice-button {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 18px;
            border-radius: 14px;
            border: 2px solid rgba(251, 207, 232, 0.5);
            background: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: right;
            box-shadow: 0 2px 10px rgba(236, 72, 153, 0.1);
            backdrop-filter: blur(10px);
          }
          
          .choice-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.2);
          }
          
          .choice-button.selected {
            border-width: 2px;
            box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25);
            transform: translateY(-2px);
          }
          
          .yes-button {
            border-color: rgba(16, 185, 129, 0.4);
          }
          
          .yes-button:hover,
          .yes-button.selected {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
            border-color: #10B981;
          }
          
          .no-button {
            border-color: rgba(251, 191, 36, 0.4);
          }
          
          .no-button:hover,
          .no-button.selected {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05));
            border-color: #FBBF24;
          }
          
          .choice-icon {
            font-size: 28px;
            flex-shrink: 0;
          }
          
          .choice-text {
            flex: 1;
            text-align: right;
          }
          
          .choice-title {
            font-size: 14px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 3px;
            letter-spacing: 0.1px;
          }
          
          .choice-desc {
            font-size: 11px;
            color: #6B7280;
            line-height: 1.5;
          }
          
          .skip-message {
            background: linear-gradient(135deg, rgba(251, 207, 232, 0.2), rgba(252, 231, 243, 0.1));
            border: 1.5px solid rgba(236, 72, 153, 0.3);
            border-radius: 12px;
            padding: 14px 16px;
            margin-top: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
            backdrop-filter: blur(10px);
          }
          
          .message-icon {
            font-size: 24px;
            flex-shrink: 0;
          }
          
          .skip-message p {
            margin: 0;
            color: #BE185D;
            font-size: 11px;
            line-height: 1.6;
            font-weight: 500;
          }
          
          .avatar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin: 28px 0;
          }
          
          .avatar-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 18px 14px;
            border-radius: 16px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid rgba(251, 207, 232, 0.4);
            box-shadow: 0 3px 12px rgba(236, 72, 153, 0.1);
            backdrop-filter: blur(10px);
          }
          
          .avatar-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 24px rgba(236, 72, 153, 0.2);
            border-color: rgba(236, 72, 153, 0.6);
          }
          
          .avatar-card.selected {
            border-color: currentColor;
            background: linear-gradient(135deg, rgba(255,255,255,1), rgba(251, 207, 232, 0.3));
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.25), inset 0 0 20px rgba(236, 72, 153, 0.05);
            transform: translateY(-2px);
          }
          
          .avatar-emoji {
            font-size: 56px;
            margin-bottom: 12px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
          }
          
          .avatar-label {
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            letter-spacing: 0.1px;
          }
          
          .interests-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 10px;
          }
          
          .interest-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 16px 12px;
            border-radius: 14px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid rgba(251, 207, 232, 0.4);
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.08);
            backdrop-filter: blur(10px);
          }
          
          .interest-card:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 6px 18px rgba(236, 72, 153, 0.2);
            border-color: rgba(236, 72, 153, 0.6);
          }
          
          .interest-card.selected {
            border-color: currentColor;
            background: linear-gradient(135deg, rgba(255,255,255,1), rgba(251, 207, 232, 0.3));
            box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25), inset 0 0 20px rgba(236, 72, 153, 0.05);
            transform: translateY(-2px);
          }
          
          .interest-icon {
            font-size: 28px;
            margin-bottom: 10px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }
          
          .interest-label {
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            letter-spacing: 0.1px;
          }
          
          .navigation-buttons {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-top: 35px;
            padding-top: 22px;
            border-top: 1px solid rgba(251, 207, 232, 0.4);
          }
          
          .nav-btn {
            flex: 1;
            padding: 13px 18px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 0.3px;
          }
          
          .prev-btn {
            background: rgba(255, 255, 255, 0.8);
            color: #6B7280;
            border: 1.5px solid rgba(251, 207, 232, 0.5);
            backdrop-filter: blur(10px);
          }
          
          .prev-btn:hover {
            background: rgba(251, 207, 232, 0.2);
            transform: translateX(-2px);
            box-shadow: -3px 3px 12px rgba(236, 72, 153, 0.15);
            border-color: rgba(236, 72, 153, 0.4);
          }
          
          .next-btn {
            background: linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FBBF24 100%);
            color: white;
            box-shadow: 0 3px 12px rgba(236, 72, 153, 0.3);
          }
          
          .next-btn:hover {
            transform: translateX(2px);
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
            background: linear-gradient(135deg, #DB2777 0%, #EC4899 50%, #F59E0B 100%);
          }
          
          @media (max-width: 768px) {
            .diagnosis-steps-container {
              padding: 18px 15px;
              border-radius: 20px;
              margin: 0 10px;
            }
            
            .options-grid,
            .avatar-grid,
            .interests-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            
            .option-card,
            .avatar-card,
            .interest-card {
              padding: 12px 8px;
            }
            
            .avatar-emoji {
              font-size: 44px;
            }
            
            .step-content h3 {
              font-size: 18px;
            }
            
            .step-description {
              font-size: 11px;
              margin-bottom: 24px;
            }
            
            .nav-btn {
              padding: 12px 16px;
              font-size: 12px;
            }
          }
          
          @media (max-width: 480px) {
            .options-grid,
            .avatar-grid,
            .interests-grid {
              grid-template-columns: 1fr;
            }
            
            .step-content h3 {
              font-size: 16px;
            }
            
            .step-wrapper {
              min-height: 320px;
            }
            
            .nav-btn {
              padding: 11px 14px;
              font-size: 11px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(DiagnosisSteps);
