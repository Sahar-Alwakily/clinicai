import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "utils/http";
import _ from "lodash";

import Head from "./header/Head";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import Nntry from "./entry/Nntry";
import Feedtab from "./feedtab/Feedtab";
import FeedList from "./feedList/FeedList";

import { loadProductData, loadFeedListData } from "./actionCreator";

let mapStateToProps = (state) => {
  return {
    productlist: state.home.productlist,
    feedlist: state.home.feedlist,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    loadData(name) {
      dispatch(loadProductData());
      dispatch(loadFeedListData(name));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  state = {
    feedname: "مُوَصَّى به",
    data: [],
    page: 1,
    hasmore: true,
    loading: false,
  };

  changename = async (name) => {
    this.setState({
      feedname: name,
      data: [],
      page: 1,
    });
    let result;
    if (!this.state.loading && this.state.hasmore) {
      this.setState({
        loading: true,
      });
      try {
        result = await this.loaddata(this.state.page, this.state.feedname);

        if (result && result.has_more !== "1") {
          this.setState({
            hasmore: false,
          });
        }
        this.setState({
          page: this.state.page + 1,
          loading: false,
        });

        if (result) {
          this.setState({
            data: [...this.state.data, ...this.moddata(result)],
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        this.setState({
          loading: false,
        });
      }
    }
  };

  render() {
    return (
      <>
        <Head></Head>
        <div style={{ 
          paddingTop: '1.5rem', 
          background: '#f8f9fa', 
          minHeight: '100vh',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Banner></Banner>
          <Category></Category>
          <Nntry></Nntry>
          <Feedtab {...this.props} changetype={this.changename}></Feedtab>
          <FeedList data={this.state.data}></FeedList>
        </div>
      </>
    );
  }
  getDefaultFeedData = () => {
    return {
      feed_list: [
        {
          data: {
            id: "1",
            summary: "تجربة رائعة في عيادة التجميل - خدمة ممتازة ونتائج مذهلة",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/6/daf7ec3daf387fb0857ab8290fa77302_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "سارة أحمد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "1.2k"
          }
        },
        {
          data: {
            id: "2",
            summary: "بوتوكس الجبهة - نتائج طبيعية وجميلة جداً",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "فاطمة محمد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png"
              }
            },
            view_cnt: "856"
          }
        },
        {
          data: {
            id: "3",
            summary: "فيلر الشفاه - شكل طبيعي وجميل",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/6/b5069cd9a7d5d3b208eb81057175e2ac_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "ليلى خالد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "2.1k"
          }
        },
        {
          data: {
            id: "4",
            summary: "تنظيف البشرة العميق - بشرة نضرة ومشرقة",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "نورا علي",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png"
              }
            },
            view_cnt: "945"
          }
        },
        {
          data: {
            id: "5",
            summary: "تفتيح البشرة بالجلوتاثيون - نتائج مذهلة",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "ريم سعد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png"
              }
            },
            view_cnt: "1.5k"
          }
        },
        {
          data: {
            id: "6",
            summary: "إبرة نضارة متقدمة - بشرة شابة ومشرقة",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/7/9a87253568bfb4db9a3d8f19c7b79bc6_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "هند يوسف",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "678"
          }
        }
      ],
      has_more: "1"
    };
  };

  loaddata = async (page, name) => {
    try {
      const result = await get({
        url: `/api/site/index-ajax-feed?page=${page}&menu_id=0&menu_name=${name}&part=2&cityId=9&newFeed=1`,
      });
      // Check if result has valid data
      if (result && result.feed_list && result.feed_list.length > 0) {
        return result;
      }
      // If no data or error, return default data
      return this.getDefaultFeedData();
    } catch (error) {
      console.error("Error loading feed data:", error);
      // Return default data on error
      return this.getDefaultFeedData();
    }
  };
  moddata(data) {
    if (!data || !data.feed_list || !Array.isArray(data.feed_list)) {
      return [];
    }
    let num = Math.ceil(data.feed_list.length / 2);
    return _.chunk(data.feed_list, num);
  }

  //مسافة التمرير على المحور Y
  getScrollTop() {
    let scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  //الارتفاع الإجمالي للوثيقة
  getScrollHeight() {
    let scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  }

  //ارتفاع نافذة المتصفح
  getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  async componentDidMount() {
    this.props.loadData();
    let result;
    if (!this.state.loading && this.state.hasmore) {
      this.setState({
        loading: true,
      });
      try {
        result = await this.loaddata(this.state.page, this.state.feedname);

        if (result && result.has_more !== "1") {
          this.setState({
            hasmore: false,
          });
        }
        this.setState({
          page: this.state.page + 1,
          loading: false,
        });

        if (result) {
          this.setState({
            data: [...this.state.data, ...this.moddata(result)],
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        this.setState({
          loading: false,
        });
      }
    }

    const callback = async () => {
      if (
        this.getScrollTop() + this.getWindowHeight() + 100 >
        this.getScrollHeight()
      ) {
        let result;
        if (!this.state.loading && this.state.hasmore) {
          this.setState({
            loading: true,
          });
          result = await this.loaddata(this.state.page, this.state.feedname);
          if (result && result.has_more !== "1") {
            this.setState({
              hasmore: false,
            });
          }
          this.setState({
            page: this.state.page + 1,
            loading: false,
          });
        }
        if (result) {
          let newdata = this.moddata(result);
          if (newdata && newdata.length >= 2 && this.state.data.length >= 2) {
            this.setState({
              data: [
                [...(this.state.data[0] || []), ...(newdata[1] || [])],
                [...(this.state.data[1] || []), ...(newdata[0] || [])],
              ],
            });
          }
        }
      }
    };

    //حدث التمرير يجب إضافة الخاصية الثالثة true
    let timeAction;
    window.addEventListener(
      "scroll",
      () => {
        if (this.state.loading) {
          return;
        }

        if (timeAction) {
          clearTimeout(timeAction);
        }

        timeAction = setTimeout(callback, 50);
      },
      true
    );
  }
}

export default Home;