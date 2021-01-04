import React, { Component } from 'react'
import {DatePicker,Table, Button, Input, Row, Col, Select, Space, Modal, Form,Checkbox} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined,ImportOutlined } from "@ant-design/icons";
import httpRequest from "../../http";
import exportFile from "../../exportFile";
import moment from 'moment';


const { Option } = Select;




export default class ReagentJudgeParams extends Component {
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
        this.alerthandleChange=this.alerthandleChange.bind(this);
        this.onChange=this.onChange.bind(this);
        this.checkboxOnChange=this.checkboxOnChange.bind(this);
        this.checkboxOnChangeQualitative=this.checkboxOnChangeQualitative.bind(this);
        this.checkboxOnChangedocrop=this.checkboxOnChangedocrop.bind(this);
        this.dateOnChange=this.dateOnChange.bind(this);
    }

    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        data:[],
        //总数据数
        total:null,
        //分页
        currentPage:1,
        pageSize:10,
        //搜索框
        bathNumber:null,
        paperTypeId:null,
        organization:null,
        //搜索框选项
        reagentTypeGroup:[],
        organizationGroup:[],
        //checkbox
        paperFade:null,
        qualitative:null,
        docrop:null,

        paperParamProId:null,
        dateString:"",
    };

    //表格列头
    columns = [
        {
            title: '批号',
            dataIndex: 'bathNumber',
            sorter: (a,b) => a.bathNumber - b.bathNumber,
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
            dataIndex: 'organizationName',
            sorter: (a,b) => a.organizationName.length - b.organizationName.length,
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

    //初始页面请求数据（完成）
    componentDidMount() {
        let params={
            page:1,
            pageSize:10,
        }
        httpRequest('post','/paper/param/pro/list',params)
            .then(response=>{
                console.log("请求试剂判读参数",response)
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
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        //请求试剂类型
        httpRequest('post','/paper/list',{})
            .then(response=>{
                console.log("请求试剂类型",response)
                if(response.data!==[]) {
                    this.setState({
                        reagentTypeGroup: response.data.data.info,
                    })
                    console.log("试剂类型",this.state.reagentTypeGroup)

                }
            }).catch(err => {
            console.log(err);
        })

        //请求单位数据
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求单位数据",response)
                if(response.data!==[]) {
                    this.setState({
                        organizationGroup: response.data.data.info,
                    })
                    console.log("试剂类型",this.state.organizationGroup)

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
                organization:null,
                currentPage:1,
                paperFade:null,

                //修改
                paperParamProId:null,
                dateString:"",


            });
        }, 1000);
    };

    //选择
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //添加展开modal（完成）
    handleAdd(){
        this.setState({
            addVisible:true,
        });
    }

    //导出
    handleExport(){
        console.log("导出");
        let paperParamProIdList=[];
        this.state.selectedRowKeys.forEach((item)=>{
            paperParamProIdList.push(this.state.data[item].paperParamProId)
        })

        console.log(paperParamProIdList)
        exportFile('/paper/param/pro/export',{paperParamProIdList:paperParamProIdList},'判读参数')

    }

    //搜索（完成）
    search(){
        let params={};
        if(this.state.bathNumber!==null){
            params.bathNumber=this.state.bathNumber;
        }
        if(this.state.paperTypeId!==null){
            params.paperTypeId=this.state.paperTypeId;
        }
        if(this.state.organization!==null){
            params.organization=this.state.organization;
        }
        params.page=1;
        params.pageSize=this.state.pageSize;
        console.log(params);
        httpRequest('post','/paper/param/pro/list',params)
            .then(response=>{
                console.log(response)
                console.log(response.data.data)
                if(response.data.data!==null) {
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
                else{
                    alert("不存在符合条件的数据！");
                }
            }).catch(err => {
            console.log(err);
        })
    }

    //重置（完成）
    reset(){
        console.log("重置")
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
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        //请求试剂类型
        httpRequest('post','/paper/list',{})
            .then(response=>{
                console.log("请求试剂类型",response)
                if(response.data!==[]) {
                    this.setState({
                        reagentTypeGroup: response.data.data.info,
                    })
                    console.log("试剂类型",this.state.reagentTypeGroup)

                }
            }).catch(err => {
            console.log(err);
        })

        //请求单位数据
        httpRequest('post','/unit/list',{})
            .then(response=>{
                console.log("请求单位数据",response)
                if(response.data!==[]) {
                    this.setState({
                        organizationGroup: response.data.data.info,
                    })
                    console.log("试剂类型",this.state.organizationGroup)

                }
            }).catch(err => {
            console.log(err);
        })

         this.setState({
        //     currentItem:{
        //         key: null,
        //         paperParamProId:null,//试剂判读参数id生产
        //         bathNumber: null,//批号
        //         paperTypeName: '',//试剂类型名称
        //         reactiveTime: null,//反应时间(秒)
        //         organization:'',//所属单位
        //         qualitative:null,//是定性
        //         paperFade :null,//能效已降低
        //         madeTime:'',
        //     },


            //搜索框
            bathNumber:null,
            paperTypeId:null,
            organization:null,
            //当前页
            currentPage:1,
        });
        console.log(this.state)
    }

    //修改展开modal
    handleModify=(record)=>{
        console.log('修改',record)
        let paperFade;
        let qualitative;
        if(record.paperFade==="是"){
            paperFade=true;
        }else{
            paperFade=false;
        }
        if(record.qualitative==="是"){
            qualitative=true;
        }else{
            qualitative=false;
        }

        this.setState({
                modifyVisible:true,
               // currentItem:record,
                paperParamProId:record.paperParamProId,
                paperFade:paperFade,
                qualitative:qualitative,
                docrop:record.doCrop,

            },
        );
        if(record.madeTime!==null)
        record.madeTime=moment(record.madeTime);
        console.log("时间",record.madeTime)
        let form_modify=this.form_modify.current;
        console.log("修改表格",form_modify)
        if(this.form_modify.current){
            form_modify.setFieldsValue({
                paperTypeName:record.paperTypeName,
                bathNumber:record.bathNumber,
                madeTime:record.madeTime,
                reactiveTime:record.reactiveTime,
                organization:record.organizationName,
                lineWidth:record.lineWidth,
                lineLength:record.lineLength,
                linePx:record.linePx,
                linePy:record.linePy,
                line0r:record.line0r,
                line0l:record.line0l,
                linel:record.linel,
                liner:record.liner,
                line2l:record.line2l,
                line2r:record.line2r,
                qualitativeGod12:record.qualitativeGod12,
                qualitativeGod:record.qualitativeGod,
                qualitativeGod11:record.qualitativeGod11,
                lineN0:record.lineN0,
                lineN1:record.lineN1,
                lineN2:record.lineN2,
                lineN3:record.lineN3,
                lineN4:record.lineN4,
                lineN5:record.lineN5,
                lineN6:record.lineN6,
                lineN7:record.lineN7,
                lineN8:record.lineN8,
                lineGod0:record.lineGod0,
                lineGod1:record.lineGod1,
                lineGod2:record.lineGod2,
                lineGod3:record.lineGod3,
                lineGod4:record.lineGod4,
                lineGod5:record.lineGod5,
                lineGod6:record.lineGod6,
                lineGod7:record.lineGod7,
                lineGod8:record.lineGod8,
                description:record.description,
                topGod:record.topGod,
                lowerGod:record.lowerGod,
                lineWei:record.lineWei,
                lineShowtype:record.lineShowtype,
                lineMethod:record.lineMethod,
                crop1Px:record.crop1Px,
                crop1Py:record.crop1Py,
                crop1Width:record.crop1Width,
                crop1Height:record.crop1Height,
                qualitativeGod2:record.qualitativeGod2,
                qualitativeGod3:record.qualitativeGod3,
                qualitativeGod4:record.qualitativeGod4,
                qualitativeGod5:record.qualitativeGod5,
            })
        }
    }

    //删除某一行
    handleDelete=(record)=>{
        console.log('删除',record)
        let params={
            paperParamProId:record.paperParamProId,
        }
        httpRequest('post','/paper/param/pro/delete',params)
            .then(response=>{
                console.log(params)
                console.log("请求",response)
                if(response.data.code===1006){
                    let params={
                        page:this.state.currentPage,
                        pageSize:this.state.pageSize,
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
                    this.setState({
                        loading: true,
                    });
                    if(values.paperFade==="是"){
                        values.paperFade=true;
                    }
                    else{
                        values.paperFade=false;
                    }
                    if(values.qualitative==="是"){
                        values.qualitative=true;
                    }
                    else{
                        values.qualitative=false;
                    }
                    let params={
                        paperTypeId:values.paperTypeName,
                        bathNumber:values.bathNumber,
                        madeTime:this.state.dateString,
                        paperFade:this.state.paperFade,
                        reactiveTime:values.reactiveTime,
                        organization:values.organizationName,
                        lineWidth:values.lineWidth,
                        lineLength:values.lineLength,
                        linePx:values.linePx,
                        linePy:values.linePy,
                        line0r:values.line0r,
                        line0l:values.line0l,
                        linel:values.linel,
                        liner:values.liner,
                        line2l:values.line2l,
                        line2r:values.line2r,
                        qualitative:this.state.qualitative,
                        qualitativeGod12:values.qualitativeGod12,
                        qualitativeGod:values.qualitativeGod,
                        qualitativeGod11:values.qualitativeGod11,
                        lineN0:values.lineN0,
                        lineN1:values.lineN1,
                        lineN2:values.lineN2,
                        lineN3:values.lineN3,
                        lineN4:values.lineN4,
                        lineN5:values.lineN5,
                        lineN6:values.lineN6,
                        lineN7:values.lineN7,
                        lineN8:values.lineN8,
                        lineGod0:values.lineGod0,
                        lineGod1:values.lineGod1,
                        lineGod2:values.lineGod2,
                        lineGod3:values.lineGod3,
                        lineGod4:values.lineGod4,
                        lineGod5:values.lineGod5,
                        lineGod6:values.lineGod6,
                        lineGod7:values.lineGod7,
                        lineGod8:values.lineGod8,
                        description:values.description,
                        topGod:values.topGod,
                        lowerGod:values.lowerGod,
                        lineWei:values.lineWei,
                        lineShowtype:values.lineShowtype,
                        lineMethod:values.lineMethod,
                        doCrop:this.state.docrop,
                        crop1Px:values.crop1Px,
                        crop1Py:values.crop1Py,
                        crop1Width:values.crop1Width,
                        crop1Height:values.crop1Height,
                        qualitativeGod2:values.qualitativeGod2,
                        qualitativeGod3:values.qualitativeGod3,
                        qualitativeGod4:values.qualitativeGod4,
                        qualitativeGod5:values.qualitativeGod5,
                        paperParamProId:this.state.paperParamProId,
                    }
                    console.log("参数",params)
                    httpRequest('post','/paper/param/pro/modify',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1004){
                                let inital_param={
                                    page:this.state.currentPage,
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/paper/param/pro/list',inital_param)
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
       // 添加
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
                        paperTypeId:values.paperTypeName,
                        bathNumber:values.bathNumber,
                        madeTime:this.state.dateString,
                        paperFade:this.state.paperFade,
                        reactiveTime:values.reactiveTime,
                        organizationName:values.organization,
                        lineWidth:values.lineWidth,
                        lineLength:values.lineLength,
                        linePx:values.linePx,
                        linePy:values.linePy,
                        line0r:values.line0r,
                        line0l:values.line0l,
                        linel:values.linel,
                        liner:values.liner,
                        line2l:values.line2l,
                        line2r:values.line2r,
                        qualitative:this.state.qualitative,
                        qualitativeGod12:values.qualitativeGod12,
                        qualitativeGod:values.qualitativeGod,
                        qualitativeGod11:values.qualitativeGod11,
                        lineN0:values.lineN0,
                        lineN1:values.lineN1,
                        lineN2:values.lineN2,
                        lineN3:values.lineN3,
                        lineN4:values.lineN4,
                        lineN5:values.lineN5,
                        lineN6:values.lineN6,
                        lineN7:values.lineN7,
                        lineN8:values.lineN8,
                        lineGod0:values.lineGod0,
                        lineGod1:values.lineGod1,
                        lineGod2:values.lineGod2,
                        lineGod3:values.lineGod3,
                        lineGod4:values.lineGod4,
                        lineGod5:values.lineGod5,
                        lineGod6:values.lineGod6,
                        lineGod7:values.lineGod7,
                        lineGod8:values.lineGod8,
                        description:values.description,
                        topGod:values.topGod,
                        lowerGod:values.lowerGod,
                        lineWei:values.lineWei,
                        lineShowtype:values.lineShowtype,
                        lineMethod:values.lineMethod,
                        doCrop:this.state.docrop,
                        crop1Px:values.crop1Px,
                        crop1Py:values.crop1Py,
                        crop1Width:values.crop1Width,
                        crop1Height:values.crop1Height,
                        qualitativeGod2:values.qualitativeGod2,
                        qualitativeGod3:values.qualitativeGod3,
                        qualitativeGod4:values.qualitativeGod4,
                        qualitativeGod5:values.qualitativeGod5,
                        paperParamProId:this.state.paperParamProId,
                    }
                    console.log("参数",params)
                    httpRequest('post','/paper/param/pro/add',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1002){
                                let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                                let inital_params={
                                    page:Math.ceil(cu_page),
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/paper/param/pro/list',inital_params)
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
                                                data:tempData,
                                                currentPage:inital_params.page
                                            })
                                        }
                                    }).catch(err => {
                                    console.log(err);
                                })
                                setTimeout(() => {
                                    form_modify.resetFields();
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

    //关闭modal（完成）
    handleCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
            modifyVisible: false,
            paperParamProId:null,
        });
    };

   //输入框变化（完成）
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
        // else{
        //     this.setState({
        //         currentItem:Object.assign(this.state.currentItem,{[name]:value})
        //     })
        // }


    }

    //搜索选择框变化（完成）
    handleChange=(e,Option) =>{
        console.log(e)
        console.log(Option)
            this.setState({
                [Option.title]:Option.value,
        })
    }

    //日期选择框
    dateOnChange(date, dateString) {
        console.log("date:",date, "dateString:",dateString);
        this.setState({
            dateString:dateString,
        })
    }

    //试剂类型选择框内容（完成）
    reoption(){
        return(
                this.state.reagentTypeGroup.map((item)=>{
                return(<Option title="paperTypeId" value={item.paperTypeId}>{item.paperTypeName}</Option>)
            })
        )
    }

    //单位选择框内容（完成）
    oroption(){
        return(
            this.state.organizationGroup.map((item)=>{
                return(<Option title="organization" value={item.unitName}>{item.unitName}</Option>)
            })
        )
    }

    //增加或修改选择框变化
    alerthandleChange=(e,Option) =>{
        console.log(e)
        console.log(Option)
        // this.setState({
        //         currentItem:Object.assign(this.state.currentItem,{[Option.title]:e})
        // })
        console.log(this.state)
    }

    //表格分页
    onChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
        let params={
            page:page,
            pageSize:this.state.pageSize,
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
                        data:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })
    };

    //checkbox选择
    checkboxOnChange(e) {
        this.setState({
            paperFade:e.target.checked
        })
    }
    checkboxOnChangeQualitative(e) {
        this.setState({
            qualitative:e.target.checked
        })
    }
    checkboxOnChangedocrop(e) {
        this.setState({
            docrop:e.target.checked
        })
    }

    form = React.createRef();

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange: this.onSelectChange,
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
                            placeholder="请选择试剂类型 "
                            style={{width:'100%'}}
                            value={this.state.paperTypeId}
                            onChange={this.handleChange}>
                            {this.reoption()}
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
                        <Button type="primary" onClick={this.handleAdd}><PlusSquareOutlined />添加</Button>
                    </Col>
                    <Col span={2} >
                        <Button type="primary" onClick={this.handleExport}><ExportOutlined />导出</Button>
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
                    title="添加试剂判读参数"
                    visible={this.state.addVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1400}
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
                    <div>
                        <Form {...formItemLayout}
                              name="add"
                              ref={this.form}>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={8}>
                                    <Form.Item label="试剂类型"
                                               name="paperTypeName"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Select
                                            placeholder="请选择试剂类型 ">
                                            {this.reoption()}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="批号"
                                               name="bathNumber"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入批号 "/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="生产日期"
                                               name="madeTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <DatePicker onChange={this.dateOnChange}
                                                    placeholder="请选择生产日期 "/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="paperFade">
                                        <Checkbox onChange={this.checkboxOnChange}
                                                  checked={this.state.paperFade}>
                                            能效已降低
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="反应时间"
                                               name="reactiveTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入反应时间 "/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="所属单位"
                                               name="organization"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入单位 "/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_WIDTH"
                                               name="lineWidth"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_LENGTH"
                                               name="lineLength"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PX"
                                               name="linePx"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PY"
                                               name="linePy"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE0R"
                                               name="line0r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE0L"
                                               name="line0l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINEL"
                                               name="linel"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINER"
                                               name="liner"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={12}>
                                    <Form.Item label="LINE2L"
                                               name="line2l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="LINE2R"
                                               name="line2r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={24}>
                                    <Form.Item name="qualitative">
                                        <Checkbox onChange={this.checkboxOnChangeQualitative}
                                                  checked={this.state.qualitative}>
                                            是定性
                                        </Checkbox>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={8}>
                                    <Form.Item label="定性阴性GOD值"
                                               name="qualitativeLGod">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性阳性+GOD值"
                                               name="qualitativeGod">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性弱阳性GOD值"
                                               name="qualitativeGod11">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N0"
                                               name="lineN0">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N1"
                                               name="lineN1">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N2"
                                               name="lineN2">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N3"
                                               name="lineN3">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N4"
                                               name="lineN4">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N5"
                                               name="lineN5">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N6"
                                               name="lineN6">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N7"
                                               name="lineN7">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N8"
                                               name="lineN8">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD0"
                                               name="lineGod0">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD1"
                                               name="lineGod1">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD2"
                                               name="lineGod2">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD3"
                                               name="lineGod3">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD4"
                                               name="lineGod4">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD5"
                                               name="lineGod5">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD6"
                                               name="lineGod6">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD7"
                                               name="lineGod7">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD8"
                                               name="lineGod8">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>

                            <Form.Item label="描述"
                                       name="description">
                                <Input />
                            </Form.Item>
                            <Form.Item label="TOP_GOD"
                                       name="topGod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LOWER_GOD"
                                       name="lowerGod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_WEI"
                                       name="lineWei">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_SHOWTYPE"
                                       name="lineShowtype">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_METHOD"
                                       name="lineMethod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_JUDGE_METHOD"
                                       name="lineJudgeMethod">
                                <Input />
                            </Form.Item>
                            <Form.Item name="doCrop">
                                <Checkbox onChange={this.checkboxOnChangedocrop}
                                          checked={this.state.docrop}>
                                    DO_CROP
                                </Checkbox>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="CROP1_PX"
                                               name="CROP1_PX">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_PY"
                                               name="CROP1_PY">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_WIDTH"
                                               name="CROP1_WIDTH">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_HEIGHT"
                                               name="CROP1_HEIGHT">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="定性阳性GOD值++"
                                       name="qualitativeGod2">
                                <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++"
                                       name="qualitativeGod3">
                                <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值++++"
                                       name="qualitativeGod4">
                                <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++++"
                                       name="qualitativeGod5">
                                <Input />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改试剂判读参数"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1400}
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
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={8}>
                                    <Form.Item label="试剂类型"
                                               name="paperTypeName"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Select placeholder="请选择试剂类型 ">
                                            {this.reoption()}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="批号"
                                               name="bathNumber"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入批号 "/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="生产日期"
                                               name="madeTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                    <DatePicker onChange={this.dateOnChange}
                                                placeholder="请选择生产日期 "/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="paperFade">
                                        <Checkbox onChange={this.checkboxOnChange}
                                                  checked={this.state.paperFade}>
                                            能效已降低
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="反应时间"
                                               name="reactiveTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入反应时间 "/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="所属单位"
                                               name="organization"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入单位 "/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_WIDTH"
                                               name="lineWidth"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_LENGTH"
                                               name="lineLength"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PX"
                                               name="linePx"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PY"
                                               name="linePy"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE0R"
                                               name="line0r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE0L"
                                               name="line0l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINEL"
                                               name="linel"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINER"
                                               name="liner"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={12}>
                                    <Form.Item label="LINE2L"
                                               name="line2l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="LINE2R"
                                               name="line2r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={24}>
                                    <Form.Item name="qualitative">
                                        <Checkbox onChange={this.checkboxOnChangeQualitative}
                                                  checked={this.state.qualitative}>
                                            是定性
                                        </Checkbox>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={8}>
                                    <Form.Item label="定性阴性GOD值"
                                               name="qualitativeLGod">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性阳性+GOD值"
                                               name="qualitativeGod">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性弱阳性GOD值"
                                               name="qualitativeGod11">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N0"
                                               name="lineN0">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N1"
                                               name="lineN1">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N2"
                                               name="lineN2">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N3"
                                               name="lineN3">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N4"
                                               name="lineN4">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N5"
                                               name="lineN5">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N6"
                                               name="lineN6">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N7"
                                               name="lineN7">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N8"
                                               name="lineN8">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD0"
                                               name="lineGod0">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD1"
                                               name="lineGod1">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD2"
                                               name="lineGod2">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD3"
                                               name="lineGod3">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD4"
                                               name="lineGod4">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD5"
                                               name="lineGod5">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD6"
                                               name="lineGod6">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD7"
                                               name="lineGod7">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD8"
                                               name="lineGod8">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>

                            <Form.Item label="描述"
                                       name="description">
                                <Input />
                            </Form.Item>
                            <Form.Item label="TOP_GOD"
                                       name="topGod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LOWER_GOD"
                                       name="lowerGod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_WEI"
                                       name="lineWei">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_SHOWTYPE"
                                       name="lineShowtype">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_METHOD"
                                       name="lineMethod">
                                <Input />
                            </Form.Item>
                            <Form.Item label="LINE_JUDGE_METHOD"
                                       name="lineJudgeMethod">
                                <Input />
                            </Form.Item>
                            <Form.Item name="doCrop">
                                <Checkbox onChange={this.checkboxOnChangedocrop}
                                          checked={this.state.docrop}>
                                    DO_CROP
                                </Checkbox>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="CROP1_PX"
                                               name="CROP1_PX">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_PY"
                                               name="CROP1_PY">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_WIDTH"
                                               name="CROP1_WIDTH">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_HEIGHT"
                                               name="CROP1_HEIGHT">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="定性阳性GOD值++"
                                       name="qualitativeGod2">
                                <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++"
                                       name="qualitativeGod3">
                                <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值++++"
                                       name="qualitativeGod4">
                            <Input />
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++++"
                                       name="qualitativeGod5">
                                <Input />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
