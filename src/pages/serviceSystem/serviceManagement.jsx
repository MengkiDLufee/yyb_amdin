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
class DoctorTable extends Component{
    columns = [
        {
            title:'用户名',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },

        },
        {
            title:'电话',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'客服备注',
            dataIndex:'doctor_phone',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>聊天记录</Button>
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
export default class ServiceManagement extends Component {
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
    doctorTable = ()=>{
        return(
            <DoctorTable
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
        const rowSelectionDoctorTable={
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        this.setState({rowSelectionDoctorTable});
        console.log(this.state);
    }
    onSelectChange_patientInfo=selectedRowKeys_patientInfo=>{
        this.setState({selectedRowKeys_patientInfo});
        console.log(this.state);
    }
    handleCancle_patientDetailInfo=()=>{
        this.setState({
            visible_patientDetailInfo:false,
        });
    }
    handTablechange_patientInfo = (pagination) =>{
        console.log(pagination)
    };

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
                        <Input placeholder={'医生电话'} className={'input1'}/>
                        <Input placeholder={'医生姓名'} className={'input1'}/>
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
                    </div>
                </div>
                {/*表格*/}
                <div style={{heigh:"100%"}}>
                    {this.doctorTable()}
                </div>
                {/*/!*添加医生弹窗*!/*/}
                <Modal
                    title={"添加医生账号"}
                    centered
                    visible={this.state.visible_add}
                    onCancel={this.handleCancle_add}
                    onOk={this.handleAddOk}
                    okText={'提交'}
                    cancelText={'取消'}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <Row>
                            基本信息
                        </Row>
                        <Row>{' '}</Row>
                        <Row>
                            <Col span={2}><span style={{fontSize:16}}>医生姓名</span></Col>
                            <Col span={22}><Input  placeholder={"请输入医生姓名"} /></Col>
                        </Row>
                        <Row> </Row>
                        <Row>
                            <Col span={2}><span style={{fontSize:16}}>医生用户</span></Col>
                            <Col span={22}><Input  placeholder={"请输入医生用户"} /></Col>
                        </Row>
                        <Row> </Row>
                        <Row>
                            <Col span={2}><span style={{fontSize:16}}>密码</span></Col>
                            <Col span={22}><Input  placeholder={"请输入密码"} /></Col>
                        </Row>
                        <Row> </Row>
                        <Row>
                            <Col span={2}><span style={{fontSize:16}}>备注</span></Col>
                            <Col span={22}><TextArea rows={4}  placeholder={"请输入备注"} /></Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}

