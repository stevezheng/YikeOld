'use strict';
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./Header');
var Sidebar = require('./Sidebar');

class App extends React.Component{
  render() {
    return (
      <section id="container">
        <Header />
        <Sidebar />
        <section id="main-content">
            <section className="wrapper">
              <RouteHandler />
            </section>
        </section>
      </section>
    );
  }
}

module.exports = App;
