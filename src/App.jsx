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
          <Route path="/mianbulunkuo:name" component={Mianbulunkuo}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/catalog" component={Catalog}></Route>
          <Route path="/trends" component={Trends}></Route>
          <Route path="/bookings" component={Bookings}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/reminders" component={Reminders}></Route>
          <Route path="/notifications" component={Notifications}></Route>
          
          <Redirect from="/" exact to="/home"></Redirect>
        </Switch>
      </>
    );
  }
}

export default App;