import React, { Component } from 'react'
import './index.less'


export default class Home extends Component {

    render() {
        let data = sessionStorage.getItem('token');
        
        console.log(data);
        console.log(localStorage.getItem('acount_yyb'),localStorage.getItem('password_yyb'));
        console.log(localStorage.getItem('check'),localStorage.getItem('autoLogin'));
        return (
            <div
                className='home'
            >
            </div>
        )
    }
}
