import React from 'react';
import UserDetails from '../containers/user-detail';
import GenericList from '../containers/generic-list';
import GenericFilter from '../containers/generic-filter';
import GenericFilterListContainer from '../containers/generic-filter-list-container';
require('../../scss/style.scss');

const App = (req) => (
    <div>
        {/* <h2>User List</h2>
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails /> */}
        <GenericFilterListContainer/>
        {/* <GenericFilter requestFilterObject= {req.requestFilterObject}/>
        <h2>List is coming soon</h2>
        <GenericList /> */}
    </div>
);

export default App;
