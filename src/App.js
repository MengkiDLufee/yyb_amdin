import React, { Component } from 'react';
import { BrowserRouter,  Route ,Switch, Redirect } from 'react-router-dom'


import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import './style.less'


// 应用根组件



export default class App extends Component {
  login =() => {
    this.props.history.replace('/login')
}
componentWillUnmount(){
  console.log('this.props.path')
  this.login()
   
}

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />  
          
          <Redirect  from="/*" to='/login'/> 

          
        </Switch>
      </BrowserRouter>
    )
  }
}
