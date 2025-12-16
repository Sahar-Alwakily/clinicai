
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "antd-mobile";
import { Searchdiv } from "./styled";

class search extends Component {
  gotosearch = () => {
    this.props.history.push("/newsearch");
  };
  render() {
    return (
      <>
        <Searchdiv onClick={this.gotosearch}>
          <span
            style={{
              color: " #AAABB3",
              padding: "0 0.2rem",
              lineHeight: "1",
            }}
          >
            <Icon
              type="search"
              size="xs"
              style={{ verticalAlign: "middle", lineHeight: "1" }}
            />
          </span>
          إبر نحت الوجه
        </Searchdiv>
      </>
    );
  }
}
export default withRouter(search);
