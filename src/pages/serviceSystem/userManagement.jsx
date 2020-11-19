import React, { Component } from 'react'
import {Table, Button, Input, Select, Space, Modal, Form,Checkbox } from 'antd';
import { DatePicker} from 'antd';
import { Radio } from 'antd';
import { Switch } from 'antd';
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

class TestReagentDataTable1 extends Component{
    columns = [
        {
            title: '序号',
            dataIndex: 'patient_accountNumber',
            width:150,
        },
        {
            title: '试剂',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '计划日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'超时时间',
            dataIndex:'patient_address',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'已测试',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modifyReagentData(record)}}>修改</Button>
                </Space>
            ),
        },


    ];
    state={
        visible_modify:false,
        record:{},
    }
    modifyReagentData=(record)=>{
        this.setState({
            visible_modify:true,
        });
    }
    handleCancle_modify=()=>{
        this.setState({
            visible_modify:false,
        });
    }
    handleModifyOk=()=>{
        this.setState({
            visible_modify:false,
        });
    }
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
                <Modal
                    title={"修改测试计划"}
                    centered
                    visible={this.state.visible_modify}
                    onCancel={this.handleCancle_modify}
                    onOk={this.handleModifyOk}
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
                                    label="用户"
                                    name="用户"
                                >
                                    <span>12312311123</span>
                                </Form.Item>
                                <Form.Item label="试剂"
                                           name={"试剂"}
                                >
                                    <span >卵泡</span>
                                </Form.Item>
                                <Form.Item label="测试集"
                                           name={"测试集"}
                                >
                                    <span>卵泡</span>
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
                                    <Input  placeholder={"请输入计划时间"} />
                                </Form.Item>
                                <Form.Item label="计划类型"
                                           name={"计划类型"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入计划类型!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入计划类型"} />
                                </Form.Item>
                                <Form.Item label="超时时间"
                                           name={"超时时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入超时时间!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="计划添加原因"
                                           name={"计划添加原因"}
                                >
                                    <Input  placeholder={"请输入计划添加原因"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
class TestReagentDataTable2 extends Component{
    columns = [
        {
            title: '序号',
            dataIndex: 'patient_accountNumber',
            width:150,
        },
        {
            title: '试剂',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '测试日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '计划日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'数量',
            dataIndex:'patient_address',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'GOD',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'批号',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'设备号',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'结果',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'测试状态',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'测试图片',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'C线图片',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'C线GOD',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'FSH/LH',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'LH/FSH',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.markButtonModal(record)}}>标曲</Button>
                </Space>
            ),
        },
    ];
    state={
        visible_lookmark:false,
    }
    markButtonModal=()=>{
        this.setState({
            visible_lookmark:true,
        })
    }
    handleCancle_mark=()=>{
        this.setState({
            visible_lookmark:false,
        })
    }
    handleMarkOk=()=>{
    this.setState({
            visible_lookmark:false,
        })
    }
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
                <Modal
                    title={"试剂判读参数"}
                    centered
                    visible={this.state.visible_lookmark}
                    onCancel={this.handleCancle_mark}
                    onOk={this.handleMarkOk}
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

                                <Form.Item label="批号"
                                           name={"批号"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入批号!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入计划时间"} />
                                </Form.Item>
                                <Form.Item label="试剂类型"
                                           name={"试剂类型"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入试剂类型!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入试剂类型"} />
                                </Form.Item>
                                <Form.Item label="生产日期"
                                           name={"生产日期"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item
                                    name="能效已降低"
                                    valuePropName="checked">
                                    <Checkbox>能效已降低</Checkbox>
                                </Form.Item>
                                <Form.Item label="反应时间（秒）"
                                           name={"反应时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入反应时间!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入反应时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_WIDTH"
                                           name={"LINE_WIDTH"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_WIDTH!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入请输入LINE_WIDTH"} />
                                </Form.Item>
                                <Form.Item label="LINE_LENGTH"
                                           name={"LINE_LENGTH"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_LENGTH!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_LENGTH"} />
                                </Form.Item>
                                <Form.Item label="LINE_PX"
                                           name={"LINE_PX"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_PX!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_PX"} />
                                </Form.Item>
                                <Form.Item label="LINE_PY"
                                           name={"LINE_PY"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_PY!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_PY"} />
                                </Form.Item>
                                <Form.Item label="LINEOR"
                                           name={"LINEOR"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINEOL"
                                           name={"LINEOL"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINEL"
                                           name={"LINEL"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINER"
                                           name={"LINER"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item
                                    name="是定性"
                                    valuePropName="checked">
                                    <Checkbox>是定性</Checkbox>
                                </Form.Item>
                                <Form.Item label="定性阴性GOD值"
                                           name={"定性阴性GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="定性阳性+GOD值"
                                           name={"定性阳性+GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="定性弱阳性GOD值"
                                           name={"定性弱阳性GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_NO"
                                           name={"LINE_NO"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N1"
                                           name={"LINE_N1"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N2"
                                           name={"LINE_N2"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N3"
                                           name={"LINE_N3"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
class HistoryTestReagentDataTable extends Component{
    columns = [
        {
            title: '序号',
            dataIndex: 'patient_accountNumber',
            width:150,
        },
        {
            title: '试剂',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '测试日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '计划日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'数量',
            dataIndex:'patient_address',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'GOD',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'批号',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'设备号',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'结果',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'测试状态',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'测试图片',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'C线图片',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'C线GOD',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'FSH/LH',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'LH/FSH',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
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
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.markButtonModal(record)}}>标曲</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookmodify(record)}}>修改数据</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{}}>日志</Button>
                </Space>
            ),
        },
    ];
    state={
        visible_lookmark:false,
        visible_lookmodify:false,
    }
    lookmodify=()=>{
        this.setState({
            visible_lookmodify:true,
        })
    }
    markButtonModal=()=>{
        this.setState({
            visible_lookmark:true,
        })
    }
    handleCancle_mark=()=>{
        this.setState({
            visible_lookmark:false,
        })
    }
    handleMarkOk=()=>{
        this.setState({
            visible_lookmark:false,
        })
    }
    handleCancle_lookmodify=()=>{
        this.setState({
            visible_lookmodify:false,
        })
    }
    handleLookModifyOk=()=>{
        this.setState({
            visible_lookmodify:false,
        })
    }
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
                <Modal
                    title={"试剂判读参数"}
                    centered
                    visible={this.state.visible_lookmark}
                    onCancel={this.handleCancle_mark}
                    onOk={this.handleMarkOk}
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

                                <Form.Item label="批号"
                                           name={"批号"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入批号!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入计划时间"} />
                                </Form.Item>
                                <Form.Item label="试剂类型"
                                           name={"试剂类型"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入试剂类型!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入试剂类型"} />
                                </Form.Item>
                                <Form.Item label="生产日期"
                                           name={"生产日期"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item
                                    name="能效已降低"
                                    valuePropName="checked">
                                    <Checkbox>能效已降低</Checkbox>
                                </Form.Item>
                                <Form.Item label="反应时间（秒）"
                                           name={"反应时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入反应时间!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入反应时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_WIDTH"
                                           name={"LINE_WIDTH"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_WIDTH!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入请输入LINE_WIDTH"} />
                                </Form.Item>
                                <Form.Item label="LINE_LENGTH"
                                           name={"LINE_LENGTH"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_LENGTH!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_LENGTH"} />
                                </Form.Item>
                                <Form.Item label="LINE_PX"
                                           name={"LINE_PX"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_PX!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_PX"} />
                                </Form.Item>
                                <Form.Item label="LINE_PY"
                                           name={"LINE_PY"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入LINE_PY!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入LINE_PY"} />
                                </Form.Item>
                                <Form.Item label="LINEOR"
                                           name={"LINEOR"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINEOL"
                                           name={"LINEOL"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINEL"
                                           name={"LINEL"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINER"
                                           name={"LINER"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item
                                    name="是定性"
                                    valuePropName="checked">
                                    <Checkbox>是定性</Checkbox>
                                </Form.Item>
                                <Form.Item label="定性阴性GOD值"
                                           name={"定性阴性GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="定性阳性+GOD值"
                                           name={"定性阳性+GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="定性弱阳性GOD值"
                                           name={"定性弱阳性GOD值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_NO"
                                           name={"LINE_NO"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N1"
                                           name={"LINE_N1"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N2"
                                           name={"LINE_N2"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="LINE_N3"
                                           name={"LINE_N3"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title={"修改数据"}
                    centered
                    visible={this.state.visible_lookmodify}
                    onCancel={this.handleCancle_lookmodify}
                    onOk={this.handleLookModifyOk}
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

                                <Form.Item label="数值"
                                           name={"数值"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入批号!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入计划时间"} />
                                </Form.Item>
                                <Form.Item label="GOD"
                                           name={"GOD"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入试剂类型!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入试剂类型"} />
                                </Form.Item>
                                <Form.Item label="CGOD"
                                           name={"CGOD"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入生产日期!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
class TestReagentQuestionDataTable extends Component{
    columns = [
        {
            title: '试剂',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '计划日期',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'测试日期',
            dataIndex:'patient_address',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'条码',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'错误类型',
            dataIndex:'patient_createTime',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'问题图片',
            dataIndex:'patient_createTime',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
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

class TestTimesDataTable extends Component{
    columns = [
        {
            title: '测试类型',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '测试次数',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:150,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestDataLineButton2(record)}}>历史测试数据</Button>
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
    state=
        {
            visible_historyTestDataLineButton:false,
            historyTestReagentData:[{}],
            record:[],
        }
    lookHistoryTestDataLineButton2=()=>{
        this.setState({
            visible_historyTestDataLineButton2: true,
        });
    }
    handleCancle_historyTestDataLineButton2=()=>{
        this.setState({
            visible_historyTestDataLineButton2:false,
        });
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };
    setHistoryTestReagentData=(data)=>{
        this.setState({
            historyTestReagentData:data,
        })
    }
    historyTestReagentDataTable = ()=>{
        return(
            <HistoryTestReagentDataTable
                data={this.state.historyTestReagentData}
                dataChange={this.setHistoryTestReagentData}
            />
        );
    }
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
                <Modal
                    title={"测试试剂数据"}
                    centered
                    visible={this.state.visible_historyTestDataLineButton2}
                    onCancel={this.handleCancle_historyTestDataLineButton2}
                    footer={null}
                    className="modal1"
                    width={1350}
                >
                    <p>用户名 123132</p>
                    <p>测试类型   卵巢</p>
                    <p>这里有张图片</p>
                    {this.historyTestReagentDataTable()}
                </Modal>
            </div>
        );
    }
}

class HistoryTestDataTable extends Component{
    columns = [
        {
            title: '周期开始时间',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '周期结束时间',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:150,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestDataLineButton(record)}}>查看</Button>
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
    state=
        {
            visible_historyTestDataLineButton:false,
            testTimesData:[{}],
            record:[],
        }
    lookHistoryTestDataLineButton=()=>{
        this.setState({
            visible_historyTestDataLineButton: true,
        });
    }
    handleCancle_testReagentQuestionData=()=>{
        this.setState({
            visible_testReagentQuestionData: false,
        });
    }
    testReagentQuestionDataTable = ()=>{
        return(
            <TestReagentQuestionDataTable
                data={this.state.testReagentQuestionData}
                dataChange={this.setTestReagentQuestionData}
            />
        );
    }
    setTestReagentQuestionData=(data)=>{
        this.setState({
            testReagentQuestionData:data,
        });
    }
    handleCancle_historyTestDataLineButton=()=>{
        this.setState({
            visible_historyTestDataLineButton:false,
        });
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };
    setTestTimesData=(data)=>{
        this.setState({
            testTimesData:data,
        });
    }
    testTimesDataTable = ()=>{
        return(
            <TestTimesDataTable
                data={this.state.testTimesData}
                dataChange={this.setTestTimesData}
            />
        );
    }
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
                <Modal
                    title={"测试次数"}
                    centered
                    visible={this.state.visible_historyTestDataLineButton}
                    onCancel={this.handleCancle_historyTestDataLineButton}
                    footer={null}
                    className="modal1"
                >
                    <p>用户名 123132</p>
                    <p>时间   2020年07月01日-2020年07月02日</p>
                    {this.testTimesDataTable()}
                </Modal>
                <Modal
                    title={"查看日志"}
                    centered
                    visible={this.state.visible_testReagentQuestionData}
                    onCancel={this.handleCancle_testReagentQuestionData}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        {this.testReagentQuestionDataTable()}
                    </div>
                </Modal>
            </div>
        );
    }
}

class TestDataTable extends Component{
    columns = [
        {
            title: '测试类型',
            dataIndex: 'patient_accountNumber',
            width:150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title: '测试次数',
            dataIndex: 'patient_age',
            width: 150,
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'本次测试是否完成',
            dataIndex:'patient_address',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'本次测试结论',
            dataIndex:'patient_testState',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'本次测试时间',
            dataIndex:'patient_createTime',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:150,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookTestReagentData(record)}}>测试试剂数据</Button>
                    <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.lookTestReagentQuestionData(record)}}>测试试剂问题数据</Button>
                </Space>
            ),
        },
    ];
    state=
    {
        visible_testReagentQuestionData:false,
        visible_testReagentData:false,
        visible_addPlan:false,
        testReagentQuestionData:[{}],
        testReagentData1:[{}],
        testReagentData2:[{}],
        record:[],
    }
    lookTestReagentQuestionData=(record)=>{
        this.setState({
            visible_testReagentQuestionData:true,
            record:record,
        });
    }
    lookTestReagentData=(record)=>{
        this.setState({
            visible_testReagentData:true,
            record:record,
        });
    }
    handleCancle_testReagentQuestionData=()=>{
        this.setState({
            visible_testReagentQuestionData: false,
        });
    }
    handleCancle_testReagentData=()=>{
        this.setState({
            visible_testReagentData: false,
        });
    }
    testReagentQuestionDataTable = ()=>{
        return(
            <TestReagentQuestionDataTable
                data={this.state.testReagentQuestionData}
                dataChange={this.setTestReagentQuestionData}
            />
        );
    }
    testReagentDataTable1 = ()=>{
        return(
            <TestReagentDataTable1
                data={this.state.testReagentData1}
                dataChange={this.setTestReagentData1}
            />
        );
    }
    testReagentDataTable2 = ()=>{
        return(
            <TestReagentDataTable2
                data={this.state.testReagentData2}
                dataChange={this.setTestReagentData2}
            />
        );
    }
    setTestReagentQuestionData=(data)=>{
        this.setState({
            testReagentQuestionData:data,
        });
    }
    setTestReagentData1=(data)=>{
        this.setState({
            testReagentData1:data,
        });
    }
    setTestReagentData2=(data)=>{
        this.setState({
            testReagentData2:data,
        });
    }
    addPlan=()=>{
        this.setState({
            visible_addPlan:true,
        });
    }
    handleCancle_addPlan=()=>{
        this.setState({
            visible_addPlan:false,
        });
    }
    handleAddPlanOk=()=>{
        this.setState({
            visible_addPlan:false,
        });
        this.state.form.submit();
    }
    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
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
                <Modal
                    title={"添加测试计划"}
                    centered
                    visible={this.state.visible_addPlan}
                    onCancel={this.handleCancle_addPlan}
                    onOk={this.handleAddPlanOk}
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
                            >
                                <Form.Item
                                    label="用户"
                                    name="用户"
                                >
                                    <span>12312311123</span>
                                </Form.Item>
                                <Form.Item label="试剂"
                                           name={"试剂"}
                                >
                                    <span >卵泡</span>
                                </Form.Item>
                                <Form.Item label="测试集"
                                           name={"测试集"}
                                >
                                    <span>卵泡</span>
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
                                    <Input  placeholder={"请输入计划时间"} />
                                </Form.Item>
                                <Form.Item label="计划类型"
                                           name={"计划类型"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入计划类型!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入计划类型"} />
                                </Form.Item>
                                <Form.Item label="超时时间"
                                           name={"超时时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入超时时间!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入超时时间"} />
                                </Form.Item>
                                <Form.Item label="计划添加原因"
                                           name={"计划添加原因"}
                                >
                                    <Input  placeholder={"请输入计划添加原因"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title={"测试试剂问题数据"}
                    centered
                    visible={this.state.visible_testReagentQuestionData}
                    onCancel={this.handleCancle_testReagentQuestionData}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        {this.testReagentQuestionDataTable()}
                    </div>
                </Modal>
                <Modal
                    title={"测试试剂数据"}
                    centered
                    visible={this.state.visible_testReagentData}
                    onCancel={this.handleCancle_testReagentData}
                    footer={null}
                    width={1200}
                >
                    <div>
                        <div>
                            <span className={"span1"}>用户名    1512252366</span>
                        </div>
                        <div>
                            <span className={"span1"}>测试类型  卵巢功能评估</span>
                        </div>
                        <div>
                            这里有一个表，后面做
                        </div>
                    </div>

                    <div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined  className="icon1" />}
                            onClick={this.addPlan}
                            className="button3"
                            block
                        >
                            添加计划
                        </Button>
                        <div style={{height:'100%',margin:'3px'}}>
                            {this.testReagentDataTable1()}
                        </div>
                    </div>

                    <div>
                        <div>
                            <span className={"span1"}>测试数据</span>
                        </div>
                        <div style={{height:'100%',margin:'3px'}}>
                            {this.testReagentDataTable2()}
                        </div>
                    </div>

                </Modal>
            </div>
        );
    }
}

class PatientTable extends Component{
    columns = [
        {
            title:'姓名',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'用户名',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'当前使用设备',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'生理周期',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'末次月经周期天数',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'末次月经时间',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'注册时间',
            dataIndex:'doctor_phone',
            width:150,
            align:'center',
            sorter: {
                compare: (a, b) => a.patient_name - b.patient_name,
                multiple: 3,
            },
        },
        {
            title:'中止优孕宝测试',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            render:()=>(
                <Switch checkedChildren="是" unCheckedChildren="否" />
            )
        },
        {
            title:'上传日志',
            dataIndex:'doctor_name',
            width:150,
            align:'center',
            render:()=>(
                <Switch checkedChildren="是" unCheckedChildren="否" />
            )
        },
        {
            title:'操作',
            dataIndex:'operation',
            width:300,
            align:'center',
            render:(text,record)=>(
                <Space>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookTestData(record)}}>测试数据</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookHistoryTestData(record)}}>历史测试数据</Button>
                    <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.lookSendEvent(record)}}>发送事件</Button>
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
        visible_latestData:false,
        visible_testData:false,
        visible_historyTestData:false,
        visible_sendEvent:false,
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
        latestData:[{},{}],
        testData:[{},{}],
        historyTestData:[{}],
        singleSelectValue:1,
    }
    lookTestData=(record)=>{
        this.setState({
            visible_testData:true,
            record:record,
        });
    }
    lookHistoryTestData=(record)=>{
        this.setState({
            visible_historyTestData:true,
            record:record,
        });
    }
    lookSendEvent=(record)=>{
        this.setState({
            visible_sendEvent:true,
            record:record,
        });
    }
    handleTableChange = (pagination) =>{
        console.log(pagination)
    };
    singleSelectonChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
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
    handleCancle_testData=()=>{
        this.setState({
            visible_testData:false,
        })
    }
    handleCancle_historyTestData=()=>{
        this.setState({
            visible_historyTestData:false,
        })
    }
    handleCancle_sendEvent=()=>{
        this.setState({
            visible_sendEvent:false,
        })
    }
    handleOk_sendEvent=()=>{
        this.setState({
            visible_sendEvent:false,
        })
    }
    testDataTable = ()=>{
        return(
            <TestDataTable
                data={this.state.testData}
                dataChange={this.setTestData}
            />
        );
    }
    historyTestDataTable = ()=>{
        return(
            <HistoryTestDataTable
                data={this.state.historyTestData}
                dataChange={this.setHistoryTestData}
            />
        );
    }
    setTestData=(data)=>{
        this.setState({
            testData:data,
        });
    }
    setHistoryTestData=(data)=>{
        this.setState({
            historyTestData:data,
        });
    }

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
                <Modal
                    title={"测试数据"}
                    centered
                    visible={this.state.visible_testData}
                    onCancel={this.handleCancle_testData}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px'}}>
                        <p><span className={"span2"}>用户名 {this.state.record.doctor_name}</span></p>
                        {this.testDataTable()}
                    </div>
                </Modal>
                <Modal
                    title={"历史测试数据"}
                    centered
                    visible={this.state.visible_historyTestData}
                    onCancel={this.handleCancle_historyTestData}
                    footer={null}
                    width={800}
                >
                    <div style={{height:'100%',margin:'3px',}}>
                        <span className={"span2"}>用户名 {this.state.record.doctor_name}</span>
                        <Button
                            type={"primary"}
                            onClick={this.looklog}
                            className={"button3"}
                        >
                            查看日志
                        </Button>
                        {this.historyTestDataTable()}
                    </div>
                </Modal>
                <Modal
                    title={"发送事件"}
                    centered
                    visible={this.state.visible_sendEvent}
                    onCancel={this.handleCancle_sendEvent}
                    onOk={this.handleOk_sendEvent}
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
                                <Form.Item label="时间"
                                           name={"时间"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入时间!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入时间"} />
                                </Form.Item>
                                <Form.Item label="事件"
                                           name={"事件"}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入事件!',
                                               },
                                           ]}
                                >
                                    <Input  placeholder={"请输入事件"} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default class UserManagement extends Component {
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
    reset=()=>{
        this.setState({
            doctorsData:[],
        })
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
                    <div>
                        <span className={"span1"}>用户人数：{2331}</span>
                    </div>
                    <div  >
                        <Input placeholder={'姓名'} className={'input1'}/>
                        <Input placeholder={'电话'} className={'input1'}/>
                        <Input placeholder={'当前使用设备'} className={'input1'}/>
                        <Input placeholder={'测试时间'} className={'input1'}/>
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
                        <Radio.Group onChange={this.singleSelectonChange} value={this.state.singleSelectValue}>
                            <Radio value={1}><span className={"span2"}>全部</span></Radio>
                            <Radio value={2}><span className={"span2"}>有效用户</span></Radio>
                            <Radio value={3}><span className={"span2"}>今日已测试用户</span></Radio>
                            <Radio value={4}><span className={"span2"}>今日有测试计划用户</span></Radio>
                            <Radio value={4}><span className={"span2"}>今日漏测用户</span></Radio>
                            <Radio value={4}><span className={"span2"}>今日报警用户</span></Radio>
                        </Radio.Group>
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





