'use strict';
var React = require('react');

var ReactRouterBootstrap = require('react-router-bootstrap');
var {NavItemLink} = ReactRouterBootstrap;

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
                      <NavItemLink to="users">
                        <span>用户管理</span>
                      </NavItemLink>
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
                      <NavItemLink to="shops">
                        商家管理
                      </NavItemLink>
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
                        <NavItemLink to="orders">
                          订单管理
                        </NavItemLink>
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

module.exports = Sidebar;
