import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Headdiv } from "./styled";

@withRouter
class header extends Component {
  goback = () => {
    this.props.history.go(-1);
  };
  render() {
    return (
      <Headdiv>
        <div className="nav-bar">
          <div
            className="history-back icon-all icon-e645"
            onClick={this.goback}
          >
            &lt;
          </div>
          <div className="text">
            <div className="inner"> {this.props.title}</div>
            <div className="one-x"></div>
          </div>
        </div>
      </Headdiv>
    );
  }
}
export default header;
