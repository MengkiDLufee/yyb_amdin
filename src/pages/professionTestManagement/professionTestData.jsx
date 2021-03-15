import React, { Component } from 'react'
import {Row, Col, Form, Checkbox} from 'antd';
import { Table ,Button , Input , Select, Space ,Modal,DatePicker} from 'antd';
import ajax from "../../api/ajax";
import {exportFile} from '../../api/index'
import addKey from "../../api/addKey";

import {ReloadOutlined,
    SearchOutlined ,
    PlusOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    CheckCircleOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons'
import './index.less'
import moment from 'moment';
import changeData from "../../api/changeData";
const { RangePicker } = DatePicker;
const { Option } = Select;

class ModifyDetailPatientInfoModal extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};
        Object.assign(input,this.props.record);
        console.log("init record:",input);
        this.state= {
            testTime: '',
            input: input,
        }
        //时间格式转换
        let testTime=this.props.record.testTime;
        let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        this.state.testTime=mymoment;
    }
   //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //点击完成
    handleOk = () => {
        console.log('添加完成')
        console.log(this.form)
        let form = this.form.current;
        form.validateFields()//表单输入校验
            .then((values) => {
                let data={};
                let myInput=Object.keys(this.state.input);
                for(let ii=0;ii<myInput.length;ii++){
                    if(this.state.input[myInput[ii]]!==""){
                        data[myInput[ii]]=this.state.input[myInput[ii]];
                    }
                }
                data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/exam/data/newdata/modify";
                //console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1004){
                            console.log("请求错误！",response);
                        }else{
                            form.resetFields();
                            console.log("修改成功：",response);
                            Object.assign(this.props.record,this.state.input);
                            this.props.setVisible(false);
                        }
                    });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });


    };

    //时间选择函数
    rangePickerOnChange=(value, dateString)=>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.state.input.testTime=dateString;
        this.setState({
            testTime:value,
        })
    }
    rangePickerOnOk=(value)=> {
        console.log('onOk: ', value);
    }
    //得到文本框输入
    inputChange = (e,name) => {
        //console.log(name);
        let themename = e.target.name;
        console.log(themename)
        //console.log(e.target.name);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        });
        console.log(this.state);
    }
    //参数设置
    // state={
    //     //表格1数据
    //     testTime:'',
    //     input:{}
    // };

    /*表单验证
      Form.useForm是是 React Hooks 的实现，只能用于函数组件
      class组件中通过 React.createRef()来获取数据域*/
    form = React.createRef();
    render(){
        return(
            <div>
                {/* 弹窗 */}
                <Modal
                    title="修改"
                    centered
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    okText="确定"
                    onCancel={this.handleCancel}
                    cancelText="关闭"
                    className="modal1"
                    width="700"
                >
                    <div className="modal-body" style={{height:"550px"}}>
                        <Form
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 16 }}
                            layout="horizontal"
                            ref={this.form}//表单验证，通过ref获取
                            initialValues={this.state.input}
                        >
                            <Form.Item
                                label="日期"
                                name="mytestTime"
                                initialValue={this.state.testTime}
                                rules={[{ required: true ,message:"请选择日期"}]}//设置验证规则
                            >
                                <DatePicker showTime onChange={this.rangePickerOnChange} onOk={this.rangePickerOnOk} value={this.state.testTime}/>
                            </Form.Item>
                            <Form.Item label="病人"
                                       name="patientName"
                                       rules={[{ required: true ,message:"请输入病人"}]}
                            >
                                <Input placeholder={"病人姓名"}
                                       onChange={(e)=>{this.inputChange(e,"patientName")}}
                                       value={this.state.input.patientName}
                                       />
                            </Form.Item>
                            <Form.Item
                                label="试剂"
                                name="paperTypeId"
                                rules={[{ required: true ,message:"请输入试剂"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"paperTypeId")}} value={this.state.input.paperTypeId}/>
                            </Form.Item>
                            <Form.Item
                                label="数值"
                                name="value"
                                rules={[
                                    {required:true,message:'请输入数值！',},
                                ]}
                            >
                                <Input      onChange={(e)=>{this.inputChange(e,"value")}} value={this.state.input.value}/>
                            </Form.Item>

                            <Form.Item label="数值2"
                                       name="value2"
                                       rules={[
                                           {required:true,message:'请输入数值2！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"value2")}} value={this.state.input.value2}/>
                            </Form.Item>
                            <Form.Item label="GOD"
                                       name="god"
                                       rules={[
                                           {required:true,message:'请输god！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"god")}} value={this.state.input.god}/>
                            </Form.Item>
                            <Form.Item label="GOD2"
                                       name="god2"
                                       rules={[
                                           {required:true,message:'请输god2！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"god2")}} value={this.state.input.god2}/>
                            </Form.Item>
                            <Form.Item  label="CGOD"
                                        name="cgod"
                                        rules={[
                                            {required:true,message:'请输入cgod！',},
                                        ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"cgod")}} value={this.state.input.cgod}/>
                            </Form.Item>
                            <Form.Item label="设备码"
                                       name="proDeviceId"
                                       rules={[
                                           {required:true,message:'请输入设备码！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"proDeviceId")}} value={this.state.input.proDeviceId}/>
                            </Form.Item>
                            <Form.Item label="批号"
                                       name="bathNumber"
                                       rules={[
                                           {required:true,message:'请输入批号！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"bathNumber")}} value={this.state.input.bathNumber}/>
                            </Form.Item>
                            <Form.Item label="测试图片"
                                       name="testImage"
                                       rules={[
                                           {required:true,message:'请输入测试图片！',},
                                       ]}>
                                <Input      onChange={(e)=>{this.inputChange(e,"testImage")}} value={this.state.input.testImage}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
class LatestTestDataModal extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns=[
        {
            title: '日期',
            dataIndex: 'testTime',
            width:150,
            sorter: {
                compare: (a, b) => a.testTime - b.testTime,
                multiple: 3,
            },
        },
        {
            title: '病人姓名',
            dataIndex: 'patientName',
            width: 150,
            sorter: {
                compare: (a, b) => a.patientName - b.patientName,
                multiple: 2,
            },
        },
        {
            title: '试剂',
            dataIndex: 'paperTypeId',
            width:150,
            sorter: {
                compare: (a, b) => a.paperTypeId - b.paperTypeId,
                multiple: 3,
            },
        },
        {
            title: '数值',
            dataIndex: 'value',
            width: 150,
            sorter: {
                compare: (a, b) => a.value - b.value,
                multiple: 2,
            },
        },
        {
            title: '数值2',
            dataIndex: 'value2',
            width:150,
            sorter: {
                compare: (a, b) => a.value2 - b.value2,
                multiple: 3,
            },
        },
        {
            title: 'GOD',
            dataIndex: 'god',
            width: 150,
            sorter: {
                compare: (a, b) => a.god - b.god,
                multiple: 2,
            },
        },
        {
            title: 'GOD2',
            dataIndex: 'god2',
            width:150,
            sorter: {
                compare: (a, b) => a.god2 - b.god2,
                multiple: 3,
            },
        },
        {
            title: 'CGOD',
            dataIndex: 'cgod',
            width: 150,
            sorter: {
                compare: (a, b) => a.cgod - b.cgod,
                multiple: 2,
            },
        },
        {
            title: '设备码',
            dataIndex: 'proDeviceId',
            width:150,
            sorter: {
                compare: (a, b) => a.proDeviceId - b.proDeviceId,
                multiple: 3,
            },
        },
        {
            title: '批号',
            dataIndex: 'bathNumber',
            width: 150,
            sorter: {
                compare: (a, b) => a.bathNumber - b.bathNumber,
                multiple: 2,
            },
        },
        {
            title: '测试图片',
            dataIndex: 'testImage',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
            render: (text) =>
                //   console.log("record的内容",record)
                <img src={text} width="100px" alt=""/>
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:150,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
                </Space>
            ),
        },
    ];
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }

    //得到输入
    inputChange = (e,name) => {
        //console.log(name);
        //console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //表格行选择
    onSelectChange = row => {
        console.log('所选择行',row)
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
            {selectedRowKeys:row}
        )
    };
    //翻页
    handleTableChange = (pagination) =>{
        //console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestData(page);
        //this.setState({paginationProps:pagination});
        //console.log(pagination)
    };
    //搜索
    search= ()=> {
        let page={
            page:1,
            pageSize:10,
        }
        this.requestData(page);
    }
    //重置
    reset = () => {
        console.log('重置',this.state.input);
        let myInput=Object.keys(this.state.input);
        let data = {};
        for(let ii=0;ii<myInput.length;ii++){
            data[myInput[ii]]='';
        }
        this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
                rangePickerData:[],
            },
        )
        this.search();
    };
    //请求表格数据
    requestData=(page)=>{
        let data={
            ...page,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        data.loginId=this.props.record.loginId;
        let url="/exam/data/newdata/list";
        //console.log("request:",data);
        ajax(url,data,'POST')
            .then((response)=>{
                console.log("response:",response);
                if(response.data.data==null){
                    console.log("请求错误！");
                }
                else{
                    let mydata=response.data.data.info;
                    console.log(mydata);
                    let paginationProps={...this.state.paginationProps};
                    addKey(mydata);
                    paginationProps.total=response.data.data.total;
                    paginationProps.current=page.page;
                    paginationProps.pageSize=page.pageSize;
                    //console.log("data:",response);
                    this.setState({
                        data:mydata,
                        paginationProps:paginationProps,
                    });
                }
            });
    }
    //按照搜索情况导出excel
    exportSearch= ()=>{
        let data={
            page:1,
            pageSize:10,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        console.log("exportFile input:",data);
        //exportFile("/exam/data/export/login/condition",data);
        exportFile('/user/base/info/export/condition',{});
        //console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         console.log(response);
        //     }).catch(e=>{
        //     console.log("search error!",e);
        // });
    }

    //得到输入时间
    rangePickerDataChange=(datas,dateStrings)=>{
        console.log("timeTest!");
        console.log(datas);
        console.log(dateStrings);
        this.state.input.startDate=dateStrings[0]+" 00:00:00";
        this.state.input.endDate=dateStrings[1]+" 24:00:00";
        this.setState({
            rangePickerData:datas,
        })
    }

    //表格2数据以及函数

    //参数设置
    state={
        //弹窗
        modalVisible:false,
        modalVisible2:false,
        //表格1数据
        input:{
            patientName:'',
            startDate:'',
            endDate:'',
        },
        rangePickerData:[],
        paginationProps:{
            position:['bottomLeft'],
            total:0,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeys:[],
        data:[{
            key:1,
            patientName:"test",
            testNumber: "test",
        }],
        record:{
            loginName:"",
        },

        //表格2数据


    };

    //弹窗函数
    //弹窗1
    detailPatientInfoModal = ()=>{
        if(this.state.modalVisible)
            return(
                <DetailPatientInfoModal
                    record={this.state.record}
                    visible={this.state.modalVisible}
                    setVisible={this.setModalvisible}
                />
            );

    }
    setModalvisible=(flag)=>{
        this.setState({
            modalVisible:flag,
        });
    }
    lookModal=record=>{
        this.setState({
            modalVisible:true,
            record,
        });
    }

    //弹窗2
    modifyDetailPatientInfoModal = ()=>{
        if(this.state.modalVisible2)
            return(
                <ModifyDetailPatientInfoModal
                    record={this.state.record2}
                    visible={this.state.modalVisible2}
                    setVisible={this.setModalvisible2}
                />
            );

    }
    setModalvisible2=(flag)=>{
        this.setState({
            modalVisible2:flag,
        });
    }
    modify=(record)=>{
        this.setState({
            modalVisible2:true,
            record2:record,
        });
    }

    render(){
        return(
            <div>
                <Modal
                    title={"最新测试数据"}
                    centered
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>医生：{this.props.record.loginName}</p>
                        <div style={{whiteSpace:"nowrap"}}>
                            <Input placeholder={"病人姓名"} className={'input1'} onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                            <RangePicker value={this.state.rangePickerData} onChange={(data,datastrings)=>{this.rangePickerDataChange(data,datastrings)}}></RangePicker>
                            <Button
                                type={"primary"}
                                icon={<SearchOutlined className={"icon1"}/> }
                                onClick={this.search}
                                className={"button1"}
                            >
                                搜索
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<ReloadOutlined className={"icon1"}/> }
                                onClick={this.reset}
                                className={"button1"}
                            >
                                重置
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<CloudDownloadOutlined className={"icon1"}/> }
                                onClick={this.exportSearch}
                                className={"button1"}
                            >
                                导出
                            </Button>
                        </div>
                        <p ><span >1 病人信息</span></p>
                        <div style={{heigh:"100%"}}>
                            <Table
                                columns={this.columns}
                                dataSource={this.state.data}
                                bordered={true}
                                rowSelection={false}
                                style={{margin:"20px 0",borderBottom:'1px,soild'}}
                                pagination={this.state.paginationProps}
                                onChange={this.handleTableChange}
                                scroll={{ x: 1500, y: 400 }}
                            />
                        </div>
                    </div>
                </Modal>
                {this.modifyDetailPatientInfoModal()}
            </div>
        )
    }
}
class DetailPatientInfoModal extends Component{
    //初始化
    constructor(props) {
        super(props);
        this.requestData();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title: '病人姓名',
            dataIndex: 'patientName',
            width:150,
        },
        {
            title: '病人账号',
            dataIndex: 'patientNumber',
            width:150,
        },
        {
            title: '病人年龄',
            dataIndex: 'patientAge',
            width: 150,
        },
        {
            title:'病人地址',
            dataIndex:'patientAddress',
            width:150,
            align:'center',
        },
        {
            title:'病人测试状况',
            dataIndex:'patientTestStatus',
            width:150,
            align:'center',
            render:(text)=>(
                <p>
                    {changeData(text,
                        ["patient_finish","patient_no_test","patient_testing"],
                        ["结束","没有测试","正在测试"])}
                </p>
            ),
        },
        {
            title:'测试次数',
            dataIndex:'testNumber',
            width:150,
            align:'center',
        },
        {
            title:'创建时间',
            dataIndex:'insertDate',
            width:150,
            align:'center',
        },
    ];
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }

    //请求表格数据
    requestData=(page)=>{
        let data={};
        data.patientId=this.props.record.patientId;
        let url="/exam/data/patient/details";
        //console.log("request:",data);
        ajax(url,data,'POST')
            .then((response)=>{
                console.log("response:",response);
                if(response.data.data==null){
                    console.log("查询失败");
                }else{
                    let mydata=response.data.data.info;
                    mydata.key=1;
                    //addKey(data);
                    console.log("data:",mydata);
                    this.setState({
                        data:[mydata],
                    });
                }

            });
    }

    //参数设置
    state={
        //表格1数据
        data:[],
    };
    render(){
        return(
            <div>
                <Modal
                    title={"病人详情"}
                    centered
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <div style={{heigh:"100%"}}>
                            <Table
                                columns={this.columns}
                                dataSource={this.state.data}
                                bordered={true}
                                rowSelection={false}
                                style={{margin:"20px 0",borderBottom:'1px,soild'}}
                                pagination={null}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
class PatientInfoModal extends Component{
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns=[
        {
            title: '姓名',
            dataIndex: 'patientName',
            width:150,
            sorter: {
                compare: (a, b) => a.patientName - b.patientName,
                multiple: 3,
            },
        },
        {
            title: '测试次数',
            dataIndex: 'testNumber',
            width: 150,
            sorter: {
                compare: (a, b) => a.testNumber - b.testNumber,
                multiple: 2,
            },
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:150,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal(record)}}>查看详情</Button>
                </Space>
            ),
        },
    ];
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }

    //得到输入
    inputChange = (e,name) => {
        //console.log(name);
        //console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //表格行选择
    onSelectChange = row => {
        console.log('所选择行',row)
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
            {selectedRowKeys:row}
        )
    };
    //翻页
    handleTableChange = (pagination) =>{
        //console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestData(page);
        //this.setState({paginationProps:pagination});
        //console.log(pagination)
    };
    //搜索
    search= ()=> {
        let page={
            page:1,
            pageSize:10,
        }
        this.requestData(page);
    }
    //重置
    reset = () => {
        console.log('重置',this.state.input);
        let myInput=Object.keys(this.state.input);
        let data = {};
        for(let ii=0;ii<myInput.length;ii++){
            data[myInput[ii]]='';
        }
        this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },
        )
        this.search();
    };
    //请求表格数据
    requestData=(page)=>{
        let data={
            ...page,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        console.log("record",this.props.record);
        data.loginId=this.props.record.loginId;
        let url="/exam/data/patient/login";
        //console.log("request:",data);
        ajax(url,data,'POST')
            .then((response)=>{
                console.log("response:",response);
                if(response.data.data==null)
                    console.log("查询失败");
                else{
                    let data=response.data.data.info.records;
                    let paginationProps={...this.state.paginationProps};
                    addKey(data);
                    paginationProps.total=response.data.data.total;
                    paginationProps.current=page.page;
                    paginationProps.pageSize=page.pageSize;
                    console.log("data:",response);
                    this.setState({
                        data:data,
                        paginationProps:paginationProps,
                    });
                }
            });
    }
    //按照搜索情况导出excel
    exportSearch= ()=>{
        let data={
            page:1,
            pageSize:10,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        console.log("exportFile input:",data);
        //exportFile("/exam/data/export/login/condition",data);
        exportFile('/user/base/info/export/condition',{});
        //console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         console.log(response);
        //     }).catch(e=>{
        //     console.log("search error!",e);
        // });
    }

    //表格2数据以及函数

    //参数设置
    state={
        //弹窗
        modalVisible:false,
        //表格1数据
        input:{
            patientName:'',
        },
        paginationProps:{
            position:['bottomLeft'],
            total:0,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeys:[],
        data:[
        //     {
        //     key:1,
        //     patientName:"test",
        //     testNumber: "test",
        // }
        ],
        record:{
            loginName:"",
        },

        //表格2数据


    };

    //弹窗函数
    //弹窗1
    detailPatientInfoModal = ()=>{
        if(this.state.modalVisible)
        return(
            <DetailPatientInfoModal
                record={this.state.record}
                visible={this.state.modalVisible}
                setVisible={this.setModalvisible}
            />
        );

    }
    setModalvisible=(flag)=>{
        this.setState({
            modalVisible:flag,
        });
    }
    lookModal=record=>{
        this.setState({
            modalVisible:true,
            record,
        });
    }

    //弹窗2


    render(){
        return(
            <div>
                <Modal
                    title={"病人信息"}
                    centered
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>医生：{this.props.record.loginName}</p>
                        <p style={{whiteSpace:"nowrap"}}>
                            <Input placeholder={"病人姓名"} className={'input1'} onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                            <Button
                                type={"primary"}
                                icon={<SearchOutlined className={"icon1"}/> }
                                onClick={this.search}
                                className={"button1"}
                            >
                                搜索
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<ReloadOutlined className={"icon1"}/> }
                                onClick={this.reset}
                                className={"button1"}
                            >
                                重置
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<CloudDownloadOutlined className={"icon1"}/> }
                                onClick={this.exportSearch}
                                className={"button1"}
                            >
                                导出
                            </Button>
                        </p>
                        <p ><span >1 病人信息</span></p>
                        <div style={{heigh:"100%"}}>
                            <Table
                                columns={this.columns}
                                dataSource={this.state.data}
                                bordered={true}
                                rowSelection={false}
                                style={{margin:"20px 0",borderBottom:'1px,soild'}}
                                pagination={this.state.paginationProps}
                                onChange={this.handleTableChange}
                            />
                        </div>
                    </div>
                </Modal>
                {this.detailPatientInfoModal()}
            </div>
        )
    }
}

export default class ProfessionTestData extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title:'医生电话',
            dataIndex:'loginAccount',
            width:150,
            align:'center',
        },
        {
            title:'医生姓名',
            dataIndex:'loginName',
            width:150,
            align:'center',
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:300,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookpatientInfoModal(record)}}>病人信息</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.looklatestData(record)}}>最新测试数据</Button>
                </Space>
            ),
        },
    ];
    //函数部分
    //得到输入
    inputChange = (e,name) => {
        //console.log(name);
        //console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //表格行选择
    onSelectChange = row => {
        console.log('所选择行',row)
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
            {selectedRowKeys:row}
        )
    };
    //翻页
    handleTableChange = (pagination) =>{
        //console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestData(page);
        //this.setState({paginationProps:pagination});
        //console.log(pagination)
    };
    //搜索
    search= ()=> {
        let page={
            page:1,
            pageSize:10,
        }
        this.requestData(page);
    }
    //重置
    reset = () => {
        console.log('重置',this.state.input);
        let myInput=Object.keys(this.state.input);
        let data = {};
        for(let ii=0;ii<myInput.length;ii++){
            data[myInput[ii]]='';
        }
        this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },
        )
        this.search();
    };
    //请求表格数据
    requestData=(page)=>{
        let data={
            ...page,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        //console.log("request:",data);
        ajax("/exam/data/list",data,'POST')
            .then((response)=>{
                console.log("response:",response);
                if(response.data.data==null){
                    console.log("request error!");
                    return;
                }
                let data=response.data.data.info;
                let paginationProps={...this.state.paginationProps};
                addKey(data);
                paginationProps.total=response.data.data.total;
                paginationProps.current=page.page;
                paginationProps.pageSize=page.pageSize;
                console.log("data:",response);
                this.setState({
                    data:data,
                    paginationProps:paginationProps,
                });
            });
    }
    //按照搜索情况导出excel
    exportSearch= ()=>{
        let data={
            page:1,
            pageSize:10,
        }
        let myInput=Object.keys(this.state.input);
        for(let ii=0;ii<myInput.length;ii++){
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        console.log("exportFile input:",data);
        //exportFile("/exam/data/export/login/condition",data);
        exportFile('/exam/data/export/login/condition',data);
        //console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         console.log(response);
        //     }).catch(e=>{
        //     console.log("search error!",e);
        // });
    }

    //表格2数据以及函数



    //参数设置
    state={
        //弹窗
        patientInfoModalvisible:false,
        //表格1数据
        input:{
            loginAccount:"",
            loginName:"",
        },
        paginationProps:{
            position:['bottomLeft'],
            total:0,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeys:[],
        data:[
            // {
            //     key:1,
            //     loginAccount:"test",
            //     loginNmae:"test",
            // }
        ],
        record:{
            loginName:"",
        },

        //表格2数据


    };

    //弹窗函数
    //弹窗1
    patientInfoModal = ()=>{
        if(this.state.patientInfoModalvisible)
        return(
            <PatientInfoModal
                record={this.state.record}
                visible={this.state.patientInfoModalvisible}
                setVisible={this.setpatientInfoModalvisible}
            />
        );
    }
    setpatientInfoModalvisible=(flag)=>{
        this.setState({
            patientInfoModalvisible:flag,
        });
    }
    lookpatientInfoModal=record=>{
        this.setState({
            patientInfoModalvisible:true,
            record,
        });
    }

    //弹窗2
    latestTestDataModal = ()=>{
        if(this.state.modalvisible2)
            return(
                <LatestTestDataModal
                    record={this.state.record2}
                    visible={this.state.modalvisible2}
                    setVisible={this.setVisible2}
                />
            );
    }
    setVisible2=(flag)=>{
        this.setState({
            modalvisible2:flag,
        });
    }
    looklatestData=record=>{
        this.setState({
            modalvisible2:true,
            record2:record,
        });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys:selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div style={{height:"100%"}}>
                <div style={{'margin':'0 0 15px 0'}}>
                    <div justify="space-between" gutter="15" style={{display:"flex"}}>
                        <Input placeholder={'医生电话'} className={'input1'} onChange={(e)=>{this.inputChange(e,"loginAccount")}} value={this.state.input.loginAccount}/>
                        <Input placeholder={'医生姓名'} className={'input1'} onChange={(e)=>{this.inputChange(e,"loginName")}} value={this.state.input.loginName}/>
                        <Button
                            type={"primary"}
                            icon={<SearchOutlined className={"icon1"}/> }
                            onClick={this.search}
                            className={"button1"}
                        >
                            搜索
                        </Button>
                        <Button
                            type={"primary"}
                            icon={<ReloadOutlined className={"icon1"}/> }
                            onClick={this.reset}
                            className={"button1"}
                        >
                            重置
                        </Button>
                        <Button
                            type={"primary"}
                            icon={<CloudDownloadOutlined className={"icon1"}/> }
                            onClick={this.exportChoose}
                            className={"button2"}
                        >
                            导出已选择数据
                        </Button>
                        <Button
                            type={"primary"}
                            icon={<CloudDownloadOutlined className={"icon1"}/> }
                            onClick={this.exportSearch}
                            className={"button2"}
                        >
                            按检索条件导出
                        </Button>
                    </div>
                </div>
                {/*表格*/}
                <div style={{heigh:"100%"}}>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        bordered={true}
                        rowSelection={rowSelection}
                        style={{margin:"20px 0",borderBottom:'1px,soild'}}
                        pagination={this.state.paginationProps}
                        onChange={this.handleTableChange}
                    />
                </div>
                {this.patientInfoModal()}
                {this.latestTestDataModal()}
            </div>
        )
    }
}
