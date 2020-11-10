import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;



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

    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
    }

    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:data,
        searchItem:'',

        //修改
        currentItem:{
            key: null,
            unitCode: '',
            organization:'',
            insertTime: '',
        },
    };

    //表格列头
    columns = [
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
                addVisible:false,
                modifyVisible:false,
                addConfirmLoading:false,
                modifyConfirmLoading:false,
                data:data,
                searchItem:'',

                //修改
                currentItem:{
                    key: null,
                    unitCode: '',
                    organization:'',
                    insertTime: '',
                },
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key: record.key,
            unitCode: record.unitCode,
            organization:record.organization,
            insertTime: record.insertTime,
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


    //添加展开modal
    handleAdd(){
        this.setState({
            addVisible:true,
        });
    }

    //搜索
    search(){
        let params={};
        if(this.state.searchItem!==""){
            params.se=this.state.searchItem;
        }
        console.log(params);
    }

    //重置
    reset(){
        console.log("重置")
        this.setState({
            data:data,
            currentItem:{
                key: null,
                unitCode: '',
                organization:'',
                insertTime: '',
            },
            searchItem:'',
        });

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
            key: key,
            unitCode: this.state.currentItem.unitCode,
            organization:this.state.currentItem.organization,
            insertTime: this.state.currentItem.insertTime,
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
                    unitCode: '',
                    organization:'',
                    insertTime: '',
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
                unitCode: '',
                organization:'',
                insertTime: '',
            },
        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="searchItem"){
            console.log("进到搜索框了")
            this.setState({
                searchItem:value
            })
        }
        else{
            this.setState({
                currentItem:Object.assign(this.state.currentItem,{[name]:value})
            })
        }
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
                        <Input  placeholder="单位名称"
                                value={this.state.searchItem}
                                name="searchItem"
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
                    <Col span={14} >

                    </Col>
                </Row>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        rowKey={record => record.key}
                        dataSource={this.state.data}
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
                    title="添加单位管理数据"
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
                        <Form.Item label="单位编码"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.unitCode}
                                   name="unitCode"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="单位名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.organization}
                                   name="organization"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="插入时间"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.insertTime}
                                   name="insertTime"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改单位管理数据"
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
                            <Form.Item label="单位编码"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.unitCode}
                                       onChange={this.inputOnChange}
                                       name="unitCode"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="单位名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.organization}
                                       onChange={this.inputOnChange}
                                       name="organization"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="插入时间"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.insertTime}
                                       onChange={this.inputOnChange}
                                       name="insertTime"
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
            </div>
        )
    }
}
