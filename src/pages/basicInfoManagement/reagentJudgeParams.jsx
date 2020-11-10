import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";

const { Option } = Select;



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
    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        //this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
    }

    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,

        //修改
        currentItem:{
            key: null,
            batchNumber: null,
            reagentType: '',
            responsTime: null,
            affiliation:'',
            isStable:'',
            isEfficiency :'',
        },
    };

    //表格列头
    columns = [
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
                    <Button type="link" style={{color:'#000000'}}>历史版本</Button>
                </Space>
            ),
        },

        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={()=>{this.handleModify(record)}}>修改</Button>
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
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //修改
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key: record.key,
            batchNumber: record.batchNumber,
            reagentType:record.reagentType,
            responsTime: record.responsTime,
            affiliation:record.affiliation,
            isStable:record.isStable,
            isEfficiency :record.isEfficiency,
        })

        this.setState({
                modifyVisible:true,
                currentItem:data,
            },
            ()=>console.log(this.state.currentItem)
        );

    }
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
                modifyVisible: false,
            });
        }, 1000);
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            currentItem:{
                key: null,
                batchNumber: null,
                reagentType: '',
                responsTime: null,
                affiliation:'',
                isStable:'',
                isEfficiency :'',
            },
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
                        <Button type="primary" onClick={this.handleAdd}><PlusSquareOutlined />添加</Button>
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
                        columns={this.columns}
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
                    title="添加试剂判读参数"
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
                        <Form.Item label="批号"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.batchNumber}/>
                        </Form.Item>
                        <Form.Item label="试剂类型"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.reagentType}/>
                        </Form.Item>
                        <Form.Item label="反应时间（秒）"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.responsTime}/>
                        </Form.Item>
                        <Form.Item label="所属单位"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.affiliation}/>
                        </Form.Item>
                        <Form.Item label="是否定性"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.isStable}/>
                        </Form.Item>

                        <Form.Item label="能效已降低"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.isEfficiency}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改试剂判读参数"
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
                            <Form.Item label="批号"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.batchNumber}/>
                            </Form.Item>
                            <Form.Item label="试剂类型"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.reagentType}/>
                            </Form.Item>
                            <Form.Item label="反应时间（秒）"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.responsTime}/>
                            </Form.Item>
                            <Form.Item label="所属单位"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.affiliation}/>
                            </Form.Item>
                            <Form.Item label="是否定性"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.isStable}/>
                            </Form.Item>

                            <Form.Item label="能效已降低"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.isEfficiency}/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
            </div>
        )
    }
}
