import React, { Component } from 'react'
import { Table ,Button , Input , Space ,Modal,Form,Radio} from 'antd';
import {ReloadOutlined,
        SearchOutlined ,
        PlusOutlined, 
        CloudUploadOutlined, 
        CloudDownloadOutlined,
        } from '@ant-design/icons';
// import './radio.less';//radio样式修改
import './index.less'
import {exp_person} from '../../api/index'







 //主页面表格数据
  const data = [];
  for (let i = 0; i < 46; i++) {
    if(i%2 !== 0)
    {data.push({
      key: i,
      user: `test${i}`,
      name: `name ${i}`,
      phone_num:`33`,
      dev_code_now: `DEV${i}`,
      dev_num_past:`${i+7}`,
      state:1,
      password:`1111111`
    });} else {
      data.push({
        key: i,
        user: `test${i}`,
        name: `name ${i}`,
        phone_num:`33`,
        dev_code_now: `DEV${i}`,
        dev_num_past:`${i+7}`,
        state:0,
        password:`222222`
      });
    }
  }
//历史设备弹窗表格数据dev_past
  const data_dev_past = [];
  for (let i = 0; i < 77 ; i++) {
    data_dev_past.push({
      key:i,
      dev_code:`${i+10}`,
      on_use:`是`,
      bind_time:`2020-11-11`,
      stop_time:`2020-12-12`,
    })
  }

