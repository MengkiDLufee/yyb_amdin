import React, { Component } from 'react'
import {Table, Button, Input, Space, Modal, Form, Image, DatePicker} from 'antd';
//import { DatePicker} from 'antd';
import { Upload, message } from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
//import { InboxOutlined } from '@ant-design/icons';
import {ReloadOutlined,
    SearchOutlined ,
} from '@ant-design/icons'
import './index.less'
//import { Row, Col } from 'antd';
import ajax from "../../api/ajax";
import addKey from "../../api/addKey";
import {exportFile} from "../../api";
//const { Dragger } = Upload;
// import {baseUrl} from "../../api/ajax";
// import axios from "axios";
const { TextArea } = Input;
const baseUrl = 'http://java.xixibackup.me:8080'

// class Avatar extends React.Component {
//     state = {
//         loading: false,
//     };

//     handleChange = info => {
//         if (info.file.status === 'uploading') {
//             this.setState({ loading: true });
//             return;
//         }
//         if (info.file.status === 'done') {
//             // Get this url from response in real world.
//             this.getBase64(info.file.originFileObj, imageUrl =>
//                 this.setState({
//                     imageUrl,
//                     loading: false,
//                 }),
//             );
//         }
//     };

//     beforeUpload(file) {
//         const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//         if (!isJpgOrPng) {
//             message.error('You can only upload JPG/PNG file!');
//         }
//         const isLt2M = file.size / 1024 / 1024 < 2;
//         if (!isLt2M) {
//             message.error('Image must smaller than 2MB!');
//         }
//         return isJpgOrPng && isLt2M;
//     }
//     getBase64(img, callback) {
//         const reader = new FileReader();
//         reader.addEventListener('load', () => callback(reader.result));
//         reader.readAsDataURL(img);
//     }

//     render() {
//         const { loading, imageUrl } = this.state;
//         const uploadButton = (
//             <div>
//                 {loading ? <LoadingOutlined /> : <PlusOutlined />}
//                 <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//         );
//         return (
//             <Upload
//                 name="avatar"
//                 listType="picture-card"
//                 className="avatar-uploader"
//                 showUploadList={false}
//                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                 beforeUpload={this.beforeUpload}
//                 onChange={this.handleChange}
//             >
//                 {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//             </Upload>
//         );
//     }
// }

// class ChatRecordingTable extends Component{
//     columns = [
//         {
//             title: '用户名',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//         },
//         {
//             title: '服务时间',
//             dataIndex: 'patient_age',
//             width: 150,
//         },
//         {
//             title:'服务人员',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'截图',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//         },
//     ];
//     render() {
//         return(
//             <div>
//                 <Table
//                     columns={this.columns}
//                     dataSource={this.props.data}
//                     bordered={true}
//                     style={{margin:"20px 0",borderBottom:'1px,soild'}}
//                     pagination={false}
//                 />
//             </div>
//         );
//     }
// }

