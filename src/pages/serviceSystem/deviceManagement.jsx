import React, { Component } from 'react'
import {Table, Button, Input, Space, Modal, Form, message, DatePicker, Select} from 'antd';
import { Radio } from 'antd';
import moment from 'moment';

import {ReloadOutlined,
    SearchOutlined ,
} from '@ant-design/icons'
import './index.less'
//import { Row, Col } from 'antd';
import ajax from "../../api/ajax";
import addKey from "../../api/addKey";
import {exportFile} from "../../api";

const { TextArea } = Input;
const { Option } = Select;
// const { Moment } = moment;

// class PatientTable extends Component{
//     columns = [
//         {
//             title:'设备码',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'绑定用户',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'激活状态',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'使用状态',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'是否共享',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'operation',
//             width:300,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>修改</Button>
//                     <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{}}>使用人员</Button>
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
//         singleSelectValue:1,
//     }
//     handleTableChange = (pagination) =>{
//         console.log(pagination)
//     };
//     singleSelectonChange = e => {
//         console.log('radio checked', e.target.value);
//         this.setState({
//             value: e.target.value,
//         });
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
//
//     render() {
//         return(
//             <div>
//                 <Table
//                     columns={this.columns}
//                     dataSource={this.props.data}
//                     bordered={true}
//                     style={{margin:"20px 0",borderBottom:'1px,soild'}}
//                     pagination={this.paginationProps}
//                     onChange={this.handleTableChange}
//                     rowSelection={this.rowSelection}
//                 />
//             </div>
//         );
//     }
// }
// class DeviceManagement_Serve2 extends Component {
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
//         console.log(this.state);
//     }
//     handleSexselectChange=()=>{
//
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
//                     <div   style={{display:"flex"}}>
//                         <Input placeholder={'设备码'} className={'input1'}/>
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
//                     {this.patientTable()}
//                 </div>
//             </div>
//         )
//     }
// }

