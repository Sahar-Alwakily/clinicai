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

const FAQList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const FAQItem = styled.div`
  background: white;
  padding: 0.2rem 0.25rem;
  margin-bottom: 0.15rem;
  border-radius: 0.15rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafa;
  }
  
  .faq-question {
    font-size: 0.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.08rem;
  }
  
  .faq-answer {
    font-size: 0.18rem;
    color: #4a5568;
    line-height: 1.5;
  }
`;

@withRouter
class Help extends Component {
  state = {
    faqs: [
      {
        id: 1,
        question: "كيف يمكنني حجز موعد؟",
        answer: "يمكنك حجز موعد من خلال صفحة الكتالوج أو البحث عن العلاج المطلوب ثم اختيار الطبيب والموعد المناسب."
      },
      {
        id: 2,
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "نقبل الدفع نقداً، بالبطاقات الائتمانية، ومدى. يمكنك إضافة طرق الدفع من صفحة الإعدادات."
      },
      {
        id: 3,
        question: "هل يمكن إلغاء الحجز؟",
        answer: "نعم، يمكنك إلغاء الحجز من صفحة حجوزاتي قبل 24 ساعة من الموعد."
      },
      {
        id: 4,
        question: "كيف أتتبع حالة حجزي؟",
        answer: "يمكنك متابعة حالة حجزك من صفحة حجوزاتي حيث ستجد جميع التفاصيل والتحديثات."
      }
    ]
  };

  render() {
    const { faqs } = this.state;

    return (
      <Container>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>❓ مركز المساعدة</h1>
        </Header>

        <FAQList>
          {faqs.map(faq => (
            <FAQItem key={faq.id}>
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </FAQItem>
          ))}
        </FAQList>

        <BottomNav />
      </Container>
    );
  }
}

export default Help;

