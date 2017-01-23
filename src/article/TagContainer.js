import React from "react";

export default class TagContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTag: '',
            tagList: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleChange(event) {
        this.setState({
            currentTag: event.target.value
        });
    }

    removeTag(index) {
        let array = this.state.tagList;
        array.splice(index, 1);
        this.setState({
            tagList: array
        });
    }

    handleKeyPress(event) {
        let tag = this.state.currentTag.trim();
        if (event.key == 'Enter' && tag !== '') {
            if (!this.state.tagList.includes(tag)) {
                this.setState((prevState, props) => {
                    return {
                        tagList: prevState.tagList.concat(tag),
                        currentTag: ''
                    }
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
                    {this.state.tagList.map((item, index) =>
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
