/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */
/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */
/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */
import React from 'react';
import GenericFilterListContainer from '../containers/generic-filter-list-container';
require('../../scss/style.scss');

const App = (element) => (
    <div>
        <GenericFilterListContainer id={element.id} recordsPerPage={element.recordsPerPage} 
            filterReqObj={element.filterReqObj} listReqObj={element.listReqObj}/>
    </div>
);

export default App;
/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */
/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */
/***DO NOT DELETE , LATER MAKE THIS AS PARENT COMPONENT */