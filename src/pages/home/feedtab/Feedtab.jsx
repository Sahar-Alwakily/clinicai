import React, { Component } from "react";
import { connect } from "react-redux";

import { Feedtabdiv } from "./styled";
import { changeclass } from "../actionCreator";

let mapDispatchToProps = (dispatch) => {
  return {
    changefeedtabclass(name) {
      dispatch(changeclass(name));
    },
  };
};

@connect(null, mapDispatchToProps)
class Feedtab extends Component {
  chiocetype = (type) => {
    return () => {
      this.props.changefeedtabclass(type);
      this.props.changetype(type);
    };
  };
  render() {
    return (
      <>
        <Feedtabdiv>
          <ul>
            {this.props.productlist &&
              this.props.productlist.slice(0).map((dataItem) => (
                <li
                  key={dataItem.menu1_id}
                  onClick={this.chiocetype(dataItem.name)}
                >
                  <div className={dataItem.selected ? "active" : ""}>
                    <span>{dataItem.name}</span>
                  </div>
                </li>
              ))}
          </ul>
        </Feedtabdiv>
      </>
    );
  }
}
export default Feedtab;
