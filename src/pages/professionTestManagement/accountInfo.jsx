import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form, Checkbox, message} from 'antd';
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
import ajax from "../../api/ajax";
import addKey from "../../api/addKey";
import {exportFile} from "../../api";
import changeData from "../../api/changeData";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

//查看历史设备
class Modal3 extends Component{
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns=[
        {
            title: '设备号',
            dataIndex: 'deviceId',
            width:150,
            sorter: {
                compare: (a, b) => a.deviceId - b.deviceId,
                multiple: 3,
            },
        },
        {
            title: '设备码',
            dataIndex: 'deviceCode',
            width:150,
            sorter: {
                compare: (a, b) => a.deviceCode - b.deviceCode,
                multiple: 3,
            },
        },
        {
            title: '正在使用',
            dataIndex: 'userFlag',
            width: 150,
            sorter: {
                compare: (a, b) => a.userFlag - b.userFlag,
                multiple: 2,
            },
            // render:(text,record)=>(
            //     <>
            //         {changeData(text,["1","0"],["使用中",""])}
            //     </>
            // ),
        },
        {
            title: '绑定时间',
            dataIndex: 'bindTime',
            width: 150,
            sorter: {
                compare: (a, b) => a.bindTime - b.bindTime,
                multiple: 2,
            },
        },
        {
            title: '终止时间',
            dataIndex: 'unbindTime',
            width: 150,
            sorter: {
                compare: (a, b) => a.unbindTime - b.unbindTime,
                multiple: 2,
            },
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
                selectedIDs:[],
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
        data.uloginId=this.props.record.uloginId;
        let url="/exam/login/history/device";
        //console.log("request:",data);
        url = url+"/"+data.uloginId+"/"+data.page+"/"+data.pageSize;
        ajax(url,{},'get')
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
        },
        paginationProps:{
            position:['bottomLeft'],
            total:0,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeys:[],
        selectedIDs:[],
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
                    title={"历史设备"}
                    centered
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p>医生：{this.props.record.loginName}</p>
                        <p style={{whiteSpace:"nowrap"}}></p>
                        <p ><span >历史设备</span></p>
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
            </div>
        )
    }
}
//修改一条
class Modal2 extends Component{
    //初始化
    constructor(props) {
        super(props);
        //参数设置
        let input={};
        Object.assign(input,this.props.record);
        console.log("init record:",input);
        this.state= {
            //testTime: '',
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
        console.log('修改')
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
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/exam/login/modify";
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
                                label="医生姓名"
                                name="uloginName"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入医生姓名!',
                                    },
                                ]}
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"uloginName")}}
                                       value={this.state.input.uloginName}
                                />
                            </Form.Item>
                            <Form.Item
                                label="医生用户"
                                name="uloginAccount"
                                rules={[{ required: true ,message:"请输入医生用户"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"uloginAccount")}} value={this.state.input.uloginAccount}/>
                            </Form.Item>
                            <Form.Item label="备注"
                                       name="remark"
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"remark")}} value={this.state.input.remark}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
//添加医生账号
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
                //data.patientId=this.props.record.patientId;
                //data.loginId=this.props.record.loginId;
                let url="/exam/login/add";
                //console.log("request:",data);
                ajax(url,data,'POST')
                    .then((response)=>{
                        if(response.data.code!==1002){
                            console.log("请求错误！",response);
                        }else{
                            form.resetFields();
                            console.log("添加成功：",response);
                            //Object.assign(this.props.record,this.state.input);
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
                    title="添加医生账号"
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
                                label="医生姓名"
                                name="uloginName"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入医生姓名!',
                                    },
                                ]}
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"uloginName")}}
                                       value={this.state.input.uloginName}
                                />
                            </Form.Item>
                            <Form.Item
                                label="医生用户"
                                name="uloginAccount"
                                rules={[{ required: true ,message:"请输入医生用户"}]}//设置验证规则
                            >
                                <Input    onChange={(e)=>{this.inputChange(e,"uloginAccount")}} value={this.state.input.uloginAccount}/>
                            </Form.Item>
                            <Form.Item label="密码"
                                       name="ulonginPwd"
                                       rules={[
                                           {required:true,message:'请输入密码！',},
                                       ]}>
                                <Input onChange={(e)=>{this.inputChange(e,"uloginPwd")}} value={this.state.input.uloginPwd}/>
                            </Form.Item>
                            <Form.Item label="备注"
                                       name="remark"
                            >
                                <Input onChange={(e)=>{this.inputChange(e,"remark")}} value={this.state.input.remark}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default class AccountInfo extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.search();
    }

    //表格1数据以及函数
    //常量数据部分
    columns = [
        {
            title:'医生用户',
            dataIndex:'uloginAccount',
            width:80,
            align:'center',
        },
        {
            title:'医生ID',
            dataIndex:'uloginId',
            width:100,
            align:'center',
        },
        {
            title:'医生姓名',
            dataIndex:'uloginName',
            width:60,
            align:'center',
        },
        {
            title:'备注',
            dataIndex:'remark',
            width:80,
            align:'center',
        },
        {
            title:'创建时间',
            dataIndex:'insertDate',
            width:100,
            align:'center',
        },
        {
            title:'修改时间',
            dataIndex:'updateDate',
            width:100,
            align:'center',
        },
        {
            title:'当前使用设备',
            dataIndex:'deviceCode',
            width:80,
            align:'center',
        },
        {
            title:'历史使用设备数',
            dataIndex:'hisCount',
            width:80,
            align:'center',
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:300,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.resetPassword(record)}}>重置密码</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.historyDevice(record)}}>历史设备</Button>
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

        let IDs = [];
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        for( let ii =0; ii<row.length;ii++){
            IDs.push(this.state.data[row[ii]]["uloginId"])
        }
        this.setState(
          {selectedRowKeys:row,
              selectedIDs:IDs,
          }
        ) ;
        //console.log('所选择行',this.state)
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
                selectedIDs:[],
                input:data,
            },
        )
        this.search();
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
            if(this.state.input[myInput[ii]]!=""){
                data[myInput[ii]]=this.state.input[myInput[ii]];
            }
        }
        //console.log("request:",data);
        ajax("/exam/login/list",data,'POST')
            .then((response)=>{
                console.log("data:",response);
                if(response.data.data==null){
                    message.error("请求出错！code:"+response.data.code);
                }else{
                    let data=response.data.data.info;
                    let paginationProps={...this.state.paginationProps};
                    addKey(data);
                    paginationProps.total=response.data.data.total;
                    paginationProps.current=page.page;
                    paginationProps.pageSize=page.pageSize;
                    //console.log("!");
                    //console.log(data);
                    //console.log(paginationProps);
                    this.setState({
                        data:data,
                        paginationProps:paginationProps,
                        selectedRowKeys:[],
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
        exportFile('/exam/login/export/condition',data);
        //console.log("request:",data);
        // ajax("/exam/data/export/login/condition",data,'POST')
        //     .then((response)=>{
        //         console.log(response);
        //     }).catch(e=>{
        //     console.log("search error!",e);
        // });
    }
    //导出选择数据
    exportChoose =()=> {
        exportFile('/exam/login/export/choose',this.state.selectedIDs);
    }

    //重置密码
    resetPassword=(record)=>{
        console.log("record:",record);
        ajax("/exam/login/resetpwd/"+record.uloginId,{},'GET')
            .then((response)=>{
                if(response.data.code!==3002){
                    console.log("请求错误！",response);
                }else{
                    console.log("重置成功：",response);
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
        //data.loginId=record.loginId;
        let url="/exam/login/remove/"+record.loginId;
        ajax(url,data,'GET')
            .then((response)=>{
                if(response.data.code!==1006){
                    console.log("请求错误！",response);
                }else{
                    console.log("请求成功：",response);
                    this.requestData({
                        page:this.state.paginationProps.current,
                        pageSize:this.state.paginationProps.pageSize,
                    });
                }
            });
    }
    //查看历史设备
    historyDevice=(record)=>{
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
            uloginAccount:"",
            uloginName:"",
        },
        paginationProps:{
            position:['bottomLeft'],
            total:0,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
        },
        selectedRowKeys:[],
        selectedIDs: [],
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
        if(flag==false){
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

    //弹窗2
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

    //弹窗3
    //历史设备
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
                        <Input placeholder={'医生电话'} className={'input1'} onChange={(e)=>{this.inputChange(e,"uloginAccount")}} value={this.state.input.uloginAccount}/>
                        <Input placeholder={'医生姓名'} className={'input1'} onChange={(e)=>{this.inputChange(e,"uloginName")}} value={this.state.input.uloginName}/>
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
                <div >
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        bordered={true}
                        rowSelection={rowSelection}
                        style={{margin:"20px 0",borderBottom:'1px,soild'}}
                        pagination={this.state.paginationProps}
                        onChange={this.handleTableChange}
                        scroll={{ y: '500px',x:'max-content' }}
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
