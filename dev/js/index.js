import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import GenericFilterListContainer from './containers/generic-filter-list-container';
require('../scss/style.scss');
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
window.reactComponents = [
    {   
        "id": "123",
        "i18Labels": {        
            "refineLabel": "Refine",
            "resultsLabel": "Result(s)",
            "pageLabel": "Page",
            "ofLabel": "Of",
            "noResultsLabel": "No Result(s)"
        },
        "filterExpanded": true,
        "displaydownloadurl": true,
        "isAuthor": false,
        "recordsPerPage": 10,
        "browserLocale": "sv-se",
        "filterReqObj" : {
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
        },
        "listReqObj" : {
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
        }
    },
    {   
        "id": "456",
        "i18Labels": {        
            "refineLabel": "Refine",
            "resultsLabel": "Result(s)",
            "pageLabel": "Page",
            "ofLabel": "Of",
            "noResultsLabel": "No Result(s)"
        },
        "filterExpanded": true,
        "recordsPerPage": 10,
        "filterReqObj" : {
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
        },
        "listReqObj" : {
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
        }
    }
];

window.reactComponents.forEach(element => {
    if(Object.keys(element).length > 0) {
        ReactDOM.render(
            <Provider store={store}>
                    <GenericFilterListContainer id={element.id} i18Labels={element.i18Labels} recordsPerPage={element.recordsPerPage} 
                    filterReqObj={element.filterReqObj} listReqObj={element.listReqObj} filterExpanded={element.filterExpanded}/>
            </Provider>,
            document.getElementById(element.id)
        );
    }
});

