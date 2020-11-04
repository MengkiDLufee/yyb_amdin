import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space} from 'antd';
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
        key:i,
        projectType: `普通${i}`,
        testType: `早期妊娠确认 ${i}`,
        projectTypeName: `48小时计划${i}`,
        projectTypeValue:i,
        timeout:500-i,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class ProjectType extends Component {


    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
                        <Select placeholder="测试类型 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="testType1">测试类型1</Option>
                            <Option value="testType2">测试类型2</Option>
                            <Option value="testType3">测试类型3</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select placeholder="计划类型名称 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="projectType1">计划类型1</Option>
                            <Option value="projectType2">计划类型2</Option>
                            <Option value="projectType3">计划类型3</Option>
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" ><SearchOutlined />搜索</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" ><ReloadOutlined />重置</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" ><PlusSquareOutlined />添加</Button>
                    </Col>
                    <Col span={10} >

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
            </div>
        )
    }
}
