import React from "react";

class Bar extends React.Component {
    render() {
        let color = "black";
        let hasAlert = "";
        switch (this.props.level) {
            case 0:
                if (this.props.num >= 10) {
                    color = "red"
                    hasAlert = "⚠️";
                } else {
                    color = "green"
                }
                break;
            case 1:
                if (this.props.num >= 5) {
                    color = "red"
                    hasAlert = "⚠️";
                } else {
                    color = "green"
                }
                break;
            case 2:
                color = "green"
                break;
            default:
                color = "black"
                break;
        }
        return (
            <div className="bar-cont">
                <div className="bar">
                    <div className="inner-bar" style={{ height: (this.props.num ? this.props.num * 6 : 0), backgroundColor: (color) }}></div>
                </div>
                <span>{this.props.name} {hasAlert}</span>
            </div>
        )
    }
}

class CompliancePanel extends React.Component {
    render() {
        return(
            <div className="card">
                <h2>Current Compliance Status</h2>
                <div className="col-40 outer-bar-cont">
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
                    <Bar name={"Level A"} level={0} num={this.props.levels[0]} />
                    <Bar name={"Level AA"} level={1} num={this.props.levels[1]} />
                    <Bar name={"Level AAA"} level={2} num={this.props.levels[2]} />
                </div>
                <div className="col-60">
                    <p>{this.props.levels[0]} Level A</p>
                    <p>{this.props.levels[1]} Level AA</p>
                    <p>{this.props.levels[2]} Level AAA</p>
                </div>
            </div>
        )
    }
}

export default CompliancePanel;