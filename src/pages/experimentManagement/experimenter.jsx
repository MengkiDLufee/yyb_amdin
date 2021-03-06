import React, { Component } from 'react'
import { Table, Button, Input, Space, Modal, Form, Radio, message, Popconfirm } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
// import './radio.less';//radio样式修改
import './index.less'
import {
  expPersonList,//获取表格数据
  addExpPerson,//添加
  expPersonModify,//修改
  expDelete,//删除
  exportFile,//导出
  checkPassword,//查看密码
} from '../../api/index'


function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].testPersonId;
    newItem.personId = data[i].testPersonId;
    newItem.user = data[i].userName;
    newItem.name = data[i].personName;
    newItem.phone_num = data[i].mobile;
    newItem.dev_code_now = data[i].deviceCode;
    newItem.dev_num_past = data[i].historyUsedDevice;
    newItem.state = data[i].accountStatus;
    newData.push(newItem);
  }
  console.log(newData)
  return newData;
}

export default class Experimenter extends Component {
  constructor(props) {
    super(props);
    //创建获取表单数据域的ref
    this.form_add = React.createRef();//添加表单
    this.form_modify = React.createRef();//修改表单
  }
  state = {
    data: [],//主页面表格
    visible_add: false,//添加弹窗
    visible_password: false,//查看面膜弹窗
    visible_modify: false,//修改弹窗
    visible_dev_past: false,//历史设备弹窗
    paginationProps: {
      total: '',//数据总条数
      current: 1,//当前页数
      pageSize: 10,//当前页面条数
    },
    paginationProps_dev_past: {//修改弹窗分页栏参数
      position: ['bottomLeft'],
      total: 'data.length',
      showTotal: total => `共 ${total} 条`,
      showQuickJumper: true,
      showSizeChanger: true,
    },
    selectedRowKeys: [],//当前选择的数据的key
    selectedRowKeysAll: [],//所有选择的数据的key
    //输入选择框的值
    user_in: '',//用户名
    name_in: '',//姓名
    phone_num_in: '',//电话号

    //添加弹窗
    add: {
      user: '',
      name: '',
      phone_num: '',
      state: 0,
    },
    //查看密码弹窗
    password: '',
    //修改弹窗
    personID: null,
    modify: {
      user: '',
      name: '',
      phone_num: '',
      state: null,
    },
    //历史设备弹窗
    user_dev: '',
  };
  //主页面表格头
  columns = [
    {
      title: '用户名',
      dataIndex: 'user',
      width: 100,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      align: 'center',
    },
    {
      title: '电话号',
      key: 'phone_num',
      dataIndex: 'phone_num',
      width: 100,
      align: 'center',
    },

    {
      title: '当前使用设备码',
      dataIndex: 'dev_code_now',
      width: 100,
      align: 'center',
    },
    {
      title: '历史使用设备数',
      dataIndex: 'dev_num_past',
      width: 150,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: state => {
        if (state === 'enable') {
          return ('启用')
        } else if (state === 'frozen') {
          return ('冻结')
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 300,
      fixed: 'right',
      render: (text, record) => (
        <Space >
          <Button size="small" style={{ color: 'black', background: 'white' }} onClick={() => { this.password(record) }}>查看密码</Button>
          <Button size="small" style={{ color: 'black', background: 'white' }} onClick={() => { this.modify(record) }}>修改</Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => { this.delete(record) }}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" style={{ color: 'white', background: '#ff5621' }}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  //表格行选择操作
  onSelectChange = selectedRowKey => {
    let newArr = [...new Set([...selectedRowKey, ...this.state.selectedRowKeysAll])]
    //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
    this.setState({
      selectedRowKeys: selectedRowKey,
      selectedRowKeysAll: newArr
    },
      () => { console.log('所选择行', this.state.selectedRowKeys) }
    )
  };


  //加载数据
  loadData = (params) => {
    expPersonList(params)
      .then(res => {
        console.log(res)
        let data = transformData(res.data.data.info)
        let paginationProps = Object.assign(this.state.paginationProps, { total: res.data.data.total })
        this.setState({
          data,
          paginationProps,
        })
      })
  }
  //生命周期，组件挂在完后
  componentDidMount() {
    this.loadData({
      page: 1,
      pageSize: 10,
    })
  }

  inputChange = (e) => {
    console.log(e.target);
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    }
    )
  }

  search = () => {
    console.log('搜索')
    let params = {}
    let { user_in, name_in, phone_num_in } = this.state
    params.page = 1;
    params.pageSize = 10;
    if (user_in !== '') {
      params.userName = user_in
    }
    if (name_in !== '') {
      params.personName = name_in
    }
    if (phone_num_in !== '') {
      params.mobile = phone_num_in
    }
    expPersonList(params)
      .then(res => {
        let data = transformData(res.data.data.info)
        let paginationProps = Object.assign(this.state.paginationProps, {
          total: res.data.data.total,
        })
        this.setState({
          data,
          paginationProps,
        })
      })
  };
  //重置
  reset = () => {
    console.log('重置')
    this.setState(
      {
        selectedRowKeys: [],
        user_in: '',
        name_in: '',
        phone_num_in: '',
      },
    )
    this.loadData({
      page: 1,
      pageSize: 10,
    })

  };
  //添加
  add = () => {
    console.log('添加')
    this.setState({
      visible_add: true,
    });
  };
  //点击添加完成
  handleOk_add = () => {
    let form = this.form_add.current;
    form.validateFields()//表单验证
      .then((value) => {
        let params = {
          username: value.add_user,
          personName: value.add_name,
          mobile: value.add_phone_num,
          accountStatus: value.add_state
        }
        addExpPerson(params).then(res => {
          console.log(res);
          message.success('添加成功！')
          this.loadData({
            page: 1,
            pageSize: 10,
          })
          this.setState({
            visible_add: false
          })
        })
        form.resetFields();//清空表单内容
      })
      .catch(err => {
        console.log("验证不通过：", err)
      })
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

  //导出已选择数据
  exportChoose = () => {
    console.log('导出已选择数据',this.state.selectedRowKeysAll)
    exportFile('/experimenter/export/choose',this.state.selectedRowKeysAll)
    
  };
  //按搜索条件导出
  exportSearch = () => {
    console.log('按搜索条件导出')
    let params = {}
    let { user_in, name_in, phone_num_in } = this.state
    params.page = 1;
    params.pageSize = 10;
    if (user_in !== '') {
      params.userName = user_in
    }
    if (name_in !== '') {
      params.personName = name_in
    }
    if (phone_num_in !== '') {
      params.mobile = phone_num_in
    }
    exportFile('/experimenter/export/condition',params)
  };
  //查看密码
  password = (record) => {
    let params = {
      testPersonId:record.personId,
      checkOrReset:true
    }
    checkPassword(params).then(res=>{
      this.setState({
        password: res.data.data.password,
        visible_password: true,
        personID:record.personId
      })
    })
    
  }
  //重置密码按钮
  handleOk_password = () => {
    let params = {
      testPersonId:this.state.personID,
      checkOrReset:false
    }
    checkPassword(params).then(res=>{
      this.setState({
        password: res.data.data.password,
        visible_password: false,
      })
      message.info('重置成功！')
    })
  }
  //取消
  handleCancel_password = () => {
    this.setState({
      visible_password: false,
    })
  }
  //修改
  modify = (record) => {
    console.log('修改', record)
    let form = this.form_modify.current;
    if (form) {
      this.setState({
        visible_modify: true,
        personID: record.personId
      })
      form.setFieldsValue({
        modify_user: record.user,
        modify_name: record.name,
        modify_phone_num: record.phone_num,
        modify_state: record.state,
      })
    }
  };
  //完成修改
  handleOk_modify = () => {
    const { current, pageSize } = this.state.paginationProps
    let form = this.form_modify.current;
    form.validateFields()
      .then(
        value => {
          let params = {
            testPersonId: this.state.personID,
            username: value.modify_user,
            personName: value.modify_name,
            mobile: value.modify_phone_num,
            accountStatus: value.modify_state
          }
          expPersonModify(params).then(res => {
            console.log(res);
            this.loadData({
              page: current,
              pageSize,
            })
            this.setState({
              visible_modify: false,
              personID: null
            })
            message.success('修改成功！')
          })
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  };
  handleCancel_modify = () => {
    this.setState({
      visible_modify: false,
    })
    console.log('修改弹窗关闭')
  };
  //删除
  delete = (record) => {
    console.log('确认删除', record)
    const { current, pageSize } = this.state.paginationProps
    let params = {
      testPersonId: record.personId
    }
    expDelete(params).then(res => {
      console.log(res);
      message.info(res.data.msg)
      this.loadData({
        page: current,
        pageSize,
      })
    })
  };
  //表格页数变化
  handTablechange = (pagination) => {
    console.log(pagination)
    let arr = this.state.selectedRowKeysAll
    let params = {};
    let { user_in, name_in, phone_num_in } = this.state
    params.page = pagination.current;
    params.pageSize = pagination.pageSize;
    if (user_in !== '') {
      params.userName = user_in
    }
    if (name_in !== '') {
      params.personName = name_in
    }
    if (phone_num_in !== '') {
      params.mobile = phone_num_in
    }
    expPersonList(params)
      .then(res => {
        let data = transformData(res.data.data.info)
        let paginationProps = Object.assign(this.state.paginationProps, {
          total: res.data.data.total,
          current: pagination.current,
          pageSize: pagination.pageSize,
        })
        this.setState({
          data,
          paginationProps,
          selectedRowKeys: arr,
        })
      })
  };



  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { total, current, pageSize } = this.state.paginationProps

    return (
      <div style={{ height: "100%" }}>
        {/* 输入框等 */}
        <div style={{ 'margin': '0 0 15px  0' }} >
          <div justify="space-between" gutter="15" style={{ display: "flex" }}  >
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

            <Button
              type="primary"
              icon={<ReloadOutlined className="icon1" />}
              onClick={this.reset}
              className="button1"
            >
              重置
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined className="icon1" />}
              onClick={this.add}
              className="button1"
            >
              添加
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
        <div style={{ height: "100%" }}>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            bordered={true}
            rowSelection={rowSelection}
            style={{ margin: '20px 0', borderBottom: '1px,soild' }}
            pagination={{
              position: ['bottomLeft'],
              total,
              showTotal: total => `共 ${total} 条`,
              showQuickJumper: true,
              showSizeChanger: true,
              current,//当前页数
              pageSize,//当前页面条数
            }}
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
          <div style={{ borderBottom: '1px solid gray' }}>基本信息</div>
          <div className="modal-body" style={{ height: "300px", marginTop: '20px' }}>
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
                  { required: true, message: '请输入用户名！' }
                ]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="姓名"
                name="add_name"
                id="add_name"
                rules={[
                  { required: true, message: '请输入姓名！' }
                ]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                label="电话号"
                id="add_phone_num"
                name="add_phone_num"
                rules={[
                  { required: true, message: '请输入电话号码！' }
                ]}
              >
                <Input placeholder="请输入电话号" />
              </Form.Item>
              <Form.Item
                label="状态"
                id="add_state"
                name="add_state"
                initialValue='enable'
              >
                <Radio.Group >
                  <Radio value='enable'>启用</Radio>
                  <Radio value='frozen'>冻结</Radio>
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
          <div>你的密码是 : {this.state.password}</div>
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
          <div style={{ borderBottom: '1px solid gray' }}>基本信息</div>

          <div className="modal-body" style={{ height: "300px", marginTop: '20px' }}>
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
                  { required: true, message: '请输入用户名！' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="姓名"
                id="modify_name"
                name="modify_name"
                rules={[
                  { required: true, message: '请输入姓名！' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="电话号"
                id="modify_phone_num"
                name="modify_phone_num"
                rules={[
                  { required: true, message: '请输入电话号！' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="状态"
                id="modify_state"
                name="modify_state"
              >
                <Radio.Group buttonStyle="outline"  >
                  <Radio value='enable'>启用</Radio>
                  <Radio value='frozen'>冻结</Radio>
                </Radio.Group>
              </Form.Item>

            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
