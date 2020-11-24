import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";
import httpRequest from "../../http";

const { Option } = Select;




export default class ReagentJudgeParams extends Component {
    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.alerthandleChange=this.alerthandleChange.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:[],
        //分页
        currentPage:1,
        //搜索框
        bathNumber:null,
        paperTypeId:null,
        searchOrganization:'',
        //修改
        currentItem:{
            key: null,
            paperParamProId:null,//试剂判读参数id生产
            bathNumber: null,//批号
            paperTypeName: '',//试剂类型名称
            reactiveTime: null,//反应时间(秒)
            organization:'',//所属单位
            qualitative:null,//是定性
            paperFade :null,//能效已降低
        },
    };

    //表格列头
    columns = [
        {
            title: '批号',
            dataIndex: 'bathNumber',
            sorter: (a,b) => a. bathNumber - b. bathNumber,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '试剂类型',
            dataIndex: 'paperTypeName',
            sorter: (a,b) => a.paperTypeName.length - b.paperTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '反应时间（秒）',
            dataIndex: 'reactiveTime',
            sorter: (a,b) => a.reactiveTime - b.reactiveTime,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '所属单位',
            dataIndex: ' organization',
            sorter: (a,b) => a. organization.length - b. organization.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '是否定性',
            dataIndex: 'qualitative',
            //sorter: (a,b) => a.qualitative.localeCompare(b.qualitative, 'zh'),
            sorter: (a,b) => a.qualitative-b.qualitative,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '能效已降低',
            dataIndex: 'paperFade',
            //sorter: (a,b) => a.isEfficiency.localeCompare(b.isEfficiency, 'zh'),
            sorter: (a,b) => a.paperFade-b.paperFade,
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
                    <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                            onClick={()=>{this.handleDelete(record)}}>删除</Button>
                </Space>
            ),
        },
    ];

    //初始页面请求数据
    componentDidMount() {
        let params={
            page:1,
            pageSize:10,
        }
        httpRequest('post','/paper/param/pro/list',params)
            .then(response=>{
                console.log(response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                        if(tempData[i].qualitative===false){
                            tempData[i].qualitative='否';
                        }
                        else{
                            tempData[i].qualitative='是';
                        }
                        if(tempData[i].paperFade===false){
                            tempData[i].paperFade='否';
                        }
                        else{
                            tempData[i].paperFade='是';
                        }
                    }
                    this.setState({
                        data:tempData
                    })
                }
            }).catch(err => {
            console.log(err);
        })
    }


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
                data:[],
                bathNumber:null,
                paperTypeId:null,
                searchOrganization:'',
                currentPage:1,
                //修改
                currentItem:{
                    key: null,
                    paperParamProId:null,//试剂判读参数id生产
                    bathNumber: null,//批号
                    paperTypeName: '',//试剂类型名称
                    reactiveTime: null,//反应时间(秒)
                    organization:'',//所属单位
                    qualitative:null,//是定性
                    paperFade :null,//能效已降低
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
        if(this.state.bathNumber!==null){
            params.bathNumber=this.state.bathNumber;
        }
        if(this.state.paperTypeId!==null){
            params.paperTypeId=this.state.paperTypeId;
        }
        if(this.state.searchOrganization!==''){
            params.organization=this.state.searchOrganization;
        }
        console.log(params);
        //console.log(this.state.testTypeId)
    }

    //重置
    reset(){
        console.log("重置")
        this.setState({
            data:[],
            currentItem:{
                key: null,
                batchNumber: null,
                reagentType: '',
                responsTime: null,
                affiliation:'',
                isStable:'',
                isEfficiency :'',
            },

            //搜索框
            bathNumber:null,
            paperTypeId:null,
            searchOrganization:'',
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
        this.setState({
            loading: true,
            //modifyVisible: true,
        });
        let key=(this.state.currentItem.key!==null) ? this.state.currentItem.key:this.state.data.length;
        let flag=(this.state.currentItem.key!==null) ? 1:0;//0添加1修改
        console.log(flag)
        let data=Object.assign({},this.state.currentItem,{
            key:key,
            batchNumber:this.state.currentItem.batchNumber,
            reagentType:this.state.currentItem.reagentType,
            responsTime:this.state.currentItem.responsTime,
            affiliation:this.state.currentItem.affiliation,
            isStable:this.state.currentItem.isStable,
            isEfficiency :this.state.currentItem.isEfficiency ,
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
                    batchNumber: null,
                    reagentType: '',
                    responsTime: null,
                    affiliation:'',
                    isStable:'',
                    isEfficiency :'',
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
                batchNumber: null,
                reagentType: '',
                responsTime: null,
                affiliation:'',
                isStable:'',
                isEfficiency :'',
            },
        });
    };

//输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name==="bathNumber"){
            console.log("进到搜索框了")
            this.setState({
                bathNumber:value
            })
        }
        else{
            this.setState({
                currentItem:Object.assign(this.state.currentItem,{[name]:value})
            })
        }


    }

    //搜索选择框变化
    handleChange=(e,Option) =>{
        console.log(e)
            this.setState({
                [Option.title]:e,
        })
    }
    //增加或修改选择框变化
    alerthandleChange=(e,Option) =>{
        console.log(e)
        console.log(Option)
        this.setState({
                currentItem:Object.assign(this.state.currentItem,{[Option.title]:e})
        })
        console.log(this.state)
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
                    <Col span={4}>
                        <Input  placeholder="批号"
                                value={this.state.bathNumber}
                                name="bathNumber"
                                onChange={this.inputOnChange}
                                allowClear/>
                    </Col>
                    <Col span={4}>
                        <Select
                            className="reagentType"
                            placeholder="请选择试剂类型 "
                            style={{width:'100%'}}
                            value={this.state.paperTypeId}
                            allowClear
                            onChange={this.handleChange}>
                            <Option title="paperTypeId" value={1}>试剂类型1</Option>
                            <Option title="paperTypeId" value={2}>试剂类型2</Option>
                            <Option title="paperTypeId" value={3}>试剂类型3</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="请选择所属单位"
                            value={this.state.searchOrganization}
                            allowClear
                            className="affiliatedInstitutions"
                            style={{width:'100%'}}
                            onChange={this.handleChange}>
                            <Option title="searchOrganization" value="affiliatedInstitutions1">单位1</Option>
                            <Option title="searchOrganization" value="affiliatedInstitutions2">单位2</Option>
                            <Option title="searchOrganization" value="affiliatedInstitutions3">单位3</Option>
                        </Select>
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
                            <Input value={this.state.currentItem.batchNumber}
                                   name="batchNumber"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="试剂类型"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.reagentType}
                                   name="reagentType"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="反应时间（秒）"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.responsTime}
                                   name="responsTime"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="所属单位"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.affiliation}
                                   name="affiliation"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="是否定性"
                                   rules={[{required:true}]}>
                            <Select
                                value={this.state.currentItem.isStable}
                                onChange={this.alerthandleChange}>
                                <Option title="isStable" value="是">是</Option>
                                <Option title="isStable" value="否">否</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="能效已降低"
                                   rules={[{required:true}]}>
                            <Select value={this.state.currentItem.isEfficiency}
                                   name="isEfficiency"
                                   onChange={this.alerthandleChange}>
                                <Option title="isEfficiency" value="是">是</Option>
                                <Option title="isEfficiency" value="否">否</Option>
                            </Select>
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
                                <Input value={this.state.currentItem.batchNumber}
                                       onChange={this.inputOnChange}
                                       name="batchNumber"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="试剂类型"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.reagentType}
                                       onChange={this.inputOnChange}
                                       name="reagentType"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="反应时间（秒）"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.responsTime}
                                       onChange={this.inputOnChange}
                                       name="responsTime"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="所属单位"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.affiliation}
                                       onChange={this.inputOnChange}
                                       name="affiliation"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="是否定性"
                                       rules={[{required:true}]}>
                                <Select
                                    value={this.state.currentItem.isStable}
                                    onChange={this.alerthandleChange}>
                                    <Option title="isStable" value="是">是</Option>
                                    <Option title="isStable" value="否">否</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="能效已降低"
                                       rules={[{required:true}]}>
                                <Select value={this.state.currentItem.isEfficiency}
                                        name="isEfficiency"
                                        onChange={this.alerthandleChange}>
                                    <Option title="isEfficiency" value="是">是</Option>
                                    <Option title="isEfficiency" value="否">否</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
            </div>
        )
    }
}
