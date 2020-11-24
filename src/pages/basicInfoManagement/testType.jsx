import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';


const { Option } = Select;


const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        testType: `啦啦啦${i}`,
        testSet: `客户 ${i}`,
        testTypeCode: i,
        createTime : `2019-12-06 17:51:${i}`,
        reagent:`精液液化${i}`,
        reagentNameEN:"SEMEN",
        insertDate:"2019-12-06 17:54:41",
    });
}

const associatedData = [];
for (let i = 0; i < 46; i++) {
    associatedData.push({
        key:i,
        testTypeId :`精液液化${i}`,
        paperTypeName:`精液液化${i}`,
        insertDate:"2019-12-06 17:54:41",
    });
}



// function handleChange(value) {
//     console.log(`selected ${value}`);
// }


export default class TestType extends Component {
    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.Modify=this.Modify.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleAssociate=this.handleAssociate.bind(this);
        this.handleLogic=this.handleLogic.bind(this);

    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        associtedSelectedRowKeys:[],
        loading: false,
        addVisible:false,
        modifyVisible: false,
        associatedModifyVisible:false,
        associateVisible:false,
        logicVisible:false,
        data:data,
        associatedData:associatedData,
        //搜索框
        testTypeName:'',
        testSetId:null,

        currentPage:1,
        associatedcurrentPage:1,
        //修改
        currentItem:{
            key:null,
            testType: '',
            testSet: '',
            testTypeCode: '',
            reagent:'',
            reagentNameEN:'',
            insertDate:'',
        },

