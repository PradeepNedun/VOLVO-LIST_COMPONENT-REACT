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
    renderList() {
        let filteredList = [];
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
                return <div>
                        <div className="list-teaser has-image">
                            <div className="news-item-metadata title-row">
                                <span className="news-item-category">
                                    <span className="category-color"></span>{news.nicategory}
                                </span>
                                <span className="news-item-date">{news.newsStartDate}</span>
                                <h3 className="news-item-title hidden-xs">
                                    <a href={news.newsArticlesPath + ".html"}>
                                        {news.title}
                                    </a>
                                </h3>
                            </div>
                            <div className="image-container">
                                <a href={news.newsArticlesPath + ".html"}>
                                    <img title="Alt-Text" alt="Alt-Text" 
                                    src={news.niimagepath}
                                    className="img-responsive" 
                                    srcset={news.niimagepath}
                                    data-srcset={news.niimagepath} />
                                </a>
                            </div>
                            <div className="news-item-content">
                                <h3 className="news-item-title visible-xs">
                                    <a href={news.newsArticlesPath + ".html"}>
                                        {news.title}
                                    </a>
                                </h3>
                                <p className="news-item-excerpt">{news.niarticleintro}</p>
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
                        <Pagination id={this.props.id} query={this.props.listResponse[this.props.id].query}
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