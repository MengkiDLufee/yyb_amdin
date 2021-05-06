import React, { Component } from 'react';
import { BrowserRouter,  Route ,Switch, Redirect } from 'react-router-dom'
//组件汉化
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import './style.less'


// 应用根组件



export default class App extends Component {




  render () {
    
    return (
      <BrowserRouter>
        <ConfigProvider locale={zh_CN}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/' component={Admin} />  
            <Redirect exact from='/' to='/login'/>
          </Switch>
        </ConfigProvider>
      </BrowserRouter>
    )
  }
}
