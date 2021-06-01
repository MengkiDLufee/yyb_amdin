import React, { Component } from 'react'
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Space,
  Tree,
  message,
  Modal,
  Form,
  TreeSelect
} from 'antd'
import {
  SearchOutlined,  
  ExportOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { 
  queryAlldept,
  querySysDept, 
  addSysDept,
  modifySysDept,
  deleteSysDept,
  exportSysDept,
} from '../../api/sysManageIndex';
export default class Partment extends Component {
  constructor(props){
    super(props)
    this.state = {
      depts:[],//部门
      visible:"0",
      selectedRowKeys: [],//选择行
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      treeData:[], 
      input:{
        deptId:'',//搜索参数部门id
        simpleName:'',//搜索框参数：部门名称
      }   
    }
    this.addFormRef = React.createRef()
    this.modifyFormRef = React.createRef()
  }
 // 获取所有部门
getAllDepts=()=>{  
  this.setState({loading:true})   
  queryAlldept()
  .then((result)=>{
    this.setState({loading:false})    
    const depts = result.data.data   
    for(const dept of depts) dept.key=dept.deptId
    this.setState({depts},()=>this.getTreeData())
  })
}

//获得树形结构
 getTreeData=()=>{
  const{depts}=this.state 
  const tree=depts.filter(item=>{return item.pid==="0"})
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
  this.setState({treeData})
} 
 //表格行选择
 onSelectChange = row => this.setState({selectedRowKeys:row})

//选中部门
onSelect = (keys) => { 
  let key=keys[0]
  if(key==='0'||key==='24'){key=''}  
  this.setState({
    input:Object.assign(this.state.input,{deptId:key})
   },()=>{this.getDepts()}) 
};

//获取名字
nameChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{simpleName:e.target.value}),
  })
}

// 获取部门数据
getDepts=()=>{  
  this.setState({loading:true}) 
  const {current,pageSize,input }=this.state
  let inputData={page:current, pageSize}
  for(let item of Object.entries(input)){ 
    if(item[1]!=="") 
    inputData[item[0]]=item[1]
  } 
  querySysDept(inputData)
  .then((result)=>{
    this.setState({loading:false})    
    const data=result.data.data  
    const depts=data.info 
    for(const dept of depts) dept.key=dept.deptId
    this.setState({depts,total:data.total})
  })
  .catch(err=>message.info(`错误${err}`))   
}

//初始化列表
initColumns=()=>{
 this.columns =[
    {
      title:'部门名称',
      dataIndex:'simpleName',
      width:200,
      align:'center'
    },   
    {
      title:'部门全称',
      dataIndex:'fullName',
      width:200,
      align:'center'
    },    
    {
      title:'排序',
      dataIndex:'sort',
      width:200,
      align:'center',
    },
    {
      title:'备注',
      dataIndex:'description',
      width:200,
      align:'center',
    },    
    {
      title:'操作',
      dataIndex:'option',
      width:200,
      align:'center',
      render:(text,dept) => (
        <Space >
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(dept)}}>修改</Button>
            <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(dept)}}>删除</Button>            
        </Space>
      ),
    },
  ];
}
 //显示搜索
 search=() => this.getDepts() 

//显示添加
add=() => this.setState({visible:"visible_add"})


 //修改部门信息
modify=(dept) => {
  this.dept = dept
  this.setState({ visible:"visible_modify" })
  this.modifyFormRef.current.setFieldsValue({...dept})
}

   //显示删除
  delete=(dept) => {
    this.dept = dept
    this.setState({visible:"visible_delete"})
  }

//关闭弹窗
handleCancel=()=>this.setState({visible:0})

//关闭添加用户弹窗，清空表单
handleCancel_add=()=>{    
  this.setState({visible:0})
  this.addFormRef.current.resetFields()   
}
//请求添加部门
  handleOk_add = () => {
    this.setState({ loading: true });  
	  this.addFormRef.current.validateFields()//进行表单校验 
    .then(()=>{
      this.setState({ loading: false, visible:0 });
      let data=this.addFormRef.current.getFieldValue()
      addSysDept(data)
      .then(()=>{
        this.setState({loading:false})    
        this.addFormRef.current.resetFields() 
        this.getDepts()
        this.getAllDepts()
        message.info('添加部门成功！',[0.5])     
        })
      .catch(err=>{
          message.info(`添加部门失败！错误:${err}`,[0.5])
        })     
    })
    .catch(errorInfo=> {
      this.setState({ loading: false})
      message.info(`错误：${errorInfo}`)
  }) 
};
//请求修改部门
handleOk_modify = () => {
  this.setState({ loading: true });
  this.modifyFormRef.current.validateFields()
  .then(()=>{
    this.setState({loading:false,visible:0})
    let data={...this.modifyFormRef.current.getFieldValue()}
    data.deptId=this.dept.deptId
    modifySysDept(data)
    .then(()=>{
      this.setState({loading:false})    
      this.getDepts()
      this.getAllDepts()
      message.info('修改部门成功！',[0.5])     
      })
    .catch(err=>message.info(`修改部门失败！错误:${err}`,[0.5]))     
  })
  .catch(errorInfo=> {
    this.setState({ loading: false})
    message.info(`请求出错：${errorInfo}`)
}) 
};
//请求删除部门
handleOk_delete=()=>{
  this.setState({ loading: true });
  const {deptId}=this.dept
  deleteSysDept(deptId)
  .then((result)=>{
    this.setState({loading:false})    
    this.getDepts() 
    this.getAllDepts()
    this.setState({ loading: false, visible:0});  
    message.info(`${result.data.msg}`,[0.9])     
    })
  .catch(err=>message.info(`删除用户失败！错误:${err}`,[0.9]))     
}
//请求导出数据
export=()=>{ 
  const {selectedRowKeys} = this.state   
  if(!selectedRowKeys.length) message.info('请勾选数据再导出',[0.8])
  else exportSysDept(selectedRowKeys)
}

