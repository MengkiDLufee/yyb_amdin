import React, { Component } from 'react'
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Space,
  Tree,
} from 'antd'
import {
  SearchOutlined,  
  ExportOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons'

export default class Partment extends Component {

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
      title:'部门名称',
      dataIndex:'account',
      width:200,
      align:'center'
    },   
    {
      title:'部门全称',
      dataIndex:'name',
      width:200,
      align:'center'
    },    
    {
      title:'排序',
      dataIndex:'department',
      width:200,
      align:'center',
    },
    {
      title:'备注',
      dataIndex:'position',
      width:200,
      align:'center',
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
        department: '西湖区湖底',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底',
      },
      {        
        name: '胡彦斌',
        account: 32,
        department: '西湖区湖底',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底',
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
        {/* 右边表格主体 */}
        <Col span={20}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
          <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
            <Col span={3}>
                <Input 
                  placeholder="部门名称"
                  onChange={this.typeChange}
                  value={this.state.card_type}
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
                  onClick={this.reset}
                >
                  添加
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"                                
                  onClick={this.reset}
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
      </div> 
       
    )
  }
}
