import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form, Image, Upload, Spin, Popconfirm,message} from 'antd';
import {SearchOutlined,PlusSquareOutlined,ReloadOutlined,UploadOutlined} from '@ant-design/icons';
import httpRequest from "../../http";
import ImportFile from "../../compenents/importfile";
import axios from "axios";

const { Option } = Select;
function findKey (obj,value, compare = (a, b) => a === b) {  return Object.keys(obj).find(k => compare(obj[k], value))
}

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
        this.uploadTemplete=this.uploadTemplete.bind(this);
        this.handleCancel_import=this.handleCancel_import.bind(this);
        this.viewHistory=this.viewHistory.bind(this);
        this.handleProduct=this.handleProduct.bind(this);
        this.handleDeleteHistory=this.handleDeleteHistory.bind(this);
        this.handleModifyHistory=this.handleModifyHistory.bind(this);
        this.onSelectType=this.onSelectType.bind(this);
        this.onSelectResult=this.onSelectResult.bind(this);
        this.onViewImage=this.onViewImage.bind(this);
        this.onSelectImage=this.onSelectImage.bind(this);
        this.onModifyPrompt=this.onModifyPrompt.bind(this);
        //this.handleSubmitPrompt=this.handleSubmitPrompt.bind(this);
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        associtedSelectedRowKeys:[],
        associtedSelectedRows:[],
        loading: false,
        addVisible:false,
        modifyVisible: false,
        modifyPromptVisible: false,
        associatedModifyVisible:false,
        associateVisible:false,
        logicVisible:false,
        visible_import:false,
        historyVisible:false,
        data:[],
        total:null,
        associatedTotal:null,
        reagentTotal:null,
        parametersTotal:null,
        promptTotal:null,
        associatedData:[],
        reagentData:[],
        historyData:[],
        logicData:[],
        parametersData:[],
        promptData:[],
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
        historycurrentPage:1,
        historyPageSize:10,
        parameterscurrentPage:1,
        parameterPageSize:10,
        promptcurrentPage:1,
        promptPageSize:10,

        //选择框
        testSetGroup:[],

        //标记数据
        testTypeId:null,
        currentId:null,

        //判读逻辑
        functionMethodVisible:false,
        //判读参数
        judgeParamVisible:false,
        judgeParamId:'',

        //判读提示语
        messageVisible:false,
        resultVisible:false,
        viewVisible:false,
        imageVisible:false,
        judgeMethodId:'',

        //radio
        valueType:'',
        valueResult:'',

        //图片路径
        pictureSource:'',

        //判断图片是否已经加载完成
        isload:false,
        imgDisplay:'none',
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
            align:'center',
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleAssociate(record)}}>已关联试剂类型</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleLogic(record)}}>当前生产判读逻辑</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.uploadTemplete(record)}}>上传模板</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.viewHistory(record)}}>查看历史</Button>
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleModify(record)}}>修改</Button>
                    <Popconfirm title="确定删除？"
                                onConfirm={()=>{this.handleDelete(record)}}
                                onCancel={()=>{}}
                                okText="确定"
                                cancelText="取消"
                    >
                        <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                                //onClick={()=>{this.handleDelete(record)}}
                        >删除</Button>
                    </Popconfirm>

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
            //sorter: (a,b) => a.paperTypeName.length - b.paperTypeName.length,
            sorter: (a,b) => Number(a.associated) - Number(b.associated),
            sortDirections: ['descend','ascend'],
            defaultSortOrder: 'descend',
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
            dataIndex: 'organizationName',
            sorter: (a,b) => a.organizationName.length - b.organizationName.length,
            sortDirections: ['descend','ascend'],
        },


    ];
    //判读逻辑历史
    historycolumns=[
        {
            title: '函数方法名',
            dataIndex: 'functionMethod',
            sorter: (a,b) => a.functionMethod.localeCompare(b.functionMethod),
            sortDirections: ['descend','ascend'],
            ellipsis:true,

        },
        {
            title: '版本号',
            dataIndex: 'version',
            sorter: (a,b) => a.version-b.version,
            sortDirections: ['descend','ascend'],
            width:150,
        },
        {
            title: '生效时间',
            dataIndex: 'startDate',
            sorter:(a,b)=>{
                let atimeString=a.startDate;
                let btimeString=b.startDate;
                let atime=new Date(atimeString).getTime();
                let btime=new Date(btimeString).getTime();
                return atime-btime;
            },
            sortDirections: ['descend','ascend'],
            width:200,
        },
        {
            title: '失效时间',
            dataIndex: 'endDate',
            sorter:(a,b)=>{
                let atimeString=a.endDate;
                let btimeString=b.endDate;
                let atime=new Date(atimeString).getTime();
                let btime=new Date(btimeString).getTime();
                return atime-btime;
            },
            sortDirections: ['descend','ascend'],
            width:200,
        },
        {
            title: '当前状态',
            dataIndex: 'production',
            sorter: (a,b) => a.production-b.production,
            sortDirections: ['descend','ascend'],
            width:150,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 400,
            align:'center',
            render: (text, record) => (
                <Space size="middle">
                    <Button style={record.production==="历史"?{color:'black',background:'white'}:{display:'none'}}
                            onClick={()=>{this.handleModifyHistory(record)}}
                            disabled={record.production==="历史"?false:true}>修改</Button>
                    <Button style={record.production==="历史"?{backgroundColor:'#ec7259', color:'#FFFAFA'}:{display:'none'}}
                            onClick={()=>{this.handleProduct(record)}}>设置为生产</Button>
                    <Popconfirm title="确定删除？"
                                onConfirm={()=>{this.handleDeleteHistory(record)}}
                                onCancel={()=>{}}
                                okText="确定"
                                cancelText="取消"
                    >
                        <Button style={record.production==="历史"?{color:'black',background:'white'}:{display:'none'}}
                                //onClick={()=>{this.handleDeleteHistory(record)}}
                        >删除</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ]
    //判读逻辑
    logicColumns=[
        {
            title: '函数值',
            dataIndex: 'functionMethod',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            width:100,
            render: (text, record) => (
                <Space size="middle">
                    <Button style={record.functionMethod!==null?{backgroundColor:'#f05d73', color:'#FFFAFA',position:'absolute',width: '80%',left:'10%',top:'20%'}:{display:'none'}}
                            onClick={()=>{this.onModifyPrompt(record)}}><p style={{display:'inline-block',whiteSpace:'nowrap'}}>修改</p></Button>
                </Space>
            ),
        },
    ]
    //判读参数
    parametersColumns=[
        {
            title: '编码',
            dataIndex: 'judgeParamCode',
            ellipsis:true,

        },
        {
            title: '值',
            dataIndex: 'judgeParamValue',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            width:100,
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{backgroundColor:'#f05d73', color:'#FFFAFA',position:'absolute',width: '80%',left:'10%',top:'20%'}}
                            onClick={()=>{this.onModifyPrompt(record)}}><p style={{display:'inline-block',whiteSpace:'nowrap'}}>修改</p></Button>
                </Space>
            ),
        },
    ]
    //判读提示语
    promptColumns=[
        {
            title: '编码',
            dataIndex: 'judgeTipsCode',
            ellipsis:true,

        },
        {
            title: '提示语类型',
            dataIndex: 'judgeTipsType',
            ellipsis:true,
            width:120,
        },
        {
            title: '结论类型',
            dataIndex: 'resultType',
            ellipsis:true,
            width:100,
        },
        {
            title: '提示语',
            dataIndex: 'judgeTipsValue',
            ellipsis:true,
        },
        {
            title: '结果数据',
            dataIndex: 'resultDataTips',
            ellipsis:true,
        },
        {
            title: '短提示语',
            dataIndex: 'shortTips',
            ellipsis:true,
        },
        {
            title: '长提示语',
            dataIndex: 'longTips',
            ellipsis:true,
        },
        {
            title: '图片提示语',
            dataIndex: 'pictureTips',
            ellipsis:true,

        },
        {
            title: '提示语图片',
            dataIndex: 'promptPicture',
            ellipsis:true,
            width:120,
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{color:'black',background:'white',position:'absolute',width: '80%',left:'10%',top:'20%'}}
                            onClick={()=>{this.onViewImage(record)}}><p style={{display:'inline-block',whiteSpace:'nowrap'}}>查看图片</p></Button>
                </Space>
            ),


        },
        {
            title: '操作',
            dataIndex: 'option',
            width:100,
            render: (text, record) => (
                <Space size="middle" record>
                    <Button style={{backgroundColor:'#f05d73',color:'#FFFAFA',position:'absolute',width: '80%',left:'10%',top:'20%'}}
                            onClick={()=>{this.onModifyPrompt(record)}}><p style={{display:'inline-block',whiteSpace:'nowrap'}}>修改</p></Button>
                </Space>
            ),

        },
    ]
