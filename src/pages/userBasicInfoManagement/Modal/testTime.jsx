import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
 import httpRequest from "../../../http";
import '../index.css'
import TestDataDetails from "./testDataDetails"
import HisTestDataDetail from "./hisTestDataDetail"
//使用接口：### 2.1.11 查看该历史周期下的测试类型   http://java.xixibackup.me:8080/user/test/data/his/cycle/list/{clientId}/{cycleId}/{page}/{pageSize}
//clientId为this.props.data.clientId
//cycleId为this.props.eupregnaTestCycleHisId
export default class testTime extends Component {
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
        pageSize:1,
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
            }
        ]
    };

    componentDidMount(){
        console.log(this.state.data);
        console.log(this.props);
        var url=`http://java.xixibackup.me:8080/user/test/data/his/cycle/list/${this.props.data.clientId}/${this.props.eupregnaTestCycleHisId}/${this.state.page}/${this.state.pageSize}`;
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
              title: '测试类型',
              dataIndex: 'testType',
              align:'center',
              render: text => <a>{text}</a>,
            },
            {
                title: '测试次数',
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
                        <HisTestDataDetail {...this.state }></HisTestDataDetail>
                        
                    </div>
                )
              },
          ];
          
        return (
            
            <div>
              
                
                <Button type="primary" danger style={{display:'inline-block'}}
                     onClick={showModal}>
                        查看
                    </Button>
                <Modal
                    title="测试次数"
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
                        测试数据
                    </Button> */}


                    <div className="site-input-group-wrapper">
                    <span  style={{marginRight:'15px'}}>
                    用户名</span> 
                    
                    <span style={{marginRight:'15px'}}
                    >{this.props.userName}</span>
                    </div>
                    <div className="site-input-group-wrapper">
                    <span  style={{marginRight:'25px'}}>
                    时间</span> 
                    
                    <span style={{marginRight:'15px'}}
                    >{this.props.startDate}</span>
                    ——
                    <span style={{marginRight:'10px'}}
                    ></span>
                    <span style={{marginRight:'15px'}}
                    >{this.props.endDate}</span>
                    </div>
                    <Table columns={columns} dataSource={this.state.testData} />
                </Modal>
            </div>
        )
    }
}