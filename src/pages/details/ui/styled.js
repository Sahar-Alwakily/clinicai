/*
 * @Author: heping
 * @Date: 2020-07-29 21:14:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-04 09:09:47
 * @Description:
 */

import styled from "styled-components";

const Downappdiv = styled.div`
  @keyframes slideInDown {
    0% {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slideInUp {
    0% {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    100% {
      transform: translate3d(0, -100%, 0);
    }
  }
  .slideInDown {
    animation-name: slideInDown;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .slideInUp {
    animation-name: slideInUp;
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .pub-top-ad {
    position: fixed;
    width: 100%;
    z-index: 99;
    box-sizing: border-box;
    padding: 0.14rem 0.3rem;
    height: 1.28rem;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 0.01rem solid #dadada;
    .logo {
      width: 3.32rem;
      height: 0.82rem;
    }
    .tohome {
      margin-left: auto;
      margin-right: 0.2rem;
      padding: 0.1rem 0.2rem;
      border-right: 0.02rem solid #f0f0f0;
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: #2cc7c5;
      letter-spacing: 0;
      text-align: right;
      line-height: 0.32rem;
    }
    .download {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 0.54rem;
      width: 1.48rem;
    }
    .openApp {
      color: #666;
      text-decoration: none;
      margin: 0;
      padding: 0;
      font-size: 100%;
      vertical-align: baseline;
      background: transparent;
      img {
        height: 0.54rem;
        width: 1.48rem;
      }
    }
  }
`;

const Previewtextdiv = styled.div`
  .clearfix:before {
    display: table;
    content: " ";
  }
  .clearfix:after {
    display: table;
    content: " ";
    clear: both;
  }
  .main-user-info {
    position: sticky;
    top: 0;
    padding: 0.2rem 0.3rem;
    background: #fff;
    z-index: 5;
    .pub-usercard {
      height: 0.76rem;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      position: relative;
      .pub-usercard-avatar {
        height: 100%;
        width: 0.76rem;
        border-radius: 50% 50% 0.06rem;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50% 50% 0.06rem;
        }
      }
      .pub-usercard-info {
        margin-left: 0.16rem;
        height: 100%;
        width: 4.6rem;
        .pub-usercard-name {
          display: flex;
          -webkit-box-pack: start;
          justify-content: flex-start;
          -webkit-box-align: center;
          align-items: center;
          font-size: 0.3rem;
          color: #333;
          line-height: 0.44rem;
          max-width: 4rem;
          width: 100%;
          span {
            margin-right: 0.16rem;
            display: inline-block;
            max-width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .level {
            display: inline-block;
            background: url(//mstatic.soyoung.com/m/widgets/level/img/level-ver750_a26f613.png)
              no-repeat;
            background-size: 13.74rem 0.28rem;
            height: 0.28rem;
          }
          .level-5 {
            width: 0.6rem;
            background-position: -3rem 0;
          }
        }
        .pub-usercard-time {
          font-size: 0.22rem;
          line-height: 0.32rem;
          color: #aaabb3;
          width: 100%;
        }
      }
      .item-btn {
        width: 1.24rem;
        height: 0.52rem;
        .item-follow {
          width: 1.24rem;
          height: 0.52rem;
          background: url(https://static.soyoung.com/sy-pre/follow-1574334604817.png)
            no-repeat center center transparent;
          background-size: contain;
        }
      }
    }
  }
`;

const Swiperdiv = styled.div`
  height: auto;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  .diary-picture-tag {
    position: absolute;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    z-index: 5;
    transform: translate(-0.02rem, -0.08rem);
    .point-mask {
      position: relative;
      height: 0.28rem;
      width: 0.28rem;
      border-radius: 0.28rem;
      background: rgba(0, 0, 0, 0.2);
      z-index: 6;
      .point {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 0.12rem;
        width: 0.12rem;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 50%;
      }
      .line {
        position: absolute;
        top: 0.16rem;
        left: 50%;
        height: 0.02rem;
        width: 0.3rem;
        transform: translate(0.06rem, -50%);
        border-top: 0.02rem solid #fff;
      }
    }
    .tag-box {
      position: relative;
      margin-left: 0.2rem;
      height: 0.48rem;
      border: 0.02rem solid #fff;
      border-radius: 0.24rem;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        height: 0.48rem;
        width: 100%;
        border-radius: 0.24rem;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .content {
        height: 100%;
        position: relative;
        display: flex;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        align-items: center;
        .iconfont {
          margin-left: 0.08rem;
          font-size: 0.32rem;
          color: #fff;
        }
        a {
          padding-right: 0.12rem;
          padding-left: 0.06rem;
          font-family: PingFangSC-Medium;
          font-size: 0.24rem;
          color: #fff;
          letter-spacing: 0;
          text-align: justify;
          line-height: 0.36rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 3rem;
          text-decoration: none;
        }
      }
    }
  }
  .pagination {
    position: absolute;
    right: 0.3rem !important;
    left: unset !important;
    bottom: 0.3rem;
    height: 0.48rem;
    width: 0.62rem !important;
    line-height: 0.48rem;
    font-family: PingFang-SC-Medium;
    border-radius: 0.48rem;
    background: rgba(0, 0, 0, 0.7);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.22rem;
    .swiper-pagination-current {
      margin-right: 0.04rem;
      font-size: 0.26rem;
      color: #fff;
    }
    .swiper-pagination-total {
      margin-left: 0.04rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export { Downappdiv, Previewtextdiv, Swiperdiv };
