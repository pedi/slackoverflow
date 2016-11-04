import React from 'react';
import {Route, IndexRoute} from 'react-router'

const routes = (
    <Route path='/'>
        <Route path='/search'
               getComponents={
									(ndexState, cb) => {
											require.ensure([], function() {
													const App = require('components/Search').default;
													cb(null, App);
											})
									}
               }
        />
				<Route path='/detail'
               getComponents={
									(ndexState, cb) => {
											require.ensure([], function() {
													const Detail = require('components/Detail').default;
													cb(null, Detail);
											})
									}
               }
        />
    </Route>
);

export default routes; 