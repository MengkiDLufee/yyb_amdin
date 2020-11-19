import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form} from 'antd';
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

class PatientDetailInfoTable extends Component{
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
        {
            title:'备注',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.patientDetail(record)}}>查看详情</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.patient_modify(record)}}>修改</Button>
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
        visible_modify:false,
        visible_patientDetail:false,
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
    patientDetail=(record)=>{
        this.setState({
            visible_patientDetail:true,
            record,
        });
    }
    patient_modify=record=>{
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
    patientDetailInfoTable = ()=>{
        return(
            <PatientDetailInfoTable
                data={this.state.patientDetailInfoData}
                dataChange={this.setpatientDetailInfoData}
            />
        );
    }
    handleCancle_patientDetail=()=>{
        this.setState({
            visible_patientDetail:false,
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
                    title={"修改病人"}
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
                                    label="手机号"
                                    name="手机号"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"请输入手机号"}/>
                                </Form.Item>
                                <Form.Item label="医生"
                                           name={"医生"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择医生!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择医生 ">
                                        <Option value="on">男</Option>
                                        <Option value="close">女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="姓名"
                                           name={"姓名"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入姓名!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入姓名"}/>
                                </Form.Item>
                                <Form.Item label="性别"
                                           name={"性别"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择性别!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择性别 " >
                                        <Option value="on">男</Option>
                                        <Option value="close">女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="年龄"
                                           name={"年龄"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入年龄!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入年龄"} />
                                </Form.Item>
                                <Form.Item label="地址"
                                           name={"地址"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入地址!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入地址"} />
                                </Form.Item>
                                <Form.Item label="测试状态"
                                           name={"测试状态"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择测试状态!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择测试状态">
                                        <Option value="on">未测试</Option>
                                        <Option value="close">完成测试</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="备注">
                                    <TextArea rows={4}  placeholder={"请输入备注"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title={"病人详情"}
                    centered
                    visible={this.state.visible_patientDetail}
                    onCancel={this.handleCancle_patientDetail}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>{this.state.record.patient_name}</p>
                        <div style={{heigh:"100%"}}>
                            {this.patientDetailInfoTable()}
                        </div>
                    </div>
                </Modal>
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
    handlModalPatientDoctorChange=(value)=>{
        console.log(value);
    }
    handlModalPatientSexChange=(value)=>{
        console.log(value);
    }
    handlModalPatientTestStateChange=(value)=>{
        console.log(value);
    }
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

                <Modal
                    title={"添加病人"}
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
                                    label="手机号"
                                    name="手机号"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"请输入手机号"}/>
                                </Form.Item>
                                <Form.Item label="医生"
                                           name={"医生"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择医生!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择医生 "  onChange={this.handlModalPatientDoctorChange}>
                                        <Option value="on">男</Option>
                                        <Option value="close">女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="姓名"
                                           name={"姓名"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入姓名!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入姓名"}/>
                                </Form.Item>
                                <Form.Item label="性别"
                                           name={"性别"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择性别!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择性别 "  onChange={this.handlModalPatientSexChange} >
                                        <Option value="on">男</Option>
                                        <Option value="close">女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="年龄"
                                           name={"年龄"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入年龄!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入年龄"} />
                                </Form.Item>
                                <Form.Item label="地址"
                                           name={"地址"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入地址!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入地址"} />
                                </Form.Item>
                                <Form.Item label="测试状态"
                                           name={"测试状态"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请选择测试状态!',
                                               },
                                           ]}
                                >
                                    <Select placeholder="请选择测试状态"  onChange={this.handlModalPatientTestStateChange} >
                                        <Option value="on">未测试</Option>
                                        <Option value="close">完成测试</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="备注">
                                    <TextArea rows={4}  placeholder={"请输入备注"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


