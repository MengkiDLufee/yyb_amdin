import React, { Component } from 'react'
import {Progress, Table, Button, Input, Space, Modal, Form, Image, Select,TimePicker} from 'antd';
import { DatePicker} from 'antd';
import { Radio } from 'antd';
import { Switch } from 'antd';
import {message} from 'antd'
import moment from 'moment';
import {ReloadOutlined,
  SearchOutlined ,
  PlusOutlined,
  // MinusOutlined,
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
import * as echarts from 'echarts';
const { RangePicker } = DatePicker;
//const { TextArea } = Input;
const { Option } = Select;

// class TestReagentDataTable1 extends Component{
//     columns = [
//         {
//             title: '序号',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//         },
//         {
//             title: '试剂',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '计划日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'超时时间',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'已测试',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modifyReagentData(record)}}>修改</Button>
//                 </Space>
//             ),
//         },
//
//
//     ];
//     state={
//         visible_modify:false,
//         record:{},
//     }
//     modifyReagentData=(record)=>{
//         this.setState({
//             visible_modify:true,
//         });
//     }
//     handleCancle_modify=()=>{
//         this.setState({
//             visible_modify:false,
//         });
//     }
//     handleModifyOk=()=>{
//         this.setState({
//             visible_modify:false,
//         });
//     }
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
//                 <Modal
//                     title={"修改测试计划"}
//                     centered
//                     visible={this.state.visible_modify}
//                     onCancel={this.handleCancle_modify}
//                     onOk={this.handleModifyOk}
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
//                                     label="用户"
//                                     name="用户"
//                                 >
//                                     <span>12312311123</span>
//                                 </Form.Item>
//                                 <Form.Item label="试剂"
//                                            name={"试剂"}
//                                 >
//                                     <span >卵泡</span>
//                                 </Form.Item>
//                                 <Form.Item label="测试集"
//                                            name={"测试集"}
//                                 >
//                                     <span>卵泡</span>
//                                 </Form.Item>
//                                 <Form.Item label="计划时间"
//                                            name={"计划时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入计划时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="计划类型"
//                                            name={"计划类型"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入计划类型!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划类型"} />
//                                 </Form.Item>
//                                 <Form.Item label="超时时间"
//                                            name={"超时时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入超时时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="计划添加原因"
//                                            name={"计划添加原因"}
//                                 >
//                                     <Input  placeholder={"请输入计划添加原因"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
// class TestReagentDataTable2 extends Component{
//     columns = [
//         {
//             title: '序号',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//         },
//         {
//             title: '试剂',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '测试日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '计划日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'数量',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'GOD',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'批号',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'设备号',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'结果',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'测试状态',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'测试图片',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'C线图片',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'C线GOD',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'FSH/LH',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'LH/FSH',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.markButtonModal(record)}}>标曲</Button>
//                 </Space>
//             ),
//         },
//     ];
//     state={
//         visible_lookmark:false,
//     }
//     markButtonModal=()=>{
//         this.setState({
//             visible_lookmark:true,
//         })
//     }
//     handleCancle_mark=()=>{
//         this.setState({
//             visible_lookmark:false,
//         })
//     }
//     handleMarkOk=()=>{
//     this.setState({
//             visible_lookmark:false,
//         })
//     }
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
//                 <Modal
//                     title={"试剂判读参数"}
//                     centered
//                     visible={this.state.visible_lookmark}
//                     onCancel={this.handleCancle_mark}
//                     onOk={this.handleMarkOk}
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
//
//                                 <Form.Item label="批号"
//                                            name={"批号"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入批号!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="试剂类型"
//                                            name={"试剂类型"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入试剂类型!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入试剂类型"} />
//                                 </Form.Item>
//                                 <Form.Item label="生产日期"
//                                            name={"生产日期"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="能效已降低"
//                                     valuePropName="checked">
//                                     <Checkbox>能效已降低</Checkbox>
//                                 </Form.Item>
//                                 <Form.Item label="反应时间（秒）"
//                                            name={"反应时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入反应时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入反应时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_WIDTH"
//                                            name={"LINE_WIDTH"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_WIDTH!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入请输入LINE_WIDTH"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_LENGTH"
//                                            name={"LINE_LENGTH"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_LENGTH!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_LENGTH"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_PX"
//                                            name={"LINE_PX"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_PX!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_PX"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_PY"
//                                            name={"LINE_PY"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_PY!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_PY"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEOR"
//                                            name={"LINEOR"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEOL"
//                                            name={"LINEOL"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEL"
//                                            name={"LINEL"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINER"
//                                            name={"LINER"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="是定性"
//                                     valuePropName="checked">
//                                     <Checkbox>是定性</Checkbox>
//                                 </Form.Item>
//                                 <Form.Item label="定性阴性GOD值"
//                                            name={"定性阴性GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="定性阳性+GOD值"
//                                            name={"定性阳性+GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="定性弱阳性GOD值"
//                                            name={"定性弱阳性GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_NO"
//                                            name={"LINE_NO"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N1"
//                                            name={"LINE_N1"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N2"
//                                            name={"LINE_N2"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N3"
//                                            name={"LINE_N3"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
// class HistoryTestReagentDataTable extends Component{
//     columns = [
//         {
//             title: '序号',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//         },
//         {
//             title: '试剂',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '测试日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '计划日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'数量',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'GOD',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'批号',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'设备号',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'结果',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'测试状态',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'测试图片',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'C线图片',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'C线GOD',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'FSH/LH',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'LH/FSH',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.markButtonModal(record)}}>标曲</Button>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookmodify(record)}}>修改数据</Button>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>日志</Button>
//                 </Space>
//             ),
//         },
//     ];
//     state={
//         visible_lookmark:false,
//         visible_lookmodify:false,
//     }
//     lookmodify=()=>{
//         this.setState({
//             visible_lookmodify:true,
//         })
//     }
//     markButtonModal=()=>{
//         this.setState({
//             visible_lookmark:true,
//         })
//     }
//     handleCancle_mark=()=>{
//         this.setState({
//             visible_lookmark:false,
//         })
//     }
//     handleMarkOk=()=>{
//         this.setState({
//             visible_lookmark:false,
//         })
//     }
//     handleCancle_lookmodify=()=>{
//         this.setState({
//             visible_lookmodify:false,
//         })
//     }
//     handleLookModifyOk=()=>{
//         this.setState({
//             visible_lookmodify:false,
//         })
//     }
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
//                 <Modal
//                     title={"试剂判读参数"}
//                     centered
//                     visible={this.state.visible_lookmark}
//                     onCancel={this.handleCancle_mark}
//                     onOk={this.handleMarkOk}
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
//
//                                 <Form.Item label="批号"
//                                            name={"批号"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入批号!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="试剂类型"
//                                            name={"试剂类型"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入试剂类型!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入试剂类型"} />
//                                 </Form.Item>
//                                 <Form.Item label="生产日期"
//                                            name={"生产日期"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="能效已降低"
//                                     valuePropName="checked">
//                                     <Checkbox>能效已降低</Checkbox>
//                                 </Form.Item>
//                                 <Form.Item label="反应时间（秒）"
//                                            name={"反应时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入反应时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入反应时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_WIDTH"
//                                            name={"LINE_WIDTH"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_WIDTH!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入请输入LINE_WIDTH"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_LENGTH"
//                                            name={"LINE_LENGTH"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_LENGTH!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_LENGTH"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_PX"
//                                            name={"LINE_PX"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_PX!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_PX"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_PY"
//                                            name={"LINE_PY"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入LINE_PY!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入LINE_PY"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEOR"
//                                            name={"LINEOR"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEOL"
//                                            name={"LINEOL"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINEL"
//                                            name={"LINEL"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINER"
//                                            name={"LINER"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="是定性"
//                                     valuePropName="checked">
//                                     <Checkbox>是定性</Checkbox>
//                                 </Form.Item>
//                                 <Form.Item label="定性阴性GOD值"
//                                            name={"定性阴性GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="定性阳性+GOD值"
//                                            name={"定性阳性+GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="定性弱阳性GOD值"
//                                            name={"定性弱阳性GOD值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_NO"
//                                            name={"LINE_NO"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N1"
//                                            name={"LINE_N1"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N2"
//                                            name={"LINE_N2"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="LINE_N3"
//                                            name={"LINE_N3"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"修改数据"}
//                     centered
//                     visible={this.state.visible_lookmodify}
//                     onCancel={this.handleCancle_lookmodify}
//                     onOk={this.handleLookModifyOk}
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
//
//                                 <Form.Item label="数值"
//                                            name={"数值"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入批号!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="GOD"
//                                            name={"GOD"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入试剂类型!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入试剂类型"} />
//                                 </Form.Item>
//                                 <Form.Item label="CGOD"
//                                            name={"CGOD"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入生产日期!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
// class TestReagentQuestionDataTable extends Component{
//     columns = [
//         {
//             title: '试剂',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '计划日期',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'测试日期',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'条码',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'错误类型',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'问题图片',
//             dataIndex:'patient_createTime',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//
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
//
// class TestTimesDataTable extends Component{
//     columns = [
//         {
//             title: '测试类型',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '测试次数',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'operation',
//             width:150,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestDataLineButton2(record)}}>历史测试数据</Button>
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
//     state=
//         {
//             visible_historyTestDataLineButton:false,
//             historyTestReagentData:[{}],
//             record:[],
//         }
//     lookHistoryTestDataLineButton2=()=>{
//         this.setState({
//             visible_historyTestDataLineButton2: true,
//         });
//     }
//     handleCancle_historyTestDataLineButton2=()=>{
//         this.setState({
//             visible_historyTestDataLineButton2:false,
//         });
//     }
//     handleTableChange = (pagination) =>{
//         console.log(pagination)
//     };
//     setHistoryTestReagentData=(data)=>{
//         this.setState({
//             historyTestReagentData:data,
//         })
//     }
//     historyTestReagentDataTable = ()=>{
//         return(
//             <HistoryTestReagentDataTable
//                 data={this.state.historyTestReagentData}
//                 dataChange={this.setHistoryTestReagentData}
//             />
//         );
//     }
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
//                 />
//                 <Modal
//                     title={"测试试剂数据"}
//                     centered
//                     visible={this.state.visible_historyTestDataLineButton2}
//                     onCancel={this.handleCancle_historyTestDataLineButton2}
//                     footer={null}
//                     className="modal1"
//                     width={1350}
//                 >
//                     <p>用户名 123132</p>
//                     <p>测试类型   卵巢</p>
//                     <p>这里有张图片</p>
//                     {this.historyTestReagentDataTable()}
//                 </Modal>
//             </div>
//         );
//     }
// }

// class HistoryTestDataTable extends Component{
//     columns = [
//         {
//             title: '周期开始时间',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '周期结束时间',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'操作',
//             dataIndex:'operation',
//             width:150,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestDataLineButton(record)}}>查看</Button>
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
//     state=
//         {
//             visible_historyTestDataLineButton:false,
//             testTimesData:[{}],
//             record:[],
//         }
//     lookHistoryTestDataLineButton=()=>{
//         this.setState({
//             visible_historyTestDataLineButton: true,
//         });
//     }
//     handleCancle_testReagentQuestionData=()=>{
//         this.setState({
//             visible_testReagentQuestionData: false,
//         });
//     }
//     testReagentQuestionDataTable = ()=>{
//         return(
//             <TestReagentQuestionDataTable
//                 data={this.state.testReagentQuestionData}
//                 dataChange={this.setTestReagentQuestionData}
//             />
//         );
//     }
//     setTestReagentQuestionData=(data)=>{
//         this.setState({
//             testReagentQuestionData:data,
//         });
//     }
//     handleCancle_historyTestDataLineButton=()=>{
//         this.setState({
//             visible_historyTestDataLineButton:false,
//         });
//     }
//     handleTableChange = (pagination) =>{
//         console.log(pagination)
//     };
//     setTestTimesData=(data)=>{
//         this.setState({
//             testTimesData:data,
//         });
//     }
//     testTimesDataTable = ()=>{
//         return(
//             <TestTimesDataTable
//                 data={this.state.testTimesData}
//                 dataChange={this.setTestTimesData}
//             />
//         );
//     }
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
//                 />
//                 <Modal
//                     title={"测试次数"}
//                     centered
//                     visible={this.state.visible_historyTestDataLineButton}
//                     onCancel={this.handleCancle_historyTestDataLineButton}
//                     footer={null}
//                     className="modal1"
//                 >
//                     <p>用户名 123132</p>
//                     <p>时间   2020年07月01日-2020年07月02日</p>
//                     {this.testTimesDataTable()}
//                 </Modal>
//                 <Modal
//                     title={"查看日志"}
//                     centered
//                     visible={this.state.visible_testReagentQuestionData}
//                     onCancel={this.handleCancle_testReagentQuestionData}
//                     footer={null}
//                     width={800}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                         {this.testReagentQuestionDataTable()}
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
//
// class TestDataTable extends Component{
//     columns = [
//         {
//             title: '测试类型',
//             dataIndex: 'patient_accountNumber',
//             width:150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title: '测试次数',
//             dataIndex: 'patient_age',
//             width: 150,
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'本次测试是否完成',
//             dataIndex:'patient_address',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'本次测试结论',
//             dataIndex:'patient_testState',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'本次测试时间',
//             dataIndex:'patient_createTime',
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
//             width:150,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookTestReagentData(record)}}>测试试剂数据</Button>
//                     <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.lookTestReagentQuestionData(record)}}>测试试剂问题数据</Button>
//                 </Space>
//             ),
//         },
//     ];
//     state=
//     {
//         visible_testReagentQuestionData:false,
//         visible_testReagentData:false,
//         visible_addPlan:false,
//         testReagentQuestionData:[{}],
//         testReagentData1:[{}],
//         testReagentData2:[{}],
//         record:[],
//     }
//     lookTestReagentQuestionData=(record)=>{
//         this.setState({
//             visible_testReagentQuestionData:true,
//             record:record,
//         });
//     }
//     lookTestReagentData=(record)=>{
//         this.setState({
//             visible_testReagentData:true,
//             record:record,
//         });
//     }
//     handleCancle_testReagentQuestionData=()=>{
//         this.setState({
//             visible_testReagentQuestionData: false,
//         });
//     }
//     handleCancle_testReagentData=()=>{
//         this.setState({
//             visible_testReagentData: false,
//         });
//     }
//     testReagentQuestionDataTable = ()=>{
//         return(
//             <TestReagentQuestionDataTable
//                 data={this.state.testReagentQuestionData}
//                 dataChange={this.setTestReagentQuestionData}
//             />
//         );
//     }
//     testReagentDataTable1 = ()=>{
//         return(
//             <TestReagentDataTable1
//                 data={this.state.testReagentData1}
//                 dataChange={this.setTestReagentData1}
//             />
//         );
//     }
//     testReagentDataTable2 = ()=>{
//         return(
//             <TestReagentDataTable2
//                 data={this.state.testReagentData2}
//                 dataChange={this.setTestReagentData2}
//             />
//         );
//     }
//     setTestReagentQuestionData=(data)=>{
//         this.setState({
//             testReagentQuestionData:data,
//         });
//     }
//     setTestReagentData1=(data)=>{
//         this.setState({
//             testReagentData1:data,
//         });
//     }
//     setTestReagentData2=(data)=>{
//         this.setState({
//             testReagentData2:data,
//         });
//     }
//     addPlan=()=>{
//         this.setState({
//             visible_addPlan:true,
//         });
//     }
//     handleCancle_addPlan=()=>{
//         this.setState({
//             visible_addPlan:false,
//         });
//     }
//     handleAddPlanOk=()=>{
//         this.setState({
//             visible_addPlan:false,
//         });
//         this.state.form.submit();
//     }
//     onFinish = values => {
//         console.log('Success:', values);
//     };
//
//     onFinishFailed = errorInfo => {
//         console.log('Failed:', errorInfo);
//     };
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
//                 <Modal
//                     title={"添加测试计划"}
//                     centered
//                     visible={this.state.visible_addPlan}
//                     onCancel={this.handleCancle_addPlan}
//                     onOk={this.handleAddPlanOk}
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
//                                 name="addPlan"
//                                 onFinish={this.onFinish}
//                                 onFinishFailed={this.onFinishFailed}
//                             >
//                                 <Form.Item
//                                     label="用户"
//                                     name="用户"
//                                 >
//                                     <span>12312311123</span>
//                                 </Form.Item>
//                                 <Form.Item label="试剂"
//                                            name={"试剂"}
//                                 >
//                                     <span >卵泡</span>
//                                 </Form.Item>
//                                 <Form.Item label="测试集"
//                                            name={"测试集"}
//                                 >
//                                     <span>卵泡</span>
//                                 </Form.Item>
//                                 <Form.Item label="计划时间"
//                                            name={"计划时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入计划时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="计划类型"
//                                            name={"计划类型"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入计划类型!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入计划类型"} />
//                                 </Form.Item>
//                                 <Form.Item label="超时时间"
//                                            name={"超时时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入超时时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入超时时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="计划添加原因"
//                                            name={"计划添加原因"}
//                                 >
//                                     <Input  placeholder={"请输入计划添加原因"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"测试试剂问题数据"}
//                     centered
//                     visible={this.state.visible_testReagentQuestionData}
//                     onCancel={this.handleCancle_testReagentQuestionData}
//                     footer={null}
//                     width={800}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                         {this.testReagentQuestionDataTable()}
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"测试试剂数据"}
//                     centered
//                     visible={this.state.visible_testReagentData}
//                     onCancel={this.handleCancle_testReagentData}
//                     footer={null}
//                     width={1200}
//                 >
//                     <div>
//                         <div>
//                             <span className={"span1"}>用户名    1512252366</span>
//                         </div>
//                         <div>
//                             <span className={"span1"}>测试类型  卵巢功能评估</span>
//                         </div>
//                         <div>
//                             这里有一个表，后面做
//                         </div>
//                     </div>
//
//                     <div>
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined  className="icon1" />}
//                             onClick={this.addPlan}
//                             className="button3"
//                             block
//                         >
//                             添加计划
//                         </Button>
//                         <div style={{height:'100%',margin:'3px'}}>
//                             {this.testReagentDataTable1()}
//                         </div>
//                     </div>
//
//                     <div>
//                         <div>
//                             <span className={"span1"}>测试数据</span>
//                         </div>
//                         <div style={{height:'100%',margin:'3px'}}>
//                             {this.testReagentDataTable2()}
//                         </div>
//                     </div>
//
//                 </Modal>
//             </div>
//         );
//     }
// }

