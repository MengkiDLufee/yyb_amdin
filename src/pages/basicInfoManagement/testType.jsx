import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select,Space } from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';


const { Option } = Select;

const columns = [
    {
        title: '测试类型名称',
        dataIndex: 'testType',
        sorter: (a,b) => a.testType.length - b.testType.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '测试集名称',
        dataIndex: 'testSet',
        sorter: (a,b) => a.testSet.length - b.testSet.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '测试类型代码',
        dataIndex: 'testTypeCode',
        sorter: (a,b) => a.testTypeCode - b.testTypeCode,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter:(a,b)=>{
            let atimeString=a.createTime;
            let btimeString=b.createTime;
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
                <Button>已关联试剂类型</Button>
                <Button>当前生产判读逻辑</Button>
                <Button>上传模板</Button>
                <Button>查看历史</Button>
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
        testType: `啦啦啦${i}`,
        testSet: `客户 ${i}`,
        testTypeCode: i,
        createTime : `2019-12-06 17:51:${i}`,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class TestType extends Component {

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
                            <Input  placeholder="测试类型名称"  />
                        </Col>
                        <Col span={4}>
                            <Select placeholder="请选择测试集名称 " style={{width:'100%'}} onChange={handleChange}>
                                <Option value="testset1">测试集1</Option>
                                <Option value="testset2">测试集2</Option>
                                <Option value="testset3">测试集3</Option>
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
                        <Col span={11} >

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
