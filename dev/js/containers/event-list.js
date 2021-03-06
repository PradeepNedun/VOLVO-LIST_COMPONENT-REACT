import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Pagination from './pagination';

class EventList extends Component {
	constructor(props) {
        super(props);
    }
    getMaxPageCount() {
        return Math.ceil(this.props.listResponse[this.props.id].query[0].totalresults / this.props.recordsPerPage);
    }
    getCurrentResultsBasedOnPagination(currentPage) {
        let filteredList = [], startIndex, endIndex;
        if(currentPage.page) {
            if(currentPage.page === 1) {
                startIndex = 0;
                endIndex = this.props.recordsPerPage;
                if(this.props.listResponse[this.props.id].query[0].upperresults < endIndex)
                endIndex = this.props.listResponse[this.props.id].query[0].upperresults;
            } if(this.getMaxPageCount() === currentPage.page) {
                endIndex = this.props.listResponse[this.props.id].query[0].totalresults;
                startIndex = Math.ceil(endIndex / this.props.recordsPerPage) - 1;
                startIndex = startIndex * this.props.recordsPerPage;
                if (startIndex === endIndex) startIndex = endIndex - this.props.recordsPerPage;
            } else {
                startIndex = (currentPage.page - 1) * this.props.recordsPerPage;
                endIndex = startIndex + this.props.recordsPerPage;
                if(this.props.listResponse[this.props.id].query[0].upperresults < endIndex)
                endIndex = this.props.listResponse[this.props.id].query[0].upperresults;
            }
            filteredList = this.props.listResponse[this.props.id].eventsQueryResult.slice(startIndex, endIndex);
        }
        return filteredList;
    }
    getEventArticleIntro(eaarticleintro) {
        let excerptLimit = 190;
        if (eaarticleintro > excerptLimit) {
            eaarticleintro = eaarticleintro.substring(0, excerptLimit) + " ...";
        }
        return eaarticleintro;
    }
    getLastword(title) {
        let n = title.split(" ");
        return n[n.length - 1];
    }
    getStyle(eacategorycolor) {
        return {backgroundColor: eacategorycolor};
    }
    getdisplaydownloadurl(event) {
        if (this.props.reqObj.displaydownloadurl === true && event.downloadlinklabels !== "") {
            return <li className="col-xs-4">
                <a download className="addtocalendar" href={event.downloadlinks.split(",")} target="_blank">
                    <i className="fa fa-download"></i>
                    {event.downloadlinklabels.split(",")}
                    <span> {event.downloadlinkformat.split(",").toUpperCase()} </span>
                    {event.downloadlinkssize.split(",")}
                </a>
            </li>
        }
        return ;
    }
    getCalendarMarkup(calendar, event) {
        let flag = 0;
        if (calendar !== "") {
            return <div>
                <ul className="list-unstyled event-item-download">
                    <li className="col-xs-4">
                        <a className="addtocalendar" href={event.calendar} target="_blank" x-cq-linkchecker='skip'>
                            <i className="fa fa-plus-circle"></i>Add to calendar
                        </a>
                    </li>
                    {this.getdisplaydownloadurl(event)}
                </ul>
                <p className="visible-xs">
                <a className="addtocalendar" href={event.calendar} target="_blank">
                            <i className="fa fa-plus-circle"></i>Add to calendar
                        </a>
                </p>
            </div>;
        }
        return ;
    }
    getImageSrc(eaimagepath, event) {
        let extensionSeparator, extension, renditionName = "newslist", lastSlash, imageName, finalImagePath;
        if (eaimagepath !== "") {
            extensionSeparator = eaimagepath.lastIndexOf(".");
            extension = eaimagepath.substring(extensionSeparator + 1);
            if (eaimagepath.indexOf("/") > -1) {
                lastSlash = eaimagepath.lastIndexOf("/");
                imageName = eaimagepath.substring(lastSlash + 1, extensionSeparator);
            }
            if (event.newsListRenditionFlag === "Y") {
                finalImagePath = eaimagepath + "/jcr:content/renditions/" + imageName + "-" + renditionName + "." + extension;
            } else {
                finalImagePath = eaimagepath;
            }
            return finalImagePath;
        }
        return ;
    }
    renderList() {
        let filteredList = [], title, hasImage = "";
        if(this.props.listResponse[this.props.id] !== undefined && this.props.listResponse[this.props.id].hasOwnProperty('eventsQueryResult')) {
            if(this.props.currentPage.length > 0) {
                this.props.currentPage.forEach(element => {
                    if(element.id === this.props.id) {
                        filteredList = this.getCurrentResultsBasedOnPagination(element);
                    }
                });
            }
            if(filteredList.length === 0) {
                filteredList = this.props.listResponse[this.props.id].eventsQueryResult;
            }
            return filteredList.map((event)=>{
                if(this.props.reqObj.isAuthor) {
                    title = event.eaheading;
                } else {
                    title = event.title;
                }
                if(event.eaimagepath != "") {
                    hasImage = "hasImage";
                }
                return <div>
                        <div className={"list-teaser " + hasImage}>
                            <div className="event-item-metadata titleRow">
                                <span className="event-item-category">
                                    <span style={this.getStyle(event.eacategorycolor)} className="category-color"></span>
                                    {event.eacategory}
                                </span>
                                <span className="event-item-date">{event.eastartdate + " " + event.location + " "+ event.country}</span>
                                <h3 className="event-item-title hidden-xs">
                                    <a href={event.url} target="_blank">
                                        {title.substring(0, title.lastIndexOf(" "))}
                                        <span className="lastword"> {this.getLastword(title)}</span>
                                    </a>
                                </h3>
                            </div>
                            <div className={"image-container " + hasImage}>
                                <a href={event.eventArticlesPath} target="_blank">
                                    <img title={event.eaalttext} alt={event.eaalttext} 
                                    src={this.getImageSrc(event.eaimagepath, event)} className="img-responsive"/>
                                </a>
                            </div>
                            <div className="event-item-content">
                                <h3 className="event-item-title visible-xs">
                                    <a href={event.url} target="_blank">
                                        {title.substring(0, title.lastIndexOf(" "))}
                                    </a>
                                </h3>
                                <p className="event-item-excerpt">{this.getEventArticleIntro(event.eaarticleintro)}</p>
                                {this.getCalendarMarkup(event.calendar, event)}
                            </div>
                        </div>
                </div>
            });
        }
    }
    renderPagination() {
        if(this.props.listResponse[this.props.id] !== undefined) {
            if(this.props.listResponse[this.props.id].length !== 0) {
                return <div>
                        <Pagination i18Labels={this.props.i18Labels} id={this.props.id} query={this.props.listResponse[this.props.id].query}
                        recordsPerPage={this.props.recordsPerPage} reqObj={this.props.reqObj} />
                    </div>
            }
        }
    }
    render() {
        return (
            <div className="event-list">
                {this.renderPagination()}
                <div className="event-item-list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        listResponse: state.listResponse,
        currentPage: state.currentPage
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectedDropdown
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(EventList);