import React from "react";
import CompliancePanel from './CompliancePanel'
import IssuePanel from './IssuePanel'

export default class QuickAudit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const data = this.props.data;
        return (
            <div className="doc-wrapper card">
                <div className="doc-header">
                    <h2>WCAG 2.1 AA Issue Report</h2>
                    <span>Site: {data.url}</span>
                    <span>Date: {new Date(data.sortsite[data.sortsite.length - 1].date).toLocaleDateString()}</span>
                </div>
                <div className="inner-card card">
                    <CompliancePanel qa={true} data={data} levels={this.props.levels} thresholda={data.thresholda} thresholdaa={data.thresholdaa} />
                </div>
                <div className="inner-card card">
                    <h2>Lighthouse</h2>
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
                        </svg>
                        <span className="lh-score">
                            {data.lighthouse.length > 0 ? data.lighthouse[data.lighthouse.length - 1].score : "⚠️"}
                        </span>
                    </div>
                </div>
                <div className="inner-card card wave-card">
                    <h2>Wave</h2>
                    <div className="wave-score">
                        {this.props.waveCount}<br />
                        <span className="wave-text">Errors</span>
                    </div>
                </div>
                <div className="doc-header">
                    <h2>Issue Details</h2>
                </div>
                <div className="card issues">
                    <IssuePanel levels={this.props.levels} issues={this.props.issues} />
                </div>
            </div>
        )
    }
}