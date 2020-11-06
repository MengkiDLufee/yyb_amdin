import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space,Modal} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";

const { Option } = Select;

const columns = [
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
                <Button>修改</Button>
                <Button style={{
                    backgroundColor:'#ec7259',
                    color:'#FFFAFA'}}>删除</Button>
            </Space>
        ),
    },
];

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


export default class ProjectType extends Component {

constructor(props) {
    super(props);
    this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,

    };
    this.handleAdd=this.handleAdd.bind(this);
}


    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
                addVisible:false,
                addConfirmLoading:false,
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

    handleOk = e => {
        console.log(e);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading:false,
                addVisible: false,
            });
        }, 1000);
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
        });
    };

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                        columns={columns}
                        dataSource={data}
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
                   <div>
                       <Input />
                   </div>
                </Modal>
            </div>
        )
    }
}
