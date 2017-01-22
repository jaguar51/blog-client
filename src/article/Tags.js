import React from "react";
import Tag from "./Tag";

export default class Tags extends React.Component {

	constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove(index) {
        this.props.remove(index);
    }

    render() {
        return (
        	<div>
                {this.props.items.map((item, index) =>
                    <li className="addedTag" key={index}>
                        <span>{item}</span>
                        <span className="tagRemove" onClick={this.remove.bind(this, index)}>x</span>
                    </li>
                )}
        	</div>
    	);
    }

}