import './App.css';
import React from 'react';

import TextCard from './components/TextCard'
import IssuePanel from './components/IssuePanel'
import CompliancePanel from './components/CompliancePanel'
import ComplianceGraph from './components/ComplianceGraph'
import { useParams } from 'react-router-dom';

function App() {
  let { url } = useParams();
  console.log(url)
  return (
    <React.Fragment>
      <Panel url={url} />
    </React.Fragment>
  )
}

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      levels: ["X", "X", "X"],
      issues: false
    }

    this.initData = this.initData.bind(this);
  }

  componentDidMount() {
    if (!this.state.data) {
      fetch("https://a11y-server.herokuapp.com/site/" + this.props.url)
        .then(response => response.json())
        .then(data => {
          this.initData(data.data.querySite[0]);
        });
    }
  }

  initData(data) {
    let sortsite = JSON.parse(decodeURIComponent(data.sortsite[data.sortsite.length - 1].issues));
    console.log(sortsite);
    let obj = {}
    let levels = [0, 0, 0];
    if (sortsite.length !== 0) {
      Object.keys(sortsite).map((x, i) => {
        levels[i] = Object.keys(sortsite[x]).length;
        Object.keys(sortsite[x]).map((n) => {
          if(obj[Object.keys(sortsite)[i]]) {
            obj[Object.keys(sortsite)[i]].push(n)
          } else {
            obj[Object.keys(sortsite)[i]] = [n]
          }
          return true
        })
        return true
      })

      this.setState({
        data: data,
        issues: obj,
        levels: levels
      })
    } else {
      this.setState({
        data: data
      })
    }
    

    
  }

  render() {
    console.log(this.state)
    let lastDate, nextDate = "";
    let data = this.state.data;

    if (data !== false) {
      if (data.length === 0) {
        return (
          <React.Fragment>
            <h1>Report for {this.state.data.url}</h1>
            <div className="card">Awaiting initial scan. Scans may take up to 48 hours to complete.</div>
          </React.Fragment>
          
        )
      } else {
        lastDate = new Date(data.sortsite[data.sortsite.length - 1].date).toLocaleDateString();
        nextDate = new Date((data.sortsite[data.sortsite.length - 1].date + (data.freq * 86400000))).toLocaleDateString();
      }
    }
    return (
      <React.Fragment>
        <h1>Report for {this.state.data.url}</h1>
        <TextCard subtext={"Last Scan Date"} text={data ? lastDate : "X/XX/XXXX"} />
        <TextCard subtext={"Next Scan Date"} text={data ? nextDate : "X/XX/XXXX"} />
        <IssuePanel levels={this.state.levels} issues={this.state.issues} />
        <CompliancePanel levels={this.state.levels} />
        <ComplianceGraph data={data} />
      </React.Fragment>
    );
  }
}

export default App;
