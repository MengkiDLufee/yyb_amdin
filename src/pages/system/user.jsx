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
  message,
  Modal,
  Card
} from 'antd'
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  DownOutlined 
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Form from 'antd/lib/form/Form';
const { RangePicker } = DatePicker;
 
export default class User extends Component {
    
  state = {
    selectedRowKeys: [],
    visible_add:false, 
    visible_modify:false,  
    visible_delete:false,  
    visible_role_assign:false,
    visible_reset:false,
    loading:false,    
    paginationProps : {//分页栏参数    
      showQuickJumper:true,
      showSizeChanger:true,
    },
  }

  onSelectChange = selectedRowKeys => {    
    this.setState({ selectedRowKeys });
  };

//列表名称
  columns =[
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
      dataIndex:'department',      
      align:'center',
    },
    {
      title:'职位',
      dataIndex:'position',      
      align:'center',
    },
    {
      title:'电话',
      dataIndex:'name',      
      align:'center'
    },  
    {
      title:'创建时间',
      dataIndex:'name',      
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

  handleOk_role_assign = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible_role_assign: false });
    }, 300);
  };

  handleCancel_role_assign = () => {
    this.setState({ visible_role_assign: false });
  };


  handleOk_reset = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible_reset: false });
    }, 300);
  };

  handleCancel_reset = () => {
    this.setState({ visible_reset: false });
  };

  handleOk_delete = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible_delete: false });
    }, 300);
  };

  handleCancel_delete = () => {
    this.setState({ visible_delete: false });
  };

  handleOk_modify = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible_modify: false });
    }, 300);
  };

  handleCancel_modify = () => {
    this.setState({ visible_modify: false });
  };

  handleOk_add = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible_add: false });
    }, 300);
  };

  handleCancel_add = () => {
    this.setState({ visible_add: false });
  };

//搜索用户
search=()=>{
  message.info('搜索用户')
}

//添加用户
  add =() =>{    
    this.setState({
      visible_add: true,
    });
  };

//导出数据
  export=()=>{
    message.info('导出数据')
  }

//修改用户信息
  modify=()=>{
    this.setState({
      visible_modify:true,      
    })
  }

  //删除用户
  delete=()=>{
    this.setState({
      visible_delete:true,      
    })
  }

  //分配角色
  role_assign=()=>{
    this.setState({
      visible_role_assign:true,      
    })
  }

  //重置密码
  reset=()=>{
    this.setState({
      visible_reset:true,      
    })
  }

  //冻结用户
  freeze=(checked,dataIndex)=>{    
    if(checked){
      message.info('解除冻结用户成功！')
      checked=true
    }else{
      message.info('冻结用户成功！')
      checked=false      
    }
  }

  render() {
    const {visible_add,
           visible_modify,
           visible_delete,
           visible_role_assign,
           visible_reset,
           loading,
           selectedRowKeys
          }=this.state
    
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };  
    //主页面表格数据
    const data = [
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    
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
            {/* 表格页面主体 */}
          <Col span={20}>
           {/* 搜索栏 */}
           <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={4}>
                <Input 
                  placeholder="账号/姓名/电话"
                  onChange={this.typeChange}
                  value={this.state.card_type}
                  className="input2"
                >              
                </Input>
            </Col>
            <Col span={5}>
                <RangePicker 
                  locale={locale}
                  showTime                        
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
             dataSource={data}
             bordered={true}
             style={{margin:'20px 0',borderBottom:'1px,soild'}}
             pagination={ this.state.paginationProps}
             onChange={this.handTablechange}
             rowSelection={rowSelection}     
           />    
          </Col>
        </Row>
      {/* 弹窗模块 */}
      {/* 修改用户弹窗 */}
      <Modal
          visible={visible_modify}
          title="编辑用户"          
          onOk={this.handleOk_modify}
          onCancel={this.handleCancel_modify}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_modify}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel_modify}>
            取消
          </Button>,
          ]}
        >
          <p>用户信息</p>         
        </Modal>
        {/* 添加用户弹窗 */}
      <Modal
          width={900}
          visible={visible_add}
          title="添加用户"          
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
          visible={visible_delete}
          title="信息"          
          onOk={this.handleOk_delete}
          onCancel={this.handleCancel_delete}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_delete}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel_delete}>
            取消
          </Button>,
          ]}
        >
          <p>是否删除用户</p>         
        </Modal>
        {/* 分配角色弹窗 */}
      <Modal
          visible={visible_role_assign}
          title="信息"          
          onOk={this.handleOk_role_assign}
          onCancel={this.handleCancel_role_assign}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_role_assign}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel_role_assign}>
            取消
          </Button>,
          ]}
        >
          <p>分配角色</p>         
        </Modal>
        {/* 重置密码弹窗 */}
      <Modal
          visible={visible_reset}
          title="信息"          
          onOk={this.handleOk_reset}
          onCancel={this.handleCancel_reset}
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk_reset}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel_reset}>
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
