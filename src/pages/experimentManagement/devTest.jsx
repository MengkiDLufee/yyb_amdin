import React, { Component } from 'react'
import {
  Table,
  Select,
  DatePicker,
  Button,
  Image
} from 'antd'
import {
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import './index.less'

const {Option} = Select;

 //主页面表格数据
 const data = [];
 for (let i = 0; i < 46; i++) {
   if(i%2 !== 0)
   {data.push({
     key: i,
     test_time: `2019-11-11`,
     type: 0,
     dev_num:`D_${i}`,
     batch_num: `B_${i}`,
     num:`${i}`,
     GOD:`1.11`,
     C_GOD :`0.33 `,
     test_img:'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
   });} else {
     data.push({
      key: i,
      test_time: `2019-12-12`,
      type: 1,
      dev_num:`D_${i}`,
      batch_num: `B_${i}`,
      num:`${i}`,
      GOD:`1.11`,
      C_GOD :`0.33 `,
      test_img:'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
    });
   }
 }

export default class DevTest extends Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    card_type:undefined,
    test_time:undefined,
    paginationProps : {//分页栏参数
      position: ['bottomLeft'] ,
      total:'data.length',
      showTotal:total => `共 ${total} 条`,
      showQuickJumper:true,
      showSizeChanger:true,
    },
  }

  columns =[
    {
      title:'测试时间',
      dataIndex:'test_time',
      width:200,
      align:'center'
    },
    {
      title:'测试卡类型',
      dataIndex:'type',
      width:200,
      align:'center',
      render : type => {
        return( type === 0 ? '标准卡' : '测试卡')
      }
    },
    {
      title:'设备号',
      dataIndex:'dev_num',
      width:200,
      align:'center'
    },
    {
      title:'批号',
      dataIndex:'batch_num',
      width:200,
      align:'center'
    },
    {
      title:'数值',
      dataIndex:'num',
      width:200,
      align:'center'
    },
    {
      title:'GOD',
      dataIndex:'GOD',
      width:200,
      align:'center'
    },
    {
      title:'C线GOD',
      dataIndex:'C_GOD',
      width:200,
      align:'center'
    },
    {
      title:'设备测试图片',
      dataIndex:'test_img',
      width:200,
      align:'center',
      render: (text) => <Image src={text} height="50px " width="50px" />
    }
  ];

  //选择试剂卡类型
  typeChange = (e) => {
    console.log(e)
    this.setState({
      card_type:e,
    })
  }
  //选择时间
  tiemChange = (date,string) => {
    console.log(date,string)
    this.setState({
      test_time:date,
    })
  }
  //sos
  search = () => {
    console.log('Search')
    console.log(this.state.card_type,moment(this.state.test_time,'YYYY/MM/DD').format('YYYY/MM/DD'))
  }
  //重置
  reset = () => {
    console.log('reset')
    this.setState({
      card_type:undefined,
      test_time:undefined
    })
  }

  //表格翻页
  handTablechange = (pagination) =>{
    Object.assign(this.state.paginationProps,{
     pageSize:pagination.pageSize,
     current:pagination.current
   })
   console.log(this.state.paginationProps);
   let params = {};
   params.current = pagination.current;
   params.pageSize = pagination.pageSize;
   console.log(params)
 };

  render() {
    return (
      <div style={{height:'100%'}}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
          <div justify="space-between" style={{display:"flex" }} >
            <Select 
              placeholder="请选择试剂卡类型"
              onChange={this.typeChange}
              value={this.state.card_type}
              className="input2"
            >
              <Option title="type" value="0">标准卡</Option>
              <Option title="type" value="1">测试卡</Option>
            </Select>

            <DatePicker 
              onChange={this.tiemChange}
              format='MM/DD/YYYY'//指定日期显示样式
              className="input2"
              placeholder="测试时间"
              value={this.state.test_time}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="button3"
              onClick={this.search}
            >
              搜索
            </Button>
            <Button 
              type="primary"
              icon={<ReloadOutlined/> }
              className="button3"
              onClick={this.reset}
            >
              重置
            </Button>
          </div>
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
