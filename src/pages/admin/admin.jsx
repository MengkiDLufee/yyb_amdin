// 后台管理的路由组件
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import './index.less'
import menuList from '../../config/menuConfig'
import Leftnav from '../../compenents/leftnav'//左侧导航组件
import Topbar from '../../compenents/topbar';
import Midcontent from '../../compenents/midcontent';
import Foot from '../../compenents/foot'

const { SubMenu } = Menu;

const menu_user = (
  <Menu>
    <Menu.Item>
      <span href="" rel="noopener noreferrer">个人中心</span>
    </Menu.Item>
    <Menu.Item>
      <span href="" rel="noopener noreferrer">修改密码</span>
    </Menu.Item>
    <Menu.Item>
      <span href="" rel="noopener noreferrer" >退出</span>
    </Menu.Item>
  </Menu>
)
export default class Admin extends Component {
  state = {
    collapsed: false,
    keys: [],
    user_name: 'eupregna',
  };
  //导航栏收缩扩张
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  //根据menu数据生成对应标签数组，动态生成导航栏，此方法没能解决动态生成icon、问题
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
  //顶部左侧显示页面名称
  getTitle = () => {
    const path = this.props.location.pathname

    let title
    menuList.forEach(el => {
      if (el.key === path) {
        title = el.title
      } else if (el.children) {
        //在children中查找匹配
        const c_el = el.children.find(c_el => c_el.key === path)
        if (c_el) {
          title = c_el.title
        }
      }
    });
    return title
  }
  //顶部右侧显示页面名称
  getTitleRight = () => {
    const path = this.props.location.pathname

    let title
    menuList.forEach(el => {
      if (el.key === path) {
        title = el.title
      } else if (el.children) {
        //在children中查找匹配
        const c_el = el.children.find(c_el => c_el.key === path)
        if (c_el) {
          title = el.title + ` / ` + c_el.title
        }
      }
    });
    return title
  }

  render() {
    return (
      <ConfigProvider locale={zh_CN}>
        <Layout className="layout-all">
          {/* 左侧导航栏 */}
          <Leftnav collapsed={this.state.collapsed} />
          {/* 中间内容 */}
          <Layout className="site-layout">
            {/* 顶部 */}
            <Topbar
              collapsed={this.state.collapsed}
              toggle={this.toggle}
              getTitle={this.getTitle}
              getTitleRight={this.getTitleRight}
              menu_user={menu_user}
              user_name={this.state.user_name}
            />
            {/* 内容部分二级路由配置 */}
            <Midcontent />
            {/* 页脚 */}
            <Foot />
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}
