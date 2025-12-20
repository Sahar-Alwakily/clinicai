import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../../components/bottomNav/BottomNav";

const FavoritesContainer = styled.div`
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

const FavoritesList = styled.div`
  padding: 0.2rem 0.25rem;
`;

const FavoriteCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 0.2rem;
  padding: 0.2rem;
  margin-bottom: 0.15rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1.5px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  gap: 0.15rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.03rem;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .favorite-image {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.15rem;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .favorite-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    
    .favorite-name {
      font-size: 0.2rem;
      font-weight: 600;
      color: #2d3748;
      line-height: 1.4;
    }
    
    .favorite-type {
      font-size: 0.16rem;
      color: #718096;
    }
    
    .favorite-location {
      font-size: 0.14rem;
      color: #999;
      display: flex;
      align-items: center;
      gap: 0.05rem;
    }
  }
  
  .favorite-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    
    .remove-btn {
      background: #ffebee;
      border: none;
      border-radius: 50%;
      width: 0.4rem;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #f44336;
      font-size: 0.2rem;
      transition: all 0.2s ease;
      
      &:hover {
        background: #ffcdd2;
        transform: scale(1.1);
      }
    }
  }
  
  &:hover {
    transform: translateY(-0.02rem);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.15rem;
    border-radius: 0.16rem;
    gap: 0.12rem;
    
    .favorite-image {
      width: 1rem;
      height: 1rem;
    }
    
    .favorite-content {
      .favorite-name {
        font-size: 0.18rem;
      }
      
      .favorite-type {
        font-size: 0.14rem;
      }
      
      .favorite-location {
        font-size: 0.12rem;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
  
  .empty-icon {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }
  
  .empty-text {
    font-size: 0.22rem;
    margin-top: 0.15rem;
  }
`;

@withRouter
class Favorites extends Component {
  state = {
    favorites: [
      {
        id: 1,
        name: "عيادة الجمال الحديث",
        type: "عيادة",
        location: "الرياض",
        image: "https://img2.soyoung.com/origin/20200721/6/daf7ec3daf387fb0857ab8290fa77302_120_120.png"
      },
      {
        id: 2,
        name: "بوتوكس الجبهة",
        type: "علاج",
        location: "د. أحمد الخالدي",
        image: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png"
      },
      {
        id: 3,
        name: "فيلر الشفاه",
        type: "علاج",
        location: "د. سارة المنصور",
        image: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
      },
      {
        id: 4,
        name: "مركز النخبة للتجميل",
        type: "عيادة",
        location: "جدة",
        image: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png"
      },
      {
        id: 5,
        name: "ليزر إزالة الشعر",
        type: "علاج",
        location: "د. نورا العتيبي",
        image: "https://img2.soyoung.com/origin/20200721/6/b5069cd9a7d5d3b208eb81057175e2ac_120_120.png"
      }
    ]
  };

  handleRemove = (favoriteId) => {
    this.setState(prevState => ({
      favorites: prevState.favorites.filter(fav => fav.id !== favoriteId)
    }));
  };

  render() {
    const { favorites } = this.state;

    return (
      <FavoritesContainer>
        <Header>
          <button className="back-btn" onClick={() => this.props.history.goBack()}>
            ‹
          </button>
          <h1>❤️ المفضلة</h1>
        </Header>

        <FavoritesList>
          {favorites.length === 0 ? (
            <EmptyState>
              <div className="empty-icon">📭</div>
              <div className="empty-text">لا توجد عناصر في المفضلة</div>
            </EmptyState>
          ) : (
            favorites.map(favorite => (
              <FavoriteCard key={favorite.id} onClick={() => this.props.history.push("/details")}>
                <div className="favorite-image">
                  <img src={favorite.image} alt={favorite.name} />
                </div>
                <div className="favorite-content">
                  <div className="favorite-name">{favorite.name}</div>
                  <div className="favorite-type">{favorite.type}</div>
                  <div className="favorite-location">
                    📍 {favorite.location}
                  </div>
                </div>
                <div className="favorite-actions">
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.handleRemove(favorite.id);
                    }}
                  >
                    ❌
                  </button>
                </div>
              </FavoriteCard>
            ))
          )}
        </FavoritesList>

        <BottomNav />
      </FavoritesContainer>
    );
  }
}

export default Favorites;

