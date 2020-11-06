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


function handleChange(value) {
    console.log(`selected ${value}`);
}

const currentItem={
        key: null,
        projectType: '',
        testType: '',
        projectTypeName:'',
        projectTypeValue: '',
        timeout:null,
    }

export default class ProjectType extends Component {

constructor(props) {
    super(props);

    this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        key: this.props.key,
        projectType: this.props.projectType,
        testType: this.props.testType,
        projectTypeName:this.props.projectTypeName,
        projectTypeValue: this.props.projectTypeValue,
        timeout:this.props.timeout,


    };

    this.handleAdd=this.handleAdd.bind(this);
    this.inputOnChange=this.inputOnChange.bind(this);
    //this.handleModify=this.handleModify.bind(this);
}

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
                    <Button onClick={()=>this.handleModify(record)}>修改</Button>
                    <Button style={{
                        backgroundColor:'#ec7259',
                        color:'#FFFAFA'}}>删除</Button>
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
            });
        }, 1000);
    };
onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
handleAdd(){
        this.setState({
            addVisible:true,
        });
    }
handleModify=(record)=>{
        console.log(record)
        this.setState({
            modifyVisible:true,
        });
        currentItem.key=record.key;
        currentItem.projectType=record.projectType;
        currentItem.testType=record.testType;
        currentItem.projectTypeName=record.projectTypeName;
        currentItem.projectTypeValue=record.projectTypeValue;
        currentItem.timeout=record.timeout;


    }

handleOk = e => {
        console.log(e);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading:false,
                addVisible: false,
                modifyVisible: false,
            });
        }, 1000);
    };
handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            currentItem:null,
        });
    };

inputOnChange(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}

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
                    <Col span={4}>
                        <Input  placeholder="单位名称"  />
                    </Col>
                    <Col span={2}>
                        <Button type="primary" ><SearchOutlined />搜索</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" ><ReloadOutlined />重置</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.handleAdd}><PlusSquareOutlined />添加</Button>
                    </Col>
                    <Col span={14} >

                    </Col>
                </Row>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={data}
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
                        <Form.Item label="计划类型"
                                   name="计划类型"
                                   rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="计划类型"
                                   name="计划类型"
                                   rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="测试类型"
                                   name="测试类型"
                                   rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="计划类型名称"
                                   name="计划类型名称"
                                   rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="计划类型实际值"
                                   name="计划类型实际值"
                                   rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="超时时间"
                                   name="超时时间"
                                   rules={[{required:true}]}>
                            <Input />
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
                            <Form.Item label="计划类型"
                                               name="计划类型"
                                               rules={[{required:true}]}>
                                <Input value={this.state.projectType}
                                       name="projectType"
                                       onChange={this.inputOnChange}/>
                            </Form.Item>
                            <Form.Item label="测试类型"
                                               name="测试类型"
                                               rules={[{required:true}]}>
                                <Input value={this.state.testType}
                                       name="testType"/>
                            </Form.Item>
                            <Form.Item label="计划类型名称"
                                               name="计划类型名称"
                                               rules={[{required:true}]}>
                                <Input value={this.state.projectTypeName}
                                       name="projectTypeName"/>
                            </Form.Item>
                            <Form.Item label="计划类型实际值"
                                               name="计划类型实际值"
                                               rules={[{required:true}]}>
                                <Input value={this.state.projectTypeValue}
                                       name="projectTypeValue"/>
                            </Form.Item>
                            <Form.Item label="超时时间"
                                               name="超时时间"
                                               rules={[{required:true}]}>
                                <Input value={this.state.timeout}
                                       name="timeout"/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
            </div>
        )
    }
}
