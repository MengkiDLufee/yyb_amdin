import React, { Component } from 'react'


export default class Home extends Component {

    render() {
        let data = sessionStorage.getItem('token');
        
        console.log(data);
        console.log(localStorage.getItem('acount_yyb'),localStorage.getItem('password_yyb'));
        console.log(localStorage.getItem('check'),localStorage.getItem('autoLogin'));
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url(${require("../../assets/images/admin-bg.jpg")})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '750px'
                }}
            >
            </div>
        )
    }
}
