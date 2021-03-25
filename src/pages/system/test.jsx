import React, { Component } from 'react'
import {
  Table,
  DatePicker,
  Button,
  Input,
  Row,
  Col,
  Space
} from 'antd'
import {
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
 
export default class WorkLog extends Component {

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
      title:'日志类型',
      dataIndex:'account',
      width:200,
      align:'center'
    },   
    {
      title:'日志名称',
      dataIndex:'name',
      width:200,
      align:'center'
    },    
    {
      title:'用户名称',
      dataIndex:'department',
      width:200,
      align:'center',
    },
    {
      title:'类名',
      dataIndex:'position',
      width:200,
      align:'center',
    },
    {
      title:'方法名',
      dataIndex:'name',
      width:200,
      align:'center'
    },  
    {
      title:'时间',
      dataIndex:'name',
      width:200,
      align:'center'
    },  
    {
      title:'具体消息',
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
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>查看详情</Button>           
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
      key: '7',
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
      key: '1',
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
      key: '22',
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
            <Col>
                <RangePicker 
                  locale={locale}                                        
                />
            </Col>
            <Col>
                <Input 
                  placeholder="日志名称"
                  onChange={this.typeChange}
                  value={this.state.card_type}
                  className="input2"
                >              
                </Input>
            </Col>
            <Col>
                <Input 
                  placeholder="类型"
                  onChange={this.typeChange}
                  value={this.state.card_type}
                  className="input2"
                >              
                </Input>
            </Col>
            <Col span>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="button3"
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col span>
                <Button 
                  type="primary"
                  icon={<DeleteOutlined/> }
                  className="button3"
                  onClick={this.reset}
                >
                  清空日志
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
          onChange={this.handTablechange}
          rowSelection={rowSelection}  
        />
      </div>
    )
  }
}