// class DoctorTable extends Component{
//     columns = [
//         {
//             title:'用户名',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//
//         },
//         {
//             title:'电话',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'客服备注',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'操作',
//             dataIndex:'operation',
//             width:300,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookChatRecording(record)}}>聊天记录</Button>
//                 </Space>
//             ),
//         },
//     ];
//     paginationProps={
//         position:['bottomLeft'],
//         total:'data.length',
//         showTotal:total => `共 ${total} 条`,
//         showQuickJumper:true,
//         showSizeChanger:true,
//     };
//     rowSelection={
//         rowSelection:this.props.selectedRowKeys,
//         onchange:this.props.onSelectChange,
//     }
//     state={
//         visible_chatRecording:false,
//         visible_addChatRecording:false,
//         record:{},
//         patientsData:[{
//             key:1,
//             test_time:'0',
//             patient_name:'白病人',
//         }],
//         latestData:[],
//         chatRecordingData:[],
//     }
//
//     lookChatRecording=(record)=>{
//     }
//     handleTableChange = (pagination) =>{
//         console.log(pagination)
//     };
//     handleCancle_chatRecording=()=>{
//         this.setState({
//             visible_chatRecording:false,
//         })
//     }
//     chatRecording_add=()=>{
//         this.setState({
//             visible_addChatRecording:true,
//         })
//     }
//     setChatRecordingData=(data)=>{
//         this.setState({
//             chatRecordingData:data,
//         });
//     }
//     chatRecordingTable = ()=>{
//         return(
//             <ChatRecordingTable
//                 data={this.state.chatRecordingData}
//                 dataChange={this.setChatRecordingData}
//             />
//         );
//     }
//     handleCancle_addChatRecording=()=>{
//         this.setState({
//             visible_addChatRecording:false,
//         });
//     }
//     handleOk_addChatRecording=()=>{
//         this.setState({
//             visible_addChatRecording:false,
//         });
//     }
//     render() {
//         //const { loading, imageUrl } = this.state;
//         // const uploadButton = (
//         //     <div>
//         //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
//         //         <div style={{ marginTop: 8 }}>Upload</div>
//         //     </div>
//         // );
//         return(
//             <div>
//                 <Table
//                     columns={this.columns}
//                     dataSource={this.props.data}
//                     bordered={true}
//                     rowSelection={this.rowSelection}
//                     style={{margin:"20px 0",borderBottom:'1px,soild'}}
//                     pagination={this.paginationProps}
//                     onChange={this.handleTableChange}
//                 />
//                 <Modal
//                     title={"用户服务记录信息"}
//                     centered
//                     visible={this.state.visible_chatRecording}
//                     onCancel={this.handleCancle_chatRecording}
//                     footer={null}
//                     width={800}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                             <Button
//                                 type={"primary"}
//                                 icon={<PlusOutlined  className="icon1" />}
//                                 onClick={this.chatRecording_add}
//                                 className={"button1"}
//                             >
//                                 新增
//                             </Button>
//                         <div style={{heigh:"100%"}}>
//                             {this.chatRecordingTable()}
//                         </div>
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"添加客服服务记录表"}
//                     centered
//                     visible={this.state.visible_addChatRecording}
//                     onCancel={this.handleCancle_addChatRecording}
//                     onOk={this.handleOk_addChatRecording}
//                     okText={'提交'}
//                     cancelText={'取消'}
//                     width={800}
//                 >
//                     <div className="ant-modal-body" >
//                         <div className="modal-body" style={{height:"100%"}}>
//                             <Form
//                                 labelCol={{ span: 5 }}
//                                 wrapperCol={{ span: 16 }}
//                                 layout="horizontal"
//                                 name="add"
//                             >
//                                 <Form.Item
//                                     label="服务内容"
//                                     name="服务内容"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: '请输入服务内容!',
//                                         },
//                                     ]}
//                                 >
//                                     <TextArea rows={4} placeholder={"请输入手机号"}/>
//                                 </Form.Item>
//                                 <Form.Item label="服务时间"
//                                            name={"服务时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入服务时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input placeholder={"请输入服务时间"}/>
//                                 </Form.Item>
//                                 <Form.Item label="服务人员"
//                                            name={"服务人员"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入服务人员!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input placeholder={"请输入服务人员"}/>
//                                 </Form.Item>
//
//                                 <Form.Item label="年龄"
//                                            name={"年龄"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入年龄!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入年龄"} />
//                                 </Form.Item>
//                                 <Form.Item
//                                     label="上传文件路径"
//                                     name={"uploadPicture"}
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: '请上传图片!',
//                                         },
//                                     ]}>
//                                     <Avatar></Avatar>
//                                 </Form.Item>
//                                 <Form.Item
//                                     label={"预览"}
//                                     name={"showPicture"}>
//
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }

