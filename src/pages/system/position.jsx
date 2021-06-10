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
  Switch
} from 'antd'
import {
  SearchOutlined, 
  PlusOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import {
  queryPosition,
  addPosition,
  modifyPosition,
  deleteSysPosition,
  exportSysPosition
} from '../../api/sysManageIndex' 
export default class Position extends Component {

  constructor(props){
    super(props)
    this.state = {
      positions:[],
      name:"",
      positionId:'0',
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      visible:'0',     
      loading:false,
      selectedRowKeys: [],      
      paginationProps : {//分页栏参数    
        showQuickJumper:true,
        showSizeChanger:true,
      }        
    }
    this.addFormRef = React.createRef()
    this.modifyFormRef = React.createRef()     
  }  
  //初始化列表
  initColumns=()=>{
  this.columns = [
    {
      title:'职位名称',
      dataIndex:'name',
      width:200,
      align:'center'
    },    
    {
      title:'职位编码',
      dataIndex:'code',
      width:200,
      align:'center',
    },
    {
      title:'备注',
      dataIndex:'remark',
      width:200,
      align:'center',
    },  
    {
      title:'创建时间',
      dataIndex:'creatTime',
      width:200,
      align:'center',
    },  
    {
      title:'更新时间',
      dataIndex:'updateTime',
      width:200,
      align:'center',
    },
    {
      title:'状态',      
      dataIndex:'status',      
      align:'center',
      render:(o,position)=>(   
        <div>
          <Switch checkedChildren="正常" 
                  unCheckedChildren="冻结"
                  checked={position.status==="ENABLE"?1:0}
                  onChange={(checked)=>this.onChange(checked,position)}
                  />  
        </div>    
      )      
    },  
      {
        title: '操作', 
        width:300,   
        align:'center'  ,      
        render:(position)=>(         
          <Space >            
          <Button  size="small" style={{color:'black',background:'white'}} onClick={()=>this.modify(position)}>修改</Button>
          <Button  size="small" style={{color:'white',background:'#ff5621',border:'none'}} onClick={()=>this.delete(position)}>删除</Button>
         </Space>
        )
      },
    ];
  }

  //表格行选择
  onSelectChange = row => this.setState({selectedRowKeys:row})

  //获取列表数据
  getPositions=()=>{
    this.setState({loading:true}) 
    const {current,pageSize,name}=this.state; 
    let inputData={page:current, pageSize,}  
    if(name!=="") inputData["name"]= name
    queryPosition(inputData)
    .then((result)=>{
      this.setState({loading:false})    
      const data = result.data.data  
      const positions=data.info 
      for(const position of positions) position.key=position.positionId
      this.setState({positions,total:data.total})
    })
    .catch(err=>message.info(`错误：${err}`)) 
  }

  //获取名字
  nameChange(e){ this.setState({name:e.target.value})}

  //显示搜索
  search=() => this.getPositions() 

  //显示添加
  add=() => this.setState({visible:"visible_add"})

  //请求导出数据
  export=()=>{ 
    const {selectedRowKeys} = this.state   
    if(!selectedRowKeys.length) message.info('请勾选数据再导出',[0.8])
    else exportSysPosition(selectedRowKeys)
  }

   //显示修改
  modify=(position) => {
    this.position =position
    this.setState({visible:"visible_modify"})
    this.modifyFormRef.current.setFieldsValue({...position})
  }

   //显示删除
  delete=(position) => {
    this.position =position
    this.setState({visible:"visible_delete"})
  }

  //关闭弹窗
  handleCancel=()=>this.setState({visible:0})

  //改变用户状态
 onChange=async(checked,position)=>{   
  let that=this
  if(position.positionId==='1'){
    message.info('不能冻结超级管理员！')
    return null
  }
  else{
     function print(){
       that.getPositions()
      }   
     function res(){
       message.info(`${msg}`)
      }  
     const status=checked?'ENABLE':'DISABLE'
     const msg=checked?'解除冻结成功！':'冻结成功！'
     const {positionId} = position
     const data={positionId,status}
     let result=await modifyPosition(data)
     await print(result)
     await res()
     }
   }
  //请求修改职位
  handleOk_modify = () => {
    this.setState({ loading: true });
    this.modifyFormRef.current.validateFields()
    .then(()=>{
      let data=this.modifyFormRef.current.getFieldValue()
      data.birthday=this.state.birthday
      modifyPosition(data)
      .then(()=>{
        this.setState({loading:false,visible:0})
        this.addFormRef.current.resetFields() 
        this.getPositions()
        message.info('修改职位成功！',[0.5])     
      })
      .catch(err=>message.info(`修改职位失败！错误:${err}`,[0.5]))     
    })
    .catch(errorInfo=> {
      this.setState({ loading: false})
      message.info(`错误:${errorInfo}`)
  }) 
  };

  //请求添加职位
  handleOk_add = () => {
    this.setState({ loading: true });  
	  this.addFormRef.current.validateFields()//进行表单校验 
    .then(()=>{
      let data={...this.addFormRef.current.getFieldValue(),status:"ENABLE"}
      addPosition(data)
      .then(()=>{
        this.setState({loading:false,visible:0})
        this.addFormRef.current.resetFields() 
        this.getPositions()
        message.info('添加职位成功！',[0.5])     
      })
      .catch(err=>message.info(`添加职位失败！错误:${err}`,[0.5]))     
    })
    .catch(errorInfo=> {
      this.setState({ loading: false})
      message.info(`错误:${errorInfo}`)
  }) 
};
//请求删除职位
handleOk_delete=()=>{
  this.setState({ loading: true });
  const {positionId}=this.position
  deleteSysPosition(positionId)
  .then((result)=>{
    this.getPositions()   
    this.setState({ loading: false, visible:0});
    message.info(`${result.data.msg}`,[0.9])     
    })
  .catch(err=> message.info(`删除职位失败！错误:${err}`,[0.9]))          
}

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getPositions()
  }
  
  render() {
    const {
      positions,
      name,
      visible,     
      loading,   
      selectedRowKeys   
     }=this.state       
    const position = this.position || {}//如果还没有，指定一个空对象
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
                  placeholder="职位名称"
                  onChange={(e)=>this.nameChange(e)}   
                  value={name}                                 
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
          dataSource={positions}
          bordered={true}
          rowSelection={rowSelection}
          style={{margin:'20px 0'}}
          pagination={ this.state.paginationProps}          
        />
        {/* 添加职位弹窗 */}
      <Modal
          width={550}
          forceRender={true}
          visible={visible==="visible_add"}
          title="添加职位"              
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
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          ref={this.addFormRef}
        >
          <b>基本信息</b><hr/><br/>         
          <Form.Item
           label="职位名称"
           id="name_a"
           name="name"           
           rules={[
             {required:true,message:'请输入职位名称！'}
           ]}
          >
              <Input id="m_name" placeholder="请输入职位名称"/>
          </Form.Item>
          <Form.Item
           label="职位编码" 
           id="code_a"
           name="code"
           rules={[
             {required:true,message:'请输入职位编码！'}
           ]}
          >
              <Input id="m_code" placeholder="请输入职位编码"/>
          </Form.Item>
          <Form.Item
           label="顺序"
           name="sort"
           id="sort_a"
           rules={[
             {required:true,message:'请输入顺序！'}
           ]}
          >
              <Input id="m_order" placeholder="请输入顺序" />
          </Form.Item>         
          <Form.Item
           label="备注"
           id="remark_a"
           name="remark"           
          >
              <Input id="m_remark" placeholder="请输入备注"/>
          </Form.Item>
          </Form>        
        </Modal>
       {/* 删除职位弹窗 */}
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
          <p>是否删除职位{position.name}</p>         
      </Modal>
        {/* 修改职位弹窗 */}
        <Modal
          width={550}
          forceRender={true}
          visible={visible==="visible_modify"}
          title="修改职位"              
          onOk={this.handleOk_add}
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
          labelCol={{ span: 7}}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          ref={this.modifyFormRef}
        >
          <b>基本信息</b><hr/><br/>         
          <Form.Item
           label="职位名称"
           id="name_m"
           name="name"           
           rules={[
             {required:true,message:'请输入职位名称！'}
           ]}
          >
              <Input id="name" placeholder="请输入职位名称"/>
          </Form.Item>
          <Form.Item
           label="职位编码" 
           id="sort_m"
           name="code"
           rules={[
             {required:true,message:'请输入职位编码！'}
           ]}
          >
              <Input id="code" placeholder="请输入职位编码"/>
          </Form.Item>
          <Form.Item
           label="顺序"
           id="sort_m"
           name="sort"
           rules={[
             {required:true,message:'请输入顺序！'}
           ]}
          >
              <Input id="order" placeholder="请输入顺序" />
          </Form.Item>         
          <Form.Item
           label="备注"
           id="remark_m"
           name="remark"           
          >
              <Input id="remark" placeholder="请输入备注"/>
          </Form.Item>
          </Form>        
        </Modal>
      </div>
    )
  }
}
