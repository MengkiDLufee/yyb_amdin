import React, { Component } from 'react'
import { Table ,Button , Input , Select, Space ,Modal,Form,Checkbox} from 'antd';
import {ReloadOutlined,
        SearchOutlined ,
        PlusOutlined,
        CloudUploadOutlined,
        CloudDownloadOutlined,
        CheckCircleOutlined,
        CloseCircleTwoTone
        } from '@ant-design/icons'
import './index.less' //引入样式


const { Option } = Select;




 //主页面表格数据
  const data = [];
  for (let i = 0; i < 46; i++) {
    if(i%2 !== 0)
    {data.push({
      key: i,
      dev_code: `123123123${i}`,
      dev_num: `设备 ${i}`,
      on: 0,
      used:0,
      type:`正常`,
      status :`测试通过 `,
      share :0,
    });} else {
      data.push({
        key: i,
        dev_code: `123123123${i}`,
        dev_num: `设备 ${i}`,
        on: 1,
        used:1,
        type:`异常`,
        status :`停用 `,
        share :1,
      });
    }
  }
//使用人员弹窗表格数据
const data_user = [];
for (let i = 0; i < 33; i++) {
  if(i%2 !== 0)
  {data_user.push({
    key: i,
    user_name: `123123123${i}`,
    ed_type: `家庭版`,
    on_use: '是',
    bind_time:'2020-04-14',
    stop_time:`2020-10-10`,
  });} else {
    data_user.push({
      key: i,
      user_name: `123123${i}`,
      ed_type: `专业版`,
      on_use: '否',
      bind_time:'2019-11-11',
      stop_time:`2020-11-11`,
    });
  }
}


  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
// class InputClear extends Component {
//   render(){
//     return(
//       <Input  placeholder={this.props.placeholder} className={this,props.className} onChange={this.props.onChange} value={this.props.value} />

//     )
//   }
// }

export default class DeviceManagement extends Component {

