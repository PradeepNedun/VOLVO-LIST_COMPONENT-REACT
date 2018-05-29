import Axios from 'axios';

export const setSelectedFilter = (count, id, flag) => {
    var obj = {};
    obj.count = count;
    obj.show = flag;
    obj.id = id;
    return {
        type: 'SET_SELECTED_FILTER',
        payload: obj
    }
};

export const closeSelectedFilter = (count) => {
    return {
        type: 'CLOSE_SELECTED_FILTER',
        payload: count
    }
};

export const setSelectedOption = (count) => {
    return {
        type: 'SET_SELECTED_OPTION',
        payload: count
    }
};

export const toggleRefineBtn = (obj) => {
    return {
        type: 'TOGGLE_REFINE_BTN',
        payload: obj
    }
};

export const hideSelect = (flag) => {
    return {
        type: 'HIDE_SELECT',
        payload: flag
    }
};

export const fetchFilter = (items) => {
    return {
        type: 'FETCH_FILTER',
        items
    }
};

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function setPaginationCurrentPage(id, action, maxCount) {
    return {
        type: action,
        id,
        maxCount
    };
}

export function newsFunc6(items) {
    return items;
}

export function newsfilterFunc6(items) {
    return items;
}

export function eventsfilterFunc(items) {
    return items;
}

export function eventFunc(items) {
    return items;
}

export function itemsFilterFetchDataSuccess(items, id) {
    items = eval(items);
    items.id = id;
    let response = {
        [id]: items
    }
    return {
        type: 'ITEMS_FILTER_FETCH_DATA_SUCCESS',
        response
    };
}

export function itemsListFetchDataSuccess(items, id) {
    items = eval(items);
    items.id = id;
    let response = {
        [id]: items
    }
    return {
        type: 'ITEMS_LIST_FETCH_DATA_SUCCESS',
        response
    };
}

//async call trigger for filter
export function itemsFilterFetchData(reqObj, id) {
    //sitePath, eventType, sourcePath
    let apiUrl, category, topics, year;
    if(reqObj.pType === 'NEWS') {
        var str = '';
        for(var prop in reqObj) {
            str = str + prop + '=' + reqObj[prop] + '&'
        }
        apiUrl = str.replace('url=', '');
    } else if(reqObj.pType === 'EVENTS') {
        var str = '';
        for(var prop in reqObj) {
            str = str + prop + '=' + reqObj[prop] + '&'
        }
        apiUrl = str.replace('url=', '');
    }
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return (dispatch) => {
        // Returns a promise
        return Axios.get(apiUrl)
        .then(response => {
            // Dispatch another action
            // to consume data
            dispatch(itemsFilterFetchDataSuccess(response.data, id))
        })
        .catch(error => {
            dispatch(itemsHasErrored(true));
            throw(error);
        });
    };
}
export function itemsListFetchData(reqObj, id) {
    //sitePath, eventType, sourcePath
    let apiUrl, category, topics, year;
    if(reqObj.type === 'NEWS') {
        var str = '';
        for(var prop in reqObj) {
            str = str + prop + '=' + reqObj[prop] + '&'
        }
        apiUrl = str.replace('url=', '');
    } else if(reqObj.type === 'EVENTS') {
        var str = '';
        for(var prop in reqObj) {
            str = str + prop + '=' + reqObj[prop] + '&'
        }
        apiUrl = str.replace('url=', '');
    }
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return (dispatch) => {
        // Returns a promise
        return Axios.get(apiUrl)
        .then(response => {
            // Dispatch another action
            // to consume data
            dispatch(itemsListFetchDataSuccess(response.data, id));
        })
        .catch(error => {
            dispatch(itemsHasErrored(true));
            throw(error);
        });
    };
}