
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SearchBar } from "antd-mobile";
import { Searchinput, SearchHeader, BackButton } from "./styled";

class Headsearchbar extends Component {
  state = {
    value: "",
  };

  onChange = (value) => {
    this.setState({ value });
  };

  handleBack = () => {
    this.props.history.push("/home");
  };

  handleCancel = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <>
        <SearchHeader>
          <BackButton onClick={this.handleBack}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12.5 15L7.5 10L12.5 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </BackButton>
          <Searchinput>
            <SearchBar
              style={{}}
              value={this.state.value}
              placeholder="الجميع يبحث عن: أسرار مكافحة الشيخوخة"
              showCancelButton
              onChange={this.onChange}
              onCancel={this.handleCancel}
            />
          </Searchinput>
        </SearchHeader>
      </>
    );
  }
}

export default withRouter(Headsearchbar);
