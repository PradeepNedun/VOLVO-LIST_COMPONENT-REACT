import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class GenericFilter extends Component {
    renderList() {
        return this.props.filters.query.map((filter) => {
            return  this.props.filters.queryResult.map((item) => {
                return (
                    <li></li>
                )
            });
        });
    }
    render() {
        return (
            <div>Filter
                <ul>
                    {this.renderList()}
                </ul>
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