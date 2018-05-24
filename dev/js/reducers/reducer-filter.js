/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */
/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
const initialState = {
    filterResponse: {
    },
    itemsHasErrored: false,
    itemsIsLoading: false,
    toggleRefineBtn: {
        toggleRefineBtn: true
    },
    HideFilterOnOutsideClick: false
};

export function itemsHasErrored(state = initialState.itemsHasErrored, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = initialState.itemsIsLoading, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function itemsFilter(state = initialState.filterResponse, action) {
    switch (action.type) {
        case 'ITEMS_FILTER_FETCH_DATA_SUCCESS':
            return Object.assign({}, state, action.response);
        default:
            return state;
    }
}

export function toggleRefineBtn(state = initialState.toggleRefineBtn, action) {
    switch (action.type) {
        case 'TOGGLE_REFINE_BTN':
            return Object.assign({}, state, {
                id: action.payload,
                toggleRefineBtn: !state.toggleRefineBtn
            });
        default:
            return state;
    }
}

export function HideFilterOnOutsideClick(state = initialState, action) {
    switch (action.type) {
        case 'HIDE_SELECT':
            return action.payload = true;
        default:
            return state;
    }
}