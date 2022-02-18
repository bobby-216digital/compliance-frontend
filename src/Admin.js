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
            })
        })
            .then(data => {
                this.initData(true);
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
                        <label for="url">Site URL</label>
                        <input id="url" type="text" value={this.state.url} name="url" onChange={this.doChange(this.value)} />
                        <label for="url">Scan Frequency (in days)</label>
                        <input id="freq" type="text" value={this.state.freq} name="freq" onChange={this.doChange(this.value)} />
                        <label for="url">Site Slug (e.g. 'nike')</label>
                        <input id="slug" type="text" value={this.state.slug} name="slug" onChange={this.doChange(this.value)} />
                        <button onClick={() => this.onboard()}>Submit</button>
                        <p>{this.state.error}</p>
                    </div>
                    <div className="card">
                        <h2>Sites</h2>
                        {this.state.data ? this.state.data.map((x) => {
                            let link = "/" + x.slug
                            return(
                               <div className="siteLine">
                                   <a target="_new" href={link}>{x.url}</a>
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