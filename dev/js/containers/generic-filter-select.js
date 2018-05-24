import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactDOM from "react-dom";
import GenericFilterOption from './generic-filter-option';

class GenericFilterSelect extends Component {
	constructor() {
        super();
    }	
    renderList() {
        let element = this.props.selectArray,
            applyClick = this.props.applyClick,
            defaultLabel,
            arr = [],
            id = this.props.id,
            scope = this.props.scope;
        return Object.keys(element).map(function(key, index) {
            defaultLabel = 'All ' + key.charAt(0).toUpperCase() + key.slice(1);
            if(Object.keys(element[key]).length !== 0) {
                return <div className="filter-select-wrapper">
                <GenericFilterOption applyClick={applyClick} scope={scope} id={id} count={index} type={key} defaultOption={defaultLabel} optionArray={element[key]}/>
                </div>
            }
        });
    }
    render() {
        return (
            <div className="generic-filter-select">
                {this.renderList()}
            </div>
        )
    }

}

export default GenericFilterSelect;