'use strict';
var React = require('react');
var ReactRouter = require('react-router');

var {RouteHandler, Router, Route, NotFoundRoute, DefaultRoute} = ReactRouter;

var App = require('./App');
var Dashboard = require('./Dashboard');

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Dashboard} />
    <Route name="dashboard" handler={Dashboard} />
    <NotFoundRoute handler={Dashboard} />
  </Route>
);

ReactRouter.run(routes, (Handler, state) => {
  React.render(<Handler />, document.getElementById('app'));
});
