import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Pagination from './pagination';

class NewsList extends Component {
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
            filteredList = this.props.listResponse[this.props.id].queryResult.slice(startIndex, endIndex);
        }
        return filteredList;
    }
    getStyle(nicategorycolor) {
        return {backgroundColor: nicategorycolor};
    }
    getLastword(title) {
        let n = title.split(" ");
        return n[n.length - 1];
    } 
    limitCharacters(text) {
        let excerptLimit = 190;
        if (text && text.length > excerptLimit && text.indexOf(" ", excerptLimit) !== -1) {
            text = text.substring(0, text.indexOf(" ", excerptLimit)) + " ...";
        }
        return text || "";
    }
    getStartPublishDate(news, browserLocale) {
        if(this.props.reqObj.isAuthor) {
           return news.nistartpublishdate;
        }
        var formatDate = "";
        var publish_date = news.startPublishDate.replace(/-/g, "/").split(".");
        var offset_value = news.timezone;
        offset_value = offset_value.split(":");
        var min_one = offset_value[0] * 60;
        offset_value = min_one + +offset_value[1];
        var new_publish_date = new Date(publish_date[0]);
        new_publish_date.setMinutes(new_publish_date.getMinutes() + offset_value);
        var month = new_publish_date.getMonth() + 1;
        var new_date = new_publish_date.getFullYear() + "/" + month + "/" + new_publish_date.getDate();
        var publishDate = new_date,
            pYear, pMonth, pDay, downloadText = "download";
        pYear = publishDate.split("/")[0];
        pMonth = publishDate.split("/")[1];
        pDay = publishDate.split("/")[2];
        if (this.props.reqObj.browserLocale) {
            formatDate = new Date(pYear, pMonth - 1, pDay).toLocaleDateString([this.props.reqObj.browserLocale, "en"]);
        }
        return formatDate;
    }
    getImageSrc(niimagepath, news) {
        let extensionSeparator, extension, renditionName = "newslist", lastSlash, imageName, finalImagePath;
        if (niimagepath !== "") {
            extensionSeparator = niimagepath.lastIndexOf(".");
            extension = niimagepath.substring(extensionSeparator + 1);
            if (niimagepath.indexOf("/") > -1) {
                lastSlash = niimagepath.lastIndexOf("/");
                imageName = niimagepath.substring(lastSlash + 1, extensionSeparator);
            }
            if (event.newsListRenditionFlag === "Y") {
                finalImagePath = niimagepath + "/jcr:content/renditions/" + imageName + "-" + renditionName + "." + extension;
            } else {
                finalImagePath = niimagepath;
            }
            return finalImagePath;
        }
        return ;
    }
    getVideo(news) {
        if(news.mediaType === "Video") {
            return <div>
                <div className='image-container'>
                    <img title={news.nialttext} alt={news.nialttext} 
                    src='" + finalImagePath + "' className='img-responsive' />
                    <a href='#' className='cta-video js-video-modal-trigger' data-toggle='modal' 
                    data-video-src={news.videourl} data-target='#modal-" + videoRandomNumber + "'>
                        <i className='fa fa-play-circle'></i>
                    </a>
                </div>
                <div className='modal-dialog default'>
                    <div className='modal-content'>
                        <button data-dismiss='modal' className='btn-close' type='button'>
                            <i className='fa fa-close'></i>
                            <span className='sr-only'>Close</span>
                        </button>
                        <div className='modal-body'>
                            <div className='poster-image embed-responsive embed-responsive-16by9'>
                            </div>
                        </div>
                        <div className='modal-footer'>
                        </div>
                    </div>
                </div>
            </div>;
        }
        return ;                      
    }
    renderList() {
        let filteredList = [], title, hasImage = "";
        if(this.props.listResponse[this.props.id] !== undefined && this.props.listResponse[this.props.id].hasOwnProperty('queryResult')) {
            if(this.props.currentPage.length > 0) {
                this.props.currentPage.forEach(element => {
                    if(element.id === this.props.id) {
                        filteredList = this.getCurrentResultsBasedOnPagination(element);
                    }
                });
            }
            if(filteredList.length === 0) {
                filteredList = this.props.listResponse[this.props.id].queryResult;
            }
            return filteredList.map((news)=>{
                if(this.props.reqObj.isAuthor) {
                    title = news.eaheading;
                } else {
                    title = news.title;
                }
                if(news.niimagepath != "") {
                    hasImage = "has-image";
                }
                if(news.mediaType == "Video") {
                    hasImage == "has-video";
                }
                return <div>
                    <div className="list-teaser has-image">
                        <div className="news-item-metadata title-row">
                            <span className="news-item-category">
                                <span style={this.getStyle(news.nicategorycolor)}  className="category-color"></span>
                                {news.nicategory}
                            </span>
                            <span className="news-item-date">{this.getStartPublishDate(news)}</span>
                            <h3 className="news-item-title hidden-xs">
                                <a href={news.newsArticlesPath + ".html"}>
                                    {title.substring(0, title.lastIndexOf(" "))}
                                    <span className="lastword"> {this.getLastword(title)}</span>
                                </a>
                            </h3>
                        </div>
                        <div className={"image-container " + hasImage}>
                            <a href={news.newsArticlesPath + ".html"}>
                                <img title={news.nialttext} alt={news.nialttext}
                                src={this.getImageSrc(news.niimagepath, news)} className="img-responsive" 
                                srcSet={this.getImageSrc(news.niimagepath, news)} />
                            </a>
                        </div>
                        {this.getVideo(news)}
                        <div className="news-item-content">
                            <h3 className="news-item-title visible-xs">
                                <a href={news.newsArticlesPath + ".html"}>
                                    {title}
                                </a>
                            </h3>
                            <p className="news-item-excerpt">{this.limitCharacters(news.niarticleintro)}</p>
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
                        recordsPerPage={10} reqObj={this.props.reqObj} />
                    </div>
            }
        }
    }
    render() {

        return (
            <div className="news-list">
                {this.renderPagination()}
                <div className="news-item-list">
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
export default connect(mapStateToProps, matchDispatchToProps)(NewsList);