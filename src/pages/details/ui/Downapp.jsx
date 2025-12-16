import React, { Component } from "react";
import { Downappdiv } from "./styled";

export default class Downapp extends Component {
  render() {
    return (
      <Downappdiv>
        <div className="pub-top-ad slideInDown" id="pubTopAd">
          <div className="logo" id="tohomeLogo">
            <img
              src="//static.soyoung.com/sy-pre/logo-new-1589358121653.png"
              width="100%"
              height="100%"
            />
          </div>
          <p className="tohome">home</p>
          <div className="download">
            <a className="openApp" href="javascript:" id="pubTopAdOpenApp">
              <img
                src="//static.soyoung.com/sy-pre/openapp@3x-1589358121653.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </Downappdiv>
    );
  }
}
