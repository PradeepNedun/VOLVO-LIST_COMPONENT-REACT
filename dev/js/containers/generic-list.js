import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GenericFilter from '../containers/generic-filter';

class GenericList extends Component {

    renderList() {
        return "<div>Generic List</div>";
    }

    render() {
        return (
            <div>list<GenericFilter/></div>
        );
    }

}
export default GenericList;