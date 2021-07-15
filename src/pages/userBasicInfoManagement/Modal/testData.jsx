import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
 import httpRequest from "../../../http";
import '../index.css'
import TestDataDetails from "./testDataDetails"
import TestProblemData from './testProblemData'
import Log from './log'
export default class testData extends Component {
    constructor(props) {
        super(props);
        
    }
   
    state = {
        userName:this.props.userName,
        showTestData:false,
        visible: false,
        confirmLoading: false,
        modalText: 'Content of the modal',
        data:this.props,
        page:1,
        mode:this.props.mode=='show'?true:false,
        // testData:[],
        //本地测试数据
        testData:[
            {   
                'key':0,
                "eupregnaTestId": null,
                "clientId": "8080",
                "testType": "寻找黄金优孕期",
                "testTypeId": "1202889853826502657",
                "eupregnaTestTypeId": "1402855898614513666",
                "lastTestStatus": null,
                "testCount": "1",
                "lastTestConclude": null,
                "lastTestDate": null,
                "testSetName": "优孕保"
            },
            {
                'key':1,
                "eupregnaTestId": null,
                "clientId": "8080",
                "testType": "卵巢功能评估",
                "testTypeId": "1202889777913794561",
                "eupregnaTestTypeId": "1402855899138801666",
                "lastTestStatus": null,
                "testCount": "8",
                "lastTestConclude": null,
                "lastTestDate": null,
                "testSetName": "优孕保"
            }
        ]
    };

    componentDidMount(){
        console.log(this.state.data);
        console.log(this.props);
        var url=`http://java.xixibackup.me:8080/user/test/data/list/${this.state.data.clientId}/${this.state.page}`;
        // httpRequest('get',url).then(response=>{
        //     console.log(response.data.data)
            
        //     });
        return null;
    }
    changeEvent(e){
        // console.log(e.target.id);
        // console.log(e.target.value);
        var data = {...this.state.data}; 
        data[e.target.id]=e.target.value;
        // console.log(data[e.target.id]);
        this.setState({
            data:data
        },()=>{
            console.log(this.state.data);
        }
        )
        
    };
    showTestData =()=>{
        if(this.state.showTestData==true){
            return(
                <TestDataDetails {...this.state}></TestDataDetails>
            )
        }
        else{
            return null
        }
    };
    changeShowTestData = ()=>{

        this.setState({
            showTestData:true
        })
    }
    componentWillReceiveProps(){
        if(this.props.mode=='update'){
                this.setState({
                    visible: true,
                    mode:this.props.mode=='show'?true:false
                }
                )
            
        };
        console.log('子组件'+this.state.mode)
    }
    render() {
        
        
        const showModal = (e) => {
            console.log(e);
            this.setState({
                visible: true,
            }
            )
        };
        
        const handleOk = () => {
            this.setState(  {
                modalText: 'OKKKKK',
            }
            );
            var data1={
                 "page":1,
                 "pageSize":20
               };
             httpRequest('post','http://java.xixibackup.me:8080/user/management/test/list',data1).then(response=>{
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
            }
            )
        };
        
        const columns = [
            {
              title: '测试类型',
              dataIndex: 'testType',
              align:'center',
              render: text => <a>{text}</a>,
            },
            {
              title: '测试次数',
              align:'center',
              dataIndex: 'testCount',
            },
            {
              title: '末次测试状态',
              align:'center',
              dataIndex: 'lastTestStatus',
            },
            {
                title: '末次测试时间',
                align:'center',
                dataIndex: 'lastTestDate',
              },
            {
                title: '操作',
                align:'center',
                width:'600px',
                render:(data)=>(
                    <div> 
                        {/* <Button onClick={()=>{console.log(data)}} >测试</Button> */}
                        
                        <TestDataDetails {...this.state} {...data}></TestDataDetails>
                        <TestProblemData {...this.state} {...data}></TestProblemData>
                        
                        
                    </div>
                )
              },
          ];
          
        return (
            
            <div>
                
                <div type="primary" style={{textDecoration:'underline'}} 
                onClick={showModal}
                // className={this.state.mode==true?null:'hidden'}
                >
                    <Button type="primary" style={{backgroundColor:'grey',borderColor:'grey',opacity:'0.3',color:'white',marginRight:'5px'}}
                        
                    >
                        测试数据
                    </Button>
                    {/* <span>{this.props.userName}</span> */}
                   
                </div>
                <Modal
                    title="测试数据"
                    visible={this.state.visible}
                    onOk={handleOk}
                    okText='提交'
                    confirmLoading={this.state.confirmLoading}
                    onCancel={handleCancel}
                    cancelText='取消'
                    width='1400px'
                >
                    <div className="site-input-group-wrapper">
                    {/* 弹窗第一行 */}
                    <span  style={{marginRight:'15px'}}>
                    用户名</span> 
                    
                    {/* <Table columns={columns} dataSource={data} /> */}
                    <span style={{marginRight:'15px'}}
                    >{this.props.userName}</span>
                    <Log {...this.state}></Log>
                    {this.showTestData()}
                    <Table columns={columns} dataSource={this.state.testData} />

                    </div>
                    
                </Modal>
            </div>
        )
    }
}