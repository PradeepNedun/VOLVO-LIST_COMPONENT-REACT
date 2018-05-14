import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import fontawesome from '@fortawesome/fontawesome';
import ReactDOM from "react-dom";
import GenericFilterSelect from './generic-filter-select';

class GenericFilter extends Component {
	constructor() {
        super();
        this.state = {
            showHideFilter: true
		};
	}	
    hideAllselect(e) {
        e.preventDefault();
        let select = e.target.parentNode.parentNode.children[0].querySelectorAll('select.shown');
        select.forEach((item)=>{
            item.className = 'hidden';
        });
    }
    renderList() {
        return this.props.filters.queryResult.map(element => {
            return <GenericFilterSelect selectArray={element} />;
        });
    }
    toggleFilter() {
        this.setState({
            showHideFilter: !this.state.showHideFilter
        });
    }
    render() {
        let expanded = this.state.showHideFilter;
        return (
            <div className={"generic-filter " + (expanded? 'shown': 'hidden')}  onClick={this.hideAllselect.bind(this)}>
                <div className="filter-refine-wrapper" onClick={this.toggleFilter.bind(this)}>
                    <a className="btn-refine" data-toggle="collapse" aria-expanded="true">
                        <span className="refine">Refine</span>
                    </a>
                </div>
                <SmoothCollapse expanded={expanded}>
                    {this.renderList()}
                </SmoothCollapse>
            </div>
        );
    }

}
// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        filters: state.filters
    };
}


// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps)(GenericFilter);