// class PatientTable extends Component{
//     columns = [
//         {
//             title:'姓名',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'用户名',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'当前使用设备',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'生理周期',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'末次月经周期天数',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'末次月经时间',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'注册时间',
//             dataIndex:'doctor_phone',
//             width:150,
//             align:'center',
//             sorter: {
//                 compare: (a, b) => a.patient_name - b.patient_name,
//                 multiple: 3,
//             },
//         },
//         {
//             title:'中止优孕宝测试',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             render:()=>(
//                 <Switch checkedChildren="是" unCheckedChildren="否" />
//             )
//         },
//         {
//             title:'上传日志',
//             dataIndex:'doctor_name',
//             width:150,
//             align:'center',
//             render:()=>(
//                 <Switch checkedChildren="是" unCheckedChildren="否" />
//             )
//         },
//         {
//             title:'操作',
//             dataIndex:'operation',
//             width:300,
//             align:'center',
//             render:(text,record)=>(
//                 <Space>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookTestData(record)}}>测试数据</Button>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestData(record)}}>历史测试数据</Button>
//                     <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookSendEvent(record)}}>发送事件</Button>
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
//         visible_latestData:false,
//         visible_testData:false,
//         visible_historyTestData:false,
//         visible_sendEvent:false,
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
//         latestData:[{},{}],
//         testData:[{},{}],
//         historyTestData:[{}],
//         singleSelectValue:1,
//     }
//     lookTestData=(record)=>{
//         this.setState({
//             visible_testData:true,
//             record:record,
//         });
//     }
//     lookHistoryTestData=(record)=>{
//         this.setState({
//             visible_historyTestData:true,
//             record:record,
//         });
//     }
//     lookSendEvent=(record)=>{
//         this.setState({
//             visible_sendEvent:true,
//             record:record,
//         });
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
//     handleCancle_testData=()=>{
//         this.setState({
//             visible_testData:false,
//         })
//     }
//     handleCancle_historyTestData=()=>{
//         this.setState({
//             visible_historyTestData:false,
//         })
//     }
//     handleCancle_sendEvent=()=>{
//         this.setState({
//             visible_sendEvent:false,
//         })
//     }
//     handleOk_sendEvent=()=>{
//         this.setState({
//             visible_sendEvent:false,
//         })
//     }
//     testDataTable = ()=>{
//         return(
//             <TestDataTable
//                 data={this.state.testData}
//                 dataChange={this.setTestData}
//             />
//         );
//     }
//     historyTestDataTable = ()=>{
//         return(
//             <HistoryTestDataTable
//                 data={this.state.historyTestData}
//                 dataChange={this.setHistoryTestData}
//             />
//         );
//     }
//     setTestData=(data)=>{
//         this.setState({
//             testData:data,
//         });
//     }
//     setHistoryTestData=(data)=>{
//         this.setState({
//             historyTestData:data,
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
//                 />
//                 <Modal
//                     title={"测试数据"}
//                     centered
//                     visible={this.state.visible_testData}
//                     onCancel={this.handleCancle_testData}
//                     footer={null}
//                     width={800}
//                 >
//                     <div style={{height:'100%',margin:'3px'}}>
//                         <p><span className={"span2"}>用户名 {this.state.record.doctor_name}</span></p>
//                         {this.testDataTable()}
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"历史测试数据"}
//                     centered
//                     visible={this.state.visible_historyTestData}
//                     onCancel={this.handleCancle_historyTestData}
//                     footer={null}
//                     width={800}
//                 >
//                     <div style={{height:'100%',margin:'3px',}}>
//                         <span className={"span2"}>用户名 {this.state.record.doctor_name}</span>
//                         <Button
//                             type={"primary"}
//                             onClick={this.looklog}
//                             className={"button3"}
//                         >
//                             查看日志
//                         </Button>
//                         {this.historyTestDataTable()}
//                     </div>
//                 </Modal>
//                 <Modal
//                     title={"发送事件"}
//                     centered
//                     visible={this.state.visible_sendEvent}
//                     onCancel={this.handleCancle_sendEvent}
//                     onOk={this.handleOk_sendEvent}
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
//                                 <Form.Item label="时间"
//                                            name={"时间"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入时间!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入时间"} />
//                                 </Form.Item>
//                                 <Form.Item label="事件"
//                                            name={"事件"}
//                                            rules={[
//                                                {
//                                                    required: true,
//                                                    message: '请输入事件!',
//                                                },
//                                            ]}
//                                 >
//                                     <Input  placeholder={"请输入事件"} />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }
// class UserManagement2 extends Component {
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
//     reset=()=>{
//         this.setState({
//             doctorsData:[],
//         })
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
//                     <div>
//                         <span className={"span1"}>用户人数：{2331}</span>
//                     </div>
//                     <div  >
//                         <Input placeholder={'姓名'} className={'input1'}/>
//                         <Input placeholder={'电话'} className={'input1'}/>
//                         <Input placeholder={'当前使用设备'} className={'input1'}/>
//                         <Input placeholder={'测试时间'} className={'input1'}/>
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
//                     <div>
//                         <Radio.Group onChange={this.singleSelectonChange} value={this.state.singleSelectValue}>
//                             <Radio value={1}><span className={"span2"}>全部</span></Radio>
//                             <Radio value={2}><span className={"span2"}>有效用户</span></Radio>
//                             <Radio value={3}><span className={"span2"}>今日已测试用户</span></Radio>
//                             <Radio value={4}><span className={"span2"}>今日有测试计划用户</span></Radio>
//                             <Radio value={4}><span className={"span2"}>今日漏测用户</span></Radio>
//                             <Radio value={4}><span className={"span2"}>今日报警用户</span></Radio>
//                         </Radio.Group>
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
//查看日志
//历史测试数据 修改数据
/****************** */
//历史测试数据 精液液化 详细数据
class Modal14 extends Component{
  //初始化
  constructor(props) {
      super(props);
      this.search();
  }

  //表格1数据以及函数
  //常量数据部分

