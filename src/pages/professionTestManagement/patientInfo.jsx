import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form, message} from 'antd';

import {ReloadOutlined,
    SearchOutlined ,
    PlusOutlined,
//    CloudUploadOutlined,
//    CloudDownloadOutlined,
//    CheckCircleOutlined,
//    CloseCircleTwoTone
} from '@ant-design/icons'
import './index.less'
//import { Row, Col } from 'antd';
import ajax from "../../api/ajax";
import addKey from "../../api/addKey";
import {exportFile} from "../../api";
const { TextArea } = Input;
const { Option } = Select;

// class PatientDetailInfoTable extends Component{
//     columns = [
//         {
//             title: '用户账号',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//         },
//         {
//             title: '病人年龄',
//             dataIndex: 'patient_age',
//             width: 150,
//         },
//         {
//             title:'病人地址',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'病人测试状况',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'创建时间',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'备注',
//             dataIndex:'patient_createTime',
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

// class PatientTable extends Component{
//     columns = [
//         {
//             title:'手机号',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'病人姓名',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'性别',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//         },
//         {
//             title:'医生',
//             dataIndex:'doctor_name',
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
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.patientDetail(record)}}>查看详情</Button>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.patient_modify(record)}}>修改</Button>
//                     <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{}}>删除</Button>
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
//         visible_patientInfo:false,
//         visible_latestData:false,
//         visible_modify:false,
//         visible_patientDetail:false,
//         record:{
//             key:'',
//             doctor_phone:'',
//             doctor_name:'',
//         },
//         patientsData:[{
//             key:1,
//             test_time:'0',
//             patient_name:'白病人',
//         }],
//         latestData:[],
//     }
//     patientDetail=(record)=>{
//         this.setState({
//             visible_patientDetail:true,
//             record,
//         });
//     }
//     patient_modify=record=>{
//         //console.log(record);
//         this.setState({visible_modify:true});
//     }
//     handleCancle_modify=()=>{
//         this.setState({
//             visible_modify:false,
//         });
//     }
//     handleOk_modify=()=>{
//         this.setState({
//             visible_modify:false,
//         });
//     }
//     handleTableChange = (pagination) =>{
//         //console.log(pagination)
//     };
//
//     lookPatientInfo=(record)=>{
//         this.setState({
//             visible_PatientInfo:true,
//             record,
//         });
//     }
//     looklatestData=(record)=>{
//         this.setState({
//             visible_latestData:true,
//             record,
//         });
//     }
//
//     handleCancle_patientInfo=()=>{
//         this.setState({
//             visible_PatientInfo:false,
//         })
//     }
//     handleCancle_latestData=()=>{
//         this.setState({
//             visible_latestData:false,
//         })
//     }
//
//     // patientTable = ()=>{
//     //     return(
//     //         <PatientTable
//     //             data={this.state.patientsData}
//     //             dataChange={this.setPatientsData}
//     //         />
//     //     );
//     // }
//     // latestDataTable = ()=>{
//     //     return(
//     //         <LatestDataTable
//     //             data={this.state.latestDataData}
//     //             dataChange={this.setLatestData}
//     //         />
//     //     );
//     // }
//     setLatestData=(data)=>{
//         this.setState({
//             latestData:data,
//         });
//     }
//
//     setPatientsData=(data)=>{
//         this.setState({
//             patientsData:data,
//         });
//     }
//     patientDetailInfoTable = ()=>{
//         return(
//             <PatientDetailInfoTable
//                 data={this.state.patientDetailInfoData}
//                 dataChange={this.setpatientDetailInfoData}
//             />
//         );
//     }
//     handleCancle_patientDetail=()=>{
//         this.setState({
//             visible_patientDetail:false,
//         });
//     }
//
//     render() {
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
//                     title={"修改病人"}
//                     centered
//                     visible={this.state.visible_modify}
//                     onCancel={this.handleCancle_modify}
//                     onOk={this.handleOk_modify}
//                     okText={'提交'}
//                     cancelText={'取消'}
//                     className="modal1"
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
//                                     label="手机号"
//                                     name="手机号"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: '请输入手机号!',
//                                         },
//                                     ]}
//                                 >
//                                     <Input placeholder={"请输入手机号"}/>
//                                 </Form.Item>
//                                 <Form.Item label="医生"
//                                            name={"医生"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择医生!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择医生 ">
//                                         <Option value="on">男</Option>
//                                         <Option value="close">女</Option>
//                                     </Select>
//                                 </Form.Item>
//                                 <Form.Item label="姓名"
//                                            name={"姓名"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入姓名!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input placeholder={"请输入姓名"}/>
//                                 </Form.Item>
//                                 <Form.Item label="性别"
//                                            name={"性别"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择性别!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择性别 " >
//                                         <Option value="on">男</Option>
//                                         <Option value="close">女</Option>
//                                     </Select>
//                                 </Form.Item>
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
//                                 <Form.Item label="地址"
//                                            name={"地址"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入地址!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入地址"} />
//                                 </Form.Item>
//                                 <Form.Item label="测试状态"
//                                            name={"测试状态"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择测试状态!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择测试状态">
//                                         <Option value="on">未测试</Option>
//                                         <Option value="close">完成测试</Option>
//                                     </Select>
//                                 </Form.Item>
//                                 <Form.Item label="备注">
//                                     <TextArea rows={4}  placeholder={"请输入备注"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"病人详情"}
//                     centered
//                     visible={this.state.visible_patientDetail}
//                     onCancel={this.handleCancle_patientDetail}
//                     footer={null}
//                     width={1000}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                         <p>{this.state.record.patient_name}</p>
//                         <div style={{heigh:"100%"}}>
//                             {this.patientDetailInfoTable()}
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
// class PatientInfo2 extends Component {
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
//     patientTable = ()=>{
//         return(
//             <PatientTable
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
//         const rowSelectionPatientTable={
//             selectedRowKeys,
//             onChange:this.onSelectChange,
//         }
//         this.setState({rowSelectionPatientTable});
//         //console.log(this.state);
//     }
//     handleSexselectChange=()=>{
//
//     }
//     handlModalPatientDoctorChange=(value)=>{
//         //console.log(value);
//     }
//     handlModalPatientSexChange=(value)=>{
//         //console.log(value);
//     }
//     handlModalPatientTestStateChange=(value)=>{
//         //console.log(value);
//     }
//     handleCancle_add=()=>{
//         this.setState({visible_add:false});
//     }
//     handleAddOk=()=>{
//         this.setState({visible_add:false});
//     }
//
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
//                         <Input placeholder={'手机号'} className={'input1'}/>
//                         <Input placeholder={'病人姓名'} className={'input1'}/>
//                         <Select placeholder="请选择性别 "  onChange={this.handleSexselectChange} className="input1" >
//                             <Option value="on">男</Option>
//                             <Option value="close">女</Option>
//                         </Select>
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
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined  className="icon1" />}
//                             onClick={this.add}
//                             className="button1"
//                         >
//                             添加
//                         </Button>
//                     </div>
//                 </div>
//                 {/*表格*/}
//                 <div style={{heigh:"100%"}}>
//                     {this.patientTable()}
//                 </div>
//
//                 <Modal
//                     title={"添加病人"}
//                     centered
//                     visible={this.state.visible_add}
//                     onCancel={this.handleCancle_add}
//                     onOk={this.handleAddOk}
//                     okText={'提交'}
//                     cancelText={'取消'}
//                     className="modal1"
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
//                                     label="手机号"
//                                     name="手机号"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: '请输入手机号!',
//                                         },
//                                     ]}
//                                 >
//                                     <Input placeholder={"请输入手机号"}/>
//                                 </Form.Item>
//                                 <Form.Item label="医生"
//                                            name={"医生"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择医生!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择医生 "  onChange={this.handlModalPatientDoctorChange}>
//                                         <Option value="on">男</Option>
//                                         <Option value="close">女</Option>
//                                     </Select>
//                                 </Form.Item>
//                                 <Form.Item label="姓名"
//                                            name={"姓名"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入姓名!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input placeholder={"请输入姓名"}/>
//                                 </Form.Item>
//                                 <Form.Item label="性别"
//                                            name={"性别"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择性别!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择性别 "  onChange={this.handlModalPatientSexChange} >
//                                         <Option value="on">男</Option>
//                                         <Option value="close">女</Option>
//                                     </Select>
//                                 </Form.Item>
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
//                                 <Form.Item label="地址"
//                                            name={"地址"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入地址!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入地址"} />
//                                 </Form.Item>
//                                 <Form.Item label="测试状态"
//                                            name={"测试状态"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请选择测试状态!',
//                                                },
//                                            ]}
//                                 >
//                                     <Select placeholder="请选择测试状态"  onChange={this.handlModalPatientTestStateChange} >
//                                         <Option value="on">未测试</Option>
//                                         <Option value="close">完成测试</Option>
//                                     </Select>
//                                 </Form.Item>
//                                 <Form.Item label="备注">
//                                     <TextArea rows={4}  placeholder={"请输入备注"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//     )
//     }
// }