//使用人员
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
            title: '用户名',
            dataIndex: 'userName',
            width:150,
        },
        {
            title: '使用版本类型',
            dataIndex: 'appType',
            width:150,
        },
        {
            title: '是否激活',
            dataIndex: 'userFlag',
            width:150,
        },
        {
            title: '绑定时间',
            dataIndex: 'bindTime',
            width:150,
        },
        {
            title: '解绑时间',
            dataIndex: 'unbindTime',
            width:150,
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
        let url="/device/manage/history/user/list/"
        +this.props.record.deviceId+'/'+page.page+'/'+page.pageSize;
        //console.log("request:",data);
        ajax(url,{},'GET')
          .then((response)=>{
              console.log("response:",response);
              if(response.data.data===null||response.data.data===undefined)
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
    add=(record)=>{
        this.lookModal(record);
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
                      {/*<Button*/}
                      {/*    type="primary"*/}
                      {/*    icon={<PlusOutlined  className="icon1" />}*/}
                      {/*    onClick={this.add}*/}
                      {/*    className="button1"*/}
                      {/*>*/}
                      {/*    添加*/}
                      {/*</Button>*/}
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
//修改
class Modal2 extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};

        Object.assign(input,this.props.record);

        console.log("init record:",input);
        this.state = {
            input:input,
        }
        //时间格式转换
        // let testTime=this.props.record.testTime;
        // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        // this.state.testTime=mymoment;
    }
    componentDidMount = ()=>{
        let input = this.state.input
        if(input.renewalTime!==null)
            input.renewalTime = moment(input.renewalTime)
        if(input.activeTime!==null)
            input.activeTime = moment(input.activeTime)
        if(input.fixTime!==null)
            input.fixTime = moment(input.fixTime)
        this.form.current.setFieldsValue(input);
        this.setState({
            input:input
        })
    }
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //点击完成
    handleOk = () => {
        console.log('修改')
        console.log(this.form)
        console.log(typeof(this.state.input.renewalTime))
        let form = this.form.current;
        form.validateFields()//表单输入校验
            .then((values) => {
                let data={};
                let myInput=Object.keys(this.state.input);
                for(let ii=0;ii<myInput.length;ii++){
                    if(this.state.input[myInput[ii]]===null){

                    }
                    else if(this.state.input[myInput[ii]]._isAMomentObject){
                        console.log('get it')
                        console.log(this.state.input[myInput[ii]])
                        data[myInput[ii]] = this.state.input[myInput[ii]].format('YYYY-MM-DD h:mm:ss')
                        console.log(data[myInput[ii]])
                    }
                    else if(this.state.input[myInput[ii]]!==""){
                        data[myInput[ii]]=this.state.input[myInput[ii]];
                    }
                }
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/device/manage/info/modify";
                console.log("request:",data);
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
    rangePickerOnChange=(value, dateString,name)=>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        console.log('name ', name);
        let input = {}
        Object.assign(input,this.state.input)
        input[name]=value;
        this.setState({
            input:input,
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
    //选择框
    selectChange =(e,Option) => {
        console.log(e)
        console.log(Option)
        this.setState({
            input:Object.assign(this.state.input,{[Option.title]:e})
        })
    }
    //单选框
    radioChange= (e,name) => {
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
                    width={700}
                    forceRender={true}

                >
                    <div className="ant-modal-body">
                        <div className="modal-body" style={{height:"550px"}}>
                            <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                layout="horizontal"
                                ref={this.form}//表单验证，通过ref获取
                                // initialValues={this.state.input}
                            >
                                <Form.Item
                                    label="设备码"
                                    name="deviceCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入设备码!',
                                        },
                                    ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"deviceCode")}}
                                           value={this.state.input.deviceNo}
                                    />
                                </Form.Item>
                                <Form.Item
                                  label="设备号"
                                  name="deviceNo"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入设备码!',
                                      },
                                  ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"deviceNo")}}
                                           value={this.state.input.deviceNo}
                                    />
                                </Form.Item>
                                <Form.Item
                                  label="硬件版本"
                                  name="hardwareVersion"
                                  rules={[
                                  ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"hardwareVersion")}}
                                           value={this.state.input.hardwareVersion}
                                    />
                                </Form.Item>
                                <Form.Item
                                  label="软件版本"
                                  name="softareVersion"
                                  rules={[
                                  ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"softareVersion")}}
                                           value={this.state.input.softareVersion}
                                    />
                                </Form.Item>
                                <Form.Item
                                  label="更新时间"
                                  name="renewalTime"
                                  rules={[
                                  ]}
                                >
                                    <DatePicker showToday showTime onChange={(data,dataString)=>{this.rangePickerOnChange(data,dataString,'renewalTime')}} onOk={this.rangePickerOnOk} value={this.state.input.renewalTime}/>
                                </Form.Item>
                                <Form.Item
                                  label="蓝牙密码"
                                  name="blePassword"
                                  rules={[
                                  ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"blePassword")}}
                                           value={this.state.input.blePassword}
                                    />
                                </Form.Item>

                                <Form.Item
                                  label="是否激活"
                                  name="available"
                                  rules={[{ required: true ,message:"请选择是否激活"}]}//设置验证规则
                                >
                                    <Radio.Group onChange={(e)=>{this.radioChange(e,"available")}} value={this.state.input.available}>
                                        <Radio value={'1'}>是</Radio>
                                        <Radio value={'0'}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                  label="是否已用"
                                  name="active"
                                  rules={[{ required: true ,message:"请选择是否已用"}]}//设置验证规则
                                >
                                    <Radio.Group onChange={(e)=>{this.radioChange(e,"active")}} value={this.state.input.active}>
                                        <Radio value={'1'}>是</Radio>
                                        <Radio value={'0'}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                  label="激活时间"
                                  name="activeTime"
                                  rules={[
                                  ]}
                                >
                                    <DatePicker showToday showTime
                                                onChange={(data,dataString)=>
                                                {this.rangePickerOnChange(data,dataString,'activeTime')}}
                                                onOk={this.rangePickerOnOk} value={this.state.input.activeTime}/>
                                </Form.Item>
                                <Form.Item
                                  label="是否共享"
                                  name="shared"
                                  rules={[{ required: true ,message:"请选择是否共享"}]}//设置验证规则
                                >
                                    <Radio.Group onChange={(e)=>{this.radioChange(e,"shared")}} value={this.state.input.shared}>
                                        <Radio value={'1'}>是</Radio>
                                        <Radio value={'0'}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                  label="矫正倍数"
                                  name="adjust"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入矫正倍数!',
                                      },
                                  ]}
                                >
                                    <Input onChange={(e)=>{this.inputChange(e,"adjust")}}
                                           value={this.state.input.adjust}
                                    />
                                </Form.Item>
                                <Form.Item
                                  label="类型"
                                  name="target"
                                  rules={[
                                  ]}
                                >
                                    <Select
                                      placeholder="请选择病人Id "
                                      style={{width:'100%'}}
                                      value={this.state.input.target}
                                      onChange={this.selectChange}>
                                        <Option title="target" value="device_normnal">正常</Option>
                                        <Option title="target" value="device_testing">测试</Option>
                                        <Option title="target" value="eupregna">优孕保</Option>
                                        <Option title="target" value="eupregna_testing">优孕保测试</Option>
                                        <Option title="target" value="professional_normal">专业正常</Option>
                                        <Option title="target" value="professional_testing">专业测试</Option>
                                        <Option title="target" value="research">研究</Option>
                                        <Option title="target" value="other">其他</Option>
                                        <Option title="target" value="other_test">其他测试</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                  label="状态"
                                  name="status"
                                  rules={[
                                  ]}
                                >
                                    <Select
                                      placeholder="请选择状态 "
                                      style={{width:'100%'}}
                                      value={this.state.input.status}
                                      onChange={this.selectChange}>
                                        <Option title="status" value="no_test">未测试</Option>
                                        <Option title="status" value="pass">测试通过</Option>
                                        <Option title="status" value="no_pass">测试未通过</Option>
                                        <Option title="status" value="repair">返修</Option>
                                        <Option title="status" value="cannot_use">存在故障,完全无法使用</Option>
                                        <Option title="status" value="use_no_testvalue">存在故障，可用但影响测试值</Option>
                                        <Option title="status" value="temporary_use">存在故障，可临时用</Option>
                                        <Option title="status" value="discard">废弃</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                  label="备注"
                                  name="memo"
                                  rules={[
                                  ]}
                                >
                                    <TextArea rows={4} onChange={(e)=>{this.inputChange(e,"memo")}} value={this.state.input.memo}/>
                                </Form.Item>

                                <Form.Item
                                  label="返修时间"
                                  name="fixTime"
                                  rules={[
                                  ]}
                                >
                                    <DatePicker showToday showTime
                                                onChange={(data,dataString)=>
                                                {this.rangePickerOnChange(data,dataString,'fixTime')}}
                                                onOk={this.rangePickerOnOk} value={this.state.input.fixTime}/>

                                </Form.Item>
                            </Form>
                        </div>
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
        console.log("init record:",input);
        this.state= {
            testTime: '',
            input: input,
        }
        //时间格式转换
        // let testTime=this.props.record.testTime;
        // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
        // this.state.testTime=mymoment;
    }
    //函数部分
    //弹窗关闭函数
    handleCancel= ()=>{
        this.props.setVisible(false);
    }
    //点击完成
    handleOk = () => {
        // console.log('添加完成')
        // console.log(this.form)
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
                //console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1000){
                            //console.log("请求错误！",response);
                            message.error("添加失败！")
                        }else{
                            form.resetFields();
                            //console.log("修改成功：",response);
                            Object.assign(this.props.record,this.state.input);
                            this.props.setVisible(false);
                            message.success("添加成功")
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
        Object.assign(input,this.state.input)
        input.testTime=dateString;
        this.setState({
        input:input,
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
                                label="医生"
                                name="loginAccount"
                                rules={[{ required: true ,message:"请输入医生用户"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"loginAccount")}} value={this.state.input.loginAccount}/>
                            </Form.Item>
                            <Form.Item label="性别"
                                       name="patientSex"
                                       rules={[
                                           {required:true,message:'请输入性别！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"patientSex")}} value={this.state.input.patientSex}/>
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
                                       name="patientTestStatus"
                                       rules={[
                                           {required:true,message:'测试状态！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"patientTestStatus")}} value={this.state.input.patientTestStatus}/>
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

export default class DeviceManagement_Serve extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title:'设备码',
            dataIndex:'deviceCode',
            width:150,
            align:'center',
        },
        {
            title:'绑定用户',
            dataIndex:'nickName',
            width:150,
            align:'center',
        },
        {
            title:'激活状态',
            dataIndex:'available',
            width:150,
            align:'center',
            render:(text)=>{
                if(text==='1')
                    return(<span>已激活</span>)
                else
                    return(<span>未激活</span>)
            }
        },
        {
            title:'使用状态',
            dataIndex:'active',
            width:150,
            align:'center',
            render:(text)=>{
                if(text==='1')
                    return(<span>使用中</span>)
                else
                    return(<span>使用中</span>)
            }
        },
        {
            title:'是否共享',
            dataIndex:'shared',
            width:150,
            align:'center',
            render:(text)=>{
                if(text==='1')
                    return(<span>共享</span>)
                else
                    return(<span>未共享</span>)
            }
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:300,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.user(record)}}>使用人员</Button>
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
        //this.search();
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
        ajax("/device/management/list",data,'POST')
            .then((response)=>{
                //console.log(response);
                if(response.data.code===1000){
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
                    // console.log("/device/managment/list error!")
                    // console.log(response);
                    message.error("请求错误！")
                    console.log(response)
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

    //修改
    modify=(record)=>{
        this.lookModal2(record);
    }

    //使用人员
    user=(record)=>{
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
            deviceNo:"",
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
        if(flag===false){
            this.handleTableChange(this.state.paginationProps);
        }
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
                        <Input placeholder={'设备码'} className={'input1'} onChange={(e)=>{this.inputChange(e,"deviceCode")}} value={this.state.input.deviceCode}/>
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
                {this.Modal2()}
            </div>
        )
    }
}



