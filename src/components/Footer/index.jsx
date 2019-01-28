import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="site-footer">
                <div className="container">
                    <div className="row gap-y align-items-center">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <ul className="nav nav-primary nav-hero">
                        <li className="nav-item">
                            <a className="nav-link" href="index.html">Bahdcasts</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;