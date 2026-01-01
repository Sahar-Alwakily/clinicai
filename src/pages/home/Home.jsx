import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "utils/http";
import _ from "lodash";

import Head from "./header/Head";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import { getTreatmentImage, getAvatarImage } from "../../utils/defaultImages";
import Nntry from "./entry/Nntry";
import RegionFilter from "./regionFilter/RegionFilter";
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
    selectedTopic: null,
    selectedRegion: "all",
  };

  handleTopicClick = async (topic) => {
    this.setState({
      feedname: topic,
      data: [],
      page: 1,
      hasmore: true,
      selectedTopic: topic,
      selectedRegion: "all",
    });
    
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      try {
        const result = await this.loaddata(1, topic, "all");

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

  handleRegionChange = async (regionId) => {
    this.setState({
      selectedRegion: regionId,
      data: [],
      page: 1,
      hasmore: true,
    });
    
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      try {
        const result = await this.loaddata(1, this.state.selectedTopic || this.state.feedname, regionId);

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
          {this.state.selectedTopic === "مناطق الوجه" && (
            <RegionFilter 
              onRegionChange={this.handleRegionChange}
              selectedRegion={this.state.selectedRegion}
            />
          )}
          <Feedtab {...this.props} changetype={this.changename}></Feedtab>
          <FeedList data={this.state.data}></FeedList>
        </div>
        <BottomNav />
      </>
    );
  }
  getDefaultFeedData = (topic, region = "all") => {
    // بيانات العلاجات حسب المنطقة
    const treatmentsByRegion = {
      "nose": [
        { treatment_name: "بوتوكس الأنف", doctor_name: "د. أحمد الخالدي", price: "800", location: "عيادة الجمال الحديث - الرياض", region: "nose" },
        { treatment_name: "فيلر الأنف", doctor_name: "د. سارة المنصور", price: "1200", location: "مركز النخبة للتجميل - جدة", region: "nose" },
        { treatment_name: "تصغير الأنف", doctor_name: "د. محمد العلي", price: "5000", location: "عيادة الجمال الحديث - الرياض", region: "nose" },
        { treatment_name: "رفع طرف الأنف", doctor_name: "د. فاطمة النور", price: "3500", location: "عيادة الأناقة - الدمام", region: "nose" },
      ],
      "lips": [
        { treatment_name: "فيلر الشفاه", doctor_name: "د. نورا العتيبي", price: "600", location: "عيادة الجمال الحديث - الرياض", region: "lips" },
        { treatment_name: "تكبير الشفاه", doctor_name: "د. أحمد الخالدي", price: "800", location: "مركز النخبة للتجميل - جدة", region: "lips" },
        { treatment_name: "تجميل الشفاه", doctor_name: "د. سارة المنصور", price: "700", location: "عيادة الجمال الحديث - الرياض", region: "lips" },
        { treatment_name: "تصحيح شكل الشفاه", doctor_name: "د. محمد العلي", price: "900", location: "عيادة الأناقة - الدمام", region: "lips" },
      ],
      "eyes": [
        { treatment_name: "بوتوكس العين", doctor_name: "د. فاطمة النور", price: "500", location: "عيادة الجمال الحديث - الرياض", region: "eyes" },
        { treatment_name: "إزالة الهالات", doctor_name: "د. نورا العتيبي", price: "400", location: "مركز النخبة للتجميل - جدة", region: "eyes" },
        { treatment_name: "شد الجفون", doctor_name: "د. أحمد الخالدي", price: "2500", location: "عيادة الجمال الحديث - الرياض", region: "eyes" },
        { treatment_name: "تجميل العيون", doctor_name: "د. سارة المنصور", price: "3000", location: "عيادة الأناقة - الدمام", region: "eyes" },
      ],
      "forehead": [
        { treatment_name: "بوتوكس الجبهة", doctor_name: "د. محمد العلي", price: "600", location: "عيادة الجمال الحديث - الرياض", region: "forehead" },
        { treatment_name: "فيلر الجبهة", doctor_name: "د. فاطمة النور", price: "800", location: "مركز النخبة للتجميل - جدة", region: "forehead" },
        { treatment_name: "شد الجبهة", doctor_name: "د. نورا العتيبي", price: "2000", location: "عيادة الأناقة - الدمام", region: "forehead" },
      ],
      "cheeks": [
        { treatment_name: "فيلر الخدود", doctor_name: "د. أحمد الخالدي", price: "1000", location: "عيادة الجمال الحديث - الرياض", region: "cheeks" },
        { treatment_name: "نحت الخدود", doctor_name: "د. سارة المنصور", price: "1500", location: "مركز النخبة للتجميل - جدة", region: "cheeks" },
        { treatment_name: "شد الخدود", doctor_name: "د. محمد العلي", price: "3000", location: "عيادة الأناقة - الدمام", region: "cheeks" },
      ],
      "chin": [
        { treatment_name: "فيلر الذقن", doctor_name: "د. فاطمة النور", price: "900", location: "عيادة الجمال الحديث - الرياض", region: "chin" },
        { treatment_name: "نحت الذقن", doctor_name: "د. نورا العتيبي", price: "1200", location: "مركز النخبة للتجميل - جدة", region: "chin" },
      ],
      "jawline": [
        { treatment_name: "نحت الفكين", doctor_name: "د. أحمد الخالدي", price: "2000", location: "عيادة الجمال الحديث - الرياض", region: "jawline" },
        { treatment_name: "شد الفكين", doctor_name: "د. سارة المنصور", price: "3500", location: "مركز النخبة للتجميل - جدة", region: "jawline" },
      ],
      "neck": [
        { treatment_name: "شد الرقبة", doctor_name: "د. محمد العلي", price: "2500", location: "عيادة الجمال الحديث - الرياض", region: "neck" },
        { treatment_name: "تجميل الرقبة", doctor_name: "د. فاطمة النور", price: "1800", location: "مركز النخبة للتجميل - جدة", region: "neck" },
      ],
    };

    // الحصول على العلاجات حسب المنطقة المختارة
    let treatments = [];
    if (region === "all") {
      // جمع جميع العلاجات من جميع المناطق
      Object.values(treatmentsByRegion).forEach(regionTreatments => {
        treatments.push(...regionTreatments);
      });
    } else {
      treatments = treatmentsByRegion[region] || [];
    }

    // تحويل العلاجات إلى تنسيق feed_list
    const feedList = treatments.map((treatment, index) => ({
      data: {
        id: `${region}-${index + 1}`,
        summary: treatment.treatment_name,
        treatment_name: treatment.treatment_name,
        doctor_name: treatment.doctor_name,
        price: treatment.price,
        location: treatment.location,
        imgs: {
          u: getTreatmentImage(index),
          w: 120,
          h: 120
        },
        user: {
          user_name: treatment.doctor_name,
          avatar: {
            u: getAvatarImage(index)
          }
        },
        view_cnt: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}k`
      }
    }));

    const topicData = {
      "مناطق الوجه": feedList.length > 0 ? feedList : [
        {
          data: {
            id: "1",
            summary: "تحليل مناطق الوجه - تحديد المشاكل بدقة",
            treatment_name: "تحليل شامل للوجه",
            doctor_name: "د. سارة أحمد",
            price: "200",
            imgs: {
              u: getTreatmentImage(0),
              w: 120,
              h: 120
            },
            user: {
              user_name: "سارة أحمد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(1),
              w: 120,
              h: 120
            },
            user: {
              user_name: "فاطمة محمد",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(2),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ليلى خالد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(4),
              w: 120,
              h: 120
            },
            user: {
              user_name: "نورا علي",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(5),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ريم سعد",
              avatar: {
                u: getAvatarImage(2)
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
              u: getTreatmentImage(3),
              w: 120,
              h: 120
            },
            user: {
              user_name: "هند يوسف",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(0),
              w: 120,
              h: 120
            },
            user: {
              user_name: "سارة أحمد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(1),
              w: 120,
              h: 120
            },
            user: {
              user_name: "فاطمة محمد",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(2),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ليلى خالد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(4),
              w: 120,
              h: 120
            },
            user: {
              user_name: "نورا علي",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(5),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ريم سعد",
              avatar: {
                u: getAvatarImage(2)
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
              u: getTreatmentImage(3),
              w: 120,
              h: 120
            },
            user: {
              user_name: "هند يوسف",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(0),
              w: 120,
              h: 120
            },
            user: {
              user_name: "سارة أحمد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(1),
              w: 120,
              h: 120
            },
            user: {
              user_name: "فاطمة محمد",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(2),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ليلى خالد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(4),
              w: 120,
              h: 120
            },
            user: {
              user_name: "نورا علي",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(5),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ريم سعد",
              avatar: {
                u: getAvatarImage(2)
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
              u: getTreatmentImage(3),
              w: 120,
              h: 120
            },
            user: {
              user_name: "هند يوسف",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(0),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. سارة أحمد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(1),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. فاطمة محمد",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(2),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. ليلى خالد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(4),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. نورا علي",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(5),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. ريم سعد",
              avatar: {
                u: getAvatarImage(2)
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
              u: getTreatmentImage(3),
              w: 120,
              h: 120
            },
            user: {
              user_name: "د. هند يوسف",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(0),
              w: 120,
              h: 120
            },
            user: {
              user_name: "سارة أحمد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(1),
              w: 120,
              h: 120
            },
            user: {
              user_name: "فاطمة محمد",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(2),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ليلى خالد",
              avatar: {
                u: getAvatarImage(0)
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
              u: getTreatmentImage(4),
              w: 120,
              h: 120
            },
            user: {
              user_name: "نورا علي",
              avatar: {
                u: getAvatarImage(1)
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
              u: getTreatmentImage(5),
              w: 120,
              h: 120
            },
            user: {
              user_name: "ريم سعد",
              avatar: {
                u: getAvatarImage(2)
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
              u: getTreatmentImage(3),
              w: 120,
              h: 120
            },
            user: {
              user_name: "هند يوسف",
              avatar: {
                u: getAvatarImage(0)
              }
            },
            view_cnt: "8.9k"
          }
        }
      ]
    };

    return {
      feed_list: topicData[topic] || topicData["مناطق الوجه"] || [],
      has_more: "1"
    };
  };

  loaddata = async (page, name, region = "all") => {
    try {
      const result = await get({
        url: `/api/site/index-ajax-feed?page=${page}&menu_id=0&menu_name=${name}&part=2&cityId=9&newFeed=1`,
      });
      // Check if result has valid data
      if (result && result.feed_list && result.feed_list.length > 0) {
        return result;
      }
      // If no data or error, return default data for the topic
      return this.getDefaultFeedData(name, region);
    } catch (error) {
      console.error("Error loading feed data:", error);
      // Return default data on error for the topic
      return this.getDefaultFeedData(name, region);
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