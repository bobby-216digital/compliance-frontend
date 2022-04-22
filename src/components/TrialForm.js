import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function TrialForm() {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <Trial navigate={navigate} />
        </React.Fragment>
    )
}

class Trial extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            email: "",
            note: "",
            type: "",
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
                "phone": `${this.state.phone}`,
                "type": `${this.state.type}`,
                "note": `${this.state.note}`
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
                    <legend><h2>Start your Free Trial</h2></legend>
                    <p>Please fill out the form below and we'll reach out to coordinate onboarding.</p>
                    <div className="contact-wrapper">
                        <label htmlFor="url">Website</label>
                        <input type="text" name="url" id="url" value={this.props.url ? this.props.url : this.state.url} onChange={(x) => this.doChange(x)} />
                        <label htmlFor="email">Email Address</label>
                        <input type="text" name="email" id="email"  value={this.state.email} onChange={(x) => this.doChange(x)}/>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone"  value={this.state.phone} onChange={(x) => this.doChange(x)}/>
                        <label htmlFor="type">How would you like to be contacted?</label>
                        <select name="type" id="type" onChange={(x) => this.doChange(x)}>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                        <label htmlFor="note">When is the best time to contact you?</label>
                        <textarea rows="8" name="note" id="note" value={this.state.notes} onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.doSubmit()}>Submit</button>
                    </div>
                    
                </fieldset>
            </div>
        )
    }
}