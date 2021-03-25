import React, { Component } from 'react'
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Space,
  Modal,
  message,
  Form,
  Card,
} from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
} from '@ant-design/icons'

//主页面表格数据
const data = [
  {   
    key: '0',     
    name: '客服',
    superior:'超级管理员',
    alias: '客服',    
  },
  {
    key: '1',
    name: '生产',
    superior:'超级管理员',
    alias: '生产', 
  },
  {  
    key: '2',      
    name: '超级管理员',
    superior:'-',
    alias: 'adminstrator', 
  },
  {
    key: '3',
    name: '第三方登录',
    superior:'超级管理员',
    alias: 'oauth_role', 
  }, 
  {
    key: '4',
    name: '内勤',
    superior:'超级管理员',
    alias: '内勤', 
  },
  {  
    key: '5',     
    name: '质检',
    superior:'超级管理员',
    alias: '质检', 
  },  
];
 
export default class Role extends Component {

  constructor(props){
    super(props)
    this.state = {
      roles:[],
      roleName:'',
      roleId:'0',
      visible:'0',     
      loading:false,
      selectedRowKeys: [],      
      paginationProps : {//分页栏参数    
        showQuickJumper:true,
        showSizeChanger:true,
      }        
    }     
  }  
  //初始化列表
  initColumns=()=>{
  this.columns = [
    {
      title:'名称',
      dataIndex:'name',
      width:200,
      align:'center'
    },    
    {
      title:'上级角色',
      dataIndex:'superior',
      width:200,
      align:'center',
    },
    {
      title:'别名',
      dataIndex:'alias',
      width:200,
      align:'center',
    },  
      {
        title: '操作', 
        width:300,   
        align:'center'  ,      
        render:(role)=>( //render会把每一行角色数据的对象作为参数传入           
          <Space >            
          <Button  size="small" style={{color:'black',background:'white'}} onClick={()=>this.modify(role)}>修改</Button>
          <Button  size="small" style={{color:'white',background:'#ff5621',border:'none'}} onClick={()=>this.delete(role)}>删除</Button>
          <Button  size="small" style={{color:'white',background:'#1E9FFF',border:'none'}} onClick={()=>this.config(role)}>权限配置</Button>
         </Space>
        )
      },
    ];
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

  //获取列表数据
  getRoles=(roleName)=>{
      this.setState({loading:true})
      roleName=roleName||this.state.roleName
      //const result = await reqRoles(roleName)
      const result = setTimeout(()=>data,1000)
      this.setState({loading:false})    
      console.log("获取列表数据");  
      const roles = result         
      this.setState({roles})
  }

/*   //显示弹窗
  handleVisible(role,event){
    this.role=role
    const target = "visible_"+event.currentTarget.name
    console.log(`将visible置为:${target} 数据:${role}`);  
    this.setState({visible:target})
  } */
  //显示搜索
  search=() => {     
    console.log(`搜索`);
    message.info('搜索角色',[1])
  }
  //显示添加
  add=() => {   
    // 更新状态
    console.log(`添加用户`);
    this.setState({
      visible:"visible_add"
    })
  }
  //显示导出
  export=() => {   
    message.info('导出中。。。')
  }

   //显示修改
  modify=(role) => {
    //保存角色对象
    this.role =role
    console.log(role);
    // 更新状态
    console.log(`visible置为"visible_modify"`);
    this.setState({
      visible:"visible_modify"
    })
  }

   //显示删除
  delete=(role) => {
    this.role =role
    console.log(role);
    // 更新状态
    console.log(`visible置为"visible_delete"`);
    this.setState({
      visible:"visible_delete"
    })
  }

   //显示权限配置
  config=(role) => {
    this.role =role
    console.log(role);
    // 更新状态
    console.log(`visible置为"visible_config"`);
    this.setState({
      visible:"visible_config"
    })
  }
  //关闭弹窗
  handleCancel=()=>{    
    console.log("将visible置为0");  
    this.setState({visible:0})
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {
      visible,     
      loading,   
      selectedRowKeys   
     }=this.state       
    const role = this.role || {}//如果还没有，指定一个空对象
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
 
    return (
      <div style={{height:'100%'}}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={4}>
                <Input 
                  placeholder="角色名称"
                  onChange={this.typeChange}                                  
                >              
                </Input>
            </Col>           
            <Col>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}                  
                  onClick={this.search}
                  name="search"
                >
                  搜索
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"
                  icon={<PlusOutlined/> }                  
                  onClick={this.add}
                  name="add"
                >
                 添加
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"                                
                  onClick={this.export}
                  icon={<ExportOutlined/>}   
                  name="export" 
                >
                  导出
                </Button>
            </Col>
            </Row>         
        </div>
        {/* 表格 */}
        <Table 
          columns={this.columns}          
          dataSource={data}
          bordered={true}
          rowSelection={rowSelection}
          style={{margin:'20px 0'}}
          pagination={ this.state.paginationProps}          
        />
        {/* 添加用户弹窗 */}
      <Modal
          width={900}
          visible={visible==="visible_add"}
          title="添加用户"          
          onOk={this.handleOk_add}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_add}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}         
        >
        <Form>
        <Card size="small" title="基本信息" bordered={false}>          
          </Card>
          <Card size="small" title="职务信息" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Form>                     
        </Modal>
       {/* 删除用户弹窗 */}
      <Modal 
          visible={visible==="visible_delete"}          
          title="信息"    
          onCancel={this.handleCancel}          
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleShow}>
              提交
            </Button>,
            <Button name="delete" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否删除角色{role.name}</p>         
        </Modal>
        {/* 修改用户弹窗 */}
      <Modal
          visible={visible==="visible_modify"}
          title="修改角色"          
          onOk={this.handleOk_modify}
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_modify}>
              提交
            </Button>,
            <Button name="modify" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>用户信息</p>         
        </Modal>
         {/* 权限配置弹窗 */}
      <Modal
          visible={visible==="visible_config"}
          title="权限配置"                
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
      </div>
    )
  }
}
