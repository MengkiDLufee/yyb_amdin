import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo_1.png'
const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Leftnav extends Component {


  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<UserOutlined />}  >
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {

        return (
          <SubMenu key={item.key} title={item.title} icon={<UnorderedListOutlined />} >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    const { collapsed } = this.props
    return (
      <div>
        <Sider trigger={null} collapsible collapsed={collapsed} className="left-nav" width={220} >
          <div className="logo" >
            <img src={logo} alt="logo" style={{marginLeft:collapsed? '20px':'10px'}} />
            <div style={{display:collapsed? 'none' : 'block'}} >优孕宝服务平台</div>
          </div>
          <div className="inner">
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              style={{ background: ' #f05d73' }}
            // openKeys={openKeys}
            // onOpenChange={this.onOpenChange}
            >
              {/* 调用生成导航栏函数 */}
              {this.getMenuNodes(menuList)}
            </Menu>
          </div>
        </Sider>
      </div>
    )
  }
}
