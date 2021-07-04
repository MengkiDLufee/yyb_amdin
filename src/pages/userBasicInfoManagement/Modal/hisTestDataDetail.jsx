import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
import httpRequest from "../../../http";
import '../index.css'
import { Divider } from 'antd';
import AddPlan from './addPlan'
//此模块接口使用2.1.12 查看该测试类型下的测试记录 http://java.xixibackup.me:8080/user/test/data/his/cycle/type/list/{eupregnaTestHisId}
//eupregnaTestHisId为 this.props传进来 由testTime页面网络请求获取的eupregnaTestHisId

export default class hisTestDataDetail extends Component {
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
        //本地测试数据 要进行Get请求替换本地数据
        testData: [
            {
                "eupregnaTestPaperDataHisId": "1402850706548506626",
                "eupregnaTestHisId": null,
                "paperTypeId": null,
                "clientId": null,
                "finishFlag": true,
                "vaildFlag": true,
                "abortFlag": false,
                "planTime": "2021-06-11 12:50:00",
                "testTime": null,
                "timeout": 10800,
                "testSeq": 1,
                "planType": "24小时计划",
                "planSource": "sys",
                "planSourceOpt": null,
                "planResume": null,
                "deviceNo": null,
                "bathNumber": null,
                "value": null,
                "tgod": null,
                "cgod": null,
                "ccolor": null,
                "errorBarcodeFlag": null,
                "errorCLineFlag": null,
                "errorDataFlag": null,
                "testPicPathServer": null,
                "testPicPathAli": null,
                "testCLinePicPathServer": null,
                "testCLinePicPathAli": null,
                "testStatus": "paper_leave",
                "testError": null,
                "testResult": null,
                "statisticsType": null,
                "paperParamHisId": null,
                "insertDate": null,
                "insertUser": null,
                "updateDate": null,
                "updateUser": null,
                "delFlag": null,
                "testDate": "2021-06-10 12:50:46",
                "deviceStatus": null,
                "paperName": "女性卵泡刺激素",
                "result": null,
                "fshLh": null,
                "lhFsh": null
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
                title: '测试日期',
                align: 'center',
                dataIndex: 'testDate',
            },
            {
                title: '计划日期',
                align: 'center',
                dataIndex: 'planTime',
            },
            {
                title: '数值',
                align: 'finishFlag',
                dataIndex: 'value',
            },
            {
                title: 'GOD',
                align: 'finishFlag',
                dataIndex: 'tgod',
            },
            {
                title: '批号',
                align: 'finishFlag',
                dataIndex: 'deviceNo',
            },
            {
                title: '设备号',
                align: 'finishFlag',
                dataIndex: 'deviceNo',
            },
            {
                title: '结果',
                align: 'finishFlag',
                dataIndex: '',
            },
            {
                title: '测试图片',
                align: 'finishFlag',
                dataIndex: 'testPicPathAli',
            },
            {
                title: 'C线图片',
                align: 'finishFlag',
                dataIndex: 'errorCLineFlag',
            },
            {
                title: '测试状态',
                align: 'finishFlag',
                dataIndex: 'testStatus',
            },
            {
                title: 'C线图片GOD',
                align: 'finishFlag',
                dataIndex: 'cgod',
            },
            {
                title: 'FSH/LH',
                align: 'finishFlag',
                dataIndex: 'fshLh',
            },
            {
                title: 'LH/FS',
                align: 'finishFlag',
                dataIndex: 'lhFsh',
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