  columns = [
      {
          title: '试剂',
          dataIndex: 'paperName',
          width:150,
      },
      {
          title: '测试日期',
          dataIndex: 'testDate',
          width:150,
      },
      {
          title: '设备号',
          dataIndex: 'deviceNo',
          width:150,
      },
      {
        title: '数值',
        dataIndex: 'value',
        width:150,
      },
      {
        title:'测试图片',
        dataIndex:'testPicPathAli',
        width:150,
        align:'center',
        render: (text) =>
          //   ////console.log("record的内容",record)
          //<img src={text} width="100px" alt=""/>
          <Image src={text} width="100px" alt=""/>
      },
      // {
      // 		title:'数值',
      // 		dataIndex:'operation',
      // 		width:150,
      // 		align:'center',
      // 		render:(text,record)=>(
      // 			<Space>
      // 					<Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal8(record)}}>查看</Button>
      // 			</Space>
      // 		),
      // },
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
      let url="/user/test/data/semen/his/data/list/"
        +this.props.record.eupregnaTestHisId
      //console.log("request:",data);
      ajax(url, {},'GET')
        .then((response)=>{
            console.log("response:",response);
            if(response.data.data==null)
                console.log("查询失败");
            else{
                let data=response.data.data.info;
                if(data===undefined){
                  data=response.data.data
                }
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
            //绘制图表
            ajax("/user/test/data/semen/canvas/data/his/"
            +this.props.record.eupregnaTestHisId, {},'GET')
            .then((response)=>{
                console.log(response)
                if(response.data.data===null){
                    message.error("查询失败！")
                    console.log('error',response)
                }else{
                  if(!response.data.data.isData){
                    message.info('无画图数据')
                    return 0
                  }
                  //console.log(response)
                  let data=response.data.data;
                  this.setState({
                    data3:data,
                 },()=>{
                   console.log('data3:',this.state.data3.paperName)
                   //画图
                   let chartDom = document.getElementById('figure4');
                   let myChart = echarts.init(chartDom);
                   let option;

                   option = {
                       xAxis: {
                           type: 'category',
                           data: this.state.data3.xData,
                           //boundaryGap: false,
                          //  "axisLabel":{
                          // 	 interval: 0

                          // 	 }
                       },
                       yAxis: {
                           type: 'value'
                       },
                       tooltip: {
                         trigger: 'axis'
                       },
                       legend: {
                         data: this.state.data3.paperName
                       },
                       series: [{
                           name: this.state.data3.paperName[0],
                           data: this.state.data3.data,
                           type: 'line'
                       }]
                   };

                   option && myChart.setOption(option);
                 });

                }
            });
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
      ],
      record:{
          loginName:"",
      },

      //表格2数据


  };

  //弹窗函数

  render(){
      return(
        <div>
            <Modal
              title={"历史测试数据"}
              centered
              visible={this.props.visible}
              onCancel={this.handleCancel}
              footer={null}
              width={1000}
            >
                <div style={{height:'100%',margin:'3px'}}>
                <div>
            <div>
              <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}</span>
            </div>
            <div>
              <span className={"span1"}>测试类型&nbsp; {this.props.record.testTypeName}</span>
            </div>
            <div>
                        <div id="figure4" style={{ width: '100%', height: 500 }}></div>
            </div>
          </div>
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
//精液液化 详细数据
class Modal13 extends Component{
  //初始化
  constructor(props) {
      super(props);
      this.search();
  }

  //表格1数据以及函数
  //常量数据部分

  columns = [
      {
          title: '测试日期',
          dataIndex: 'testDate',
          width:150,
      },
      {
          title: '设备号',
          dataIndex: 'deviceNo',
          width:150,
      },
      {
        title: '数值',
        dataIndex: 'value',
        width:150,
      },
      {
        title:'测试图片',
        dataIndex:'testPicPathAli',
        width:150,
        align:'center',
        render: (text) =>
          //   ////console.log("record的内容",record)
          //<img src={text} width="100px" alt=""/>
          <Image src={text} width="100px" alt=""/>
      },
      // {
      // 		title:'数值',
      // 		dataIndex:'operation',
      // 		width:150,
      // 		align:'center',
      // 		render:(text,record)=>(
      // 			<Space>
      // 					<Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal8(record)}}>查看</Button>
      // 			</Space>
      // 		),
      // },
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
      let url="/user/test/data/semen/test/data/list/"
        +this.props.record.eupregnaTestId
      //console.log("request:",data);
      ajax(url, {},'GET')
        .then((response)=>{
            console.log("response:",response);
            if(response.data.data==null)
                console.log("查询失败");
            else{
                let data=response.data.data.info;
                if(data===undefined){
                  data=response.data.data
                }
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
            //绘制图表
            ajax("/user/test/data/canvasCharts/"
            +this.props.record.eupregnaTestId, {},'GET')
            .then((response)=>{
                console.log(response)
                if(response.data.data===null){
                    message.error("查询失败！")
                    console.log('error',response)
                }else{
                  if(!response.data.data.isData){
                    message.info('无画图数据')
                    return 0
                  }
                  //console.log(response)
                  let data=response.data.data;
                  this.setState({
                    data3:data,
                 },()=>{
                   console.log('data3:',this.state.data3.paperName)
                   //画图
                   let chartDom = document.getElementById('figure13');
                   let myChart = echarts.init(chartDom);
                   let option;

                   option = {
                       xAxis: {
                           type: 'category',
                           data: this.state.data3.xData,
                           //boundaryGap: false,
                          //  "axisLabel":{
                          // 	 interval: 0

                          // 	 }
                       },
                       yAxis: {
                           type: 'value'
                       },
                       tooltip: {
                         trigger: 'axis'
                       },
                       legend: {
                         data: [this.state.data3.paperName[0]]
                       },
                       series: [{
                           name: this.state.data3.paperName[0],
                           data: this.state.data3.data,
                           type: 'line'
                       }]
                   };

                   option && myChart.setOption(option);
                 });

                }
            });
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
      ],
      record:{
          loginName:"",
      },

      //表格2数据


  };

  //弹窗函数
  //弹窗1
  //测试试剂数据
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
      console.log('?')
      this.setState({
          modalVisible:true,
          record:record,
      });
  }
  //弹窗6
  //测试问题数据弹窗
  Modal6 = ()=>{
      if(this.state.modalVisible6)
          return(
            <Modal6
              record={this.state.record6}
              visible={this.state.modalVisible6}
              setVisible={this.setModalvisible6}
            />
          );
  }
  setModalvisible6=(flag)=>{
      this.setState({
          modalVisible6:flag,
      });
  }
  lookModal6=record=>{
      this.setState({
          modalVisible6:true,
          record6:record,
      });
  }
  //弹窗8
  //测试次数弹窗
  Modal8 = ()=>{
      if(this.state.modalVisible8)
          return(
            <Modal8
              record={this.state.record8}
              visible={this.state.modalVisible8}
              setVisible={this.setModalvisible8}
            />
          );
  }
  setModalvisible8=(flag)=>{
      this.setState({
          modalVisible8:flag,
      });
  }
  lookModal8=record=>{
      this.setState({
          modalVisible8:true,
          record8:record,
      });
  }
  //弹窗10
  //测试次数弹窗
  Modal10 = ()=>{
      if(this.state.modalVisible10)
          return(
            <Modal10
              record={this.state.record10}
              visible={this.state.modalVisible10}
              setVisible={this.setModalvisible10}
            />
          );
  }
  setModalvisible10=(flag)=>{
      this.setState({
          modalVisible10:flag,
      });
  }
  lookModal10=()=>{
      this.setState({
          modalVisible10:true,
          record10:this.props.record,
      });
  }
  render(){
      return(
        <div>
            <Modal
              title={"历史测试数据"}
              centered
              visible={this.props.visible}
              onCancel={this.handleCancel}
              footer={null}
              width={1000}
            >
                <div style={{height:'100%',margin:'3px'}}>
                <div>
            <div>
              <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}</span>
            </div>
            <div>
              <span className={"span1"}>测试类型&nbsp; {this.props.record.testType}</span>
            </div>
            <div>
                        <div id="figure13" style={{ width: '100%', height: 500 }}></div>
            </div>
          </div>
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
//修改用户信息
class Modal12 extends Component{
  //初始化
  constructor(props) {
    super(props);
    console.log("record",this.props.record)
    let input = {}
    // input.planTime = this.props.record.planTime
    // input.timeout = this.props.record.timeout
    // input.planResume = this.props.record.planResume
    Object.assign(input,this.props.record)
    let planTime=this.props.record.planTime;
    let mymoment = '';
    console.log('修改input',input);
    if(planTime!==null)mymoment = moment(planTime,'YYYY-MM-DD HH:mm:ss');
    this.state={
      planTime:mymoment,
      input:input
    }
  }
  componentDidMount = ()=>{
    this.form.current.setFieldsValue(this.state.input)
  }

  //表格1数据以及函数
  //常量数据部分

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
                  if(this.state.input[myInput[ii]]===true){
                    data[myInput[ii]]=1;
                  }
                  if(this.state.input[myInput[ii]]===false){
                    data[myInput[ii]]=0;
                  }
        }
        data.eupregnaTestPaperDataId = this.props.record.eupregnaTestPaperDataId;
        //data.patientId=this.props.record.patientId;
        //data.loginId=this.props.record.loginId;
        let url="/user/base/info/modify";
        console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
                  console.log(response)
          if(response.data.code!==1004){
            console.log("请求错误！",response);
          }else{
            //form.resetFields();
            console.log("修改成功：",response);
            //Object.assign(this.props.record,this.state.input);
            message.success('修改成功')
            this.props.setVisible(false);

          }
        });
      })
      .catch((e) => {
        console.log('Validate Failed:', e);
      });
  };
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
  //产生input框
  getInput = (labelName,valueName,required)=>{
    let myMessage1 = '请输入'+ labelName +'!'
    let myPlaceholder = '请输入'+ labelName
    if(required){
      return(
        <Form.Item label={labelName}
              name={valueName}
              rules={[
                {
                  required: true,
                  message: myMessage1,
                },
              ]}
        >
          <Input  placeholder={myPlaceholder}onChange={(e)=>{this.inputChange(e,valueName)}}
              value={this.state.input[valueName]}
          />
        </Form.Item>
      )
    }else{
      return(
        <Form.Item label={labelName}
              name={valueName}
              rules={[
              ]}
        >
          <Input  placeholder={myPlaceholder}onChange={(e)=>{this.inputChange(e,valueName)}}
              value={this.state.input[valueName]}
          />
        </Form.Item>
      )
    }

  }
  //单选框变化回调
  RadioInputChange = (e,name) => {
    //console.log(name);
    //console.log(e.target.value);
    let source={};
    source[name]=e.target.value;
    this.setState({
      input:Object.assign(this.state.input,source),
    })
  }
  //时间选择函数
  rangePickerOnChange=(value, dateString,valueName)=>{
    console.log('Selected Time: ', value);
    //console.log('Formatted Selected Time: ', dateString);
    let input = {};
    let state = {};
    Object.assign(input, this.state.input)
    Object.assign(state, this.state)
        if(valueName==='manBirthday'||valueName==='womanBirthday'||valueName==='preferTestTime'){
          input[valueName]=dateString;
        }else{
          input[valueName]=dateString+' 00:00:00';
        }
    state.input = input
    state[valueName] = value
    this.setState(state)
  }
  //生成时间选择框
  getRangePicker = (labelName,valueName,required,showTime)=>{
    let myname = 'my'+valueName
    let myMessage2 = '请选择'+labelName+'!'

    let tmp=this.state.input[valueName];
    let mymoment = '';
    //console.log('修改input',input);
    if(tmp!==null)mymoment = moment(tmp,'YYYY-MM-DD HH:mm:ss');
        if(valueName==='preferTestTime'){
          return(
            <Form.Item label={labelName}
                        initialValue={mymoment}
                        name={myname}
                        rules={[
                            {
                                required: required,
                                message: myMessage2,
                            },
                        ]}
            >
                <TimePicker
                onChange={(value, dateString)=>
                {this.rangePickerOnChange(value, dateString,valueName)}}
                value={this.state[valueName]}/>
            </Form.Item>
          )
        }
    return(
      <Form.Item label={labelName}
            initialValue={mymoment}
            name={myname}
            rules={[
              {
                required: required,
                message: myMessage2,
              },
            ]}
      >
        <DatePicker showTime={showTime}
        onChange={(value, dateString)=>
        {this.rangePickerOnChange(value, dateString,valueName)}}
        value={this.state[valueName]}/>
      </Form.Item>
    )
  }
      //选择框
    selectChange =(e,Option) => {
        console.log(e)
        console.log(Option)
        this.setState({
            input:Object.assign(this.state.input,{[Option.title]:e})
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
    let url="/user/test/data/list/"
      +this.props.record.clientId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗1
  //测试试剂数据
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
    console.log('?')
    this.setState({
      modalVisible:true,
      record:record,
    });
  }
  //弹窗2

  form = React.createRef();
  render(){
    return(
      <div>
        <Modal
        title={"修改用户信息"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        okText={'提交'}
        cancelText={'取消'}
        className="modal1"
        >
          <div className="ant-modal-body" >
            <div className="modal-body" style={{height:"500px"}}>
              <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              name="addPlan"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.form}//表单验证，通过ref获取

              >
                {this.getInput('用户名','userName',true)}
                {this.getInput('手机号','phone',true)}
                {this.getInput('姓名','femaleName',true)}
                <Form.Item label="性别"
                     name={"gender"}
                     rules={[
                       {
                         required: true,
                         message: '请选择性别!',
                       },
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"gender")}} value={this.state.input.gender}>
                  <Radio value={'M'}><span className={"span2"}>男</span></Radio>
                  <Radio value={'F'}><span className={"span2"}>女</span></Radio>
                </Radio.Group>
                </Form.Item>
                {this.getInput('用户昵称','nickName',true)}
                {this.getInput('密码','password',true)}
                {this.getInput('用户备注','userRemark',true)}
                {this.getInput('男方年龄','manAge',true)}
                {this.getInput('女方年龄','womanAge',true)}
                {this.getRangePicker('男方生日','manBirthday',true,false)}
                {this.getRangePicker('女方生日','womanBirthday',true,false)}
                {this.getRangePicker('末次月经时间','lastBleeding',true,false)}
                {this.getInput('末次月经天数','lastCycleNumber',true)}
                {this.getInput('生理周期','cycle',true)}
                {this.getRangePicker('用药日期','preferTestTime',true,false)}

                <Form.Item
                label="测试状态"
                name="testStatus"
                rules={[{ required: true ,message:"请选择测试状态"}]}//设置验证规则
                >
                <Select placeholder="请选择测试状态"
                    onChange={this.selectChange}
                    style={{width:'100%'}}
                    value={this.state.input.testStatus}
                >
                  <Option title="testStatus" value={null}>请选择测试状态</Option>
                  <Option title="testStatus" value="suspend">暂停测试</Option>
                  <Option title="testStatus" value="finished">测试完成</Option>
                  <Option title="testStatus" value="testing">测试中</Option>
                </Select>
                </Form.Item>
                {/* {this.getInput('状态','status',true)} */}
                {this.getInput('邮箱','email',true)}
                {this.getInput('地址','address',true)}
                {this.getRangePicker('注册时间','regTime',true,false)}
                              <Form.Item
                label="注册状态"
                name="regStatus"
                rules={[{ required: true ,message:"请选择测试状态"}]}//设置验证规则
                >
                <Select placeholder="请选择注册状态"
                    onChange={this.selectChange}
                    style={{width:'100%'}}
                    value={this.state.input.regStatus}
                >
                  <Option title="regStatus" value={''}>请选择注册状态</Option>
                  <Option title="regStatus" value="USER_CREATED">已创建</Option>
                  <Option title="regStatus" value="USER_BINDED">已绑定</Option>
                  <Option title="regStatus" value="USER_REGISTERED">已注册</Option>
                </Select>
                </Form.Item>
                              <Form.Item label="测试账号"
                     name={"testAccount"}
                     rules={[
                       {
                         required: true,
                         message: '请选择测试账号!',
                       },
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"testAccount")}}
                                value={this.state.input.testAccount}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                {this.getInput('医生','doctor',true)}
                {this.getInput('最短生理周期','minCycle',true)}
                {this.getInput('最长生理周期','maxCycle',true)}
                {this.getInput('婚龄','marriedYears',true)}
                {this.getInput('生育疾病','pregnantIllness',true)}
                              <Form.Item label="是否有过生育"
                     name={"hasBearing"}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"hasBearing")}} value={this.state.input.hasBearing}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                              <Form.Item label="是否做过孕检"
                     name={"hasPregnantCheck"}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"hasPregnantCheck")}} value={this.state.input.hasPregnantCheck}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                              <Form.Item label="是否有生育疾病"
                     name={"hasPregnantIllness"}
                     rules={[
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"hasPregnantIllness")}} value={this.state.input.hasPregnantIllness}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                {this.getInput('常见生理周期','commonCycle',true)}
                              {this.getRangePicker('免打扰开始时间','dndTimeStart',true,false)}
                              {this.getRangePicker('免打扰结束时间','dndTimeEnd',true,false)}
                              <Form.Item label="终止测试"
                     name={"ended"}
                     rules={[
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"ended")}} value={this.state.input.ended}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                              <Form.Item label="终止优孕宝测试"
                     name={"eupregnaEnded"}
                     rules={[
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"eupregnaEnded")}} value={this.state.input.eupregnaEnded}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                              <Form.Item label="指导类型"
                     name={"schemeType"}
                     rules={[
                     ]}
                >
                                <Select placeholder="请选择指导类型"
                    onChange={this.selectChange}
                                        style={{width:'100%'}}
                    value={this.state.input.schemeType}
                >
                  <Option title="schemeType" value={''}>请选择指导类型</Option>
                  <Option title="schemeType" value="no_scheme">不指导，任意测</Option>
                  <Option title="schemeType" value="scheme_nomal">正常</Option>
                </Select>
                </Form.Item>
                              {this.getInput('当前使用设备','userDeviceId',true)}
                              {this.getInput('用户号','userNo',true)}
                              <Form.Item label="是否上传日志"
                     name={"uploadLogFlag"}
                     rules={[
                     ]}
                >
                <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"uploadLogFlag")}} value={this.state.input.uploadLogFlag}>
                  <Radio value={false}><span className={"span2"}>否</span></Radio>
                  <Radio value={true}><span className={"span2"}>是</span></Radio>
                </Radio.Group>
                </Form.Item>
                              <Form.Item label={'环信用户账号'}
                              >
                                {this.state.input.phone}
                              </Form.Item>
                {this.getInput('环信密码','csoPassword',true)}
                {/* {this.getInput('QQOpenID','qqOpenId',true)} */}
                {this.getInput('微信OpenID','wechat',true)}
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
//修改测试计划
class Modal11 extends Component{
  //初始化
  constructor(props) {
    super(props);
    console.log("record",this.props.record)
    let input = {};
    Object.assign(input,this.props.record);
    this.state = {
      input:input
    }
  }

  //表格1数据以及函数
  //常量数据部分

