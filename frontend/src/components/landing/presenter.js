import React, { Component } from 'react';
import './styles.css';
//import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="home-section">
                <div className="dark-overlay">
                    <div className="home-inner container">
                        <div className="row">
                            <div className="col-lg-8 d-none d-lg-block">
                                <h1 className="display-4">
                                Build
                                <strong>social profiles</strong> and gain revenue
                                <strong>profits</strong>
                                </h1>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur adipisci temporibus sint culpa enim fuga.
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur adipisci temporibus sint culpa enim fuga.
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="p-4 align-self-start">
                                        <i className="fas fa-check fa-2x"></i>
                                    </div>
                                    <div className="p-4 align-self-end">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur adipisci temporibus sint culpa enim fuga.
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;