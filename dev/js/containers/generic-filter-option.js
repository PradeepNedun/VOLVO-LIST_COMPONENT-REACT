import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import fontawesome from '@fortawesome/fontawesome';
import ReactDOM from "react-dom";
import {setSelectedFilter, setSelectedOption} from '../actions/index';

class GenericFilterOption extends Component {
	constructor(props) {
        super(props);
        this.state = {
            defaultOption: this.props.defaultOption,
            selectedVal: false,
            size: ''
        };
    }
    selectedOption(e) {
        e.preventDefault();
        e.stopPropagation();
        let obj = {},
            val = e.target.value,
            flag = false;
        if(e.target.parentNode.querySelector('.default')) {
            e.target.parentNode.querySelector('.default').className = '';
        }
        this.setState({
            defaultOption: e.target.innerHTML
        })
        obj = {
            id: this.props.id,
            [this.props.type]: val
        };
        if(window.innerWidth >= 767) {
            this.props.setSelectedOption(obj);
        }
        else {
            this.props.applyClick(obj, this.props.scope);
        }
        this.props.setSelectedFilter(this.props.count, this.props.id, false);
    }
    createOption(self) {
        let element = self.props.optionArray;
        return Object.keys(element).map(function(keys) {
            let temp = element[keys];
            return <option value={keys} onClick={self.selectedOption.bind(self)}>{temp}</option>;
        });
        this.props.setSelectedFilter(this.props.count, this.props.id, this.props.selectedFilter.show);
    }
    activateHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.props.count !== this.props.selectedFilter.count) {
            this.props.setSelectedFilter(this.props.count, this.props.id, true);
        } else {
            this.props.setSelectedFilter(this.props.count, this.props.id, !this.props.selectedFilter.show);
        }
    }
    getSize() {
        // +1 added for the default option
        let element = this.props.optionArray,
            size = Object.keys(element).length + 1;
        if( size > 10) {
            size = 10;
        }
        return size;
    }
    addScroll(size) {
        if( size >= 10) {
            return 'scroll';
        } else {
            return '';
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // to hide all the select
       if(nextProps) {
            this.setState({
                selectedVal: false
            });
        }
        return true;
    }
    renderList() {
        let size = this.getSize(),
            scroll = this.addScroll(size),
            expanded = false;
        if(this.props.selectedFilter.id !== null) {
            if(this.props.selectedFilter.id === this.props.id && 
                this.props.selectedFilter.count === this.props.count && this.props.selectedFilter.show) {
                expanded = true;
            } 
        }
        return <div className="generic-filter-option">
            <div className="option-select" onClick={this.activateHandler.bind(this)}>{this.state.defaultOption}</div>  
            <select size={size} className={expanded ? 'shown ' + scroll: 'hidden ' + scroll}>
            <option className="default" value='' onClick={this.selectedOption.bind(this)}>{this.props.defaultOption}</option>
            {this.createOption(this)}
            </select>
        </div>
    }
    render() {
        return(<div> {this.renderList()} </div>)
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        selectedFilter: state.selectedFilter,
        selectedOption: state.selectedOption
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectedDropdown
function matchDispatchToProps(dispatch){
    return bindActionCreators({setSelectedFilter: setSelectedFilter, setSelectedOption: setSelectedOption}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(GenericFilterOption);