  //函数部分
  //弹窗关闭函数
  handleCancel= ()=>{
    this.props.setVisible(false);
  }
  //点击完成
  handleOk = () => {
    console.log('修改???')
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
        data.eupregnaTestPaperDataHisId = this.props.record.eupregnaTestPaperDataHisId;
        //data.patientId=this.props.record.patientId;
        //data.loginId=this.props.record.loginId;
        let url="/user/test/data/modify/data";
        console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          console.log("???",response);
          if(response.data.code!==1004){
            console.log("请求错误！",response);
          }else{
            //form.resetFields();
            console.log("修改成功：",response);
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
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
    let url="/user/test/data/list/"
      +this.props.record.clientId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗2

  form = React.createRef();
  render(){
    return(
      <div>
        <Modal
        title={"修改测试计划"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
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
              name="addPlan"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.form}//表单验证，通过ref获取
              initialValues={this.state.input}
              >
                <Form.Item label="数值"
                     name={"value"}
                     rules={[
                     ]}
                >
                  <Input  placeholder={"请输入数值"} onChange={(e)=>{this.inputChange(e,"value")}}
                      value={this.state.input.value}
                  />
                </Form.Item>
                <Form.Item label="GOD"
                     name={"tgod"}
                     rules={[
                     ]}
                >
                  <Input  placeholder={"请输入GOD"} onChange={(e)=>{this.inputChange(e,"tgod")}}
                      value={this.state.input.tgod}
                  />
                </Form.Item>
                <Form.Item label="CGOD"
                     name={"cgod"}
                     rules={[
                     ]}
                >
                  <Input  placeholder={"CGOD"} onChange={(e)=>{this.inputChange(e,"cgod")}}
                      value={this.state.input.cgod}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
//日志
class Modal10 extends Component{
  //初始化
  constructor(props) {
    super(props);
    this.search();
  }

  //表格1数据以及函数
  //常量数据部分

  columns = [
    {
      title: '操作类型',
      dataIndex: 'oparetionType',
      width:150,
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      width:150,
    },
    {
      title: '操作结果',
      dataIndex: 'result',
      width:150,
    },
    {
      title: '测试类型',
      dataIndex: 'testType',
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
    // let page={
    //     page:pagination.current,
    //     pageSize: pagination.pageSize,
    // };
    //this.requestData(page);
    this.setState({paginationProps:pagination});
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
    let url="/user/test/data/his/test/log/info/3/"
      +this.props.record.clientId;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  render(){
    return(
      <div>
        <Modal
        title={"日志"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1000}
        >
          <div style={{height:'100%',margin:'3px'}}>
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
//历史测试数据 测试次数 测试试剂数据
class Modal9 extends Component{
  columns = [
    {
      title: '序号',
      dataIndex: 'key',
      width:150,
    },
    {
      title: '试剂',
      dataIndex: 'paperName',
      width:150,
      sorter: {
        compare: (a, b) => a.paperName - b.paperName,
        multiple: 3,
      },
    },
    {
      title: '测试日期',
      dataIndex: 'testDate',
      width: 150,
      sorter: {
        compare: (a, b) => a.testTime - b.testTime,
        multiple: 3,
      },
    },
    {
      title: '计划日期',
      dataIndex: 'planTime',
      width: 150,
      sorter: {
        compare: (a, b) => a.planTime - b.planTime,
        multiple: 3,
      },
    },
    {
      title:'数值',
      dataIndex:'value',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.value - b.value,
        multiple: 3,
      },
    },
    {
      title:'GOD',
      dataIndex:'tgod',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.tgod - b.tgod,
        multiple: 3,
      },
    },
    {
      title:'批号',
      dataIndex:'bathNumber',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.bathNumber - b.bathNumber,
        multiple: 3,
      },
    },
    {
      title:'设备号',
      dataIndex:'deviceNo',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.deviceNo - b.deviceNo,
        multiple: 3,
      },
    },
    {
      title:'结果',
      dataIndex:'result',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.result - b.result,
        multiple: 3,
      },
    },
    {
      title:'测试状态',
      dataIndex:'testStatus',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.testStatus - b.testStatus,
        multiple: 3,
      },
    },
    {
      title:'测试图片',
      dataIndex:'testPicPathAli',
      width:150,
      align:'center',
      render: (text) =>
        //   ////console.log("record的内容",record)
        //<img src={text} width="100px" alt=""/>
        <Image src={text} width="100px" alt=""/>
    },
    {
      title:'C线图片',
      dataIndex:'testCLinePicPathAli',
      width:150,
      align:'center',
      render: (text) =>
        //   ////console.log("record的内容",record)
        //<img src={text} width="100px" alt=""/>
        <Image src={text} width="100px" alt=""/>
    },
    {
      title:'C线GOD',
      dataIndex:'cgod',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.cgod - b.cgod,
        multiple: 3,
      },
    },
    {
      title:'FSH/LH',
      dataIndex:'fshLh',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.fshLh - b.fshLh,
        multiple: 3,
      },
    },
    {
      title:'LH/FSH',
      dataIndex:'lhFsh',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.lhFsh - b.lhFsh,
        multiple: 3,
      },
    },
    {
      title:'操作',
      width:150,
      align:'center',
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal(record)}}>修改数据</Button>
        </Space>
      ),
    },
  ];
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
    let page = {
      page:1,
      pageSize:10
    }
    this.requestData(page)
    //时间格式转换
    // let testTime=this.props.record.testTime;
    // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
    // this.state.testTime=mymoment;
  }
  //函数部分
  requestData=(page)=>{
    let data={
      ...page,
    }
    console.log("request:",data);
    console.log("???")
        console.log(this.props.record)
        let url = "/user/test/data/his/cycle/type/list/"+this.props.record.eupregnaTestHisId
        //历史测试数据（生精能力）
        if(this.props.record.testTypeCode==='male_fsh'){
          url = '/user/test/data/male/fsh/his/list/' + this.props.record.eupregnaTestTypeHisId
          this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width:150,
            },
            {
                title: '试剂',
                dataIndex: 'paperName',
                width:150,
                sorter: {
                    compare: (a, b) => a.paperName - b.paperName,
                    multiple: 3,
                },
            },
            {
                title: '测试日期',
                dataIndex: 'testTime',
                width: 150,
                sorter: {
                    compare: (a, b) => a.testTime - b.testTime,
                    multiple: 3,
                },
            },
            {
                title: '计划日期',
                dataIndex: 'planTime',
                width: 150,
                sorter: {
                    compare: (a, b) => a.planTime - b.planTime,
                    multiple: 3,
                },
            },
            {
                title:'数值',
                dataIndex:'value',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.value - b.value,
                    multiple: 3,
                },
            },
            {
                title:'GOD',
                dataIndex:'tgod',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.tgod - b.tgod,
                    multiple: 3,
                },
            },
            {
                title:'批号',
                dataIndex:'bathNumber',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.bathNumber - b.bathNumber,
                    multiple: 3,
                },
            },
            {
                title:'设备号',
                dataIndex:'deviceNo',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.deviceNo - b.deviceNo,
                    multiple: 3,
                },
            },
            {
                title:'结果',
                dataIndex:'result',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.result - b.result,
                    multiple: 3,
                },
            },
            {
                title:'测试状态',
                dataIndex:'testStatus',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.testStatus - b.testStatus,
                    multiple: 3,
                },
            },
            {
                title:'测试图片',
                dataIndex:'testPicPathAli',
                width:150,
                align:'center',
                render: (text) =>
                  //   ////console.log("record的内容",record)
                  //<img src={text} width="100px" alt=""/>
                  <Image src={text} width="100px" alt=""/>
            },
            {
                title:'C线图片',
                dataIndex:'testCLinePicPathAli',
                width:150,
                align:'center',
                render: (text) =>
                  //   ////console.log("record的内容",record)
                  //<img src={text} width="100px" alt=""/>
                  <Image src={text} width="100px" alt=""/>
            },
            {
                title:'C线GOD',
                dataIndex:'cgod',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.cgod - b.cgod,
                    multiple: 3,
                },
            },
            {
                title:'操作',
                width:150,
                align:'center',
                render:(text,record)=>(
                  <Space>
                      <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal(record)}}>修改数据</Button>
                  </Space>
                ),
            },
          ];
        }
        //历史测试内容（精液液化）
        if(this.props.record.testTypeCode==='sperm'){
          url = '/user/test/data/semen/his/list/' + this.props.record.eupregnaTestTypeHisId
          this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width:150,
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                width:150,
                sorter: {
                    compare: (a, b) => a.paperName - b.paperName,
                    multiple: 3,
                },
            },
            {
                title: '结束时间',
                dataIndex: 'endDate',
                width: 150,
                sorter: {
                    compare: (a, b) => a.planTime - b.planTime,
                    multiple: 3,
                },
            },
            {
                title:'测试状态',
                dataIndex:'testStatus',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.timeout - b.timeout,
                    multiple: 3,
                },
            },
            {
                title:'测试结果',
                dataIndex:'result',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.testStatus - b.testStatus,
                    multiple: 3,
                },
            },
            {
              title:'是否完成',
              dataIndex:'finishFlag',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
              render:(text)=>{
                if(text===false){
                  return(<span>否</span>)
                }else if(text===true){
                  return(<span>是</span>)
                }else{
                  return(<span></span>)
                }
              }
            },
            {
                title:'是否取消',
                dataIndex:'abortFlag',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.testStatus - b.testStatus,
                    multiple: 3,
                },
                render:(text)=>{
                  if(text===false){
                    return(<span>否</span>)
                  }else if(text===true){
                    return(<span>是</span>)
                  }else{
                    return(<span></span>)
                  }
                }
            },
            {
              title:'用药类型',
              dataIndex:'takeDrugType',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
              title:'用药日期',
              dataIndex:'takeDrugDate',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
              title:'用药描述',
              dataIndex:'takeDrugDesc',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
                title:'操作',
                dataIndex:'patient_createTime',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.patient_name - b.patient_name,
                    multiple: 3,
                },
                render:(text,record)=>(
                    <Space>
                        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal14(record)}}>详细数据</Button>
                        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal5(record)}}>日志</Button>
                    </Space>
                ),
            },
        ];
        }
        else{

        }
    ajax(url, {},'GET')
      .then((response)=>{
            console.log('request1',response)
        if(response.data.data===null){
          message.error("查询失败！")
        }else{
          console.log(response)
          let data=response.data.data.info;
                  if(data===undefined){
                    data=response.data.data
                  }
          let paginationProps={...this.state.paginationProps};
          addKey(data);
          paginationProps.total=response.data.data.total;
          paginationProps.current=page.page;
          paginationProps.pageSize=page.pageSize;
          console.log("data:",response);
          this.setState({
            data:data,
            paginationProps:paginationProps,
          },this.requestData3);
                }
      });
    // ajax("/user/base/info/list",data,'POST')
    //   .then((response)=>{
    //       if(response.data.data==null){
    //           console.log(response);
    //           message.error("request error! code:"+response.data.code);
    //       }else{
    //           let data=response.data.data.info;
    //           let paginationProps={...this.state.paginationProps};
    //           addKey(data);
    //           paginationProps.total=response.data.data.total;
    //           paginationProps.current=page.page;
    //           paginationProps.pageSize=page.pageSize;
    //           console.log("data:",response);
    //           this.setState({
    //               data:data,
    //               paginationProps:paginationProps,
    //           });
    //       }
    //   });
  }
    requestData3=()=>{
      console.log("request3:");
      console.log("request3:");
      //卵巢功能评估
      if(this.props.record.testTypeCode==="egg_quality"){
       ajax("/user/test/data/eggQualityCharts/his/"
       +this.props.record.eupregnaTestHisId, {},'GET')
       .then((response)=>{
           console.log(response)
           if(response.data.data===null){
               message.error("查询失败！")
               console.log('error',response)
           }else{
             if(!response.data.data.isData){
               message.info('无画图数据')
               return 0
             }
               //console.log(response)
               let data=response.data.data;
               this.setState({
                data3:data,
            },()=>{
              console.log('data3:',this.state.data3.paperName)
              //画图
              let chartDom = document.getElementById('figure1');
              let myChart = echarts.init(chartDom);
              let option;

              option = {
                  xAxis: {
                      type: 'category',
                      data: this.state.data3.xData,
                      //boundaryGap: false,
                      // "axisLabel":{
                      // 	interval: 0

                      // 	}
                  },
                  yAxis: {
                      type: 'value'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: this.state.data3.legend
                  },
                  // toolbox: {
                  // 	show: true,
                  // 	feature: {
                  // 			dataZoom: {
                  // 					yAxisIndex: 'none'
                  // 			},
                  // 			dataView: {readOnly: false},
                  // 			magicType: {type: ['line', 'bar']},
                  // 			restore: {},
                  // 			saveAsImage: {}
                  // 	}
                  // },
                  series: [
                    {
                      name: this.state.data3.result[0].name,
                      data: this.state.data3.result[0].data,
                      type: 'line'
                      },
                     {
                       name: this.state.data3.result[1].name,
                       data: this.state.data3.result[1].data,
                       type: 'line'
                     },
                     {
                       name: this.state.data3.result[2].name,
                       data: this.state.data3.result[2].data,
                       type: 'line'
                     },
                 ]
              };

              option && myChart.setOption(option);
            });

           }
       });
      }
      //精液液化 用户名：77777777773
      else if(this.props.record.testTypeCode==="sperm"){
        //精液液化 用户名：77777777773

       ajax("/user/test/data/semen/canvas/time/his/"
       +this.props.record.eupregnaTestTypeHisId, {},'GET')
       .then((response)=>{
           console.log(response)
           if(response.data.data===null){
               message.error("查询失败！")
               console.log('error',response)
           }else{
             if(!response.data.data.isData){
               message.info('无画图数据')
               return 0
             }
             //console.log(response)
             let data=response.data.data;
             this.setState({
               data3:data,
            },()=>{
              console.log('data3:',this.state.data3.paperName)
              //画图
              let chartDom = document.getElementById('figure1');
              let myChart = echarts.init(chartDom);
              let option;

              option = {
                  xAxis: {
                      type: 'category',
                      data: this.state.data3.xData,
                      //boundaryGap: false,
                      // "axisLabel":{
                      // 	interval: 0

                      // 	}
                  },
                  yAxis: {
                      type: 'value'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                   //data: [this.state.data3.paperName[0]]
                   data: ['精液液化']
                  },
                  series: [{
                   //name: this.state.data3.paperName[0],
                   name: '精液液化',
                   data: this.state.data3.data,
                   type: 'line'
                  }]
              };

              option && myChart.setOption(option);
            });

           }
       });
      }
      //生精功能 用户名：Rabbit
      else if(this.props.record.testTypeCode==="male_fsh"){
       //生精功能 用户名：Rabbit
       //tested
       console.log('圣经')
      ajax("/user/test/data/male/fsh/canvas/his/"
      +this.props.record.eupregnaTestTypeHisId, {},'GET')
      .then((response)=>{
          console.log(response)
          if(response.data.data===null){
              message.error("查询失败！")
              console.log('error',response)
          }else{
            if(!response.data.data.isData){
              message.info('无画图数据')
              return 0
            }
            //console.log(response)
            let data=response.data.data;
            if(data.paperName===undefined){
             data.paperName = ['tmp']
            }
            this.setState({
              data3:data,
           },()=>{
             console.log('data3:',this.state.data3.paperName)
             //画图
             let chartDom = document.getElementById('figure1');
             let myChart = echarts.init(chartDom);
             let option;

             option = {
                 xAxis: {
                     type: 'category',
                     data: this.state.data3.xData,
                     //boundaryGap: false,
                    //  "axisLabel":{
                    // 	 interval: 0

                    // 	 }
                 },
                 yAxis: {
                     type: 'value'
                 },
                 tooltip: {
                   trigger: 'axis'
                 },
                 legend: {
                   data: [this.state.data3.paperName[0]]
                 },
                 series: [{
                     name: this.state.data3.paperName[0],
                     data: this.state.data3.data,
                     type: 'line'
                 }]
             };

             option && myChart.setOption(option);
           });

          }
      });
     }else{
        //其他图表绘制（寻找黄金优孕期、早期妊娠确认、早期胚胎检测）
        //tested
       ajax("/user/test/data/his/canvas/charts/"
       +this.props.record.eupregnaTestHisId, {},'GET')
       .then((response)=>{
           console.log(response)
           if(response.data.data===null){
               message.error("查询失败！")
               console.log('error',response)
           }else{
             if(!response.data.data.isData){
               message.info('无画图数据')
               return 0
             }
             //console.log(response)
             let data=response.data.data;
             this.setState({
               data3:data,
            },()=>{
              console.log('data3:',this.state.data3.paperName)
              //画图
              let chartDom = document.getElementById('figure1');
              let myChart = echarts.init(chartDom);
              let option;

              option = {
                  xAxis: {
                      type: 'category',
                      data: this.state.data3.xData,
                      //boundaryGap: false,
                      // "axisLabel":{
                      // 	interval: 0

                      // 	}
                  },
                  yAxis: {
                      type: 'value'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: [this.state.data3.paperName[0]]
                  },
                  // toolbox: {
                  // 	show: true,
                  // 	feature: {
                  // 			dataZoom: {
                  // 					yAxisIndex: 'none'
                  // 			},
                  // 			dataView: {readOnly: false},
                  // 			magicType: {type: ['line', 'bar']},
                  // 			restore: {},
                  // 			saveAsImage: {}
                  // 	}
                  // },
                  series: [{
                      name: this.state.data3.paperName[0],
                      data: this.state.data3.data,
                      type: 'line'
                  }]
              };

              option && myChart.setOption(option);
            });

           }
       });
      }
    }
  //弹窗关闭函数
  handleCancel= ()=>{
    this.props.setVisible(false);
  }
  //点击完成
  handleOk = () => {
    // //console.log('添加完成')
    // //console.log(this.form)
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
        ////console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          if(response.data.code!==1002){
            ////console.log("请求错误！",response);
            message.error("添加失败！")
          }else{
            //form.resetFields();
            ////console.log("添加成功：",response);
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
      .catch((info) => {
        ////console.log('Validate Failed:', info);
        message.error("表单验证出错！");
      });


  };

  //时间选择函数
  rangePickerOnChange=(value, dateString)=>{
    //console.log('Selected Time: ', value);
    //console.log('Formatted Selected Time: ', dateString);
    let input = {};
    Object.assign(input, this.state.input)
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
  //弹窗4
  //添加计划
  Modal = ()=>{
    if(this.state.modalVisible)
      return(
        <Modal11
        record={this.state.record}
        visible={this.state.modalVisible}
        setVisible={this.setModalvisible}
        />
      );
  }
  setModalvisible=(flag)=>{
      let page = {
        page:1,
        pageSize:10
      }
      this.requestData(page)
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
    //弹窗14 详细数据
  Modal14 = ()=>{
    if(this.state.modalVisible14)
      return(
        <Modal14
        record={this.state.record14}
        visible={this.state.modalVisible14}
        setVisible={this.setModalvisible14}
        />
      );
  }
    setModalvisible14=(flag)=>{
      this.setState({
          modalVisible14:flag,
      });
    }
    lookModal14=record=>{
        let record14 = record;
        record14.testSetName = this.props.record.testSetName
        record14.nickName = this.props.record.nickName

        this.setState({
            modalVisible14:true,
            record14:record14,
        });
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
        title={"测试试剂数据"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1600}
        >
          <div>
            <div>
              <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}</span>
            </div>
            <div>
              <span className={"span1"}>测试类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.testTypeName}</span>
            </div>
            <div>
                        <div id="figure1" style={{ width: '100%', height: 500 }}></div>
            </div>
          </div>
          <div>
            <div>
              <span className={"span1"}>测试数据</span>
            </div>
            <div style={{height:'100%',margin:'3px'}}>
              <Table
              columns={this.columns}
              dataSource={this.state.data}
              bordered={true}
              style={{margin:"20px 0",borderBottom:'1px,soild'}}
              pagination={false}
              scroll={{x:500}}
              />
            </div>
          </div>

        </Modal>
        {this.Modal()}
        {this.Modal14()}
      </div>
    )
  }
}
//历史测试数据 测试次数
class Modal8 extends Component{
  //初始化
  constructor(props) {
    super(props);
    this.search();
  }

