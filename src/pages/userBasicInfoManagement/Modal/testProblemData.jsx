import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
import httpRequest from "../../../http";
import '../index.css'
import { Divider } from 'antd';
import AddPlan from './addPlan'
//此模块接口使用2.1.9 查询问题试剂数据 http://java.xixibackup.me:8080/user/test/data/error/paper/list/{eupregnaTestTypeId}  
//eupregnaTestTypeId数据为 this.props.eupregnaTestTypeId
export default class testProblemData extends Component {
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
                {   'key':'0',
                    'paperName':'',//试剂名称
                    'testTime':'',//测试时间
                    'planTime':'',//计划时间
                    'bathNumber':'',//条码(如果无法识别则为空)
                    'errorType':'',//错误类型
                    'errorPicPathAli':'',//问题图片路径(ali)
                }
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
            httpRequest('post', 'http://java.xixibackup.me:8080/user/management/test/list', data1).then(response => {
                console.log(response.data.data)

            });
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
                title: '试剂',
                dataIndex: 'paperName',
                align: 'center',
                render: text => <a>{text}</a>,
            },
            {
                title: '计划日期',
                align: 'center',
                dataIndex: 'planTime',
            },
            {
                title: '测试日期',
                align: 'center',
                dataIndex: 'testTime',
            },
            {
                title: '条码',
                align: 'finishFlag',
                dataIndex: 'bathNumber',
            },
            {
                title: '错误类型',
                align: 'finishFlag',
                dataIndex: 'errorType',
            },
            {
                title: '问题图片',
                align: 'finishFlag',
                dataIndex: 'errorPicPathAli',
            },
        ];

        return (
            <div style={{display:'inline-block'}}>
                <Button  type="primary" style={{ backgroundColor: 'grey', borderColor: 'grey', opacity: '0.3', color: 'white', marginRight: '5px' }}
                    onClick={showModal} 
                >
                    测试试剂问题数据
                </Button>
                <Modal title="问题试剂" visible={this.state.visible} width='1400px'
                    onOk={handleOk} onCancel={handleCancel}>
                    <Divider />
                    <Table columns={columns} dataSource={this.state.testData} />
                </Modal>
               
            </div>
        )
    }
}