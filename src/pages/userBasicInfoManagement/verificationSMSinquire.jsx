import React, { Component } from 'react'
import { Table, Button, Input, Row, Col, Select, Space, Modal, Form ,Divider } from 'antd';
import { PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import httpRequest from "../../http";
import { Switch } from 'antd';
import UserMsg from "./Modal/userMsg"

export default class VerificationSMSinquire extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        long:false,
        show:false,
        dataSource: [
            {
                userId: '2',
                key:0,
                //数据已按渲染顺序排列好
                userName: "13333333333",
                gender: "F",
                nickName: "UESTC测试",
                testAccount: null,
                userRemark: null,
                manAge: '20',
                womanAge: '23',
                manBirthday: "1990-01-04",
                womanBirthday: "1990-01-04",
                lastBleeding: "2021-05-25 00:00:00",
                lastCycleNumber: 28,
                cycle: null,
                preferTestTime: "1970-01-01 17:40:44",
                testStatus: null,
                status: null,
                email: null,
                phone: "13333333333",
                address: null,
                description: null,
                regTime: "2021-01-08 11:07:28",
                regStatus: "USER_REGISTERED",
                minCycle: 28,
                maxCycle: 28,

                
                clientId: "8080",
                doctor: null,
                deviceNo: null,
                femaleName: null,
                marriedYears: 5,
                hasBearing: false,
                hasPregnantCheck: false,
                hasPregnantIllness: false,
                pregnantIllness: null,
                commonCycle: 28,
                dndTimeStart: null,
                dndTimeEnd: null,
                schemeType: "scheme_nomal",
                ended: false,
                eupregnaEnded: false,
                uploadLogFlag: true,
                wechat: null,
                csClientId: null,
                password: null,
                //未用到的数据
                deviceCode: null,
                testStatusName: null,
                regStatusName: "已注册",
                csRemark: null,
                userDeviceId: null,
                userNo: null,
                insertDate: "2021-05-31 16:53:43",
                insertUser: null,
                updateDate: "2021-06-02 10:56:43",
                updateUser: null,
                delFlag: false
            },{
                userId: '2',
                key:1,
                //数据已按渲染顺序排列好
                userName: "13333333333",
                gender: "F",
                nickName: "UESTC测试",
                testAccount: null,
                userRemark: null,
                manAge: '20',
                womanAge: '23',
                manBirthday: "1990-01-04",
                womanBirthday: "1990-01-04",
                lastBleeding: "2021-05-25 00:00:00",
                lastCycleNumber: 28,
                cycle: null,
                preferTestTime: "1970-01-01 17:40:44",
                testStatus: null,
                status: null,
                email: null,
                phone: "13333333333",
                address: null,
                description: null,
                regTime: "2021-01-08 11:07:28",
                regStatus: "USER_REGISTERED",
                minCycle: 28,
                maxCycle: 28,

                
                clientId: "8080",
                doctor: null,
                deviceNo: null,
                femaleName: null,
                marriedYears: 5,
                hasBearing: false,
                hasPregnantCheck: false,
                hasPregnantIllness: false,
                pregnantIllness: null,
                commonCycle: 28,
                dndTimeStart: null,
                dndTimeEnd: null,
                schemeType: "scheme_nomal",
                ended: false,
                eupregnaEnded: false,
                uploadLogFlag: true,
                wechat: null,
                csClientId: null,
                password: null,
                //未用到的数据
                deviceCode: null,
                testStatusName: null,
                regStatusName: "已注册",
                csRemark: null,
                userDeviceId: null,
                userNo: null,
                insertDate: "2021-05-31 16:53:43",
                insertUser: null,
                updateDate: "2021-06-02 10:56:43",
                updateUser: null,
                delFlag: false
            },
        ],
    };
    show =() => {
        if(this.state.show==true){
            return(
                null
            )
        }
        else{
            return(
                <UserMsg {...this.state.dataSource[0]}></UserMsg>
            )
        }
    }
    change = () =>{
        var b=!this.state.show
        this.setState({
            show:b
        },()=>{
            console.log(this.state.show)
        })
    }
    render() {
        const Tag = this.state.long ? "textarea" : "input";

        return (
            <div>
                <Button
                    onClick={()=>this.change()}
                    >切换</Button>
                <Tag></Tag>
                {(this.show())}
                
            </div>
        )
    }
}
