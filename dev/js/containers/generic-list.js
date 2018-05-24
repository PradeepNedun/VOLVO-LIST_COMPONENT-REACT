import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {itemsListFetchData} from '../actions/index';
import EventList from './event-list';
import NewsList from './news-list';

class GenericList extends Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(this.props.id !== undefined) {
            this.props.fetchListData(this.props.requestListObject, this.props.id);
        }
    }
   
    fetchListDataOnFilterChange() {
        let reqObj = this.props.requestListObject, flag = false;
        if(Object.keys(this.props.selectedOption).length > 0 && this.props.id) {
            this.props.selectedOption.map( element => {
                if(element.id === this.props.id) {
                    if(element.hasOwnProperty('categories')) {
                        reqObj.category = "'"+element['categories']+"'";    
                        if(element['categories'] == ""){
                            reqObj.category = '';
                        }            
                    }
                    if(element.hasOwnProperty('topics')) {
                        reqObj.topics = "'"+element['topics']+"'";   
                        if(element['topics'] == ""){
                            reqObj.topics = '';
                        }              
                    }
                    if(element.hasOwnProperty('years')) {
                        reqObj.year = "'"+element['years']+"'";  
                        if(element['years'] == ""){
                            reqObj.year = '';
                        }                
                    }
                    if(element.hasOwnProperty('segments')) {
                        reqObj.segments = "'"+element['segments']+"'"; 
                        if(element['segments'] == ""){
                            reqObj.segments = '';
                        }                 
                    }
                    flag = true;
                }
            });
            if(flag)
            this.props.fetchListData(reqObj, this.props.id);
        }
    }
    render() {
        if(this.props.requestListObject) {
            if(this.props.requestListObject.type === 'EVENTS') {
                this.fetchListDataOnFilterChange();
                return (
                    <div>
                        <EventList id={this.props.id} recordsPerPage={10} reqObj={this.props.requestListObject}/>
                    </div>
                );
            } if(this.props.requestListObject.type === 'NEWS') {
                this.fetchListDataOnFilterChange();
                return (
                    <div>
                        <NewsList id={this.props.id} recordsPerPage={10} reqObj={this.props.requestListObject}/>
                    </div>
                );
             } else {
                return;
            }
        } else {
            return;
        }
    }

}

function mapStateToProps(state) {
    return {
        selectedOption: state.selectedOption
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectedDropdown
function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchListData: (reqObj, id) => itemsListFetchData(reqObj, id)}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(GenericList);