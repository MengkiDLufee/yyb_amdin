import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined} from "@ant-design/icons";

const { Option } = Select;



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


// function handleChange(value) {
//     console.log(`selected ${value}`);
// }


export default class ReagentType extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.handleAdd=this.handleAdd.bind(this);
        this.inputOnChange=this.inputOnChange.bind(this);
        this.handleModify=this.handleModify.bind(this);
        this.reset=this.reset.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:data,
        //搜索框
        paperTypeName:'',
        sampleType:null,
        organization:null,

        currentPage:1,
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
                //搜索框
                paperTypeName:'',
                sampleType:'',
                organization:'',


                currentPage:1,

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
        if(this.state.paperTypeName!==""){
            params.paperTypeName=this.state.paperTypeName;
        }
        if(this.state.sampleType!==""){
            params.sampleType=this.state.sampleType;
        }
        if(this.state.organization!==""){
            params.organization=this.state.organization;
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
            sampleType:'',
            organization:'',


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
                                placeholder="请选择样本类型"
                                style={{width:'100%'}}
                                value={this.state.sampleType}
                                onChange={this.handleChange}>
                                <Option title="sampleType" value="sampleType1">样本类型1</Option>
                                <Option title="sampleType" value="sampleType2">样本类型2</Option>
                                <Option title="sampleType" value="sampleType3">样本类型3</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Select placeholder="请选择所属单位"
                                    style={{width:'100%'}}
                                    value={this.state.organization}
                                    onChange={this.handleChange}>
                                <Option title="organization" value="affiliatedInstitutions1">单位1</Option>
                                <Option title="organization" value="affiliatedInstitutions2">单位2</Option>
                                <Option title="organization" value="affiliatedInstitutions3">单位3</Option>
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
                            <Button type="primary" ><ExportOutlined />导出</Button>
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
