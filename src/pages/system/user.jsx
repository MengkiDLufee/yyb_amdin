import React, { Component } from 'react'
import {
  Table,
  DatePicker,
  Button,
  Input,
  Row,
  Col,
  Tree,
  Space,
  Switch,  
  Form,
  message,
  Modal,
  Select,
  TreeSelect,
  Radio,
} from 'antd'
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  DownOutlined 
} from '@ant-design/icons'
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { 
  queryAlldept, 
  querySysUser,
  queryAllPosition,
  queryAllSysRole,
  addSysUser,
  deleteSysUser,
  modifySysUserStatus,
  exportSysUser,
  resetSysUserPwd,
  modifySysUser,
  allocateSysRole
} from '../../api/sysManageIndex';

const { RangePicker } = DatePicker;
const {Option}=Select;

export default class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      users:[],//用户
      selectedRowKeys: [],//选择行
      visible:0,
      loading:false,    
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      depts:[],//部门      
      treeData:[],
      roleTreeData:[],
      treeSelectData:[],
      birthday:0,
      roles:[],//角色
      positions:[],//职位
      input:{//搜索框参数
        account:'',
        name:'',
        phone:'',
        createTimeStart:'',
        createTimeEnd:'',
        deptId:'',//部门id
      },    
      roleId:[],//分配角色id  
    }
    this.addFormRef = React.createRef()
    this.modifyFormRef = React.createRef()
  }

  onSelectChange = selectedRowKeys => {this.setState({selectedRowKeys})}

    //主页面表格页数变化
  handTablechange = (pagination) =>{
    this.setState({ 
      current:pagination.current,
      pageSize:pagination.pageSize,    
    },()=>{this.getUsers()})   
  };
  //初始化列表名称
  initColumns=()=>{
    this.columns =[
    {
      title:'账号',      
      dataIndex:'account',     
      align:'center'
    },   
    {
      title:'姓名',      
      dataIndex:'name',      
      align:'center'
    },    
    {
      title:'部门',      
      dataIndex:'deptName',      
      align:'center',
    },
    {
      title:'职位',      
      dataIndex:'positionName',      
      align:'center',
    },
    {
      title:'电话',      
      dataIndex:'phone',      
      align:'center'
    },  
    {
      title:'创建时间',      
      dataIndex:'createTime',      
      align:'center'
    },  
    {
      title:'状态',      
      dataIndex:'status',      
      align:'center',
      render:(o,user)=>(   
        <div>
          <Switch checkedChildren="正常" 
                  unCheckedChildren="冻结"
                  checked={user.status==="ENABLE"?1:0}
                  onChange={(checked)=>this.onChange(checked,user)}
                  />  
        </div>    
      )      
    },  
    {
      title:'操作',      
      dataIndex:'option',      
      align:'center',
      render:(text,user) => (
        <Space >
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(user)}}>修改</Button>
            <Button size="small" style={{color:'white',background:'#ff5621',border:'none'}} onClick={()=>{this.delete(user)}}>删除</Button>
            <Button size="small" style={{color:'white',background:'#1E9FFF',border:'none'}} onClick={()=>{this.role_assign(user)}}>分配角色</Button>
            <Button size="small" style={{color:'white',background:'#00A65A',border:'none'}} onClick={()=>{this.reset(user)}}>重置密码</Button>
        </Space>
      ),
    },  
    ];  
  }
//改变用户状态
 onChange=async(checked,user)=>{   
   let that=this
   if(user.userId==='1'){message.info('不能冻结超级管理员！');return null}
   else{
      function print(result){
      // console.log(`修改用户${user.userId}状态`,result) 
      that.getUsers()
      }   
      function res(){message.info(`${msg}`)}  
      const status=checked?'ENABLE':'DISABLE'
      const msg=checked?'解除冻结成功！':'冻结成功！'
      // console.log(`status: ${status}`);
      let result=await modifySysUserStatus(user.userId,status)
      await print(result)
      await res()
      }
    }
    
