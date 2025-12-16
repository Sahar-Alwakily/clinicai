import styled from "styled-components";

export const PatientFormContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0.4rem 0.3rem;
  
  .container {
    max-width: 7.5rem;
    margin: 0 auto;
  }
  
  .header-section {
    text-align: center;
    margin-bottom: 0.4rem;
    
    .header-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0.1rem;
      border-radius: 0.2rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      
      > div {
        background: #fff;
        border-radius: 0.15rem;
        padding: 0.3rem 0.4rem;
        
        h1 {
          font-size: 0.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 0.1rem 0;
        }
        
        p {
          color: #666;
          font-size: 0.24rem;
          margin: 0;
        }
      }
    }
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.3rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .chronic-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .chronic-item {
      background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
      padding: 0.2rem;
      border-radius: 0.15rem;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }
  }
  
  .cosmetics-grid,
  .medications-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .cosmetic-item,
    .medication-item {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%);
      padding: 0.2rem;
      border-radius: 0.15rem;
      border: 1px solid rgba(236, 72, 153, 0.2);
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
  }
  
  .medical-choice-card {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border: 2px solid #ffc107;
    
    .choice-content {
      text-align: center;
      padding: 0.2rem;
      
      p {
        font-size: 0.32rem;
        font-weight: 600;
        color: #333;
        margin: 0 0 0.15rem 0;
      }
      
      .subtitle {
        font-size: 0.24rem;
        color: #666;
        font-weight: normal;
        margin-bottom: 0.3rem;
      }
      
      .choice-buttons {
        display: flex;
        gap: 0.2rem;
        justify-content: center;
        flex-wrap: wrap;
        
        .choice-btn {
          padding: 0.2rem 0.4rem;
          border-radius: 0.15rem;
          font-size: 0.28rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &.yes-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #fff;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            }
          }
          
          &.no-btn {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: #fff;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            }
          }
        }
      }
    }
  }
  
  .signature-section {
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.3rem;
      
      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .signature-canvas-wrapper {
      background: #fff;
      border-radius: 0.15rem;
      border: 1px solid #ddd;
      padding: 0.15rem;
      margin-top: 0.15rem;
      
      .sig-canvas {
        width: 100%;
        border-radius: 0.1rem;
        border: 1px solid #e0e0e0;
      }
    }
    
    .signature-actions {
      margin-top: 0.2rem;
      
      .clear-btn {
        padding: 0.15rem 0.3rem;
        background: #fee2e2;
        color: #dc2626;
        border: none;
        border-radius: 0.1rem;
        font-size: 0.24rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #fecaca;
        }
      }
    }
    
    .signature-preview {
      margin-top: 0.3rem;
      padding: 0.3rem;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
      border-radius: 0.15rem;
      border: 2px dashed rgba(139, 92, 246, 0.3);
      
      .preview-content {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        margin-bottom: 0.2rem;
        
        .preview-icon {
          width: 0.6rem;
          height: 0.6rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.32rem;
          font-weight: bold;
        }
        
        .preview-title {
          font-size: 0.32rem;
          font-weight: 700;
          color: #7c3aed;
          margin: 0;
        }
        
        .preview-subtitle {
          font-size: 0.24rem;
          color: #666;
          margin: 0;
        }
      }
      
      .preview-info {
        background: rgba(255, 255, 255, 0.8);
        padding: 0.2rem;
        border-radius: 0.1rem;
        border: 1px solid rgba(139, 92, 246, 0.2);
        
        p {
          font-size: 0.24rem;
          margin: 0.05rem 0;
          color: #333;
          
          &:first-child {
            font-weight: 600;
          }
        }
      }
    }
  }
  
  .submit-section {
    text-align: center;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const SectionCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  
  label {
    display: block;
    font-size: 0.24rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-bottom: 0.3rem;
  
  .icon {
    width: 0.5rem;
    height: 0.5rem;
    background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.28rem;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 0.32rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  border: 1px solid #e0e0e0;
  font-size: 0.26rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  border: 1px solid #e0e0e0;
  font-size: 0.26rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const YesNoGroup = styled.div`
  margin-bottom: ${props => props.isSmall ? '0.15rem' : '0.2rem'};
  padding: ${props => props.isSmall ? '0.15rem' : '0.2rem'};
  background: ${props => props.isSmall ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)' : 'transparent'};
  border-radius: ${props => props.isSmall ? '0.1rem' : '0'};
  
  .label {
    display: block;
    font-size: ${props => props.isSmall ? '0.24rem' : '0.26rem'};
    font-weight: 500;
    color: #333;
    margin-bottom: 0.1rem;
  }
  
  .options {
    display: flex;
    gap: 0.2rem;
    margin-top: 0.1rem;
    
    .option {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      cursor: pointer;
      
      input[type="radio"] {
        width: 0.32rem;
        height: 0.32rem;
        cursor: pointer;
        
        &:checked {
          accent-color: ${props => props.isSmall ? '#3b82f6' : '#10b981'};
        }
      }
      
      span {
        font-size: 0.24rem;
        color: #333;
      }
    }
  }
`;

export const CheckboxGroup = styled.div`
  margin-bottom: 0.15rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      width: 0.32rem;
      height: 0.32rem;
      cursor: pointer;
      accent-color: #f59e0b;
    }
    
    span {
      font-size: 0.24rem;
      color: #333;
    }
  }
`;

export const GenderSelector = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.1rem;
  
  label {
    flex: 1;
    padding: 0.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.15rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fff;
    
    input[type="radio"] {
      display: none;
    }
    
    span {
      font-size: 0.28rem;
      font-weight: 500;
      color: #666;
    }
    
    &.active {
      border-color: #667eea;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      
      span {
        color: #667eea;
        font-weight: 600;
      }
    }
    
    &:hover {
      border-color: #667eea;
    }
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.32rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.15rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SkipButton = styled.button`
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.28rem;
  font-weight: 500;
  padding: 0.2rem 0.4rem;
  border-radius: 0.15rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

export const SignatureCanvasWrapper = styled.div`
  .sig-canvas {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 0.1rem;
    cursor: crosshair;
    touch-action: none;
    background: #f8fafc;
  }
`;

