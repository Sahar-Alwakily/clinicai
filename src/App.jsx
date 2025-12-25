import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Home from "pages/home/Home";
import Newsearch from "pages/newsearch/Newsearch";
import Login from "pages/login/Login";
import Register from "pages/login/Register";
import PatientForm from "pages/login/PatientForm";
import Mianbulunkuo from "pages/mianbulunkuo/Mianbulunkuo";
import Details from "pages/details/Details";
import Catalog from "pages/catalog/Catalog";
import Trends from "pages/trends/Trends";
import Bookings from "pages/bookings/Bookings";
import Profile from "pages/profile/Profile";
import Reminders from "pages/profile/Reminders";
import Notifications from "pages/notifications/Notifications";
import Interests from "pages/profile/Interests";
import Favorites from "pages/profile/Favorites";
import MyReviews from "pages/profile/MyReviews";
import MedicalHistory from "pages/profile/MedicalHistory";
import Allergies from "pages/profile/Allergies";
import SkinAnalysis from "pages/profile/SkinAnalysis";
import Settings from "pages/settings/Settings";
import NotificationsSettings from "pages/settings/NotificationsSettings";
import Privacy from "pages/settings/Privacy";
import Language from "pages/settings/Language";
import PaymentMethods from "pages/settings/PaymentMethods";
import Help from "pages/support/Help";
import Contact from "pages/support/Contact";
import About from "pages/support/About";
import Terms from "pages/support/Terms";
import EditProfile from "pages/profile/EditProfile";

// المكونات الجديدة للتشخيص - نظام منفصل

// ScrollToTop component - يمرر الصفحة للأعلى عند تغيير الـ route
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      // أيضاً تمرير document.body و document.documentElement للأعلى
      if (document.body) {
        document.body.scrollTop = 0;
      }
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
    }
  }

  render() {
    return null;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

@withRouter
class App extends Component {
  componentDidMount() {
    // تمرير للأعلى عند تحميل التطبيق
    window.scrollTo(0, 0);
    if (document.body) {
      document.body.scrollTop = 0;
    }
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    return (
      <>
        <ScrollToTopWithRouter />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/newsearch" component={Newsearch}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/patient-form" component={PatientForm}></Route>
          <Route path="/mianbulunkuo/:name" component={Mianbulunkuo}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/catalog" component={Catalog}></Route>
          <Route path="/trends" component={Trends}></Route>
          <Route path="/bookings" component={Bookings}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/reminders" component={Reminders}></Route>
          <Route path="/notifications" component={Notifications}></Route>
          <Route path="/interests" component={Interests}></Route>
          <Route path="/favorites" component={Favorites}></Route>
          <Route path="/my-reviews" component={MyReviews}></Route>
          <Route path="/medical-history" component={MedicalHistory}></Route>
          <Route path="/allergies" component={Allergies}></Route>
          <Route path="/skin-analysis" component={SkinAnalysis}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/notifications-settings" component={NotificationsSettings}></Route>
          <Route path="/privacy" component={Privacy}></Route>
          <Route path="/language" component={Language}></Route>
          <Route path="/payment-methods" component={PaymentMethods}></Route>
          <Route path="/help" component={Help}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/terms" component={Terms}></Route>
          <Route path="/edit-profile" component={EditProfile}></Route>
          
          <Redirect from="/" exact to="/home"></Redirect>
        </Switch>
      </>
    );
  }
}

export default App;