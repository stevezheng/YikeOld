var React = require('react');
var views = require('./views');

var Dashboard = React.createClass({
  render: function() {
    return (
        <h1>Hello World</h1>
        );
  }
});

React.render(<views.ShopList />, document.getElementById('app'));