// 获取用户数据
getUsers=()=>{  
  this.setState({loading:true}) 
  const {current,pageSize,input }=this.state; 
  let inputData={page:current, pageSize}
  for(let item of Object.entries(input))
    if(item[1]!=="") inputData[item[0]]=item[1]
  querySysUser(inputData).then((result)=>{
    this.setState({loading:false})    
  // console.log("获取用户信息列表数据",result) 
  const data = result.data.data  
  const users=data.info 
  for(const user of users)
    user.key=user.userId
  this.setState({
    users,
    total:data.total,
  })
  }).catch(err=>{message.info(`查询失败${err}`)})
}

// 获取所有部门
getDepartment=()=>{  
  this.setState({loading:true})   
  queryAlldept().then((result)=>{
    this.setState({loading:false})    
  // console.log("获取所有部门",result) 
  const depts = result.data.data   
  for(const dept of depts)
    dept.key=dept.deptId
  this.setState({depts},()=>this.getTreeData())
  })
}

// 获取所有角色
getRole=()=>{  
  this.setState({loading:true})   
  queryAllSysRole()
  .then((result)=>{
    this.setState({loading:false})    
    // console.log("获取所有角色",result) 
    const roles = result.data.data
    for(const role of roles)
      role.key=role.roleId 
    this.setState({roles},()=>this.getRoleTreeData())
  })  
}

// 获取所有职位
getPosition=()=>{  
  this.setState({loading:true})   
  queryAllPosition()
  .then((result)=>{
    this.setState({loading:false})    
    // console.log("获取所有职位",result)
    const positions = result.data.data  
    for(const position of positions)
      position.key=position.positionId
    this.setState({positions})
  })   
}

//获得树形结构
getTreeData=()=>{
  const{depts}=this.state 
  const tree = depts.filter(item=>item.pid==="0")
  tree.map(item=>{
    let children=depts.filter(dept=>dept.pid===item.deptId)
    item.children=children
    return item
  })  
  const treeData = [
    {
      title: '顶级',
      key: '0',
      children:tree.map(item=>{   
        if(item.children!=null){
          return{      
            title:item.fullName, 
            key:item.key,
            children:item.children.map(child=>{
              return{
              title:child.fullName, 
              key:child.key
            }})
          }
        }
        else return{      
          title:item.fullName, 
          key:item.key
        }
      }),      
       }
      ];  
  const treeSelectData = 
    tree.map(item=>{   
      if(item.children!=null){
        return{      
          title:item.fullName, 
          key:item.key,
          children:item.children.map(child=>{
            return{
            title:child.fullName, 
            key:child.key,
          }})
        }
      }
      else return{      
        title:item.fullName, 
        key:item.key,
      }
    })  
  this.setState({treeData,treeSelectData})
}

//获取角色树
getRoleTreeData=()=>{
  const{roles}=this.state 
  const roleTree = roles.filter(item=>item.pid==="0")
  roleTree.map(item=>{
    let children=roles.filter(role=>{
      return role.pid===item.roleId
    })
    item.children=children
    return null
  })
  const roleTreeData =    
      roleTree.map(item=>{   
        if(item.children!=null){
          return{      
            title:item.name, 
            key:item.key,
            children:item.children.map(child=>{
              return{
              title:child.name, 
              key:child.key
            }})
          }
        }
        else return{      
          title:item.name, 
          key:item.key
        }
      })    
  this.setState({roleTreeData})      
}

//获取账号
accountChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{account:e.target.value}),
  })
}

//获取名字
nameChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{name:e.target.value}),
  })
}

//获取手机号
phoneChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{phone:e.target.value}),
  })
}

//获取时间
dateChange(value,dateString){  
  const createTimeStart=dateString[0]
  const createTimeEnd=dateString[1]
  this.setState({
    input:Object.assign(this.state.input,{
    createTimeStart,
    createTimeEnd}),
  })
}

