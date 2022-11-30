import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Contact() {
    let { url } = useParams();
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <ContactForm url={url} navigate={navigate} />
        </React.Fragment>
    )
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            email: "",
            note: "",
            type: "learn",
            phone: ""
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
                "type": `${this.state.type}`,
                "notes": `${this.state.note}`,
                "phone": `${this.state.phone}`
            })
        })
            .then(data => {
                this.props.navigate("/thanks", { replace: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="contact-form card">
                <fieldset>
                    <legend><h2>Contact Us</h2></legend>
                    <p>Fill out the form below if you'd like us to reach out, or <a href="/schedule">click here to schedule a call directly.</a></p>
                    <div className="contact-wrapper">
                        <label htmlFor="url">Website</label>
                        <input type="text" name="url" id="url" value={this.props.url ? this.props.url : this.state.url} onChange={(x) => this.doChange(x)} />
                        <label htmlFor="email">Email Address</label>
                        <input type="text" name="email" id="email"  value={this.state.email} onChange={(x) => this.doChange(x)}/>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone"  value={this.state.phone} onChange={(x) => this.doChange(x)}/>
                        <label htmlFor="type">Inquiry Type</label>
                        <select name="type" id="type" onChange={(x) => this.doChange(x)}>
                            <option value="learn">I'd like to learn more about a11y.Radar</option>
                            <option value="issues">I'd like some help fixing issues on my site</option>
                            <option value="support">There is an issue with my account</option>
                            <option value="scan">I'd like to request another scan</option>
                            <option value="general">Something else</option>
                        </select>
                        <label htmlFor="note">Notes</label>
                        <textarea rows="8" name="note" id="note" value={this.state.note} onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.doSubmit()}>Submit</button>
                    </div>
                    
                </fieldset>
            </div>
        )
    }
}