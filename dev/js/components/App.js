import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import GenericList from '../containers/generic-list';
require('../../scss/style.scss');

const App = () => (
    <div>
        <h2>User List</h2>
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
        <h2>Generic List</h2>
        <GenericList />
    </div>
);

export default App;
