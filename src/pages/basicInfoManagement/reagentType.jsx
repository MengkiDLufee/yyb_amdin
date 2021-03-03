import React, { Component } from 'react'
import {Table, Button, Input, Row, Col, Select, Space, Modal, Form, Checkbox, DatePicker} from 'antd';
import {PlusSquareOutlined, ReloadOutlined, SearchOutlined,ExportOutlined} from "@ant-design/icons";
import exportFile from "../../exportFile";
import httpRequest from "../../http";
import moment from "moment";

const { Option } = Select;



export default class ReagentType extends Component {

    //初始化
    constructor(props) {
        super(props);

        this.form_modify = React.createRef();
        this.form_detail=  React.createRef();
        this.handleAdd = this.handleAdd.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.reset = this.reset.bind(this);
        this.search = this.search.bind(this);
        this.resetView = this.resetView.bind(this);
        this.searchView = this.searchView.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkboxOnChangeQualitativel = this.checkboxOnChangeQualitativel.bind(this);
        this.checkboxOnChangeCheckCLine = this.checkboxOnChangeCheckCLine.bind(this);
        this.checkboxOnChangeMultiline=this.checkboxOnChangeMultiline.bind(this);

    }
    //状态管理
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        addVisible:false,
        modifyVisible: false,
        viewVisible:false,
        detailVisible:false,
        data:[],
        dataView:[],
        //搜索框
        paperTypeName:'',
        barcode:'',
        sampleType:null,
        organization:null,

        paperTypeId:null,
        paperTypeIdView:null,

        //checkbox
        multiline:false,
        qualitativel:false,
        checkCLine:false,

        //搜索框选项
        sampleTypeGroup:[],
        organizationGroup:[],
        judgeMethodGroup:[],
        judgeGroup:[],
        //总数据数
        total:null,
        totalView:null,
        //分页
        currentPage:1,
        pageSize:10,
        currentPageView:1,
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

        //checkbox
        paperFade:null,
        qualitative:null,
        docrop:null,
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
                    <Button style={{color:'black',background:'white'}}
                            onClick={()=>{this.handleView(record)}}>查看标曲</Button>
                    <Button style={{backgroundColor:'#ec7259', color:'#FFFAFA'}}
                            onClick={()=>{this.handleDefault(record)}}>默认标曲</Button>
                </Space>
            ),
        },
    ];

