import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Table ,Button , Input , Select, Space ,Modal} from 'antd';
import { DatePicker} from 'antd';
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

const { RangePicker } = DatePicker;


class DoctorTable extends Component{
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookPatientInfo(record)}}>病人信息</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.looklatestData(record)}}>最新测试数据</Button>
                </Space>
            ),
        },
    ];
    rowSelection={
        rowSelection:this.props.selectedRowKeys,
        onchange:this.props.onSelectChange,
    }
    state={
        visible_patientInfo:false,
        visible_latestData:false,
        paginationProps:{
            position:['bottomLeft'],
            total:this.props.data.total,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        record:{
            key:'',
            loginAccount:'',
            loginName:'',
            loginId:'',
        },
        patientsData:[{
            key:1,
            testNumber:'0',
            patientName:'白病人',
        }],
        latestData:[],
        input:{
            patientName:"",
        }
    }
    handleTableChange = (pagination) =>{
        //console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestPatientTableData(page);
        //this.setState({paginationProps:pagination});
        //console.log(pagination)
    };

    requestPatientTableData=(page)=>{
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
        ajax("/exam/data/patient/login",data,'POST')
            .then((response)=>{
                let data=response.data.data.info;
                addKey(data);
                this.state.paginationProps.total=response.data.data.total;
                this.state.paginationProps.current=page.page;
                this.state.paginationProps.pageSize=page.pageSize;
                console.log("data:",response);
                this.setPatientsData(data);
            }).catch(e=>{
            console.log("search error!",e);
        });
    }
    patientTable = ()=>{
        return(
            <PatientTable
                data={this.state.patientsData}
                dataChange={this.setPatientsData}
                paginationProps={this.state.paginationProps}
                handleTableChange={this.handleTableChange}
            />
        );
    }
    inputChange = (e,name) => {
        //console.log(name);
        //console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    lookPatientInfo=(record)=>{
        this.setState({
            visible_PatientInfo:true,
            record,
        });
        //this.searchpatient();
    }
    searchPatient= ()=> {
        let page={
            page:1,
            pageSize:10,
        }
        this.requestPatientTableData(page);
    }
    resetPatient = () => {
        console.log('重置',this.state.input);
        let data = {
            patientName:"",
        };
        this.state.input=data;
        this.setState(
            {
                input:data,
            },
        )
        this.search();
    };

    looklatestData=(record)=>{
        this.setState({
            visible_latestData:true,
            record,
        });
    }

    handleCancle_patientInfo=()=>{
        this.setState({
            visible_PatientInfo:false,
        })
    }
    handleCancle_latestData=()=>{
        this.setState({
            visible_latestData:false,
        })
    }


    latestDataTable = ()=>{
        return(
            <LatestDataTable
                data={this.state.latestDataData}
                dataChange={this.setLatestData}
            />
        );
    }
    setLatestData=(data)=>{
        this.setState({
            latestData:data,
        });
    }

    setPatientsData=(data)=>{
        this.setState({
            patientsData:data,
        });
    }

    render() {
        return(
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    bordered={true}
                    rowSelection={this.rowSelection}
                    style={{margin:"20px 0",borderBottom:'1px,soild'}}
                    pagination={this.props.paginationProps}
                    onChange={this.props.handleTableChange}
                />
                {/*病人测试信息弹窗*/}
                <Modal
                    title={"病人信息"}
                    centered
                    visible={this.state.visible_PatientInfo}
                    onCancel={this.handleCancle_patientInfo}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>医生：{this.state.record.doctor_name}</p>
                        <p style={{whiteSpace:"nowrap"}}>
                            <Input placeholder={"病人姓名"} className={'input1'} onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                            <Button
                                type={"primary"}
                                icon={<SearchOutlined className={"icon1"}/> }
                                onClick={this.searchPatient}
                                className={"button1"}
                            >
                                搜索
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<ReloadOutlined className={"icon1"}/> }
                                onClick={this.resetPatient}
                                className={"button1"}
                            >
                                重置
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<CloudDownloadOutlined className={"icon1"}/> }
                                onClick={this.patient_export}
                                className={"button1"}
                            >
                                导出
                            </Button>
                        </p>
                        <p ><span >1 病人信息</span></p>
                        <div style={{heigh:"100%"}}>
                            {this.patientTable()}
                        </div>
                    </div>
                </Modal>
                {/*最新测试数据弹窗*/}
                <Modal
                    title={"最新测试数据"}
                    centered
                    visible={this.state.visible_latestData}
                    onCancel={this.handleCancle_latestData}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>医生：{this.state.record.doctor_name}</p>
                        <Row style={{whiteSpace:"nowrap"}}>
                            <Input placeholder={"病人姓名"} className={'input1'}/>
                            <RangePicker />
                            <Button
                                type={"primary"}
                                icon={<SearchOutlined className={"icon1"}/> }
                                onClick={this.latestData_search}
                                className={"button1"}
                            >
                                搜索
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<ReloadOutlined className={"icon1"}/> }
                                onClick={this.latestData_reset}
                                className={"button1"}
                            >
                                重置
                            </Button>
                            <Button
                                type={"primary"}
                                icon={<CloudDownloadOutlined className={"icon1"}/> }
                                onClick={this.latestData_export}
                                className={"button1"}
                            >
                                导出
                            </Button>
                        </Row>
                        <div style={{heigh:"100%"}}>
                            {this.latestDataTable()}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
