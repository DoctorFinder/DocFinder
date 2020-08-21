import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '../Styles/Footer.css';


export function Footer() {

    return (
        <footer>
            <section className="zz-socialist">
                <ul className="zz-socialist-list">
                    <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
                </ul>
            </section>
            <section className="ft-legal">
                <ul className="ft-legal-list">
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li>&copy; 2020 Copyright MedicMundo Inc.</li>
                </ul>
            </section>
        </footer>
                      
   )
} 