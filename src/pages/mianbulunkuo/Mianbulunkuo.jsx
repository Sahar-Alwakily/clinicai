import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loaditemProductData } from "./actionCreator";
import Productlist from "./list/Productlist";
import BottomNav from "../../components/bottomNav/BottomNav";
import {
  PageContainer,
  Header,
  SearchBar,
  PageTitle,
  ProductCount,
  FilterTabs,
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
    favorites: [],
    activeFilter: "all",
    searchQuery: ""
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
    const { activeFilter, searchQuery } = this.state;

    const filters = [
      { id: "all", label: "الكل" },
      { id: "popular", label: "الأكثر طلباً" },
      { id: "newest", label: "الأحدث" },
      { id: "price_low", label: "السعر: الأقل" },
      { id: "price_high", label: "السعر: الأعلى" },
    ];

    return (
      <PageContainer>
        <Header>
          <BackButton onClick={this.handleBack}>
            ←
          </BackButton>
          <h1>{serviceName}</h1>
        </Header>

        <SearchBar>
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="ابحث عن علاج أو خدمة..." 
            value={searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
          {searchQuery && (
            <span 
              className="clear-btn"
              onClick={() => this.setState({ searchQuery: "" })}
            >
              ✕
            </span>
          )}
        </SearchBar>

        <PageTitle>
          <ProductCount>{totalProducts} نتيجة</ProductCount>
        </PageTitle>

        <FilterTabs>
          {filters.map(filter => (
            <div 
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => this.setState({ activeFilter: filter.id })}
            >
              {filter.label}
            </div>
          ))}
        </FilterTabs>

        <Productlist 
          {...this.props} 
          favorites={this.state.favorites}
          onToggleFavorite={this.toggleFavorite}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />

        <BottomNav />
      </PageContainer>
    );
  }
}

export default Mianbulunkuo;
