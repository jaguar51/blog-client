import React, {PropTypes} from "react";
import {FormGroup} from 'react-bootstrap';

class TagContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.tagList);
        this.state = {
            currentTag: '',
            tagList: this.props.tagList,
        };

        this.tagInputHandleChange = this.tagInputHandleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    tagInputHandleChange(event) {
        this.setState({
            currentTag: event.target.value
        });
    }

    removeTag(index) {
        let newTagList = this.state.tagList;
        newTagList.splice(index, 1);
        this.setState({
            tagList: newTagList
        });
        this.callbacks.onChange(newTagList);
    }

    handleKeyPress(event) {
        let tag = this.state.currentTag.trim();
        if (event.key == 'Enter' && tag !== '') {
            if (!this.state.tagList.includes(tag)) {
                this.setState((prevState) => {
                    let newTagList = prevState.tagList.concat(tag);
                    this.callbacks.onChange(newTagList);
                    return {
                        tagList: newTagList,
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

    get callbacks() {
        const props = this.props;

        return {
            onChange: function (val) {
                if (props.onChange != undefined) {
                    props.onChange(val);
                }
            }
        };
    }

    render() {
        return (
            <FormGroup className="tags-form">
                <label htmlFor="tag">Теги</label>
                <ul className="tags" id="tag">
                    {this.state.tagList.map((item, index) =>
                        <li className="addedTag" key={index}>
                            <span>{item}</span>
                            <span className="tagRemove" onClick={this.removeTag.bind(this, index)}>x</span>
                        </li>
                    )}
                    <li className="tagAdd">
                        <input type="text" onKeyPress={this.handleKeyPress} onChange={this.tagInputHandleChange} value={this.state.currentTag}/>
                    </li>
                </ul>
            </FormGroup>
        );
    }
}

TagContainer.propTypes = {
    onChange: PropTypes.func
};

export default TagContainer;
