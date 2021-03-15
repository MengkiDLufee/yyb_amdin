import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined} from '@ant-design/icons';
import httpRequest from "../../http";

const { Option } = Select;

export default class TestType extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.form_modify = React.createRef();
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
        associtedSelectedRows:[],
        loading: false,
        addVisible:false,
        modifyVisible: false,
        associatedModifyVisible:false,
        associateVisible:false,
        logicVisible:false,
        data:[],
        total:null,
        associatedTotal:null,
        reagentTotal:null,
        associatedData:[],
        reagentData:[],
        //搜索框
        testTypeName:'',
        testSetId:null,

        //分页
        currentPage:1,
        pageSize:10,
        associatedcurrentPage:1,
        associatedPageSize:10,
        reagentCurrentPage:1,
        reagentPageSize:10,

        //选择框
        testSetGroup:[],

        //标记数据
        testTypeId:null,

        currentId:null,

        //已关联试剂中修改弹窗中的已选中的行
        selectRowkey_modify:[]

    };

    //表格列名
   columns = [
        {
            title: '测试类型名称',
            dataIndex: 'testTypeName',
            sorter: (a,b) => a.testTypeName.length - b.testTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '测试集名称',
            dataIndex: 'testSetName',
            sorter: (a,b) => a.testSetName.length - b.testSetName.length,
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
//所有可关联的试剂类型
    reagentcolumns = [
        {
            title: '试剂名称',
            dataIndex: 'paperTypeName',
            sorter: (a,b) => a.paperTypeName.length - b.paperTypeName.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '结果单位',
            dataIndex: 'unit',
            sorter: (a,b) => a.unit.length - b.unit.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: '条码(不包括批号)',
            dataIndex: 'barcode',
            sorter: (a,b) => a.barcode.length - b.barcode.length,
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
            dataIndex: 'organization',
            sorter: (a,b) => a.organization.length - b.organization.length,
            sortDirections: ['descend','ascend'],
        },


    ];

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [], // Check here to configure the default column
                associtedSelectedRowKeys:[],
                loading: false,
                addVisible:false,
                modifyVisible: false,
                associatedModifyVisible:false,
                associateVisible:false,
                logicVisible:false,
                data:[],
                associatedData:[],
                //搜索框
                testTypeName:'',
                testSetId:null,

                //分页
                currentPage:1,
                pageSize:10,
                associatedcurrentPage:1,
                associatedPageSize:10,

                //选择框
                testSetGroup:[],
                currentId:null,
            });
        }, 1000);
    };

    //初始页面请求数据
    componentDidMount() {
        let params={
            page:1,
            pageSize:10,
        }
        httpRequest('post','/test/type/list',params)
            .then(response=>{
                console.log("请求测试类型",response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                    }
                    this.setState({
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        //请求测试集
        httpRequest('post','/test/list',{})
            .then(response=>{
                console.log("请求测试集",response)
                if(response.data!==[]) {
                    this.setState({
                        testSetGroup: response.data.data.info,
                    })
                    console.log("测试集",this.state.testSetGroup)

                }
            }).catch(err => {
            console.log(err);
        })

    }



    //行选择
    onSelectChange = selectedRowKeys => {
        //已选中的行数
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    associatedOnSelectChange = (associtedSelectedRowKeys,associtedSelectedRows) => {
        console.log("this.state.associtedSelectedRowKeys",this.state.associtedSelectedRowKeys)
        //console.log("associtedSelectedRows",associtedSelectedRows);
        //console.log('associtedSelectedRowKeys changed: ', associtedSelectedRowKeys);
        let row=this.state.associtedSelectedRowKeys;
        row.push(associtedSelectedRowKeys[associtedSelectedRowKeys.length-1])
        this.setState({
            associtedSelectedRowKeys:row,
            associtedSelectedRows},()=>{
            console.log(this.state.associtedSelectedRowKeys)
        });

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
        params.page=1;
        params.pageSize=this.state.pageSize;
        if(this.state.testTypeName!==""){
            params.testTypeName=this.state.testTypeName;
        }
        if(this.state.testSetId!==null){
            params.testSetId=this.state.testSetId;
        }
        console.log(params);
        httpRequest('post','/test/type/list',params)
            .then(response=>{
                console.log("搜索测试类型",response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                    }
                    this.setState({
                        data:tempData,
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
        httpRequest('post','/test/type/list',params)
            .then(response=>{
                console.log("请求测试类型",response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                    }
                    this.setState({
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        //请求测试集
        httpRequest('post','/test/list',{})
            .then(response=>{
                console.log("请求测试集",response)
                if(response.data!==[]) {
                    this.setState({
                        testSetGroup: response.data.data.info,
                    })
                    console.log("测试集",this.state.testSetGroup)

                }
            }).catch(err => {
            console.log(err);
        })

        this.setState({
            //搜索框
            testTypeName:'',
            testSetId:null,
            //当前页
            currentPage:1,
        });
    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        this.setState({
                modifyVisible:true,
                testTypeId:record.testTypeId,
            },
            ()=>console.log(this.state.currentItem)
        );
        let form_modify=this.form_modify.current;
        console.log("修改表格",form_modify)
        if(form_modify){
            form_modify.setFieldsValue({
                testSetId:record.testSetId,
                testTypeCode:record.testTypeCode,
                testTypeName:record.testTypeName
            })
        }
    }

    //挑选可关联的试剂类型
    Modify(e){
        console.log('所有可关联的试剂类型',e)
        this.setState({
                associatedModifyVisible:true,
                testTypeId:e.testTypeId,
            },
            ()=> {
                let params={
                    page:1,
                    pageSize:this.state.pageSize,
                }
                httpRequest('post','/paper/list',params)
                    .then(response=>{
                        console.log(response)
                        console.log(response.data.data)
                        if(response.data!==[]) {
                            this.setState({
                                reagentData: response.data.data.info,
                                reagentTotal: response.data.data.total,
                            })
                            const tempData=[...this.state.reagentData];
                            for(let i=0;i<tempData.length;i++){
                                tempData[i].key=i;
                            }
                            let defaultSelected=[];
                            let defaultRows=[];
                            this.state.associatedData.forEach((item)=>{
                                tempData.forEach((it,index)=>{
                                    if(it.paperTypeId===item.paperTypeId){
                                        console.log()
                                        defaultSelected.push(index);
                                        defaultRows.push(it);
                                    }
                                })
                            })
                            this.setState({
                                associtedSelectedRowKeys:defaultSelected,
                                reagentData:tempData,
                                associtedSelectedRows:defaultRows,
                            },()=>{
                                console.log("this.state.associtedSelectedRowKeys",this.state.associtedSelectedRowKeys)

                                // this.setState({
                                //     reagentData:tempData,
                                // })
                            })
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
        );
    }

    //查看当前所关联的试剂类型
    handleAssociate=(record)=>{
        console.log('所关联的试剂类型',record)
        this.setState({
                associateVisible:true,
                currentId:record.testTypeId,
                currentItem:{
                    reagent:record.reagent,
                    reagentNameEN:record.reagentNameEN,
                    insertDate:record.insertDate,
                }
            },
            ()=>{
                let params={
                    page:1,
                    pageSize:this.state.pageSize,
                    testTypeId:this.state.currentId,
                }
                httpRequest('post','/test/type/paper/list',params)
                    .then(response=>{
                        console.log(response)
                        console.log(response.data.data)
                        if(response.data!==[]) {
                            this.setState({
                                associatedData: response.data.data.info,
                                associatedTotal: response.data.data.total,
                            })
                            const tempData=[...this.state.associatedData];
                            for(let i=0;i<tempData.length;i++){
                                tempData[i].key=i;
                            }
                            this.setState({
                                associatedData:tempData,
                            })
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
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
        let params={
            testTypeId:record.testTypeId,
        }
        httpRequest('post','/test/type/delete',params)
            .then(response=>{
                console.log(params)
                console.log("请求",response)
                if(response.data.code===1006){
                    let params={
                        page:this.state.currentPage,
                        pageSize:this.state.pageSize,
                    }
                    httpRequest('post','/test/type/list',params)
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
                                }
                                this.setState({
                                    data:tempData,
                                })
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                }
                else{
                    alert("删除失败，请稍后再试")
                }
            }).catch(err => {
            console.log(err);
        })
    }

    //modal点击确认
    handleOk = e => {
        let form = this.form.current;
        let form_modify=this.form_modify.current;
        this.setState({
            loading: true,
        });
        //修改
        if(this.state.modifyVisible){
            console.log("进入修改")
            form_modify.validateFields()//表单输入校验
                .then((values) => {
                    console.log("form_modify",values)
                    let params={
                        testTypeId:this.state.testTypeId,
                        testTypeName:values.testTypeName,
                        testSetId:values.testSetId,
                        testTypeCode:values.testTypeCode,
                    }
                    console.log("参数",params)
                    httpRequest('post','/test/type/modify',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1004){
                                let inital_param={
                                    page:this.state.currentPage,
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/test/type/list',inital_param)
                                    .then(response=>{
                                        console.log(response.data.data)
                                        if(response.data!==[]) {
                                            this.setState({
                                                data: response.data.data.info,
                                                total: response.data.data.total,
                                            })
                                            const tempData=[...this.state.data];
                                            for(let i=0;i<tempData.length;i++){
                                                tempData[i].key=i;
                                            }
                                            this.setState({
                                                data:tempData,
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    form_modify.resetFields();
                                    this.setState({
                                        loading:false,
                                        modifyVisible: false,
                                    });
                                }, 1000);
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }
        //添加
        if(this.state.addVisible){
            console.log("进入添加")
            console.log("form",form)
            form.validateFields()//触发表单验证
                .then((values) => {
                    console.log("form validate", values)
                    this.setState({
                        loading: true,
                    });
                    let params={
                        testTypeName:values.testTypeName,
                        testSetId:values.testSetId,
                        testTypeCode:values.testTypeCode,
                    }
                    console.log("参数",params)
                    httpRequest('post','/test/type/add',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1002){
                                let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                                let inital_params={
                                    page:Math.ceil(cu_page),
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/test/type/list',inital_params)
                                    .then(response=>{
                                        console.log(response.data.data)
                                        if(response.data!==[]) {
                                            this.setState({
                                                data: response.data.data.info,
                                                total: response.data.data.total,
                                            })
                                            const tempData=[...this.state.data];
                                            for(let i=0;i<tempData.length;i++){
                                                tempData[i].key=i;
                                            }
                                            this.setState({
                                                data:tempData,
                                                currentPage:inital_params.page
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    form.resetFields();
                                    this.setState({
                                        loading:false,
                                        addVisible: false,
                                    });
                                }, 1000);
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }
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
            testTypeId:'',
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

    //返回
    handleReturn = e => {
        console.log(e);
        this.setState({
            associatedModifyVisible:false,
        });
    };

    //提交
    handleSubmit=e=>{
        console.log("提交",e)
        let params={};
        console.log("currentId",this.state.currentId)
        if(this.state.currentId!==undefined){
            params.testTypeId=this.state.currentId;
            params.paperTypeIdList=[];
            if(this.state.associtedSelectedRows!==[]){
                this.state.associtedSelectedRows.forEach(e=>{
                    params.paperTypeIdList.push(e.paperTypeId);
                })
                console.log("提交button的网络请求",params)
                httpRequest('post','/test/type/paper/modify',params)
                    .then(response=>{
                        console.log(response)
                        if(response.data.code===1004){
                            this.setState({
                                associatedModifyVisible:false,
                                associtedSelectedRowKeys:[],
                                associtedSelectedRows:[],
                            },()=>{
                                let params={
                                    page:1,
                                    pageSize:this.state.pageSize,
                                    testTypeId:this.state.currentId,
                                }
                                console.log("查询时发的请求",params,this.state.associtedSelectedRowKeys)
                                httpRequest('post','/test/type/paper/list',params)
                                    .then(response=>{
                                        console.log(response)
                                        console.log(response.data.data)
                                        if(response.data!==[]) {
                                            this.setState({
                                                associatedData: response.data.data.info,
                                                associatedTotal: response.data.data.total,
                                            })
                                            const tempData=[...this.state.associatedData];
                                            for(let i=0;i<tempData.length;i++){
                                                tempData[i].key=i;
                                            }
                                            this.setState({
                                                associatedData:tempData,
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })

                            })
                        }

                    }).catch(err=>{
                        console.log(err);
                })
            }
            else{
                this.setState({
                    associatedModifyVisible:false,
                    associtedSelectedRowKeys:[],
                    associtedSelectedRows:[],
                })
            }
        }
        else{
            alert("不可修改");
            this.setState({
                associatedModifyVisible:false,
                associtedSelectedRowKeys:[],
                associtedSelectedRows:[],
            })
        }

    }

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

    //主页面表格分页
    onChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
        let params={
            page:page,
            pageSize:this.state.pageSize,
        }
        httpRequest('post','/test/type/list',params)
            .then(response=>{
                console.log("请求测试类型",response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        data: response.data.data.info,
                        total: response.data.data.total,
                    })
                    const tempData=[...this.state.data];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i;
                    }
                    this.setState({
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    };

    onChangeAssociated=page=>{
        console.log(page);
    }

    onChangeReagent=page=>{
        console.log(page);
    }

    //测试集选择框内容
    teoption(){
        return(
            this.state.testSetGroup.map((item)=>{
                return(<Option title="testSetId" value={item.testSetId}>{item.testSetName}</Option>)
            })
        )
    }

    form = React.createRef();
    render() {
        const { loading, associtedSelectedRowKeys} = this.state;
        
        const associatedRowSelection = {
            //associtedSelectedRowKeys: associtedSelectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.associatedOnSelectChange,
            selectedRowKeys:associtedSelectedRowKeys
        };
        // const hasSelected = selectedRowKeys.length > 0;

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

        // const rowSelection_1 = {
        //     onChange: (selectedRowKeys, selectedRows) => {
        //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //     },
        //     // selectedRowKeys:[1]
        // };

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
                            {this.teoption()}
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
                        columns={this.columns}
                        dataSource={this.state.data}
                        rowKey={record => record.key}
                        bordered={true}
                        style={{margin:'20px 0'}}
                        pagination={{
                            position: ['bottomLeft'] ,
                            total:this.state.total,
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
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                添加
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <Form {...formItemLayout}
                          name="add"
                          ref={this.form}>
                        <Form.Item label="测试集"
                                   name="testSetId"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Select placeholder="请选择测试集">
                                {this.teoption()}
                            </Select>
                        </Form.Item>
                        <Form.Item label="测试类型代码"
                                   name="testTypeCode"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input allowClear
                                   placeholder="请输入测试类型代码"/>
                        </Form.Item>
                        <Form.Item label="测试类型名称"
                                   name="testTypeName"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input placeholder="请输入测试类型名称"
                                   allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改测试类型数据"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                修改
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <div>
                        <Form {...formItemLayout}
                              name="modify"
                              ref={this.form_modify}>
                            <Form.Item label="测试集"
                                       name="testSetId"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Select placeholder="请选择测试集">
                                    {this.teoption()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="测试类型代码"
                                       name="testTypeCode"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input allowClear
                                       placeholder="请输入测试类型代码"/>
                            </Form.Item>
                            <Form.Item label="测试类型名称"
                                       name="testTypeName"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入测试类型名称"
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
                <Modal
                    title="已关联的试剂类型"
                    visible={this.state.associateVisible}
                    onCancel={this.handleCancel}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <div>
                        <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                                onClick={this.Modify}>修改</Button>
                        <Table
                            columns={this.associatedcolumns}
                            dataSource={this.state.associatedData}
                            rowKey={record => record.key}
                            bordered={true}
                            style={{margin:'20px 0'}}
                            pagination={{
                                position: ['bottomLeft'] ,
                                total:this.state.associatedTotal,
                                showTotal:total => `共 ${total} 条`,
                                showQuickJumper:true,
                                showSizeChanger:true,
                                current:this.state.associatedcurrentPage,
                                onChange:this.onChangeAssociated,
                            }}
                        />
                    </div>
                    <Modal
                        title="修改测试类型数据"
                        visible={this.state.associatedModifyVisible}
                        onOk={this.handleSubmit}
                        width={1400}
                        onCancel={this.handleReturn}
                        footer={[
                            <div style={{textAlign:"center"}}>
                                <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
                                    提交
                                </Button>,
                                <Button key="back" onClick={this.handleReturn}>
                                    返回
                                </Button>,
                            </div>
                        ]}>
                        <div>
                            <Table
                                rowSelection={associatedRowSelection}
                                // rowSelection={rowSelection_1}
                                columns={this.reagentcolumns}
                                dataSource={this.state.reagentData}
                                rowKey={record => record.key}
                                bordered={true}
                                style={{margin:'20px 0'}}
                                pagination={{
                                    position: ['bottomLeft'] ,
                                    total:this.state.reagentTotal,
                                    showTotal:total => `共 ${total} 条`,
                                    showQuickJumper:true,
                                    showSizeChanger:true,
                                    current:this.state.reagentCurrentPage,
                                    onChange:this.onChangeReagent,
                                }}
                            />
                        </div>

                    </Modal>
                </Modal>
            </div>
        )
    }
}
