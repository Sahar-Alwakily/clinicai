import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loaditemProductData } from "./actionCreator";
import Productlist from "./list/Productlist";
import {
  PageContainer,
  Header,
  SearchBar,
  PageTitle,
  ProductCount,
  SortFilterIcons,
  BackButton
} from "./styled";

let mapStateToProps = (state) => {
  return {
    itemproductlist: state.mianbulunkuo.itemproductlist,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    loadData() {
      dispatch(loaditemProductData());
    },
  };
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Mianbulunkuo extends Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    this.props.loadData();
  }

  toggleFavorite = (productId) => {
    this.setState(prevState => {
      const favorites = prevState.favorites.includes(productId)
        ? prevState.favorites.filter(id => id !== productId)
        : [...prevState.favorites, productId];
      return { favorites };
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const serviceName = this.props.match?.params?.name || "الخدمات";
    const apiServices = this.props.itemproductlist || [];
    const totalProducts = apiServices.length || 25;

    return (
      <PageContainer>
        <Header>
          <BackButton onClick={this.handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
          <SearchBar>
            <input type="text" placeholder="البحث عن منتج" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchBar>
        </Header>

        <PageTitle>
          <div className="title-section">
            <h1>{serviceName}</h1>
            <ProductCount>{totalProducts} منتج متوفر</ProductCount>
          </div>
          <SortFilterIcons>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </SortFilterIcons>
        </PageTitle>

        <Productlist 
          {...this.props} 
          favorites={this.state.favorites}
          onToggleFavorite={this.toggleFavorite}
        />
      </PageContainer>
    );
  }
}

export default Mianbulunkuo;