  //表格1数据以及函数
  //常量数据部分

  columns = [
    {
      title: '测试类型',
      dataIndex: 'testTypeName',
      width:150,
    },
    {
      title: '测试次数',
      dataIndex: 'num',
      width:150,
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:150,
      align:'center',
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal9(record)}}>历史测试数据</Button>
        </Space>
      ),
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
    let url="/user/test/data/his/cycle/list/"
      +this.props.record.clientId+'/'+this.props.record.eupregnaTestCycleHisId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗9
  //测试试剂数据
  Modal9 = ()=>{
    if(this.state.modalVisible9)
      return(
        <Modal9
        record={this.state.record9}
        visible={this.state.modalVisible9}
        setVisible={this.setModalvisible9}
        />
      );
  }
  setModalvisible9=(flag)=>{
    this.setState({
      modalVisible9:flag,
    });
  }
  lookModal9=record=>{
      let record9 = record;
      record9.testSetName = this.props.record.testSetName
      record9.nickName = this.props.record.nickName
      //record9.eupregnaTestHisId = this.props.record.eupregnaTestHisId
      this.setState({
          modalVisible9:true,
          record9:record,
      });
  }
  //弹窗6
  //测试问题数据弹窗
  Modal6 = ()=>{
    if(this.state.modalVisible6)
      return(
        <Modal6
        record={this.state.record6}
        visible={this.state.modalVisible6}
        setVisible={this.setModalvisible6}
        />
      );
  }
  setModalvisible6=(flag)=>{
    this.setState({
      modalVisible6:flag,
    });
  }
  lookModal6=record=>{
    this.setState({
      modalVisible6:true,
      record6:record,
    });
  }

  render(){
    return(
      <div>
        <Modal
        title={"测试次数"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1000}
        >
          <div style={{height:'100%',margin:'3px'}}>
            <div>
              <div>
                <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <p>时间 {this.props.record.startDate}&nbsp;&nbsp;-&nbsp;&nbsp;{this.props.record.endDate}</p>
            </div>
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
        {this.Modal9()}
      </div>
    )
  }
}
//历史测试数据
class Modal7 extends Component{
  //初始化
  constructor(props) {
    super(props);
    this.search();
  }

  //表格1数据以及函数
  //常量数据部分

