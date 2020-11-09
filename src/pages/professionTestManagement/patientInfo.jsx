import React, { Component } from 'react'
import { Table ,Button , Input , Select, Space ,Modal} from 'antd';
import { DatePicker} from 'antd';

import {ReloadOutlined,
    SearchOutlined ,
    PlusOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    CheckCircleOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons'
import './index.less'
import { Row, Col } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

class PatientTable extends Component{
    columns = [
        {
            title:'手机号',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
        },
        {
            title:'病人姓名',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
        },
        {
            title:'性别',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
        },
        {
            title:'医生',
            dataIndex:'doctor_name',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>查看详情</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>修改</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{}}>删除</Button>
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
    rowSelection={
        rowSelection:this.props.selectedRowKeys,
        onchange:this.props.onSelectChange,
    }
    state={
        visible_patientInfo:false,
        visible_latestData:false,
        record:{
            key:'',
            doctor_phone:'',
            doctor_name:'',
        },
        patientsData:[{
            key:1,
            test_time:'0',
            patient_name:'白病人',
        }],
        latestData:[],
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };

    lookPatientInfo=(record)=>{
        this.setState({
            visible_PatientInfo:true,
            record,
        });
    }
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

    // patientTable = ()=>{
    //     return(
    //         <PatientTable
    //             data={this.state.patientsData}
    //             dataChange={this.setPatientsData}
    //         />
    //     );
    // }
    // latestDataTable = ()=>{
    //     return(
    //         <LatestDataTable
    //             data={this.state.latestDataData}
    //             dataChange={this.setLatestData}
    //         />
    //     );
    // }
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
                    pagination={this.paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
export default class PatientInfo extends Component {
    //参数设置
    state={
        doctorsData:[{
            key:1,
            doctor_phone:'177777777',
            doctor_name:'白护士',
        }],
        selectedRowKeysDoctors:[],
        visible_add:false,
        record:{
            key:1,
            doctor_phone:'177777777',
            doctor_name:'白护士2',
        },
    };

    add=()=>{
        this.setState({
            visible_add:true,
        });
    }
    //doctabledata functions
    patientTable = ()=>{
        return(
            <PatientTable
                data={this.state.doctorsData}
                dataChange={this.setDoctorsData}
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
        const rowSelectionPatientTable={
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        this.setState({rowSelectionPatientTable});
        console.log(this.state);
    }
    handleSexselectChange=()=>{

    }


    start=()=>{
        //??
        setTimeout(()=>{
            this.setState({
                selectedRowKeys:[],
                selectedRowKeys_patientInfo:[],
            })
        },1000)
    };

    render() {
        return (
            <div style={{height:"100%"}}>
                <div style={{'margin':'0 0 15px 0'}}>
                    <div justify="space-between" gutter="15" style={{display:"flex"}}>
                        <Input placeholder={'手机号'} className={'input1'}/>
                        <Input placeholder={'病人姓名'} className={'input1'}/>
                        <Select placeholder="请选择性别 "  onChange={this.handleSexselectChange} className="input1" >
                            <Option value="on">男</Option>
                            <Option value="close">女</Option>
                        </Select>
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
                            type="primary"
                            icon={<PlusOutlined  className="icon1" />}
                            onClick={this.add}
                            className="button1"
                        >
                            添加
                        </Button>
                    </div>
                </div>
                {/*表格*/}
                <div style={{heigh:"100%"}}>
                    {this.patientTable()}
                </div>
            </div>
        )
    }
}


