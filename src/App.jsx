import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

// المكونات الجديدة للتشخيص - نظام منفصل

export default class App extends Component {
  render() {
    return (
      <>
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
          
          <Redirect from="/" exact to="/home"></Redirect>
        </Switch>
      </>
    );
  }
}