import React from "react";

class Issue extends React.Component {
    render() {
        return(
            <div className="issue">
                <span className="cat">{this.props.cat}</span>
                <span className="numIssues"> - Pages: {this.props.numIssues}</span>
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
                {this.props.issues ? Object.keys(this.props.issues).map((x, i) => {
                    return (<Issue key={i} cat={x} numIssues={this.props.issues[x].length} />)
                }) : ""}
            </div>
        )
    }
}

export default IssuePanel;