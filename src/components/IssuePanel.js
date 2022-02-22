import React from "react";

class Issue extends React.Component {
    render() {
        return(
            <div className={this.props.i % 2 !== 0 ? "issue odd" : "issue even"}>
                <span className="cat">{this.props.cat}</span>
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
                <div class="inner">
                    <h3>Level A</h3>
                    {this.props.issues['a'] ? this.props.issues['a'].map((x, i) => {
                        return (<Issue i={i} cat={x} numIssues={this.props.issues['a'][i].length} />)
                    }) : ""}
                    <h3>Level AA</h3>
                    {this.props.issues['aa'] ? this.props.issues['aa'].map((x, i) => {
                        return (<Issue i={i} cat={x} numIssues={this.props.issues['aa'][i].length} />)
                    }) : ""}
                    <h3>Level AAA</h3>
                    {this.props.issues['aaa'] ? this.props.issues['aaa'].map((x, i) => {
                        return (<Issue i={i} cat={x} numIssues={this.props.issues['aaa'][i].length} />)
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default IssuePanel;