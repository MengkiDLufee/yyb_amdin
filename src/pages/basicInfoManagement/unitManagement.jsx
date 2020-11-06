import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";

const { Option } = Select;

const columns = [
    {
        title: '单位编码',
        dataIndex: 'unitCode',
        sorter: (a,b) => a.unitCode.length - b.unitCode.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '单位名称',
        dataIndex: 'organization',
        sorter: (a,b) => a.organization.length - b.organization.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '插入时间',
        dataIndex: 'insertTime',
        sorter:(a,b)=>{
            let atimeString=a.insertTime;
            let btimeString=b.insertTime;
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
        unitCode: `abc${i}`,
        organization: `起跑线 ${i}`,
        insertTime: `2019-12-06 17:51:${i}`,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class UnitManagement extends Component {


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
                        <Input  placeholder="单位名称"  />
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
            </div>
        )
    }
}