birthdayChange(value,dateString){
  const birthday=dateString
  this.setState({birthday})
}
//选中部门
onSelect = (keys) => { 
   let key=keys[0]
   if(key==='0'||key==='24'){key=''} 
  //  console.log('按部门id查询',key);
   this.setState({
     input:Object.assign(this.state.input,{deptId:key}),
    },()=>{this.getUsers()})
};
//选中分配角色id
onRoleSelect=(checkedkeys,e)=>{
    const{checkedNodes}=e
    var roleId=checkedNodes[1]?checkedNodes[1].key:checkedNodes[0].key
    // console.log("checkedNodes",checkedNodes);
    this.setState({roleId})
    // console.log("roleId",roleId)
}
  //关闭弹窗
  handleCancel = () => {this.setState({ visible:0 })}

  //关闭添加用户弹窗
  handleCancel_Add () {
    this.setState({ visible:0 });  
    this.addFormRef.current.resetFields()    
  };
  //请求分配角色
  handleOk_role_assign = () => {
    this.setState({ loading: true });
    const{roleId} = this.state
    const userId = this.user.userId
    allocateSysRole({userId,roleId}).then((result)=>{
      this.setState({loading:false,visible:0})    
      // console.log(`分配用户${userId}角色${roleId}`,result)
      message.info(`${result.data.msg}`,[0.9])     
      }).catch(err=>{
        message.info(`分配用户${userId}角色${roleId}失败！错误:${err}`,[0.9])
      })
  };
  //请求重置密码
  handleOk_reset = () => {
    const {userId}=this.user    
    this.setState({ loading: true });
    resetSysUserPwd(userId).then((result)=>{
      this.setState({loading:false,visible:0})    
      message.info(`${result.data.msg}`,[0.9])     
      }).catch(err=>{
        message.info(`重置密码失败！错误:${err}`,[0.9])
      })
  };
//请求删除用户
  handleOk_delete=()=>{
    this.setState({ loading: true });
    let {userId,userPosId}=this.user
    if(!userPosId)userPosId=0;
    // console.log(userId,userPosId);
    deleteSysUser(userId,userPosId).then((result)=>{
      // console.log("删除用户",result)
      this.getUsers()   
      this.setState({ loading: false, visible:0});
      message.info(`${result.data.msg}`,[0.9])     
      }).catch(err=>{
        message.info(`删除用户失败！错误:${err}`,[0.9])
      })          
  }
  //请求修改用户
  handleOk_modify = () => {
    this.setState({ loading: true });
    this.modifyFormRef.current.validateFields()
    .then(()=>{
      let data=this.modifyFormRef.current.getFieldValue()
      data.birthday=this.state.birthday
      //发送修改用户请求
      modifySysUser(data).then((result)=>{
        this.setState({loading:false,visible:0})    
        // console.log("请求修改用户",result)
        this.getUsers()
        message.info('修改用户成功！',[0.5])     
        }).catch(err=>{
          message.info(`修改用户失败！错误:${err}`,[0.5])
        })     
    }).catch(errorInfo=> {
      this.setState({ loading: false})
  }) 
  };

  //请求添加用户
  handleOk_add = () => {
    this.setState({ loading: true });  
	  this.addFormRef.current.validateFields()//进行表单校验 
    .then(()=>{
      this.setState({ loading: false, visible:0 });
      //获取表单数据
      let data=this.addFormRef.current.getFieldValue()
      data.birthday=this.state.birthday
      //发送添加用户请求
      addSysUser(data).then((result)=>{
        this.setState({loading:false})    
        // console.log("请求添加用户",result)
        this.addFormRef.current.resetFields() 
        this.getUsers()
        message.info('添加用户成功！',[0.5])     
        }).catch(err=>{
          message.info(`添加用户失败！错误:${err}`,[0.5])
        })     
    }).catch(errorInfo=> {
      this.setState({ loading: false})
      // console.log(errorInfo);
  }) 
};

