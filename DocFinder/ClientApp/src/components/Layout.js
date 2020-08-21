import React, { Component } from 'react';
import { Container } from 'reactstrap';
//import { NavMenu } from './NavMenu';
import { Navigation } from './NavigationMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
