import React, { Component } from "react";
import Headsearchbar from "./headsearch/Headsearchbar";
import Hotsearch from "./headsearch/Hotsearch";
import { SearchHistory } from "./headsearch/styled";

export default class Newsearch extends Component {
  render() {
    return (
      <>
        <div
          style={{
            background: "#fff",
          }}
        >
          <Headsearchbar></Headsearchbar>
          <Hotsearch></Hotsearch>
          <SearchHistory>
            <h3>السجل</h3>
            <div className="searchhistory-list">
              <div>1</div>
            </div>
            <div className="searchhistory-clean">مسح السجل</div>
          </SearchHistory>
        </div>
      </>
    );
  }
}