//搜索用户
  search=()=>{this.getUsers()}

//添加用户
  add =() =>{this.setState({visible:"visible_add"})}

//请求导出数据
export=()=>{ 
  const {selectedRowKeys} = this.state   
  if(!selectedRowKeys.length) message.info('请勾选数据再导出',[0.8])
  else exportSysUser(selectedRowKeys)
}

//修改用户信息
  modify=(user)=>{
    this.setState({visible:"visible_modify"})
    const data={...user}
    // console.log({...user});
    data.birthday=user.birthday?moment(user.birthday,'YYYY-MM-DD'):undefined
    this.modifyFormRef.current.setFieldsValue({...data})
  }

  //删除用户
  delete=(user)=>{
    this.setState({visible:"visible_delete"})
    this.user=user
  }

  //分配角色
  role_assign=(user)=>{
    this.user=user
    this.setState({roleId:user.roleId},()=>{this.setState({visible:'visible_role_assign'})}) 
  }

  //重置密码
  reset=(user)=>{
    this.setState({visible:'visible_reset'})
    this.user=user
  }


  componentWillMount(){
    this.initColumns()
     }
  
  componentDidMount(){
    this.getUsers()
    this.getDepartment()
    this.getPosition()    
    this.getRole()    
  }
  
  render() {
    const {visible,
           loading,
           users,
           positions,
           treeData,
           treeSelectData,
           roleTreeData,
           selectedRowKeys,
           input,
           roles,
           total,
           roleId
          }=this.state
    const user=this.user||{}  
    const roleExpandedKeys = roles.map(item=>item.roleId)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };    
    return (
      <div style={{height:'100%'}}>
         <Row gutter={{xs:8,sm:16,md:24,lg:32}}>         
            {/* 树形控件 */}
          <Col span={4}>   
          {this.state.treeData.length ? (
              <Tree                
                defaultExpandAll={true}            
                defaultSelectedKeys={['0']}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
                onSelect={this.onSelect}
              />             
            ) : ('loading tree')
          }       
          </Col>
            {/* 表格页面主体 */}
          <Col span={20}>
           {/* 搜索栏 */}
           <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={2}>
                <Input 
                  placeholder="账号"
                  onChange={(e)=>this.accountChange(e)}
                  value={input.account}                  
                >              
                </Input>
            </Col>            
            <Col span={2}>
                <Input 
                  placeholder="姓名"
                  onChange={(e)=>this.nameChange(e)}
                  value={input.name}                  
                >              
                </Input>
            </Col>
            <Col span={3}>
                <Input 
                  placeholder="电话号"
                  onChange={(e)=>this.phoneChange(e)}
                  value={input.phone}                  
                >              
                </Input>
            </Col>
            <Col span={7}>
                <RangePicker                 
                  locale={locale}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                  onChange={(value,dateString)=>{this.dateChange(value,dateString)}}                                       
                />
            </Col>
            <Col>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="button3"
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"
                  icon={<PlusOutlined/> }
                  className="button3"
                  onClick={this.add}
                >
                  添加
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"                                
                  onClick={this.export}
                  icon={<ExportOutlined/>}    
                >
                  导出
                </Button>
            </Col>
            </Row>         
        </div>
           {/* 表格 */}
           <Table 
             columns={this.columns}
             dataSource={users}
             rowKey={user=>user.userId}
             bordered={true}
             style={{margin:'20px 0',borderBottom:'1px,soild'}}
             pagination={{
              position: ['bottomLeft'] ,
              total:total,
              showTotal:total => `共 ${total} 条`,
              showQuickJumper:true,
              showSizeChanger:true,
              current:this.state.current,
              pageSize:this.state.pageSize,
            }}
             onChange={this.handTablechange}             
             rowSelection={rowSelection}   
           />    
          </Col>
        </Row>
      {/* 弹窗模块 */}
      {/* 修改用户弹窗 */}
      <Modal
          width={900}    
          forceRender={true}
          visible={visible==='visible_modify'}
          title="编辑用户"          
          onOk={this.handleOk_modify}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_modify}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <Form
          onFinish={this.handleOk_modify}
          ref={this.modifyFormRef} 
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"         
        >
          <b>基本信息</b><hr/><br/>         
              {/* <Form.Item
               label="账号"               
               name="account"  
               id="account_a" 
               rules={[
                 {required:true,message:'请输入账号！'}
               ]}
              >
                  <Input placeholder="请输入账号"/>
              </Form.Item> */}
              <Form.Item
               label="姓名"               
               name="name" 
               id="name_a"          
               rules={[
                 {required:true,message:'请输入姓名！'}
               ]}
              >
                  <Input placeholder="请输入姓名"/>
              </Form.Item>
              <Form.Item
               label="出生日期"             
               name="birthday"  
               id="birthday_a"            
              >
                   <DatePicker
                   format={'YYYY-MM-DD'}                
                   onChange={(value,dateString)=>{this.birthdayChange(value,dateString)}}  
                   placeholder="请输入出生日期" />
              </Form.Item>  
              <Form.Item
                name="password"
                label="密码"
                id="password_a"
                rules={[
                  {
                    message: '请输入密码',
                  },
                ]}                
              >
                  <Input.Password placeholder="请输入密码"/>
              </Form.Item>
              <Form.Item                
                label="确认密码"
                name="confirmPassword"
                id="confirm_a"
                dependencies={['password']}                
                rules={[
                  {
                    message: '请确认密码',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="请确认密码"/>
              </Form.Item>   
              <Form.Item
               label="性别"               
               name="sex"  
               id="sex_a"
               rules={[
                {message:'请选择性别！'}
              ]}         
              >
                  <Radio.Group>
                    <Radio value={"M"}>男</Radio>
                    <Radio value={"F"}>女</Radio>
                  </Radio.Group>
              </Form.Item>                           
              <Form.Item
               label="邮箱"               
               name="email"  
               id="email_a"
               rules={[
                {message:'请输入邮箱！'}
              ]}         
              >
                  <Input placeholder="请输入邮箱"/>
              </Form.Item>              
              <Form.Item
               label="电话"              
               name="phone"     
               id="phone_a"      
              >
                  <Input placeholder="请输入电话"/>
              </Form.Item>
          <b>职务信息</b><hr/><br/> 
              <Form.Item
               label="部门"               
               name="deptId"
               id="deptId_a"
               rules={[
                 {required:true,message:'请输入部门！'}
               ]}
              >                 
                  <TreeSelect                    
                    style={{ width: '100%' }}                    
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeSelectData}
                    placeholder="请输入部门"
                    treeDefaultExpandAll                    
                  />
              </Form.Item> 
              
              <Form.Item
               label="职位"               
               name="positionId"
               id="positionId_a"
               rules={[
                 {required:true,message:'请选择职位！'}
               ]}
              >
                <Select 
                    allowClear={true}                    
                    placeholder="请选择职位"
                    id="mposition"
                 >
                      {positions.map(item=>
                      <Option key={item.positionId} value={item.positionId}>{item.name}</Option>
                    )}                
                </Select>
              </Form.Item>  
          </Form>                  
        </Modal>
        {/* 添加用户弹窗 */}
      <Modal
          width={900}    
          forceRender={true}
          visible={visible==='visible_add'}
          title="添加用户"          
          onOk={this.handleOk_add}
          onCancel={(e)=>this.handleCancel_Add(e)}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_add}>
              提交
            </Button>,
            <Button key="back" onClick={(e)=>this.handleCancel_Add(e)}>
            取消
          </Button>,
          ]}         
        >
          <Form
          onFinish={this.handleOk_add}
          ref={this.addFormRef} 
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"         
        >
          <b>基本信息</b><hr/><br/>         
              <Form.Item
               label="账号"
               id="account"
               name="account"           
               rules={[
                 {required:true,message:'请输入账号！'}
               ]}
              >
                  <Input id="maccount" placeholder="请输入账号"/>
              </Form.Item>
              <Form.Item
               label="姓名"
               id="name"
               name="name"           
               rules={[
                 {required:true,message:'请输入姓名！'}
               ]}
              >
                  <Input id="mname" placeholder="请输入姓名"/>
              </Form.Item>
              <Form.Item
               label="出生日期"             
               name="birthdayAlert"              
              >
                   <DatePicker
                   format={'YYYY-MM-DD'}                
                   onChange={(value,dateString)=>{this.birthdayChange(value,dateString)}}  
                   placeholder="请输入出生日期" />
              </Form.Item>  
              <Form.Item
                name="password"
                id="password_m"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}                
              >
                  <Input.Password id="mpassword" placeholder="请输入密码"/>
              </Form.Item>
              <Form.Item                
                label="确认密码"
                name="confirm"
                dependencies={['password']}                
                rules={[
                  {
                    required: true,
                    message: '请确认密码',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password id="mconfirm" placeholder="请确认密码"/>
              </Form.Item>   
              <Form.Item
               label="性别"
               id="sex"
               name="sex"  
               rules={[
                {message:'请选择性别！'}
              ]}         
              >
                  <Radio.Group>
                    <Radio value={"M"}>男</Radio>
                    <Radio value={"F"}>女</Radio>
                  </Radio.Group>
              </Form.Item>                           
              <Form.Item
               label="邮箱"
               id="email"
               name="email"  
               rules={[
                {message:'请输入邮箱！'}
              ]}         
              >
                  <Input id="memail" placeholder="请输入邮箱"/>
              </Form.Item>              
              <Form.Item
               label="电话"
               id="phone"
               name="phone"           
              >
                  <Input id="mphone" placeholder="请输入电话"/>
              </Form.Item>
          <b>职务信息</b><hr/><br/> 
              <Form.Item
               label="部门"
               id="deptId"
               name="deptId"
               rules={[
                 {required:true,message:'请输入部门！'}
               ]}
              >                 
                  <TreeSelect 
                    id="mdeptId"                   
                    style={{ width: '100%' }}                    
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeSelectData}
                    placeholder="请输入部门"
                    treeDefaultExpandAll                    
                  />
              </Form.Item> 
              
              <Form.Item
               label="职位"
               id="positionId"
               name="positionId"
               rules={[
                 {required:true,message:'请选择职位！'}
               ]}
              >
                <Select 
                    id="mpositionId"
                    allowClear={true}                    
                    placeholder="请选择职位"
                 >
                      {positions.map(item=>
                      <Option key={item.positionId} value={item.positionId}>{item.name}</Option>
                    )}                
                </Select>
              </Form.Item>  
          </Form>         
        </Modal>
         {/* 删除用户弹窗 */}
      <Modal
          visible={visible==='visible_delete'}
          title="信息"          
          onOk={this.handleOk_delete}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_delete}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否删除用户{user.name}</p>         
        </Modal>
        {/* 分配角色弹窗 */}
      <Modal
          width={280} 
          forceRender={true}  
          visible={visible==='visible_role_assign'}
          title="角色分配"          
          onOk={this.handleOk_role_assign}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_role_assign}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <Tree                
                treeDefaultExpandAll
                checkable
                checkStrictly
                multiple={false}
                checkedKeys={roleId?[roleId]:['']}
                switcherIcon={<DownOutlined />}
                treeData={roleTreeData}
                onCheck={this.onRoleSelect}
                expandedKeys={roleExpandedKeys}
              />             
        </Modal>
        {/* 重置密码弹窗 */}
      <Modal
          visible={visible==='visible_reset'}
          title="信息"          
          onOk={this.handleOk_reset}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_reset}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否重置{user.name}密码为11111?</p>         
        </Modal>
      </div>     
    )
  }
}
