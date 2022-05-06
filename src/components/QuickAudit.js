import React from "react";
import CompliancePanel from './CompliancePanel'
import IssuePanel from './IssuePanel'

class WaveErrors extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        if (this.props.wave[this.props.wave.length - 1].issues.length > 0) {
            return (
                this.props.wave[this.props.wave.length - 1].issues.map((x, i) => {
                    return(
                        <div className={i % 2 !== 0 ? "issue odd" : "issue even"}>
                            <div className="cat">{x.description}</div>
                            <span className="numIssues">{x.count}</span>
                        </div> 
                    )
                })
            )
        } else {
            return (<p>No Wave errors!</p>)
        }
    }
}

export default class QuickAudit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const data = this.props.data;
        let lhScore = 0;
        if (data.lighthouse[data.lighthouse.length - 1]) {
            lhScore = data.lighthouse[data.lighthouse.length - 1].score;
        }
        return (
            <div className="doc-wrapper card">
                <div className="doc-header">
                    <h2>WCAG 2.1 AA Issue Report</h2>
                    <span class="right">Site: {data.url}<br />
                    Date: {new Date(data.sortsite[data.sortsite.length - 1].date).toLocaleDateString()}</span>
                </div>
                <div className="inner-card card half">
                    <CompliancePanel qa={true} data={data} levels={this.props.levels} thresholda={data.thresholda} thresholdaa={data.thresholdaa} />
                </div>
                <div className="inner-card card quarter">
                    <h2>Lighthouse (Accessibility) {lhScore < 90 ? " ⚠️" : ""}</h2>
                    <div className="subtext grey">90 or above</div>
                    <div className="lh-graph">
                        <svg width="180" height="180" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#444"
                                strokeWidth="4"
                                strokeDasharray={data.lighthouse.length > 0 ? data.lighthouse[data.lighthouse.length - 1].score + ", 100" : "0, 100"}
                            />
                            <text x="11" y="22" textLength="14">{data.lighthouse.length > 0 ? data.lighthouse[data.lighthouse.length - 1].score : "⚠️"}</text>
                        </svg>
                    </div>
                </div>
                <div className="inner-card card wave-card quarter">
                    <h2>Wave{this.props.waveCount > 5 ? " ⚠️" : ""}</h2>
                    <div className="subtext grey">5 or less</div>
                    <div className="wave-score">
                        {this.props.waveCount}<br />
                        <span className="wave-text">Errors</span>
                    </div>
                </div>
                <div className="doc-header">
                    <h2>Issue Details</h2>
                </div>
                <div className="card issues">
                    <IssuePanel sortsite={this.props.sortsite} levels={this.props.levels} issues={this.props.issues} />
                </div>
                <div className="doc-header">
                    <h2>Wave Errors <span className="grey">(Homepage)</span></h2>
                </div>
                <div className="card issues">
                    <div className="issuePanel">
                            <WaveErrors wave={data.wave} />
                        </div>
                </div>
                <div className="cta doc-header">
                    <p>Our in-house accessibility experts are on deck to fix these issues as soon as possible, or advise your internal development resources on what it will take to get back in bounds.</p>
                    <p>Please reach out at <a href="/contact">info@a11yradar.com</a> if you'd like to connect!</p>
                </div>
            </div>
        )
    }
}