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


const requestEventFilterObjectMock = {
    "url": "http://34.242.112.31:3030/volvo-news-service/news/fetch?&callbackFnName=eventsfilterFunc",
    "pType": "EVENTS",
    "eventType": "upcoming",
    "sp_t": "filters",
    "category": "",
    "topics": "",
    "year": "",
    "pType": "EVENTS",
    "sp_t": "eventarticles",
    "sitePath": "vp-uat-swe-mar-sv-se",
    "sourcePath": "%2Fcontent%2Fvolvo%2Fvolvo-penta%2Fsweden%2Fmarineleisure%2Fsv-se%2Fhome%2Fevents%2F2017%2C%2Fcontent%2Fvolvo%2Fvolvo-penta%2Fsweden%2Fmarinecommercial%2Fsv-se%2Fhome%2Fevents%2F2017",
    "sortingOrder": "PUBLISH_DATE",
    "recPerPage": 60,
    "pageNumber": 1,
    "icalendarUrl": ""
};

const requestNewsFilterObjectMock = {
    "url": "http://34.242.112.31:3030/volvo-news-service/news/fetch?&callbackFnName=newsfilterFunc6",
    "pType": "NEWS",
    "eventType": "upcoming",
    "sp_t": "filters",
    "category": "",
    "topics": "",
    "year": "",
    "segments": "",
    "pType": "NEWS",
    "sp_t": "eventarticles",
    "sitePath": "vb-uat-mar-glo-en-gb",
    "sourcePath": "",
    "sortingOrder": "PUBLISH_DATE",
    "recPerPage": 60,
    "pageNumber": 1,
    "segmentFilter": false
};

const requestEventListObjectMock = {
    "url": "http://34.242.112.31:3030/volvo-news-service/news/search?&callbackFnName=eventFunc",
    "type": "EVENTS",
    "eventType": "upcoming",
    "category": "",
    "topics": "",
    "year": "",
    "pType": "EVENTS",
    "sp_t": "eventarticles",
    "sitePath": "vp-uat-swe-mar-sv-se",
    "sourcePath": "%2Fcontent%2Fvolvo%2Fvolvo-penta%2Fsweden%2Fmarineleisure%2Fsv-se%2Fhome%2Fevents%2F2017%2C%2Fcontent%2Fvolvo%2Fvolvo-penta%2Fsweden%2Fmarinecommercial%2Fsv-se%2Fhome%2Fevents%2F2017",
    "sortingOrder": "PUBLISH_DATE",
    "recPerPage": 60,
    "pageNumber": 1,
    "icalendarUrl": "http%3A%2F%2F34.242.112.31%3A3030%2Ficalendar-service%2Ficalendar%2Ficalendarservice"
};

const requestNewsListObjectMock = {
    "url": "http://34.242.112.31:3030/volvo-news-service/news/search?&callbackFnName=newsFunc6",
    "type": "NEWS",
    "eventType": "upcoming",
    "category": "",
    "topics": "",
    "year": "",
    "segments": "",
    "pType": "NEWS",
    "sp_t": "newsarticles6",
    "sitePath": "vb-uat-mar-glo-en-gb",
    "sourcePath": "",
    "sortingOrder": "PUBLISH_DATE",
    "recPerPage": 60,
    "pageNumber": 1,
    "segmentFilter": false
};
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
            <GenericFilter id="1" requestFilterObject= {requestEventFilterObjectMock}/>
            <br/>
            <br/>
            <GenericFilter id="2" requestFilterObject= {requestNewsFilterObjectMock}/>
            <br/>
            <br/>
            <h2>List</h2>
            <GenericList id="1" requestListObject= {requestEventListObjectMock}/>
            <br/>
            <br/>
            <GenericList id="2" requestListObject= {requestNewsListObjectMock}/>
            </div>
        );
    }

}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default GenericFilterListContainer;