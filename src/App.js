import './App.css';
import React from 'react';
import trustmark from './trustmark.png'

import TextCard from './components/TextCard'
import IssuePanel from './components/IssuePanel'
import CompliancePanel from './components/CompliancePanel'
import ComplianceGraph from './components/ComplianceGraph'
import QuickAudit from './components/QuickAudit';
import { useParams } from 'react-router-dom';

function App(props) {
  let { url, date } = useParams();
  console.log(url)
  return (
    <React.Fragment>
      <Panel url={url} qa={props.qa} date={date} />
    </React.Fragment>
  )
}

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      levels: ["X", "X", "X"],
      issues: false,
      waveCount: 0,
      sortsite: null,
      ssIndex: 0
    }

    this.initData = this.initData.bind(this);
  }

  componentDidMount() {
    if (!this.state.data) {
      fetch("https://a11y-server.herokuapp.com/site/" + this.props.url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.initData(data.data.querySite[0]);
        });
    }
  }

  initData(data) {
    if (data.sortsite[0]) {
      let sortsite, ssIndex; 

      console.log(this.props.date)
      
      if (this.props.date) {
        data.sortsite.map((x, i) => {
          if (x.date == this.props.date) {
            sortsite = JSON.parse(decodeURIComponent(data.sortsite[i].issues));
            ssIndex = i;
          }
        })
      } else {
        sortsite = JSON.parse(decodeURIComponent(data.sortsite[data.sortsite.length - 1].issues));
        ssIndex = data.sortsite.length - 1;
      }
      
      console.log(sortsite);
      let obj = {}
      let levels = [0, 0, 0];
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
      let waveCount = 0;
      data.wave[data.wave.length - 1].issues.map((x) => {
        waveCount = waveCount + x.count
      })
      this.setState({
        data: data,
        levels: levels,
        issues: obj,
        waveCount: waveCount,
        sortsite: sortsite,
        ssIndex: ssIndex
      })
    } else {
      this.setState({
        data: data
      })
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    let lastDate, nextDate = "";
    let data = this.state.data;

    if (data !== false) {
      if (!data.sortsite[0]) {
        return (
          <React.Fragment>
            <div className="card">Awaiting initial scan for {this.state.data.url}.<br />Scans may take up to 48 hours to complete.</div>
          </React.Fragment>
          
        )
      } else {
        lastDate = new Date(data.sortsite[data.sortsite.length - 1].date).toLocaleDateString();
        nextDate = new Date((data.sortsite[data.sortsite.length - 1].date + (data.freq * 86400000))).toLocaleDateString();
      }
    } else {
      return(<h2>Loading data...</h2>)
    }
    if (this.props.qa == true) {
      return (<QuickAudit ssIndex={this.state.ssIndex} sortsite={this.state.sortsite} waveCount={this.state.waveCount} data={data} levels={this.state.levels} issues={this.state.issues} />)
    } else {
    return (
      <React.Fragment>
        {/* <h1>Report for {this.state.data.url}</h1> */}
        <div className="datesTile third">
          <div className="card titleCard">
            <h2>Compliance Dashboard</h2><br/>
            <strong><a target="_new" href={this.state.data.url}>{this.state.data.url}</a></strong>
          </div>
          <TextCard subtext={"Last Scan Date"} text={data ? lastDate : "X/XX/XXXX"} />
          <TextCard subtext={"Next Scan Date"} text={data ? nextDate : "X/XX/XXXX"} />
          <div className="card">
            <h2>Outstanding Issues</h2><a href={"/qa/" + data.slug} class="btn reportBtn">View report</a>
            <IssuePanel sortsite={this.state.sortsite} levels={this.state.levels} issues={this.state.issues} />
          </div>
        </div>
        <div className="two-thirds">
          <div className="card">
            <CompliancePanel waveCount={this.state.waveCount} data={data} levels={this.state.levels} thresholda={data.thresholda} thresholdaa={data.thresholdaa} />
          </div>
          <div className="card third">
            {data.thresholda < this.state.levels[0] || data.thresholda < this.state.levels[1] ? 
            <div className="noticePanel">
              <h2>⚠️ Notice</h2>
              <p>Your error count has surpassed your risk tolerance threshold. Please <a href={"/" + data.slug + "/contact"}>contact us</a> if you would like help remediating these issues.</p>
            </div> 
            : 
            <div className="noticePanel">
              <h2>🎉 Congratulations!</h2>
              <p>Your error counts are within your risk tolerance thresholds. Keep up the good work!</p>
            </div>
            }
            <img src={trustmark} alt="Accessibility House Logo" />
          </div>
          <ComplianceGraph data={this.state.data} />
        </div>
      </React.Fragment>
    );
    }
  }
}

export default App;
