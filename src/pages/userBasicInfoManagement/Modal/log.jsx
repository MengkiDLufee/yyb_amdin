import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
import httpRequest from "../../../http";
import '../index.css'
import { Divider } from 'antd';
import AddPlan from './addPlan'
//2.1.14 查看历史测试数据日志 http://java.xixibackup.me:8080/user/test/data/his/test/log/info/{type}/{id}
//eupregnaTestHisId为 this.props传进来 由testTime页面网络请求获取的eupregnaTestHisId
//接口里并未给清楚具体键名，还要修改
//id为this.props.data.clientId
export default class log extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        showTestData: false,
        visible: false,
        confirmLoading: false,
        modalText: 'Content of the modal',
        data: [],
        page: 1,
        mode: [true],
        // testData:[],
        //本地测试数据 
        testData: [
            {
                'opType':'',
                'opTime':'',
                'opResult':'',
                'testType':'',
            },
            ]
    };

 
    changeEvent(e) {
        // console.log(e.target.id);
        // console.log(e.target.value);
        var data = { ...this.state.data };
        data[e.target.id] = e.target.value;
        // console.log(data[e.target.id]);
        this.setState({
            data: data
        }, () => {
            console.log(this.state.data);
        }
        )

    };

    componentDidMount(){
        console.log(this.state.data);
        console.log(this.props);
        var url=`http://java.xixibackup.me:8080/user/test/data/his/test/log/info/3/${this.props.data.clientId}`;
        // httpRequest('get',url).then(response=>{
        //     console.log(response.data.data)
        //     });
        return null;
    }
    render() {


        const showModal = (e) => {
            console.log(e);
            console.log('xxxxxxx');
            console.log(this.props);
            this.setState({
                visible: true,

            }
            )
        };

        const handleOk = () => {
            this.setState({
                modalText: 'OKKKKK',
            }
            );
            var data1 = {
                "page": 1,
                "pageSize": 20
            };
            setTimeout(() => {
                this.setState({
                    visible: true,
                    confirmLoading: true,
                }
                )
            }, 2000);
        };

        const handleCancel = () => {
            console.log('Clicked cancel button');
            console.log(this.state.mode);
            this.setState({
                visible: false,
                showTestData: false
            }
            )
        };

        const columns = [
            {
                title: '操作类型',
                dataIndex: 'opType',
                align: 'center'
            },
            {
                title: '操作时间',
                align: 'center',
                dataIndex: 'opTime',
            },
            {
                title: '操作结果',
                align: 'center',
                dataIndex: 'opResult',
            },
            {
                title: '测试类型',
                align: 'finishFlag',
                dataIndex: 'testType',
            }
        ];

        return (
            <div style={{display:'inline-block'}}>
                <Button  danger
                    onClick={showModal} 
                >
                    查看日志
                </Button>
                <Modal title="日志" visible={this.state.visible} width='800px'
                    onOk={handleOk} onCancel={handleCancel}>
                    <Divider />
                    <Button onClick={()=>{console.log(this.props)}}>测试按钮</Button>
                    <Table columns={columns} dataSource={this.state.testData} />
                </Modal>
               
            </div>
        )
    }
}