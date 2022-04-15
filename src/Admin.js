import './App.css';
import React from 'react';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            pass: "",
            url: "",
            freq: "",
            slug: "",
            error: "",
            contacts: "",
            thresholda: "",
            thresholdaa: "",
            passcode: "",
            data: false
        }

        this.doAuth = this.doAuth.bind(this);
        this.doChange = this.doChange.bind(this);
        this.onboard = this.onboard.bind(this);
        this.initData = this.initData.bind(this);
    }

    componentDidUpdate() {
        this.initData();
    }

    initData(update) {
        if (!this.state.data || update === true) {
            fetch("https://a11y-server.herokuapp.com/sites")
              .then(response => response.json())
              .then(data => {
                this.setState({
                    data: data.data.querySite
                })
              });
          }
    }

    doAuth() {
        fetch('https://a11y-server.herokuapp.com/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "key": `${this.state.pass}`
            })
        })
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    this.setState({
                        isAuth: true,
                        error: false
                    })
                } else {
                    this.setState({
                        error: "Incorrect password. Please try again."
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
            
    }

    onboard() {
        fetch('https://a11y-server.herokuapp.com/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": `${this.state.url}`,
                "freq": `${this.state.freq}`,
                "slug": `${this.state.slug}`,
                "contacts": `${this.state.contacts}`,
                "thresholda": `${this.state.thresholda}`,
                "thresholdaa": `${this.state.thresholdaa}`,
                "passcode": `${this.state.passcode}`
            })
        })
            .then(data => {
                this.initData(true);
                console.log(data.body)
                this.setState({
                    error: "Site Onboarded!"
                })
            })
            .catch(error => {
                console.log(error)
            })
            
    }

    doChange(event) {

            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
            [name]: value
            });

    }

    render() {
        if (this.state.isAuth) {
            return (
                <React.Fragment>
                    <div className="card">
                        <h1>Admin</h1>
                    </div>
                    <div className="card">
                        <h2>Onboard a site</h2>
                        <label htmlFor="url">Site URL</label>
                        <input id="url" type="text" value={this.state.url} name="url" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="url">Scan Frequency (in days)</label>
                        <input id="freq" type="text" value={this.state.freq} name="freq" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="url">Site Slug (e.g. 'nike')</label>
                        <input id="slug" type="text" value={this.state.slug} name="slug" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="contacts">Contacts (comma separated)</label>
                        <input id="contacts" type="text" value={this.state.contacts} name="contacts" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="thresholda">Level A Threshold</label>
                        <input id="thresholda" type="text" value={this.state.thresholda} name="thresholda" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="thresholdaa">Level AA Threshold</label>
                        <input id="thresholdaa" type="text" value={this.state.thresholdaa} name="thresholdaa" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="passcode">Passcode</label>
                        <input id="passcode" type="text" value={this.state.passcode} name="passcode" onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.onboard()}>Submit</button>
                        <p>{this.state.error}</p>
                    </div>
                    <div className="card">
                        <h2>Sites</h2>
                        {this.state.data ? this.state.data.map((x, i) => {
                            let link = "/" + x.slug
                            return(
                               <div key={i} className="siteLine">
                                   <a target="_blank" href={link}>{x.url}</a>&nbsp;|&nbsp;
                                   <a target="_blank" href={"/qa" + link}>QA</a>
                               </div> 
                            )
                        }) : ""}
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <div className="card">
                    <h1>Admin panel login</h1>
                    <input type="text" id="pass" name="pass" title="Password" value={this.state.pass} onChange={this.doChange} />
                    <button onClick={() => this.doAuth()}>Submit</button>
                    <br />
                    <p>{this.state.error}</p>
                </div>
            )
        }
       
    }
}

export default Admin;