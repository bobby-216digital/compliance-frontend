import React from "react";

class GraphLines extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.points[0]) {
            let attrs = ["", "", ""];
            this.props.points.map((n, ii) => {
                n.map((x, i) => {
                    attrs[ii] += (x[0] + "," + x[1] + " ")
                })
            })
            return(
                <React.Fragment>
                    <polyline fill="none" stroke="#304DA0" points={attrs[0]} strokeLinejoin="round" />
                    <polyline fill="none" stroke="#54CBF5" points={attrs[1]} strokeLinejoin="round" />
                    <polyline fill="none" stroke="#CCC" points={attrs[2]} strokeLinejoin="round" />
                    {this.props.normalizedDates.map((x, i) => {
                        return (<line key={i} x1={x} y1="0" x2={x} y2="500" className="guideline" />)
                    })}
                    {this.props.dates.map((x, i) => {
                        let text = new Date(x).toLocaleDateString();
                        return (
                        <React.Fragment key={i}>
                        <rect width="60" height="30" x={(this.props.normalizedDates[i] - 30)} y="525" />
                        <text x={(this.props.normalizedDates[i] - 25)} y="550">{text}</text>
                         </React.Fragment>
                        )
                       
                    })}
                </React.Fragment>
                
            ) 
        } else {
            return(<line />)
        }
        
    }
}

class ComplianceGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [],
            dates: [],
            normalizedDates: [],
            gotData: false
        }

        this.makeGraph = this.makeGraph.bind(this);
    }

    componentDidUpdate() {
        if (this.props.data && !this.state.gotData) {
            this.makeGraph();
        }
    }

    makeGraph() {
        let scan = this.props.data.sortsite;
        let points = [
            [],
            [],
            []
        ]
        let dates = [];

        scan.map((x) => {
            dates.push(x.date)

            let data = JSON.parse(decodeURIComponent(x.issues));
            points[0].push(Object.keys(data['a']).length);
            points[1].push(Object.keys(data['aa']).length);
            points[2].push(Object.keys(data['aaa']).length);
        })

        let min = dates[0];
        let max = dates[dates.length - 1];
        let normalizedDates = [];
        dates.map((x, i) => {
            normalizedDates[i] = parseInt(((x - min) / (max - min)) * 1000);
        })

        points.map((x, i) => {
            x.map((n, ii) => {
                points[i][ii] = [normalizedDates[ii], (500 - (n * 10))];
            })
        })

        this.setState({
            points: points,
            dates: dates,
            normalizedDates: normalizedDates,
            gotData: true
        })
    }

    render() {
        console.log(this.state)
        return(
            <div className="card">
                <h2>Compliance Issues Over Time</h2>
                <div className="legendItem"><span className="tag a"></span>Level A</div>
                <div className="legendItem"><span className="tag aa"></span>Level AA</div>
                <div className="legendItem"><span className="tag aaa"></span>Level AAA</div>
                <div className="svgWrapper">
                    <svg className="complianceGraph" xmlns="http://www.w3.org/2000/svg" width="1300" height="600" viewBox="-100 0 1200 600">
                        <line x1="0" y1="499" x2="1000" y2="499" stroke="#AAA" />
                        <GraphLines points={this.state.points} normalizedDates={this.state.normalizedDates} dates={this.state.dates} />
                        <text x="-50" y="500">0</text>
                        <text x="-50" y="450">5</text>
                        <text x="-50" y="400">10</text>
                        <text x="-50" y="350">15</text>
                        <text x="-50" y="300">20</text>
                        <text x="-50" y="250">25</text>
                        <text x="-50" y="200">30</text>
                        <text x="-50" y="150">35</text>
                        <text x="-50" y="100">40</text>
                        <text x="-50" y="50">45</text>
                    </svg> 
                </div>
            </div>
        )
    }
}

export default ComplianceGraph;
