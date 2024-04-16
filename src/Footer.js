import React from 'react';
import './Footer.css';

import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/fontawesome-free';



const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#terms">Terms of Service</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <ul className="social-links">
                        <li><a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; 2024 SkillSwap. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