  columns = [
    {
      title: '周期开始时间',
      dataIndex: 'startDate',
      width:150,
    },
    {
      title: '周期结束时间',
      dataIndex: 'endDate',
      width:150,
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:150,
      align:'center',
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal8(record)}}>查看</Button>
        </Space>
      ),
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
    let url="/user/test/data/his/data/list/"
      +this.props.record.clientId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗8
  //测试次数弹窗
  Modal8 = ()=>{
    if(this.state.modalVisible8)
      return(
        <Modal8
        record={this.state.record8}
        visible={this.state.modalVisible8}
        setVisible={this.setModalvisible8}
        />
      );
  }
  setModalvisible8=(flag)=>{
    this.setState({
      modalVisible8:flag,
    });
  }
  lookModal8=record=>{
      let record8 = record;
      record8.testSetName = this.props.record.testSetName
      record8.nickName = this.props.record.nickName
      this.setState({
          modalVisible8:true,
          record8:record,
      });
  }
  //弹窗10
  //测试次数弹窗
  Modal10 = ()=>{
    if(this.state.modalVisible10)
      return(
        <Modal10
        record={this.state.record10}
        visible={this.state.modalVisible10}
        setVisible={this.setModalvisible10}
        />
      );
  }
  setModalvisible10=(flag)=>{
    this.setState({
      modalVisible10:flag,
    });
  }
  lookModal10=()=>{
    this.setState({
      modalVisible10:true,
      record10:this.props.record,
    });
  }
  render(){
    return(
      <div>
        <Modal
        title={"历史测试数据"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1000}
        >
          <div style={{height:'100%',margin:'3px'}}>
            <div>
              <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Button
                type="primary"
                // icon={<PlusOutlined  className="icon1" />}
                onClick={this.lookModal10}
                className="button2"
              >
                查看日志
              </Button>
            </div>
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
        {this.Modal8()}
        {this.Modal10()}
      </div>
    )
  }
}
//问题试剂数据
class Modal6 extends Component{
  columns = [
    {
      title: '试剂',
      dataIndex: 'paperName',
      width:150,
      sorter: {
        compare: (a, b) => a.paperName - b.paperName,
        multiple: 3,
      },
    },
    {
      title: '计划日期',
      dataIndex: 'planTime',
      width: 150,
      sorter: {
        compare: (a, b) => a.planTime - b.planTime,
        multiple: 3,
      },
    },
    {
      title:'测试日期',
      dataIndex:'testTime',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.testTime - b.testTime,
        multiple: 3,
      },
    },
    {
      title:'条码',
      dataIndex:'bathNumber',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.bathNumber - b.bathNumber,
        multiple: 3,
      },
    },
    {
      title:'错误类型',
      dataIndex:'errorType',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.errorType - b.errorType,
        multiple: 3,
      },
    },
    {
      title:'问题图片',
      dataIndex:'errorPicPathAli',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.errorPicPathAli - b.errorPicPathAli,
        multiple: 3,
      },
      render: (text) =>
        //   ////console.log("record的内容",record)
        //<img src={text} width="100px" alt=""/>
        <Image src={text} width="100px" alt=""/>
    },

  ];
  //初始化
  constructor(props) {
    super(props);
    //参数设置
    //console.log("init record:",input);
    this.state= {
      testTime: '',
    }
    let page = {
      page:1,
      pageSize:10
    }
    this.requestData(page)
    //时间格式转换
    // let testTime=this.props.record.testTime;
    // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
    // this.state.testTime=mymoment;
  }
  //函数部分
  requestData=(page)=>{
    // let data={
    //     ...page,
    // }
    //console.log("request:",data);
    ajax("/user/test/data/error/paper/list/"
      +this.props.record.testTypeId,{},'GET')
      .then((response)=>{
        if(response.data.data===null){
          message.error("查询失败！")
        }else{
          console.log(response)
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
    // ajax("/user/base/info/list",data,'POST')
    //   .then((response)=>{
    //       if(response.data.data==null){
    //           console.log(response);
    //           message.error("request error! code:"+response.data.code);
    //       }else{
    //           let data=response.data.data.info;
    //           let paginationProps={...this.state.paginationProps};
    //           addKey(data);
    //           paginationProps.total=response.data.data.total;
    //           paginationProps.current=page.page;
    //           paginationProps.pageSize=page.pageSize;
    //           console.log("data:",response);
    //           this.setState({
    //               data:data,
    //               paginationProps:paginationProps,
    //           });
    //       }
    //   });
  }
  //弹窗关闭函数
  handleCancel= ()=>{
    this.props.setVisible(false);
  }
  //点击完成
  handleOk = () => {
    // //console.log('添加完成')
    // //console.log(this.form)
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
        ////console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          if(response.data.code!==1002){
            ////console.log("请求错误！",response);
            message.error("添加失败！")
          }else{
            //form.resetFields();
            ////console.log("添加成功：",response);
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
      .catch((info) => {
        ////console.log('Validate Failed:', info);
        message.error("表单验证出错！");
      });


  };

  //时间选择函数
  rangePickerOnChange=(value, dateString)=>{
    //console.log('Selected Time: ', value);
    //console.log('Formatted Selected Time: ', dateString);
    let input = {};
    Object.assign(input, this.state.input)
    //this.state.input.testTime=dateString;
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
  //弹窗4
  //添加计划
  Modal = ()=>{
    if(this.state.modalVisible)
      return(
        <Modal4
        record={this.props.record}
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
  //弹窗5
  //修改计划
  Modal5 = ()=>{
    if(this.state.modalVisible5)
      return(
        <Modal5
        record={this.state.record5}
        visible={this.state.modalVisible5}
        setVisible={this.setModalvisible5}
        />
      );
  }
  setModalvisible5=(flag)=>{
    this.setState({
      modalVisible5:flag,
    });
  }
  lookModal5=record=>{
    this.setState({
      modalVisible5:true,
      record5:record,
    });
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
        title={"问题试剂"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1200}
        >

          <div>
            <div style={{height:'100%',margin:'3px'}}>
              <Table
              columns={this.columns}
              dataSource={this.state.data}
              bordered={true}
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
//修改测试数据
class Modal5 extends Component{
  //初始化
  constructor(props) {
    super(props);
    console.log("record",this.props.record)
    let input = {}
    input.planTime = this.props.record.planTime
    input.timeout = this.props.record.timeout
    input.planResume = this.props.record.planResume
    let planTime=this.props.record.planTime;
    let mymoment = '';
    console.log('修改input',input);
    if(planTime!==null)mymoment = moment(planTime,'YYYY-MM-DD HH:mm:ss');
    this.state={
      planTime:mymoment,
      input:input
    }
  }
  componentDidMount = ()=>{
    this.form.current.setFieldsValue(this.state.input)
  }

  //表格1数据以及函数
  //常量数据部分

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
          if(this.state.input[myInput[ii]]!==""&&this.state.input[myInput[ii]]!==null){
            data[myInput[ii]]=this.state.input[myInput[ii]];
          }
        }
        data.eupregnaTestPaperDataId = this.props.record.eupregnaTestPaperDataId;
        //data.patientId=this.props.record.patientId;
        //data.loginId=this.props.record.loginId;
        let url="/user/test/data/modify/plan";
        //console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          if(response.data.code!==1004){
            console.log("请求错误！",response);
          }else{
            //form.resetFields();
            console.log("修改成功：",response);
            //Object.assign(this.props.record,this.state.input);
            message.success('修改成功')
            this.props.setVisible(false);

          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
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
    rangePickerOnChange=(value, dateString,valueName)=>{
      console.log('Selected Time: ', value);
      //console.log('Formatted Selected Time: ', dateString);
      let input = {};
      let state = {};
      Object.assign(input, this.state.input)
      Object.assign(state, this.state)
      if(valueName==='manBirthday'||valueName==='womanBirthday'||valueName==='preferTestTime'){
        input[valueName]=dateString;
      }else{
        input[valueName]=dateString+' 00:00:00';
      }
      state.input = input
      state[valueName] = value
      this.setState(state)
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
    let url="/user/test/data/list/"
      +this.props.record.clientId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗1
  //测试试剂数据
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
    console.log('?')
    this.setState({
      modalVisible:true,
      record:record,
    });
  }
  //弹窗2

  form = React.createRef();
  render(){
    return(
      <div>
        <Modal
        title={"修改测试计划"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
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
              name="addPlan"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.form}//表单验证，通过ref获取

              >
                <Form.Item
                label="用户"
                name="用户"
                >
                  <span>{this.props.record.nickName}</span>
                </Form.Item>
                <Form.Item label="试剂"
                     name={"试剂"}
                >
                  <span >{this.props.record.paperName}</span>
                </Form.Item>
                <Form.Item label="测试集"
                     name={"测试集"}
                >
                  <span>{this.props.record.testSetName}</span>
                </Form.Item>
                <Form.Item label="计划时间"
                     initialValue={this.state.planTime}
                     name={"myplanTime"}
                     rules={[
                       {
                         required: true,
                         message: '请输入计划时间!',
                       },
                     ]}
                >
                  <DatePicker showTime onChange={(value, dateString)=>
                                    {this.rangePickerOnChange(value, dateString,'planTime')}}  onOk={this.rangePickerOnOk} value={this.state.planTime}/>
                </Form.Item>
                <Form.Item label="超时时间"
                     name={"timeout"}
                     rules={[
                       {
                         required: true,
                         message: '请输入超时时间!',
                       },
                     ]}
                >
                  <Input  placeholder={"请输入超时时间"}onChange={(e)=>{this.inputChange(e,"timeout")}}
                      value={this.state.input.timeout}
                  />
                </Form.Item>
                <Form.Item label="计划添加原因"
                     name={"planResume"}
                >
                  <Input  placeholder={"请输入计划添加原因"} onChange={(e)=>{this.inputChange(e,"planResume")}}
                      value={this.state.input.planResume}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
//添加测试数据
class Modal4 extends Component{
  //初始化
  constructor(props) {
    super(props);
    this.requestData();
  }

  //表格1数据以及函数
  //常量数据部分

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
        data.clientId = this.props.record.clientId;
        data.testTypeId = this.props.record.testTypeId;
        data.paperId = this.props.record.paperId;
        data.eupregnaTestId = this.props.record.eupregnaTestId;

        //data.patientId=this.props.record.patientId;
        //data.loginId=this.props.record.loginId;
        let url="/user/test/data/add/plan";
        console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          if(response.data.code!==1002){
            console.log("请求错误！",response);
                        message.error(response.data.msg)
          }else{
            //form.resetFields();
            console.log("修改成功：",response);
                        message.success(response.data.msg);
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
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
    let url="/user/test/data/all/plan/type"
    ajax(url, {},'GET')
      .then((response)=>{
        console.log("response:",response);
        if(response.data.data==null)
          console.log("查询失败");
        else{
          let data=response.data.data;
          console.log("keys data:",response);
          this.setState({
            data:data,
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
  //Select 选项
  optplanType(){
    let ii = 1;
    return(
      this.state.data.map((item)=>{
        ii = ii+1;
        return(<Option key = {ii} title="planType" value={item.planTypeId}>{item.planTypeName}</Option>)
      })
    )
  }
  //选择框变化（完成）
  handleChange=(e,Option) =>{
    //console.log(e)
    //console.log(Option)
    let source = {};
    source[Option.title] = Option.value;
    console.log(e,Option);
    if(Option.title==='planType'){
      for(let i = 0;i< this.state.data.length;i++){
        if(this.state.data[i]['planTypeId']===Option.value){
          source['timeout'] = this.state.data[i]['timeout'];
          break
        }
      }
    }
    this.setState({
      input:Object.assign(this.state.input,source),
    },()=>{
      this.form.current.setFieldsValue(this.state.input);
      //console.log(this.state.input);
    })
  }
  //时间选择函数
  rangePickerOnChange=(value, dateString)=>{
    ////console.log('Selected Time: ', value);
    ////console.log('Formatted Selected Time: ', dateString);
    let input = {};
    Object.assign(input, this.state.input);
    input.planTime=dateString;
    this.setState({
      input:input
    },()=>{
         this.setState({
      planTime:value,
    })})
  }
  rangePickerOnOk=(value)=> {
    ////console.log('onOk: ', value);
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗1
  //测试试剂数据
  // Modal = ()=>{
  //     if(this.state.modalVisible)
  //         return(
  //           <Modal1
  //             record={this.state.record}
  //             visible={this.state.modalVisible}
  //             setVisible={this.setModalvisible}
  //           />
  //         );
  // }
  // setModalvisible=(flag)=>{
  //     this.setState({
  //         modalVisible:flag,
  //     });
  // }
  // lookModal=record=>{
  //     console.log('?')
  //     this.setState({
  //         modalVisible:true,
  //         record:record,
  //     });
  // }
  //弹窗2

  /*表单验证
    Form.useForm是是 React Hooks 的实现，只能用于函数组件
    class组件中通过 React.createRef()来获取数据域*/
  form = React.createRef();
  render(){
    return(
      <div>
        <Modal
        title={"添加测试计划"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
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
              name="addPlan"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref = {this.form}
              >
                <Form.Item
                label="用户"
                name="nickName"
                >
                  <span>{this.props.record.nickName}</span>
                </Form.Item>
                <Form.Item label="试剂"
                     name={"paperName"}
                >
                  <span >{this.props.record.paperName}</span>
                </Form.Item>
                <Form.Item label="测试集"
                     name={"testSetName"}
                >
                  <span>{this.props.record.testSetName}</span>
                </Form.Item>
                <Form.Item label="计划时间"
                     name={"计划时间"}
                     rules={[
                       {
                         required: true,
                         message: '请输入计划时间!',
                       },
                     ]}
                >
                  <DatePicker showTime onChange={this.rangePickerOnChange} onOk={this.rangePickerOnOk} value={this.state.planTime}/>
                </Form.Item>
                <Form.Item label="计划类型"
                     name={"planType"}
                     rules={[
                       {
                         required: true,
                         message: '请选择计划类型!',
                       },
                     ]}
                >
                  <Select
                  placeholder="请选择计划类型 "
                  style={{width:'100%'}}
                  value={this.state.input.planType}
                  onChange={this.handleChange}>
                    {this.optplanType()}
                  </Select>
                </Form.Item>
                <Form.Item label="超时时间"
                     // name={"timeout"}
                     rules={[
                       {
                         required: true,
                         message: '请输入超时时间!',
                       },
                     ]}
                >
                  {/*<Input  placeholder={"请输入超时时间"}onChange={(e)=>{this.inputChange(e,"timeout")}}*/}
                  {/*        value={this.state.input.timeout}*/}
                  {/*/>*/}
                  {this.state.input.timeout}
                </Form.Item>
                {/*<Form.Item label="计划添加原因"*/}
                {/*           name={"计划添加原因"}*/}
                {/*>*/}
                {/*    <Input  placeholder={"请输入计划添加原因"} />*/}
                {/*</Form.Item>*/}
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
//测试数据
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
      title: '测试类型',
      dataIndex: 'testType',
      width:150,
    },
    {
      title: '测试次数',
      dataIndex: 'testCount',
      width:100,
    },
    {
      title: '末次测试状态',
      dataIndex: 'lastTestStatus',
      width: 150,
    },
    {
      title:'末次测试结论',
      dataIndex:'lastTestConclude',
      width:150,
      align:'center',
    },
    {
      title:'末次测试时间',
      dataIndex:'lastTestDate',
      width:150,
      align:'center',
    },
    {
      title:'末次测试状态',
      dataIndex:'lastTestStatus',
      width:150,
      align:'center',
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:150,
      align:'center',
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal(record)}}>测试试剂数据</Button>
          <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.lookModal6(record)}}>测试试剂问题数据</Button>
        </Space>
      ),
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
    let url="/user/test/data/list/"
      +this.props.record.clientId+'/'+page.page+'/'+page.pageSize;
    //console.log("request:",data);
    ajax(url, {},'GET')
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
    ],
    record:{
      loginName:"",
    },

    //表格2数据


  };

  //弹窗函数
  //弹窗1
  //测试试剂数据
  Modal = ()=>{
    if(this.state.modalVisible){
      let record = this.state.record;
      record.nickName = this.props.record.nickName;
      return(
        <Modal1
        record={record}
        visible={this.state.modalVisible}
        setVisible={this.setModalvisible}
        /> );
    }
  }
  setModalvisible=(flag)=>{
    this.setState({
      modalVisible:flag,
    });
  }
  lookModal=record=>{
    console.log('?')
    this.setState({
      modalVisible:true,
      record:record,
    });
  }
  //弹窗6
  //测试问题数据弹窗
  Modal6 = ()=>{
    if(this.state.modalVisible6)
      return(
        <Modal6
        record={this.state.record6}
        visible={this.state.modalVisible6}
        setVisible={this.setModalvisible6}
        />
      );
  }
  setModalvisible6=(flag)=>{
    this.setState({
      modalVisible6:flag,
    });
  }
  lookModal6=record=>{
    this.setState({
      modalVisible6:true,
      record6:record,
    });
  }

  render(){
    return(
      <div>
        <Modal
        title={"测试数据"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1200}
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
        {this.Modal6()}
      </div>
    )
  }
}
//发送事件
class Modal2 extends Component{
  //初始化
  constructor(props) {
    super(props);
    //参数设置
    let input={};
    //Object.assign(input,this.props.record);
     // console.log("init record:",input);
    this.state= {
      //testTime: '',
      input: input,
      processClass:'container2',
      percent: 0,

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
    console.log('发送事件')
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
        data.clientId=this.props.record.clientId;
        //data.loginId=this.props.record.loginId;
        let url="/user/test/data/add/item";
        //console.log("request:",data);
        this.setState({
          processClass:'container1'
        })
        let id = setInterval(() => {
          console.log('setInterval!')
          let percent = this.state.percent + 1;
          if (percent > 95) {
            percent = 95;
          }
          this.setState({ percent });
        }, 100);
        this.setState({ id });
        ajax(url,data,'POST')
        .then((response)=>{
          this.setState({ percent:100 });
          clearInterval(this.state.id);
          if(response.data.code!==2104){
            this.setState({
              status:'exception'
            })
            console.log("请求错误！",response);
                        message.error(response.data.msg)
          }else{
            ////form.resetFields();
            console.log("发送成功：",response);
                        message.success(response.data.msg)
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
  };

  //时间选择函数
  rangePickerOnChange=(value, dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    let input = {}
    Object.assign(input,this.state.input)
    input.eventDate=dateString.split(' ')[0];
    input.addPlanTime=dateString.split(' ')[1];
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
        width={600}
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
              label="时间"
              name="eventDate"
              rules={[
                {
                  required: true,
                  message: '请选择时间!',
                },
              ]}
              >
                <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                onChange = {this.rangePickerOnChange}
                />
              </Form.Item>
              <Form.Item
              label="事件"
              name="eventId"
              rules={[{ required: true ,message:"请输入病人姓名"}]}//设置验证规则
              >
                <Select placeholder="请选择激活状态 "
                    onChange={this.selectChange}
                    style={{width:'100%'}}
                    value={this.state.input.eventContent}
                >
                  <Option title="eventContent" value="has_bleeding">来月经</Option>
                  <Option title="eventContent" value="has_sex">同房</Option>
                  <Option title="eventContent" value="has_embryo">怀孕</Option>
                </Select>
              </Form.Item>
            </Form>
            <div className={this.state.processClass}>
              <div className="item1">
                <span>事件处理中...</span>
                <Progress type="circle" percent={this.state.percent} status={this.state.status} />
              </div>
            </div>
          </div>
        </Modal>


      </div>
    )
  }
}
//测试试剂数据
class Modal1 extends Component{
    columns1 = [
    {
      title: '序号',
      dataIndex: 'key',
      width:150,
    },
    {
      title: '试剂',
      dataIndex: 'paperName',
      width:150,
      sorter: {
        compare: (a, b) => a.paperName - b.paperName,
        multiple: 3,
      },
    },
    {
      title: '计划日期',
      dataIndex: 'planTime',
      width: 150,
      sorter: {
        compare: (a, b) => a.planTime - b.planTime,
        multiple: 3,
      },
    },
    {
      title:'超时时间',
      dataIndex:'timeout',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.timeout - b.timeout,
        multiple: 3,
      },
    },
    {
      title:'测试状态',
      dataIndex:'testStatus',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.testStatus - b.testStatus,
        multiple: 3,
      },
    },
    {
      title:'操作',
      dataIndex:'patient_createTime',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.patient_name - b.patient_name,
        multiple: 3,
      },
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal5(record)}}>修改</Button>
        </Space>
      ),
    },
  ];
    columns2 = [
    {
      title: '序号',
      dataIndex: 'key',
      width:150,
      fixed: 'left',
    },
    {
      title: '试剂',
      dataIndex: 'paperName',
      width:150,
      sorter: {
        compare: (a, b) => a.paperName - b.paperName,
        multiple: 3,
      },
    },
    {
      title: '测试日期',
      dataIndex: 'testTime',
      width: 150,
      sorter: {
        compare: (a, b) => a.testTime - b.testTime,
        multiple: 3,
      },
    },
    {
      title: '计划日期',
      dataIndex: 'planTime',
      width: 150,
      sorter: {
        compare: (a, b) => a.planTime - b.planTime,
        multiple: 3,
      },
    },
    {
      title:'数值',
      dataIndex:'value',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.value - b.value,
        multiple: 3,
      },
    },
    {
      title:'GOD',
      dataIndex:'tgod',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.tgod - b.tgod,
        multiple: 3,
      },
    },
    {
      title:'批号',
      dataIndex:'bathNumber',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.bathNumber - b.bathNumber,
        multiple: 3,
      },
    },
    {
      title:'设备号',
      dataIndex:'deviceNo',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.deviceNo - b.deviceNo,
        multiple: 3,
      },
    },
    {
      title:'测试结果',
      dataIndex:'result',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.result - b.result,
        multiple: 3,
      },
    },
    {
      title:'测试状态',
      dataIndex:'testStatus',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.testStatus - b.testStatus,
        multiple: 3,
      },
    },
    {
      title:'测试图片',
      dataIndex:'testPicPathAli',
      width:150,
      align:'center',
      render: (text) =>
        //   ////console.log("record的内容",record)
        //<img src={text} width="100px" alt=""/>
        <Image src={text} width="100px" alt=""/>
    },
    {
      title:'C线图片',
      dataIndex:'testCLinePicPathAli',
      width:150,
      align:'center',
      render: (text) =>
        //   ////console.log("record的内容",record)
        //<img src={text} width="100px" alt=""/>
        <Image src={text} width="100px" alt=""/>
    },
    {
      title:'C线GOD',
      dataIndex:'cgod',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.cgod - b.cgod,
        multiple: 3,
      },
    },
    {
      title:'FSH/LH',
      dataIndex:'fshLh',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.fshLh - b.fshLh,
        multiple: 3,
      },
    },
    {
      title:'LH/FSH',
      dataIndex:'lhFsh',
      width:150,
      align:'center',
      sorter: {
        compare: (a, b) => a.lhFsh - b.lhFsh,
        multiple: 3,
      },
    },
    // {
    //     title:'操作',
    //     width:150,
    //     align:'center',
    //     render:(text,record)=>(
    //         <Space>
    //             <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.markButtonModal(record)}}>标曲</Button>
    //         </Space>
    //     ),
    // },
  ];
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
    let page = {
      page:1,
      pageSize:10
    }
    this.requestData1(page)
    //时间格式转换
    // let testTime=this.props.record.testTime;
    // let mymoment = moment(testTime,'YYYY-MM-DD HH:mm:ss');
    // this.state.testTime=mymoment;
  }
    componentDidMount = ()=>{
      //this.requestData3()
    }
  //函数部分
  requestData1=(page)=>{
      let url = "/user/test/data/detail/plan/list/"
      +this.props.record.clientId+'/'+this.props.record.testTypeId
      //精液液化
      if(this.props.record.testTypeCode==='sperm'){
        console.log('this')
        url = '/user/test/data/semen/test/list/'
          +this.props.record.eupregnaTestTypeId
          this.columns1 = [
            {
                title: '序号',
                dataIndex: 'key',
                width:150,
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                width:150,
                sorter: {
                    compare: (a, b) => a.paperName - b.paperName,
                    multiple: 3,
                },
            },
            {
                title: '结束时间',
                dataIndex: 'endDate',
                width: 150,
                sorter: {
                    compare: (a, b) => a.planTime - b.planTime,
                    multiple: 3,
                },
            },
            {
                title:'测试状态',
                dataIndex:'testStatus',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.timeout - b.timeout,
                    multiple: 3,
                },
            },
            {
                title:'测试结果',
                dataIndex:'result',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.testStatus - b.testStatus,
                    multiple: 3,
                },
            },
            {
              title:'是否完成',
              dataIndex:'finishFlag',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
              render:(text)=>{
                  if(text===false){
                    return(<span>否</span>)
                  }else if(text===true){
                    return(<span>是</span>)
                  }else{
                    return(<span></span>)
                  }
              }
            },
            {
                title:'是否取消',
                dataIndex:'abortFlag',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.testStatus - b.testStatus,
                    multiple: 3,
                },
                render:(text)=>{
                  if(text===false){
                    return(<span>否</span>)
                  }else if(text===true){
                    return(<span>是</span>)
                  }else{
                    return(<span></span>)
                  }
                }
            },
            {
              title:'用药类型',
              dataIndex:'takeDrugType',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
              title:'用药日期',
              dataIndex:'takeDrugDate',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
              title:'用药描述',
              dataIndex:'takeDrugDesc',
              width:150,
              align:'center',
              sorter: {
                  compare: (a, b) => a.testStatus - b.testStatus,
                  multiple: 3,
              },
            },
            {
                title:'操作',
                dataIndex:'patient_createTime',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.patient_name - b.patient_name,
                    multiple: 3,
                },
                render:(text,record)=>(
                    <Space>
                        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal13(record)}}>详细数据</Button>
                        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal5(record)}}>日志</Button>
                    </Space>
                ),
            },
        ];
      }
      //生精能力
      if(this.props.record.testTypeCode==='male_fsh'){
        url = '/user/test/data/male/fsh/list/'
          +this.props.record.eupregnaTestTypeId
          this.columns1 = [
            {
                title: '序号',
                dataIndex: 'key',
                width:150,
            },
            {
                title: '试剂',
                dataIndex: 'paperName',
                width:150,
                sorter: {
                    compare: (a, b) => a.paperName - b.paperName,
                    multiple: 3,
                },
            },
            {
                title: '测试日期',
                dataIndex: 'testTime',
                width: 150,
                sorter: {
                    compare: (a, b) => a.testTime - b.testTime,
                    multiple: 3,
                },
            },
            {
                title: '计划日期',
                dataIndex: 'planTime',
                width: 150,
                sorter: {
                    compare: (a, b) => a.planTime - b.planTime,
                    multiple: 3,
                },
            },
            {
                title:'数值',
                dataIndex:'value',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.value - b.value,
                    multiple: 3,
                },
            },
            {
                title:'GOD',
                dataIndex:'tgod',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.tgod - b.tgod,
                    multiple: 3,
                },
            },
            {
                title:'批号',
                dataIndex:'bathNumber',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.bathNumber - b.bathNumber,
                    multiple: 3,
                },
            },
            {
                title:'设备号',
                dataIndex:'deviceNo',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.deviceNo - b.deviceNo,
                    multiple: 3,
                },
            },
            // {
            // 		title:'测试结论',
            // 		dataIndex:'testResult',
            // 		width:150,
            // 		align:'center',
            // 		sorter: {
            // 				compare: (a, b) => a.result - b.result,
            // 				multiple: 3,
            // 		},
            // },
            {
                title:'测试图片',
                dataIndex:'testPicPathAli',
                width:150,
                align:'center',
                render: (text) =>
                  //   ////console.log("record的内容",record)
                  //<img src={text} width="100px" alt=""/>
                  <Image src={text} width="100px" alt=""/>
            },
            {
                title:'C线图片',
                dataIndex:'testCLinePicPathAli',
                width:150,
                align:'center',
                render: (text) =>
                  //   ////console.log("record的内容",record)
                  //<img src={text} width="100px" alt=""/>
                  <Image src={text} width="100px" alt=""/>
            },
            {
                title:'C线GOD',
                dataIndex:'cgod',
                width:150,
                align:'center',
                sorter: {
                    compare: (a, b) => a.cgod - b.cgod,
                    multiple: 3,
                },
            },
            // {
            // 		title:'FSH/LH',
            // 		dataIndex:'fshLh',
            // 		width:150,
            // 		align:'center',
            // 		sorter: {
            // 				compare: (a, b) => a.fshLh - b.fshLh,
            // 				multiple: 3,
            // 		},
            // },
            // {
            // 		title:'LH/FSH',
            // 		dataIndex:'lhFsh',
            // 		width:150,
            // 		align:'center',
            // 		sorter: {
            // 				compare: (a, b) => a.lhFsh - b.lhFsh,
            // 				multiple: 3,
            // 		},
            // },
            // {
            // 		title:'操作',
            // 		width:150,
            // 		align:'center',
            // 		render:(text,record)=>(
            // 			<Space>
            // 					<Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal(record)}}>修改数据</Button>
            // 			</Space>
            // 		),
            // },
        ];
      }
      let data={
          ...page,
      }
      console.log("request1:",data);
      ajax(url, {},'GET')
        .then((response)=>{
          console.log("res1",response)
            if(response.data.code!==1000){
                message.error("查询失败！")
            }else if(response.data.data===null){

            }
            else{
              let data=response.data.data.info
              if(data===undefined){
                data=response.data.data
              }
              let paginationProps={...this.state.paginationProps};
              addKey(data);
              paginationProps.total=response.data.data.total;
              paginationProps.current=page.page;
              paginationProps.pageSize=page.pageSize;
              console.log("request1 data:",response);
              this.setState({
                  data1:data,
                  paginationProps:paginationProps,
              });
            }
            //精液液化
            if(this.props.record.testTypeCode==='sperm'){
              this.setState({
                display2:'none',
                display3:'none'
              })
              this.requestData3(page)
            }
            //生精能力
            else if(this.props.record.testTypeCode==='male_fsh'){
              this.setState({
                display2:'none',
                display3:'none'
              })
              this.requestData3(page)
            }else{
              this.requestData2(page)
            }
        });
  }
  requestData2=(page)=>{
      let data={
          ...page,
      }
      console.log("request2:",data);
      console.log("???")
      ajax("/user/test/data/detail/list/"
        +this.props.record.clientId+'/'+this.props.record.testTypeId, {},'GET')
        .then((response)=>{
            if(response.data.data===null){
                message.error("查询失败！")
                console.log('error',response)
            }else{
                //console.log(response)
                let data=response.data.data.info;
                let paginationProps={...this.state.paginationProps};
                addKey(data);
                paginationProps.total=response.data.data.total;
                paginationProps.current=page.page;
                paginationProps.pageSize=page.pageSize;
                console.log("data:",response);
                this.setState({
                    data2:data,
                    paginationProps:paginationProps,
                },()=>{
                  if(this.state.data2.length===0){

                  }else{
                    this.requestData3(page)
                  }
                });
            }

        });
  }
    requestData3=()=>{
       console.log("request3:");
       //卵巢功能评估
       if(this.props.record.testTypeCode==="egg_quality"){
        ajax("/user/test/data/eggQualityCharts/"
        +this.state.data2[0].eupregnaTestId, {},'GET')
        .then((response)=>{
            console.log(response)
            if(response.data.data===null){
                message.error("查询失败！")
                console.log('error',response)
            }else{
              if(!response.data.data.isData){
                message.info('无画图数据')
                return 0
              }
                //console.log(response)
                let data=response.data.data;
                this.setState({
                 data3:data,
             },()=>{
               console.log('data3:',this.state.data3.paperName)
               //画图
               let chartDom = document.getElementById('figure1');
               let myChart = echarts.init(chartDom);
               let option;

               option = {
                   xAxis: {
                       type: 'category',
                       data: this.state.data3.xData,
                       //boundaryGap: false,
                      //  "axisLabel":{
                      // 	 interval: 0
                      // 	 }
                   },
                   yAxis: {
                       type: 'value'
                   },
                   tooltip: {
                     trigger: 'axis'
                   },
                   legend: {
                     data: this.state.data3.legend
                   },
                   // toolbox: {
                   // 	show: true,
                   // 	feature: {
                   // 			dataZoom: {
                   // 					yAxisIndex: 'none'
                   // 			},
                   // 			dataView: {readOnly: false},
                   // 			magicType: {type: ['line', 'bar']},
                   // 			restore: {},
                   // 			saveAsImage: {}
                   // 	}
                   // },
                   series: [
                     {
                       name: this.state.data3.result[0].name,
                       data: this.state.data3.result[0].data,
                       type: 'line'
                       },
                      {
                        name: this.state.data3.result[1].name,
                        data: this.state.data3.result[1].data,
                        type: 'line'
                      },
                      {
                        name: this.state.data3.result[2].name,
                        data: this.state.data3.result[2].data,
                        type: 'line'
                      },
                  ]
               };

               option && myChart.setOption(option);
             });

            }
        });
       }
       //精液液化
       else if(this.props.record.testTypeCode==="sperm"){
         //精液液化 用户名：77777777773

        ajax("/user/test/data/canvasSemenCharts/"
        +this.props.record.eupregnaTestTypeId, {},'GET')
        .then((response)=>{
            console.log(response)
            if(response.data.data===null){
                message.error("查询失败！")
                console.log('error',response)
            }else{
              if(!response.data.data.isData){
                message.info('无画图数据')
                return 0
              }
              //console.log(response)
              let data=response.data.data;
              this.setState({
                data3:data,
             },()=>{
               console.log('data3:',this.state.data3.paperName)
               //画图
               let chartDom = document.getElementById('figure1');
               let myChart = echarts.init(chartDom);
               let option;

               option = {
                   xAxis: {
                       type: 'category',
                       data: this.state.data3.xData,
                       //boundaryGap: false,
                      //  "axisLabel":{
                      // 	 interval: 0

                      // 	 }
                   },
                   yAxis: {
                       type: 'value'
                   },
                   tooltip: {
                     trigger: 'axis'
                   },
                   legend:{data: ['精液液化']},
                   series: [{
                    //name: this.state.data3.paperName[0],
                    name: '精液液化',
                    data: this.state.data3.data,
                    type: 'line'
                   }]
               };

               option && myChart.setOption(option);
             });

            }
        });
       }
       //生精能力
       else if(this.props.record.testTypeCode==="male_fsh"){
        //生精功能 用户名：Rabbit
        //tested
        console.log('圣经')
       ajax("/user/test/data/canvasMaleFshCharts/"
       +this.props.record.eupregnaTestTypeId, {},'GET')
       .then((response)=>{
           console.log(response)
           if(response.data.data===null){
               message.error("查询失败！")
               console.log('error',response)
           }else{
             if(!response.data.data.isData){
               message.info('无画图数据')
               return 0
             }
             //console.log(response)
             let data=response.data.data;
             if(data.paperName===undefined){
              data.paperName = ['tmp']
             }
             this.setState({
               data3:data,
            },()=>{
              console.log('data3:',this.state.data3.paperName)
              //画图
              let chartDom = document.getElementById('figure1');
              let myChart = echarts.init(chartDom);
              let option;

              option = {
                  xAxis: {
                      type: 'category',
                      data: this.state.data3.xData,
                      //boundaryGap: false,
                      // "axisLabel":{
                      // 	interval: 0

                      // 	}
                  },
                  yAxis: {
                      type: 'value'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: [this.state.data3.paperName[0]]
                  },
                  series: [{
                      name: this.state.data3.paperName[0],
                      data: this.state.data3.data,
                      type: 'line'
                  }]
              };

              option && myChart.setOption(option);
            });

           }
       });
      }else{
         //其他图表绘制（寻找黄金优孕期、早期妊娠确认、早期胚胎检测）
         //tested
        ajax("/user/test/data/canvasCharts/"
        +this.state.data2[0].eupregnaTestId, {},'GET')
        .then((response)=>{
            console.log(response)
            if(response.data.data===null){
                message.error("查询失败！")
                console.log('error',response)
            }else{
              if(!response.data.data.isData){
                message.info('无画图数据')
                return 0
              }
              //console.log(response)
              let data=response.data.data;
              this.setState({
                data3:data,
             },()=>{
               console.log('data3:',this.state.data3.paperName)
               //画图
               let chartDom = document.getElementById('figure1');
               let myChart = echarts.init(chartDom);
               let option;

               option = {
                   xAxis: {
                       type: 'category',
                       data: this.state.data3.xData,
                       boundaryGap: true,
                      //  "axisLabel":{
                      // 	 interval: 0

                      // 	 }
                   },
                   yAxis: {
                       type: 'value'
                   },
                   tooltip: {
                     trigger: 'axis'
                   },
                   legend: {
                     data: [this.state.data3.paperName[0]]
                   },
                   // toolbox: {
                   // 	show: true,
                   // 	feature: {
                   // 			dataZoom: {
                   // 					yAxisIndex: 'none'
                   // 			},
                   // 			dataView: {readOnly: false},
                   // 			magicType: {type: ['line', 'bar']},
                   // 			restore: {},
                   // 			saveAsImage: {}
                   // 	}
                   // },
                   series: [{
                       name: this.state.data3.paperName[0],
                       data: this.state.data3.data,
                       type: 'line'
                   }]
               };

               option && myChart.setOption(option);
             });

            }
        });
       }
   }
  //弹窗关闭函数
  handleCancel= ()=>{
    this.props.setVisible(false);
  }
  //点击完成
  handleOk = () => {
    // //console.log('添加完成')
    // //console.log(this.form)
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
        ////console.log("request:",data);
        ajax(url,data,'POST')
        .then((response)=>{
          if(response.data.code!==1002){
            ////console.log("请求错误！",response);
            message.error("添加失败！")
          }else{
            //form.resetFields();
            ////console.log("添加成功：",response);
            //Object.assign(this.props.record,this.state.input);
            this.props.setVisible(false);
          }
        });
      })
      .catch((info) => {
        ////console.log('Validate Failed:', info);
        message.error("表单验证出错！");
      });


  };

  //时间选择函数
  rangePickerOnChange=(value, dateString)=>{
    //console.log('Selected Time: ', value);
    //console.log('Formatted Selected Time: ', dateString);
    let input = {};
    Object.assign(input, this.state.input)
    //this.state.input.testTime=dateString;
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
  //弹窗4
  //添加计划
  Modal = ()=>{
    if(this.state.modalVisible)
      return(
        <Modal4
        record={this.props.record}
        visible={this.state.modalVisible}
        setVisible={this.setModalvisible}
        />
      );
  }
  setModalvisible=(flag)=>{
      if(flag===false){
        let page = {
          page:1,
          pageSize:10
        }
        this.requestData1(page)
      }
    this.setState({
      modalVisible:flag,
    });
  }
  lookModal=()=>{
    let record4 = this.props.record;
    // record4.testSetName = this.props.record.testSetName
    // record4.nickName = this.props.record.nickName
    record4.paperName = ''
    for(let i = 0;i<this.state.data1.length;i++){
      if(record4.paperName!==this.state.data1[i].paperName){
        if(record4.paperName===''){
          record4.paperName = this.state.data1[i].paperName;
        }else{
          record4.paperName = record4.paperName+' , '+this.state.data1[i].paperName
          break;
        }
      }
    }
    record4.eupregnaTestId = this.state.data1[0].eupregnaTestId
    record4.paperId =  this.state.data1[0].paperTypeId
    if(this.props.record.testType==='卵巢功能评估'){
      for(let i = 0;i<this.state.data1.length;i++){
        if(record4.paperId!==this.state.data1[i].paperTypeId){
          if(record4.paperId===''){
            record4.paperId = this.state.data1[i].paperTypeId;
          }else{
            record4.paperId = record4.paperId+','+this.state.data1[i].paperTypeId
            break;
          }
        }
      }
    }
    console.log('record4',record4)
    // record4
    this.setState({
      modalVisible:true,
      record:record4,
    });
  }
  //弹窗5
  //修改计划
  Modal5 = ()=>{
    if(this.state.modalVisible5)
    {
      return(
        <Modal5
        record={this.state.record5}
        visible={this.state.modalVisible5}
        setVisible={this.setModalvisible5}
        />
      );
    }
  }
  setModalvisible5=(flag)=>{
      if(flag===false){
        let page = {
          page:1,
          pageSize:10
        }
        this.requestData1(page)
      }
    this.setState({
      modalVisible5:flag,
    });
  }
  lookModal5=record=>{
    let record5 = record;
    record5.testSetName = this.props.record.testSetName
    record5.nickName = this.props.record.nickName

    this.setState({
      modalVisible5:true,
      record5:record5,
    });
  }
    //弹窗13
  //精液液化 详细数据
  Modal13 = ()=>{
      if(this.state.modalVisible13)
      {
          return(
            <Modal13
              record={this.state.record13}
              visible={this.state.modalVisible13}
              setVisible={this.setModalvisible13}
            />
          );
      }
  }
  setModalvisible13=(flag)=>{
      this.setState({
          modalVisible13:flag,
      });
  }
  lookModal13=record=>{
      let record13 = record;
      record13.testSetName = this.props.record.testSetName
      record13.nickName = this.props.record.nickName
      record13.testTypeName = this.props.record.testTypeName

      this.setState({
          modalVisible13:true,
          record13:record13,
      });
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
        title={"测试试剂数据"}
        centered
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
        width={1200}
        >
          <div>
            <div>
              <span className={"span1"}>用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.record.nickName}</span>
            </div>
            <div>
              <span className={"span1"}>测试类型&nbsp; {this.props.record.testType}</span>
            </div>
            <div>
                        <div id="figure1" style={{ width: '100%', height: 500 }}></div>
            </div>
          </div>

          <div style = {this.state.style1}>
            <Button style = {{display:this.state.display2}}
            type="primary"
            icon={<PlusOutlined  className="icon1" />}
            onClick={this.lookModal}
            className="button2"
            block
            >
              添加计划
            </Button>
            <div style={{height:'100%',margin:'3px'}}>
              <Table
              columns={this.columns1}
              dataSource={this.state.data1}
              bordered={true}
              style={{margin:"20px 0",borderBottom:'1px,soild'}}
              pagination={false}
              />
            </div>
          </div>

          <div style = {{display:this.state.display3}}>
            <div>
              <span className={"span1"}>测试数据</span>
            </div>
            <div style={{height:'100%',margin:'3px'}}>
              <Table
              columns={this.columns2}
              dataSource={this.state.data2}
              bordered={true}
              style={{margin:"20px 0",borderBottom:'1px,soild'}}
              pagination={false}
              scroll={{ x: 1000 }}
              />
            </div>
          </div>

        </Modal>
        {this.Modal()}
        {this.Modal5()}
        {this.Modal13()}
      </div>
    )
  }
}

