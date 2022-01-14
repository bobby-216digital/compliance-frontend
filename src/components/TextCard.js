import React from "react";

class TextCard extends React.Component {
    render() {
        return(
            <div className="card">
                <p className="subText">
                    { this.props.subtext }
                </p>
                <p>
                    { this.props.text }
                </p>
            </div>
        )
    }
}

export default TextCard;