import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined} from "@ant-design/icons";

const { Option } = Select;

const columns = [
    {
        title: '试剂名称',
        dataIndex: 'reagentName',
        sorter: (a,b) => a.reagentName.length - b.reagentName.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '代码',
        dataIndex: 'code',
        sorter: (a,b) => a.code.length - b.code.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '结果单位',
        dataIndex: 'resultUnit',
        sorter: (a,b) => a.resultUnit.length - b.resultUnit.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '条码（不包括批号）',
        dataIndex: 'barcode',
        sorter: (a,b) => a.barcode.length - b.barcode.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '参考值下限',
        dataIndex: 'referenceLow',
        sorter: (a,b) => a.referenceLow - b.referenceLow,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '参考值上限',
        dataIndex: 'referenceHigh',
        sorter: (a,b) => a.referenceHigh - b.referenceHigh,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '样本类型',
        dataIndex: 'sampleType',
        sorter: (a,b) => a.sampleType.length - b.sampleType.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '所属单位',
        dataIndex: 'affiliatedInstitutions',
        sorter: (a,b) => a.affiliatedInstitutions.length - b.affiliatedInstitutions.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter:(a,b)=>{
            let atimeString=a.updateTime;
            let btimeString=b.updateTime;
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
            <Space size="middle">
                <Button>修改</Button>
                <Button style={{
                    backgroundColor:'#ec7259',
                    color:'#FFFAFA'}}>删除</Button>
                <Button>查看标曲</Button>
                <Button style={{
                    backgroundColor:'#ec7259',
                    color:'#FFFAFA'}}>默认标曲</Button>
            </Space>
        ),
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        reagentName: `生成素${i}`,
        code: `MFSH ${i}`,
        resultUnit: `mu ${i}`,
        barcode:`${i}`,
        referenceLow:i,
        referenceHigh :46-i,
        sampleType :`尿液${i}`,
        affiliatedInstitutions : `起跑线 ${i}`,
        updateTime:`2019-12-06 17:51:${i}`,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class ReagentType extends Component {

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
                        <Col span={3}>
                            <Input  placeholder="试剂名称"  />
                        </Col>
                        <Col span={4}>
                            <Select placeholder="请选择样本类型 " style={{width:'100%'}} onChange={handleChange}>
                                <Option value="sampleType1">样本类型1</Option>
                                <Option value="sampleType2">样本类型2</Option>
                                <Option value="sampleType3">样本类型3</Option>
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
                        <Col span={5} >

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
