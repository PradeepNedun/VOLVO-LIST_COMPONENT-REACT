/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
const initialState = {
    selectedFilter: {
        id: "",
        count: 0,
        show: false
    },
    selectedOption: []
};

export function selectedFilter(state = initialState.selectedFilter, action) {
    switch (action.type) {
        case 'SET_SELECTED_FILTER':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export function closeSelectedFilter(state = initialState.selectedFilter, action) {
    switch (action.type) {
        case 'CLOSE_SELECTED_FILTER':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export function selectedOption(state = initialState.selectedOption, action) {
    switch (action.type) {
        case 'SET_SELECTED_OPTION':
            let arr = [...state],
                keys = Object.keys(action.payload),
                flag = false;
            arr.map((element) => {
                if(element.id === action.payload[keys[0]] && element.hasOwnProperty(keys[1])) {
                    element[keys[1]] = action.payload[keys[1]];
                    flag = true;
                }
            });
            if(!flag) {
                arr.push(action.payload);
            }
            return arr
        default:
            return state;
    }
}