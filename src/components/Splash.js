import React from "react";
import trustmark from '../trustmark.png'

export default class Splash extends React.Component {
    render() {
        return (
            <div className="splash">
                <img src={trustmark} alt="Accessibility House Logo" />
                <h2>a11y.Radar is a Web ADA Compliance monitoring service specifically focused on keeping non-compliance lawsuits at bay.</h2>
                <a className="btn" href="/contact">Get in touch</a>
            </div>
        )
    }
}