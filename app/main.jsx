'use strict';
var React = require('react');
var ReactRouter = require('react-router');

var {RouteHandler, Router, Route, NotFoundRoute, DefaultRoute} = ReactRouter;

var App = require('./App');
var Dashboard = require('./Dashboard');

var views = require('./views');

var {ShopList, OrderList, UserList, CategoryList} = views;

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Dashboard} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="shops" handler={ShopList} />
    <Route name="orders" handler={OrderList} />
    <Route name="users" handler={UserList} />
    <Route name="categories" handler={CategoryList} />
    <NotFoundRoute handler={Dashboard} />
  </Route>
);

ReactRouter.run(routes, (Handler, state) => {
  React.render(<Handler />, document.getElementById('app'));
});
