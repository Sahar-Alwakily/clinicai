import React, { Component } from "react";
import { Hotsearchdiv, Hotsearchlistdiv } from "./styled";

export default class Hotsearch extends Component {
  render() {
    return (
      <Hotsearchdiv>
        <h3>الجميع يبحث عن</h3>
        <Hotsearchlistdiv>
          <div>أخوات تتحمل الأمواج</div>
          <div>جمع صور المقارنة قبل وبعد</div>
          <div>مختبر تجديد البشرة</div>
          <div>تحسين الفك في كوريا</div>
        </Hotsearchlistdiv>
      </Hotsearchdiv>
    );
  }
}