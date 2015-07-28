'use strict';
var React = require('react');

class Header extends React.Component{
  render() {
    return (
      <header className="header white-bg">
        <div className="sidebar-toggle-box">
          <div data-original-title="Toggle Navigation" data-placement="right" className="icon-reorder tooltips"></div>
        </div>
        <a href="/admin" className="logo">管理<span>后台</span></a>
        <div className="top-nav ">
            <ul className="nav pull-right top-menu">
                <li className="dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                        <span className="username">管理员</span>
                        <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                        <div className="log-arrow-up"></div>
                        <li><a href="/admin/logout"><i className="icon-key"></i>退出</a></li>
                    </ul>
                </li>
            </ul>
        </div>
      </header>
    );
  }
}

module.exports = Header;
