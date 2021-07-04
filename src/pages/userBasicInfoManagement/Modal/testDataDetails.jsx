import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
import httpRequest from "../../../http";
import '../index.css'
import { Divider } from 'antd';
import ChangePlan from './changePlan'
import AddPlan from './addPlan'
export default class testDataDetails extends Component {
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
                    "eupregnaTestPaperDataId": "1402855902154506242",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1202936095629643778",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-11 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性卵泡刺激素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'1',
                    "eupregnaTestPaperDataId": "1402855902154506243",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1203141030023532545",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-11 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性促黄体生成素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'2',
                    "eupregnaTestPaperDataId": "1402855902154506244",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1202936095629643778",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-12 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性卵泡刺激素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'3',
                    "eupregnaTestPaperDataId": "1402855902154506245",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1203141030023532545",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-12 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性促黄体生成素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'4',
                    "eupregnaTestPaperDataId": "1402855902154506246",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1202936095629643778",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-13 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性卵泡刺激素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'5',
                    "eupregnaTestPaperDataId": "1402855902154506247",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1203141030023532545",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-13 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性促黄体生成素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'6',
                    "eupregnaTestPaperDataId": "1402855902154506248",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1202936095629643778",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-14 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性卵泡刺激素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                },
                {   'key':'7',
                    "eupregnaTestPaperDataId": "1402855902154506249",
                    "eupregnaTestId": "1402855900120268801",
                    "paperTypeId": "1203141030023532545",
                    "clientId": null,
                    "finishFlag": false,
                    "vaildFlag": null,
                    "abortFlag": null,
                    "planTime": "2021-06-14 13:11:00",
                    "testTime": null,
                    "timeout": 10800,
                    "testSeq": null,
                    "planType": null,
                    "planSource": null,
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
                    "testStatus": null,
                    "testError": null,
                    "testResult": null,
                    "statisticsType": null,
                    "paperParamHisId": null,
                    "insertDate": null,
                    "insertUser": null,
                    "updateDate": null,
                    "updateUser": null,
                    "delFlag": null,
                    "testDate": null,
                    "deviceStatus": null,
                    "paperName": "女性促黄体生成素",
                    "result": null,
                    "fshLh": null,
                    "lhFsh": null,
                    "sign": null,
                    "maxNum": null,
                    "paperTypeCode": null
                }
            ]
    };

    // componentDidMount(){
    //     console.log(this.state.data);
    //     console.log(this.props);
    //     var url=`http://java.xixibackup.me:8080/user/test/data/list/${this.state.data.clientId}/${this.state.page}`;
    //     // httpRequest('get',url).then(response=>{
    //     //     console.log(response.data.data)

    //     //     });
    //     return null;
    // }
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
                title: '超时时间',
                align: 'center',
                dataIndex: 'timeout',
            },
            {
                title: '已测试',
                align: 'finishFlag',
                dataIndex: 'lastTestDate',
            },
            {
                title: '操作',
                align: 'center',
                render: (a) => (
                    <div>
                        <ChangePlan {...this.props} {...a}></ChangePlan>
                    </div>
                )
            },
        ];

        return (
            <div style={{display:'inline-block'}}>
                <Button type="primary" style={{ backgroundColor: 'grey', borderColor: 'grey', opacity: '0.3', color: 'white', marginRight: '5px' }}
                    onClick={showModal}
                >
                    测试试剂数据
                </Button>
                <Modal title="测试试剂数据" visible={this.state.visible} width='1400px'
                    onOk={handleOk} onCancel={handleCancel}>
                    <p>用户名:{this.props.userName}</p>
                    <p>测试类型:{this.props.testType}</p>
                    <AddPlan {...this.props}></AddPlan>
                    <Divider />
                    <Table columns={columns} dataSource={this.state.testData} />
                </Modal>
               
            </div>
        )
    }
}