// class ServiceManagement1 extends Component {
//     //参数设置
//     state={
//         doctorsData:[{
//             key:1,
//             doctor_phone:'177777777',
//             doctor_name:'白护士',
//         }],
//         selectedRowKeysDoctors:[],
//         visible_add:false,
//         record:{
//             key:1,
//             doctor_phone:'177777777',
//             doctor_name:'白护士2',
//         },
//     };
//
//     add=()=>{
//         this.setState({
//             visible_add:true,
//         });
//     }
//     //doctabledata functions
//     doctorTable = ()=>{
//         return(
//             <DoctorTable
//                 data={this.state.doctorsData}
//                 dataChange={this.setDoctorsData}
//                 selectedRowKeys={this.state.selectedRowKeysDoctors}
//                 onSelectChange={this.setSelectedRowKeysDoctors}
//             />
//         );
//     }
//     setDoctorsData=(data)=>{
//         this.setState({
//             doctorsData:data,
//         });
//     }
//     setSelectedRowKeysDoctors=(data)=>{
//         this.setState({
//             selectedRowKeysDoctors:data,
//         });
//     }
//
//
//
//     onSelectChange=selectedRowKeys=>{
//         const rowSelectionDoctorTable={
//             selectedRowKeys,
//             onChange:this.onSelectChange,
//         }
//         this.setState({rowSelectionDoctorTable});
//         console.log(this.state);
//     }
//     onSelectChange_patientInfo=selectedRowKeys_patientInfo=>{
//         this.setState({selectedRowKeys_patientInfo});
//         console.log(this.state);
//     }
//     handleCancle_patientDetailInfo=()=>{
//         this.setState({
//             visible_patientDetailInfo:false,
//         });
//     }
//     handTablechange_patientInfo = (pagination) =>{
//         console.log(pagination)
//     };
//
//     start=()=>{
//         //??
//         setTimeout(()=>{
//             this.setState({
//                 selectedRowKeys:[],
//                 selectedRowKeys_patientInfo:[],
//             })
//         },1000)
//     };
//
//     render() {
//         return (
//             <div style={{height:"100%"}}>
//                 <div style={{'margin':'0 0 15px 0'}}>
//                     <div justify="space-between" gutter="15" style={{display:"flex"}}>
//                         <Input placeholder={'医生电话'} className={'input1'}/>
//                         <Input placeholder={'医生姓名'} className={'input1'}/>
//                         <Button
//                             type={"primary"}
//                             icon={<SearchOutlined className={"icon1"}/> }
//                             onClick={this.search}
//                             className={"button1"}
//                         >
//                             搜索
//                         </Button>
//                         <Button
//                             type={"primary"}
//                             icon={<ReloadOutlined className={"icon1"}/> }
//                             onClick={this.reset}
//                             className={"button1"}
//                         >
//                             重置
//                         </Button>
//                     </div>
//                 </div>
//                 {/*表格*/}
//                 <div style={{heigh:"100%"}}>
//                     {this.doctorTable()}
//                 </div>
//                 {/*/!*添加医生弹窗*!/*/}
//                 <Modal
//                     title={"添加医生账号"}
//                     centered
//                     visible={this.state.visible_add}
//                     onCancel={this.handleCancle_add}
//                     onOk={this.handleAddOk}
//                     okText={'提交'}
//                     cancelText={'取消'}
//                     width={1000}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                         <Row>
//                             基本信息
//                         </Row>
//                         <Row>{' '}</Row>
//                         <Row>
//                             <Col span={2}><span style={{fontSize:16}}>医生姓名</span></Col>
//                             <Col span={22}><Input  placeholder={"请输入医生姓名"} /></Col>
//                         </Row>
//                         <Row> </Row>
//                         <Row>
//                             <Col span={2}><span style={{fontSize:16}}>医生用户</span></Col>
//                             <Col span={22}><Input  placeholder={"请输入医生用户"} /></Col>
//                         </Row>
//                         <Row> </Row>
//                         <Row>
//                             <Col span={2}><span style={{fontSize:16}}>密码</span></Col>
//                             <Col span={22}><Input  placeholder={"请输入密码"} /></Col>
//                         </Row>
//                         <Row> </Row>
//                         <Row>
//                             <Col span={2}><span style={{fontSize:16}}>备注</span></Col>
//                             <Col span={22}><TextArea rows={4}  placeholder={"请输入备注"} /></Col>
//                         </Row>
//                     </div>
//                 </Modal>
//             </div>
//         )
//     }
// }



