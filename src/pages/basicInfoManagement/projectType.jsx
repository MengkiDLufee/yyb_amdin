import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space,Modal,Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import httpRequest from "../../http";

const { Option } = Select;
const { TextArea } = Input;




export default class ProjectType extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    //参数设置
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:[],
        //测试类型名称
        testTypeGroup:[],
        //搜索框
        searchplanTypeName:'',
        testTypeId:null,

        //修改
        currentItem:{
            key: null,
            planTypeId:null,//计划类型Id
            planTypeCode:'',//计划类型code"normal"普通  "prelayegg" 起峰前
            testTypeName:'',//测试类型名称
            planTypeName:'',//计划类型名称
            planTypeValue:null,//计划类型实际值
            timeout:null,//超时时间
        },
    };

    //表格列名
    columns = [
        {
            title: '计划类型',
            dataIndex: 'planTypeCode',
            sorter: (a,b) => a.planTypeCode.length - b.planTypeCode.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '测试类型',
            dataIndex: 'testTypeName',
            sorter: (a,b) => a.testTypeName.length - b.testTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '计划类型名称',
            dataIndex: 'planTypeName',
            sorter: (a,b) => a.planTypeName.length - b.planTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '计划类型实际值',
            dataIndex: 'planTypeValue',
            sorter: (a,b) => a.planTypeValue - b.planTypeValue,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '超时时间',
            dataIndex: 'timeout',
            sorter: (a,b) => a.timeout - b.timeout,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                    onClick={()=>{this.handleDelete(record)}}>删除</Button>
                </Space>
            ),
        },
    ];


    //初始页面请求数据
    componentDidMount() {
        let params={
            page:1,
            pageSize:10,
        }
        //请求数据
        httpRequest('post','/plan/list',params)
            .then(response=>{
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                        if(tempData[i].planTypeCode==="normal"){
                            tempData[i].planTypeCode='普通';
                        }
                        else{
                            tempData[i].planTypeCode='起峰前';
                        }
                    }
                    this.setState({
                        data:tempData
                    })
                }
            }).catch(err => {
            console.log(err);
        })
      //请求测试类型名称
        httpRequest('post','/test/type/list')
            .then(response=>{
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        testTypeGroup: response.data.data.info,
                    })

                }
            }).catch(err => {
            console.log(err);
        })
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
                addVisible:false,
                modifyVisible:false,
                addConfirmLoading:false,
                modifyConfirmLoading:false,
                data:[],
                projectTypeName:'',

                //修改
                currentItem:{
                    key: null,
                    planTypeId:null,//计划类型Id
                    planTypeCode:'',//计划类型code"normal"普通  "prelayegg" 起峰前
                    testTypeName:'',//测试类型名称
                    planTypeName:'',//计划类型名称
                    planTypeValue:null,//计划类型实际值
                    timeout:null,//超时时间
                },
            });
        }, 1000);
    };
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //添加展开modal
    handleAdd(){
        this.setState({
            addVisible:true,
        });
    }

    //搜索
    search(){
        let params={};
        if(this.state.searchplanTypeName!==""){
            params.planTypeName=this.state.searchplanTypeName;
        }
        if(this.state.testTypeId!==null){
            params.testTypeId=this.state.testTypeId;
        }
        console.log(params);
        //console.log(this.state.testTypeId)
    }

    //重置
    reset(){
        console.log("重置")
            this.setState({
                data:[],
                //修改
                currentItem:{
                    key: null,
                    planTypeId:null,//计划类型Id
                    planTypeCode:'',//计划类型code"normal"普通  "prelayegg" 起峰前
                    testTypeName:'',//测试类型名称
                    planTypeName:'',//计划类型名称
                    planTypeValue:null,//计划类型实际值
                    timeout:null,//超时时间
                },
                //搜索框
                searchplanTypeName:'',
                testTypeId:null
            });
        console.log(this.state)

    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key:record.key,
            planTypeId:record.planTypeId,
            planTypeCode:record.planTypeCode,
            testTypeName:record.testTypeName,
            planTypeName:record.planTypeName,
            planTypeValue:record.planTypeValue,
            timeout:record.timeout,
        })
    
        this.setState({
            modifyVisible:true,
            currentItem:data,
        },
        ()=>console.log(this.state.currentItem)
        );

    }

    //删除某一行
    handleDelete=(record)=>{
        console.log('删除',record)
        let params={
            planTypeId:record.planTypeId,
        }
        httpRequest('post','/plan/delete',params)
            .then(response=>{
                console.log(response)
                if(response.data.code===1006){
                    const deleteData=[...this.state.data];
                    console.log("删除项",record.key)
                    deleteData.forEach((item,index) => {
                        if(item.key===record.key){
                            deleteData.splice(index,1);
                        }
                    })
                    this.setState({
                        data:deleteData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })


        // const deleteData=[...this.state.data];
        // console.log("删除项",record.key)
        // deleteData.forEach((item,index) => {
        //     if(item.key===record.key){
        //         deleteData.splice(index,1);
        //     }
        // })
        // this.setState({
        //     data:deleteData,
        //     //ES6中键和值相等时可直接写成list
        // })
    }

    //modal点击确认
    handleOk = e => {
        this.setState({
            loading: true,
            //modifyVisible: true,
        });
        let key=(this.state.currentItem.key!==null) ? this.state.currentItem.key:this.state.data.length;
        let flag=(this.state.currentItem.key!==null) ? 1:0;//0添加1修改
        console.log(flag)
        let data=Object.assign({},this.state.currentItem,{
            key:key,
            planTypeId:this.state.currentItem.planTypeId,
            planTypeCode:this.state.currentItem.planTypeCode,
            testTypeName:this.state.currentItem.testTypeName,
            planTypeName:this.state.currentItem.planTypeName,
            planTypeValue:this.state.currentItem.planTypeValue,
            timeout:this.state.currentItem.timeout,
        })
        console.log("修改为/添加", data)
        const modifyData = [...this.state.data];
        if(flag===1) {
            modifyData.forEach((item, index) => {
                if (item.key === this.state.currentItem.key) {
                    let params = {
                        planTypeId: item.planTypeId,
                        planTypeCode: this.state.currentItem.planTypeCode,
                        testTypeName: this.state.currentItem.testTypeName,
                        planTypeName: this.state.currentItem.planTypeName,
                        planTypeValue: this.state.currentItem.planTypeValue,
                        timeout: this.state.currentItem.timeout,
                    }
                    console.log("修改参数", params)
                    httpRequest('post', '/plan/modify', params)
                        .then(response => {
                            console.log(response)
                            if (response.data.code === 1004) {
                                modifyData.splice(index, 1, data);
                                {
                                    this.setState({
                                        data: modifyData,
                                        //ES6中键和值相等时可直接写成list
                                    })
                                    setTimeout(() => {
                                        this.setState({
                                            loading: false,
                                            addVisible: false,
                                            modifyVisible: false,
                                            currentItem: {
                                                key: null,
                                                testSetName: '',
                                                insertDate: '',
                                                description: '',
                                                testSetId: null,
                                            },

                                        });
                                    }, 1000);
                                }
                            }
                        })
                }
            })
        }
        else{
            modifyData.push(data);
        }

    };
    //关闭modal
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            //修改
            currentItem:{
                key: null,
                planTypeId:null,//计划类型Id
                planTypeCode:'',//计划类型code"normal"普通  "prelayegg" 起峰前
                testTypeName:'',//测试类型名称
                planTypeName:'',//计划类型名称
                planTypeValue:null,//计划类型实际值
                timeout:null,//超时时间
            },
        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        let name=e.target.name;
        let value=e.target.value;
        console.log({[name]:value})
        if(name==="searchplanTypeName"){
            console.log("进到搜索框了")
            this.setState({
                searchplanTypeName:value
            })
        }
        else{
            this.setState({
                currentItem:Object.assign(this.state.currentItem,{[name]:value})
            })
        }


    }

    //选择框变化
    handleChange(value) {
        console.log(`选择框变化 ${value}`);
        this.setState({
            testTypeId:value,
        })
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.onSelectChange,
        };
        

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        };

        return (
            <div>
                <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                    <Col span={4} >
                        <Select placeholder="测试类型"
                                onChange={this.handleChange}
                                value={this.state.testTypeId}
                                allowClear>

                            <Option value="0">测试类型1</Option>
                            <Option value="1">测试类型2</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Input  placeholder="计划类型名称"
                                value={this.state.searchplanTypeName}
                                name="searchplanTypeName"
                                onChange={this.inputOnChange}
                                allowClear/>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={this.search}><SearchOutlined />搜索</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.reset}><ReloadOutlined />重置</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.handleAdd}><PlusSquareOutlined />添加</Button>
                    </Col>
                    <Col span={10} >

                    </Col>
                </Row>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={this.state.data}
                        rowKey={record => record.key}
                        bordered={true}
                        style={{margin:'20px 0'}}
                        pagination={{
                            position: ['bottomLeft'] ,
                            total:'data.length',
                            showTotal:total => `共 ${total} 条`,
                            showQuickJumper:true,
                            showSizeChanger:true
                        }}
                    />
                </div>
                <Modal
                    title="添加计划类型数据"
                    visible={this.state.addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            添加
                        </Button>,
                    ]}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="计划类型">
                            <Input value={this.state.currentItem.planTypeCode}
                                   name="projectType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="测试类型">
                            <Input value={this.state.currentItem.testTypeName}
                                   name="testType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="计划类型名称">
                            <Input value={this.state.currentItem.planTypeName}
                                   name="projectTypeName"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="计划类型实际值">
                            <Input value={this.state.currentItem.planTypeValue}
                                         onChange={this.inputOnChange}
                                         name="projectTypeValue"
                                         allowClear/>
                        </Form.Item>
                        <Form.Item label="超时时间">
                            <Input value={this.state.currentItem.timeout}
                                         onChange={this.inputOnChange}
                                         name="timeout"
                                         allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改计划类型数据"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            修改
                        </Button>,
                    ]}
                >
                    <div>
                        <Form {...formItemLayout}>
                            <Form.Item label="计划类型">
                                <Input value={this.state.currentItem.planTypeCode}
                                       onChange={this.inputOnChange}
                                       name="planTypeCode"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="测试类型">
                                <Input value={this.state.currentItem.testTypeName}
                                       onChange={this.inputOnChange}
                                       name="testTypeName"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="计划类型名称">
                                <Input value={this.state.currentItem.planTypeName}
                                       onChange={this.inputOnChange}
                                       name="planTypeName"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="计划类型实际值">
                                <Input value={this.state.currentItem.planTypeValue}
                                             onChange={this.inputOnChange}
                                             name="planTypeValue"
                                             allowClear/>
                            </Form.Item>
                            <Form.Item label="超时时间">
                                <Input value={this.state.currentItem.timeout}
                                             name="timeout"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}