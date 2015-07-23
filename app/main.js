var React = require('react');
var views = require('./views');

var Dashboard = React.createClass({
  render: function() {
    return (
        <div>
          <views.ShopList />
          <views.OrderList />
          <views.UserList />
          <views.CategoryList />
          <views.ConfigList />
        </div>
    );
  }
});

React.render(<Dashboard />, document.getElementById('app'));
