import React, { Component } from 'react'
import {
        Table,
        Button,
        Input,
        Select,
        Space,
        Modal,
        Form,
        DatePicker,
        Radio,
      } from 'antd';
import {
        ReloadOutlined,
        SearchOutlined ,
        PlusOutlined,
        CloudUploadOutlined,
        CloudDownloadOutlined,
        CheckCircleOutlined,
        CloseCircleTwoTone
        } from '@ant-design/icons'
import './index.less' //引入样式
import moment from 'moment';
import {exportFile} from '../../api/index'
import ImportFile from '../../compenents/importfile'

const { Option } = Select;
const { TextArea } = Input;




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
      type:1,
      status :0,
      share :0,
    });} else {
      data.push({
        key: i,
        dev_code: `123123123${i}`,
        dev_num: `设备 ${i}`,
        on: 1,
        used:1,
        type:0,
        status :1,
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



export default class DeviceManagement extends Component {

  constructor(props){
    super(props);

    this.state = {
      data:data,
      data_user:data_user,
      visible:false,
      visible_add: false ,
      visible_modify :false,
      visible_user :false,
      visible_import:false,
      selectedRowKeys: [], // Check here to configure the default column
      //主页面表格页数和数据条数
      current:1,
      pageSize:10,
      paginationProps_user : {//使用人员分页栏参数

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
        is_share:null,//是否共享
        correct:1,//矫正倍数
        time:'2020/11/11',//激活时间
      },
      justify_modal:null,
    }
    //参数设置
    this.onSelectChange = this.onSelectChange.bind(this);

  /*表单验证
    Form.useForm是是 React Hooks 的实现，只能用于函数组件
    class组件中通过 React.createRef()来获取数据域
  */
  this.form = React.createRef();
  this.form_modify = React.createRef();
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
      render: type => {
        if (type===0){
          return ('测试')
        } else if (type===1){
          return ('异常')
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      align:'center',
      render: status => {
        if (status===0){
          return ('测试通过')
        } else if (status===1){
          return ('停用')
        }
      }
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
        current:1,
        pageSize:10,
      },
    )
  };
  //添加
  add =() =>{
    console.log('添加',this.form)
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
        form.resetFields();//清空表单内容
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
    let form = this.form.current;
    form.resetFields();//清空表单内容
    console.log('添加关闭')
  };

  //导入
  importStatic = () =>{
    console.log('导入')
    this.setState({
      visible_import:true,
    })
  };
  handleCancel_import = () => {
    this.setState({
      visible_import:false,
    })
  }
  //导出已选择数据
  exportChoose = () =>{
    console.log('导出已选择数据',this.state.selectedRowKeys)
  };
  //按搜索条件导出
  exportSearch = () =>{
    console.log('按搜索条件导出',this.state.input)
    // exportFile('http://java.xixibackup.me:8080/device/manage/info/export/condition',{})
    // exportFile('/device/manage/info/export/condition',{})
    exportFile('/device/manage/info/export/choose',[2048])
  };
  //修改
  modify = (record)=> {
    console.log('修改',record,this.state.modal)
    console.log(this.form_modify )
    console.log(this.form_modify.current)
    this.setState({
      visible_modify:true,
    })
    let form_modify=this.form_modify.current;
    if(this.form_modify.current){
        form_modify.setFieldsValue({
            dev_code:record.dev_code,
            dev_num:record.dev_num,
            is_valid:record.used,
            is_on:record.on,
            is_share:record.share,
            hard_ed:this.state.modal.hard_ed,
            soft_ed:this.state.modal.soft_ed,
            bluetooth:this.state.modal.bluetooth,
            refresh_time:moment(this.state.modal.refresh_time,'YYYY/MM/DD'),
            time:moment(this.state.modal.time,'YYYY-MM-DD'),
            status:record.status,
            type:record.type,
            correct:this.state.modal.correct,
        })
    }

  };
  //完成修改
  handleOk_modify = () => {
    console.log(this.form_modify)
    let form = this.form_modify.current;
    form.validateFields()//表单输入校验
      .then((values) => {
        // form.resetFields();
        console.log(values)
        this.setState({
          visible_modify:false
        })

      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  //关闭修改
  handleCancel_modify = () =>{
    this.setState({
      visible_modify:false,
    })
    console.log('修改弹窗关闭')
  };
  //修改弹窗中输入框变化
  modify_inputChange = (e) => {
    let name = e.target.name;
    console.log(name)
    this.setState({
      modal:Object.assign(this.state.modal,{[e.target.name]:e.target.value})
    })
  }
  //时间选择框变化
  time_change = (date,dateString) => {
    console.log(date,dateString)
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

//主页面表格翻页
  handTablechange = (pagination) =>{
     this.setState({
      pageSize:pagination.pageSize,
      current:pagination.current
    })
    let params = {};
    params.current = pagination.current;
    params.pageSize = pagination.pageSize;
    console.log(params)
  };
  //使用人员表格变化
  handTablechange_user = (pagination) =>{
    console.log(pagination)
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
                    pagination={{
                      position: ['bottomLeft'] ,
                      total:'data.length',
                      showTotal:total => `共 ${total} 条`,
                      showQuickJumper:true,
                      showSizeChanger:true,
                      current:this.state.current,//当前页数
                      pageSize:this.state.pageSize,//当前页面条数
                    }}
                    onChange={this.handTablechange}
                    // size="middle"
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
                  forceRender={true}
                >
                <div className="modal-body" style={{height:"550px"}}>
                      <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        ref={this.form}//表单验证，通过ref获取
                      >
                      <Form.Item
                        label="设备码"
                        name="add_dev_code"
                        rules={[
                          {required:'true',message:'请输入设备码'}
                        ]}
                      >
                        <Input
                        value={this.state.modal.dev_code}
                        name="dev_code"
                        />
                      </Form.Item>
                      <Form.Item
                        label="硬件版本"
                        name="add_hard_ed"
                        initialValue="1.0"
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                       label="软件版本"
                       name="add_soft_ed"
                       initialValue="1.0"
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                       label="软件更新时间"
                       name="add_refresh_time"
                      >
                        <DatePicker
                          onChange={this.time_change}
                          style={{width:368}}
                        />
                      </Form.Item>
                      <Form.Item
                       label="蓝牙密码"
                       name="add_bluetooth"
                      >
                        <Input
                          name="bluetooth"
                         />
                      </Form.Item>
                      <Form.Item
                       label="是否可用"
                       name="add_is_valid"
                       initialValue={0}
                      >
                        <Radio.Group >
                          <Radio value={0}>是</Radio>
                          <Radio value={1}>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                       label="是否激活"
                       name="add_is_on"
                       initialValue={0}
                      >
                        <Radio.Group>
                          <Radio value={0}>是</Radio>
                          <Radio value={1}>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                       label="激活时间"
                       name="add_time"
                      >
                         <DatePicker
                          onChange={this.time_change}
                          format='YYYY/MM/DD'//指定日期显示样式
                          style={{width:368}}
                         />
                      </Form.Item>
                      <Form.Item
                       label="是否共享"
                       name="add_is_share"
                       initialValue={0}
                      >
                        <Radio.Group >
                          <Radio value={0}>是</Radio>
                          <Radio value={1}>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                       label="矫正倍数"
                       name="add_correct"
                       rules={[
                         {required:true,message:'请输入矫正倍数！'}
                       ]}
                       initialValue="1.0"//默认值
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                       label="类型"
                       name="add_type"
                      >
                        <Select placeholder="请选择类型！">
                          <Option value={0}>正常</Option>
                          <Option value={1}>异常</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                       label="状态"
                       name="add_status"
                      >
                        <Select placeholder="请选择状态！" >
                          <Option value={0}>测试通过</Option>
                          <Option value={1}>停用</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                       label="备注"
                       name="add_remark"
                      >
                        <TextArea
                          placeholder="备注信息"
                          autoSize={{minRows:2,maxRows:6}}
                        />
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
                  forceRender={true}
                >
                  <div className="ant-modal-body">
                    <div className="modal-body" style={{height:"500px"}}>
                      <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        ref={this.form_modify}
                      >
                        <Form.Item
                          label="设备码"
                          name="dev_code"
                          rules={[
                            {required:'true',message:'请输入设备码'}
                          ]}
                        >
                          <Input
                          value={this.state.modal.dev_code}
                          onChange={this.modify_inputChange}
                          name="dev_code"
                          />
                        </Form.Item>
                        <Form.Item
                          label="设备号"
                          name="dev_num"
                          rules={[
                            {required:true,message:'请输入设备号！'}
                          ]}
                        >
                          <Input
                            value={this.state.modal.dev_num}
                            onChange={this.modify_inputChange}
                            name="dev_num"
                          />
                        </Form.Item>
                        <Form.Item
                          label="硬件版本"
                          name="hard_ed"
                        >
                          <Input
                            value={this.state.modal.hard_ed}
                            onChange={this.modify_inputChange}
                            name="hard_ed"
                          />
                        </Form.Item>
                        <Form.Item
                         label="软件版本"
                         name="soft_ed"
                        >
                          <Input
                            value={this.state.modal.soft_ed}
                            onChange={this.modify_inputChange}
                            name="soft_ed"
                          />
                        </Form.Item>
                        <Form.Item
                         label="软件更新时间"
                         name="refresh_time"
                        >
                          <DatePicker
                            onChange={this.time_change}
                            style={{width:282}}
                            format='MM/DD/YYYY'//指定日期显示样式
                          />
                        </Form.Item>
                        <Form.Item
                         label="蓝牙密码"
                         name="bluetooth"
                        >
                          <Input
                            value={this.state.modal.bluetooth}
                            onChange={this.modify_inputChange}
                            name="bluetooth"
                           />
                        </Form.Item>
                        <Form.Item
                         label="是否可用"
                         name="is_valid"
                        >
                          <Radio.Group value={this.state.modal.is_valid}>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                         label="是否激活"
                         name="is_on"
                        >
                          <Radio.Group value={this.state.modal.is_on}>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                         label="激活时间"
                         name="time"
                        >
                           <DatePicker
                            onChange={this.time_change}
                            format='YYYY/MM/DD'//指定日期显示样式
                            style={{width:282}}
                           />
                        </Form.Item>
                        <Form.Item
                         label="是否共享"
                         name="is_share"
                        >
                          <Radio.Group value={this.state.modal.is_on}>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                         label="矫正倍数"
                         name="correct"
                         rules={[
                           {required:true,message:'请输入矫正倍数！'}
                         ]}
                        >
                          <Input
                            onChange={this.modify_inputChange}
                           />
                        </Form.Item>
                        <Form.Item
                         label="类型"
                         name="type"
                        >
                          <Select>
                            <Option value={0}>正常</Option>
                            <Option value={1}>异常</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                         label="状态"
                         name="status"
                        >
                          <Select>
                            <Option value={0}>测试通过</Option>
                            <Option value={1}>停用</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                         label="备注"
                         name="remark"
                        >
                          <TextArea
                            placeholder="备注信息"
                            autoSize={{minRows:2,maxRows:6}}
                            onChange={this.modify_inputChange}
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
                      pagination={{
                        position: ['bottomLeft'] ,
                        total:'data.length',
                        showTotal:total => `共 ${total} 条`,
                        showQuickJumper:true,
                        showSizeChanger:true,
                      }}
                      onChange={this.handTablechange_user}
                      size="small"
                      />
                    </div>
                  </div>
                </Modal>
                {/* 导入弹窗 */}
                <ImportFile
                 url="http://123.57.33.240:8080/paper/param/pro/import"
                 visible={this.state.visible_import}
                 onCancel={this.handleCancel_import}
                />
            </div>
        )
    }
}
