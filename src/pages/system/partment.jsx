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
  Card,
} from 'antd'
import {
  SearchOutlined,  
  ExportOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons'

//主页面表格数据
const data = [
  {        
    key: '0',
    name: '总公司',
    fullName: '总公司',
    order: 1,   
  },
  {
    key: '1',
    name: '开发部',
    fullName: '开发部',
    order: 2,
  },
  {    
    key: '2',    
    name: '客服部',
    fullName: '客服部',
    order: 3,
  },
  {
    key: '3',
    name: '销售部',
    fullName: '销售部',
    order: 4,    
  },
  {   
    key: '4',     
    name: '质检',
    fullName: '质检',
    order: 5,
  },
  {
    key: '5',
    name: '生产部',
    fullName: '生产部',
    order: 6,
  },  
];

export default class Partment extends Component {
  constructor(props){
    super(props)
    this.state = {
      departments:[],
      visible:"0",
      departmentName:'',
      departmentId:'',
      selectedRowKeys: [],    
      paginationProps : {//分页栏参数    
        showQuickJumper:true,
        showSizeChanger:true,
      },
    }
  }
 
 //表格行选择
 onSelectChange = row => {
  console.log('所选择行',row)
  //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
  this.setState(
    {selectedRowKeys:row}
  )
};
  //选择框
  selectChange =(e,Option) => {
    console.log(e)
    console.log(Option)
    this.setState({
      input:Object.assign(this.state.input,{[Option.title]:e})
    })
  }    

  //获取列表数据
  getDepartments=(departmentName)=>{
      this.setState({loading:true})
      departmentName=departmentName||this.state.departmentName
      //const result = await reqRoles(roleName)
      const result = setTimeout(()=>data,1000)
      this.setState({loading:false})    
      console.log("获取部门列表数据");  
      const departments = result         
      this.setState({departments})
  }
//初始化列表
initColumns=()=>{
 this.columns =[
    {
      title:'部门名称',
      dataIndex:'name',
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
      dataIndex:'order',
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
      title:'操作',
      dataIndex:'option',
      width:200,
      align:'center',
      render:(department) => (
        <Space >
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(department)}}>修改</Button>
            <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(department)}}>删除</Button>            
        </Space>
      ),
    },
  ];
}
 //显示搜索
 search=() => {     
  console.log(`搜索`);
  message.info('搜索角色')
}
//显示添加
add=() => {   
  // 更新状态
  console.log(`添加用户`);
  this.setState({
    visible:"visible_add"
  })
}
//显示添加
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
  this.getDepartments()
}
  render() {    
    const { selectedRowKeys,loading,visible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };  

    //树形控件列表
    const treeData = [
      {
        title: '顶级',
        key: '0-0',      
        children: [
          {
            title: '总公司',
            key: '0-0-0', 
            children:[
              {
                title: '开发部',
                key: '0-0-1',         
              },
              {
                title: '客服部',
                key: '0-0-2',         
              },
              {
                title: '销售部',
                key: '0-0-3',         
              },
              {
                title: '生产部',
                key: '0-0-4',         
              },
              {
                title: '质检',
                key: '0-0-5',         
              },
            ]        
          },      
        ],
      },
      ];
    return (
      <div style={{height:'100%'}}>
        <Row>
            {/* 树形控件 */}
          <Col span={4}>           
          <Tree
            showIcon
            defaultExpandAll
            defaultSelectedKeys={['0-0-0']}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
          />
          </Col>
        {/* 右边表格主体 */}
        <Col span={20}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
          <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={3}>
                <Input 
                  placeholder="部门名称"                  
                  className="input2"
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
          dataSource={data}
          bordered={true}
          style={{margin:'20px 0'}}
          pagination={ this.state.paginationProps}  
          rowSelection={rowSelection}        
        />
        </Col>     
        </Row>
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
          <p>是否删除角色</p>         
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
      </div> 
       
    )
  }
}
