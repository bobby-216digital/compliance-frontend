import React from "react";

class Issue extends React.Component {
    render() {
        return(
            <div className={this.props.i % 2 !== 0 ? "issue odd" : "issue even"}>
                <div className="cat">{this.props.cat}</div>
                <span className="numIssues">{this.props.numIssues == 50 ? "50+" : this.props.numIssues}</span>
            </div>
        )
    }
}

class IssuePanel extends React.Component {
    render() {
        console.log(this.props);
        console.log(Object.keys(this.props.sortsite.a))
        return(
            <div className="issuePanel">
                <div className="inner">
                    <h3><strong>{Object.keys(this.props.sortsite.a).length}</strong> Level A<span className="right"># Pages</span></h3>
                    {Object.keys(this.props.sortsite.a) ? Object.keys(this.props.sortsite.a).map((x, i) => {
                        return (<Issue key={i} i={i} cat={x} numIssues={this.props.sortsite.a[x].length} />)
                    }) : ""}
                    <h3><strong>{Object.keys(this.props.sortsite.aa).length}</strong> Level AA<span className="right"># Pages</span></h3>
                    {Object.keys(this.props.sortsite.aa) ? Object.keys(this.props.sortsite.aa).map((x, i) => {
                        return (<Issue key={i} i={i} cat={x} numIssues={this.props.sortsite.aa[x].length} />)
                    }) : ""}
                    <h3><strong>{Object.keys(this.props.sortsite.aaa).length}</strong> Level AAA<span className="right"># Pages</span></h3>
                    {Object.keys(this.props.sortsite.aaa) ? Object.keys(this.props.sortsite.aaa).map((x, i) => {
                        return (<Issue key={i} i={i} cat={x} numIssues={this.props.sortsite.aaa[x].length} />)
                    }) : ""}
                </div>
            </div>
        )
    }
}

export default IssuePanel;