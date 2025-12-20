import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const Container = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 1.5rem;
  direction: rtl;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.3rem 0.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 0.24rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }
  
  h1 {
    font-size: 0.28rem;
    font-weight: 700;
    margin: 0;
    flex: 1;
    color: white;
  }
`;

const FormSection = styled.div`
  background: white;
  margin: 0.2rem 0.25rem;
  border-radius: 0.15rem;
  padding: 0.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const FormGroup = styled.div`
  margin-bottom: 0.15rem;
  
  label {
    display: block;
    font-size: 0.18rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.08rem;
  }
  
  input {
    width: 100%;
    padding: 0.12rem;
    border: 1.5px solid #e0e0e0;
    border-radius: 0.1rem;
    font-size: 0.18rem;
    color: #333;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const SaveButton = styled.button`
  width: calc(100% - 0.5rem);
  margin: 0.2rem 0.25rem;
  padding: 0.15rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.15rem;
  font-size: 0.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-0.02rem);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

@withRouter
class EditProfile extends Component {
  state = {
    name: "سارة أحمد",
    email: "sara.ahmed@email.com",
    phone: "+966 50 123 4567"
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSave = () => {
    // هنا يمكن حفظ البيانات
    alert('تم حفظ التغييرات بنجاح!');
    this.props.history.goBack();
  };

  render() {
    const { name, email, phone } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>✏️ تعديل الملف الشخصي</h1>
        </Header>

        <FormSection>
          <FormGroup>
            <label>الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => this.handleChange('name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => this.handleChange('email', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => this.handleChange('phone', e.target.value)}
            />
          </FormGroup>
        </FormSection>

        <SaveButton onClick={this.handleSave}>
          حفظ التغييرات
        </SaveButton>

        <BottomNav />
      </Container>
    );
  }
}

export default EditProfile;