        //关联的试剂类型
        associatedItem:{
            key:null,
            reagent:'',
            reagentNameEN:'',
            insertDate:'',
        },

    };

    //表格列名
   columns = [
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
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleAssociate(record)}}>已关联试剂类型</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleLogic(record)}}>当前生产判读逻辑</Button>
                    <Button>上传模板</Button>
                    <Button>查看历史</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                            onClick={()=>{this.handleDelete(record)}}>删除</Button>
                </Space>
            ),
        },
    ];

   //修改已关联列名
   associatedcolumns = [
        {
            title: '测试类型',
            dataIndex: 'testTypeId',
            sorter: (a,b) => a.testTypeId.length - b.testTypeId.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '试剂类型',
            dataIndex: 'paperTypeName',
            sorter: (a,b) => a.paperTypeName.length - b.paperTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '插入时间',
            dataIndex: 'insertDate',
            sorter:(a,b)=>{
                let atimeString=a.insertDate;
                let btimeString=b.insertDate;
                let atime=new Date(atimeString).getTime();
                let btime=new Date(btimeString).getTime();
                return atime-btime;
            },
            sortDirections: ['descend', 'ascend'],
        },

    ];


    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],// Check here to configure the default column
                associtedSelectedRowKeys:[],
                loading: false,
                addVisible:false,
                modifyVisible:false,
                associatedModifyVisible:false,
                associateVisible:false,
                addConfirmLoading:false,
                modifyConfirmLoading:false,
                data:data,
                //搜索框
                testTypeName:'',
                testSetId:null,

                currentPage:1,
                associatedcurrentPage:1,

                //修改
                currentItem:{
                    key:null,
                    testType: '',
                    testSet: '',
                    testTypeCode: '',
                    reagent:'',
                    reagentNameEN:'',
                    insertDate:'',
                },

                // //关联的试剂类型
                // associatedItem:{
                //     key:null,
                //     reagent:'',
                //     reagentNameEN:'',
                //     insertDate:'',
                // },

            });
        }, 1000);
    };

    //行选择
    onSelectChange = selectedRowKeys => {
        //已选中的行数
        console.log('selectedRowKeys changed: ', selectedRowKeys);

        this.setState({ selectedRowKeys });
    };
    associatedOnSelectChange = associtedSelectedRowKeys => {
        console.log('associtedSelectedRowKeys changed: ', associtedSelectedRowKeys);
        this.setState({ associtedSelectedRowKeys });
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
        if(this.state.testTypeName!==""){
            params.testTypeName=this.state.testTypeName;
        }
        if(this.state.testSetId!==null){
            params.testSetId=this.state.testSetId;
        }
        console.log(params);
        //console.log(this.state.testTypeId)
    }

    //重置
    reset(){
        console.log("重置")
        this.setState({
            data:data,
            currentItem:{
                key:null,
                testType: '',
                testSet: '',
                testTypeCode: '',
            },
            //搜索框
            testTypeName:'',
            testSetId:null,

            currentPage:1,
            associatedcurrentPage:1,
        });
        console.log(this.state)

    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key:record.key,
            testType: record.testType,
            testSet: record.testSet,
            testTypeCode: record.testTypeCode,
        })
        this.setState({
                modifyVisible:true,
                currentItem:data,
            },
            ()=>console.log(this.state.currentItem)
        );
    }

    //挑选可关联的试剂类型
    Modify(){
        console.log('所有可关联的试剂类型')
        this.setState({
                associatedModifyVisible:true,
            },
            ()=>console.log(this.state)
        );
    }

    //查看当前所关联的试剂类型
    handleAssociate=(record)=>{
        console.log('所关联的试剂类型',record)
        this.setState({
                associateVisible:true,
                currentItem:{
                    reagent:record.reagent,
                    reagentNameEN:record.reagentNameEN,
                    insertDate:record.insertDate,
                }
            },
            ()=>console.log(this.state.currentItem)
        );
    }

    //查看当前生产判读逻辑
    handleLogic=(record)=>{
        console.log('当前生产判读逻辑',record)
        this.setState({
                associateVisible:true,
                currentItem:{
                    reagent:record.reagent,
                    reagentNameEN:record.reagentNameEN,
                    insertDate:record.insertDate,
                }
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

    //modal点击确认
    handleOk = e => {
        console.log("已选中",this.state.associtedSelectedRowKeys)
        this.setState({
            loading: true,
        });
        let key=(this.state.currentItem.key!==null) ? this.state.currentItem.key:this.state.data.length;
        let flag=(this.state.currentItem.key!==null) ? 1:0;//0添加1修改

        //获取当前时间
        var date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        month=(month>9)?month:`0${month}`;
        let day=date.getDate();
        day=(day>9)?day:`0${day}`;
        let hour=date.getHours();
        hour=(hour>9)?hour:`0${hour}`;
        let minute=date.getMinutes();
        minute=(minute>9)?minute:`0${minute}`;
        let second=date.getSeconds();
        second=(second>9)?second:`0${second}`;

        let modifydata=Object.assign({},this.state.currentItem,{
            key: key,
            testType: this.state.currentItem.testType,
            testSet: this.state.currentItem.testSet,
            testTypeCode: this.state.currentItem.testTypeCode,
            createTime:`${year}-${month}-${day} ${hour}:${minute}:${second}`,
            reagent:this.state.currentItem.reagent,
            reagentNameEN:this.state.currentItem.reagentNameEN,
            insertDate:`${year}-${month}-${day} ${hour}:${minute}:${second}`
        })
        console.log("修改为/添加", modifydata)
        const modifyData = [...this.state.data];
        if(flag===1){
            modifyData.forEach((item, index) => {
                if (item.key === this.state.currentItem.key) {
                    modifyData.splice(index, 1,data);
                }
            })
        }
        else{
            modifyData.push(modifydata);
        }

        this.setState({
            data: modifyData,
            //ES6中键和值相等时可直接写成list
        })
        console.log(this.state.data)
        setTimeout(() => {
            this.setState({
                loading:false,
                addVisible: false,
                modifyVisible: false,
                associateVisible:false,
                associatedModifyVisible:false,
                currentItem:{
                    key:null,
                    testType: '',
                    testSet: '',
                    testTypeCode: '',
                    reagent:'',
                    reagentNameEN:'',
                    insertDate:'',
                },
            });
        }, 1000);
    };

    //搜索选择框变化
    handleChange=(e,Option) =>{
        console.log(e)
        this.setState({
            [Option.title]:e,
        })
    }

    //关闭modal
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            associatedModifyVisible:false,
            associateVisible:false,

            currentItem:{
                key:null,
                testType: '',
                testSet: '',
                testTypeCode: '',
                //关联的试剂类型
                reagent:'',
                reagentNameEN:'',
                insertDate:'',
            },

            //
            // associatedItem:{
            //     key:null,
            //     reagent:'',
            //     reagentNameEN:'',
            //     insertDate:'',
            // },

        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name===" testTypeName"){
            console.log("进到搜索框了")
            this.setState({
                testTypeName:value
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
            associatedcurrentPage:page,
        });
    };

    render() {
        const { loading, selectedRowKeys, associtedSelectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.onSelectChange,
        };
        const associatedRowSelection = {
            associtedSelectedRowKeys: associtedSelectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.associatedOnSelectChange,
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
                    <Col span={3}>
                        <Input  placeholder="测试类型名称"
                                value={this.state.testTypeName}
                                name=" testTypeName"
                                onChange={this.inputOnChange}
                                allowClear/>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="请选择测试集名称 "
                            style={{width:'100%'}}
                            value={this.state.testSetId}
                            onChange={this.handleChange}>
                            <Option title="testSetId" value={1}>测试集1</Option>
                            <Option title="testSetId" value={2}>测试集2</Option>
                            <Option title="testSetId" value={3}>测试集3</Option>
                        </Select>
                    </Col>
                        <Col span={2}>
                            <Button type="primary" onClick={this.search}><SearchOutlined />搜索</Button>
                        </Col>
                        <Col span={2} >
                            <Button type="primary" onClick={this.reset}><ReloadOutlined />重置</Button>
                        </Col>
                        <Col span={2} >
                            <Button type="primary" onClick={this.handleAdd} ><PlusSquareOutlined />添加</Button>
                        </Col>
                        <Col span={11} >

                        </Col>
                    </Row>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
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
                    title="添加测试类型数据"
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
                        <Form.Item label="测试类型名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.testType}
                                   name="testType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="测试集名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.testSet}
                                   name="testSet"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="测试类型代码"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.testTypeCode}
                                   name="testTypeCode"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改测试类型数据"
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
                            <Form.Item label="测试类型名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.testType}
                                       name="testType"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="测试集名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.testSet}
                                       name="testSet"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="测试类型代码"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.testTypeCode}
                                       name="testTypeCode"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
                <Modal
                    title="已关联的试剂类型"
                    visible={this.state.associateVisible}
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
                        <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                                onClick={this.Modify}>修改</Button>
                        <Table
                            rowSelection={associatedRowSelection}
                            columns={this.associatedcolumns}
                            dataSource={this.state.associatedData}
                            rowKey={record => record.key}
                            bordered={true}
                            style={{margin:'20px 0'}}
                            pagination={{
                                position: ['bottomLeft'] ,
                                total:'data.length',
                                showTotal:total => `共 ${total} 条`,
                                showQuickJumper:true,
                                showSizeChanger:true,
                                current:this.state.associatedcurrentPage,
                                onChange:this.onChange,
                            }}
                        />
                    </div>
                    <Modal
                        title="修改测试类型数据"
                        visible={this.state.associatedModifyVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                提交
                            </Button>,
                        ]}
                    >
                        <div>
                            <Table
                                rowSelection={associatedRowSelection}
                                columns={this.associatedcolumns}
                                dataSource={this.state.associatedData}
                                rowKey={record => record.key}
                                bordered={true}
                                style={{margin:'20px 0'}}
                                pagination={{
                                    position: ['bottomLeft'] ,
                                    total:'data.length',
                                    showTotal:total => `共 ${total} 条`,
                                    showQuickJumper:true,
                                    showSizeChanger:true,
                                    current:this.state.associatedcurrentPage,
                                    onChange:this.onChange,
                                }}
                            />
                        </div>

                    </Modal>
                </Modal>
            </div>
        )
    }
}
