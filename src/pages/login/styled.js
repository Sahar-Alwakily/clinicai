
import styled from "styled-components";

// ألوان موحدة للعيادات التجميلية
const clinicColors = {
  primary: "#7C3AED", // بنفسجي أرجواني
  primaryLight: "#8B5CF6",
  secondary: "#10B981", // أخضر زمردي
  accent: "#3B82F6", // أزرق سماوي
  background: "#F8FAFC", // خلفية رمادية فاتحة
  surface: "#FFFFFF", // أسطح بيضاء
  textPrimary: "#1F2937", // نص رئيسي غامق
  textSecondary: "#6B7280", // نص ثانوي رمادي
  textTertiary: "#9CA3AF", // نص ثالثي فاتح
  border: "#E5E7EB", // حدود فاتحة
  error: "#EF4444", // أحمر للخطأ
  success: "#10B981", // أخضر للنجاح
  warning: "#F59E0B", // أصفر للتحذير
};

export const Loginbody = styled.div`
  min-height: 100vh;
  background: ${clinicColors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding: 0;
  margin: 0;
  color: ${clinicColors.textPrimary};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
  
  .welcome-section {
    text-align: center;
    padding: 40px 20px 20px;
    
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: ${clinicColors.textPrimary};
      margin-bottom: 8px;
      
      @media (max-width: 768px) {
        font-size: 22px;
      }
      
      @media (max-width: 480px) {
        font-size: 20px;
      }
    }
    
    p {
      font-size: 14px;
      color: ${clinicColors.textSecondary};
      margin: 0;
    }
  }
  
  .input-group {
    margin-bottom: 24px;
    
    .input-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: ${clinicColors.textSecondary};
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .input-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      
      .send-code-btn {
        font-size: 12px;
        color: ${clinicColors.primary};
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover:not(.disabled) {
          background: rgba(124, 58, 237, 0.1);
        }
        
        &.disabled {
          color: ${clinicColors.textTertiary};
          cursor: not-allowed;
        }
      }
      
      .forgot-btn {
        font-size: 12px;
        color: ${clinicColors.textSecondary};
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover {
          color: ${clinicColors.primary};
          background: rgba(124, 58, 237, 0.1);
        }
      }
    }
    
    .input-with-prefix {
      display: flex;
      align-items: center;
      background: ${clinicColors.surface};
      border: 1px solid ${clinicColors.border};
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
      
      &:focus-within {
        border-color: ${clinicColors.primary};
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
      }
      
      .prefix {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 16px;
        font-size: 14px;
        font-weight: 600;
        color: ${clinicColors.textPrimary};
        background: ${clinicColors.background};
        height: 48px;
        border-right: 1px solid ${clinicColors.border};
        cursor: pointer;
        
        &:hover {
          background: ${clinicColors.border};
        }
      }
    }
  }
  
  .form-input {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 14px;
    color: ${clinicColors.textPrimary};
    background: ${clinicColors.surface};
    border: 1px solid ${clinicColors.border};
    border-radius: 12px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${clinicColors.primary};
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    }
    
    &::placeholder {
      color: ${clinicColors.textTertiary};
    }
    
    &.verification-input {
      text-align: center;
      letter-spacing: 8px;
      font-size: 16px;
      font-weight: 600;
      
      @media (max-width: 480px) {
        letter-spacing: 6px;
      }
    }
  }
  
  .error-message {
    font-size: 12px;
    color: ${clinicColors.error};
    margin-top: 6px;
    padding-left: 8px;
  }
  
  .info-note {
    font-size: 12px;
    color: ${clinicColors.textSecondary};
    text-align: center;
    margin: 20px 0;
    padding: 12px;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  .submit-btn {
    width: 100%;
    height: 48px;
    background: linear-gradient(135deg, ${clinicColors.primary}, ${clinicColors.primaryLight});
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 8px;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 32px 0;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${clinicColors.border};
    }
    
    span {
      padding: 0 16px;
      font-size: 12px;
      color: ${clinicColors.textTertiary};
    }
  }
  
  .social-login {
    text-align: center;
    
    .social-title {
      font-size: 12px;
      color: ${clinicColors.textSecondary};
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .social-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      
      @media (max-width: 480px) {
        flex-direction: column;
        gap: 8px;
      }
    }
    
    .social-btn {
      flex: 1;
      max-width: 120px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid ${clinicColors.border};
      border-radius: 10px;
      background: ${clinicColors.surface};
      cursor: pointer;
      transition: all 0.2s ease;
      
      @media (max-width: 480px) {
        max-width: 100%;
      }
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      &.google {
        color: #1F2937;
        
        &:hover {
          border-color: #DB4437;
          color: #DB4437;
        }
        
        .social-icon {
          color: #DB4437;
          font-weight: 700;
        }
      }
      
      &.apple {
        color: #1F2937;
        
        &:hover {
          border-color: #000000;
          color: #000000;
        }
        
        .social-icon {
          font-size: 16px;
        }
      }
      
      &.facebook {
        color: #1F2937;
        
        &:hover {
          border-color: #1877F2;
          color: #1877F2;
        }
        
        .social-icon {
          color: #1877F2;
          font-weight: 700;
        }
      }
    }
  }
  
  .register-prompt {
    text-align: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid ${clinicColors.border};
    
    p {
      font-size: 13px;
      color: ${clinicColors.textSecondary};
      margin-bottom: 8px;
    }
    
    .register-link {
      font-size: 14px;
      color: ${clinicColors.primary};
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(124, 58, 237, 0.1);
      }
    }
  }
  
  .agreement {
    font-size: 11px;
    color: ${clinicColors.textTertiary};
    text-align: center;
    padding: 20px;
    
    a {
      color: ${clinicColors.primary};
      text-decoration: none;
      margin: 0 4px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  /* إخفاء وإظهار النماذج */
  .login-quick,
  .login-account {
    display: none;
    
    &.active {
      display: block;
      animation: fadeIn 0.3s ease;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* تصميمات التسجيل */
  .form-step {
    background: ${clinicColors.surface};
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    
    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      
      .step {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        color: ${clinicColors.textTertiary};
        background: ${clinicColors.background};
        border: 2px solid ${clinicColors.border};
        
        &.active {
          color: ${clinicColors.primary};
          background: white;
          border-color: ${clinicColors.primary};
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }
        
        &.completed {
          background: ${clinicColors.primary};
          color: white;
          border-color: ${clinicColors.primary};
        }
      }
      
      .step-line {
        width: 40px;
        height: 2px;
        background: ${clinicColors.border};
        margin: 0 8px;
        
        &.active {
          background: ${clinicColors.primary};
        }
      }
    }
    
    .form-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      
      .form-select {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        background: ${clinicColors.background};
        border: 1px solid ${clinicColors.border};
        border-radius: 12px;
        font-size: 14px;
        color: ${clinicColors.textPrimary};
        cursor: pointer;
        min-width: 90px;
        transition: all 0.2s ease;
        
        &:hover {
          background: ${clinicColors.border};
        }
        
        span {
          margin-right: 8px;
        }
      }
      
      .input-wrap {
        flex: 1;
        
        &.full-width {
          width: 100%;
        }
      }
    }
    
    .form-submit {
      width: 100%;
      height: 48px;
      background: linear-gradient(135deg, ${clinicColors.primary}, ${clinicColors.primaryLight});
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
      
      &.success-btn {
        background: linear-gradient(135deg, ${clinicColors.success}, #34D399);
        &:hover {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
      }
    }
    
    .verification-info {
      text-align: center;
      margin-bottom: 24px;
      
      p {
        color: ${clinicColors.textSecondary};
        font-size: 14px;
        margin: 0;
      }
      
      .phone-number {
        color: ${clinicColors.primary};
        font-weight: 600;
        font-size: 16px;
        margin-top: 8px;
      }
    }
    
    .verification-actions {
      .resend-btn {
        width: 100%;
        background: none;
        border: none;
        color: ${clinicColors.textSecondary};
        font-size: 13px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover:not(.disabled) {
          color: ${clinicColors.primary};
        }
        
        &.disabled {
          color: ${clinicColors.textTertiary};
          cursor: not-allowed;
        }
      }
    }
    
    .registration-note {
      background: rgba(124, 58, 237, 0.05);
      border: 1px solid rgba(124, 58, 237, 0.1);
      border-radius: 10px;
      padding: 16px;
      margin-top: 20px;
      
      p {
        font-size: 13px;
        color: ${clinicColors.textSecondary};
        margin: 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        
        &:before {
          font-size: 16px;
        }
      }
    }
  }
  
  /* خطوة الاكتمال */
  .complete-step {
    text-align: center;
    
    .success-animation {
      margin-bottom: 30px;
      
      .success-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, ${clinicColors.success}, #34D399);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
        margin: 0 auto 20px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      }
      
      h2 {
        color: ${clinicColors.textPrimary};
        margin-bottom: 12px;
        font-size: 24px;
      }
      
      .success-message {
        color: ${clinicColors.textSecondary};
        font-size: 15px;
        line-height: 1.5;
      }
    }
    
    .user-summary {
      background: ${clinicColors.background};
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: left;
      
      .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid ${clinicColors.border};
        
        &:last-child {
          border-bottom: none;
        }
        
        .label {
          color: ${clinicColors.textSecondary};
          font-size: 14px;
        }
        
        .value {
          color: ${clinicColors.textPrimary};
          font-weight: 600;
          font-size: 14px;
          
          &.interests {
            max-width: 200px;
            text-align: left;
          }
        }
      }
    }
    
    .welcome-note {
      background: rgba(124, 58, 237, 0.05);
      border: 1px solid rgba(124, 58, 237, 0.1);
      border-radius: 10px;
      padding: 16px;
      margin-top: 20px;
      
      p {
        font-size: 13px;
        color: ${clinicColors.textSecondary};
        margin: 8px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        
        &:before {
          font-size: 16px;
        }
      }
    }
  }
  
  /* تحسينات للأجهزة المحمولة */
  @media (max-width: 768px) {
    .form-step {
      padding: 20px;
      
      .step-indicator {
        .step {
          width: 28px;
          height: 28px;
          font-size: 12px;
        }
        
        .step-line {
          width: 30px;
        }
      }
    }
    
    .complete-step {
      .success-animation {
        .success-icon {
          width: 70px;
          height: 70px;
          font-size: 35px;
        }
        
        h2 {
          font-size: 20px;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    .form-step {
      padding: 16px;
      
      .form-group {
        flex-direction: column;
        
        .form-select {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${clinicColors.surface};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  .close {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${clinicColors.textPrimary};
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${clinicColors.background};
    
    &:hover {
      background: ${clinicColors.border};
    }
  }
  
  .reg {
    font-size: 13px;
    font-weight: 600;
    color: ${clinicColors.primary};
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(124, 58, 237, 0.1);
    }
  }
  
  .register {
    font-size: 15px;
    font-weight: 600;
    color: ${clinicColors.textPrimary};
  }
`;

export const Nav = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 20px 30px;
  padding: 4px;
  background: ${clinicColors.background};
  border-radius: 12px;
  
  div {
    flex: 1;
    padding: 10px 16px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: ${clinicColors.textSecondary};
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover:not(.selected) {
      background: rgba(124, 58, 237, 0.05);
      color: ${clinicColors.primary};
    }
    
    &.selected {
      background: ${clinicColors.surface};
      color: ${clinicColors.primary};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`;

export const Main = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px 40px;
  
  @media (max-width: 480px) {
    padding: 0 16px 30px;
  }
`;

export const Footer = styled.footer`
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  
  .other-warn {
    font-size: 11px;
    color: ${clinicColors.textTertiary};
    
    a {
      color: ${clinicColors.primary};
      text-decoration: none;
      margin: 0 4px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
