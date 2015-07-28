var React = require('react');
var ReactRouter = require('react-router');

var ReactBootstrap = require('react-bootstrap');
var ReactRouterBootstrap = require('react-router-bootstrap');

var {Nav, NavItem, NavBar} = ReactBootstrap;
var {NavItemLink} = ReactRouterBootstrap;

var {RouteHandler, Router, Route, NotFoundRoute, DefaultRoute, Link} = ReactRouter;

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

class Sidebar extends React.Component{
  render() {
    return (
      <aside>
        <div id="sidebar"  className="nav-collapse ">
            <ul className="sidebar-menu" id="nav-accordion">
              <NavItemLink to="dashboard">
                <i className="icon-dashboard"></i>
                <span>首页</span>
              </NavItemLink>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>系统设置</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#setting">站点设置</a></li>
                        <li><a  href="/admin/#setting-upload">上传设置</a></li>
                        <li><a  href="/admin/#setting-seo">SEO设置</a></li>
                        <li><a  href="/admin/#setting-pay">支付方式</a></li>
                        <li><a  href="/admin/#setting-permission">权限设置</a></li>
                        <li><a  href="/admin/#setting-express">物流设置</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>用户中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#user">用户管理</a></li>
                        <li><a  href="/admin/#user-point">积分管理</a></li>
                        <li><a  href="/admin/#user-money">预存款管理</a></li>
                        <li><a  href="/admin/#user-address">地址管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>商家中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#shop">商家管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>产品中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#item">产品管理</a></li>
                        <li><a  href="/admin/#item-category">产品分类管理</a></li>
                        <li><a  href="/admin/#item-brand">品牌管理</a></li>
                        <li><a  href="/admin/#item-images">产品图片管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>支付中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#pay">充值管理</a></li>
                        <li><a  href="/admin/#withdraw">提现管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>交易中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#order">订单管理</a></li>
                        <li><a  href="/admin/#order-cancel">退款管理</a></li>
                        <li><a  href="/admin/#order-comment">评价管理</a></li>
                        <li><a  href="/admin/#order-ask">咨询管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>新闻中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#article">新闻管理</a></li>
                        <li><a  href="/admin/#article-category">新闻分类管理</a></li>
                        <li><a  href="/admin/#article-system">系统文章管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>广告中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#ad">广告管理</a></li>
                        <li><a  href="/admin/#ad-banner">推荐位管理</a></li>
                    </ul>
                </li>

                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="icon-laptop"></i>
                        <span>日志中心</span>
                    </a>
                    <ul className="sub">
                        <li><a  href="/admin/#log-user">用户日志</a></li>
                        <li><a  href="/admin/#log-item">产品日志</a></li>
                        <li><a  href="/admin/#log-order">交易日志</a></li>
                    </ul>
                </li>
            </ul>
        </div>
      </aside>
    );
  }
}

var Dashboard = React.createClass({
  render: function() {
    return (
        <div>
          欢迎进入管理后台！
        </div>
    );
  }
});

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
