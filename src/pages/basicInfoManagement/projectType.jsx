import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space,Modal,Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import httpRequest from "../../http";

const { Option } = Select;

export default class ProjectType extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.form_modify = React.createRef();
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
        total:null,
        currentPage:1,
        pageSize:10,
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
        httpRequest('post','/test/type/list',{})
            .then(response=>{
                console.log("请求测试类型",response)
                if(response.data!==[]) {
                    this.setState({
                        testTypeGroup: response.data.data.info,
                    })
                    console.log("测试类型",this.state.testTypeGroup)

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
        params.page=1;
        params.pageSize=this.state.pageSize;
        console.log(params);
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
    }

    //重置
    reset(){
        console.log("重置")
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
        let param={}
        httpRequest('post','/test/type/list',param)
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
            this.setState({
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
                testTypeId:null,
                currentPage:1,
            });
        console.log(this.state)

    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
    
        this.setState({
            modifyVisible:true,
            currentItem:record,
        },
        ()=>console.log(this.state.currentItem)
        );
        let form_modify=this.form_modify.current;
        if(this.form_modify.current){
            form_modify.setFieldsValue({
                testTypeId:record.testTypeId,
                planTypeCode:record.planTypeCode,
                testTypeName:record.testTypeName,
                planTypeName:record.planTypeName,
                planTypeValue:record.planTypeValue,
                timeout:record.timeout
            })
        }

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
                    let params={
                        page:this.state.currentPage,
                        pageSize:this.state.pageSize,
                    }
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
                                    tempData[i].key=this.state.currentPage*params.pageSize+i;
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
                }
                else{
                    alert("删除失败，请稍后再试")
                }
            }).catch(err => {
            console.log(err);
        })
    }

    //modal点击确认
    handleOk = e => {
        let form = this.form.current;
        let form_modify=this.form_modify.current;
        this.setState({
            loading: true,
        });

        //修改
        if(this.state.modifyVisible){
            console.log("进入修改")
            form_modify.validateFields()//表单输入校验
                .then((values) => {
                    console.log("form_modify",values)
                    this.setState({
                        loading: true,
                    });
                    // values.planTypeCode=form_modify.getFieldsValue('planTypeCode');
                    // console.log("lll",values.planTypeCode);
                    if(values.planTypeCode==="普通"){
                        values.planTypeCode="normal";
                    }
                    if(values.planTypeCode==="起峰前"){
                        values.planTypeCode="prelayegg";
                    }
                    let params={
                        planTypeId:this.state.currentItem.planTypeId,
                        planTypeCode:values.planTypeCode,
                        testTypeId:values.testTypeId,
                        planTypeName:values.planTypeName,
                        planTypeValue:values.planTypeValue,
                        timeout:values.timeout
                    }
                    console.log("params",params)
                    httpRequest('post','/plan/modify',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1004){
                                let inital_param={
                                    page:this.state.currentPage,
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/plan/list',inital_param)
                                    .then(response=>{
                                        console.log(response.data.data)
                                        if(response.data!==[]) {
                                            this.setState({
                                                data: response.data.data.info,
                                                total: response.data.data.total,
                                            })
                                            const tempData=[...this.state.data];
                                            for(let i=0;i<tempData.length;i++){
                                                tempData[i].key=this.state.currentPage*inital_param.pageSize+i;
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
                                setTimeout(() => {
                                    form_modify.resetFields();
                                    this.setState({
                                        loading:false,
                                        modifyVisible: false,
                                        testTypeId:null,
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
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }
        //添加
        if(this.state.addVisible){
            console.log("进入添加")
            console.log("form",form)
            form.validateFields()//触发表单验证
                .then((values) => {
                        console.log("form validate", values)
                        let params = {
                            planTypeCode:values.planTypeCode,
                            testTypeId:values.testTypeId,
                            planTypeName:values.planTypeName,
                            planTypeValue:values.planTypeValue,
                            timeout:values.timeout
                        }
                        httpRequest('post', '/plan/add', params)
                            .then(response => {
                                console.log(response)
                                if (response.data.code === 1002) {
                                    let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                                    let inital_params={
                                        page:Math.ceil(cu_page),
                                        pageSize:this.state.pageSize,
                                    }
                                    httpRequest('post','/plan/list',inital_params)
                                        .then(response=>{
                                            console.log("初始化",response,inital_params)
                                            if(response.data!==[]) {
                                                this.setState({
                                                    data: response.data.data.info,
                                                    total: response.data.data.total,
                                                })
                                                const tempData=[...this.state.data];
                                                for(let i=0;i<tempData.length;i++){
                                                    tempData[i].key=i+this.state.pageSize*(inital_params.page-1);
                                                    if(tempData[i].planTypeCode==="normal"){
                                                        tempData[i].planTypeCode='普通';
                                                    }
                                                    else{
                                                        tempData[i].planTypeCode='起峰前';
                                                    }
                                                }
                                                this.setState({
                                                    data:tempData,
                                                    currentPage:inital_params.page
                                                })
                                            }
                                        }).catch(err => {
                                        console.log(err);
                                    })
                                    {
                                        setTimeout(() => {
                                            form.resetFields();
                                            this.setState({
                                                loading: false,
                                                addVisible: false,
                                                testTypeId:null,
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
                                    }

                                }
                            }).catch(err => {
                            console.log(err);
                        })
                    }
                )
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
    }

    //选择框变化
    handleChange(value) {
        console.log(`选择框变化 ${value}`);
        this.setState({
            testTypeId:value,
        })
    }

    //选择框内容
    option(){
        return(
            this.state.testTypeGroup.map((item)=>{
                return(<Option value={item.testTypeId}>{item.testTypeName}</Option>)
            })
        )
    }

    //表格分页
    onChange = page => {
        console.log("翻页",page);
        this.setState({
            currentPage: page,
        });

        let params={
            page:page,
            pageSize:this.state.pageSize,
        }
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
    };

    form = React.createRef();

    render() {
        const { loading, selectedRowKeys } = this.state;

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
                    <Col span={3} >
                        <Select placeholder="请选择测试类型"
                                onChange={this.handleChange}
                                value={this.state.testTypeId}>
                            {this.option()}
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
                    <Col span={11} >

                    </Col>
                </Row>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        rowKey={record => record.key}
                        bordered={true}
                        style={{margin:'20px 0'}}
                        pagination={{
                            position: ['bottomLeft'] ,
                            total:this.state.total,
                            showTotal:total => `共 ${total} 条`,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            current:this.state.currentPage,
                            onChange:this.onChange,
                        }}
                    />
                </div>
                <Modal
                    title="添加计划类型数据"
                    visible={this.state.addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                添加
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <Form
                        {...formItemLayout}
                        name="add"
                        ref={this.form}>
                        <Form.Item label="计划类型"
                                   name="planTypeCode">
                            <Select placeholder="请选择计划类型">
                                <Option value="normal">普通</Option>
                                <Option value="prelayegg">起峰前</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="测试类型"
                                   name="testTypeId">
                            <Select placeholder="请选择测试类型"
                                   // onChange={this.handleChange}
                                    value={this.state.testTypeId}>
                                {this.option()}
                            </Select>
                        </Form.Item>
                        <Form.Item label="计划类型名称"
                                   name="planTypeName">
                            <Input placeholder="请输入计划类型名称" allowClear/>
                        </Form.Item>
                        <Form.Item label="计划类型实际值"
                                   name="planTypeValue"
                                   rules={[{
                                       pattern: /^[0-9]+$/,
                                       message:'请输入数字'}]}>
                            <Input placeholder="请输入计划类型实际值" allowClear/>
                        </Form.Item>
                        <Form.Item label="超时时间"
                                   name="timeout"
                                   rules={[{
                                       pattern: /^[0-9]+$/,
                                       message:'请输入数字'}]}>
                            <Input placeholder="请输入超时时间" allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改计划类型数据"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                修改
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}
                >
                    <div>
                        <Form {...formItemLayout}
                              name="modify"
                              ref={this.form_modify}>
                            <Form.Item label="计划类型"
                                       name="planTypeCode">
                                <Select placeholder="请选择计划类型">
                                    <Option value="normal">普通</Option>
                                    <Option value="prelayegg">起峰前</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="测试类型"
                                       name="testTypeId">
                                <Select placeholder="请选择测试类型"
                                       // onChange={this.handleChange}
                                        //value={this.state.testTypeId}
                                >
                                    {this.option()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="计划类型名称"
                                       name="planTypeName">
                                <Input placeholder="请输入计划类型名称" allowClear/>
                            </Form.Item>
                            <Form.Item label="计划类型实际值"
                                       name="planTypeValue"
                                       rules={[{
                                           pattern: /^[0-9]+$/,
                                           message:'请输入数字'}]}>
                                <Input placeholder="请输入计划类型实际值" allowClear/>
                            </Form.Item>
                            <Form.Item label="超时时间"
                                       name="timeout"
                                       rules={[{
                                           pattern: /^[0-9]+$/,
                                           message:'请输入数字'}]}>
                                <Input placeholder="请输入超时时间" allowClear/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}