//在翻页时存储已选中的表格项
    selectedStorage=[];

    //提示语字典
    hintDic=[];
    resultDic=[];

    //样本类型字典
    sampleDic=[];
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                associtedSelectedRowKeys:[],
                loading: false,
                addVisible:false,
                modifyVisible: false,
                associatedModifyVisible:false,
                associateVisible:false,
                logicVisible:false,
                visible_import:false,
                historyVisible:false,
                data:[],
                associatedData:[],
                historyData:[],
                logicData:[],
                parametersData:[],
                promptData:[],
                //搜索框
                testTypeName:'',
                testSetId:null,

                //分页
                currentPage:1,
                pageSize:10,
                associatedcurrentPage:1,
                associatedPageSize:10,
                historycurrentPage:1,
                historyPageSize:10,

                //选择框
                testSetGroup:[],
                currentId:null,

                modifyPromptVisible:false,

                //判读逻辑
                functionMethodVisible:false,
                //判读参数
                judgeParamVisible:false,
                judgeParamId:'',

                //判读提示语
                messageVisible:false,
                resultVisible:false,
                viewVisible:false,
                imageVisible:false,
                judgeMethodId:'',
                isload:false,
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

        //请求判读提示语字典
        httpRequest('post','/paper/dict/list',{"dictType":"判读提示语提示类型"})
            .then(response=>{
                console.log("请求判读提示语字典",response)
                let obj=response.data.data;
                obj.forEach(item=>{
                    this.hintDic[item.code]=item.name
                })
                console.log("提示语",this.hintDic);
            }).catch(err => {
            console.log(err);
        })

        //请求判读结果字典
        httpRequest('post','/paper/dict/list',{"dictType":"判读提示语结果类型"})
            .then(response=>{
                console.log("请求判读提示语结果类型字典",response)
                let obj=response.data.data;
                obj.forEach(item=>{
                    this.resultDic[item.code]=item.name
                })
                console.log("提示语结果",this.resultDic);
            }).catch(err => {
            console.log(err);
        })

        //请求样本类型字典
        httpRequest('post','paper/sample/list',{})
            .then(response=>{
                console.log("请求样本类型字典",response)
                let obj=response.data.data;
                obj.forEach(item=>{
                    this.sampleDic[item.code]=item.name
                })
                console.log("样本类型",this.sampleDic);
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
        if(associtedSelectedRows[associtedSelectedRows.length-1]){
            this.selectedStorage.push(associtedSelectedRows[associtedSelectedRows.length-1].paperTypeId);
        }
        this.setState({
            associtedSelectedRowKeys,
            associtedSelectedRows},()=>{console.log('selectedRowKeys changed: ', associtedSelectedRowKeys);});
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
            });
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
    Modify(){
        this.setState({
                associatedModifyVisible:true,
            },
            ()=> {
                let params={
                    // page:1,
                    // pageSize:this.state.pageSize,
                    testTypeId:this.state.testTypeId,
                }
                httpRequest('post','/paper/list',params)
                    .then(response=>{
                        console.log("paper",response.data.data)
                        if(response.data!==[]) {
                            this.setState({
                                reagentData: response.data.data.info,
                                reagentTotal: response.data.data.total,
                            })
                            const tempData=[...this.state.reagentData];
                            for(let i=0;i<tempData.length;i++){
                                tempData[i].key=i+(this.state.reagentCurrentPage-1)*this.state.reagentPageSize;
                                tempData[i]["sampleType"]=this.sampleDic[tempData[i].sampleType];
                            }
                            let defaultSelected=[];
                            let defaultRows=[];
                           // this.state.associatedData.forEach((item)=>{
                                tempData.forEach((it,index)=>{
                                    if(it.associated===true){
                                        defaultSelected.push(index);
                                        defaultRows.push(it);
                                    }
                                })
                           // })
                            this.setState({
                                associtedSelectedRowKeys:defaultSelected,
                                reagentData:tempData,
                                associtedSelectedRows:defaultRows,
                            })
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
        );
    }

    //修改提示语表格
    onModifyPrompt=(record)=>{
        console.log(record);
        if(record.functionMethod) {
            //当前函数值
            this.setState({
                functionMethodVisible:true,
                judgeMethodId:record.judgeMethodId,
            },()=>{
                let functionMethodForm=this.functionMethodForm.current;
                if(functionMethodForm){
                    functionMethodForm.setFieldsValue({
                        functionMethod:record.functionMethod,
                    })
                }
            })
        }
        else if(record.judgeParamId){
            //判读参数
            this.setState({
                judgeParamVisible:true,
                judgeParamId:record.judgeParamId,
            },()=>{
                let judgeParamForm=this.judgeParamForm.current;
                if(judgeParamForm){
                    judgeParamForm.setFieldsValue({
                        judgeParamCode:record.judgeParamCode,
                        judgeParamValue:record.judgeParamValue,
                    })
                }
            })
        }
        else if(record.judgeTipsId){
            //判读提示语
            this.setState({
                modifyPromptVisible:true,
                judgeTipsId:record.judgeTipsId,
            },()=>{
                let promptForm=this.promptForm.current;
                console.log("修改提示语表格",promptForm)
                if(promptForm){
                    promptForm.setFieldsValue({
                        judgeTipsCode:record.judgeTipsCode,
                        judgeTipsType:record.judgeTipsType,
                        resultType:record.resultType,
                        judgeTipsValue:record.judgeTipsValue,
                        resultDataTips:record.resultDataTips,
                        shortTips:record.shortTips,
                        longTips:record.longTips,
                        tipsImage:record.tipsImage

                    })
                }
                let _this=this;
                this.setState({
                    judgeTipsId:record.judgeTipsId
                },()=>{
                    axios.post('http://123.57.33.240:8080/test/type/judgeTips/imageUrlTest',{
                        judgeTipsId:record.judgeTipsId
                    }).then(function (response) {
                        _this.setState({
                            pictureSource:response.data.data,
                        })
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                })

            })
        }

    }

    //查看当前所关联的试剂类型
    handleAssociate=(record)=>{
        console.log('所关联的试剂类型',record)
        this.setState({
                associateVisible:true,
                currentId:record.testTypeId,
                testTypeId:record.testTypeId,
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
                            },()=>{
                                if(this.state.associatedData!==[]){
                                    this.state.associatedData.forEach(e=>{
                                        this.selectedStorage.push(e.paperTypeId);
                                    })}
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
            logicVisible:true,
            testTypeId:record.testTypeId,
            testTypeName:record.testTypeName,
        },()=>{
            console.log(this.state.judgeMethodId)
            let params={
                testTypeId:this.state.testTypeId
            }
            httpRequest('post','/test/type/judge/list',params)
                .then(response=>{
                    console.log("发送的参数",params)
                    let res=response.data;
                    if(res.code===1000){
                        console.log(res.data)
                        let promptData=[...res.data.judgeTips];
                        promptData.forEach(value=>{
                            console.log(this.hintDic[value.judgeTipsType])
                            value.judgeTipsType=this.hintDic[value.judgeTipsType];
                            value.resultType=this.resultDic[value.resultType];
                        })
                        this.setState({
                            logicData:[{functionMethod:res.data.functionMethod}],
                            parametersData:res.data.judgeParam,
                            promptData:promptData,
                            judgeMethodId:res.data.judgeMethodId,
                        },()=>{
                            console.log(this.state.logicData)
                        })
                    }
                }).catch(err => {
                console.log(err);
            })
        })

    }

    //上传模板
    uploadTemplete(record){
        this.setState({
            visible_import:true,
            testTypeId:record.testTypeId,
        },()=>{console.log("上传模板",this.state.testTypeId)})

    }

    //导入弹窗关闭
    handleCancel_import = () => {
        this.setState({
            visible_import:false,
            testTypeId:null,
        })
    }

    //查看历史
    viewHistory=(record)=>{
        console.log("查看历史",record)
        let params={
            page:1,
            pageSize:10,
            testTypeId:record.testTypeId
        };
        this.setState({
                historyVisible:true,
                testTypeId:record.testTypeId,
            },
            ()=>{
                httpRequest('post','/test/type/judge/history/list',params)
                    .then(response=>{
                        console.log("发送的参数",params)
                        let res=response.data;
                        console.log("回应",res);
                        if(res.code===1000){
                            let tempData=[...res.data.info];
                            for(let i=0;i<tempData.length;i++){
                                tempData[i].key=i;
                                if(tempData[i].production===true){
                                    tempData[i].production="生产";
                                }
                                else {
                                    tempData[i].production="历史";
                                }
                            }
                            this.setState({
                                historyData:tempData
                            })
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
        );
    }

    //修改判读历史数据
    handleModifyHistory=(record)=>{
        console.log("修改判读历史数据")
        console.log('当前生产判读逻辑',record)
        this.setState({
            logicVisible:true,
            testTypeId:record.testTypeId,
            judgeMethodId:record.judgeMethodId,
        },()=>{
            let params={
                testTypeId:this.state.testTypeId
            }
            httpRequest('post','/test/type/judge/list',params)
                .then(response=>{
                    console.log("发送的参数",params)
                    let res=response.data;
                    if(res.code===1000){
                        console.log(res.data)
                        let promptData=res.data.judgeTips;
                        promptData.forEach(item=>{
                            item.judgeTipsType=this.hintDic[item.judgeTipsType];
                            item.resultType=this.resultDic[item.resultType];
                        })
                        this.setState({
                            logicData:[{functionMethod:res.data.functionMethod}],
                            parametersData:res.data.judgeParam,
                            promptData,
                        },()=>{
                            console.log(this.state.logicData)
                        })
                    }
                }).catch(err => {
                console.log(err);
            })
        })


    }

    //设置为生产
    handleProduct=(record)=>{
        console.log("设置为生产",record)
        let params={
            judgeMethodHisId:record.judgeMethodHisId,
        }
        console.log("生产",params)
        httpRequest('post','/test/type/judge/history/production',params)
            .then(response=>{
                console.log("response",response)
                if(response.data.code===1004){
                    //重新请求当前生产判读逻辑
                    let param={
                        page:1,
                        pageSize:10,
                        testTypeId:record.testTypeId
                    };
                    httpRequest('post','/test/type/judge/history/list',param)
                        .then(response=>{
                            console.log("发送的参数",param)
                            let res=response.data;
                            console.log("回应",res);
                            if(res.code===1000){
                                let tempData=[...res.data.info];
                                for(let i=0;i<tempData.length;i++){
                                    tempData[i].key=i;
                                    if(tempData[i].production===true){
                                        tempData[i].production="生产";
                                    }
                                    else {
                                        tempData[i].production="历史";
                                    }
                                }
                                this.setState({
                                    historyData:tempData
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                }
            })
    }

    //删除判读逻辑历史
    handleDeleteHistory=(record)=>{
        console.log("删除判读逻辑历史")
        let params={
            judgeMethodHisId:record.judgeMethodHisId,
        }
        httpRequest('post','/test/type/judge/history/delete',params)
            .then(response=>{
                console.log(response.data.code)
                if(response.data.code===1006){
                    let params={
                        page:1,
                        pageSize:10,
                        testTypeId:this.state.testTypeId
                    };
                    httpRequest('post','/test/type/judge/history/list',params)
                        .then(response=>{
                            console.log("发送的参数",params)
                            let res=response.data;
                            console.log("回应",res);
                            if(res.code===1000){
                                let tempData=[...res.data.info];
                                for(let i=0;i<tempData.length;i++){
                                    tempData[i].key=i;
                                    if(tempData[i].production===true){
                                        tempData[i].production="生产";
                                    }
                                    else {
                                        tempData[i].production="历史";
                                    }
                                }
                                this.setState({
                                    historyData:tempData
                                })
                            }
                        }).catch(err => {
                        console.log(err);
                    })

                }
            })

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
                else if(response.data.code===1007){
                    message.error(`${response.data.msg}`);
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

    //提交判读的修改
    handleJudgeModify=()=>{
        let promptForm = this.promptForm.current;
        let functionMethodForm=this.functionMethodForm.current;
        let judgeParamForm=this.judgeParamForm.current
        this.setState({
            loading: true,
        });
        if(functionMethodForm){
            functionMethodForm.validateFields()//表单输入校验
                .then((values) => {
                    //console.log("判读逻辑函数值",values);
                    let params={
                        judgeMethodId:this.state.judgeMethodId,
                        functionMethod:values.functionMethod
                    }
                    console.log("修改逻辑函数",params)
                    httpRequest('post','/test/type/judgeMethod/modify',params)
                        .then((response)=>{
                            if(response.data.code===1004){
                                let params={
                                    testTypeId:this.state.testTypeId
                                }
                                httpRequest('post','/test/type/judge/list',params)
                                    .then(response=>{
                                        console.log("发送的参数",params)
                                        let res=response.data;
                                        if(res.code===1000){
                                            console.log(res.data)
                                            this.setState({
                                                logicData:[{functionMethod:res.data.functionMethod}],
                                                parametersData:res.data.judgeParam,
                                                promptData:res.data.judgeTips,
                                            },()=>{
                                                console.log(this.state.logicData)
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    functionMethodForm.resetFields();
                                    this.setState({
                                        loading:false,
                                        functionMethodVisible: false,
                                    });
                                }, 1000);
                            }
                        })
                },reason=>{
                    this.setState({
                        loading: true,
                    });
                })
        }
        else if(promptForm){
            promptForm.validateFields()//表单输入校验
                .then((values) => {
                    console.log("判读提示语",values.resultType);
                    let params={
                        judgeTipsId:this.state.judgeTipsId,
                        judgeTipsCode:values.judgeTipsCode,
                        judgeTipsType:values.judgeTipsType.charCodeAt(0)>255?findKey(this.hintDic,values.judgeTipsType):values.judgeTipsType,
                        resultType:values.resultType.charCodeAt(0)>255?findKey(this.resultDic,values.resultType):values.resultType,
                        judgeTipsValue:values.judgeTipsValue,
                        resultDataTips:values.resultDataTips,
                        shortTips:values.shortTips,
                        longTips:values.longTips,
                        //pictureTips:values.pictureTips
                    }
                    console.log("判读提示语",params);
                    httpRequest('post','/test/type/judgeTips/modify',params)
                        .then((response)=>{
                            if(response.data.code===1004){
                                let params={
                                    testTypeId:this.state.testTypeId
                                }
                                httpRequest('post','/test/type/judge/list',params)
                                    .then(response=>{
                                        console.log("发送的参数",params)
                                        let res=response.data;
                                        if(res.code===1000){
                                            console.log(res.data)
                                            let promptData=[...res.data.judgeTips];
                                            promptData.forEach(value=>{
                                                value.judgeTipsType=this.hintDic[value.judgeTipsType];
                                                value.resultType=this.resultDic[value.resultType];
                                            })
                                            this.setState({
                                                logicData:[{functionMethod:res.data.functionMethod}],
                                                parametersData:res.data.judgeParam,
                                               // promptData:res.data.judgeTips,
                                                promptData:promptData,
                                            },()=>{
                                                console.log(this.state.promptData)
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    promptForm.resetFields();
                                    this.setState({
                                        loading:false,
                                        modifyPromptVisible: false,
                                    });
                                }, 1000);
                            }
                        })

                },reason=>{
                    this.setState({
                        loading: true,
                    });
                })
        }
        else if(judgeParamForm){
            console.log(judgeParamForm)
            judgeParamForm.validateFields()//表单输入校验
                .then((values) => {
                    console.log("判读参数",values);
                    let params={
                        judgeParamId:this.state.judgeParamId,
                        judgeParamValue:values.judgeParamValue
                    }
                    httpRequest('post','/test/type/judgeParam/modify',params)
                        .then((response)=>{
                            if(response.data.code===1004){
                                let params={
                                    testTypeId:this.state.testTypeId
                                }
                                httpRequest('post','/test/type/judge/list',params)
                                    .then(response=>{
                                        let res=response.data;
                                        if(res.code===1000){
                                            console.log("判读提示",res.data)
                                            this.setState({
                                                logicData:[{functionMethod:res.data.functionMethod}],
                                                parametersData:res.data.judgeParam,
                                                promptData:res.data.judgeTips,
                                            },()=>{
                                                console.log(this.state.logicData)
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    judgeParamForm.resetFields();
                                    this.setState({
                                        loading:false,
                                        judgeParamVisible: false,
                                    });
                                }, 1000);
                            }
                        })

                })
                .catch(errorInfo =>{
                    console.log("错误",errorInfo)
                    setTimeout(()=>{
                        this.setState({
                            loading: false,
                        });
                    },1000)
                    console.log("转",this.state.loading)
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

    //关闭modal
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            associatedModifyVisible:false,
            associateVisible:false,
            logicVisible:false,
            historyVisible:false,
            testTypeId:'',
            testTypeName:'',
            associatedcurrentPage:1,
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
        });
    };

    //关闭修改判读参数
    handleCancelJudgeModify=e=>{
        console.log(e);
        this.setState({
            functionMethodVisible:false,
            judgeParamVisible:false,
            modifyPromptVisible:false,

        });
    }

    //返回
    handleReturn = e => {
        console.log(e);
        this.setState({
            associatedModifyVisible:false,
            reagentCurrentPage:1,
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

            if(this.state.reagentCurrentPage===1){
                this.state.associtedSelectedRows.forEach(e=>{
                    params.paperTypeIdList.push(e.paperTypeId);
                })
            }
            else{
                console.log("this.selectedStorage",this.selectedStorage)
                params.paperTypeIdList=this.selectedStorage;
            }
            this.selectedStorage=[];
            console.log("提交button的网络请求",params)
            httpRequest('post','/test/type/paper/modify',params)
                .then(response=>{
                    console.log(response)
                    if(response.data.code===1004){
                        this.setState({
                            associatedModifyVisible:false,
                            associtedSelectedRowKeys:[],
                            associtedSelectedRows:[],
                            reagentCurrentPage:1,
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
            alert("不可修改");
            this.setState({
                associatedModifyVisible:false,
                associtedSelectedRowKeys:[],
                associtedSelectedRows:[],
                reagentCurrentPage:1,
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
    onChange= page => {
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
        this.setState({
            associatedcurrentPage:page,
        },()=>{
            let params={
                page:this.state.associatedcurrentPage,
                pageSize:this.state.pageSize,
                testTypeId:this.state.currentId,
            }
            httpRequest('post','/test/type/paper/list',params)
                .then(response=>{
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
                        },()=>{
                            if(this.state.associatedData!==[]){
                                this.state.associatedData.forEach(e=>{
                                    this.selectedStorage.push(e.paperTypeId);
                                })}
                        })
                    }
                }).catch(err => {
                console.log(err);
            })
        })

    }

//修改测试类型数据翻页
    onChangeReagent=page=>{
        this.setState({
            reagentCurrentPage: page,
        });
        let params={
            page:page,
            pageSize:this.state.associatedPageSize,
        }
        httpRequest('post','/paper/list',params)
            .then(response=>{
                if(response.data!==[]) {
                    this.setState({
                        reagentData: response.data.data.info,
                        reagentTotal: response.data.data.total,
                    })
                    const tempData=[...this.state.reagentData];
                    for(let i=0;i<tempData.length;i++){
                        tempData[i].key=i+(this.state.reagentCurrentPage-1)*this.state.reagentPageSize;
                        tempData[i]["sampleType"]=this.sampleDic[tempData[i].sampleType];
                    }
                    let defaultSelected=[];
                    let defaultRows=[];
                    this.state.associatedData.forEach((item)=>{
                        tempData.forEach((it,index)=>{
                            if(it.paperTypeId===item.paperTypeId){
                                defaultSelected.push(index+(this.state.reagentCurrentPage-1)*this.state.reagentPageSize);
                                defaultRows.push(it);
                            }
                        })
                    })
                    this.setState({
                        associtedSelectedRowKeys:defaultSelected,
                        reagentData:tempData,
                        associtedSelectedRows:defaultRows,
                    })
                }
            }).catch(err => {
            console.log(err);
        })
    }

    //测试集选择框内容
    teoption(){
        return(
            this.state.testSetGroup.map((item)=>{
                return(<Option title="testSetId" value={item.testSetId}>{item.testSetName}</Option>)
            })
        )
    }

    //选择提示语类型
    onSelectType(){
        this.setState({
            messageVisible:true,
        })
    }

    //选择结论类型
    onSelectResult(){
        this.setState({
            resulteVisible:true,
        })
    }

    //查看提示语图片
    onViewImage(record){
        let _this=this;
        this.setState({
            judgeTipsId:record.judgeTipsId
        },() => {
            axios.post('http://123.57.33.240:8080/test/type/judgeTips/imageUrlTest',{
                judgeTipsId:record.judgeTipsId})
            .then(function (response) {
                console.log("查看图片响应",response);
                _this.setState({
                    viewVisible:true,
                    pictureSource:response.data.data?response.data.data:"data:image/png;base64,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"
            })
            })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    //选择提示语
    onSelectImage(){
        this.setState({
            imageVisible:true,
        })
    }

    //修改提示语类型
    onChangeType=e=>{
        console.log(e)
        this.setState({
            valueType:e.target.value,
        })
        console.log(this.state.valueType)
    }

    //判断图片是否加载
    loadImage=()=>{
        console.log("图片加载完了")
        this.setState({
            isload:true,
            imgDisplay:'block'
        })
    }

    //生成预览
    handleMakePreview=()=>{
        let params={
            pdfName:`生成${this.state.testTypeId}的预览`,
            testTypeId:this.state.testTypeId,
            type:1,
        }
        console.log(params,"params")
        httpRequest('get','http://123.57.33.240:8080/test/type/judge/showMapPic',params,{'responseType':'blob'})
            .then(response=>{
                console.log("生成预览",response)
                if(response.data.code===0){
                    alert("请先上传对应模板");
                    this.setState({
                        logicVisible:false,
                        testTypeName:'',
                        testTypeId:'',
                    })
                }
                else {
                    const link = document.createElement('a')
                    let blob = new Blob([response.data], {type:'image/png'})
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob)
                    link.download =`当前生产判读逻辑(${this.state.testTypeName})` //下载的文件名
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)

                }
            })
    }

    //上传图片后的回调
    uploadPicture=(e)=>{
        console.log("上传回调",e)
        if(e.file.status==='done'){
            let _this=this;
            axios.post('http://123.57.33.240:8080/test/type/judgeTips/imageUrlTest',{
                judgeTipsId:this.state.judgeTipsId
            }).then(function (response) {
                _this.setState({
                    pictureSource:response.data.data,
                })
                e.fileList=[];
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
}

    //修改提示语图片
    //设置如何将 event 的值转换成字段值
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {//判断e是否是一个array
            return e;
        }
        console.log(e && e.fileList)
        return e && e.fileList;
    };

    form = React.createRef();
    promptForm=React.createRef();
    judgeParamForm=React.createRef();
    functionMethodForm=React.createRef();

    render() {
        const { loading, associtedSelectedRowKeys} = this.state;
        // const rowSelection = {
        //     selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
        //     onChange: this.onSelectChange,
        // };
        const associatedRowSelection = {
            selectedRowKeys: associtedSelectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.associatedOnSelectChange,
        };

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
                <Row justify="space-between" gutter="15" style={{display:"flex"}}  >
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
                    width={1400}
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
                        title="所有可关联的试剂类型"
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
                                columns={this.reagentcolumns}
                                dataSource={this.state.reagentData}
                                rowKey={record => record.key}
                                bordered={true}
                                style={{margin:'20px 0'}}
                                pagination={false}
                                scroll={{y:500}}
                                // pagination={{
                                //     position: ['bottomLeft'] ,
                                //     total:this.state.reagentTotal,
                                //     showTotal:total => `共 ${total} 条`,
                                //     showQuickJumper:true,
                                //     showSizeChanger:true,
                                //     current:this.state.reagentCurrentPage,
                                //     onChange:this.onChangeReagent,
                                // }}
                            />
                        </div>

                    </Modal>
                </Modal>

                <Modal
                    title="修改判读逻辑"
                    visible={this.state.logicVisible}
                    onCancel={this.handleCancel}
                    width={1400}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button type="primary" key="generate" onClick={this.handleMakePreview}>
                                生成预览
                            </Button>,
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <div>
                        <Form>
                            <Form.Item>
                                <label>判读逻辑</label>
                                <Table
                                    columns={this.logicColumns}
                                    //rowSelection={logicRowSelection}
                                    dataSource={this.state.logicData}
                                    rowKey={record => record.key}
                                    bordered={true}
                                    style={{margin:'20px 0'}}
                                    pagination={false}
                                />
                            </Form.Item>
                            <Form.Item>
                                <label>判读参数</label>
                                <Table
                                    columns={this.parametersColumns}
                                    //rowSelection={parametersSelection}
                                    dataSource={this.state.parametersData}
                                    rowKey={record => record.key}
                                    bordered={true}
                                    style={{margin:'20px 0'}}
                                    pagination={false}
                                    // pagination={{
                                    //     position: ['bottomRight'] ,
                                    //     total:this.state.parametersTotal,
                                    //     showTotal:total => `共 ${total} 条`,
                                    //     showQuickJumper:true,
                                    //     showSizeChanger:true,
                                    //     current:this.state.parameterscurrentPage,
                                    //     onChange:this.onChangeParameters,
                                    // }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <label>判读提示语</label>
                                <Table
                                    columns={this.promptColumns}
                                    dataSource={this.state.promptData}
                                    rowKey={record => record.key}
                                    bordered={true}
                                    style={{margin:'20px 0'}}
                                    pagination={false}
                                    // pagination={{
                                    //     position: ['bottomLeft'] ,
                                    //     total:this.state.promptTotal,
                                    //     showTotal:total => `共 ${total} 条`,
                                    //     showQuickJumper:true,
                                    //     showSizeChanger:true,
                                    //     current:this.state.promptcurrentPage,
                                    //     onChange:this.onChangePrompt,
                                    // }}
                                />
                            </Form.Item>

                        </Form>

                    </div>
                    {/*<Modal*/}
                    {/*    title="修改测试类型数据"*/}
                    {/*    visible={this.state.associatedModifyVisible}*/}
                    {/*    onOk={this.handleSubmit}*/}
                    {/*    width={1400}*/}
                    {/*    onCancel={this.handleReturn}*/}
                    {/*    footer={[*/}
                    {/*        <div style={{textAlign:"center"}}>*/}
                    {/*            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>*/}
                    {/*                提交*/}
                    {/*            </Button>,*/}
                    {/*            <Button key="back" onClick={this.handleReturn}>*/}
                    {/*                返回*/}
                    {/*            </Button>,*/}
                    {/*        </div>*/}
                    {/*    ]}>*/}
                    {/*    <div>*/}
                    {/*        <Table*/}
                    {/*            rowSelection={associatedRowSelection}*/}
                    {/*            columns={this.reagentcolumns}*/}
                    {/*            dataSource={this.state.reagentData}*/}
                    {/*            rowKey={record => record.key}*/}
                    {/*            bordered={true}*/}
                    {/*            style={{margin:'20px 0'}}*/}
                    {/*            pagination={{*/}
                    {/*                position: ['bottomLeft'] ,*/}
                    {/*                total:this.state.reagentTotal,*/}
                    {/*                showTotal:total => `共 ${total} 条`,*/}
                    {/*                showQuickJumper:true,*/}
                    {/*                showSizeChanger:true,*/}
                    {/*                current:this.state.reagentCurrentPage,*/}
                    {/*                onChange:this.onChangeReagent,*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </div>*/}

                    {/*</Modal>*/}
                </Modal>

                <Modal
                    title="判读逻辑历史"
                    visible={this.state.historyVisible}
                    onCancel={this.handleCancel}
                    width={1400}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <div>
                        <Table
                            columns={this.historycolumns}
                            dataSource={this.state.historyData}
                            rowKey={record => record.key}
                            bordered={true}
                            style={{margin:'20px 0'}}
                            pagination={{
                                position: ['bottomLeft'] ,
                                total:this.state.historyTotal,
                                showTotal:total => `共 ${total} 条`,
                                showQuickJumper:true,
                                showSizeChanger:true,
                                current:this.state.historycurrentPage,
                                onChange:this.onChangeHistory,
                            }}
                        />
                    </div>
                </Modal>

                {/*<Modal*/}
                {/*    title="修改测试类型数据"*/}
                {/*    visible={this.state.associatedModifyVisible}*/}
                {/*    onOk={this.handleSubmit}*/}
                {/*    width={1400}*/}
                {/*    onCancel={this.handleReturn}*/}
                {/*    footer={[*/}
                {/*        <div style={{textAlign:"center"}}>*/}
                {/*            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>*/}
                {/*                提交*/}
                {/*            </Button>,*/}
                {/*            <Button key="back" onClick={this.handleReturn}>*/}
                {/*                返回*/}
                {/*            </Button>,*/}
                {/*        </div>*/}
                {/*    ]}>*/}
                {/*    <div>*/}
                {/*        <Table*/}
                {/*            rowSelection={associatedRowSelection}*/}
                {/*            columns={this.reagentcolumns}*/}
                {/*            dataSource={this.state.reagentData}*/}
                {/*            rowKey={record => record.key}*/}
                {/*            bordered={true}*/}
                {/*            style={{margin:'20px 0'}}*/}
                {/*            pagination={{*/}
                {/*                position: ['bottomLeft'] ,*/}
                {/*                total:this.state.reagentTotal,*/}
                {/*                showTotal:total => `共 ${total} 条`,*/}
                {/*                showQuickJumper:true,*/}
                {/*                showSizeChanger:true,*/}
                {/*                current:this.state.reagentCurrentPage,*/}
                {/*                onChange:this.onChangeReagent,*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Modal>*/}

                <Modal
                    title="查看图片"
                    width={500}
                    bodyStyle={{
                        minHeight:500
                    }}
                    visible={this.state.viewVisible}
                    onCancel={()=>{this.setState({
                        viewVisible:false,
                        pictureSource:'',
                        imgDisplay:'none',
                        isload:false
                    })}}
                    footer={[]}>
                    <Spin spinning={!this.state.isload} size='large' tip='图片加载中'style={{margin:'100px 0 0 200px'}}></Spin>
                    <Image
                        onLoad={this.loadImage}
                        style={{display:this.state.imgDisplay}}
                        src={this.state.pictureSource?this.state.pictureSource:"data:image/png;base64,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"
                        }
                        height='100%'
                        fallback="data:image/png;base64,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"
                    />

                </Modal>

                <Modal
                    title="修改函数值"
                    visible={this.state.functionMethodVisible}
                    onOk={this.handleJudgeModify}
                    onCancel={this.handleCancelJudgeModify}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleJudgeModify}>
                                修改
                            </Button>,
                            <Button key="back" onClick={this.handleCancelJudgeModify}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <Form {...formItemLayout}
                          name="functionMethod"
                          ref={this.functionMethodForm}>
                        <Form.Item label="函数值"
                                   name="functionMethod"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input.TextArea rows={3}
                                            allowClear
                                   placeholder="请输入函数值"/>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="修改判读参数"
                    visible={this.state.judgeParamVisible}
                    onOk={this.handleJudgeModify}
                    onCancel={this.handleCancelJudgeModify}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleJudgeModify}>
                                修改
                            </Button>,
                            <Button key="back" onClick={this.handleCancelJudgeModify}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <Form {...formItemLayout}
                          name="judgeParam"
                          ref={this.judgeParamForm}>
                        <Form.Item label="编码"
                                   name="judgeParamCode">
                            <Input disabled={true}
                                   style={{color:'black'}}
                            />
                        </Form.Item>
                        <Form.Item label="值"
                                   name="judgeParamValue"
                                   rules={[{required:true,message:"必选项不能为空"}]}>
                            <Input allowClear
                                   placeholder="请输入值"/>
                        </Form.Item>
                    </Form>
                </Modal>

                {/*修改判读提示语*/}
                <Modal
                    title="修改判读提示语"
                    visible={this.state.modifyPromptVisible}
                    onOk={this.handleJudgeModify}
                    onCancel={this.handleCancelJudgeModify}
                    footer={[
                        <div style={{textAlign:"center"}}>
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleJudgeModify}>
                                修改
                            </Button>,
                            <Button key="back" onClick={this.handleCancelJudgeModify}>
                                取消
                            </Button>,
                        </div>
                    ]}>
                    <Form {...formItemLayout}
                          name="prompt"
                          ref={this.promptForm}>
                        <Form.Item label="编码"
                                   name="judgeTipsCode"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input disabled={true}
                                   style={{color:'black'}}
                            />
                        </Form.Item>
                        <Form.Item label="提示语类型"
                                   name="judgeTipsType"
                                   rules={[{required:true,message:"必选项不能为空"}]}>
                            <Select placeholder="请选择测试集">
                               <Option value={'tips_finish'}>结束</Option>
                               <Option value={'tips_no_finish'}>非结束</Option>
                               <Option value={'key_event'}>关键事件</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="结论类型"
                                   name="resultType"
                                   rules={[{required:true,message:"必选项不能为空"}]}>
                            <Select placeholder="请选择测试集">
                                <Option value={'tips_normal'}>正常</Option>
                                <Option value={'tips_error'}>异常</Option>
                                <Option value={'tips_no_result'}>无结果</Option>
                                <Option value={'tips_no_test'}>未测试</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="提示语"
                                   name="judgeTipsValue"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input.TextArea rows={2}
                                            placeholder="请输入提示语"
                                            allowClear></Input.TextArea>
                        </Form.Item>
                        <Form.Item label="结果数据"
                                   name="resultDataTips"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input placeholder="请输入结果数据"
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="短提示语"
                                   name="shortTips"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input placeholder="请输入短提示语"
                                   allowClear/>
                        </Form.Item>
                        <Form.Item label="长提示语"
                                   name="longTips"
                                   rules={[{required:true,message:"必填项不能为空"}]}>
                            <Input.TextArea rows={4}
                                      placeholder="请输入长提示语"
                                      allowClear></Input.TextArea>
                        </Form.Item>
                        <Form.Item
                            name="upload"
                            label="选择提示语图片"
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}>
                            <Image
                                src={this.state.pictureSource ? this.state.pictureSource : "data:image/png;base64,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"
                                }
                                fallback="data:image/png;base64,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"
                            />
                            <Upload
                                    name="file"//发到后台的文件参数名
                                    action="http://123.57.33.240:8080/test/type/judgeTips/updateImageTest" //上传的地址
                                    //listType="picture"
                                    maxCount={1}
                                    data={{'judgeTipsId':this.state.judgeTipsId}}//上传所需额外参数或返回上传额外参数的方法
                                    onChange={this.uploadPicture}
                            >
                                <Button icon={<UploadOutlined />}>选择提示语图片</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>



                <div key={Math.random()}>
                    {/*导入弹窗*/}
                    <ImportFile
                        url="http://123.57.33.240:8080/test/type/judge/model"
                        visible={this.state.visible_import}
                        upTitle="判读逻辑"
                        testTypeId={this.state.testTypeId}
                        onCancel={this.handleCancel_import}
                    />
                </div>

            </div>
        )
    }
}
