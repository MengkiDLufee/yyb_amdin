import React, { Component } from 'react'
import { Table, Button, Input, Row, Col, Select, Space, Modal, Form ,Divider } from 'antd';
import { PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import httpRequest from "../../http";
import { Switch } from 'antd';
import UserMsg from "./Modal/userMsg"

const { Option } = Select;
export default class UserBasicInfoManagement extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        //
        mode:'show',
        modalShow:true,
        searchMsg:{
            userId: '',
            userName: '',
            maleAge: '',
            femaleAge: '',
            lastTime: '',
            physiologicalCycle: '',
            registerTime: '',
            key:0
        },
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
        ],//表格数据源
        loading:false,
        selectedRowKeys: [],
        currentItem: {
            key: null,
            planTypeId: null,//计划类型Id
            planTypeCode: '',//计划类型code"normal"普通  "prelayegg" 起峰前
            testTypeName: '',//测试类型名称
            planTypeName: '',//计划类型名称
            planTypeValue: null,//计划类型实际值
            timeout: null,//超时时间
        },
    }
    

    //表格列名
    test2 =()=>{
        console.log('a');
    }
    test =(a,b)=>{
        console.log(a);
        console.log(b);
    }
    changeModal =()=>{
       this.setState(
           {
            mode:'update'
           }
       )
       console.log('父组件'+this.state.mode);
    }
  
    showModal = () =>{
        if(this.state.modalShow){return(
            <UserMsg {...this.state.dataSource[0]}{...{mode:'update'}}></UserMsg>
        )}
        else{
            return null
        }
    };
    
    columns = [
        {
            title: '用户名',
            dataIndex: 'key',
            align:'center',
            //a这里等于userId b等于某项data
            render: (a, b) => (
                <div>
                    <UserMsg {...this.state.dataSource[0]}{...{mode:'show'}}></UserMsg>
                </div>
            ),
            sorter: (a, b) => a.userId - b.userId,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '用户昵称',
            dataIndex: 'userName',
            align:'center',
            sorter: (a, b) => a.userName.length - b.userName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '男方年龄',
            dataIndex: 'manAge',
            width:'100px',
            align:'center',
            sorter: (a, b) => a.manAge - b.manAge,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '女方年齡',
            dataIndex: 'womanAge',
            width:'100px',
            align:'center',
            sorter: (a, b) => a.womanAge - b.womanAge,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '上次月经时间',
            dataIndex: 'lastBleeding',
            width:'170px',
            align:'center',
            sorter: (a, b) => a.lastBleeding - b.lastBleeding,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '生理周期',
            dataIndex: 'cycle',
            align:'center',
            sorter: (a, b) => a.cycle - b.cycle,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '注册时间',
            dataIndex: 'regTime',
            align:'center',
            sorter: (a, b) => a.regTime - b.regTime,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '终止优孕保测试',
            dataIndex: 'eupregnaEnded',
            align:'center',
            sorter: (a, b) => a.eupregnaEnded - b.eupregnaEnded,
            sortDirections: ['descend', 'ascend'],
            render: (a, b) => (
                <div>
                    <Switch 
                    defaultChecked={b.eupregnaEnded}
                    checkedChildren="是" unCheckedChildren="否"
                    onChange={(e)=>{
                        this.changeTest(e,b,0)
                    }} />
                </div>
            ),
        },
        {
            title: '上传日志',
            dataIndex: 'uploadLogFlag',
            align:'center',
            sorter: (a, b) => a.uploadLogFlag - b.uploadLogFlag,
            sortDirections: ['descend', 'ascend'],
            render: (a, b) => (
                <div>
                    <Switch 
                    style={{backgroundColor:'#5FB878'}} 
                    defaultChecked={b.uploadLogFlag}
                    checkedChildren="是" unCheckedChildren="否"
                    onChange={(e)=>{
                        this.changeTest(e,b)
                    }} />
                </div>
            ),
        },
        {
            title:'操作',
            align:'center',
            render: (a, b) => (
                <div>
                    <Button type="primary" style={{backgroundColor:'grey',borderColor:'grey',opacity:'0.3',color:'white',marginRight:'5px'}}
                        onClick={()=>this.changeModal()}
                    >
                        修改
                    </Button>
                    <Button type="primary" danger>
                        删除
                    </Button>
                </div>
            ),
        }
    ];

    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      };
    changeTest = (e,b,mode) =>{
        // var copyData={...this.state.dataSource}
        // copyData[b.key].eupregnaEnded=e;
        // console.log(copyData);
        console.log(e);
        console.log(b);
        var c=e==true?0:1;
        console.log(c)
        var url1=`http://java.xixibackup.me:8080/user/base/test/stop/${b.clientId}/0/${c}`
        var url2=`http://java.xixibackup.me:8080/user/base/log/update/${b.clientId}/${c}`
        if(mode=0){
            httpRequest('get',url1).then(response=>{
                console.log(response.data)
                });
        }
        if(mode=1){
            httpRequest('get',url2).then(response=>{
                console.log(response.data)
                });
        }
    };
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys 变为: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
  
    
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,//不加这句 start以后不会消除
        onChange: this.onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',//禁止选取准则
            name: record.name,
        }),
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                
                {/* 操作栏 */}
                <Row justify="space-between" gutter="15" style={{display:"flex"}}  >
                    <Col span={3} >
                        <Input placeholder="用户名"
                                onChange={this.start}
                                name="userId"
                                value={this.state.searchMsg.userId}
                            allowClear/>
                    </Col>
                    <Col span={4}>
                        <Input  placeholder="用户昵称"
                                value={this.state.searchMsg.userName}
                                name="userName"
                                onChange={this.start}
                                allowClear/>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={this.search}><SearchOutlined />搜索</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.reset}><ReloadOutlined />重置</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.handleAdd}><PlusSquareOutlined />新增</Button>
                    </Col>
                    <Col span={11} >

                    </Col>
                </Row>
                {/*修改的按钮 div被隐藏 通过控制mode弹出修改窗*/}
                <div style={{visibility:'hidden' }}>
                <UserMsg {...this.state.dataSource[0]} {...{mode:this.state.mode}}  

                ></UserMsg>
                </div>
                <Divider />
               
                {/* 表格栏 */}
                <Table 
                    rowSelection={{type:'checkbox',...rowSelection,}}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    bordered
                    size="middle"
                    scroll={{y: 800 }}
                />
                 <div >
                    <div>
                    <span   style={{ marginLeft: 8 }}>
                        {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
                    </span>
                    </div>
                </div>

            </div>
        )
    }
    
}
