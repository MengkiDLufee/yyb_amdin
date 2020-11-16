import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space,Modal,Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;



const data = [];

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        projectType: `abc${i}`,
        testType: `功能评估 ${i}`,
        projectTypeName:`24小时计划${i}`,
        projectTypeValue: 12000+i,
        timeout:12000-i,
    });
}




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
        this.onChange=this.onChange.bind(this);
    }
    //参数设置
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:data,
        //搜索框
        planTypeName:'',
        testTypeId:null,
        currentPage:1,

        //修改
        currentItem:{
            key: null,
            projectType: '',
            testType: '',
            projectTypeName:'',
            projectTypeValue:null,
            timeout:null,
        },
    };

    //表格列名
    columns = [
        {
            title: '计划类型',
            dataIndex: 'projectType',
            sorter: (a,b) => a.projectType.length - b.projectType.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '测试类型',
            dataIndex: 'testType',
            sorter: (a,b) => a.testType.length - b.testType.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '计划类型名称',
            dataIndex: 'projectTypeName',
            sorter: (a,b) => a.projectTypeName.length - b.projectTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '计划类型实际值',
            dataIndex: 'projectTypeValue',
            sorter: (a,b) => a.projectTypeValue - b.projectTypeValue,
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
                data:data,
                projectTypeName:'',
                currentPage:1,
                //修改
                currentItem:{
                    key: null,
                    projectType: '',
                    testType: '',
                    projectTypeName:'',
                    projectTypeValue:null,
                    timeout:null,
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
        if(this.state.planTypeName!==""){
            params.planTypeName=this.state.planTypeName;
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
                data:data,
                currentItem:{
                    key: null,
                    projectType: '',
                    testType: '',
                    projectTypeName:'',
                    projectTypeValue:null,
                    timeout:null,
                },
                //搜索框
                planTypeName:'',
                testTypeId:null,
                //当前页
              currentPage:1,
            });
        console.log(this.state)

    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
        key:record.key,
        projectType:record.projectType,
        testType:record.testType,
        projectTypeName:record.projectTypeName,
        projectTypeValue:record.projectTypeValue,
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
        const deleteData=[...this.state.data];
        console.log("删除项",record.key)
        deleteData.forEach((item,index) => {
            if(item.key===record.key){
                deleteData.splice(index,1);
            }
        })
        this.setState({
            data:deleteData,
            //ES6中键和值相等时可直接写成list
        })
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
            projectType:this.state.currentItem.projectType,
            testType:this.state.currentItem.testType,
            projectTypeName:this.state.currentItem.projectTypeName,
            projectTypeValue:this.state.currentItem.projectTypeValue,
            timeout:this.state.currentItem.timeout,
        })
        console.log("修改为/添加", data)
        const modifyData = [...this.state.data];
        if(flag===1){
            modifyData.forEach((item, index) => {
                if (item.key === this.state.currentItem.key) {
                    modifyData.splice(index, 1,data);
                }
            })
        }
        else{
            modifyData.push(data);
        }

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
                    projectType: '',
                    testType: '',
                    projectTypeName:'',
                    projectTypeValue:null,
                    timeout:null,
                },
            });
        }, 1000);
    };
    //关闭modal
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            currentItem:{
                key: null,
                projectType: '',
                testType: '',
                projectTypeName:'',
                projectTypeValue:null,
                timeout:null,
            },
        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="planTypeName"){
            console.log("进到搜索框了")
            this.setState({
                planTypeName:value
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

    //表格分页
    onChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
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
                <Row justify="space-between" gutter="15" style={{display:"flex" }}>
                    <Col span={4} >
                        <Select placeholder="测试类型"
                                onChange={this.handleChange}
                                value={this.state.testTypeId}
                                allowClear
                                className="testTypeId"
                                style={{width:'200px'}}>
                            <Option value="0">测试类型1</Option>
                            <Option value="1">测试类型2</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Input  placeholder="计划类型名称"
                                    value={this.state.planTypeName}
                                    name="planTypeName"
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
                            <Input value={this.state.currentItem.projectType}
                                   name="projectType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="测试类型">
                            <Input value={this.state.currentItem.testType}
                                   name="testType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="计划类型名称">
                            <Input value={this.state.currentItem.projectTypeName}
                                   name="projectTypeName"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="计划类型实际值">
                            <Input value={this.state.currentItem.projectTypeValue}
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
                                <Input value={this.state.currentItem.projectType}
                                       onChange={this.inputOnChange}
                                       name="projectType"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="测试类型">
                                <Input value={this.state.currentItem.testType}
                                       onChange={this.inputOnChange}
                                       name="testType"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="计划类型名称">
                                <Input value={this.state.currentItem.projectTypeName}
                                       onChange={this.inputOnChange}
                                       name="projectTypeName"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="计划类型实际值">
                                <Input value={this.state.currentItem.projectTypeValue}
                                             onChange={this.inputOnChange}
                                             name="projectTypeValue"
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
