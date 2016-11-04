import React from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory} from 'react-router';

import routes from 'routes';
const container = document.getElementById("main");

ReactDom.render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), container);
