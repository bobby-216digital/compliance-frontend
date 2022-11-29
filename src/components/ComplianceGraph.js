import React from "react";

class GraphLines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIndex: 0,
            hoverClass: "tooltip",
            hoverX: 0,
            hoverIndex: 0
        }

        this.doHover = this.doHover.bind(this);
        this.doLeave = this.doLeave.bind(this);
        this.doClick = this.doClick.bind(this);
        this.tooltip = React.createRef();
    }
    doHover(x) {
        console.log(x.target.getAttribute("date"))
        this.setState({
            hoverClass: "tooltip open",
            hoverX: (x.target.x1.baseVal.value - 130),
            hoverIndex: x.target.getAttribute("date")
        })
    }
    doLeave(x) {
        this.setState({
            hoverClass: "tooltip"
        })
    }
    doClick(x, i) {
        window.location.replace("/qa/" + this.props.data.slug + "/" + this.props.data.sortsite[i].date)
    }
    render() {
        let xunit = this.props.xunit;
        let yunit = this.props.yunit;
        if (this.props.points[0]) {
            let attrs = ["", "", ""];
            this.props.points.map((n, ii) => {
                n.map((x, i) => {
                    attrs[ii] += (x[0] + "," + x[1] + " ")
                })
            })
            return(
                <React.Fragment>
                    {this.props.normalizedDates.map((x, i) => {
                        return (<line key={i} x1={x} y1="0" x2={x} y2={yunit * 10} className="guideline" />)
                    })}
                    {this.props.dates.map((x, i) => {
                        let text = new Date(x);
                        return (
                        <React.Fragment key={i}>
                        <rect className="dateRect" rx="5" ry="5" width="46" height="22" x={(this.props.normalizedDates[i] - 16)} y={yunit * 10.5} />
                        <text className="dateText" width="46" x={(this.props.normalizedDates[i] - 13)} y={yunit * 11}>{text.getMonth() + 1}/{text.getDate()}</text>
                         </React.Fragment>
                        )
                       
                    })}
                    <polyline fill="none" stroke="#304DA0" points={attrs[0]} strokeLinejoin="round" />
                    <polyline fill="none" stroke="#54CBF5" points={attrs[1]} strokeLinejoin="round" />
                    <polyline fill="none" stroke="#CCC" points={attrs[2]} strokeLinejoin="round" />
                    <svg ref={this.tooltip} className={this.state.hoverClass} x={this.state.hoverX} y="-16" width="260" height="220" viewBox="0 0 195.137 165.046">
                        <g id="TooltipBG" transform="translate(23 49.106)">
                            <g transform="matrix(1, 0, 0, 1, -23, -49.11)">
                            <path id="BG-2" data-name="BG" d="M68.568,112.838H4.89c-2.7,0-4.89-3.608-4.89-8.06V8.06C0,3.609,2.189,0,4.89,0H144.247c2.7,0,4.89,3.609,4.89,8.06v96.719c0,4.451-2.19,8.06-4.89,8.06H80.569l-6,6Z" transform="translate(23 18)" fill="#fff" stroke="#e8f5f7" strokeWidth="1"/>
                            </g>
                        </g>
                        <text id="Online_Sales" data-name="Online Sales" transform="translate(94 112)" fill="#7e84a3" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">{this.props.vals[this.state.hoverIndex][0]} Issues</tspan></text>
                        <text id="_750" data-name="$750" transform="translate(56 112)" fill="#131523" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">A</tspan></text>
                        <rect id="Sales" width="8" height="8" rx="4" transform="translate(44 104)" fill="#304da0"/>
                        <text id="Online_Sales-2" data-name="Online Sales" transform="translate(95 89)" fill="#7e84a3" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">{this.props.vals[this.state.hoverIndex][1]} Issues</tspan></text>
                        <text id="_750-2" data-name="$750" transform="translate(56 89)" fill="#131523" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">AA</tspan></text>
                        <rect id="Sales-2" data-name="Sales" width="8" height="8" rx="4" transform="translate(44 81)" fill="#54cbf5"/>
                        <text id="Titlee" transform="translate(70 43)" fill="#131523" fontSize="12" fontFamily="ProximaNova-Semibold, Proxima Nova" fontWeight="600"><tspan x="0" y="0">{new Date(this.props.dates[this.state.hoverIndex]).toLocaleDateString()}</tspan></text>
                        <text id="Online_Sales-3" data-name="Online Sales" transform="translate(95 66)" fill="#7e84a3" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">{this.props.vals[this.state.hoverIndex][2]} Issues</tspan></text>
                        <text id="_750-3" data-name="$750" transform="translate(56 66)" fill="#131523" fontSize="12" fontFamily="ProximaNova-Regular, Proxima Nova"><tspan x="0" y="0">AAA</tspan></text>
                        <rect id="Sales-3" data-name="Sales" width="8" height="8" rx="4" transform="translate(44 58)" fill="#1e252d"/>
                    </svg>
                    {this.props.normalizedDates.map((x, i) => {
                        return (<line date={i} onClick={(x => this.doClick(x, i))} onMouseEnter={(x) => this.doHover(x)} onMouseLeave={(x) => this.doLeave(x)} key={i + 999} x1={x} y1="0" x2={x} y2={yunit * 10} className="hoverLine" />)
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
            gotData: false,
            xunit: 43.3,
            yunit: 29,
            vals: []
        }

        this.makeGraph = this.makeGraph.bind(this);
    }

    componentDidMount() {
        this.makeGraph();
    }

    makeGraph() {
        let scan = this.props.data.sortsite;
        console.log(scan)
        let points = [
            [],
            [],
            []
        ]
        let vals = [];
        let dates = [];

        scan.map((x) => {
            dates.push(x.date)

            let data = JSON.parse(decodeURIComponent(x.issues));
            points[0].push(Object.keys(data['a']).length);
            points[1].push(Object.keys(data['aa']).length);
            points[2].push(Object.keys(data['aaa']).length);
            vals.push([Object.keys(data['a']).length, Object.keys(data['aa']).length, Object.keys(data['aaa']).length])
        })

        let min = dates[0];
        let max = dates[dates.length - 1];
        let normalizedDates = [];
        dates.map((x, i) => {
            normalizedDates[i] = parseInt(((x - min) / (max - min)) * (this.state.xunit * 20));
        })

        points.map((x, i) => {
            x.map((n, ii) => {
                points[i][ii] = [normalizedDates[ii], ((this.state.yunit * 10) - (n * (this.state.yunit / 5)))];
            })
        })

        this.setState({
            points: points,
            dates: dates,
            normalizedDates: normalizedDates,
            gotData: true,
            vals: vals
        })
    }

    render() {
        let xunit = this.state.xunit;
        let yunit = this.state.yunit;
        console.log(this.state)
        console.log(this.props)
        return(
            <div className="card">
                <h2>Compliance Issues Over Time</h2>
                <div className="legendItem"><span className="tag a"></span>A</div>
                <div className="legendItem"><span className="tag aa"></span>AA</div>
                <div className="legendItem"><span className="tag aaa"></span>AAA</div>
                <div className="svgWrapper">
                    <svg className="complianceGraph" xmlns="http://www.w3.org/2000/svg" width={xunit * 22} height={yunit * 12} viewBox={"-" + (xunit * 1) + " 0 " + (xunit * 21) + " " + (yunit * 12)}>
                        <line x1="0" y1={(yunit * 10) - 1} x2={xunit * 20} y2={(yunit * 10) - 1} stroke="#AAA" />
                        <text className="dateText" x={xunit * -1} y={yunit * 10}>0</text>
                        <text className="dateText" x={xunit * -1} y={yunit * 8}>10</text>
                        <text className="dateText" x={xunit * -1} y={yunit * 6}>20</text>
                        <text className="dateText" x={xunit * -1} y={yunit * 4}>30</text>
                        <text className="dateText" x={xunit * -1} y={yunit * 2}>40</text>
                        <text className="dateText" x={xunit * -1} y="11">50</text>
                        <GraphLines data={this.props.data} vals={this.state.vals} xunit={xunit} yunit={yunit} points={this.state.points} normalizedDates={this.state.normalizedDates} dates={this.state.dates} />
                    </svg> 
                </div>
            </div>
        )
    }
}

export default ComplianceGraph;
