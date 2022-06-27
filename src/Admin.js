import './App.css';
import React from 'react';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            pass: "",
            url: "",
            freq: "9999",
            slug: "",
            error: "",
            contacts: "info@a11yradar.com",
            thresholda: "10",
            thresholdaa: "5",
            passcode: "pass",
            data: false,
            lhurl: "",
            lhscore: ""
        }

        this.doAuth = this.doAuth.bind(this);
        this.doChange = this.doChange.bind(this);
        this.onboard = this.onboard.bind(this);
        this.initData = this.initData.bind(this);
        this.newScan = this.newScan.bind(this);
        this.addLighthouse = this.addLighthouse.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
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

    newScan(url) {
        console.log(url)
        fetch('https://a11y-server.herokuapp.com/newscan', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": `${url}`
            })
        })
            .then(data => {
                this.initData(true);
                console.log(data.body)
            })
            .catch(error => {
                console.log(error)
            })
    }

    addLighthouse() {
        console.log(url)
        fetch('https://a11y-server.herokuapp.com/addlighthouse', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": `${this.state.lhurl}`,
                "score": `${parseInt(this.state.lhscore)}`
            })
        })
            .then(data => {
                this.initData(true);
                console.log(data.body)
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

    deleteSite(slug) {
        fetch('https://a11y-server.herokuapp.com/delete/' + slug)
        .then((res) => {
            this.initData(true);
            console.log(res)
        })
    }

    render() {
        if (this.state.isAuth && this.state.data) {
            return (
                <React.Fragment>
                    <div className="card">
                        <h2>Onboard a site</h2>
                        <label htmlFor="url">Site URL</label>
                        <input id="url" type="text" value={this.state.url} name="url" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="url">Scan Frequency (in days)</label>
                        <input id="freq" type="text" value={this.state.freq} name="freq" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="url">Site Slug (e.g. 'nike')</label>
                        <input id="slug" type="text" value={this.state.slug} name="slug" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="contacts">Contacts (comma + space separated ", ")</label>
                        <input id="contacts" type="text" value={this.state.contacts} name="contacts" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="thresholda">Level A Threshold</label>
                        <input id="thresholda" type="text" value={this.state.thresholda} name="thresholda" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="thresholdaa">Level AA Threshold</label>
                        <input id="thresholdaa" type="text" value={this.state.thresholdaa} name="thresholdaa" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="passcode">Passcode</label>
                        <input id="passcode" type="text" value={this.state.passcode} name="passcode" onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.onboard()}>Submit</button>
                        <p>{this.state.error}</p>
                        <h2>Add Lighthouse Scan</h2>
                        <label htmlFor="lhurl">URL</label>
                        <input id="lhurl" type="text" value={this.state.lhurl} name="lhurl" onChange={(x) => this.doChange(x)} />
                        <label htmlFor="lhscore">Scan</label>
                        <input id="lhscore" type="text" value={this.state.lhscore} name="lhscore" onChange={(x) => this.doChange(x)} />
                        <button onClick={() => this.addLighthouse()}>Submit</button><br />
                        <a class="btn" href="https://a11y-server.herokuapp.com/sortsite" target="_new">View queue</a>
                    </div>
                    <div className="card">
                        <h2>Sites</h2>
                        <div className="tabPanel">
                            <div className="innerPanel mainPanel">
                                <div className="doc-header">
                                    <h2>Ongoing</h2>
                                </div>
                                <div className="qa-inner">
                                    {this.state.data ? this.state.data.map((x, i) => {
                            let link = x ? "/" + x.slug : "";
                            if (x) {
                                if (x.freq < 200) {
                                return(
                               <div key={i} className="siteLine">
                                    {x.newscan == true ? "⏰" : ""}
                                   <a target="_blank" href={link}>{x.url}</a>
                                   <a target="_blank" class="btn" href={"/qa" + link}>QA</a>
                                   <button onClick={() => this.newScan(x.url)}>New Scan</button>
                                   <button onClick={() => this.deleteSite(x.slug)}>Delete</button>
                               </div> 
                            )
                            }
                            }
                        }) : ""}  
                                </div>
                              
                            </div>
                            <div className="innerPanel qaPanel">
                            <div className="doc-header">
                                <h2>QA</h2> 
                            </div>
                            <div className="qa-inner">
                                {this.state.data ? this.state.data.slice(0).reverse().map((x, i) => {
                            let link = x ? "/" + x.slug : "";
                            if (x) {
                                 if (x.freq >= 200) {
                                return(
                               <div key={i} className="siteLine">
                                   {x.newscan == true ? "⏰" : ""}
                                   <a target="_blank" href={"/qa" + link}>{x.url}</a>
                                   <button onClick={() => this.newScan(x.url)}>New Scan</button>
                                   <button onClick={() => this.deleteSite(x.slug)}>Delete</button>
                               </div> 
                            )
                            }
                            }
                           
                            
                        }) : ""} 
                            </div>
                             
                            </div>
                        </div>
                        
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