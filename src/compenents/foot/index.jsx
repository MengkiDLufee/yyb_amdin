//底部
import React, { Component } from 'react'
import { Layout } from 'antd';
import './index.less'

const { Footer } = Layout;

export default class Foot extends Component {
  render() {
    return (
      <Footer className="foot" >
        <a href="https://www.uestc.edu.cn/" target="_blank" rel="noopener noreferrer">
          电子科技大学提供技术支持
        </a>
        <div>优孕宝服务平台</div>
      </Footer>
    )
  }
}