//查看标曲
    columnsView= [
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
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <Button style={{color:'black',background:'white'}} onClick={()=>{this.handleDetails(record)}}>详情</Button>
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
                if(response.data.data!==null) {
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
                else{
                    this.setState({
                        data: [],
                        total: 0,
                    })
                }
            }).catch(err => {
            console.log(err);
        })


        //请求样本类型
        httpRequest('post','/paper/sample/list',{})
            .then(response=>{
                console.log("请求样本类型",response)
                if(response.data.data!==null) {
                    this.setState({
                        sampleTypeGroup: response.data.data,
                    })
                    console.log("样本类型",this.state.sampleTypeGroup)

                }
            }).catch(err => {
            console.log(err);
        })

        //请求判读方法
        httpRequest('post','/paper/judge/list',{})
            .then(response=>{
                console.log("请求判读方法",response)
                if(response.data.data!==null) {
                    this.setState({
                        judgeGroup: response.data.data,
                    })
                    console.log("样本类型",this.state.judgeGroup)

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
                barcode:'',
                sampleType:'',
                organization:'',

                paperTypeId:null,

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
        if(this.state.barcode!==""){
            params.barcode=this.state.barcode;
        }
        if(this.state.sampleType!==""){
            params.sampleType=this.state.sampleType;
        }
        if(this.state.organization!==""){
            params.organization=this.state.organization;
        }
        params.page=1;
        params.pageSize=this.state.pageSize;
        console.log("搜索参数",params);

        httpRequest('post','/paper/list',params)
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
                    }
                    this.setState({
                        data:tempData,
                    })
                }
                else{
                    this.setState({
                        data: [],
                        total: 0,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    }

    //查看标曲搜索
    searchView(){
        let params={};
        if(this.state.bathNumber!==null){
            params.bathNumber=this.state.bathNumber;
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
                        dataView: response.data.data.info,
                        totalView: response.data.data.total,
                    })
                    const tempData=[...this.state.dataView];
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
                        dataView:tempData
                    })
                }
                else{
                    alert("不存在符合条件的数据！");
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
        httpRequest('post','/paper/sample/list',{})
            .then(response=>{
                console.log("请求样本类型",response)
                if(response.data!==[]) {
                    this.setState({
                        sampleTypeGroup: response.data.data,
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
                selectedRowKeys:[],

            //搜索框
            paperTypeName:'',
            barcode:'',
            sampleType:null,
            organization:null,
            //当前页
            currentPage:1,
        });
        console.log(this.state)


    }

    //查看标曲重置
    resetView(){
        console.log("重置")
        let params={
            page:1,
            pageSize:10,
            paperTypeId:this.state.paperTypeIdView
        }
        httpRequest('post','/paper/param/pro/list',params)
            .then(response=>{
                console.log(response)
                console.log(response.data.data)
                if(response.data!==[]) {
                    this.setState({
                        dataView: response.data.data.info,
                        totalView: response.data.data.total,
                    })
                    const tempData=[...this.state.dataView];
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
                        dataView:tempData,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

        this.setState({
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
        this.setState({
                modifyVisible:true,
                paperTypeId:record.paperTypeId,
                qualitativel:record.qualitativel,
                multiline:record.multiline,
                checkCLine:record.checkCLine,
            },
            ()=>console.log(this.state.paperTypeId)
        );
        let form_modify=this.form_modify.current;
        console.log("修改表格",form_modify)
        if(this.form_modify.current){
            form_modify.setFieldsValue({
                paperTypeName:record.paperTypeName,
                paperTypeNameEn:record.paperTypeNameEn,
                code:record.code,
                unit:record.unit,
                barcode:record.barcode,
                rangeBegin:record.rangeBegin,
                rangeEnd:record.rangeEnd,
                sampleType:record.sampleType,
                alertMax:record.alertMax,
                alertMin:record.alertMin,
                organization:record.organization,
                updateTime:record.updateTime,
                description:record.description,
                qualitativeOper:record.qualitativeOper,
                qualitativeGod:record.qualitativeGod,
                insertDate:record.insertDate,
                updateDate:record.updateDate,
                judgeMethod:record.judgeMethod,
                exposure:record.exposure,
                qualitativeName:record.qualitativeName,
                subPaper:record.subPaper,
                position:record.position
            })

        }
    }

    //删除某一行
    handleDelete=(record)=> {
        console.log('删除', record)
        let params = {
            paperTypeId: record.paperTypeId,
        }
        httpRequest('post','/paper/delete',params)
            .then(response=>{
                console.log(params)
                console.log("请求",response)
                if(response.data.code===1006){
                    let params={
                        page:this.state.currentPage,
                        pageSize:this.state.pageSize,
                    }
                    httpRequest('post','/paper/list',params)
                        .then(response=>{
                            console.log('试剂类型')
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
                                }
                                this.setState({
                                    data:tempData,
                                })
                            }
                            else{
                                this.setState({
                                    data: [],
                                    total: 0,
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
                    let params={
                        paperTypeId:this.state.paperTypeId,
                        qualitativel:this.state.qualitativel,
                        multiline:this.state.multiline,
                        checkCLine:this.state.checkCLine,
                        paperTypeName:values.paperTypeName,
                        paperTypeNameEn:values.paperTypeNameEn,
                        code:values.code,
                        unit:values.unit,
                        barcode:values.barcode,
                        rangeBegin:values.rangeBegin,
                        rangeEnd:values.rangeEnd,
                        sampleType:values.sampleType,
                        alertMax:values.alertMax,
                        alertMin:values.alertMin,
                        organization:values.organization,
                        description:values.description,
                        qualitativeOper:values.qualitativeOper,
                        qualitativeGod:values.qualitativeGod,
                        judgeMethod:values.judgeMethod,
                        exposure:values.exposure,
                        qualitativeName:values.qualitativeName,
                        subPaper:values.subPaper,
                        position:values.position
                    }
                    console.log("参数",params)
                    httpRequest('post','/paper/modify',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1004){
                                let inital_param={
                                    page:this.state.currentPage,
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/paper/list',inital_param)
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
                                        qualitativel:false,
                                        multiline:false,
                                        checkCLine:false,
                                    });
                                }, 1000);
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                    setTimeout(() => {
                        form_modify.resetFields();
                        this.setState({
                            loading:false,
                            //modifyVisible: false,
                            qualitativel:false,
                            multiline:false,
                            checkCLine:false,
                        });
                    }, 1000);
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
                        qualitativel:this.state.qualitativel,
                        multiline:this.state.multiline,
                        checkCLine:this.state.checkCLine,
                        paperTypeName:values.paperTypeName,
                        paperTypeNameEn:values.paperTypeNameEn,
                        code:values.code,
                        unit:values.unit,
                        barcode:values.barcode,
                        rangeBegin:values.rangeBegin,
                        rangeEnd:values.rangeEnd,
                        sampleType:values.sampleType,
                        alertMax:values.alertMax,
                        alertMin:values.alertMin,
                        organization:values.organization,
                        description:values.description,
                        qualitativeOper:values.qualitativeOper,
                        qualitativeGod:values.qualitativeGod,
                        judgeMethod:values.judgeMethod,
                        exposure:values.exposure,
                        qualitativeName:values.qualitativeName,
                        subPaper:values.subPaper,
                        position:values.position
                    }
                    console.log("参数",params)
                    httpRequest('post','/paper/add',params)
                        .then(response=>{
                            console.log(response)
                            if(response.data.code===1002){
                                let cu_page=(parseInt(this.state.total)+1)/this.state.pageSize;
                                let inital_params={
                                    page:Math.ceil(cu_page),
                                    pageSize:this.state.pageSize,
                                }
                                httpRequest('post','/paper/list',inital_params)
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
                                        qualitativel:false,
                                        multiline:false,
                                        checkCLine:false,
                                    });
                                }, 1000);
                            }
        else{
            setTimeout(() => {
                form.resetFields();
                this.setState({
                    loading:false,
                    addVisible: false,
                    qualitativel:false,
                    multiline:false,
                    checkCLine:false,
                });
                }, 1000);
            alert("添加失败！")
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                    setTimeout(() => {
                        form_modify.resetFields();
                        this.setState({
                            loading:false,
                            //addVisible: false,
                            qualitativel:false,
                            multiline:false,
                            checkCLine:false,
                        });
                    }, 1000);
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
            viewVisible:false,
            modifyVisible: false,
            detailVisible:false,
            qualitativel:false,
            multiline:false,
            checkCLine:false,

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
        else if(name==="barcode"){
            console.log("进到搜索框了")
            this.setState({
                barcode:value
            })
        }
        else if(name==="bathNumber"){
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
        httpRequest('post','/paper/list',params)
            .then(response=>{
                console.log('试剂类型')
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
                    }
                    this.setState({
                        data:tempData,
                    })
                }
                else{
                    this.setState({
                        data: [],
                        total: 0,
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    };
    //查看标曲翻页
    onChangeView= page => {
        console.log(page);
        this.setState({
            currentPageView: page,
        });
    };
    //单位选择框内容（完成）
    oroption(){
        return(
            this.state.organizationGroup.map((item)=>{
                return(<Option title="organization" value={item.unitId}>{item.unitName}</Option>)
            })
        )
    }

    //判读方法选择框内容（完成）
    juoption(){
        return(
            this.state.judgeGroup.map((item)=>{
                return(<Option title="judgeMethod" value={item.code}>{item.name}</Option>)
            })
        )
    }

    //样本类型选择框内容
    saoption(){
        console.log("样本类型选择框");
        return(
            this.state.sampleTypeGroup.map((item)=>{
                return(<Option title="sampleType" value={item.code}>{item.name}</Option>)
            })
        )
    }

    //是定性选择框
    checkboxOnChangeQualitativel(e){
        this.setState({
            qualitativel:e.target.checked
        })
    }

    //检查C线
    checkboxOnChangeCheckCLine(e){
        this.setState({
            checkCLine:e.target.checked
        })
    }

    //多T线选择框
    checkboxOnChangeMultiline(e){
        this.setState({
            multiline:e.target.checked
        })
    }

    //查看标曲
    handleView=(record)=>{
        console.log("查看标曲")
        //请求标曲数据
        let params={};
        params.page=1;
        params.pageSize=this.state.pageSize;
        params.paperTypeId=record.paperTypeId;
        httpRequest('post','/paper/param/pro/list',params)
            .then(response=>{
                console.log("请求标曲数据",response)
                if(response.data!==[]) {
                    this.setState({
                        dataView: response.data.data.info,
                        totalView:response.data.data.total,
                        paperTypeIdView:record.paperTypeId,
                    })
                    const tempData=[...this.state.dataView];
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
                        dataView:tempData,
                    })

                }
            }).catch(err => {
            console.log(err);
        })


        this.setState({
            viewVisible:true,
        })

    }

    //默认标曲
    handleDefault=(record)=>{
        console.log("默认标曲")
    }

    //详情
    handleDetails=(record)=>{
        console.log("详情",record)

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
            detailVisible:true,
            paperFade:paperFade,
            qualitative:qualitative,
            docrop:record.doCrop,
        },()=>{
            console.log("详情显示")
            if(record.madeTime!==null)
                record.madeTime=moment(record.madeTime);
            console.log("时间",record.madeTime)
            let form_detail=this.form_detail.current;
            console.log("修改表格",form_detail)
            if(this.form_modify.current){
                form_detail.setFieldsValue({
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

        })
    }

    form = React.createRef();

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
                        <Col span={3}>
                            <Input  placeholder="批号"
                                    value={this.state.barcode}
                                    name="barcode"
                                    onChange={this.inputOnChange}
                                    allowClear/>
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="请选择样本类型"
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
                    title="添加试剂类型"
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
                    <div>
                        <Form {...formItemLayout}
                              name="add"
                              ref={this.form}>
                            <Form.Item label="试剂名称"
                                       name="paperTypeName"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入试剂名称"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="试剂英文名称"
                                       name="paperTypeNameEn"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入试剂英文名称"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="代码"
                                       name="code"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入代码"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="描述"
                                       name="description">
                                <Input placeholder="请输入描述"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="结果单位"
                                       name="unit"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入结果单位"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="条码（不包括批号）"
                                       name="barcode"
                                       rules={[
                                           {required:true,message:"必填项不能为空"},]}>
                                <Input placeholder="请输入条码(条码为两位数以逗号分隔）"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值下限"
                                       name="rangeBegin"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}
                                           // 非负浮点数
                                       ]}>
                                <Input placeholder="请输入参考值下限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值上限"
                                       name="rangeEnd"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入参考值上限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="样本类型"
                                       name="sampleType"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择样本类型 ">
                                    {this.saoption()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="告警值上限"
                                       name="alertMax"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入告警值上限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="告警值下限"
                                       name="alertMin"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入告警值下限"
                                       allowClear/>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="qualitativel">
                                        <Checkbox onChange={this.checkboxOnChangeQualitativel}
                                                  checked={this.state.qualitativel}>
                                            是定性
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="multiline">
                                        <Checkbox onChange={this.checkboxOnChangeMultiline}
                                                  checked={this.state.multiline}>
                                            多T线
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                            <Form.Item label="定性阳性比较"
                                       name="qualitativeOper"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择定性阳性比较">
                                    <Option value=">="> >=</Option>
                                    <Option value=">"> > </Option>
                                    <Option value="&#60;=">  &#60;= </Option>
                                    <Option value="&#60;"> &#60; </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值"
                                       name="qualitativeGod"
                                        rules={[{pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入定性阳性GOD值"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="所属单位"
                                       name="organization"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择所属单位">
                                    {this.oroption()}
                                </Select>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="checkCLine">
                                        <Checkbox onChange={this.checkboxOnChangeCheckCLine}
                                                  checked={this.state.checkCLine}>
                                            检查C线
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={16}></Col>
                            </Row>
                            <Form.Item label="判读方法"
                                       name="judgeMethod"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择判读方法">
                                    {this.juoption()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="曝光值"
                                       name="exposure"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入曝光值"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="定性名称"
                                       name="qualitativeName">
                                <Input allowClear
                                       placeholder="请输入定性名称"/>
                            </Form.Item>
                            <Form.Item label="子试剂"
                                       name="subPaper">
                                <Input allowClear
                                       placeholder="请输入子试剂"/>
                            </Form.Item>
                            <Form.Item label="位置"
                                       name="position"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入位置"
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <Modal
                    forceRender={true}
                    title="修改试剂类型"
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
                            <Form.Item label="试剂名称"
                                       name="paperTypeName"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入试剂名称"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="试剂英文名称"
                                       name="paperTypeNameEn"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入试剂英文名称"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="代码"
                                       name="code"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入代码"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="描述"
                                       name="description">
                                <Input placeholder="请输入描述"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="结果单位"
                                       name="unit"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入结果单位"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="条码（不包括批号）"
                                       name="barcode"
                                       rules={[{required:true,message:"必填项不能为空"}]}>
                                <Input placeholder="请输入条码"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值下限"
                                       name="rangeBegin"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入参考值下限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="参考值上限"
                                       name="rangeEnd"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入参考值上限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="样本类型"
                                       name="sampleType"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择样本类型 ">
                                    {this.saoption()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="告警值上限"
                                       name="alertMax"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入告警值上限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="告警值下限"
                                       name="alertMin"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern:/^\d+(\.\d+)?$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入告警值下限"
                                       allowClear/>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="qualitativel">
                                        <Checkbox onChange={this.checkboxOnChangeQualitativel}
                                                  checked={this.state.qualitativel}>
                                            是定性
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="multiline">
                                        <Checkbox onChange={this.checkboxOnChangeMultiline}
                                                  checked={this.state.multiline}>
                                            多T线
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                            <Form.Item label="定性阳性比较"
                                       name="qualitativeOper"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择定性阳性比较">
                                    <Option value=">="> >=</Option>
                                    <Option value=">"> > </Option>
                                    <Option value="&#60;=">  &#60;= </Option>
                                    <Option value="&#60;"> &#60; </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值"
                                       name="qualitativeGod"
                                       rules={[{pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="定性阳性GOD值"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="所属单位"
                                       name="organization"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择所属单位">
                                    {this.oroption()}
                                </Select>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="checkCLine">
                                        <Checkbox onChange={this.checkboxOnChangeCheckCLine}
                                                 checked={this.state.checkCLine}>
                                            检查C线
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={16}></Col>
                            </Row>
                            <Form.Item label="创建时间"
                                       name="insertDate">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="修改时间"
                                       name="updateDate">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="判读方法"
                                       name="judgeMethod"
                                       rules={[{required:true,message:"必选项不能为空"}]}>
                                <Select placeholder="请选择判读方法">
                                    {this.juoption()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="曝光值"
                                       name="exposure"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入曝光值上限"
                                       allowClear/>
                            </Form.Item>
                            <Form.Item label="定性名称"
                                       name="qualitativeName">
                                <Input allowClear/>
                            </Form.Item>
                            <Form.Item label="子试剂"
                                       name="subPaper">
                                <Input allowClear/>
                            </Form.Item>
                            <Form.Item label="位置"
                                       name="position"
                                       rules={[{required:true,message:"必填项不能为空"},
                                           {pattern: /^[0-9]+$/, message:'请输入数字'}]}>
                                <Input placeholder="请输入位置"
                                       allowClear/>
                            </Form.Item>
                        </Form>
                    </div>

                </Modal>
                <Modal
                    forceRender={true}
                    title="查看标曲"
                    visible={this.state.viewVisible}
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
                       <div>
                           <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                               <Col span={4}>
                                   <Input  placeholder="批号"
                                           value={this.state.bathNumber}
                                           name="bathNumber"
                                           onChange={this.inputOnChange}
                                           allowClear/>
                               </Col>
                               <Col span={2}>
                                   <Button type="primary" onClick={this.searchView}><SearchOutlined />搜索</Button>
                               </Col>
                               <Col span={2} >
                                   <Button type="primary" onClick={this.resetView}><ReloadOutlined />重置</Button>
                               </Col>
                               <Col span={16}></Col>
                           </Row>
                       </div>
                        <div>
                            <Table
                                columns={this.columnsView}
                                dataSource={this.state.dataView}
                                rowKey={record => record.key}
                                bordered={true}
                                style={{margin:'20px 0'}}
                                pagination={{
                                    position: ['bottomLeft'] ,
                                    total:this.state.totalView,
                                    showTotal:total => `共 ${total} 条`,
                                    showQuickJumper:true,
                                    showSizeChanger:true,
                                    current:this.state.currentPageView,
                                    onChange:this.onChangeView,
                                }}
                            />
                        </div>

                    </div>
                </Modal>

                <Modal
                    forceRender={true}
                    title="基本信息"
                    visible={this.state.detailVisible}
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
                        <Form {...formItemLayout}
                              name="view"
                              ref={this.form_detail}>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={8}>
                                    <Form.Item label="试剂类型"
                                               name="paperTypeName"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Select placeholder="请选择试剂类型" disabled={true}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="批号"
                                               name="bathNumber"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入批号"
                                               disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="生产日期"
                                               name="madeTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <DatePicker onChange={this.dateOnChange}
                                                    placeholder="请选择生产日期 "
                                                    disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={1}></Col>
                                <Col span={7}>
                                    <Form.Item name="paperFade">
                                        <Checkbox checked={this.state.paperFade}
                                                  disabled={true}>
                                            能效已降低
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="反应时间"
                                               name="reactiveTime"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入反应时间"
                                               disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="所属单位"
                                               name="organization"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input placeholder="请输入单位"
                                               disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_WIDTH"
                                               name="lineWidth"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_LENGTH"
                                               name="lineLength"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PX"
                                               name="linePx"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_PY"
                                               name="linePy"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE0R"
                                               name="line0r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE0L"
                                               name="line0l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINEL"
                                               name="linel"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINER"
                                               name="liner"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={12}>
                                    <Form.Item label="LINE2L"
                                               name="line2l"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="LINE2R"
                                               name="line2r"
                                               rules={[{required:true,message:"必填项不能为空"}]}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={24}>
                                    <Form.Item name="qualitative">
                                        <Checkbox disabled={true}
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
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性阳性+GOD值"
                                               name="qualitativeGod">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="定性弱阳性GOD值"
                                               name="qualitativeGod11">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N0"
                                               name="lineN0">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N1"
                                               name="lineN1">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N2"
                                               name="lineN2">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N3"
                                               name="lineN3">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N4"
                                               name="lineN4">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N5"
                                               name="lineN5">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N6"
                                               name="lineN6">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_N7"
                                               name="lineN7">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_N8"
                                               name="lineN8">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD0"
                                               name="lineGod0">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD1"
                                               name="lineGod1">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD2"
                                               name="lineGod2">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD3"
                                               name="lineGod3">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD4"
                                               name="lineGod4">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD5"
                                               name="lineGod5">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD6"
                                               name="lineGod6">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD7"
                                               name="lineGod7">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="LINE_GOD8"
                                               name="lineGod8">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                </Col>
                            </Row>

                            <Form.Item label="描述"
                                       name="description">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="TOP_GOD"
                                       name="topGod">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="LOWER_GOD"
                                       name="lowerGod">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="LINE_WEI"
                                       name="lineWei">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="LINE_SHOWTYPE"
                                       name="lineShowtype">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="LINE_METHOD"
                                       name="lineMethod">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="LINE_JUDGE_METHOD"
                                       name="lineJudgeMethod">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item name="docrop">
                                <Checkbox disabled={true}
                                          checked={this.state.docrop}>
                                    DO_CROP
                                </Checkbox>
                            </Form.Item>
                            <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                                <Col span={6}>
                                    <Form.Item label="CROP1_PX"
                                               name="CROP1_PX">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_PY"
                                               name="CROP1_PY">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_WIDTH"
                                               name="CROP1_WIDTH">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="CROP1_HEIGHT"
                                               name="CROP1_HEIGHT">
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="定性阳性GOD值++"
                                       name="qualitativeGod2">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++"
                                       name="qualitativeGod3">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值++++"
                                       name="qualitativeGod4">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item label="定性阳性GOD值+++++"
                                       name="qualitativeGod5">
                                <Input disabled={true}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
