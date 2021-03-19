import React, { Component } from 'react'
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Space
} from 'antd'
import {
  SearchOutlined,
  ReloadOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons'
 
export default class Role extends Component {
  state = {
    selectedRowKeys: [],
    card_type:undefined,
    test_time:undefined,
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
      width:200,
      align:'center'
    },   
    {
      title:'姓名',
      dataIndex:'name',
      width:200,
      align:'center'
    },    
    {
      title:'部门',
      dataIndex:'department',
      width:200,
      align:'center',
    },
    {
      title:'职位',
      dataIndex:'position',
      width:200,
      align:'center',
    },
    {
      title:'电话',
      dataIndex:'name',
      width:200,
      align:'center'
    },  
    {
      title:'创建时间',
      dataIndex:'name',
      width:200,
      align:'center'
    },  
    {
      title:'操作',
      dataIndex:'name',
      width:200,
      align:'center',
      render:(text,record) => (
        <Space >
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
            <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
            <Button size="small" style={{color:'white',background:'#1E9FFF'}} onClick={()=>{this.delete(record)}}>权限配置</Button>
        </Space>
      ),
    },
  ];

  render() {
    const { selectedRowKeys } = this.state;
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
    return (
      <div style={{height:'100%'}}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={4}>
                <Input 
                  placeholder="角色名称"
                  onChange={this.typeChange}
                  value={this.state.card_type}                  
                >              
                </Input>
            </Col>            
            <Col>
                <Button 
                  type="primary"
                  icon={<ReloadOutlined/> }                  
                  onClick={this.reset}
                >
                 添加
                </Button>
            </Col>
            <Col>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}                  
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"                                
                  onClick={this.reset}
                  icon={<CloudDownloadOutlined/>}    
                >
                  导出
                </Button>
            </Col>
            </Row>         
        </div>
        {/* 表格 */}
        <Table 
          columns={this.columns}
          rowSelection={rowSelection}
          dataSource={data}
          bordered={true}
          style={{margin:'20px 0'}}
          pagination={ this.state.paginationProps}
          onChange={this.handTablechange}
        />
      </div>
    )
  }
}
