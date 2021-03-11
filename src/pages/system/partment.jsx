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
  ReloadOutlined,
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;

 //主页面表格数据
 const data = [];
 
export default class Partment extends Component {

  state = {
    card_type:undefined,
    test_time:undefined,
    paginationProps : {//分页栏参数    
      showQuickJumper:true,
      showSizeChanger:true,
    },
  }
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
  ];

  render() {
    return (
      <div style={{height:'100%'}}>
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
            <Col span={6}>
                <RangePicker 
                  locale={locale}
                  showTime                        
                />
            </Col>
            <Col span={3}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="button3"
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col span={3}>
                <Button 
                  type="primary"
                  icon={<ReloadOutlined/> }
                  className="button3"
                  onClick={this.reset}
                >
                  重置
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
        />
      </div>
    )
  }
}
