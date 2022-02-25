import React from "react";

class Issue extends React.Component {
    render() {
        return(
            <div className={this.props.i % 2 !== 0 ? "issue odd" : "issue even"}>
                <div className="cat">{this.props.cat}</div>
                <span className="numIssues">{this.props.numIssues}</span>
            </div>
        )
    }
}

class IssuePanel extends React.Component {
    render() {
        console.log(this.props.issues);
        return(
            <div className="card issuePanel">
                <h2>Outstanding Issues</h2>
                <div className="inner">
                    <h3><strong>{this.props.issues['a'].length}</strong> Level A<span className="right"># Pages</span></h3>
                    {this.props.issues['a'] ? this.props.issues['a'].map((x, i) => {
                        return (<Issue key={i} i={i} cat={x} numIssues={this.props.issues['a'][i].length} />)
                    }) : ""}
                    <h3><strong>{this.props.issues['aa'].length}</strong> Level AA<span className="right"># Pages</span></h3>
                    {this.props.issues['aa'] ? this.props.issues['aa'].map((x, i) => {
                        return (<Issue key={i + 100} i={i} cat={x} numIssues={this.props.issues['aa'][i].length} />)
                    }) : ""}
                    <h3><strong>{this.props.issues['aaa'].length}</strong> Level AAA<span className="right"># Pages</span></h3>
                    {this.props.issues['aaa'] ? this.props.issues['aaa'].map((x, i) => {
                        return (<Issue key={i + 200} i={i} cat={x} numIssues={this.props.issues['aaa'][i].length} />)
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default IssuePanel;