  constructor(props){
    super(props);
      //参数设置
  this.onSelectChange = this.onSelectChange.bind(this);
  }
  state = {
    data:data,
    data_user:data_user,
    visible:false,
    visible_add: false ,
    visible_modify :false,
    visible_user :false,
    selectedRowKeys: [], // Check here to configure the default column
    paginationProps : {//分页栏参数
      position: ['bottomLeft'] ,
      total:'data.length',
      showTotal:total => `共 ${total} 条`,
      showQuickJumper:true,
      showSizeChanger:true,
      current:1,//当前页数
      pageSize:10,//当前页面条数
    },
    paginationProps_user : {//使用人员分页栏参数
      position: ['bottomLeft'] ,
      total:'data.length',
      showTotal:total => `共 ${total} 条`,
      showQuickJumper:true,
      showSizeChanger:true,
      current:1,
      pageSize:10,
    },
    devCode:undefined,//历史人员弹窗中的设备码
    //输入选择框的值
    input:{
      client:'',
      active:undefined,
      type:undefined,
      state:undefined,
    },

  //修改弹窗
  modal:{
    dev_code:'',//设备码
    dev_num:'',//设备号
    hard_ed:'1.0',//硬件版本
    soft_ed:'1.0',//软件版本
    refresh_time:'2020-11-11',//软件更新时间
    bluetooth:'1234',//蓝牙密码
    is_valid:null,//是否可用
    is_on:null,//是否激活
    time:'',//激活时间
  },
  justify_modal:null,
}


//表格栏
 columns = [
    {
      title: '设备码',
      dataIndex: 'dev_code',
      width: 150,
      align:'center',
    },
    {
      title: '设备号',
      dataIndex: 'dev_num',
      width: 150,
      align:'center',
    },
    {
      title: '激活',
      key:'on',
      dataIndex: 'on',
      width: 100,
      align:'center',
      render: on =>{
          if (on === 0) {
            return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
          } else if(on === 1) {
            return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
          }
        }
      },

    {
      title: '已用',
      dataIndex: 'used',
      width: 100,
      align:'center',
      render: used =>{
        if (used === 0) {
          return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
        } else if(used === 1) {
          return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
        }
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 150,
      align:'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      align:'center',
    },
    {
      title: '共享',
      dataIndex: 'share',
      width: 100,
      align:'center',
      render: share =>{
        if (share === 0) {
          return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
        } else if(share === 1) {
          return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align:'center',
      width: 150,
      fixed:'right',
      render:(text,record) => (
        <Space >
        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.user(record)}} >使用人员</Button>
        </Space>
      ),
    }
  ];
  //使用人员表格栏
columns_user = [
  {
    title: '用户名',
    dataIndex: 'user_name',
    width: 150,
    align:'center',
  },
  {
    title: '使用版本类型',
    dataIndex: 'ed_type',
    width: 150,
    align:'center',
  },
  {
    title: '正在使用',
    dataIndex: 'on_use',
    width: 150,
    align:'center',
  },
  {
    title: '绑定时间',
    dataIndex: 'bind_time',
    width: 150,
    align:'center',
  },
  {
    title: '终止时间',
    dataIndex: 'stop_time',
    width: 150,
    align:'center',
  },
]
  //表格行选择
  onSelectChange = row => {
    console.log('所选择行',row)
    //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
    this.setState(
      {selectedRowKeys:row}
    )
  };

//客户输入框
  clientChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input:Object.assign(this.state.input,{client:e.target.value}),
    })
  }
 //选择框
  selectChange =(e,Option) => {
      console.log(e)
      console.log(Option)
      this.setState({
        input:Object.assign(this.state.input,{[Option.title]:e})
      })
    }
  //搜索
  search = () =>{
    console.log('搜索',this.state.input)
  };
  //重置
  reset = () => {
    console.log('重置')
    let data = Object.assign(this.state.input,{
      client:'',
      active:undefined,
      type:undefined,
      state:undefined,
    })
    this.setState(
      {
        selectedRowKeys:[],
        input:data,
      },
    )
  };
  //添加
  add =() =>{
    console.log('添加')
    this.setState({
      visible_add: true,
    });
  };
  //点击添加完成
  handleOk_add = () => {
    console.log('添加完成')
    console.log(this.form)
    let form = this.form.current;
    form.validateFields()//表单输入校验
      .then((values) => {
        form.resetFields();
        console.log(values)
        this.setState({
          visible_add:false
        })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });


  };
  //添加关闭
  handleCancel_add = () => {
    this.setState({
      visible_add: false,
    });
    console.log('添加关闭')
  };

  //导入
  importStatic = () =>{
    console.log('导入')
  };
  //导出已选择数据
  exportChoose = () =>{
    console.log('导出已选择数据',this.state.selectedRowKeys)
  };
  //按搜索条件导出
  exportSearch = () =>{
    console.log('按搜索条件导出',this.state.input)
  };
  //修改
  modify = (record)=> {
    console.log('修改',record)
    let data = Object.assign({}, this.state.modal, {
          dev_code: record.dev_code,
          dev_num:record.dev_num ,
          is_on:record.on,
          is_valid:record.used
        })
    this.setState({
      visible_modify:true,
      modal:data,

    },
    ()=>console.log(this.state.modal)
    )
  };
  //完成修改
  handleOk_modify = () => {
    console.log(this.state.modal)
    this.setState({
      visible_modify:false,
    })
  };
  //关闭修改
  handleCancel_modify = () =>{
    this.setState({
      visible_modify:false,
    })
    console.log('修改弹窗关闭')
  };
  //修改弹窗_是否可用
  isvalidChange = () => {
    // console.log(e,this.state.modal.is_valid)
      if(this.state.modal.is_valid === 0){
        this.setState({
          modal:Object.assign(this.state.modal,{is_valid:1})
        })
      }else  {
        this.setState({
          modal:Object.assign(this.state.modal,{is_valid:0})
        })
      }
  }
  //修改弹窗_是否激活
  isonChange = () => {
    if(this.state.modal.is_on === 0){
      this.setState({
        modal:Object.assign(this.state.modal,{is_on:1})
      },
      )
    }else  {
      this.setState({
        modal:Object.assign(this.state.modal,{is_on:0})
      })
    }

  }
  //修改弹窗中输入框变化
  modify_inputChange = (e) => {
    let name = e.target.name;
    console.log(name)
    this.setState({
      modal:Object.assign(this.state.modal,{[e.target.name]:e.target.value})
    })
  }


  //删除
  delete = (record) =>{
    console.log('删除',record)
    const deleteData = [...this.state.data];
    deleteData.forEach((item,index) => {
      if(item.key===record.key){
          deleteData.splice(index,1)
      }
  })

  this.setState({
      data:deleteData,
  },()=> console.log(this.state.data))

  };
  //使用人员按钮
  user = (record) => {
    console.log('使用人员',record)
    this.setState({
      visible_user:true,
      devCode:record.dev_code,
    })
  };
  //使用人员弹窗关闭
  handleCancel_user = () =>{
    this.setState({
      visible_user:false,
      devCode:undefined,
    })
  }