//添加
class Modal1 extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};
        console.log(this.props.record)
        Object.assign(input,this.props.record);
        console.log("init record:",input);
        this.state= {
            testTime: '',
            input: input,
            csServiceRecordId:null,
        }
        //时间格式转换
        // let testTime=this.props.record.testTime;
        // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        // this.state.testTime=mymoment;
    }
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        if(this.state.csServiceRecordId===null){

        }else{
            let url = '/customer/management/chat/upload/pic/delete/'+this.state.csServiceRecordId
            ajax(url, {},'GET')
              .then((response)=>{
                  if(response.data.code!==1006){
                      console.log("请求错误！",response);
                  }else{
                      console.log("修改成功：",response);
                  }
              });
        }
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
                data.clientId = this.props.record.clientId;
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/customer/management/chat/save/record";
                //console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1002){
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
        let input = {}
        Object.assign(input, this.state.input);
        input.serviceTime=dateString;
        this.setState({
        input:input,
        })
        console.log(this.state.input)
    }
    rangePickerOnOk=(value)=> {
        console.log('onOk: ', value);
    }
    //得到文本框输入
    inputChange = (e,name) => {
        //console.log(name);
        //let themename = e.target.name;
        //console.log(themename)
        //console.log(e.target.name);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        });
        //console.log(this.state);
    }
    //上传图片后的回调
    uploadPicture=(e)=>{
        console.log("上传回调",e)
        if(e.file.response!==undefined){
            console.log(e.file.response)
            if(e.file.response.data!==undefined){
                let input = {}
                Object.assign(input,this.state.input)
                input.csServiceRecordId = e.file.response.data;
                this.setState({
                    input:input,
                    csServiceRecordId:e.file.response.data
                })
            }
            else{
                    message.error("上传失败！")
            }
        }
        // if(e.file.status==='done'){
        //     let _this=this;
        //     ajax(baseUrl+'/customer/management/chat/upload/pic',{},'POST')
        //       .then(function (response) {
        //           //console.log(response)
        //         // _this.setState({
        //         //     pictureSource:response.data.data,
        //         // })
        //         // e.fileList=[];
        //     })
        //       .catch(function (error) {
        //           console.log('hei!');
        //           console.log(error);
        //       });
        // }
    }

    //参数设置
    state={
        //表格1数据
        testTime:'',
        input:{}
    };

    /*表单验证
      Form.useForm是是 React Hooks 的实现，只能用于函数组件
      class组件中通过 React.createRef()来获取数据域*/
    form = React.createRef();
    render(){
        return(
            <div>
                {/* 弹窗 */}
                <Modal
                    title="添加聊天记录"
                    centered
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    okText="确定"
                    onCancel={this.handleCancel}
                    cancelText="关闭"
                    //className="modal1"
                    width={1000}
                >
                      <div className="modal-body"
                         style={{height:"550px"}}
                    >
                        <Form
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 16 }}
                            layout="horizontal"
                            ref={this.form}//表单验证，通过ref获取
                            initialValues={this.state.input}
                        >
                            <Form.Item
                                label="服务记录"
                                name="服务记录"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入服务记录!',
                                    },
                                ]}
                            >
                                <TextArea rows={4} placeholder={"请输入服务记录"} onChange={(e)=>{this.inputChange(e,"serviceRecord")}}
                                          value={this.state.input.serviceRecord}/>
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
                                <DatePicker onChange={this.rangePickerOnChange}
                                            showTime
                                            placeholder="请选择服务时间 "
                                            disabled={false}/>
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
                                <Input placeholder={"请输入服务人员"} value={this.state.input.serviceStaff} onChange={(e)=>{this.inputChange(e,"serviceStaff")}}/>
                            </Form.Item>

                            {/*<Form.Item label="年龄"*/}
                            {/*           name={"年龄"}*/}
                            {/*           rules={[*/}
                            {/*               {*/}
                            {/*                   required: true,*/}
                            {/*                   message: '请输入年龄!',*/}
                            {/*               },*/}
                            {/*           ]}*/}
                            {/*>*/}
                            {/*    <Input  placeholder={"请输入年龄"} />*/}
                            {/*</Form.Item>*/}
                            <Form.Item
                                label="上传文件路径"
                                name={"uploadPicture"}
                                rules={[
                                    {
                                        required: true,
                                        message: '请上传图片!',
                                    },
                                ]}>
                                <Upload
                                  name="file"//发到后台的文件参数名
                                  action={baseUrl+'/customer/management/chat/upload/pic'} //上传的地址
                                  //listType="picture"
                                  maxCount={1}
                                  //data={{'judgeTipsId':this.state.judgeTipsId}}//上传所需额外参数或返回上传额外参数的方法
                                  fileList={this.state.fileList}
                                  onChange={this.uploadPicture}
                                >
                                    <Button icon={<UploadOutlined />}>选择提示语图片</Button>
                                </Upload>
                            </Form.Item>
                            {/*<Form.Item*/}
                            {/*    label={"预览"}*/}
                            {/*    name={"showPicture"}>*/}

                            {/*</Form.Item>*/}
                            {/*<Form.Item*/}
                            {/*    label="手机号"*/}
                            {/*    name="patientNumber"*/}
                            {/*    rules={[*/}
                            {/*        {*/}
                            {/*            required: true,*/}
                            {/*            message: '请输入手机号!',*/}
                            {/*        },*/}
                            {/*    ]}*/}
                            {/*>*/}
                            {/*    <Input onChange={(e)=>{this.inputChange(e,"patientNumber")}}*/}
                            {/*           value={this.state.input.patientNumber}*/}
                            {/*    />*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item*/}
                            {/*    label="医生"*/}
                            {/*    name="loginAccount"*/}
                            {/*    rules={[{ required: true ,message:"请输入医生用户"}]}//设置验证规则*/}
                            {/*>*/}
                            {/*    <Input    onChange={(e)=>{this.inputChange(e,"loginAccount")}} value={this.state.input.loginAccount}/>*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item label="性别"*/}
                            {/*           name="patientSex"*/}
                            {/*           rules={[*/}
                            {/*               {required:true,message:'请输入性别！',},*/}
                            {/*           ]}>*/}
                            {/*    <Input onChange={(e)=>{this.inputChange(e,"patientSex")}} value={this.state.input.patientSex}/>*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item label="年龄"*/}
                            {/*           name="patientAge"*/}
                            {/*           rules={[*/}
                            {/*               {required:true,message:'请输入年龄！',},*/}
                            {/*           ]}>*/}
                            {/*    <Input onChange={(e)=>{this.inputChange(e,"patientAge")}} value={this.state.input.patientAge}/>*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item label="地址"*/}
                            {/*           name="patientAddress"*/}
                            {/*           rules={[*/}
                            {/*               {required:true,message:'请输入地址！',},*/}
                            {/*           ]}>*/}
                            {/*    <Input onChange={(e)=>{this.inputChange(e,"patientAddress")}} value={this.state.input.patientAddress}/>*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item label="测试状态"*/}
                            {/*           name="patientTestStatus"*/}
                            {/*           rules={[*/}
                            {/*               {required:true,message:'测试状态！',},*/}
                            {/*           ]}>*/}
                            {/*    <Input onChange={(e)=>{this.inputChange(e,"patientTestStatus")}} value={this.state.input.patientTestStatus}/>*/}
                            {/*</Form.Item>*/}
                            {/*<Form.Item label="备注"*/}
                            {/*           name="remarks">*/}
                            {/*    <TextArea rows={4} onChange={(e)=>{this.inputChange(e,"remarks")}} value={this.state.input.remarks}/>*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
//聊天记录
class Modal3 extends Component{
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title: '服务内容',
            dataIndex: 'serviceRecord',
            width:150,
        },
        {
            title: '服务人员',
            dataIndex: 'serviceStaff',
            width:150,
        },
        {
            title: '服务时间',
            dataIndex: 'serviceTime',
            width: 150,
        },
        {
            title:'问题图片',
            dataIndex: 'recordPicPathAli',
            render:(text)=>{
                if(text!==undefined)
                return(
                <Image src={baseUrl+'/customer/management/chat/pic/'+text} alt={''}/>
              )
            }
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
        //this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },this.search
        )
        //this.search();
    };
    //请求表格数据
    requestData=(page)=>{
        let data={};
        data.clientId=this.props.record.clientId;
        //data.phone=this.props.record.phone;
        let url='/customer/management/chat/list/'+data.clientId+'/'+page.page+'/'+page.pageSize;
        //console.log("request:",data);
        ajax(url,data,'GET')
            .then((response)=>{
                console.log("response:",response);
                if(response.data.data==null)
                    console.log("查询失败");
                else{
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
            if(this.state.input[myInput[ii]]!==""){
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
    //添加弹窗
    add=()=>{
        this.lookModal(this.props.record);
    }

    //表格2数据以及函数

    //参数设置
    state={
        //弹窗
        modalVisible:false,
        //表格1数据
        input:{
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
                {
                key:1,
                patientName:"test",
                testNumber: "test",
            }
        ],
        record:{
            loginName:"",
        },

        //表格2数据


    };

    //弹窗函数
    //弹窗1
    //添加
    Modal = ()=>{
        if(this.state.modalVisible)
            return(
                <Modal1
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
            record:record,
        });
    }
    //弹窗2


    render(){
        return(
            <div>
                <Modal
                    title={"聊天记录"}
                    centered
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined  className="icon1" />}
                            onClick={this.add}
                            className="button1"
                        >
                            添加
                        </Button>
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
                {this.Modal()}
            </div>
        )
    }
}

export default class ServiceManagement extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
        //console.log(baseUrl)
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title:'用户名',
            dataIndex:'nickName',
            width:150,
            align:'center',

        },
        {
            title:'电话',
            dataIndex:'phone',
            width:150,
            align:'center',
        },
        {
            title:'客服备注',
            dataIndex:'csRemark',
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
        //this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },this.search
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
            if(this.state.input[myInput[ii]]!==""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        //console.log("request:",data);
        ajax("/customer/management/list",data,'POST')
            .then((response)=>{
                //console.log(response)
                if(response.data.data!==null&&response.data.data!==undefined){
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
                }else{
                    console.log("/customer/managment/list error！")
                    console.log(response);
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
            if(this.state.input[myInput[ii]]!==""){
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

    //聊天记录
    lookChatRecording=(record)=>{
        this.lookModal3(record);
    }
    //表格2数据以及函数



    //参数设置
    state={
        //弹窗
        modalVisible:false,
        modalVisible2:false,
        modalVisible3:false,
        record:{
            loginName:"",
        },
        record2:{
            loginName:"",
        },
        record3:{
            loginName:"",
        },
        //表格1数据
        input:{
            nickName:"",
            phone:"",
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
            {
                key:1,
                loginAccount:"test",
                loginNmae:"test",
            }
        ],

        //表格2数据


    };

    //弹窗函数

    //弹窗1

    // //弹窗3
    //聊天记录
    Modal3 = ()=>{
        if(this.state.modalVisible3)
            return(
                <Modal3
                    record={this.state.record3}
                    visible={this.state.modalVisible3}
                    setVisible={this.setModalvisible3}
                />
            );
    }
    setModalvisible3=(flag)=>{
        this.setState({
            modalVisible3:flag,
        });
    }
    lookModal3=record=>{
        this.setState({
            modalVisible3:true,
            record3:record,
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
                        <Input placeholder={'用户名'} className={'input1'} onChange={(e)=>{this.inputChange(e,"nickName")}} value={this.state.input.nickName}/>
                        <Input placeholder={'手机号'} className={'input1'} onChange={(e)=>{this.inputChange(e,"phone")}} value={this.state.input.phone}/>
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
                {this.Modal3()}
            </div>
        )
    }
}
