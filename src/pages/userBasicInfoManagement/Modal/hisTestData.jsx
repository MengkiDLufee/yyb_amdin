import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
 import httpRequest from "../../../http";
import '../index.css'
import TestDataDetails from "./testDataDetails"
import TestTime from './testTime';
import Log from './log'
//历史测试数据页面，此页面使用接口2.1.10 查看历史测试数据 http://java.xixibackup.me:8080/user/test/data/his/data/list/{clientId}/{page}/{pageSize}
//clientId为 this.props.clientId
export default class hisTestData extends Component {
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
                "eupregnaTestCycleHisId": "1402850702287093761", //周期id
                "testSetId": "1202889085446787073",
                "clientId": "8080",
                "finishFlag": true,
                "abortFlag": false,
                "startDate": "2021-06-10 12:50:46", //开始时间
                "endDate": "2021-06-10 13:11:23",   //结束时间
                "testTypes": "layegg,sperm,egg_quality,pregnant,embryo,male_fsh",
                "testStatus": "cycle_testing",
                "testSource": "app",
                "bleedingDate": null,
                "sexDate": null,
                "pregnantDate": null,
                "layingeggDate": null,
                "layedeggDate": null,
                "insertDate": "2021-06-10 13:11:23",
                "insertUser": "8080",
                "updateDate": "2021-06-10 13:11:23",
                "updateUser": null,
                "delFlag": false
            }       
        ]
    };

    componentDidMount(){
        console.log(this.state.data);
        console.log(this.props);
        var url=`http://java.xixibackup.me:8080/user/test/data/his/data/list/${this.props.clientId}/${this.state.page}`;
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
    testTempo = (a)=>{
        console.log('临时按钮：');
        console.log(a);
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
              title: '周期开始时间',
              dataIndex: 'startDate',
              align:'center',
              render: text => <a>{text}</a>,
            },
            {
                title: '周期结束时间',
                align:'center',
                dataIndex: 'endDate',
              },
            {
                title: '操作',
                align:'center',
                width:'600px',
                render:(a)=>(
                    <div> 
                        {/* <Button onClick={()=>{console.log(data)}} >测试</Button> */}
                        <TestTime {...this.state} {...a}></TestTime>
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
                        历史测试数据
                    </Button>
                    {/* <span>{this.props.userName}</span> */}
                   
                </div>
                <Modal
                    title="历史测试数据"
                    visible={this.state.visible}
                    onOk={handleOk}
                    okText='提交'
                    confirmLoading={this.state.confirmLoading}
                    onCancel={handleCancel}
                    cancelText='取消'
                    width='1400px'
                >  
                    {/* <Button 
                    onClick={()=>this.testTempo(this.props)}>
                        测试按钮
                    </Button> */}
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