import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AboutUsComponent } from "./components/AboutUs";
import { ServicesComponent } from "./components/Services";
import { ListYourselfComponent } from "./components/ListYourself";
import { ListHospitalsComponent } from "./components/ListHospitals";
import { ListPhysicianComponent } from "./components/ListPhysicians";
import { FindHospitalsComponent } from "./components/FindHospitals";
import { FindDoctorsComponent } from "./components/FindDoctors";
import { FindTrialsComponent } from "./components/FindTrials";
import { HelpComponent } from "./components/Help";
import { EmailComponent } from "./components/Email";
import { LegalComponent } from "./components/Legal";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/AboutUs" component={AboutUsComponent} />
          <Route path="/Services" component={ServicesComponent} />
          <Route path="/List/yourself" component={ListYourselfComponent} />
          <Route path="/List/Hospitals" component={ListHospitalsComponent} />
          <Route path="/List/physicians" component={ListPhysicianComponent} />
          <Route path="/Find/Hospitals" component={FindHospitalsComponent} />
          <Route path="/Find/Doctors" component={FindDoctorsComponent} />
          <Route path="/Find/Trials" component={FindTrialsComponent} />
          <Route path="/Help" component={HelpComponent} />
          <Route path="/Email" component={EmailComponent} />
          <Route path="/Legal" component={LegalComponent} />
        </Layout>
      </>
    );
  }
}
