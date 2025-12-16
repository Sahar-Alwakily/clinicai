/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-02 17:39:00
 * @Description:
 */

import styled from "styled-components";

const Navdiv = styled.div`
  .collapsed-nav {
    color: #fff;
    bottom: 2rem;
    height: 0.9rem;
    font-size: 0.12rem;
    font-weight: 700;
    border-radius: 100%;
    line-height: 0.9rem;
    letter-spacing: 0.04rem;
    background: #616161;
    width: 0.9rem;
    position: fixed;
    right: 0.2rem;
    z-index: 10;
    text-align: center;
  }
  .collapsed-main {
    bottom: 2.9rem;
    width: 0.9rem;
    position: fixed;
    right: 0.2rem;
    z-index: 10;
    text-align: center;
    .links {
      border-radius: 0.08rem;
      background: #616161;
      .item {
        display: block;
        font-size: 0.26rem;
        color: #fff;
        padding: 0.2rem 0;
        border-bottom: #999 1px solid;
      }
    }
    .down-arrow {
      margin: -0.04rem 0.26rem -0.1rem;
      border: 0.2rem solid transparent;
      border-top-color: #616161;
    }
  }
`;

export { Navdiv };
