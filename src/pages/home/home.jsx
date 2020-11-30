import React, { Component } from 'react'


export default class Home extends Component {

    render() {
        return (
            <div style={{height:'100%',width:'100%',
                        backgroundImage: `url(${require("./images/home_image.jpg")})`,
                        backgroundSize:'100% 100%',
                        backgroundRepeat:'no-repeat'
                        }}>
            </div>
        )
    }
}
