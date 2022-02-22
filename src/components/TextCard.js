import React from "react";

class TextCard extends React.Component {
    render() {
        return(
            <div className="card textCard">
                <p className="subText">
                    <strong>{ this.props.subtext }</strong>
                </p>
                <p>
                    { this.props.text }
                </p>
            </div>
        )
    }
}

export default TextCard;