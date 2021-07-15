import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Space, Modal, Form, Popconfirm} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import httpRequest from "../../http";
import {loadDataUnitManagement,deleteDataUnitManagement,modifyDataUnitManagement,addDataUnitManagement} from "../../api/basic/unitManagementInterface"
import {loadDataProjectType} from "../../api/basic/projectTypeInterface";




export default class UnitManagement extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.form_modify = React.createRef();
        this.handleAdd=this.handleAdd.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);

    }

    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:[],
        //总数据数
        total:null,
        //分页
        currentPage:1,
        pageSize:10,
	    //搜索框
        unitName:'',

        //修改
        currentItem:{
            key: null,
            unitId:null,
            unitCode: '',
            unitName:'',
            insertDate: '',
        },
    };

    //表格列头
    columns = [
        {
            title: '单位编码',
            dataIndex: 'unitCode',
            sorter: (a,b) => a.unitCode.length - b.unitCode.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '单位名称',
            dataIndex: 'unitName',
            sorter: (a,b) => a.unitName.length - b.unitName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '插入时间',
            dataIndex: 'insertDate',
            sorter:(a,b)=>{
                let atimeString=a.insertDate;
                let btimeString=b.insertDate;
                let atime=new Date(atimeString).getTime();
                let btime=new Date(btimeString).getTime();
                return atime-btime;
            },
            sortDirections: ['descend','ascend'],
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                       <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Popconfirm title="确定删除？"
                                onConfirm={()=>{this.handleDelete(record)}}
                                onCancel={()=>{}}
                                okText="确定"
                                cancelText="取消"
                    >
                        <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                                //onClick={()=>{this.handleDelete(record)}}
                        >删除</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    //初始页面请求数据
    componentDidMount() {
        let params={
            page:1,
            pageSize:this.state.pageSize,
        }
        //请求数据
        let promise=loadDataUnitManagement(params);
        promise.then(resolved=>{
            this.setState({
                data:resolved[0],
                total:resolved[1],
                currentPage:resolved[2]
            })
        },reason => {
            console.error(reason)
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
                unitName:'',
                currentPage:1,

                //修改
                currentItem:{
                    key: null,
                    unitId:null,
                    unitCode: '',
                    organization:'',
                    insertTime: '',
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
        if(this.state.unitName!==""){
            params.unitName=this.state.unitName;
        }
        params.page=1;
        params.pageSize=this.state.pageSize;
        let promise=loadDataUnitManagement(params);
        promise.then(resolved=>{
            this.setState({
                data:resolved[0],
                total:resolved[1],
                currentPage:resolved[2]
            })
        },reason => {
            console.error(reason)
        })
    }

    //重置
    reset(){
        console.log("重置")
        let params={
            page:1,
            pageSize:this.state.pageSize,
        }
        let promise=loadDataUnitManagement(params);
        promise.then(resolved=>{
            this.setState({
                data:resolved[0],
                total:resolved[1],
                currentPage:resolved[2]
            })
        },reason => {
            console.error(reason)
        })
        this.setState({
            currentItem:{
                key: null,
                unitCode: '',
                organization:'',
                insertTime: '',
            },
            //搜索框
            unitName:'',
            currentPage:1,
        });
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
                unitCode:record.unitCode,
                unitName:record.unitName
            })
        }
    }

    //删除某一行
    handleDelete=(record)=>{
        console.log('删除',record)
        let params={
            unitId:record.unitId
        }
        let res=deleteDataUnitManagement(params,this.state.currentPage,this.state.pageSize,this.state.total)
        res.then(resolved=>{
            this.setState({
                data:resolved[0],
                total:resolved[1],
                currentPage:resolved[2],
            })
        },reason => {
            console.error(reason)
        })
    }

    //modal点击确认
    handleOk = () => {
        let form = this.form.current;
        let form_modify=this.form_modify.current;
        this.setState({
            loading:true
        })
        //修改
        if(this.state.modifyVisible){
            console.log("进入修改")
            form_modify.validateFields()//表单输入校验
                .then((values) => {
                    console.log("form_modify",values)
                    this.setState({
                        loading: true,
                    });
                    let params={
                        unitId:this.state.currentItem.unitId,
                        unitCode:values.unitCode,
                        unitName:values.unitName,
                    }
                    modifyDataUnitManagement(params,this.state.currentPage,this.state.pageSize)
                        .then(resolved=>{
                            this.setState({
                                data:resolved,
                            })
                            setTimeout(() => {
                                form.resetFields();
                                this.setState({
                                    loading: false,
                                    addVisible: false,
                                    currentItem:{
                                        key: null,
                                        unitId:null,
                                        unitCode:'',
                                        unitName:'',
                                        insertDate:'',
                                    },
                                });
                            }, 1000);
                        })
                        .catch(err => {
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
                            unitCode: values.unitCode,
                            unitName: values.unitName,
                        }
                    let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                    let page=Math.ceil(cu_page)
                    addDataUnitManagement(params,page,this.state.pageSize)
                        .then(resolved=>{
                            console.log(resolved)
                            this.setState({
                                data:resolved[0],
                                total:resolved[1],
                                currentPage:page
                            })
                            setTimeout(() => {
                                form.resetFields();
                                this.setState({
                                    loading: false,
                                    addVisible: false,
                                    currentItem:{
                                        key: null,
                                        unitId:null,
                                        unitCode:'',
                                        unitName:'',
                                        insertDate:'',
                                    },
                                });
                                }, 1000);
                        })
                            .catch(err => {
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
            currentItem:{
                key: null,
                unitId:null,
                unitCode:'',
                unitName:'',
                insertDate:'',
            },
        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="unitName"){
            console.log("进到搜索框了")
            this.setState({
                unitName:value
            })
        }
    }
    //表格分页
    onChange = page => {
        console.log("翻页",page);
        let params={
            page:page,
            pageSize:this.state.pageSize,
        }
        let promise=loadDataUnitManagement(params);
        promise.then(resolved=>{
            this.setState({
                data:resolved[0],
                total:resolved[1],
                currentPage: page,
            })
        },reason => {
            console.error(reason)
        })
    };

    form = React.createRef();

    render() {
        const { loading } = this.state;
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
                    <Col span={4}>
                        <Input  placeholder="单位名称"
                                value={this.state.unitName}
                                name="unitName"
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
                    <Col span={14} >

                    </Col>
                </Row>
                <div>
                    <Table
                        columns={this.columns}
                        rowKey={record => record.key}
                        dataSource={this.state.data}
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
                    title="添加单位管理数据"
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
                        <Form.Item label="单位编码"
                                   name="unitCode"
                                   rules={[
                                       {required:true,
                                       message:"单位编码不能为空"}]}>
                            <Input placeholder="请输入单位编码"
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="单位名称"
                                   name="unitName"
                                   rules={[{required:true,
                                   message:"单位名称不能为空"}]}>
                            <Input placeholder="请输入单位名称"
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改单位管理数据"
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
                    ]}>
                    <div>
                        <Form {...formItemLayout}
                              name="modify"
                              ref={this.form_modify}>
                            <Form.Item label="单位编码"
                                       name="unitCode"
                                       rules={[{required:true,message:"单位编码不能为空"}]}>
                                <Input allowClear/>
                            </Form.Item>
                            <Form.Item label="单位名称"
                                       name="unitName"
                                       rules={[{required:true,message:"单位名称不能为空"}]}>
                                <Input allowClear/>
                            </Form.Item>

                        </Form>
                    </div>

                </Modal>
            </div>
        )
    }
}
