import React from 'react';
import {Route, IndexRoute} from 'react-router'

const routes = (
    <Route path='/'>
        <IndexRoute getComponents={
            (ndexState, cb) => {
                require.ensure([], function() {
                    const App = require('components/App').default;
                    cb(null, App);
                })
            }
        } />
    </Route>
)

export default routes; 