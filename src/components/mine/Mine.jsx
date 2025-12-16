import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Mimeimg } from "./styled";

@withRouter
class Mine extends Component {
  gotologin = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <>
        <Mimeimg onClick={this.gotologin}>
          <img
            style={{
              float: "right",
              width: "0.6rem",
              height: "0.6rem",
              marginRight: "0.2rem",
            }}
            src="//mstatic.soyoung.com/m/static/fe_m/view/home/img/login-713931fb83.png"
            alt=""
          />
        </Mimeimg>
      </>
    );
  }
}
export default Mine;
