import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form, Checkbox} from 'antd';
import { DatePicker} from 'antd';

import {ReloadOutlined,
    SearchOutlined ,
    PlusOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    CheckCircleOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons'
import { Row, Col } from 'antd';
import './index.less'

const { TextArea } = Input;
const { Option } = Select;

class HistoryDeviceTable extends Component{
    columns=[
        {
            title: '设备号',
            dataIndex: 'patient_name',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '正在使用',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '绑定时间',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
        },
        {
            title: '终止时间',
            dataIndex: 'test_time',
            width: 150,
            sorter: {
                compare: (a, b) => a.test_time - b.test_time,
                multiple: 2,
            },
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
            test_time:'',
            patient_name:'',
        },
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };

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
            </div>

        );
    }
}

class DoctorTable extends Component{
    columns = [
        {
            title:'医生用户',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
        },
        {
            title:'医生姓名',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
        },
        {
            title:'备注',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
        },
        {
            title:'创建时间',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
        },
        {
            title:'修改时间',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
        },
        {
            title:'当前使用设备',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
        },
        {
            title:'历史使用设备',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>重置密码</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.doctor_modify(record)}}>修改</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{}}>删除</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.history_device(record)}}>历史设备</Button>
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
        visible_modify:false,
        visible_historyDevice:false,
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
        historyDeviceData:[{
            key:1,
            test_time:'0',
            patient_name:'白病人',
        }],
        latestData:[],
        patientDetailInfoData:[],
    }
    setpatientDetailInfoData=(data)=>{
        this.setState({
            patientDetailInfoData:data,
        });
    }
    historyDeviceTable = ()=>{
        return(
            <HistoryDeviceTable
                data={this.state.historyDeviceData}
                dataChange={this.setHistoryDeviceData}
            />
        );
    }
    setHistoryDeviceData=(data)=>{
        this.setState({
            historyDeviceData:data,
        });
    }
    history_device=record=>{
        this.setState({
            visible_historyDevice:true,
            record,
        });
    }
    handleCancle_historyDevice=()=>{
        this.setState({
            visible_historyDevice:false,
        });
    }
    doctor_modify=record=>{
        console.log(record);
        this.setState({visible_modify:true});
    }
    handleCancle_modify=()=>{
        this.setState({
            visible_modify:false,
        });
    }
    handleOk_modify=()=>{
        this.setState({
            visible_modify:false,
        });
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
                <Modal
                    title={"修改医生账号"}
                    centered
                    visible={this.state.visible_modify}
                    onCancel={this.handleCancle_modify}
                    onOk={this.handleOk_modify}
                    okText={'提交'}
                    cancelText={'取消'}
                    className="modal1"
                >
                    <div className="ant-modal-body" >
                        <div className="modal-body" style={{height:"100%"}}>
                            <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                layout="horizontal"
                                name="add"
                            >
                                <Form.Item
                                    label="医生姓名"
                                    name="医生姓名"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入医生姓名!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"请输入医生姓名"}/>
                                </Form.Item>
                                <Form.Item label="医生用户"
                                           name={"医生用户"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入医生用户!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入医生用户"}/>
                                </Form.Item>
                                <Form.Item label="备注">
                                    <TextArea rows={4}  placeholder={"请输入备注"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title={"历史设备"}
                    centered
                    visible={this.state.visible_historyDevice}
                    onCancel={this.handleCancle_historyDevice}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>用户名：{this.state.record.doctor_name}</p>
                        <p>{5} 设备历史</p>
                        <div style={{heigh:"100%"}}>
                            {this.historyDeviceTable()}
                        </div>
                    </div>
                </Modal>

            </div>
        );
    }
}

export default class AccountInfo extends Component {
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
    handleCancle_add=()=>{
        this.setState({visible_add:false});
    }
    handleAddOk=()=>{
        this.setState({visible_add:false});
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
                        <Button
                            type="primary"
                            icon={<PlusOutlined  className="icon1" />}
                            onClick={this.add}
                            className="button1"
                        >
                            添加
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
                {/*/!*添加医生弹窗*!/*/}
                <Modal
                    title={"添加医生账号"}
                    centered
                    visible={this.state.visible_add}
                    onCancel={this.handleCancle_add}
                    onOk={this.handleAddOk}
                    okText={'提交'}
                    cancelText={'取消'}
                    className="modal1"
                >
                    <div className="ant-modal-body" >
                        <div className="modal-body" style={{height:"100%"}}>
                            <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                layout="horizontal"
                                name="add"
                            >
                                <Form.Item
                                    label="医生姓名"
                                    name="医生姓名"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入医生姓名!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"请输入医生姓名"}/>
                                </Form.Item>
                                <Form.Item label="医生用户"
                                           name={"医生用户"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入医生用户!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入医生用户"}/>
                                </Form.Item>
                                <Form.Item label="密码"
                                           name={"密码"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入密码!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入密码"} />
                                </Form.Item>
                                <Form.Item label="备注">
                                    <TextArea rows={4}  placeholder={"请输入备注"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <Modal

                >
                    <div style={{height:'100%',margin:'3px'}}>
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

