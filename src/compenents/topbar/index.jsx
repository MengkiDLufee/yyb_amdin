//内容部分顶部栏
import React, { Component } from 'react'
import { Layout, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,

  EllipsisOutlined,
  DownOutlined,
  MinusOutlined
} from '@ant-design/icons';
import './index.less'

const { Header } = Layout;

export default class Topbar extends Component {
  render() {
    const {
      collapsed ,
      toggle ,
      getTitle ,
      getTitleRight ,
      menu_user,
      user_name 
    } = this.props
    return (
      <Header className="site-layout-background">
        {/* 顶部上方 */}
        <div className="header-top" >
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })
            }
            <div className="top-right"  >
                <Dropdown overlay={menu_user} >
                  <span onClick={e => e.preventDefault()} >
                    欢迎，{user_name}
                    <DownOutlined  id="DownOutlined" />
                  </span>
                </Dropdown>
                <EllipsisOutlined rotate="90" id="EllipsisOutlined" />
            </div>
          </div>
        </div>
        {/* 顶部下方 */}
        <div className="header-bottom">
            <span>
              <MinusOutlined rotate="90" id="MinusOutlined" />
              <span>{getTitle()}</span>
            </span>
            <span className="right-title">
              {getTitleRight()}
            </span>
        </div>
      </Header>
    )
  }
}
