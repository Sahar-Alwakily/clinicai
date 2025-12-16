import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProductdDetailsData } from "./actionCreator";

import Downapp from "./ui/Downapp";
import Previewtext from "./ui/Previewtext";
import Swiper from "./ui/Swiper";

let mapStateToProps = (state) => {
  return {
    productdetails: state.details.productdetails,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    loadData(id) {
      dispatch(loadProductdDetailsData(id));
    },
  };
};
@connect(mapStateToProps, mapDispatchToProps)
class Details extends Component {
  render() {
    return (
      <>
        <Downapp></Downapp>
        <div style={{ height: "1.28rem" }}></div>
        <Previewtext></Previewtext>
        <Swiper></Swiper>
      </>
    );
  }
  componentDidMount() {
    // this.props.loadData();
    // console.log(this);
  }
}
export default Details;