//表格翻页
  handTablechange = (pagination) =>{
     Object.assign(this.state.paginationProps,{
      pageSize:pagination.pageSize,
      current:pagination.current
    })
    console.log(this.state.paginationProps);
    let params = {};
    params.current = pagination.current;
    params.pageSize = pagination.pageSize;
    console.log(params)
  };
  //使用人员表格变化
  handTablechange_user = (pagination) =>{
    console.log(pagination)
    Object.assign(this.state.paginationProps_user,{
      current:pagination.current,
      pageSize:pagination.pageSize,
    })
    let params = {};
    params.pageSize = pagination.pageSize;
    params.current = pagination.current;
    console.log(params)
  };



  onFinish = (values) => {
    console.log('Success:', values);
    this.setState({
      justify_modal:0,
    })
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    this.setState({
      justify_modal:1,
    })
  };
/*表单验证
  Form.useForm是是 React Hooks 的实现，只能用于函数组件
  class组件中通过 React.createRef()来获取数据域*/
  form = React.createRef();


    render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys:selectedRowKeys,
        onChange: this.onSelectChange,
      };
      // const [form] = Form.useForm();

        return (
            <div style={{height:"100%"}}>
              {/* 输入框等 */}
              <div style={{'margin':'0 0 15px  0'}} >
                <div justify="space-between" gutter="15" style={{display:"flex" }}  >

                        <Input  placeholder="客户" className="input1" onChange={this.clientChange} value={this.state.input.client} />
                    {/* {this.selection(this.activeChange,this.state.active_in)} */}
                        <Select placeholder="请选择激活状态 "
                                onChange={this.selectChange}
                                className="input1"
                                value={this.state.input.active}
                                >
                            <Option title="active" value="on">已激活</Option>
                            <Option title="active" value="close">未激活</Option>
                        </Select>

                        <Select placeholder="请选择类型 "
                                onChange={this.selectChange}
                                className="input1"
                                value={this.state.input.type}
                                >
                            <Option title="type" value="type1">类型1</Option>
                            <Option title="type" value="type2">类型2</Option>
                            <Option title="type" value="type3">类型3</Option>
                        </Select>

                        <Select placeholder="请选择状态 "
                                onChange={this.selectChange}
                                className="input1"
                                value={this.state.input.state}

                                >
                            <Option title="state" value="status1">测试通过</Option>
                            <Option title="state" value="status2">测试未通过</Option>
                        </Select>

                        <Button
                          type="primary"
                          icon={<SearchOutlined className="icon1" />}
                          onClick={this.search}
                          className="button1"
                          >
                          搜索
                        </Button>

                        <Button type="primary"
                          icon={<ReloadOutlined className="icon1" /> }
                          onClick={this.reset}
                          className="button1"
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
                          type="primary"
                          icon={<CloudUploadOutlined className="icon1" />}
                          onClick={this.importStatic}
                          className="button1"
                        >
                          导入
                        </Button>

                        <Button
                          type="primary"
                          icon={<CloudDownloadOutlined className="icon1" />}
                          onClick={this.exportChoose}
                          className="button2"
                        >
                          导出已选择数据
                        </Button>

                        <Button
                        type="primary"
                        icon={<CloudDownloadOutlined className="icon1" />}
                        onClick={this.exportSearch}
                        className="button2"
                        >
                          按检索条件导出
                        </Button>
                    <div>

                    </div>
                </div>
              </div>

                {/* 表格 */}
                <div style={{height:"100%"}}>
                  <Table
                   columns={this.columns}
                  dataSource={this.state.data}
                  bordered={true}
                  rowSelection={rowSelection}
                  style={{margin:'20px 0',borderBottom:'1px,soild'}}
                  pagination={ this.state.paginationProps}
                  onChange={this.handTablechange}

                  />
                </div>
                {/* 添加弹窗 */}
                <Modal
                  title="添加"
                  centered
                  visible={this.state.visible_add}
                  onOk={this.handleOk_add}
                  okText="确定"
                  onCancel={this.handleCancel_add}
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
                      >
                        <Form.Item
                          label="检测机构"
                        >
                          <Select defaultValue="henan">
                            <Option value="henan">河南</Option>
                            <Option value="sicuan">四川</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="经销商">
                          <Select defaultValue="wsd">
                            <Option value="wsd">维世达</Option>
                            <Option value="jxs2">经销商2</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="设备名"
                          name="dev_name"
                          rules={[
                            {required:true,message:'设备名必须输入'},
                            {min:4,message:'至少4位'},
                            {max:8,message:'最多8位'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'必须由英文、数字或下划线组成'},
                          ]}//设置验证规则
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="设备码"
                          name="dev_code"
                          rules={[
                            {required:true,message:'请输入设备码！',},
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item label="硬件版本">
                          <Input  defaultValue="1.0" />
                        </Form.Item>
                        <Form.Item label="软件版本">
                          <Input  defaultValue="1.0" />
                        </Form.Item>
                        <Form.Item label="蓝牙密码">
                          <Input  defaultValue="1234" />
                        </Form.Item>
                        <Form.Item  label="" style={{marginLeft:'150px'}}>
                          <Checkbox.Group
                            options={['已用','激活']}
                            defaultValue={['已用','激活']}
                          />
                        </Form.Item>
                        <Form.Item label="归属用户">
                          <Input />
                        </Form.Item>
                        <Form.Item label="客户">
                          <Input />
                        </Form.Item>
                        <Form.Item  label="" style={{marginLeft:'150px'}}>
                          <Checkbox.Group
                            options={['共享']}
                            defaultValue={['共享']}
                          />
                        </Form.Item>
                        <Form.Item label="套装价格">
                          <Input />
                        </Form.Item>
                        <Form.Item label="校正倍数">
                          <Input />
                        </Form.Item>
                        <Form.Item label="类型">
                          <Select defaultValue="type1">
                            <Option value="type1">正常</Option>
                            <Option value="type2">测试</Option>
                            <Option value="type3">优孕宝</Option>
                            <Option value="type4">优孕宝测试</Option>
                            <Option value="type5">专业正常</Option>
                            <Option value="type6">专业测试</Option>
                            <Option value="type7">研究</Option>
                            <Option value="type8">其他</Option>
                            <Option value="type9">其他测试</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="激活时间">
                          <Input />
                        </Form.Item>
                        <Form.Item label="绑定时间">
                          <Input />
                        </Form.Item>
                        <Form.Item label="状态">
                          <Select defaultValue="state1">
                            <Option value="state1">未测试</Option>
                            <Option value="state2">测试通过</Option>
                            <Option value="state3">测试未通过</Option>
                            <Option value="state4">返修</Option>
                            <Option value="state5">存在故障，完全无法使用</Option>
                            <Option value="state6">存在故障，可用但影响测试值</Option>
                            <Option value="state7">存在故障，可临时用</Option>
                            <Option value="state8">测试通过</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="使用状态">
                          <Select defaultValue="useState1">
                            <Option value="useState1">无</Option>
                            <Option value="useState2">购买</Option>
                            <Option value="useState3">部分押金</Option>
                            <Option value="useState4">部分押金（达到次数）</Option>
                            <Option value="useState5">全部押金</Option>
                            <Option value="useState6">其他</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="备注">
                          <Input />
                        </Form.Item>
                        <Form.Item  label="" style={{marginLeft:'150px'}}>
                          <Checkbox.Group
                            options={['只安卓']}
                            defaultValue={['只安卓']}
                          />
                        </Form.Item>
                        <Form.Item label="返修时间">
                          <Input />
                        </Form.Item>
                        <Form.Item label="总押金">
                          <Input />
                        </Form.Item>
                        <Form.Item label="第一部分押金">
                          <Input />
                        </Form.Item>
                        <Form.Item label="剩余押金">
                          <Input />
                        </Form.Item>
                      </Form>
                    </div>
                </Modal>
                {/* 修改弹窗 */}i
                <Modal
                  title="修改"
                  centered
                  visible={this.state.visible_modify}
                  onOk={this.handleOk_modify}
                  okText="确定"
                  onCancel={this.handleCancel_modify}
                  cancelText="关闭"
                >
                  <div className="ant-modal-body">
                    <div className="modal-body" style={{height:"500px"}}>
                      <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                      >
                        <Form.Item label="设备码">
                          <Input
                          value={this.state.modal.dev_code}
                          onChange={this.modify_inputChange}
                          name="dev_code"
                          />
                        </Form.Item>
                        <Form.Item label="设备号">
                          <Input
                            value={this.state.modal.dev_num}
                            onChange={this.modify_inputChange}
                            name="dev_num"
                          />
                        </Form.Item>
                        <Form.Item label="硬件版本">
                          <Input
                            value={this.state.modal.hard_ed}
                            onChange={this.modify_inputChange}
                            name="hard_ed"
                          />
                        </Form.Item>
                        <Form.Item label="软件版本">
                          <Input
                            value={this.state.modal.soft_ed}
                            onChange={this.modify_inputChange}
                            name="soft_ed"
                          />
                        </Form.Item>
                        <Form.Item label="软件更新时间">
                          <Input
                            value={this.state.modal.refresh_time}
                            onChange={this.modify_inputChange}
                            name="refresh_time"
                          />
                        </Form.Item>
                        <Form.Item label="蓝牙密码">
                          <Input
                            value={this.state.modal.bluetooth}
                            onChange={this.modify_inputChange}
                            name="bluetooth"
                           />
                        </Form.Item>
                        <Form.Item  label="是否可用" >
                          <Checkbox.Group
                            options={[
                              {label:'是',value:0},
                              {label:'否',value:1}
                            ]}
                            value={[this.state.modal.is_valid]}
                            onChange={this.isvalidChange}
                          />
                        </Form.Item>
                        <Form.Item  label="是否激活" >
                          <Checkbox.Group
                            options={[
                              {label:'是',value:0},
                              {label:'否',value:1}
                            ]}
                            value={[this.state.modal.is_on]}
                            onChange={this.isonChange}
                          />
                        </Form.Item>
                        <Form.Item label="激活时间">
                          <Input
                          value={this.state.modal.time}
                          onChange={this.modify_inputChange}
                          name="time"
                           />
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </Modal>
                 {/* 历史人员弹窗 */}i
                 <Modal
                  title="历史人员"
                  centered
                  visible={this.state.visible_user}
                  onCancel={this.handleCancel_user}
                  footer={null}
                  width="800"
                >
                      <div className="ant-modal-body" style={{height:"100%"}}>
                          <div style={{fontWeight:'bold',marginTop:"-20px"}}>
                            <div>设备码：{this.state.devCode}</div>
                            <div>历史连接人数：{data_user.length}</div>
                          </div>
                        <div style={{height:"100%",width:"100%"}}>
                          <Table
                          columns={this.columns_user}
                          dataSource={data_user}
                          bordered={true}
                          style={{margin:'20px 0',borderBottom:'1px,soild'}}
                          pagination={ this.state.paginationProps_user}
                          onChange={this.handTablechange_user}
                          size="small"
                          />
                        </div>
                  </div>
                </Modal>
            </div>
        )
    }
}