componentWillMount(){
    this.initColumns()
    this.getAllDepts()
}
componentDidMount(){
  this.getDepts()
}
  render() {    
    const { 
      selectedRowKeys,
      loading,
      visible,
      total,
      treeData,
      depts,
      simpleName 
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };  
    const dept=this.dept||{}

    return (
      <div style={{height:'100%'}}>
        <Row>
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
        {/* 右边表格主体 */}
        <Col span={20}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
          <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={3}>
                <Input 
                  placeholder="部门名称" 
                  onChange={(e)=>this.nameChange(e)}                 
                  value={simpleName}  
                >              
                </Input>
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
          dataSource={depts}
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
          {/* 添加部门弹窗 */}
      <Modal
          width={900}
          height={1200}
          visible={visible==="visible_add"}
          title="添加部门"          
          onOk={this.handleOk_add}
          onCancel={this.handleCancel_add}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_add}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel_add}>
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
           label="部门名称"
           id="simpleName"
           name="simpleName"           
           rules={[
             {required:true,message:'请输入部门名称！'}
           ]}
          >
              <Input placeholder="请输入部门名称"/>
          </Form.Item>
          <Form.Item
           label="上级名称" 
           id="modify_name"
           name="pid"
           rules={[
             {required:true,message:'请输入上级名称！'}
           ]}
          >
            {this.state.treeData.length ? (
              <TreeSelect    
              listHeight={1200}            
              style={{ width: '100%' }}                    
              dropdownStyle={{ maxHeight: 800 }}
              treeData={treeData}
              treeDefaultExpandAll      
              placeholder="请输入上级名称"
              />             
            ) : ('loading tree')
          }     
              
          </Form.Item>
          <Form.Item
           label="部门全称"
           id="fullName"
           name="fullName"
           rules={[
             {required:true,message:'请输入部门全称！'}
           ]}
          >
              <Input placeholder="请输入部门全称"/>
          </Form.Item>         
          <Form.Item
           label="备注"
           id="description"
           name="description"           
          >
            
              <Input placeholder="请输入备注"/>
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
       {/* 删除部门弹窗 */}
      <Modal 
          visible={visible==="visible_delete"}          
          title="信息"    
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
          <p>是否删除{dept.simpleName}</p>         
        </Modal>
        {/* 修改部门弹窗 */}
        <Modal
          width={900}
          forceRender={true}
          visible={visible==="visible_modify"}
          title="编辑部门"          
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
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          ref={this.modifyFormRef}
        >
          <b>基本信息</b><hr/><br/>         
          <Form.Item
           label="部门名称"
           name="simpleName"           
           rules={[
             {required:true,message:'请输入部门名称！'}
           ]}
          >
              <Input placeholder="请输入部门名称"/>
          </Form.Item>
          <Form.Item
           label="上级名称" 
           name="pid"
           rules={[
             {required:true,message:'请输入上级名称！'}
           ]}
          >
              <TreeSelect   
                    listHeight={1200}                 
                    style={{ width: '100%' }}                    
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="请输入上级名称"
                    treeDefaultExpandAll                    
                  />
          </Form.Item>
          <Form.Item
           label="部门全称"
           name="fullName"
           rules={[
             {required:true,message:'请输入部门全称！'}
           ]}
          >
              <Input placeholder="请输入部门全称" />
          </Form.Item>         
          <Form.Item
           label="备注"
           name="description"           
          >
              <Input placeholder="请输入备注"/>
          </Form.Item>
          <Form.Item
           label="排序"
           name="sort"           
          >
              <Input placeholder="请输入排序"/>
          </Form.Item>
          </Form>                         
        </Modal>
      </div> 
       
    )
  }
}
