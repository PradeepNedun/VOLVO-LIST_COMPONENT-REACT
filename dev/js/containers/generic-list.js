import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class GenericList extends Component {

    renderList() {
        return "<div>Generic List</div>";
    }

    render() {
        return (
            <div>list</div>
        );
    }

}
export default GenericList;