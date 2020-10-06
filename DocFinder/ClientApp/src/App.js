import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AboutUsComponent } from "./components/AboutUs";
import { ServicesComponent } from "./components/Services";
import { ListYourselfComponent } from "./components/DoctorRegistration/ListYourself";
import { ListHospitalsComponent } from "./components/ListHospitals";
import { ListPhysicianComponent } from "./components/ListPhysicians";
import { SearchLocationInput } from "./components/FindHospitals";
import { FindDoctorsComponent } from "./components/FindDoctors";
import { FindTrialsComponent } from "./components/FindTrials";
import { HelpComponent } from "./components/Help";
import { EmailComponent } from "./components/Email";
import { LegalComponent } from "./components/Legal";
import { DoctorProfileComponent } from "./components/DoctorProfile/DoctorProfile";
import { DoctorLoginComponent } from "./components/DoctorLogin/DoctorLogin";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;
    //          <Route path="/List/yourself" component={ListYourselfComponent} />
  render() {
    return (
      <>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route path="/AboutUs" component={AboutUsComponent} />
          <Route path="/Services" component={ServicesComponent} />
          <Route path="/DoctorLogin" component={DoctorLoginComponent} />
          <Route path="/List/Hospitals" component={ListHospitalsComponent} />
          <Route path="/List/physicians" component={ListPhysicianComponent} />
          <Route path="/Find/Hospitals" component={SearchLocationInput} />
          <Route path="/Find/Doctors" component={FindDoctorsComponent} />
          <Route path="/Find/Trials" component={FindTrialsComponent} />
          <Route path="/Help" component={HelpComponent} />
          <Route path="/Email" component={EmailComponent} />
          <Route path="/Legal" component={LegalComponent} />
          <Route path="/DoctorProfile" component={DoctorProfileComponent} />

        </Layout>
      </>
    );
  }
}
