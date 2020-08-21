import React from 'react';
import '../Styles/Footer.css';


export function Footer() {

    return (
        <footer>
            <section className="ft-social">
                <ul className="ft-social-list">
                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fab fa-github"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
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