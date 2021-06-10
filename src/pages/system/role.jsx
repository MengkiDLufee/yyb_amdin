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
  Tree,
  TreeSelect
} from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { 
  querySysRole,
  queryAllSysRole,
  addSysRole,
  deleteSysRole,
  exportSysRole,
  queryAllPermission,
  queryRoleHavePerm,
  allocateRolePermission,
  modifySysRole
 } from '../../api/sysManageIndex';

export default class Role extends Component {
  constructor(props){
    super(props)
    this.state = {
      roles:[],
      roleTreeData:[],
      permissions:[],//所有权限
      permissionTreeData:[],//权限树
      havePerms:[],//控制选中权限
      preHavePerms:[],//保存之前的权限
      addHavePerms:[],//新增权限
      deletePerms:[],//删除权限
      expandedKeys:[],//展开节点
      autoExpandParent: true,
      roleId:'0',
      visible:'0', 
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数    
      loading:false,
      selectedRowKeys: [],//选择行    
      input:{//搜索框参数
        name:'',
      },          
    } 
    this.addFormRef = React.createRef()
    this.modifyFormRef = React.createRef()    
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
      dataIndex:'pname',
      width:200,
      align:'center',
    },
    {
      title:'别名',
      dataIndex:'description',
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

  //主页面表格页数变化
  handTablechange = (pagination) =>{
    this.setState({ 
      current:pagination.current,
      pageSize:pagination.pageSize,    
    },()=>{this.getRoles()})   
  };

  //展开方法
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  //表格行选择
  onSelectChange = row => {this.setState({selectedRowKeys:row})};

  //选中分配权限id
  onHavePermSelect=(checkedKeys,e)=>{
    const {preHavePerms} = this.state
    const checkedNodes=e.checkedNodes.map(item=>item.key)
    const deleteKeys = preHavePerms.filter(it=>!checkedNodes.includes(it))
    const addKeys = checkedNodes.filter(it=>!preHavePerms.includes(it))
    // console.log(`checkedKeys:${checkedKeys}`,'   ',`preHavePerms:${preHavePerms}`,`deleteKeys${deleteKeys}`,`addKeys${addKeys}`,e);
    this.setState({havePerms:checkedNodes,deletePerms:deleteKeys,addHavePerms:addKeys})
  }

  // 获取角色信息数据
  getRoles=()=>{  
    this.setState({loading:true}) 
    const {current,pageSize,input }=this.state; 
    let inputData={page:current, pageSize,}
    for(let item of Object.entries(input)){ 
      if(item[1]!=="") 
      inputData[item[0]]=item[1]
    }  
    querySysRole(inputData)
    .then(result=>{
      this.setState({loading:false})    
      const data = result.data.data  
      const roles=data.info 
      for(const role of roles) role.key=role.roleId
      this.setState({roles,total:data.total})
      })
    .catch(err=>message.info(`获取角色信息失败！错误:${err}`,[0.9]))
  }
  
  // 获取所有角色
  getAllRole=()=>{  
    this.setState({loading:true})   
    queryAllSysRole()
    .then(result=>{
      this.setState({loading:false})    
      const roles = result.data.data
      for(const role of roles) role.key=role.roleId
      this.setState({roles},()=>this.getRoleTreeData())
    })  
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

  //获取所有角色,创建角色树
  getAllPermission=()=>{  
    queryAllPermission()
    .then(result=>{
      const permissions = result.data.data
      for(const permission of permissions)
      permission.key=permission.roleId
      this.setState({permissions},()=>this.createTree())
    })  
  }

  //生成权限树的方法
  createTree = () => {
    const{permissions}=this.state 
    let treeArr = [];
    //获取顶级父元素集合
    let roots = permissions.filter(item=>item.fid==="0")
    treeArr.push(...roots);
    //从顶级元素开始，获取每个元素的子元素放到该元素的children属性中
    const getChildren = (arr,data) => {
      arr.map(x=>{x.child=data.filter(item=>item.fid===x.permissionId)
        return null})
    }
    getChildren(treeArr,permissions);

    treeArr.map(item=>{
    item.child.map(it=>{
      let children=permissions.filter(item=>item.fid===it.permissionId)
      it.child=children
      return null
    })
    return null
    })

    const permissionTreeData = treeArr.map(item=>{   
    if(item.child!==null){
      return{      
        title:item.permissionName, 
        key:item.permissionId,
        children:item.child.map(it=>{
          if(Array.isArray(it.child)){
            return{
              title:it.permissionName, 
              key:it.permissionId,
              children:it.child.map(x=>{
                return{
                  title:x.permissionName, 
                  key:x.permissionId
                }
            })
          }
          }else{
          return{
            title:it.permissionName, 
            key:it.permissionId
          }
        }
      })
      }
    }
    else return{      
      title:item.permissionName, 
      key:item.permissionId
    }
    })    
    this.setState({permissionTreeData})      
  }

  //获取名称
  nameChange(e){ this.setState({input:Object.assign(this.state.input,{name:e.target.value})}) }
  //搜索角色
  search=()=>{this.getRoles()}
  //显示添加
  add=() => {this.setState({ visible:"visible_add"})}
   //请求导出数据
  export=()=>{ 
    const {selectedRowKeys} = this.state   
    if(!selectedRowKeys.length) message.info('请勾选数据再导出',[0.8])
    else exportSysRole(selectedRowKeys)
  }
   //显示修改
  modify=(role) => {
    this.role =role
    this.setState({visible:"visible_modify"})
    this.modifyFormRef.current.setFieldsValue({...role})
  }

   //显示删除
  delete=(role) => {
    this.role =role
    this.setState({visible:"visible_delete"})
  }
   //显示权限配置
   config=(role) => {
    this.role =role
    const {roleId} = role
    queryRoleHavePerm(roleId)
    .then(result=>{
      const havePerms = result.data.data.map(item=>{
        if(item===null) return ''
        else return item.permissionId
      })
      // console.log(`havePerms:${havePerms}`);
      this.setState({havePerms,preHavePerms:havePerms,expandedKeys:havePerms},()=>{
        this.setState({visible:"visible_config"})
      })
    })
    .catch(err=>message.info(`请求显示权限出错：${err}`))
  }

  //请求添加角色
  handleOk_add=()=>{
    this.setState({ loading: true });  
	  this.addFormRef.current.validateFields()//进行表单校验 
    .then(()=>{
      let data=this.addFormRef.current.getFieldValue()
      addSysRole(data).then(()=>{
        this.setState({ loading: false, visible:0 }); 
        this.addFormRef.current.resetFields() 
        this.getAllRole()
        this.getRoles()
        message.info('添加角色成功！',[0.5])     
        }).catch(err=>{
          message.info(`添加角色失败！错误:${err}`,[0.5])
        })     
      })
    .catch(errorInfo=> {
      this.setState({ loading: false})
      message.info(`请求出错：${errorInfo}`)
    }) 
  }

  //请求修改角色
  handleOk_modify = () => {
    this.setState({ loading: true });
    this.modifyFormRef.current.validateFields()
    .then(()=>{
      this.setState({loading:false,visible:0})
      let data=this.modifyFormRef.current.getFieldValue()
      data.birthday=this.state.birthday
      //发送修改用户请求
      modifySysRole(data).then(()=>{
        this.setState({loading:false})    
        this.addFormRef.current.resetFields() 
        this.getRoles()
        message.info('修改角色成功！',[0.5])     
        })
        .catch(err=>{
          this.setState({ loading: false})
          message.info(`修改角色失败！错误:${err}`,[3])
        })     
    })
  };

  //请求删除角色
  handleOk_delete=()=>{
    this.setState({ loading: true });
    const {roleId}=this.role
    deleteSysRole(roleId).then((result)=>{
      this.getRoles()  
      this.setState({ loading: false, visible:0});
      message.info(`${result.data.msg}`,[0.9])     
      }).catch(errorInfo=>{
        this.setState({loading: false})
        message.info(`删除用户失败！错误:${errorInfo}`,[0.9])
    })         
  }

  //请求权限配置
  handleOk_role_allocate=()=>{
    this.setState({ loading: true });
    let {roleId}=this.role
    let {addHavePerms,deletePerms,permissions}=this.state
    const root = permissions.filter(it=>it.fid==='0').map(x=>x.permissionId)
    // console.log("root",root);
    addHavePerms=addHavePerms.filter(it=>!root.includes(it))
    deletePerms=deletePerms.filter(it=>!root.includes(it))
    // console.log("add:",addHavePerms,"delete:",deletePerms);
    const data = {roleId,permIds:addHavePerms,deleteIds:deletePerms}
  
    allocateRolePermission(data)
    .then((result)=>{
      message.info(result.data.msg,[0.6])
      this.setState({loading:false,visible:0})    
    })
    .catch(err=>{
      message.info(`请求出错:${err}`)
      this.setState({loading:false,visible:0})    
      })
  }
  
  //关闭弹窗
  handleCancel=()=>{this.setState({visible:0})}

  //关闭添加用户弹窗
  handleCancel_Add () {
    this.setState({ visible:0 });  
    this.addFormRef.current.resetFields()    
  };

  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getRoles()
    this.getAllRole()
    this.getAllPermission()
  }
  render() {
    const {
      roles,
      roleTreeData,
      havePerms,
      visible,     
      loading, 
      total,
      input,
      selectedRowKeys,
      permissionTreeData
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
                  onChange={(e)=>this.nameChange(e)} 
                  value={input.name}                                  
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
          dataSource={roles}
          rowKey={role=>role.roleId}
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
        {/* 添加角色弹窗 */}
      <Modal
          width={550}
          forceRender={true}
          visible={visible==="visible_add"}
          title="添加角色"              
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
        <Form
          onFinish={this.handleOk_add}
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          ref={this.addFormRef}
        >
          <b>基本信息</b><hr/><br/>         
          <Form.Item
           label="角色名称"
           id="name"
           name="name"           
           rules={[
             {required:true,message:'请输入角色名称！'}
           ]}
          >
              <Input id="roleName" placeholder="请输入角色名称"/>
          </Form.Item>
          <Form.Item
           label="上级名称" 
           id="pid"
           name="pid"
           rules={[
             {required:true,message:'请输入上级名称！'}
           ]}
          >
              <TreeSelect 
                    id="rolePid"                   
                    style={{ width: '100%' }}                    
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={roleTreeData}
                    placeholder="请输入上级名称"
                    treeDefaultExpandAll                    
                  />
          </Form.Item>
          <Form.Item
           label="别名"
           id="description"
           name="description"
           rules={[
             {required:true,message:'请输入别名！'}
           ]}
          >
              <Input placeholder="请输入别名" />
          </Form.Item>         
          <Form.Item
           label="排序"
           id="sort"
           name="sort"           
          >
              <Input placeholder="请输入排序"/>
          </Form.Item>
          </Form>        
        </Modal>
       {/* 删除用户弹窗 */}
      <Modal 
          visible={visible==="visible_delete"}          
          title="信息"  
          onOk={this.handleOk_delete} 
          onCancel={this.handleCancel}          
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_delete}>
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
          forceRender={true}       
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
          <Form
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          onFinish={this.handleOk_modify}
          ref={this.modifyFormRef} 
        >
          <b>基本信息</b><hr/><br/>         
          <Form.Item
           label="部门名称"
           name="name"           
           rules={[
             {required:true,message:'请输入角色名称！'}
           ]}
          >
              <Input id="m_roleName" placeholder="请输入角色名称"/>
          </Form.Item>
          <Form.Item
           label="上级名称" 
           name="pid"
           rules={[
             {required:true,message:'请输入上级名称！'}
           ]}
          >
              <TreeSelect 
                    id="aRolePid"                   
                    style={{ width: '100%' }}                    
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={roleTreeData}
                    placeholder="请输入上级名称"
                    treeDefaultExpandAll                    
                  />
          </Form.Item>
          <Form.Item
           label="别名"
           name="description"  
           rules={[
            {required:true,message:'请输入上级名称！'}
          ]}       
          >
              <Input id="m_description" placeholder="请输入别名"/>
          </Form.Item>
          <Form.Item
           label="排序"
           name="sort"           
          >
              <Input id="m_sort" placeholder="请输入排序"/>
          </Form.Item>
          </Form>                
        </Modal>
         {/* 权限配置弹窗 */}
      <Modal
          visible={visible==="visible_config"}
          forceRender={true}
          title="权限配置"                
          onOk={this.handleOk_role_allocate}  
          onCancel={this.handleCancel}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_role_allocate}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
             <Tree                
                checkable
                checkStrictly={false}
                onExpand={this.onExpand}
                multiple={true}
                checkedKeys={havePerms?havePerms:['']}
                treeData={permissionTreeData}
                onCheck={this.onHavePermSelect}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
              />   
        </Modal>
      </div>
    )
  }
}
