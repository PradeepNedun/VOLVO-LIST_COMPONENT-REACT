import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import ReactDOM from "react-dom";
import GenericFilterSelect from './generic-filter-select';
import {fetchFilter} from '../actions/index';
import {itemsFilterFetchData} from '../actions/index';
import {toggleRefineBtn} from '../actions/index';
import {hideSelect} from '../actions/index';
import {setSelectedFilter, setSelectedOption} from '../actions/index';

class GenericFilter extends Component {
	constructor() {
        super();
        this.state = {
            option: {}
        };
    }	
    componentDidMount() {
        if(this.props.id !== undefined) {
            this.props.fetchFilterData(this.props.requestFilterObject, this.props.id);
        }
    }
    hideAllselect(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.props.selectedFilter.show) {
            this.props.setSelectedFilter(this.props.selectedFilter.selectedFilter, this.props.id);
        }
        this.props.hideSelect();
    }
    renderList() {
        let self =this;
        if(this.props.filters[this.props.id] !== undefined) {
            if(Object.keys(this.props.filters[this.props.id]).length !== 0) {     
                //sort the element based on the filter response
                this.props.filters[this.props.id].queryResult[0] = Object.keys(this.props.filters[this.props.id].queryResult[0]).sort().reduce((r, k) => (r[k] = this.props.filters[this.props.id].queryResult[0][k], r), {});
                return this.props.filters[this.props.id].queryResult.map(element => {
                    Object.keys(element).forEach((item)=>{
                        //below condition to remove the select if its options are empty ex:segment
                        if(Object.keys(element[item]).length == 0) {
                            delete element[item];
                        }
                        //below condition to remove the years if its upcoming event
                        if(this.props.requestFilterObject.pType === 'EVENTS' && this.props.requestFilterObject.eventType === 'upcoming' && item == 'years') {
                            delete element[item];
                        }
                    })
                    return <GenericFilterSelect scope={self} applyClick={this.applyClickHandler} id={this.props.id} selectArray={element}/>;
                });
            }
        }
    }
    toggleFilter(e) {
        e.stopPropagation();
        e.preventDefault();
        if(this.props.selectedFilter.show) {
            this.props.setSelectedFilter(this.props.selectedFilter.selectedFilter);
        }
        this.props.toggleRefineBtn(this.props.id);
    }
    applyClickHandler(obj, scope) {
        scope.setState({
            option: obj
        });
    }
    triggerApplyClick() {
        if(Object.keys(this.state.option).length > 0) {
            this.props.setSelectedOption(this.state.option);
        }
    }
    render() {  
        let expanded;
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        if((this.props.id === this.props.toggleFilterOnRefineClick.id)) {
            expanded = this.props.toggleFilterOnRefineClick.toggleRefineBtn;
        } else{
            expanded = true;
        }
        
        if(Object.keys(this.props.i18Labels).length > 0) {
            return (
                <div className={"generic-filter " + (expanded? 'shown': 'hidden')}  onClick={this.hideAllselect.bind(this)}>
                    <div className="filter-refine-wrapper" onClick={this.toggleFilter.bind(this)}>
                        <a className="btn-refine" data-toggle="collapse" aria-expanded="true">
                            <span className="refine">{this.props.i18Labels.refineLabel}</span>
                        </a>
                    </div>
                    <SmoothCollapse expanded={expanded}>
                        {this.renderList()}
                        <div className="apply-btn">
                            <div className="filter-apply-btn">
                                <button className="visible-xs btn btn-primary btn-sm" onClick={this.triggerApplyClick.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </SmoothCollapse>
                </div>
            );
        }
    }

}
// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        filters: state.filterResponse,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        toggleFilterOnRefineClick: state.toggleRefineBtn,
        selectedFilter: state.selectedFilter
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectedDropdown
function matchDispatchToProps(dispatch) {
    return bindActionCreators({fetchFilterData: (reqObj, id) => itemsFilterFetchData(reqObj, id), 
        toggleRefineBtn: toggleRefineBtn, hideSelect: hideSelect, setSelectedFilter: setSelectedFilter,
        setSelectedOption: setSelectedOption}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(GenericFilter);