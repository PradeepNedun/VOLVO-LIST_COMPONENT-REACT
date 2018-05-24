const initialState = {
    currentPage: []
};

export function currentPage(state = initialState.currentPage, action) {
    switch (action.type) {
        case 'ONLOAD':
            let onload = [...state];
                onload.push({
                    id: action.id,
                    page: 1,
                    ajaxCount: 1
                });
            return onload;

        case 'NEXT':
            let add = [...state],
                flag = false;
            add.map((element) => {
                if(element.id === action.id) {
                    if(element.page >= 1) {
                        if(action.maxCount > element.page) {
                            element.page = element.page + 1;
                        }
                    }
                    flag = true;
                }
            });

            if(!flag) {
                add.push({
                    id: action.id,
                    page: 1
                });
            }
            return add;

        case 'PREV':
            let remove = [...state];
            remove.map((element) => {
                if(element.id === action.id) {
                    if(element.page > 1) {
                        element.page = element.page - 1;
                    }
                }
            });
            return remove;

        case 'FIRST':
            let first = [...state];
            first.map((element) => {
                if(element.id === action.id) {
                    if(element.page > 1) {
                        element.page = 1;
                    }
                }
            });
            return first;
            
        case 'LAST':
            let last = [...state];
            last.map((element) => {
                if(element.id === action.id) {
                    if(element.page >= 1) {
                        element.page = action.maxCount;
                    }
                }
            });
            return last;
            
        case 'PAGENUMBER':
            let pageNumber = [...state];
            pageNumber.map((element) => {
                if(element.id === action.id) {
                    element.ajaxCount = element.ajaxCount + 1;
                }
            });
            return pageNumber;
      default:
        return state;
    }
}