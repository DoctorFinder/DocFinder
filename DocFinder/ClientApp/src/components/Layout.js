import React, { Component } from 'react';
import { Container } from 'reactstrap';
//import { NavMenu } from './NavMenu';
import { Navigation } from './NavigationMenu';
import { Footer } from './Footer';
import '../custom.css'


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div className="flex-styles">
            <Navigation  />
            <Container className="container">
          {this.props.children}
            </Container>
            <Footer></Footer>
      </div>
    );
  }
}
