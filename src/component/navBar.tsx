import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      role: 'Admin',
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    if (this.state.role == 'Admin') {
      return (
        <div>
          <div className=" menu ">
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              )}
            </Button>
            {this.state.collapsed ? (
              <Menu
                mode="horizontal"
                theme="light"
                className="list"
                defaultOpenKeys={['sub1']}
                inlineCollapsed={this.state.collapsed}>
                <Menu.Item key="1">
                  <a href="/">Search Trend</a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a href="/alltrend">Manage Trend</a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a href="/alltag">Manage Tag</a>
                </Menu.Item>
                <Menu.Item key="4">
                  <a href="/users">Manage Users</a>
                </Menu.Item>
                <Menu.Item key="5">
                  <a href="/login">Logout</a>
                </Menu.Item>
              </Menu>
            ) : null}
          </div>
        </div>
      );
    }
    if (this.state.role == 'User') {
      return (
        <div>
          <div className=" menu ">
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              )}
            </Button>
            {this.state.collapsed ? (
              <Menu
                mode="horizontal"
                theme="light"
                className="list"
                defaultOpenKeys={['sub1']}
                inlineCollapsed={this.state.collapsed}>
                <Menu.Item key="1">
                  <a href="/">Search Trend</a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a href="/login">Logout</a>
                </Menu.Item>
              </Menu>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default NavMenu;
