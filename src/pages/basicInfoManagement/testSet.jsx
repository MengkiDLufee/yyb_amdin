import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form,} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';
import httpRequest from "../../http";

const { Option } = Select;
const { TextArea } = Input;




export default class TestSet extends Component {
    //初始化
    constructor(props) {
        super(props);

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
                //data:data,
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
        if(this.state.testSet!==''){
            params.testSetName=this.state.testSet;
        }
        params.page=1;
        params.pageSize=10;
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
            pageSize:10,
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
        let data=Object.assign({},this.state.currentItem,{
            key: record.key,
            testSetName:record.testSetName,
            insertDate:record.insertDate,
            description:record.description,
            testSetId:record.testSetId,
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
            testSetId:record.testSetId
        }
        httpRequest('post','/test/remove',params)
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
        console.log("0添加1修改",flag)

        //获取当前时间
        var date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let hour=date.getHours();
        let minute=date.getMinutes();
        let second=date.getSeconds();
        let data=Object.assign({},this.state.currentItem,{
            key:key,
            testSetName:this.state.currentItem.testSetName,
            description:this.state.currentItem.description,
            insertDate:`${year}-${month}-${day} ${hour}:${minute}:${second}`,
        })
        console.log("修改为/添加", data)
        const modifyData = [...this.state.data];
        //修改
        if(flag===1){
            modifyData.forEach((item,index) => {
                if (item.key === this.state.currentItem.key) {
                    let params={
                        testSetId:item.testSetId,
                        testSetName:this.state.currentItem.testSetName,
                        description:this.state.currentItem.description,
                    }
                    console.log("修改参数",params)
                    httpRequest('post','/test/modify',params)
                        .then(response=>{

                            console.log(response)
                            if(response.data.code===1004){
                                modifyData.splice(index, 1,data);
                                {
                                    this.setState({
                                        data: modifyData,
                                        //ES6中键和值相等时可直接写成list
                                    })
                                    setTimeout(() => {
                                        this.setState({
                                            loading:false,
                                            addVisible: false,
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

                            }
                        }).catch(err => {
                        console.log(err);
                    })
                }
            })

        }
        //添加
        else{
            let params={
                testSetName:this.state.currentItem.testSetName,
                description:this.state.currentItem.description,
            }
            httpRequest('post','/test/add',params)
                .then(response=>{
                    console.log(response)
                    if(response.data.code===1002){
                        data.testSetId=response.data.testSetId;
                        modifyData.push(data);
                        {
                            this.setState({
                                data: modifyData,
                                //ES6中键和值相等时可直接写成list
                            })
                            setTimeout(() => {
                                this.setState({
                                    loading:false,
                                    addVisible: false,
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

                    }
                }).catch(err => {
                console.log(err);
            })
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
        else{
            this.setState({
                currentItem:Object.assign(this.state.currentItem,{[name]:value})
            })
        }


    }

    //表格分页
    onChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });

        let params={
            page:page,
            pageSize:10,
        }
        httpRequest('post','/test/list',params)
            .then(response=>{
                console.log(response)
                if(response.data!==[]){
                    this.setState({
                        data:response.data,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    };


    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

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
                        rowSelection={rowSelection}
                        dataSource={this.state.data}
                        rowKey={record => record.key}
                        bordered={true}
                        style={{margin:'20px 0'}}
                        pagination={{
                            position: ['bottomLeft'] ,
                            total:'this.total',
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
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            添加
                        </Button>,
                    ]}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="测试集名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.testSetName}
                                   name="testSetName"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="描述"
                                   rules={[{required:true}]}>
                            <TextArea value={this.state.currentItem.description}
                                   name="description"
                                   onChange={this.inputOnChange}
                                   autoSize={{ minRows: 3, maxRows: 5 }}
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改测试集"
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
                            <Form.Item label="测试集名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.testSetName}
                                       name="testSetName"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="描述"
                                       rules={[{required:true}]}>
                                <TextArea value={this.state.currentItem.description}
                                       name="description"
                                       onChange={this.inputOnChange}
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
