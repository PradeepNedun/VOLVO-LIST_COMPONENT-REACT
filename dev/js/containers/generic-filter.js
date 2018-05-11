import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';

class GenericFilter extends Component {
	constructor() {
		super();
		this.state = {
			shown: true,
		};
	}	
	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
    createOption(element) {
        return Object.keys(element).map(function(keys) {
            let temp = element[keys];
            return <option value={keys}>{temp}</option>;
        });
    }
    createSelect(self, element) {
        return Object.keys(element).map(function(key, index) {
            let temp = self.createOption(element[key]);
            if(temp.length !== 0) {
                return <div className="filter-select-wrapper"><select>{temp}</select></div>;
            }
        });
    }
    renderList() {
        return this.props.filters.queryResult.map(element => {
            let self = this;
            let temp = this.createSelect(self, element);
            return temp;
        });
    }
    render() {
        var expanded = this.state.shown ? true : false;
        return (
            <div className={"filter-container " + (expanded ? 'show' : 'hidden')} >
                <div className="filter-refine-wrapper" onClick={this.toggle.bind(this)}>
                    <a className="btn-refine" data-toggle="collapse" aria-expanded="true">
                        <span>Refine</span>
                    </a>
                </div>
                <SmoothCollapse expanded={expanded}>
                    <div className="filter-dropdowns-wrapper">
                        {this.renderList()}
                    </div>
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