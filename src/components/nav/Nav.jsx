import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Navdiv } from "./styled";

@withRouter
class Nav extends Component {
  state = {
    show: false,
  };

  gohome = () => {
    this.props.history.push("/home");
  };
  show = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    return (
      <>
        <Navdiv>
          <div className="collapsed-nav" onClick={this.show}>
            ●●●
          </div>
          {this.state.show ? (
            <div className="collapsed-main">
              <div className="links">
                <div className="item" onClick={this.gohome}>
                  الصفحة الرئيسية
                </div>
                <div className="item" onClick={this.gohome}>
                  عرض اليوميات
                </div>
                <div className="item" onClick={this.gohome}>
                  العروض
                </div>
              </div>
              <div className="down-arrow"></div>
            </div>
          ) : (
            ""
          )}
        </Navdiv>
      </>
    );
  }
}
export default Nav;