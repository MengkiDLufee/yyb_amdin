import React, { Component } from 'react'
import {Table, Button, Input, Row, Col , Space, Modal, Form,} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';
import httpRequest from "../../http";

const { TextArea } = Input;


export default class TestSet extends Component {
    //初始化
    constructor(props) {
        super(props);

         //该方法返回一个ref 对象， 通过ref 属性绑定该对象，该对象下的current 属性就指向了绑定的元素或组件对象
        this.form_modify = React.createRef();
        this.handleAdd=this.handleAdd.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);
    }
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
        testSet:'',
        //修改
        currentItem:{
            key: null,
            testSetName:'',
            insertDate:'',
            description:'',
            testSetId:null,
        },
    };
//表格列头
    columns = [
        {
            title: '测试集名称',
            dataIndex: 'testSetName',
            sorter: (a,b) => a.testSetName.length - b.testSetName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '创建时间',
            dataIndex: 'insertDate',
            sorter:(a,b)=>{
                let atimeString=a.insertDate;
                let btimeString=b.insertDate;
                let atime=new Date(atimeString).getTime();
                let btime=new Date(btimeString).getTime();
                return atime-btime;
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="large">
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleModify(record)}}

                    >修改</Button>
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
            pageSize:this.state.pageSize,
        }
        httpRequest('post','/test/list',params)
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
                    }
                    this.setState({
                        data:tempData
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
                testSet:'',
                currentPage:1,
                //修改
                currentItem:{
                    key: null,
                    testSetName:'',
                    insertDate:'',
                    description:'',
                    testSetId:null,
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
        if(this.state.testSet!==''){
            params.testSetName=this.state.testSet;
        }
        params.page=1;
        params.pageSize=this.state.pageSize;
        console.log(params)
        httpRequest('post','/test/list',params)
            .then(response=>{
                console.log(response)
                if(response.data!==[]){
                    this.setState({
                        data:response.data.data.info,
                        total:response.data.data.total,
                    })
                }
            }).catch(err => {
            console.log(err);
        })
        console.log(params);
    }

    //重置
    reset(){
        console.log("重置")
        let params={
            page:1,
            pageSize:this.state.pageSize,
        }
        httpRequest('post','/test/list',params)
            .then(response=>{
                console.log(response)
                if(response.data!==[]){
                    this.setState({
                        data:response.data.data.info,
                        total:response.data.data.total,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        this.setState({
            currentItem:{
                key: null,
                testSetName:'',
                insertDate:'',
                description:'',
                testSetId:null,
            },
            //搜索框
            testSet:'',
            //当前页
            currentPage:1,
        });
        console.log(this.state)

    }

    //修改
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
             testSet:record.testSetName,
             description:record.description
         })
     }
    }

    //删除某一行
    handleDelete=(record)=>{
        console.log('删除',record)
        let params={
            testSetId:record.testSetId
        }
        httpRequest('post','/test/remove',params)
            .then(response=>{
                console.log(response)
                if(response.data.code===1006){
                    let params={
                        page:this.state.currentPage,
                        pageSize:this.state.pageSize,
                    }
                    httpRequest('post','/test/list',params)
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
                    alert("无法删除与当前测试集有关的数据！")
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
                        testSetId:this.state.currentItem.testSetId,
                        testSetName:values.testSet,
                        description:values.description,
                    }
                    httpRequest('post','/test/modify',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1004){
                                let inital_param={
                                    page:this.state.currentPage,
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/test/list',inital_param)
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
                                            //addVisible: false,
                                            modifyVisible: false,
                                            currentItem:{
                                                key: null,
                                                testSetName:'',
                                                insertDate:'',
                                                description:'',
                                                testSetId:null,
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
                            testSetName: values.testSetName,
                            description: values.description,
                        }
                        httpRequest('post', '/test/add', params)
                            .then(response => {
                                console.log(response)
                                if (response.data.code === 1002) {
                                    let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                                    let inital_params={
                                        page:Math.ceil(cu_page),
                                        pageSize:this.state.pageSize,
                                    }
                                    httpRequest('post','/test/list',inital_params)
                                        .then(response=>{
                                            console.log("初始化",response)
                                            if(response.data!==[]) {
                                                this.setState({
                                                    data: response.data.data.info,
                                                    total: response.data.data.total,
                                                })
                                                const tempData=[...this.state.data];
                                                for(let i=0;i<tempData.length;i++){
                                                    tempData[i].key=i+this.state.pageSize*(inital_params.page-1);
                                                }
                                                this.setState({
                                                    data:tempData,
                                                    currentPage:inital_params.page
                                                })
                                            }
                                        }).catch(err => {
                                        console.log(err);
                                    })
                                        setTimeout(() => {
                                            form.resetFields();
                                            this.setState({
                                                loading: false,
                                                addVisible: false,
                                                //modifyVisible: false,
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
            currentItem:{
                key: null,
                testSetName:'',
                insertDate:'',
                description:'',
            },

        });
    };

//输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="testSet"){
            console.log("进到搜索框了")
            this.setState({
                testSet:value
            })
        }
    }

    //表格分页
    onChange = (page) => {
        console.log("翻页",page);
        this.setState({
            currentPage: page,
        });

        let params={
            page:page,
            pageSize:this.state.pageSize,
        }
        httpRequest('post','/test/list',params)
            .then(response=>{
                console.log(response.data.data.info)
                if(response.data.data.info!==[]){
                    this.setState({
                        data:response.data.data.info,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    };

//该方法返回一个ref 对象， 通过ref 属性绑定该对象，该对象下的current 属性就指向了绑定的元素或组件对象
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
                    <Col span={6}>
                        <Input  placeholder="测试集名称"
                                value={this.state.testSet}
                                name="testSet"
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
                    <Col span={12} >
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
                    title="添加测试集"
                    visible={this.state.addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                提交
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>]}>
                    <Form
                        {...formItemLayout}
                        name="add"
                        ref={this.form}>
                        <Form.Item label="测试集名称"
                                   name="testSetName"
                                   rules={[
                                       {required:true, message:'测试集不能为空',
                                        },
                                   ]}//设置验证规则
                            >
                            <Input allowClear/>
                        </Form.Item>
                        <Form.Item label="描述"
                                   name="description">
                            <TextArea placeholder="请输入描述"
                                      autoSize={{ minRows: 3, maxRows: 5 }}
                                      allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改测试集"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                提交
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
                            <Form.Item label="测试集名称"
                                       name="testSet"
                                       rules={[
                                           {required:true,message:'测试集不能为空'},
                                       ]}//设置验证规则
                            >
                                <Input allowClear/>
                            </Form.Item>
                            <Form.Item label="描述"
                                       name="description">
                                <TextArea
                                       autoSize={{ minRows: 3, maxRows: 5 }}
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>

            </div>
        )
    }
}