export default class UserManagement extends Component {
  //初始化
  constructor(props) {
    super(props);
    this.search();
  }

  //表格1数据以及函数
  //常量数据部分
  columns = [
    {
      title:'用户昵称',
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
      title:'当前设备号',
      dataIndex:'deviceCode',
      width:150,
      align:'center',
    },
    {
      title:'生理周期',
      dataIndex:'cycle',
      width:150,
      align:'center',
    },
    {
      title:'末次月经周期天数',
      dataIndex:'lastCycleNumber',
      width:150,
      align:'center',
    },
    {
      title:'末次月经时间',
      dataIndex:'lastBleeding',
      width:150,
      align:'center',
    },
    {
      title:'注册时间',
      dataIndex:'regTime',
      width:150,
      align:'center',
    },
    {
      title:'终止测试',
      dataIndex:'eupregnaEnded',
      width:150,
      align:'center',
      // render:(text,record)=>(
      //   <Switch checkedChildren="是" unCheckedChildren="否" checked={record.ended} onChange={()=>{this.eupregnaEndedChange(record)}}/>
      // )
      render:(text,record)=>{return(<Switch checkedChildren="是" unCheckedChildren="否" checked={record.eupregnaEnded} onChange={()=>{this.eupregnaEndedChange(record)}}/>)
      }
    },
    {
      title:'上传日志',
      dataIndex:'uploadLogFlag',
      width:150,
      align:'center',
      render:(text,record)=>(
        <Switch checkedChildren="是" unCheckedChildren="否" checked={record.uploadLogFlag} onChange={()=>{this.updateLog(record)}}/>
      )
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:400,
      align:'center',
      render:(text,record)=>(
        <Space>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.testData(record)}}>测试数据</Button>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal7(record)}}>历史测试数据</Button>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal2(record)}}>发送事件</Button>
          <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookModal12(record)}}>修改用户信息</Button>
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
        rangePickerData:undefined,
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
    console.log("request:",data);
    ajax("/user/management/test/list",data,'POST')
      .then((response)=>{
        if(response.data.data===null){
          message.error("查询失败！")
        }else{
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
    // ajax("/user/base/info/list",data,'POST')
    //   .then((response)=>{
    //       if(response.data.data==null){
    //           console.log(response);
    //           message.error("request error! code:"+response.data.code);
    //       }else{
    //           let data=response.data.data.info;
    //           let paginationProps={...this.state.paginationProps};
    //           addKey(data);
    //           paginationProps.total=response.data.data.total;
    //           paginationProps.current=page.page;
    //           paginationProps.pageSize=page.pageSize;
    //           console.log("data:",response);
    //           this.setState({
    //               data:data,
    //               paginationProps:paginationProps,
    //           });
    //       }
    //   });
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
  //终止测试
  eupregnaEndedChange=(record)=>{
    //console.log("eupregnaEndedChange!");
    let myMap = {}
    myMap[false] = 1;
    myMap[true] = 0;
    let data={};
    data.clientId=record.clientId;
    data.eupregnaEnded = myMap[record.eupregnaEnded];
    //console.log("request:",data);
    ajax("/user/base/test/stop/"
      +data.clientId+'/'+data.eupregnaEnded, {},'GET')
      .then((response)=>{
        if(response.data.code!==1004){
          console.log("请求错误！",response);
        }else{
          console.log("修改成功：",response);
          record.eupregnaEnded = !record.eupregnaEnded;
          this.setState({})
          // let mydata = []
          // Object.assign(mydata,this.state.data)
          // console.log(mydata)
          // this.setState({
          //     data:mydata
          // })

        }
      });
  }
  //上传日志
  updateLog=(record)=>{
    console.log("updateLog!");
    let myMap = {}
    myMap[false] = 1;
    myMap[true] = 0;
    let data={};
    data.uploadLogFlag=myMap[record.uploadLogFlag];
    data.clientId=record.clientId;
    //console.log("request:",data);
    ajax("/user/base/log/update/"
      +data.clientId+'/'+data.uploadLogFlag, {},'GET')
      .then((response)=>{
        if(response.data.code!==1004){
          console.log("请求错误！",response);
        }else{
          console.log("修改成功：",response);
          record.uploadLogFlag = !record.uploadLogFlag;
          this.setState({})
          console.log(this.state.data)
        }
      });
  }
  //测试数据
  testData=(record)=>{
    this.lookModal3(record);
  }
  //得到输入时间
  rangePickerDataChange=(datas,dateStrings)=>{
    ////console.log("timeTest!");
    ////console.log(datas);
    ////console.log(dateStrings);
    let input = {}
    input.startTime=dateStrings[0]+" 00:00:00";
    input.endTime=dateStrings[1]+" 23:59:59";
    this.setState({
      input:input,
      rangePickerData:datas,
    })
  }
  RadioInputChange = (e,name) => {
    //console.log(name);
    //console.log(e.target.value);
    let source={};
    source[name]=e.target.value;
    this.setState({
      input:Object.assign(this.state.input,source),
    },this.search)
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
      userName:"",
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
    ],

    //表格2数据


  };

  //弹窗函数

  //弹窗1

  // //弹窗2
  //发送事件
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
  // //弹窗3
  //测试数据
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
  // //弹窗7
  //历史测试数据
  Modal7 = ()=>{
    if(this.state.modalVisible7)
      return(
        <Modal7
        record={this.state.record7}
        visible={this.state.modalVisible7}
        setVisible={this.setModalvisible7}
        />
      );
  }
  setModalvisible7=(flag)=>{
    this.setState({
      modalVisible7:flag,
    });
  }
  lookModal7=record=>{
    this.setState({
      modalVisible7:true,
      record7:record,
    });
  }
    // //弹窗12
  //修改用户信息
  Modal12 = ()=>{
    if(this.state.modalVisible12)
      return(
        <Modal12
        record={this.state.record12}
        visible={this.state.modalVisible12}
        setVisible={this.setModalvisible12}
        />
      );
  }
  setModalvisible12=(flag)=>{
    this.setState({
      modalVisible12:flag,
    });
  }
  lookModal12=record=>{
    this.setState({
      modalVisible12:true,
      record12:record,
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
            <Input placeholder={'电话'} className={'input1'} onChange={(e)=>{this.inputChange(e,"phone")}} value={this.state.input.phone}/>
            <Input placeholder={'设备码'} className={'input1'} onChange={(e)=>{this.inputChange(e,"deviceCode")}} value={this.state.input.deviceCode}/>
            <RangePicker value={this.state.rangePickerData} onChange={(data,datastrings)=>{this.rangePickerDataChange(data,datastrings)}}></RangePicker>
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
        <div>
          <Radio.Group onChange={(e)=>{this.RadioInputChange(e,"radioValue")}} value={this.state.input.radioValue} defaultValue={''}>
            <Radio value={''}><span className={"span2"}>全部</span></Radio>
            <Radio value={1}><span className={"span2"}>有效用户</span></Radio>
            <Radio value={2}><span className={"span2"}>今日已测试用户</span></Radio>
            <Radio value={3}><span className={"span2"}>今日有测试计划用户</span></Radio>
            <Radio value={4}><span className={"span2"}>今日漏测用户</span></Radio>
            <Radio value={5}><span className={"span2"}>今日报警用户</span></Radio>
          </Radio.Group>
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
          scroll={{ y: 550 }}
          pagination={this.state.paginationProps}
          onChange={this.handleTableChange}
          />
        </div>
        {this.Modal3()}
        {this.Modal2()}
        {this.Modal7()}
        {this.Modal12()}
      </div>
    )
  }
}
