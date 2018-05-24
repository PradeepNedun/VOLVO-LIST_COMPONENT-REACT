import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setPaginationCurrentPage} from '../actions/index';
import {itemsListFetchData} from '../actions/index';

class Pagination extends Component {
	constructor(props) {
        super(props);
    }
    getMaxPageCount() {
        return Math.ceil(this.props.query[0].totalresults / this.props.recordsPerPage);
    }
    componentDidMount() {
        this.props.setPaginationCurrentPage(this.props.id , 'ONLOAD');
    }
    componentWillReceiveProps (newProps) {
        if( newProps.selectedOption !== this.props.selectedOption )
          this.props.setPaginationCurrentPage(this.props.id , 'ONLOAD');
    }
    updateCurrentPage(e) {
        let obj = {};
        this.props.currentPage.forEach(element => {
            if(element.id === this.props.id) {
                obj = element;
            }
        });
        if(e.target.dataset.type === 'PREV') {
            if(obj.page >= 1) {
                this.props.setPaginationCurrentPage(this.props.id , e.target.dataset.type, this.getMaxPageCount());  
            } else {
                this.props.setPaginationCurrentPage(this.props.id , 'PAGENUMBER');
                this.props.reqObj.pageNumber = obj.ajaxCount;
                this.props.fetchListData(this.props.reqObj, this.props.id);
            }
        }
        if(e.target.dataset.type === 'NEXT') {
            if(obj.page <= this.getMaxPageCount()) {
                this.props.setPaginationCurrentPage(this.props.id , e.target.dataset.type, this.getMaxPageCount());  
            } else {
                this.props.setPaginationCurrentPage(this.props.id , 'PAGENUMBER');
                this.props.reqObj.pageNumber = obj.ajaxCount;
                this.props.fetchListData(this.props.reqObj, this.props.id);
            }
        }
        if(e.target.dataset.type === 'FIRST') {
            if(obj.page <= this.getMaxPageCount()) {
                this.props.setPaginationCurrentPage(this.props.id , e.target.dataset.type, this.getMaxPageCount());  
            } else {
                this.props.setPaginationCurrentPage(this.props.id , 'PAGENUMBER');
                this.props.reqObj.pageNumber = obj.ajaxCount;
                this.props.fetchListData(this.props.reqObj, this.props.id);
            }
        }
        if(e.target.dataset.type === 'LAST') {
            if(Math.ceil(this.getMaxPageCount()/ (60 / this.props.recordsPerPage)) === Math.ceil(obj.page / (60 / this.props.recordsPerPage))) {
                this.props.setPaginationCurrentPage(this.props.id , e.target.dataset.type, this.getMaxPageCount());
            } else {
                this.props.setPaginationCurrentPage(this.props.id , 'PAGENUMBER');
                this.props.reqObj.pageNumber = obj.ajaxCount;
                this.props.fetchListData(this.props.reqObj, this.props.id); 
            }
        }
    }
    renderList() {
        let resultsflag = false, disableAllChevrons = false, obj = {};
        if(this.props.query.length > 0 && this.props.currentPage.length > 0 && this.props.id !== null) {
            if(this.props.query[0].totalresults > 0) {
                resultsflag = true;
                if(this.props.query[0].totalresults < this.props.recordsPerPage) {
                    disableAllChevrons = true;
                }
            }
            if(this.props.currentPage.length > 0) {
                this.props.currentPage.forEach(element => {
                    if(element.id === this.props.id) {
                        obj = element;
                    }
                });
            }
            return <div>
                <div className="pagination top">
                    <a className={disableAllChevrons ? 'first disabled' : 'first'} onClick={this.updateCurrentPage.bind(this)}>
                        <i data-type="FIRST" className="fa fa-step-backward"></i> 
                    </a>
                    <a className={disableAllChevrons ? 'prev disabled' : 'prev'} onClick={this.updateCurrentPage.bind(this)}>
                        <i data-type="PREV" className="fa fa-angle-left"></i> 
                    </a>
                    <a className={disableAllChevrons ? 'next disabled' : 'next'} onClick={this.updateCurrentPage.bind(this)}>
                        <i data-type="NEXT" className="fa fa-angle-right"></i>
                    </a>
                    <a className={disableAllChevrons ? 'last disabled' : 'last'} onClick={this.updateCurrentPage.bind(this)}>
                        <i data-type="LAST" className="fa fa-step-forward"></i>
                    </a>
                    <p className="page-count">
                    <strong>sida 
                        <span className="cur-page">{obj.page}</span>
                    </strong> av 
                    <span className="max-page">{this.getMaxPageCount()}</span>
                    </p>
                    <p className="total-results">
                        <span className={resultsflag ? 'results hidden-xs show' : 'results hidden-xs hide'}>
                            <span>{this.props.query[0].totalresults}</span>                    
                            <span className="result" >
                                Resultat
                            </span>
                        </span>
                        <span className={!resultsflag ? 'noresults show' : 'noresults hide'}>Inget resultat</span>
                    </p>
                </div>
            </div>;
        }
    }

    render() {
        return (
            <div className="pagination">
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPage: state.currentPage,
        listResponse: state.listResponse,
        selectedOption: state.selectedOption
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectedDropdown
function matchDispatchToProps(dispatch){
    return bindActionCreators({setPaginationCurrentPage: setPaginationCurrentPage,
        fetchListData: (reqObj, id) => itemsListFetchData(reqObj, id)}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Pagination);