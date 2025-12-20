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

const ContactList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const ContactItem = styled.div`
  background: white;
  padding: 0.2rem 0.25rem;
  margin-bottom: 0.15rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 0.15rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafa;
    transform: translateY(-0.02rem);
  }
  
  .contact-icon {
    font-size: 0.3rem;
    width: 0.5rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .contact-info {
    flex: 1;
    
    .contact-title {
      font-size: 0.2rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .contact-value {
      font-size: 0.16rem;
      color: #718096;
      margin-top: 0.03rem;
    }
  }
`;

@withRouter
class Contact extends Component {
  state = {
    contacts: [
      { id: 1, type: "phone", title: "الهاتف", value: "+966 50 123 4567", icon: "📞" },
      { id: 2, type: "email", title: "البريد الإلكتروني", value: "support@clinicai.com", icon: "📧" },
      { id: 3, type: "whatsapp", title: "واتساب", value: "+966 50 123 4567", icon: "💬" }
    ]
  };

  render() {
    const { contacts } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>📞 تواصل معنا</h1>
        </Header>

        <ContactList>
          {contacts.map(contact => (
            <ContactItem key={contact.id} onClick={() => {
              if (contact.type === "phone") {
                window.location.href = `tel:${contact.value}`;
              } else if (contact.type === "email") {
                window.location.href = `mailto:${contact.value}`;
              } else if (contact.type === "whatsapp") {
                window.open(`https://wa.me/${contact.value.replace(/\s/g, '')}`, '_blank');
              }
            }}>
              <div className="contact-icon">{contact.icon}</div>
              <div className="contact-info">
                <div className="contact-title">{contact.title}</div>
                <div className="contact-value">{contact.value}</div>
              </div>
            </ContactItem>
          ))}
        </ContactList>

        <BottomNav />
      </Container>
    );
  }
}

export default Contact;

