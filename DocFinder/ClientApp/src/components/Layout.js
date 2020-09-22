import React, { Component, useContext } from 'react';
import { Container } from 'reactstrap';
import { MenuTypeContext } from '../context/MenuContextProvider';
//import { NavMenu } from './NavMenu';
import { Navigation } from './NavigationMenu';
import { DoctorNavigationMenu} from './DoctorNavigationMenu';
import { Footer } from './Footer';
import '../custom.css'


export function Layout(props) {

    const menuContext = useContext(MenuTypeContext);

    return (        
        <div className="flex-styles">
            {
                menuContext.menu.menutype == 'user' ? <Navigation /> : <DoctorNavigationMenu/>
            }
            <Container className="container">
          {props.children}
            </Container>
            <Footer></Footer>
      </div>
      )
}

//export class Layout extends Component {
//  static displayName = Layout.name;

//    

////if (menuContext)

//  render () {
//    return (
//        <div className="flex-styles">
//            <Navigation  />
//            <Container className="container">
//          {this.props.children}
//            </Container>
//            <Footer></Footer>
//      </div>
//    );
//  }
//}
