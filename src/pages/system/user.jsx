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
  TreeSelect
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
} from '../../api';
import Item from 'antd/lib/list/Item';

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
    }
    this.addFormRef = React.createRef()
    this.modifyFormRef = React.createRef()
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //主页面表格页数变化
handTablechange = (pagination) =>{
  this.setState({ 
    current:pagination.current,
    pageSize:pagination.pageSize,    
  }) 
  this.getUsers()
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
      dataIndex:'roleName',      
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
      render:(o,record)=>(
        <Space>
          <Switch checkedChildren="正常" 
                  unCheckedChildren="冻结"
                  checked={o} 
                  onClick={(checked)=>{this.freeze(checked,record)}} 
                  defaultChecked />
        </Space>
      )
    },  
    {
      title:'操作',      
      dataIndex:'option',      
      align:'center',
      render:(text,record) => (
        <Space >
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
            <Button size="small" style={{color:'white',background:'#ff5621',border:'none'}} onClick={()=>{this.delete(record)}}>删除</Button>
            <Button size="small" style={{color:'white',background:'#1E9FFF',border:'none'}} onClick={()=>{this.role_assign(record)}}>分配角色</Button>
            <Button size="small" style={{color:'white',background:'#00A65A',border:'none'}} onClick={()=>{this.reset(record)}}>重置密码</Button>
        </Space>
      ),
    },  
    ];  
  }
// 获取用户数据
getUsers=()=>{  
  this.setState({loading:true}) 
  const {input,current,pageSize}=this.state; 
  const {account,name,phone,createTimeStart,createTimeEnd,deptId}=input;
  querySysUser({
    page:current,
    pageSize,
    account,
    name,
    phone,
    createTimeStart,
    createTimeEnd,
    deptId:'',
    }).then((result)=>{
    this.setState({loading:false})    
  console.log("获取用户信息列表数据",result) 
  const data = result.data.data  
  const users=data.info 
  for(const user of users){
    user.key=user.userId
  }  
  this.setState({
    users,
    total:data.total,
  })
  })   
}

// 获取所有部门
getDepartment=()=>{  
  this.setState({loading:true})   
  queryAlldept().then((result)=>{
    this.setState({loading:false})    
  console.log("获取所有部门",result) 
  const depts = result.data.data   
  for(const dept of depts){
    dept.key=dept.deptId
  }  
  this.setState({
    depts,    
  },()=>{
    this.getTreeData()
  })
  })
}

// 获取所有角色
getRole=()=>{  
  this.setState({loading:true})   
  queryAllSysRole().then((result)=>{
  this.setState({loading:false})    
  console.log("获取所有角色") 
  console.log(result) 
  const roles = result.data.data
  for(const role of roles){
    role.key=role.roleId
  }  
  this.setState({
    roles,    
  })
  })   
}

// 获取所有职位
getPosition=()=>{  
  this.setState({loading:true})   
  queryAllPosition().then((result)=>{
  this.setState({loading:false})    
  console.log("获取所有职位",result)
  const positions = result.data.data  
  for(const position of positions){
    position.key=position.positionId
  }  
  this.setState({
    positions,    
  },)  
  })   
}

//获得树形结构
getTreeData=()=>{
  const{depts}=this.state 
  const tree=depts.filter(item=>{return item.pid==="0"})
  tree.map(item=>{
    let children=depts.filter(dept=>{
      return dept.pid===item.deptId
    })
    item.children=children
  })   
  const treeData = [
    {
      title: '顶级',
      key: '000',
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
  this.setState({treeData,treeSelectData},()=>{
    console.log('tree:',this.state.treeData)
    console.log('treeSelect:',this.state.treeSelectData)
  })
  
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
  console.log(value,birthday);
  this.setState({birthday})
}
handlePositionChange=(value)=>{
  console.log(this.state.positions);
  console.log(`selected ${value}`);
}
  //关闭弹窗
  handleCancel = () => {
    this.setState({ visible:0 });  
  };

  //关闭添加用户弹窗
  handleCancel_Add (e) {
    this.setState({ visible:0 });    
    
    this.addFormRef.current.resetFields()
    
  };

  handleOk_role_assign = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible:0 });
    }, 300);
  };

  handleOk_reset = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible:0});
    }, 300);
  };

  handleOk_delete = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible:0});
    }, 300);
  };  

  handleOk_modify = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible:0 });
    }, 300);
  };
  //请求添加用户
  handleOk_add = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible:0 });
    }, 300);    
    let data=this.addFormRef.current.getFieldValue();
    data.birthday=this.state.birthday
    console.log("获取表单数据",data);  
    addSysUser(data).then((result)=>{
      this.setState({loading:false})    
      console.log("请求添加用户",result)
      // const positions = result.data.data  
      // for(const position of positions){
      //   position.key=position.positionId
      // }  
      // this.setState({
      //   positions,    
      // },)  
       })   
  };

