import React from "react";

export default class TagContainer extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            currentTag: '',
            tags: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.existingTag = this.existingTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleChange(event) {
        this.setState({
            currentTag: event.target.value
        });
    }

    removeTag(index) {
        var array = this.state.tags;
        array.splice(index, 1);
        this.setState({tags: array });
    }

    existingTag(tag) {
        for(var i = 0; i < this.state.tags.length; i++) {
            if (this.state.tags[i] == tag) {
                return true;
            }
        }
        return false;
    }

    handleKeyPress(event) {
        if((event.key == 'Enter') && (this.state.currentTag != '')){
            if (!this.existingTag(this.state.currentTag.trim())) {
                this.setState({
                    tags: this.state.tags.concat([this.state.currentTag.trim()]),
                    currentTag: ''
                })
            } else {
                this.setState({
                    currentTag: ''
                })
            }
        }
    }

    render() {
        return (
            <div className="form-group tags-form"> 
                <label htmlFor="tag">Теги</label> 
                    <ul className="tags" id="tag"> 
                        {this.state.tags.map((item, index) =>
                            <li className="addedTag" key={index}>
                                <span>{item}</span>
                                <span className="tagRemove" onClick={this.removeTag.bind(this, index)}>x</span>
                            </li>
                        )}
                        <li className="tagAdd"> 
                            <input type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.currentTag}/> 
                        </li> 
                    </ul> 
            </div>
    	);
    }

}