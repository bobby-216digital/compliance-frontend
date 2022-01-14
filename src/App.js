import './App.css';
import React from 'react';

import TextCard from './components/TextCard'
import IssuePanel from './components/IssuePanel'
import CompliancePanel from './components/CompliancePanel'
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
    let obj = {}
    let levels = [0, 0, 0];
    data.sortsite[data.sortsite.length - 1].issues.map((x) => {
      if(obj[x.guideline]) {
        obj[x.guideline].push(x)
      } else {
        obj[x.guideline] = [x]
        if (x.guideline.includes(" A ")) {
          levels[0]++;
        } else if (x.guideline.includes(" AA ")) {
          levels[1]++;
        } else if (x.guideline.includes(" AAA ")) {
          levels[2]++;
        }
      }
    })

    this.setState({
      data: data,
      issues: obj,
      levels: levels
    })
  }

  render() {
    let lastDate, nextDate = "";
    let data = this.state.data;
    console.log(data);
    if (data !== false) {
      lastDate = new Date(data.sortsite[data.sortsite.length - 1].date).toLocaleDateString();
      nextDate = new Date((data.sortsite[data.sortsite.length - 1].date + (data.freq * 86400000))).toLocaleDateString();
    }
    return (
      <main>
        <h1>Report for {this.state.data.url}</h1>
        <TextCard subtext={"Last Scan Date"} text={data ? lastDate : "X/XX/XXXX"} />
        <TextCard subtext={"Next Scan Date"} text={data ? nextDate : "X/XX/XXXX"} />
        <IssuePanel levels={this.state.levels} issues={this.state.issues} />
        <CompliancePanel levels={this.state.levels} />
      </main>
    );
  }
}

export default App;
