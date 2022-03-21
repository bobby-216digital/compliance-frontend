import React from "react";

class Bar extends React.Component {
    render() {
        let color = "black";
        let hasAlert = "";
        switch (this.props.level) {
            case 0:
                if (this.props.num >= parseInt(this.props.thresholda)) {
                    color = "#26296D"
                    hasAlert = "⚠️";
                } else {
                    color = "#26296D"
                }
                break;
            case 1:
                if (this.props.num >= parseInt(this.props.thresholdaa)) {
                    color = "#54CBF5"
                    hasAlert = "⚠️";
                } else {
                    color = "#54CBF5"
                }
                break;
            case 2:
                color = "#CCC"
                break;
            default:
                color = "#CCC"
                break;
        }
        return (
            <div className="bar-cont">
                <div className="bar">
                    <div className="inner-bar" style={{ height: (this.props.num ? this.props.num * 4 : 0), backgroundColor: (color) }}></div>
                </div>
                <span>{this.props.name} {hasAlert}</span>
            </div>
        )
    }
}

class CompliancePanel extends React.Component {
    render() {
        return(
            <div className="card compliance">
                <h2>Current Compliance Status</h2>
                <div className="complianceWrapper">
                    <div className="outer-bar-cont">
                        <div className="bar-grid-cont">
                            <div className="line">40</div>
                            <div className="line">35</div>
                            <div className="line">30</div>
                            <div className="line">25</div>
                            <div className="line">20</div>
                            <div className="line">15</div>
                            <div className="line">10</div>
                            <div className="line">5</div>
                            <div className="line first"></div>
                        </div>
                        <Bar thresholda={this.props.thresholda} thresholdaa={this.props.thresholdaa} name={"Level A"} level={0} num={this.props.levels[0]} />
                        <Bar thresholda={this.props.thresholda} thresholdaa={this.props.thresholdaa} name={"Level AA"} level={1} num={this.props.levels[1]} />
                        <Bar thresholda={this.props.thresholda} thresholdaa={this.props.thresholdaa} name={"Level AAA"} level={2} num={this.props.levels[2]} />
                    </div>
                    <div className="overview">
                    <div className="legendItem"><span className="tag a"></span><strong>{this.props.levels[0]}</strong> Level A</div><br />
                    <div className="legendItem"><span className="tag aa"></span><strong>{this.props.levels[1]}</strong> Level AA</div><br />
                    <div className="legendItem"><span className="tag aaa"></span><strong>{this.props.levels[2]}</strong> Level AAA</div><br />
                    <div className="legendItem"><span className="tag gen"></span><strong>{this.props.data.lighthouse[this.props.data.lighthouse.length - 1] ? this.props.data.lighthouse[this.props.data.lighthouse.length - 1].score : "⚠️"}</strong> Lighthouse</div><br />
                    <div className="legendItem"><span className="tag gen"></span><strong>{this.props.data.wave[this.props.data.wave.length - 1] ? this.props.data.wave[this.props.data.wave.length - 1].issues.length : "⚠️"}</strong> Wave Errors</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompliancePanel;