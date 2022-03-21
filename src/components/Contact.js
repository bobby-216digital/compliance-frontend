import React from "react";
import { useParams } from 'react-router-dom';

export default function Contact() {
    let { url } = useParams();
    return (
        <React.Fragment>
            <ContactForm url={url} />
        </React.Fragment>
    )
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            email: "",
            note: ""
        };
    }

    doChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    doSubmit() {
        fetch('https://a11y-server.herokuapp.com/contact', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": `${this.state.url}`,
                "email": `${this.state.email}`,
                "note": `${this.state.note}`
            })
        })
            .then(data => {
                console.log(data.body)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="contact-form card">
                <fieldset>
                    <legend><h2>Inquiry Details</h2></legend>
                    <div className="contact-wrapper">
                        <label htmlFor="url">Website</label>
                        <input type="text" name="url" id="url" value={this.props.url ? this.props.url : this.state.url} onChange={(x) => this.doChange(x)} />
                        <label htmlFor="email">Email Address</label>
                        <input type="text" name="email" id="email"  value={this.state.email} onChange={(x) => this.doChange(x)}/>
                        <label htmlFor="type">Inquiry Type</label>
                        <select name="email" id="email">
                            <option value="learn">I'd like to learn more about a11y.Radar</option>
                            <option value="issues">I'd like some help fixing issues on my site</option>
                            <option value="support">There is an issue with my account</option>
                            <option value="scan">I'd like to request another scan</option>
                            <option value="general">Something else</option>
                        </select>
                        <label htmlFor="note">Notes</label>
                        <textarea rows="8" name="note" id="note" value={this.state.notes} onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.doSubmit()}>Submit</button>
                    </div>
                    
                </fieldset>
            </div>
        )
    }
}