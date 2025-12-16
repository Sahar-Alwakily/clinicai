import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "antd-mobile";

import { Loginbody, Header, Main, Footer } from "./styled";
import DiagnosisSteps from "./skin-diagnosis/DiagnosisSteps";

@withRouter
class Register extends Component {
  state = {
    // حالة التسجيل
    registrationStep: "phone", // phone → verification → diagnosis → complete
    phone: "",
    verificationCode: "",
    countdown: 0,
    
    // بيانات التشخيص
    diagnosisData: {
      name: "",
      email: "",
      medicalHistory: "",
      allergies: "",
      cosmeticSurgeries: "",
      skinType: "",
      age: "",
      avatarModel: "",
      location: "",
      interests: []
    },
    
    // أخطاء
    errors: {},
    isLoading: false
  };

  // ============ معالجة أحداث التنقل ============
  handleBack = () => {
    const { registrationStep } = this.state;
    
    switch (registrationStep) {
      case "verification":
        this.setState({ registrationStep: "phone", errors: {} });
        break;
      case "diagnosis":
        this.setState({ registrationStep: "verification", errors: {} });
        break;
      default:
        this.props.history.go(-1);
    }
  };

  goToHome = () => {
    this.props.history.push("/home");
  };

  // ============ معالجة إدخال رقم الهاتف ============
  handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/[^0-9]/g, "");
    this.setState({ 
      phone,
      errors: { ...this.state.errors, phone: "" }
    });
  };

  validatePhone = () => {
    const { phone } = this.state;
    const errors = {};

    if (!phone.trim()) {
      errors.phone = "الرجاء إدخال رقم الهاتف";
    } else if (!/^05\d{8}$/.test(phone)) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  // ============ إرسال رمز التحقق ============
  sendVerificationCode = () => {
    if (!this.validatePhone()) return;

    this.setState({ 
      countdown: 60,
      isLoading: true,
      errors: {}
    });

    // محاكاة API
    setTimeout(() => {
      this.setState({ 
        registrationStep: "verification",
        isLoading: false
      });
      alert(`تم إرسال رمز التحقق إلى ${this.state.phone} (الرمز: 123456)`);
    }, 1000);
  };

  // ============ تأكيد الرمز ============
  handleVerificationChange = (e) => {
    const verificationCode = e.target.value.replace(/[^0-9]/g, "");
    this.setState({ 
      verificationCode,
      errors: { ...this.state.errors, verification: "" }
    });
  };

  verifyCode = () => {
    const { verificationCode } = this.state;
    
    if (!verificationCode || verificationCode.length !== 6) {
      this.setState({ 
        errors: { verification: "الرجاء إدخال رمز التحقق المكون من 6 أرقام" } 
      });
      return;
    }

    if (verificationCode === "123456") {
      this.setState({ 
        registrationStep: "diagnosis",
        errors: {}
      });
    } else {
      this.setState({ 
        errors: { verification: "رمز التحقق غير صحيح" } 
      });
    }
  };

  // ============ إعادة إرسال الرمز ============
  handleResendCode = () => {
    const { countdown } = this.state;
    if (countdown > 0) return;

    this.setState({ countdown: 60 });
    alert(`تم إعادة إرسال الرمز إلى ${this.state.phone}`);
  };

  // ============ استقبال بيانات التشخيص ============
  handleDiagnosisComplete = (diagnosisData) => {
    this.setState({ 
      diagnosisData,
      registrationStep: "complete",
      isLoading: true 
    });

    // محاكاة حفظ البيانات
    setTimeout(() => {
      const userProfile = {
        phone: this.state.phone,
        ...diagnosisData,
        registeredAt: new Date().toISOString(),
        profileId: `USER_${Date.now()}`
      };

      console.log("✅ ملف المستخدم النهائي:", userProfile);
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      this.setState({ isLoading: false });
      alert("🎉 تم إنشاء حسابك بنجاح! يمكنك الآن الاستفادة من العروض المخصصة.");
    }, 1500);
  };

  // ============ معالجة العداد ============
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        countdown: prevState.countdown > 0 ? prevState.countdown - 1 : 0
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // ============ التصميمات الشرطية ============
  renderHeader = () => {
    const { registrationStep } = this.state;
    const titles = {
      phone: "تسجيل جديد",
      verification: "تأكيد رقم الهاتف",
      diagnosis: "معلومات التسجيل",
      complete: "تم التسجيل بنجاح"
    };

    return (
      <Header>
        <div className="close" onClick={this.handleBack}>
          {registrationStep === "phone" ? "✕" : "←"}
        </div>
        <div className="register">{titles[registrationStep] || "تسجيل"}</div>
      </Header>
    );
  };

  renderPhoneStep = () => (
    <div className="form-step phone-step">
      <div className="step-indicator">
        <div className="step active">1</div>
        <div className="step-line"></div>
        <div className="step">2</div>
        <div className="step-line"></div>
        <div className="step">3</div>
      </div>

      <div className="form-group">
        <button type="button" className="form-select" data-code="00966">
          <span>+966</span>
          <Icon type="down" />
        </button>
        <div className="input-wrap">
          <input
            type="tel"
            className="form-input"
            placeholder="ادخل رقم هاتفك (مثال: 0512345678)"
            value={this.state.phone}
            onChange={this.handlePhoneChange}
            maxLength="10"
          />
        </div>
      </div>

      {this.state.errors.phone && (
        <div className="error-message">{this.state.errors.phone}</div>
      )}

      <button
        type="button"
        className="form-submit"
        onClick={this.sendVerificationCode}
        disabled={this.state.isLoading}
      >
        {this.state.isLoading ? "جاري الإرسال..." : "الحصول على رمز التحقق"}
      </button>

      <div className="registration-note">
        <p>📱 ستحتاج إلى رمز التحقق لإكمال التسجيل</p>
        <p>✅ سيتم إنشاء حساب جديد لك تلقائياً</p>
      </div>
    </div>
  );

  renderVerificationStep = () => (
    <div className="form-step verification-step">
      <div className="step-indicator">
        <div className="step completed">1</div>
        <div className="step-line active"></div>
        <div className="step active">2</div>
        <div className="step-line"></div>
        <div className="step">3</div>
      </div>

      <div className="verification-info">
        <p>تم إرسال رمز التحقق إلى:</p>
        <p className="phone-number">{this.state.phone}</p>
      </div>

      <div className="form-group">
        <div className="input-wrap full-width">
          <input
            type="text"
            className="form-input verification-input"
            placeholder="أدخل الرمز المكون من 6 أرقام"
            value={this.state.verificationCode}
            onChange={this.handleVerificationChange}
            maxLength="6"
          />
        </div>
      </div>

      {this.state.errors.verification && (
        <div className="error-message">{this.state.errors.verification}</div>
      )}

      <div className="verification-actions">
        <button
          type="button"
          className="form-submit"
          onClick={this.verifyCode}
          disabled={this.state.verificationCode.length !== 6}
        >
          تأكيد الرمز والمتابعة
        </button>

        <button
          type="button"
          className={`resend-btn ${this.state.countdown > 0 ? "disabled" : ""}`}
          onClick={this.handleResendCode}
          disabled={this.state.countdown > 0}
        >
          {this.state.countdown > 0 
            ? `إعادة الإرسال (${this.state.countdown} ثانية)` 
            : "إعادة إرسال الرمز"}
        </button>
      </div>
    </div>
  );

  renderCompleteStep = () => (
    <div className="form-step complete-step">
      <div className="success-animation">
        <div className="success-icon">✓</div>
        <h2>أهلاً وسهلاً! 🎉</h2>
        <p className="success-message">
          تم إنشاء حسابك الشخصي بنجاح وتخصيص العروض بناءً على اهتماماتك
        </p>
      </div>

      <div className="user-summary">
        <div className="summary-item">
          <span className="label">رقم الهاتف:</span>
          <span className="value">{this.state.phone}</span>
        </div>
        <div className="summary-item">
          <span className="label">الاسم:</span>
          <span className="value">{this.state.diagnosisData.firstName} {this.state.diagnosisData.lastName}</span>
        </div>
        <div className="summary-item">
          <span className="label">نوع البشرة:</span>
          <span className="value">
            {this.getSkinTypeLabel(this.state.diagnosisData.skinType)}
          </span>
        </div>
        {this.state.diagnosisData.interests.length > 0 && (
          <div className="summary-item">
            <span className="label">الاهتمامات:</span>
            <span className="value interests">
              {this.state.diagnosisData.interests
                .map(interest => this.getInterestLabel(interest))
                .join("، ")}
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="form-submit success-btn"
        onClick={this.goToHome}
      >
        الانتقال إلى الصفحة الرئيسية
      </button>

      <div className="welcome-note">
        <p>📬 سنرسل لك عروضاً خاصة بناءً على تفضيلاتك</p>
        <p>💎 يمكنك تحديث معلوماتك في أي وقت من إعدادات الحساب</p>
      </div>
    </div>
  );

  getSkinTypeLabel = (id) => {
    const types = {
      normal: "بشرة عادية",
      dry: "بشرة جافة",
      oily: "بشرة دهنية",
      combination: "بشرة مختلطة",
      sensitive: "بشرة حساسة"
    };
    return types[id] || id;
  };

  getInterestLabel = (id) => {
    const interests = {
      botox: "بوتوكس",
      filler: "فيلر",
      cosmetica: "كوزميتيكا",
      skincare: "العناية بالبشرة",
      laser: "علاجات الليزر",
      facial: "العناية بالوجه"
    };
    return interests[id] || id;
  };

  render() {
    const { registrationStep } = this.state;

    return (
      <Loginbody>
        {this.renderHeader()}

        <Main>
          {registrationStep === "phone" && this.renderPhoneStep()}
          {registrationStep === "verification" && this.renderVerificationStep()}
          {registrationStep === "diagnosis" && (
            <DiagnosisSteps
              onComplete={this.handleDiagnosisComplete}
              onBack={this.handleBack}
            />
          )}
          {registrationStep === "complete" && this.renderCompleteStep()}
        </Main>

        <Footer>
          <div className="other-warn">
            التسجيل يعني موافقتك على
            <a href="https://www.soyoung.com/apps/usernotes" target="_blank" rel="noopener noreferrer">
              《اتفاقية استخدام عضوية الموقع》
            </a>
          </div>
        </Footer>
      </Loginbody>
    );
  }
}

export default Register;