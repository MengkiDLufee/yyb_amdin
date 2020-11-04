import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";

const { Option } = Select;

const columns = [
    {
        title: '批号',
        dataIndex: 'batchNumber',
        sorter: (a,b) => a.batchNumber - b.batchNumber,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '试剂类型',
        dataIndex: 'reagentType',
        sorter: (a,b) => a.reagentType.length - b.reagentType.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '反应时间（秒）',
        dataIndex: 'responsTime',
        sorter: (a,b) => a.responsTime - b.responsTime,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '所属单位',
        dataIndex: 'affiliation',
        sorter: (a,b) => a.affiliation.length - b.affiliation.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '是否定性',
        dataIndex: 'isStable',
        sorter: (a,b) => a.isStable.localeCompare(b.isStable, 'zh'),
        sortDirections: ['descend','ascend'],
    },
    {
        title: '能效已降低',
        dataIndex: 'isEfficiency',
        sorter: (a,b) => a.isEfficiency.localeCompare(b.isEfficiency, 'zh'),
        sortDirections: ['descend','ascend'],
    },
    {
        title: '历史版本',
        dataIndex: 'revisions',
        render: (text, record) => (
            <Space size="middle">
                <Button type="link" style={{color:'#0040FF'}}>历史版本</Button>
            </Space>
        ),
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
data.push({
    key: 99,
    batchNumber: 99,
    reagentType: `生成素 ${99}`,
    responsTime: 99,
    affiliation:`起跑线${99}`,
    isStable:`否`,
    isEfficiency :`是`,
},
{
    key: 88,
    batchNumber: 88,
    reagentType: `生成素 ${88}`,
    responsTime: 88,
    affiliation:`起跑线${88}`,
    isStable:`是`,
    isEfficiency :`否`,
})
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        batchNumber: i,
        reagentType: `生成素 ${i}`,
        responsTime: i,
        affiliation:`起跑线${i}`,
        isStable:`是`,
        isEfficiency :`是`,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class ReagentJudgeParams extends Component {


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
                        <Input  placeholder="批号"  />
                    </Col>
                    <Col span={4}>
                        <Select placeholder="请选择试剂类型 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="reagentType1">试剂类型1</Option>
                            <Option value="sampleType2">试剂类型2</Option>
                            <Option value="reagentType3">试剂类型3</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select placeholder="请选择所属单位 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="affiliatedInstitutions1">单位1</Option>
                            <Option value="affiliatedInstitutions2">单位2</Option>
                            <Option value="affiliatedInstitutions3">单位3</Option>
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
                    <Col span={2} >
                        <Button type="primary" ><ExportOutlined />导出</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" ><ImportOutlined />导入</Button>
                    </Col>

                    <Col span={2} >

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
