import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select,Space } from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';


const { Option } = Select;

const columns = [
    {
        title: '测试集名称',
        dataIndex: 'testSet',
        sorter: (a,b) => a.testSet.length - b.testSet.length,
        sortDirections: ['descend','ascend'],
    },
    {
        title: '创建时间',
        dataIndex: 'creatTime',
        sorter:(a,b)=>{
            let atimeString=a.creatTime;
            let btimeString=b.creatTime;
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
    key: 121,
    testSet: `啦啦啦${121}`,
    creatTime : `2019-12-06 17:51:59`,
})
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        testSet:`啦啦啦${i}`,
        creatTime : `2019-12-06 17:51:${i}`,
    });
}


function handleChange(value) {
    console.log(`selected ${value}`);
}


export default class TestSet extends Component {

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
                    <Col span={6}>
                        <Input  placeholder="测试集名称"/>
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
                    <Col span={12} >
                    </Col>
                    </Row>
                <div>
                    <Table
                        columns={columns}
                        rowSelection={rowSelection}
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