export default class Experimenter extends Component {
  constructor(props){
    super(props);
    //创建获取表单数据域的ref
    this.form_add = React.createRef();//添加表单
    this.form_modify = React.createRef();//修改表单
  }
    state = { 
        visible_add: false ,//添加弹窗
        visible_password:false,//查看面膜弹窗
        visible_modify :false,//修改弹窗
        visible_dev_past:false,//历史设备弹窗
        selectedRowKeys: [], // Check here to configure the default column
        paginationProps : {//分页栏参数
          position: ['bottomLeft'] ,
          total:'data.length',
          showTotal:total => `共 ${total} 条`,
          showQuickJumper:true,
          showSizeChanger:true,
        },
        current:1,//当前页数
        pageSize:10,//当前页面条数
  
        paginationProps_dev_past : {//修改弹窗分页栏参数
          position: ['bottomLeft'] ,
          total:'data.length',
          showTotal:total => `共 ${total} 条`,
          showQuickJumper:true,
          showSizeChanger:true,
        },
        //输入选择框的值
        user_in:'',//用户名
        name_in:'',//姓名
        phone_num_in:'',//电话号

        //添加弹窗
        add:{
            user:'',
            name:'',
            phone_num:'',
            state:0,
        },
        //查看密码弹窗
        password:'',
        //修改弹窗
        modify:{
          user:'',
          name:'',
          phone_num:'',
          state:null,
        },
        //历史设备弹窗
        user_dev:'',
      };
     //主页面表格头
      columns = [
        {
          title: '用户名',
          dataIndex: 'user',
          width: 100,
          align:'center',
          fixed:'left',
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: 150,
          align:'center',
        },
        {
          title: '电话号',
          key:'phone_num',
          dataIndex: 'phone_num',
          width: 100,
          align:'center',
          },
    
        {
          title: '当前使用设备码',
          dataIndex: 'dev_code_now',
          width: 100,
          align:'center',
        },
        {
          title: '历史使用设备数',
          dataIndex: 'dev_num_past',
          width: 150,
          align:'center',
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: 100,
          align:'center',
          render: state => {
              if(state === 0){
                  return ('启用')
              }else {
                  return ('冻结')
                } 
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align:'center',
          width: 300,
          fixed:'right',
          render:(text,record) => (
            <Space >
                <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.password(record)}}>查看密码</Button>
                <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
                <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
                <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.past_dev(record)}}>历史设备</Button>
            </Space>
          ),
        }
      ];

     //历史设备表格头
      columns_dev_past = [
        {
          title: '设备号',
          dataIndex: 'dev_code',
          key:'dev_code',
          width: 150,
          align:'center',
        },
        {
          title: '正在使用',
          dataIndex: 'on_use',
          key:'on_use',
          width: 150,
          align:'center',
        },
        {
          title: '绑定时间',
          dataIndex: 'bind_time',
          key:'bind_time',
          width: 150,
          align:'center',
        },
        {
          title: '终止时间',
          dataIndex: 'stop_time',
          key:'stop_time',
          width: 150,
          align:'center',
        },

      ]
      //表格行选择操作
    onSelectChange = selectedRowKey => {
    //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
    this.setState(
        {selectedRowKeys:selectedRowKey},
        ()=>{console.log('所选择行',this.state.selectedRowKeys)}
    )
    };

    inputChange = (e) => {
      console.log(e.target);
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
        [name]:value
      }
      )
    }

    search = () =>{
    console.log('搜索')
    let params={}
    if(this.state.user_in !== ''){
      params.user = this.state.user_in
    }
    if(this.state.name_in !== ''){
      params.name = this.state.name_in
    }
    if(this.state.phone_num_in !== ''){
      params.phone_num = this.state.phone_num_in
    }
    console.log(params)
    };
    //重置
    reset = () => {
    console.log('重置')
    this.setState(
        {
        selectedRowKeys:[],
        user_in:'',
        name_in:'',
        phone_num_in:'',
        },
    )
      exp_person({
        page:1,
        pageSize:20,
      }).then(res=> {
        console.log(res)
      })
      .catch(err=> {
        console.log(err)
      })
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
      let form = this.form_add.current;
      form.validateFields()//表单验证
      .then((value)=>{
        this.setState({
          visible_add:false
        })
        form.resetFields();//清空表单内容
        console.log(value)
      })
      .catch(err => {
        console.log("验证不通过：",err)
      })
    console.log('添加完成')
    };
    //添加关闭
    handleCancel_add = () => {
      let form = this.form_add.current;
      form.resetFields();//清空表单内容
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
    console.log('导出已选择数据')
    };
    //按搜索条件导出
    exportSearch = () =>{
    console.log('按搜索条件导出')
    };
    //查看密码
    password = (record) => {
        this.setState({
            password:record.password,
            visible_password:true,
        })
    }
    //重置密码按钮
    handleOk_password = () => {
        this.setState({
            visible_password:false,
            password:'00000'
        },
        () => console.log(this.state.password)
        )
    }
    //取消
    handleCancel_password = () => {
    this.setState({
        visible_password:false,
    })
    }
    //修改
    modify = (record)=> {
      console.log('修改',record)
      let form = this.form_modify.current;
      if(form){
        this.setState({
          visible_modify:true,
        })
        form.setFieldsValue({
          modify_user : record.user,
          modify_name : record.name,
          modify_phone_num : record.phone_num,
          modify_state : record.state,
        })
      }
    };
    //完成修改
    handleOk_modify = () => {
      let form = this.form_modify.current;
      form.validateFields()
      .then(
        value => {
          console.log(value)
          this.setState({
            visible_modify:false,
          })
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
    };
    handleCancel_modify = () =>{
    this.setState({
        visible_modify:false,
    })
    console.log('修改弹窗关闭')
    };
    //删除
    delete = (record) =>{
    console.log('删除',record)
    };
    //历史设备
    past_dev = (record) => {
        console.log(record)
        this.setState({
            visible_dev_past:true,
            user_dev:record.user,
        })
    }
    //历史设备弹窗关闭
    handleCancel_dev = () => {
        this.setState({
            visible_dev_past:false,
        })
    }
    //表格页数变化
    handTablechange = (pagination) =>{
    console.log(pagination)
    this.setState = ({
        current:pagination.current,
        pageSize:pagination.pageSize
    })
    console.log(this.state.current,this.state.pageSize,this.state)   
    };

    //历史设备表格变化
    handTablechange_dev_past = (pagination) =>{
        console.log(pagination)
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div style={{height:"100%"}}>
                 {/* 输入框等 */}
              <div style={{'margin':'0 0 15px  0'}} >
                <div justify="space-between" gutter="15" style={{display:"flex" }}  >
                        <Input
                          placeholder="用户名"
                          name="user_in"
                           className="input1"
                           onChange={this.inputChange}
                           value={this.state.user_in}
                        />
                        <Input
                          placeholder="姓名"
                          name="name_in"
                          className="input1"
                          onChange={this.inputChange}
                          value={this.state.name_in}
                       />
                        <Input
                          placeholder="电话号码"
                          name="phone_num_in"
                          className="input1"
                          onChange={this.inputChange}
                          value={this.state.phone_num_in}
                       />

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
                   
                    
                </div>
              </div>

                {/* 表格 */}
                <div style={{height:"100%"}}>
                  <Table 
                    columns={this.columns} 
                    dataSource={data} 
                    bordered={true} 
                    rowSelection={rowSelection}
                    style={{margin:'20px 0',borderBottom:'1px,soild'}}
                    pagination={ this.state.paginationProps}
                    onChange={this.handTablechange}
                     />
                </div>
                {/* 添加弹窗 */}
                <Modal
                  title="添加实验人员"
                  centered
                  visible={this.state.visible_add}
                  onOk={this.handleOk_add}
                  okText="确定"
                  onCancel={this.handleCancel_add}
                  cancelText="关闭"
                  className="modal1"
                  width="500px"
                  forceRender={true}
                >
                  <div style={{borderBottom:'1px solid gray'}}>基本信息</div>
                    <div className="modal-body" style={{height:"300px",marginTop:'20px'}}>
                      <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal"
                        ref={this.form_add}
                      >
                            <Form.Item
                             label="用户名"
                             name="add_user"
                             id="add_user"
                             rules={[
                               {required:true,message:'请输入用户名！'}
                             ]}
                            >
                                <Input placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item
                             label="姓名" 
                             name="add_name"
                             id="add_name"
                             rules={[
                               {required:true,message:'请输入姓名！'}
                             ]}
                            >
                                <Input placeholder="请输入姓名" />
                            </Form.Item>
                            <Form.Item
                             label="电话号"
                             id="add_phone_num"
                             name="add_phone_num"
                             rules={[
                               {required:true,message:'请输入电话号码！'}
                             ]}
                            >
                                <Input placeholder="请输入电话号" />
                            </Form.Item>
                            <Form.Item
                             label="状态" 
                             id="add_state"
                             name="add_state"
                             initialValue={0}
                            >
                                <Radio.Group >
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>冻结</Radio>
                                </Radio.Group>
                            </Form.Item>
                      </Form>
                    </div>
                </Modal>
                {/* 查看密码弹窗 */}
                <Modal
                  title="查看密码"
                  centered
                  visible={this.state.visible_password}
                  onOk={this.handleOk_password}
                  okText="重置密码"
                  onCancel={this.handleCancel_password}
                  cancelText="取消"
                >
                    <div>你的密码是:{this.state.password}</div>
                </Modal>
                {/* 修改弹窗 */}
                <Modal
                  title="修改"
                  centered
                  visible={this.state.visible_modify}
                  onOk={this.handleOk_modify}
                  okText="确定"
                  onCancel={this.handleCancel_modify}
                  cancelText="关闭"
                  width="600px"
                  forceRender={true}
                >
                  <div style={{borderBottom:'1px solid gray'}}>基本信息</div>
                    
                    <div className="modal-body" style={{height:"300px",marginTop:'20px'}}>
                      <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal"
                        ref={this.form_modify}
                      >
                            <Form.Item
                             label="用户名"
                             id="modify_user"
                             name="modify_user"
                             rules={[
                               {required:true,message:'请输入用户名！'}
                             ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                             label="姓名" 
                             id="modify_name"
                             name="modify_name"
                             rules={[
                               {required:true,message:'请输入姓名！'}
                             ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                             label="电话号"
                             id="modify_phone_num"
                             name="modify_phone_num"
                             rules={[
                               {required:true,message:'请输入电话号！'}
                             ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                             label="状态"
                             id="modify_state"
                             name="modify_state"
                            >
                                <Radio.Group buttonStyle="outline"  >
                                    <Radio value={0}>启用</Radio>
                                    <Radio value={1}>冻结</Radio>
                                </Radio.Group>
                            </Form.Item>
                            
                      </Form>
                    </div>
                </Modal>
                {/* 历史设备弹窗 */}
                <Modal
                  title="历史设备"
                  centered
                  visible={this.state.visible_dev_past}
                  onCancel={this.handleCancel_dev}
                  footer={null}
                  width="800"
                  height="600"
                >
                    <div style={{margin:'5px',fontWeight:'bold'}}>用户名：{this.state.user_dev}</div>
                    <div style={{margin:'5px',fontWeight:'bold'}}>历史设备：{data_dev_past.length}</div>
                    <Table 
                        columns={this.columns_dev_past} 
                        dataSource={data_dev_past} 
                        bordered={true} 
                        style={{margin:'20px 0',borderBottom:'1px,soild'}}
                        pagination={ this.state.paginationProps_dev_past}
                        onChange={this.handTablechange_dev_past}
                     />
                </Modal>
            </div>
        )
    }
}
