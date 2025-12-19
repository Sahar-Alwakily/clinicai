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
import BottomNav from "../../components/bottomNav/BottomNav";

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

  handleTopicClick = async (topic) => {
    this.setState({
      feedname: topic,
      data: [],
      page: 1,
      hasmore: true,
    });
    
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      try {
        const result = await this.loaddata(1, topic);

        if (result && result.has_more !== "1") {
          this.setState({
            hasmore: false,
          });
        }
        this.setState({
          page: 2,
          loading: false,
        });

        if (result) {
          this.setState({
            data: this.moddata(result),
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
          paddingTop: '0', 
          paddingBottom: '1.5rem',
          background: '#f8f9fa', 
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          overflowY: 'auto',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          <Banner></Banner>
          <Category></Category>
          <Nntry onTopicClick={this.handleTopicClick}></Nntry>
          <Feedtab {...this.props} changetype={this.changename}></Feedtab>
          <FeedList data={this.state.data}></FeedList>
        </div>
        <BottomNav />
      </>
    );
  }
  getDefaultFeedData = (topic) => {
    const topicData = {
      "مناطق الوجه": [
        {
          data: {
            id: "1",
            summary: "تحليل مناطق الوجه - تحديد المشاكل بدقة",
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
            summary: "منطقة الجبهة - علاج التجاعيد والخطوط",
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
            summary: "منطقة العين - إزالة الهالات والانتفاخات",
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
            summary: "منطقة الأنف - تحسين الشكل والتناسق",
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
            summary: "منطقة الشفاه - تكبير وتجميل الشفاه",
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
            summary: "منطقة الذقن - نحت وتنحيف الذقن",
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
      "الحلول التجميلية": [
        {
          data: {
            id: "1",
            summary: "البوتوكس - إزالة التجاعيد والخطوط",
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
            view_cnt: "2.3k"
          }
        },
        {
          data: {
            id: "2",
            summary: "الفيلر - ملء التجاعيد والخطوط",
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
            view_cnt: "1.8k"
          }
        },
        {
          data: {
            id: "3",
            summary: "الليزر - إزالة الشعر وتفتيح البشرة",
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
            view_cnt: "3.1k"
          }
        },
        {
          data: {
            id: "4",
            summary: "الميزوثيرابي - شد البشرة وتجديدها",
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
            view_cnt: "1.4k"
          }
        },
        {
          data: {
            id: "5",
            summary: "الخيوط - شد الوجه بدون جراحة",
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
            view_cnt: "2.7k"
          }
        },
        {
          data: {
            id: "6",
            summary: "البرايمر - تحضير البشرة للعلاج",
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
            view_cnt: "956"
          }
        }
      ],
      "قبل وبعد": [
        {
          data: {
            id: "1",
            summary: "تحول مذهل - قبل وبعد البوتوكس",
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
            view_cnt: "5.2k"
          }
        },
        {
          data: {
            id: "2",
            summary: "نتائج رائعة - فيلر الشفاه",
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
            view_cnt: "4.8k"
          }
        },
        {
          data: {
            id: "3",
            summary: "تحسن كبير - علاج الهالات السوداء",
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
            view_cnt: "6.1k"
          }
        },
        {
          data: {
            id: "4",
            summary: "نتائج مذهلة - شد الوجه بالخيوط",
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
            view_cnt: "3.9k"
          }
        },
        {
          data: {
            id: "5",
            summary: "تحول رائع - تفتيح البشرة",
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
            view_cnt: "4.5k"
          }
        },
        {
          data: {
            id: "6",
            summary: "نتائج طبيعية - نحت الوجه",
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
            view_cnt: "3.2k"
          }
        }
      ],
      "الأطباء": [
        {
          data: {
            id: "1",
            summary: "د. سارة أحمد - أخصائية التجميل",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/6/daf7ec3daf387fb0857ab8290fa77302_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. سارة أحمد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "8.5k"
          }
        },
        {
          data: {
            id: "2",
            summary: "د. فاطمة محمد - جراحة تجميلية",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. فاطمة محمد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png"
              }
            },
            view_cnt: "7.2k"
          }
        },
        {
          data: {
            id: "3",
            summary: "د. ليلى خالد - طب الجلدية",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/6/b5069cd9a7d5d3b208eb81057175e2ac_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. ليلى خالد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "9.1k"
          }
        },
        {
          data: {
            id: "4",
            summary: "د. نورا علي - تجميل الأنف",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. نورا علي",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png"
              }
            },
            view_cnt: "6.8k"
          }
        },
        {
          data: {
            id: "5",
            summary: "د. ريم سعد - علاج البشرة",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200508/4/d6ef1e1a38b1dcfbc52a0dae49c5d6cc_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. ريم سعد",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200721/3/cb676444fac65218c279668a3287e6da_120_120.png"
              }
            },
            view_cnt: "5.9k"
          }
        },
        {
          data: {
            id: "6",
            summary: "د. هند يوسف - تجميل الشفاه",
            imgs: {
              u: "https://img2.soyoung.com/origin/20200721/7/9a87253568bfb4db9a3d8f19c7b79bc6_120_120.png",
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. هند يوسف",
              avatar: {
                u: "https://img2.soyoung.com/origin/20200508/1/0a43bcece5358766e753fc491776c17a_120_120.png"
              }
            },
            view_cnt: "7.5k"
          }
        }
      ],
      "اسألي طبيب": [
        {
          data: {
            id: "1",
            summary: "سؤال: ما هي أفضل طريقة لإزالة التجاعيد؟",
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
            view_cnt: "12.3k"
          }
        },
        {
          data: {
            id: "2",
            summary: "سؤال: هل البوتوكس آمن للاستخدام؟",
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
            view_cnt: "10.8k"
          }
        },
        {
          data: {
            id: "3",
            summary: "سؤال: ما الفرق بين الفيلر والبوتوكس؟",
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
            view_cnt: "15.2k"
          }
        },
        {
          data: {
            id: "4",
            summary: "سؤال: كم مرة يمكن تكرار جلسات الليزر؟",
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
            view_cnt: "9.7k"
          }
        },
        {
          data: {
            id: "5",
            summary: "سؤال: ما هي مدة نتائج الفيلر؟",
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
            view_cnt: "11.4k"
          }
        },
        {
          data: {
            id: "6",
            summary: "سؤال: هل يمكن إزالة الوشم بالليزر؟",
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
            view_cnt: "8.9k"
          }
        }
      ]
    };

    return {
      feed_list: topicData[topic] || topicData["مناطق الوجه"],
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
      // If no data or error, return default data for the topic
      return this.getDefaultFeedData(name);
    } catch (error) {
      console.error("Error loading feed data:", error);
      // Return default data on error for the topic
      return this.getDefaultFeedData(name);
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