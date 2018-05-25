import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import fontawesome from '@fortawesome/fontawesome';
import ReactDOM from "react-dom";
import GenericFilterSelect from './generic-filter-select';
import {fetchFilter} from '../actions/index';
import {itemsFilterFetchData} from '../actions/index';
import {toggleRefineBtn} from '../actions/index';
import {hideSelect} from '../actions/index';
import GenericList from '../containers/generic-list';
import GenericFilter from '../containers/generic-filter';

class GenericFilterListContainer extends Component {
	constructor() {
        super();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        let self = this;
        return (
            <div className="container">
            <h2>Filter</h2>
            <GenericFilter id={this.props.id} i18Labels={this.props.i18Labels} requestFilterObject= {this.props.filterReqObj}/>
            <h2>List</h2>
            <GenericList id={this.props.id} i18Labels={this.props.i18Labels} recordsPerPage={this.props.recordsPerPage} 
            requestListObject= {this.props.listReqObj}/>
            </div>
        );
    }

}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default GenericFilterListContainer;