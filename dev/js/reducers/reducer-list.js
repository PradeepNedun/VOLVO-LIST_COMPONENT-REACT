const initialState = {
    listResponse: {
        
    }
};
  
export function itemsList(state = initialState.listResponse, action) {
    switch (action.type) {
        case 'ITEMS_LIST_FETCH_DATA_SUCCESS':
            return Object.assign({}, state, action.response);
        default:
            return state;
    }
}