class PatientTable extends Component{
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookpatientInfo(record)}}>查看详情</Button>
                </Space>
            ),
        },
    ];
    paginationProps={
        position:['bottomLeft'],
        total:'data.length',
        showTotal:total => `共 ${total} 条`,
        showQuickJumper:true,
        showSizeChanger:true,
    };
    state={
        visible_patientDetailInfo:false,
        patientDetailData:[{
            key:1,
            patient_accountNumber:1,
            patient_age:23,
            patient_address:'许昌',
            patient_testState:'未测试',
            patient_createTime:'2020-11-02 20:21',

        }],
        record: {
            key:'',
            loginName:',',
            testNumber:'',
            patientName:'',
        },
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };

    patientDetailTable = ()=>{
        return(
            <PatientDetailTable
                data={this.state.patientDetailData}
                dataChange={this.setpatientDetailData}
            />
        );
    }
    setpatientDetailData=(data)=>{
        this.setState({
            patientDetailData:data,
            });
    }
    requestPatientTableData=()=>{
        let myInput= {};
        myInput.patientId=this.state.record.patientName;

        ajax("/exam/data/patient/details",myInput,'POST')
            .then((response)=>{
                let data=response.data.data.info;
                addKey(data);
                // this.state.paginationProps.total=response.data.data.total;
                // this.state.paginationProps.current=page.page;
                // this.state.paginationProps.pageSize=page.pageSize;
                console.log("data:",response);
                this.setpatientDetailData(data);
            }).catch(e=>{
            console.log("search error!",e);
        });
    }
    lookpatientInfo=(record)=>{
        //this.requestPatientTableData();
        this.setState({
            visible_patientDetailInfo:true,
            record:record,
        });
    }
    handleCancle_patientDetailInfo=()=>{
        this.setState({
            visible_patientDetailInfo:false,
        });
    }

    render() {
        return(
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    bordered={true}
                    style={{margin:"20px 0",borderBottom:'1px,soild'}}
                    pagination={this.paginationProps}
                    onChange={this.handleTableChange}
                />
                <Modal
                    title={"病人详情"}
                    centered
                    visible={this.state.visible_patientDetailInfo}
                    onCancel={this.handleCancle_patientDetailInfo}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>{this.state.record.patient_name}</p>
                        {this.patientDetailTable()}
                    </div>
                </Modal>
            </div>

        );
    }
}
class PatientDetailTable extends Component{
    columns = [
        {
            title: '用户账号',
            dataIndex: 'patient_accountNumber',
            width:150,
        },
        {
            title: '病人年龄',
            dataIndex: 'patient_age',
            width: 150,
        },
        {
            title:'病人地址',
            dataIndex:'patient_address',
            width:150,
            align:'center',
        },
        {
            title:'病人测试状况',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
        },
        {
            title:'创建时间',
            dataIndex:'patient_createTime',
            width:150,
            align:'center',
        },
    ];
    render() {
        return(
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.data}
                    bordered={true}
                    style={{margin:"20px 0",borderBottom:'1px,soild'}}
                    pagination={false}
                />
            </div>
        );
    }
}
class LatestDataTable extends Component{
    columns=[
        {
            title: '日期',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '病人姓名',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '试剂',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '数值',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '数值2',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: 'GOD',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: 'GOD2',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: 'CGOD',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '设备码',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '批号',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '条码',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '测试图片',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookpatientInfo(record)}}>查看详情</Button>
                </Space>
            ),
        },
    ];
    render() {
        return(
            <Table
                columns={this.columns}
                dataSource={this.props.data}
                bordered={true}
                style={{margin:"20px 0",borderBottom:'1px,soild'}}
            />
        );
    }
}
export default class ProfessionTestData extends Component {
    constructor(props) {
        super(props);
        this.search();
    }
    //参数设置
    state={
        doctorsData:[],
        paginationProps:{
            position:['bottomLeft'],
            total:10,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeysDoctors:[],
        selectedRowKeys_patientInfo:[],
        record:{
            key:1,
            doctor_phone:'177777777',
            doctor_name:'白护士2',
        },
        input:{
            loginAccount:"",
            loginName:"",
        },
    };
    //表格下方分页属性

    handleTableChange = (pagination) =>{
        //console.log(this.props.data.total);
        let page={
          page:pagination.current,
          pageSize: pagination.pageSize,
        };
        this.requestDoctorTableData(page);
        //this.setState({paginationProps:pagination});
        //console.log(pagination)
    };
    //doctabledata functions
    doctorTable = ()=>{
        return(
            <DoctorTable
                data={this.state.doctorsData}
                dataChange={this.setDoctorsData}
                paginationProps={this.state.paginationProps}
                handleTableChange={this.handleTableChange}
                selectedRowKeys={this.state.selectedRowKeysDoctors}
                onSelectChange={this.setSelectedRowKeysDoctors}
            />
        );
    }
    setDoctorsData=(data)=>{
        this.setState({
            doctorsData:data,
        });
    }
    setSelectedRowKeysDoctors=(data)=>{
        this.setState({
            selectedRowKeysDoctors:data,
        });
    }
    onSelectChange=selectedRowKeys=>{
        const rowSelectionDoctorTable={
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        this.setState({rowSelectionDoctorTable});
        console.log(this.state);
    }
    inputChange = (e,name) => {
        //console.log(name);
        //console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //重置
    reset = () => {
        console.log('重置',this.state.input);
        let data = {
            loginAccount:"",
            loginName:"",
        };
        this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },
        )
        this.search();
    };
    search= ()=> {
        let page={
            page:1,
            pageSize:10,
        }
        this.requestDoctorTableData(page);
    }
    requestDoctorTableData=(page)=>{
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
                let data=response.data.data.info;
                addKey(data);
                this.state.paginationProps.total=response.data.data.total;
                this.state.paginationProps.current=page.page;
                this.state.paginationProps.pageSize=page.pageSize;
                console.log("data:",response);
                this.setDoctorsData(data);
            }).catch(e=>{
            console.log("search error!",e);
        });
    }
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
    render() {
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
                    {this.doctorTable()}
                </div>
            </div>
        )
    }
}