//搜索用户
search=()=>{
  console.log(this.state.input);
  this.getUsers()
}

//添加用户
  add =() =>{    
    this.setState({
      visible:"visible_add",
    });     
  };

//导出数据
  export=()=>{
    message.info('导出数据')
  }

//修改用户信息
  modify=()=>{
    this.setState({
      visible:"visible_modify",      
    })
  }

  //删除用户
  delete=()=>{
    this.setState({
      visible:"visible_delete",      
    })
  }

  //分配角色
  role_assign=()=>{
    this.setState({
      visible:'visible_role_assign',      
    })
  }

  //重置密码
  reset=()=>{
    this.setState({
      visible:'visible_reset',      
    })
  }

  //冻结用户
  freeze=(checked,dataIndex)=>{    
    if(checked){
      message.info('解除冻结用户成功！',[0.5])
      checked=true
    }else{
      message.info('冻结用户成功！',[0.5])
      checked=false      
    }
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
           birthday,
           positions,
           treeData,
           treeSelectData,
           selectedRowKeys,
           input,
           total
          }=this.state
    const user=this.user||{}  

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };    
    return (
      <div style={{height:'100%'}}>
         <Row gutter={{xs:8,sm:16,md:24,lg:32}}>         
            {/* 树形控件 */}
          <Col span={4}>   
          {this.state.treeData.length ? (
              <Tree                
                defaultExpandAll={true}
                // expandedKeys={treekeys}
                defaultSelectedKeys={['000']}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
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
          visible={visible==='visible_modify'}
          title="编辑用户"     
          forceRender={true}     
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
          <p>用户信息</p>         
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
                  <Input placeholder="请输入账号"/>
              </Form.Item>
              <Form.Item
               label="姓名"
               id="name"
               name="name"           
               rules={[
                 {required:true,message:'请输入姓名！'}
               ]}
              >
                  <Input placeholder="请输入姓名"/>
              </Form.Item>
              <Form.Item
               label="出生日期"              
               id="birthday"                       
               name="birthdayAlert"               
               rules={[
                 {required:true,message:'请输入出生日期！'}
               ]}
              >
                   <DatePicker
                   format={'YYYY-MM-DD'}                
                   onChange={(value,dateString)=>{this.birthdayChange(value,dateString)}}  
                   placeholder="请输入出生日期" />
              </Form.Item>  
              <Form.Item
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}                
              >
                  <Input.Password placeholder="请输入密码"/>
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
                <Input.Password placeholder="请确认密码"/>
              </Form.Item>                              
              <Form.Item
               label="邮箱"
               id="email"
               name="email"           
              >
                  <Input placeholder="请输入邮箱"/>
              </Form.Item>              
              <Form.Item
               label="电话"
               id="phone"
               name="phone"           
              >
                  <Input placeholder="请输入电话"/>
              </Form.Item>
          <b>职务信息</b><hr/><br/> 
              <Form.Item
               label="部门"
               id="deptId"
               name="depId"
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
               id="positionId"
               name="positionId"
               rules={[
                 {required:true,message:'请选择职位！'}
               ]}
              >
                <Select 
                    allowClear={true}                    
                    placeholder="请选择职位"
                 >
                      {positions.map(item=>
                      <Option value={item.positionId}>{item.name}</Option>
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
          <p>是否删除用户</p>         
        </Modal>
        {/* 分配角色弹窗 */}
      <Modal
          visible={visible==='visible_role_assign'}
          title="信息"          
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
          <p>分配角色</p>         
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
          <p>是否重置密码为11111?</p>         
        </Modal>
      </div>     
    )
  }
}
