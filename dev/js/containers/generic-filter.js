import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class GenericFilter extends Component {
    
    createOption(element) {
        return Object.keys(element).map(function(keys) {
            let temp = element[keys];
            return <option value={keys}>{temp}</option>;
        });
    }
    createSelect(self, element) {
        return Object.keys(element).map(function(key, index) {
            let temp = self.createOption(element[key]);
            return <div className="select-wrapper"><h1>{Object.keys(element)[index]}</h1><select>{temp}</select></div>;
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
        return (
            <div className="filter-container">
                {this.renderList()}
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