//查看详情
class Modal3 extends Component{
    //初始化
    constructor(props) {
        super(props);
        this.data = [this.props.record];
        //console.log(this.data);
        //console.log(this.props.data);
        //this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title: '病人id',
            dataIndex: 'patientId',
            width:150,
        },
        {
            title: '医生id',
            dataIndex: 'uloginId',
            width:150,
        },
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
        },
        {
            title:'创建时间',
            dataIndex:'insertDate',
            width:150,
            align:'center',
        },
        {
            title:'备注',
            dataIndex:'remarks',
            width:150,
            align:'remarks',
        },
    ];
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //得到输入
    inputChange = (e,name) => {
        ////console.log(name);
        ////console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //表格行选择
    onSelectChange = row => {
        //console.log('所选择行',row)
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
            {selectedRowKeys:row}
        )
    };
    //翻页
    handleTableChange = (pagination) =>{
        ////console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestData(page);
        //this.setState({paginationProps:pagination});
        ////console.log(pagination)
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
        //console.log('重置',this.state.input);
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
        data.patientId=this.props.record.patientId;
        let url="/exam/patient/detail";
        ////console.log("request:",data);
        ajax(url,data,'POST')
            .then((response)=>{
                //console.log("response:",response);
                if(response.data.data==null){
                    //console.log("查询失败");
                    message.error("请求错误")
                }
                else{
                    let data=[response.data.data.info];
                    let paginationProps={...this.state.paginationProps};
                    addKey(data);
                    paginationProps.total=response.data.data.total;
                    paginationProps.current=page.page;
                    paginationProps.pageSize=page.pageSize;
                    //console.log("data:",response);
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
        //console.log("exportFile input:",data);
        //exportFile("/exam/data/export/login/condition",data);
        exportFile('/user/base/info/export/condition',{});
        ////console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         //console.log(response);
        //     }).catch(e=>{
        //     //console.log("search error!",e);
        // });
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

    //弹窗2


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
                        <p>病人：{this.props.record.patientName}</p>
                        <p style={{whiteSpace:"nowrap"}}></p>
                        <p ><span >病人详情</span></p>
                        <div style={{heigh:"100%"}}>
                            <Table
                                columns={this.columns}
                                dataSource={this.data}
                                bordered={true}
                                rowSelection={false}
                                style={{margin:"20px 0",borderBottom:'1px,soild'}}
                                pagination={false}

                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
//修改
class Modal2 extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};
        Object.assign(input,this.props.record);
        //console.log("init record:",input);
        this.state= {
            //testTime: '',
            input: input,
        }
        //获取列表信息
        this.dataTable = [];
        let otmp = {};
        otmp['未测试'] = 'patient_no_test';
        otmp['正在测试'] = 'patient_testing';
        otmp['完成测试'] = 'patient_finish';
        input.patientTestStatus = otmp[input.patientTestStatus]
        this.requestData(input);
        //时间格式转换
        // let testTime=this.props.record.testTime;
        // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        // this.state.testTime=mymoment;
    }
    //函数部分
    //请求数据
    requestData=(input)=>{
        let url="/exam/patient/all/doctor";
        ////console.log("request:",data);
        ajax(url, {},'GET')
          .then((response)=>{
              //console.log("response:",response);
              if(response.data.data==null){
                  //console.log("请求错误！");
                  message.error("请求错误！")
              }
              else{
                  let mydata=response.data.data;
                  //console.log(response);
                  this.dataTable = mydata;
              }
              delete input['updateUser'];
              delete input['delFlag'];
              delete input['insertDate'];
              delete input['key'];
              delete input['updateDate'];
              delete input['uloginName'];

              this.form.current.setFieldsValue(input);
              this.setState({
                  input:input
              });
          });
    }
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //点击完成
    handleOk = () => {
        //console.log('修改')
        //console.log(this.form)
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
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/exam/patient/modify";
                ////console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1004){
                            //console.log("请求错误！",response);
                            message.error("修改失败！")
                        }else{
                            form.resetFields();
                            console.log("修改成功：",response);
                            Object.assign(this.props.record,this.state.input);
                            let tmpArray = {};
                            tmpArray['patient_no_test'] = '未测试';
                            tmpArray['patient_testing'] = '正在测试';
                            tmpArray['patient_finish'] = '完成测试';
                            this.props.record['patientTestStatus'] = tmpArray[this.props.record['patientTestStatus']];
                            this.props.setVisible(false);
                            message.success("修改成功")
                        }
                    });
            })
            .catch((info) => {
                //console.log('Validate Failed:', info);
            });


    };

    //时间选择函数
    rangePickerOnChange=(value, dateString)=>{
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
        let input = {}
        Object.assign(input,this.state.input)
        input.testTime=dateString;
        this.setState({
        input:input,
        testTime:value,
        })
    }
    rangePickerOnOk=(value)=> {
        //console.log('onOk: ', value);
    }
    //得到文本框输入
    inputChange = (e,name) => {
        ////console.log(name);
        //let themename = e.target.name;
        //console.log(themename)
        ////console.log(e.target.name);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        });
        //console.log(this.state);
    }
    //参数设置
    // state={
    //     //表格1数据
    //     testTime:'',
    //     input:{}
    // };
    //得到selet项目
    optuLoginId(){
        let ii = 1;
        //console.log("opt:",this.dataTable)
        return(
          this.dataTable.map((item)=>{
              ii = ii+1;
              return(<Option key = {ii} title="uloginId" value={item.uloginId}>{item.uloginName + " id: " + item.uloginId}</Option>)
          })
        )
    }
    //选择框变化（完成）
    handleChange=(e,Option) =>{
        //console.log(e)
        //console.log(Option)
        let source = {};
        source[Option.title] = Option.value;
        this.setState({
            input:Object.assign(this.state.input,source),

        })
    }
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
                                label="手机号"
                                name="patientNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号!',
                                    },
                                ]}
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"patientNumber")}}
                                       value={this.state.input.patientNumber}
                                />
                            </Form.Item>
                            <Form.Item
                                label="病人姓名"
                                name="patientName"
                                rules={[{ required: true ,message:"请输入病人姓名"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                            </Form.Item>
                            <Form.Item
                              label="医生姓名"
                              name="uloginId"
                              rules={[{ required: true ,message:"请输入医生姓名"}]}//设置验证规则
                            >
                                <Select
                                  placeholder="请选择医生姓名 "
                                  style={{width:'100%'}}
                                  value={this.state.input.uloginId}
                                  onChange={this.handleChange}>
                                    {this.optuLoginId()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="性别"
                                       name="patientSex"
                                       rules={[
                                           {required:true,message:'请输入性别！',},
                                       ]}>
                                <Select
                                  placeholder = "请选择性别"
                                  style={{width:'100%'}}
                                  value={this.state.input.patientSex}
                                  onChange={this.handleChange}>
                                    <Option key = '1'title = 'patientSex' value={'M'}>男</Option>
                                    <Option key = '2'title = 'patientSex' value={'F'}>女</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="年龄"
                                       name="patientAge"
                                       rules={[
                                           {required:true,message:'请输入年龄！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"patientAge")}} value={this.state.input.patientAge}/>
                            </Form.Item>
                            <Form.Item label="地址"
                                       name="patientAddress"
                                       rules={[
                                           {required:true,message:'请输入地址！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"patientAddress")}} value={this.state.input.patientAddress}/>
                            </Form.Item>
                            <Form.Item label="测试状态"
                                       name="patientTestStatus">
                                <Select
                                  placeholder = "测试状态"
                                  style={{width:'100%'}}
                                  value={this.state.input.patientTestStatus}
                                  onChange={this.handleChange}>
                                    <Option key = '1'title = 'patientTestStatus' value={'patient_no_test'}>未测试</Option>
                                    <Option key = '2'title = 'patientTestStatus' value={'patient_testing'}>正在测试</Option>
                                    <Option key = '3'title = 'patientTestStatus' value={'patient_finish'}>完成测试</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="备注"
                                       name="remarks">
                                <TextArea rows={4} onChange={(e)=>{this.inputChange(e,"remarks")}} value={this.state.input.remarks}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
//添加
class Modal1 extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};
        Object.assign(input,this.props.record);
        //console.log("init record:",input);
        this.state= {
            testTime: '',
            input: input,
        }

        //获取列表信息
        this.dataTable = [];
        this.requestData();
        //时间格式转换
        // let testTime=this.props.record.testTime;
        // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        // this.state.testTime=mymoment;
    }
    //函数部分
    //请求数据
    requestData=()=>{
        let url="/exam/patient/all/doctor";
        ////console.log("request:",data);
        ajax(url, {},'GET')
          .then((response)=>{
              //console.log("response:",response);
              if(response.data.data==null){
                  //console.log("请求错误！");
                  message.error("请求错误！")
              }
              else{
                  let mydata=response.data.data;
                  //console.log(response);
                  this.dataTable = mydata;
                  this.setState({
                      input:{}
                  })
              }
          });
    }
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //点击完成
    handleOk = () => {
        //console.log('添加完成')
        //console.log(this.form)
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
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/exam/patient/add";
                ////console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1002){
                            //console.log("请求错误！",response);
                            message.error("添加失败！")
                        }else{
                            form.resetFields();
                            //console.log("修改成功：",response);
                            //Object.assign(this.props.record,this.state.input);
                            this.props.setVisible(false);
                            message.success("添加成功")
                        }
                    });
            })
            .catch((info) => {
                //console.log('Validate Failed:', info);
            });


    };

    //时间选择函数
    rangePickerOnChange=(value, dateString)=>{
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
        let input = {}
        Object.assign(input,this.state.input)
        input.testTime=dateString;
        this.setState({
        input:input,
        testTime:value,
        })
    }
    rangePickerOnOk=(value)=> {
        //console.log('onOk: ', value);
    }
    //得到文本框输入
    inputChange = (e,name) => {
        ////console.log(name);
        //let themename = e.target.name;
        //console.log(themename)
        ////console.log(e.target.name);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        });
        //console.log(this.state);
    }
    //参数设置
    // state={
    //     //表格1数据
    //     testTime:'',
    //     input:{}
    // };

    //得到selet项目
    optuLoginId(){
        let ii = 1;
        //console.log("opt:",this.dataTable)
        return(
          this.dataTable.map((item)=>{
              ii = ii+1;
              return(<Option key = {ii} title="uloginId" value={item.uloginId}>{item.uloginName + " id: " + item.uloginId}</Option>)
          })
        )
    }
    //选择框变化（完成）
    handleChange=(e,Option) =>{
        //console.log(e)
        //console.log(Option)
        let source = {};
        source[Option.title] = Option.value;
        this.setState({
            input:Object.assign(this.state.input,source),

        })
    }
    /*表单验证
      Form.useForm是是 React Hooks 的实现，只能用于函数组件
      class组件中通过 React.createRef()来获取数据域*/
    form = React.createRef();
    render(){
        return(
            <div>
                {/* 弹窗 */}
                <Modal
                    title="添加病人"
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
                                label="手机号"
                                name="patientNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号!',
                                    },
                                ]}
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"patientNumber")}}
                                       value={this.state.input.patientNumber}
                                />
                            </Form.Item>
                            <Form.Item
                                label="医生姓名"
                                name="uloginId"
                                rules={[{ required: true ,message:"请输入医生姓名"}]}//设置验证规则
                            >
                                <Select
                                  placeholder="请选择医生姓名 "
                                  style={{width:'100%'}}
                                  value={this.state.input.uloginId}
                                  onChange={this.handleChange}>
                                    {this.optuLoginId()}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="病人姓名"
                                name="patientName"
                                rules={[{ required: true ,message:"请输入病人姓名"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                            </Form.Item>
                            <Form.Item label="性别"
                                       name="patientSex"
                                       rules={[
                                           {required:true,message:'请输入性别！',},
                                       ]}>
                                <Select
                                  placeholder = "请选择性别"
                                  style={{width:'100%'}}
                                  value={this.state.input.patientSex}
                                  onChange={this.handleChange}>
                                    <Option key = '1'title = 'patientSex' value={'M'}>男</Option>
                                    <Option key = '2'title = 'patientSex' value={'F'}>女</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="年龄"
                                       name="patientAge"
                                       rules={[
                                           {required:true,message:'请输入年龄！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"patientAge")}} value={this.state.input.patientAge}/>
                            </Form.Item>
                            <Form.Item label="地址"
                                       name="patientAddress">
                                <Input onChange={(e)=>{this.inputChange(e,"patientAddress")}} value={this.state.input.patientAddress}/>
                            </Form.Item>
                            <Form.Item label="测试状态"
                                       name="patientTestStatus">
                                <Select
                                  placeholder = "测试状态"
                                  style={{width:'100%'}}
                                  value={this.state.input.patientTestStatus}
                                  onChange={this.handleChange}>
                                    <Option key = '1'title = 'patientTestStatus' value={'patient_no_test'}>未测试</Option>
                                    <Option key = '2'title = 'patientTestStatus' value={'patient_testing'}>正在测试</Option>
                                    <Option key = '3'title = 'patientTestStatus' value={'patient_finish'}>完成测试</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="备注"
                                       name="remarks">
                                <TextArea rows={4} onChange={(e)=>{this.inputChange(e,"remarks")}} value={this.state.input.remarks}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default class PatientInfo extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title:'手机号',
            dataIndex:'patientNumber',
            width:150,
            align:'center',
        },
        {
            title:'病人姓名',
            dataIndex:'patientName',
            width:150,
            align:'center',
        },
        {
            title:'性别',
            dataIndex:'patientSex',
            width:150,
            align:'center',
        },
        {
            title:'医生',
            dataIndex:'uloginId',
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.detailInfo(record)}}>查看详情</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
                </Space>
            ),
        },
    ];
    //函数部分
    //得到输入
    inputChange = (e,name) => {
        ////console.log(name);
        ////console.log(e.target.value);
        let source={};
        source[name]=e.target.value;
        this.setState({
            input:Object.assign(this.state.input,source),
        })
    }
    //表格行选择
    onSelectChange = row => {
        //console.log('所选择行',row)
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
            {selectedRowKeys:row}
        )
    };
    //翻页
    handleTableChange = (pagination) =>{
        ////console.log(this.props.data.total);
        let page={
            page:pagination.current,
            pageSize: pagination.pageSize,
        };
        this.requestData(page);
        //this.setState({paginationProps:pagination});
        ////console.log(pagination)
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
        //console.log('重置',this.state.input);
        let myInput=Object.keys(this.state.input);
        let data = {};
        for(let ii=0;ii<myInput.length;ii++){
            data[myInput[ii]]='';
        }
        data.patientSex = undefined;
        //this.state.input=data;
        this.setState(
            {
                selectedRowKeys:[],
                input:data,
            },this.search
        )
        //this.search();
    };
    //添加
    add= ()=>{
        this.lookModal();
    }
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
        ////console.log("request:",data);
        ajax("/exam/patient/list",data,'POST')
            .then((response)=>{
                if(response.data.data!==null&&response.data.data!==undefined){
                    let data=response.data.data.info;
                    let paginationProps={...this.state.paginationProps};
                    addKey(data);
                    paginationProps.total=response.data.data.total;
                    paginationProps.current=page.page;
                    paginationProps.pageSize=page.pageSize;
                    //console.log("data:",response);
                    this.setState({
                        data:data,
                        paginationProps:paginationProps,
                    });
                }else{
                    //console.log("/exam/patient/list error!");
                    console.log(response)
                    message.error("请求错误！")
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
        //console.log("exportFile input:",data);
        //exportFile("/exam/data/export/login/condition",data);
        exportFile('/user/base/info/export/condition',{});
        ////console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         //console.log(response);
        //     }).catch(e=>{
        //     //console.log("search error!",e);
        // });
    }

    //重置密码
    resetPassword=(record)=>{
        let data={};
        //console.log("record:",record);
        data.loginId=record.loginId;
        //console.log("request:",data);
        ajax("/exam/login/resetpwd",data,'POST')
            .then((response)=>{
                if(response.data.code!==1000){
                    //console.log("请求错误！",response);
                    message.error("重置失败！")
                }else{
                    //console.log("重置成功：",response);
                    message.success("重置成功")
                }
            });
    }
    //修改一项
    modify=(record)=>{
        this.lookModal2(record);
    }
    //删除一项\
    delete=(record)=>{
        let data={};
        data.patientId=record.patientId;
        let url="/exam/patient/remove/"+data.patientId;
        ajax(url, {},'GET')
            .then((response)=>{
                if(response.data.code!==1006){
                    //console.log("请求错误！",response);
                    message.error("删除失败！")
                }else{
                    //console.log("请求成功：",response);
                    this.handleTableChange(this.state.paginationProps);
                    message.success("删除成功")
                }
            });
    }
    //Select回调
    handleChange=(e,Option) =>{
        ////console.log(e)
        ////console.log(Option)
        let source = {};
        source[Option.title] = Option.value;
        this.setState({
            input:Object.assign(this.state.input,source),

        })
    }
    //查看详情
    detailInfo=(record)=>{
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
            patientName:"",
            patientNumber:"",
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
        if(flag===false){
            this.handleTableChange(this.state.paginationProps)
        }
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
    //
    // //弹窗2
    //修改一项
    Modal2 = ()=>{
        if(this.state.modalVisible2)
            return(
                <Modal2
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
    lookModal2=record=>{
        this.setState({
            modalVisible2:true,
            record2:record,
        });
    }
    //
    // //弹窗3
    //查看详情
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
                        <Input placeholder={'手机号'} className={'input1'} onChange={(e)=>{this.inputChange(e,"patientNumber")}} value={this.state.input.patientNumber}/>
                        <Input placeholder={'病人姓名'} className={'input1'} onChange={(e)=>{this.inputChange(e,"patientName")}} value={this.state.input.patientName}/>
                        <Select
                          placeholder="请选择性别"
                          className={'input1'}
                          value={this.state.input.patientSex}
                          onChange={this.handleChange}>
                            <Option title="patientSex" value={''}>不限</Option>
                            <Option title="patientSex" value={'M'}>男</Option>
                            <Option title="patientSex" value={'F'}>女</Option>
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
                {this.Modal()}
                {this.Modal2()}
                {this.Modal3()}
                {/*{this.latestTestDataModal()}*/}
            </div>
        )
    }
}
