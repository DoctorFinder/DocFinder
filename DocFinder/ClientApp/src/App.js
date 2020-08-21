import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { LoginComponent } from './components/Login';
import { Search } from './components/Search';
import { DoctorLogin } from './components/DoctorLogin';
import { PatientLogin } from './components/PatientLogin';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route exact path='/login' component={LoginComponent} />
        <Route path='/Search' component={Search} />
        <Route exact  path='/Login/Patient' component={PatientLogin} />
        <Route exact  path='/Login/Doctor' component={DoctorLogin} />
      </Layout>
    );
  }
}
