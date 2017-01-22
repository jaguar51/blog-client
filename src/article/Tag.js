import React from "react";

export default class Tag extends React.Component {

	constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div>
        		{this.props.items.map((item, index) =>
        			<li className="addedTag" key={index}>
        				<span>{item}</span>
        				<span className="tagRemove">x</span>
        			</li>
        		)}
        	</div>
    	);
    }

}