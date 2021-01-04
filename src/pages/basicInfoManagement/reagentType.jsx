import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined} from "@ant-design/icons";
import exportFile from "../../exportFile";
import httpRequest from "../../http";

const { Option } = Select;



export default class ReagentType extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.form_modify = React.createRef();
        this.handleAdd=this.handleAdd.bind(this);
        this.handleExport=this.handleExport.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:[],
        //搜索框
        paperTypeName:'',
        sampleType:null,
        organization:null,
        //搜索框选项
        sampleTypeGroup:[],
        organizationGroup:[],
        //总数据数
        total:null,
        //分页
        currentPage:1,
        pageSize:10,
        //修改
        currentItem:{
            key: null,
            reagentName:'',
            code:'',
            resultUnit:'',
            barcode:'',
            referenceLow:null,
            referenceHigh :null,
            sampleType :'',
            affiliatedInstitutions :'',
            updateTime:'',
        },
    };

    columns = [
        {
            title: '试剂名称',
            dataIndex: 'paperTypeName',
            sorter: (a,b) => a.paperTypeName.length - b.paperTypeName.length,
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
            dataIndex: 'unit',
            sorter: (a,b) => a.unit.length - b.unit.length,
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
            dataIndex: 'rangeBegin',
            sorter: (a,b) => a.rangeBegin - b.rangeBegin,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '参考值上限',
            dataIndex: 'rangeEnd',
            sorter: (a,b) => a.rangeEnd - b.rangeEnd,
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
            dataIndex: 'organizationName',
            sorter: (a,b) => a.organizationName.length - b.organizationName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '更新时间',
            dataIndex: 'updateDate',
            sorter:(a,b)=>{
                let atimeString=a.updateDate;
                let btimeString=b.updateDate;
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
                    <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                            onClick={()=>{this.handleDelete(record)}}>删除</Button>
                    <Button>查看标曲</Button>
                    <Button style={{
                        backgroundColor:'#ec7259',
                        color:'#FFFAFA'}}>默认标曲</Button>
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
        httpRequest('post','/paper/list',params)
            .then(response=>{
                console.log('试剂类型')
                console.log(response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                }
            }).catch(err => {
            console.log(err);
        })


        //请求样本类型
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求样本类型",response)
                if(response.data!==[]) {
                    this.setState({
                        sampleTypeGroup: response.data.data.info,
                    })
                    console.log("样本类型",this.state.sampleTypeGroup)

                }
            }).catch(err => {
            console.log(err);
        })


        //请求单位名称
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求单位数据",response)
                if(response.data!==[]) {
                    this.setState({
                        organizationGroup: response.data.data.info,
                    })
                    console.log("单位名称",this.state.organizationGroup)

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
                //搜索框
                paperTypeName:'',
                sampleType:'',
                organization:'',


                currentPage:1,

                //修改
                currentItem:{
                    key: null,
                    barcode: '',
                    code: '',
                    organization: null,
                    organizationName: '',
                    paperTypeId: '',
                    paperTypeName: '',
                    paperTypeNameEn:'',
                    rangeBegin: null,
                    rangeEnd: null,
                    sampleType: '',
                    unit: '',
                    updateDate: '',

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

    //导出
    handleExport(){
        console.log("导出");
        let paperTypeIdList=[];
        this.state.selectedRowKeys.forEach((item)=>{
            paperTypeIdList.push(this.state.data[item].paperTypeId)
        })

        console.log(paperTypeIdList)
        exportFile('/paper/export',{paperTypeIdList:paperTypeIdList},'试剂类型')

    }

    //搜索
    search(){
        let params={};
        if(this.state.paperTypeName!==""){
            params.paperTypeName=this.state.paperTypeName;
        }
        if(this.state.sampleType!==""){
            params.sampleType=this.state.sampleType;
        }
        if(this.state.organization!==""){
            params.organizationName=this.state.organization;
        }
        params.page=1;
        params.pageSize=this.state.pageSize;
        console.log(params);

        httpRequest('post','/paper/list',params)
            .then(response=>{
                console.log(response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    }

    //重置
    reset(){
        console.log("重置")
        let params={
            page:1,
            pageSize:10,
        }
        httpRequest('post','/paper/list',params)
            .then(response=>{
                console.log('试剂类型')
                console.log(response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                }
            }).catch(err => {
            console.log(err);
        })


        //请求样本类型
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求样本类型",response)
                if(response.data!==[]) {
                    this.setState({
                        sampleTypeGroup: response.data.data.info,
                    })
                    console.log("样本类型",this.state.sampleTypeGroup)

                }
            }).catch(err => {
            console.log(err);
        })


        //请求单位名称
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求单位数据",response)
                if(response.data!==[]) {
                    this.setState({
                        organizationGroup: response.data.data.info,
                    })
                    console.log("单位名称",this.state.organizationGroup)

                }
            }).catch(err => {
            console.log(err);
        })
        this.setState({
            currentItem:{
                key: null,
                reagentName:'',
                code:'',
                resultUnit:'',
                barcode:'',
                referenceLow:null,
                referenceHigh :null,
                sampleType :'',
                affiliatedInstitutions :'',
                updateTime:'',
            },

            //搜索框
            paperTypeName:'',
            sampleType:null,
            organization:null,
            //当前页
            currentPage:1,
        });
        console.log(this.state)


    }
    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let data=Object.assign({},this.state.currentItem,{
            key:record.key,
            reagentName:record.reagentName,
            code:record.code,
            resultUnit:record.resultUnit,
            barcode:record.barcode,
            referenceLow:record.referenceLow,
            referenceHigh :record.referenceHigh,
            sampleType :record.sampleType,
            affiliatedInstitutions :record.affiliatedInstitutions,
            updateTime:record.updateTime,
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
        console.log(this.state.currentItem)
        console.log("llla",flag)

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
        let data=Object.assign({},this.state.currentItem,{
            key: key,
            reagentName:this.state.currentItem.reagentName,
            code:this.state.currentItem.code,
            resultUnit:this.state.currentItem.resultUnit,
            barcode:this.state.currentItem.barcode,
            referenceLow:this.state.currentItem.referenceLow,
            referenceHigh :this.state.currentItem.referenceHigh,
            sampleType :this.state.currentItem.sampleType,
            affiliatedInstitutions :this.state.currentItem.affiliatedInstitutions,
            updateTime:`${year}-${month}-${day} ${hour}:${minute}:${second}`,
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
                    reagentName:'',
                    code:'',
                    resultUnit:'',
                    barcode:'',
                    referenceLow:null,
                    referenceHigh :null,
                    sampleType :'',
                    affiliatedInstitutions :'',
                    updateTime:'',
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

    //导出
    handleExport(){
        console.log("导出");
        let paperTypeIdList=[];
        this.state.selectedRowKeys.forEach((item)=>{
            console.log(this.state.data)
            paperTypeIdList.push(this.state.data[item].paperTypeId)
        })
        console.log(paperTypeIdList)
        exportFile('paper/export',{paperTypeIdList:paperTypeIdList},'判读参数')

    }

    //关闭modal
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,

            currentItem:{
                key: null,
                reagentName:'',
                code:'',
                resultUnit:'',
                barcode:'',
                referenceLow:null,
                referenceHigh :null,
                sampleType :'',
                affiliatedInstitutions :'',
                updateTime:'',
            },

        });
    };

    //输入框变化
    inputOnChange=e=>{
        console.log(e)
        const name=e.target.name;
        const value=e.target.value;
        console.log({[name]:value})
        if(name===" paperTypeName"){
            console.log("进到搜索框了")
            this.setState({
                paperTypeName:value
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
    //单位选择框内容（完成）
    oroption(){
        return(
            this.state.organizationGroup.map((item)=>{
                return(<Option title="organization" value={item.unitName}>{item.unitName}</Option>)
            })
        )
    }

    //样本类型选择框内容
    saoption(){
        return(
            this.state.sampleTypeGroup.map((item)=>{
                return(<Option title="sampleType" value={item.sampleType}>{item.sampleType}</Option>)
            })
        )
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
                        <Col span={3}>
                            <Input  placeholder="试剂名称"
                                    value={this.state.paperTypeName}
                                    name=" paperTypeName"
                                    onChange={this.inputOnChange}
                                    allowClear/>
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="请选择所属单位"
                                value={this.state.sampleType}
                                style={{width:'100%'}}
                                onChange={this.handleChange}>
                                {this.saoption()}
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="请选择所属单位"
                                value={this.state.organization}
                                style={{width:'100%'}}
                                onChange={this.handleChange}>
                                {this.oroption()}
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
                        <Col span={2} >
                            <Button type="primary" onClick={this.handleExport}><ExportOutlined />导出</Button>
                        </Col>
                        <Col span={5} >

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
                    title="添加试剂类型"
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
                        <Form.Item label="试剂名称"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.reagentName}
                                   name="reagentName"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="代码"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.code}
                                   name="code"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="结果单位"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.resultUnit}
                                   name="resultUnit"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="条码（不包括批号）"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.barcode}
                                   name="barcode"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="参考值下限"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.referenceLow}
                                   name="referenceLow"
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="参考值上限"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.referenceHigh }
                                   name="referenceHigh "
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="样本类型"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.sampleType }
                                   name="sampleType "
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="所属单位"
                                   rules={[{required:true}]}>
                            <Input value={this.state.currentItem.affiliatedInstitutions }
                                   name="affiliatedInstitutions "
                                   onChange={this.inputOnChange}
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改试剂类型"
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
                            <Form.Item label="试剂名称"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.reagentName}
                                       name="reagentName"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="代码"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.code}
                                       name="code"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="结果单位"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.resultUnit}
                                       name="resultUnit"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="条码（不包括批号）"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.barcode}
                                       name="barcode"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值下限"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.referenceLow}
                                       name="referenceLow"
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值上限"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.referenceHigh }
                                       name="referenceHigh "
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="样本类型"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.sampleType }
                                       name="sampleType "
                                       onChange={this.inputOnChange}
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="所属单位"
                                       rules={[{required:true}]}>
                                <Input value={this.state.currentItem.affiliatedInstitutions }
                                       name="affiliatedInstitutions "
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
