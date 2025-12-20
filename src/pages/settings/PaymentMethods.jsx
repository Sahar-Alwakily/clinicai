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

const PaymentList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const PaymentCard = styled.div`
  background: white;
  padding: 0.2rem 0.25rem;
  margin-bottom: 0.15rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafa;
  }
  
  .payment-info {
    display: flex;
    align-items: center;
    gap: 0.12rem;
    
    .payment-icon {
      font-size: 0.3rem;
    }
    
    .payment-details {
      .payment-name {
        font-size: 0.2rem;
        font-weight: 600;
        color: #2d3748;
      }
      
      .payment-number {
        font-size: 0.16rem;
        color: #718096;
        margin-top: 0.03rem;
      }
    }
  }
  
  .payment-actions {
    display: flex;
    gap: 0.1rem;
    
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 0.2rem;
      color: #999;
      transition: all 0.2s ease;
      
      &:hover {
        color: #667eea;
        transform: scale(1.1);
      }
    }
  }
`;

const AddButton = styled.button`
  width: calc(100% - 0.5rem);
  margin: 0.2rem 0.25rem;
  padding: 0.2rem;
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
class PaymentMethods extends Component {
  state = {
    paymentMethods: [
      { id: 1, type: "visa", name: "بطاقة فيزا", number: "**** **** **** 1234", icon: "💳" },
      { id: 2, type: "mada", name: "مدى", number: "**** **** **** 5678", icon: "💳" }
    ]
  };

  handleRemove = (id) => {
    this.setState(prevState => ({
      paymentMethods: prevState.paymentMethods.filter(pm => pm.id !== id)
    }));
  };

  render() {
    const { paymentMethods } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>💳 طرق الدفع</h1>
        </Header>

        <PaymentList>
          {paymentMethods.map(payment => (
            <PaymentCard key={payment.id}>
              <div className="payment-info">
                <div className="payment-icon">{payment.icon}</div>
                <div className="payment-details">
                  <div className="payment-name">{payment.name}</div>
                  <div className="payment-number">{payment.number}</div>
                </div>
              </div>
              <div className="payment-actions">
                <button onClick={() => this.handleRemove(payment.id)}>🗑️</button>
              </div>
            </PaymentCard>
          ))}
        </PaymentList>

        <AddButton onClick={() => alert('إضافة طريقة دفع جديدة')}>
          + إضافة طريقة دفع جديدة
        </AddButton>

        <BottomNav />
      </Container>
    );
  }
}

export default PaymentMethods;

