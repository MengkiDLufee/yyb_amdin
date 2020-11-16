import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';


const { Option } = Select;



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


// function handleChange(value) {
//     console.log(`selected ${value}`);
// }


export default class TestSet extends Component {
    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:data,
        //分页
        currentPage:1,
        //搜索框
        testSetName:'',
        //修改
        currentItem:{
            key: null,
            testSet:'',
            creatTime:'',
        },
    };
//表格列头
    columns = [
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
                    <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                            onClick={()=>{this.handleDelete(record)}}>删除</Button>
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
                testSetName:'',
                currentPage:1,
                //修改
                currentItem:{
                    key: null,
                    testSet:'',
                    creatTime:'',
                },
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
//添加展开modal
    handleAdd(){
        this.setState({
            addVisible:true,
        });
    }

    //搜索
    search(){
        let params={};
        if(this.state.testSetName!==''){
            params.testSetName=this.state.testSetName;
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
                testSet:'',
                creatTime:'',
            },
            //搜索框
            testSetName:'',
            //当前页
            currentPage:1,
        });
        console.log(this.state)

    }

    //修改
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key: record.key,
            testSet:record.testSet,
            creatTime:record.creatTime,
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
        })
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

        //获取当前时间
        var date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDate();
        let time=date.toLocaleTimeString()
        let hour=date.getHours();
        let minute=date.getMinutes();
        let second=date.getSeconds();
        let data=Object.assign({},this.state.currentItem,{
            key:key,
            testSet:this.state.currentItem.testSet,
            creatTime:`${year}-${month}-${day} ${hour}:${minute}:${second}`,
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
                    testSet:'',
                    creatTime:'',
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
                testSet:'',
                creatTime:'',
            },
        });
    };

//输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="testSetName"){
            console.log("进到搜索框了")
            this.setState({
                testSetName:value
            })
        }
        else{
            this.setState({
                currentItem:Object.assign(this.state.currentItem,{[name]:value})
            })
        }


    }

    //表格分页
    onChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
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
                    <Col span={6}>
                        <Input  placeholder="测试集名称"
                                value={this.state.testSetName}
                                name="testSetName"
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
                    <Col span={12} >
                    </Col>
                    </Row>
                <div>
                    <Table
                        columns={this.columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.data}
                        rowKey={record => record.key}
                        bordered={true}
                        style={{margin:'20px 0'}}
                        pagination={{
                            position: ['bottomLeft'] ,
                            total:'data.length',
                            showTotal:total => `共 ${total} 条`,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            current:this.state.currentPage,
                            onChange:this.onChange,
                        }}
                    />
                </div>
                <Modal
                    title="添加测试集"
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
                        <Form.Item label="测试集名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.testSet}
                                   name="testSet"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改测试集"
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
                            <Form.Item label="测试集名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.testSet}
                                       name="testSet"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>

            </div>
        )
    }
}
