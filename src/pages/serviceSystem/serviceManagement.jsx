import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form} from 'antd';
import { DatePicker} from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import {ReloadOutlined,
    SearchOutlined ,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    CheckCircleOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons'
import './index.less'
import { Row, Col } from 'antd';
const { TextArea } = Input;
const { Dragger } = Upload;

class Avatar extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}


class ChatRecordingTable extends Component{
    columns = [
        {
            title: '用户名',
            dataIndex: 'patient_accountNumber',
            width:150,
        },
        {
            title: '服务时间',
            dataIndex: 'patient_age',
            width: 150,
        },
        {
            title:'服务人员',
            dataIndex:'patient_address',
            width:150,
            align:'center',
        },
        {
            title:'截图',
            dataIndex:'patient_testState',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookChatRecording(record)}}>聊天记录</Button>
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
        visible_chatRecording:false,
        visible_addChatRecording:false,
        record:{},
        patientsData:[{
            key:1,
            test_time:'0',
            patient_name:'白病人',
        }],
        latestData:[],
        chatRecordingData:[],
    }

    lookChatRecording=(record)=>{
        this.setState({
            visible_chatRecording:true,
            record:record,
        });
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };
    handleCancle_chatRecording=()=>{
        this.setState({
            visible_chatRecording:false,
        })
    }
    chatRecording_add=()=>{
        this.setState({
            visible_addChatRecording:true,
        })
    }
    setChatRecordingData=(data)=>{
        this.setState({
            chatRecordingData:data,
        });
    }
    chatRecordingTable = ()=>{
        return(
            <ChatRecordingTable
                data={this.state.chatRecordingData}
                dataChange={this.setChatRecordingData}
            />
        );
    }
    handleCancle_addChatRecording=()=>{
        this.setState({
            visible_addChatRecording:false,
        });
    }
    handleOk_addChatRecording=()=>{
        this.setState({
            visible_addChatRecording:false,
        });
    }
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
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
                    title={"用户服务记录信息"}
                    centered
                    visible={this.state.visible_chatRecording}
                    onCancel={this.handleCancle_chatRecording}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                            <Button
                                type={"primary"}
                                icon={<PlusOutlined  className="icon1" />}
                                onClick={this.chatRecording_add}
                                className={"button1"}
                            >
                                新增
                            </Button>
                        <div style={{heigh:"100%"}}>
                            {this.chatRecordingTable()}
                        </div>
                    </div>
                </Modal>
                <Modal
                    title={"添加客服服务记录表"}
                    centered
                    visible={this.state.visible_addChatRecording}
                    onCancel={this.handleCancle_addChatRecording}
                    onOk={this.handleOk_addChatRecording}
                    okText={'提交'}
                    cancelText={'取消'}
                    width={800}
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
                                    label="服务内容"
                                    name="服务内容"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入服务内容!',
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} placeholder={"请输入手机号"}/>
                                </Form.Item>
                                <Form.Item label="服务时间"
                                           name={"服务时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入服务时间!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入服务时间"}/>
                                </Form.Item>
                                <Form.Item label="服务人员"
                                           name={"服务人员"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入服务人员!',
                                               },
                                           ]}
                                >
                                    <Input placeholder={"请输入服务人员"}/>
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
                                <Form.Item
                                    label="上传文件路径"
                                    name={"uploadPicture"}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请上传图片!',
                                        },
                                    ]}>
                                    <Avatar></Avatar>
                                </Form.Item>
                                <Form.Item
                                    label={"预览"}
                                    name={"showPicture"}>

                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
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

