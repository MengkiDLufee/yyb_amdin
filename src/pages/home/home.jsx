import React, { Component } from 'react'


export default class Home extends Component {

    render() {
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
