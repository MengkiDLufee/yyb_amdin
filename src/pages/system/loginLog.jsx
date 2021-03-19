import React, { Component } from 'react'
import {
  Table,
  DatePicker,
  Button,
  Input,
  Row,
  Col,
} from 'antd'
import {
  SearchOutlined,  
  DeleteOutlined
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
 
export default class LoginLog extends Component {

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
      title:'日志名称',
      dataIndex:'account',      
      align:'center'
    },   
    {
      title:'用户名称',
      dataIndex:'name',      
      align:'center'
    },    
    {
      title:'时间',
      dataIndex:'department',      
      align:'center',
    },
    {
      title:'具体消息',
      dataIndex:'position',      
      align:'center',
    },
    {
      title:'ip',
      dataIndex:'name',      
      align:'center'
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
                <RangePicker 
                  locale={locale}
                  showTime                        
                />
            </Col>
            <Col>
                <Input 
                  placeholder="日志名称"
                  onChange={this.typeChange}
                  value={this.state.card_type}                  
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
          style={{margin:'20px 0',borderBottom:'1px,soild'}}
          pagination={ this.state.paginationProps}
          onChange={this.handTablechange}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}
