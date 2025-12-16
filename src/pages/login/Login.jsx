import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Icon } from "antd-mobile";
import { Loginbody, Header, Nav, Main, Footer } from "./styled";

@withRouter
class Login extends Component {
  state = {
    loginType: "quick", // quick or account
    phone: "",
    account: "",
    password: "",
    verificationCode: "",
    countdown: 0,
    errors: {}
  };

  gotoregister = () => {
    this.props.history.push("/register");
  };

  gotohome = () => {
    this.props.history.push("/home");
  };

  switchLoginType = (type) => {
    this.setState({ 
      loginType: type,
      errors: {}
    });
  };

  handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/[^0-9]/g, "");
    this.setState({ 
      phone,
      errors: { ...this.state.errors, phone: "" }
    });
  };

  handleAccountChange = (e) => {
    this.setState({ 
      account: e.target.value,
      errors: { ...this.state.errors, account: "" }
    });
  };

  handlePasswordChange = (e) => {
    this.setState({ 
      password: e.target.value,
      errors: { ...this.state.errors, password: "" }
    });
  };

  handleVerificationChange = (e) => {
    const verificationCode = e.target.value.replace(/[^0-9]/g, "");
    this.setState({ 
      verificationCode,
      errors: { ...this.state.errors, verificationCode: "" }
    });
  };

  validateQuickLogin = () => {
    const { phone, verificationCode } = this.state;
    const errors = {};

    if (!phone.trim()) {
      errors.phone = "الرجاء إدخال رقم الهاتف";
    } else if (!/^05\d{8}$/.test(phone)) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }

    if (!verificationCode || verificationCode.length !== 6) {
      errors.verificationCode = "الرجاء إدخال رمز التحقق المكون من 6 أرقام";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  validateAccountLogin = () => {
    const { account, password } = this.state;
    const errors = {};

    if (!account.trim()) {
      errors.account = "الرجاء إدخال اسم المستخدم أو البريد الإلكتروني";
    }

    if (!password.trim()) {
      errors.password = "الرجاء إدخال كلمة المرور";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  handleQuickLogin = () => {
    if (this.validateQuickLogin()) {
      // محاكاة عملية تسجيل الدخول
      console.log("تسجيل الدخول السريع:", this.state.phone);
      this.gotohome();
    }
  };

  handleAccountLogin = () => {
    if (this.validateAccountLogin()) {
      // محاكاة عملية تسجيل الدخول
      console.log("تسجيل الدخول بالحساب:", this.state.account);
      this.gotohome();
    }
  };

  sendVerificationCode = () => {
    const { phone } = this.state;
    
    if (!phone || !/^05\d{8}$/.test(phone)) {
      this.setState({ 
        errors: { phone: "الرجاء إدخال رقم هاتف صحيح" } 
      });
      return;
    }

    this.setState({ 
      countdown: 60,
      errors: {}
    });

    // محاكاة إرسال رمز التحقق
    setTimeout(() => {
      alert(`تم إرسال رمز التحقق إلى ${phone} (الرمز: 123456)`);
    }, 1000);
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgot-password");
  };

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

  render() {
    const { loginType, countdown, errors } = this.state;

    return (
      <Loginbody>
        <Header>
          <div className="close" onClick={this.gotohome}>
            ✕
          </div>
          <div className="reg" onClick={this.gotoregister}>
            إنشاء حساب
          </div>
        </Header>

        <div className="welcome-section">
          <h1>مرحباً بعودتك!</h1>
          <p>سجل الدخول للمتابعة</p>
        </div>

        <Nav>
          <div 
            className={loginType === "quick" ? "selected" : ""}
            onClick={() => this.switchLoginType("quick")}
          >
            تسجيل سريع
          </div>
          <div 
            className={loginType === "account" ? "selected" : ""}
            onClick={() => this.switchLoginType("account")}
          >
            تسجيل بالحساب
          </div>
        </Nav>

        <Main>
          {/* نموذج التسجيل السريع */}
          <form 
            className={`login-quick ${loginType === "quick" ? "active" : ""}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="input-group">
              <label className="input-label">رقم الهاتف</label>
              <div className="input-with-prefix">
                <div className="prefix">
                  +966
                  <Icon type="down" size="xs" />
                </div>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="مثال: 0512345678"
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                  maxLength="10"
                />
              </div>
              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>

            <div className="input-group">
              <div className="input-header">
                <label className="input-label">رمز التحقق</label>
                <button
                  type="button"
                  className={`send-code-btn ${countdown > 0 ? "disabled" : ""}`}
                  onClick={this.sendVerificationCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `إعادة الإرسال (${countdown} ث)` : "إرسال الرمز"}
                </button>
              </div>
              <input
                type="text"
                className="form-input verification-input"
                placeholder="أدخل الرمز المكون من 6 أرقام"
                value={this.state.verificationCode}
                onChange={this.handleVerificationChange}
                maxLength="6"
              />
              {errors.verificationCode && (
                <div className="error-message">{errors.verificationCode}</div>
              )}
            </div>

            <p className="info-note">
              سيتم إنشاء حساب جديد تلقائياً للهواتف غير المسجلة
            </p>

            <button
              type="button"
              className="submit-btn"
              onClick={this.handleQuickLogin}
            >
              تسجيل الدخول
            </button>
          </form>

          {/* نموذج تسجيل الدخول بالحساب */}
          <form 
            className={`login-account ${loginType === "account" ? "active" : ""}`}
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <div className="input-group">
              <label className="input-label">اسم المستخدم أو البريد الإلكتروني</label>
              <input
                type="text"
                className="form-input"
                placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                value={this.state.account}
                onChange={this.handleAccountChange}
                autoComplete="off"
              />
              {errors.account && (
                <div className="error-message">{errors.account}</div>
              )}
            </div>

            <div className="input-group">
              <div className="input-header">
                <label className="input-label">كلمة المرور</label>
                <button
                  type="button"
                  className="forgot-btn"
                  onClick={this.handleForgotPassword}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="أدخل كلمة المرور"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                autoComplete="off"
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <button
              type="button"
              className="submit-btn"
              onClick={this.handleAccountLogin}
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="divider">
            <span>أو</span>
          </div>


          <div className="register-prompt">
            <p>ليس لديك حساب؟</p>
            <button className="register-link" onClick={this.gotoregister}>
              إنشاء حساب جديد
            </button>
          </div>
        </Main>

        <Footer>
          <div className="agreement">
            <p>
              باستخدام التطبيق، فإنك توافق على
              <a href="https://www.soyoung.com/apps/usernotes" target="_blank" rel="noopener noreferrer">
                شروط الخدمة
              </a>
              و
              <a href="https://www.soyoung.com/apps/privacy" target="_blank" rel="noopener noreferrer">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </Footer>
      </Loginbody>
    );
  }
}

export default Login;