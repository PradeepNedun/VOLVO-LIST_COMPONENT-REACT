import {combineReducers} from 'redux';
import { selectedFilter,  selectedOption, closeSelectedFilter } from './reducer-active-select';
import { itemsFilter, itemsHasErrored, itemsIsLoading, toggleRefineBtn, HideFilterOnOutsideClick } from './reducer-filter';
import { itemsList } from './reducer-list';
import { currentPage } from './reducer-pagination';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    toggleRefineBtn: toggleRefineBtn,
    HideFilterOnOutsideClick: HideFilterOnOutsideClick,
    selectedFilter: selectedFilter,
    selectedOption: selectedOption,
    closeSelectedFilter: closeSelectedFilter,
    filterResponse: itemsFilter,
    itemsHasErrored: itemsHasErrored,
    itemsIsLoading: itemsIsLoading,
    listResponse: itemsList,
    currentPage: currentPage
});

export default allReducers
