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
import { expDevTest } from "../../api";

import './index.less'

const {Option} = Select;
const { RangePicker } = DatePicker

const columns =[
  {
    title:'测试时间',
    dataIndex:'testTime',
    width:200,
    align:'center'
  },
  {
    title:'测试卡类型',
    dataIndex:'paperType',
    width:200,
    align:'center',
    render : type => {
      return( type === 'standard_card' ? '标准卡' : '测试卡')
    }
  },
  {
    title:'设备号',
    dataIndex:'deviceNo',
    width:200,
    align:'center'
  },
  {
    title:'批号',
    dataIndex:'bathNumber',
    width:200,
    align:'center'
  },
  {
    title:'数值',
    dataIndex:'value',
    width:200,
    align:'center'
  },
  {
    title:'GOD',
    dataIndex:'tgod',
    width:200,
    align:'center'
  },
  {
    title:'C线GOD',
    dataIndex:'cgod',
    width:200,
    align:'center'
  },
  {
    title:'设备测试图片',
    dataIndex:'devicePicPathAli',
    width:200,
    align:'center',
    render: (text) => <Image src={text} height="50px " width="50px" />
  }
];

function transformData(data) {
  if (!data) {
    return []
  }
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].deviceTestDataId;
    newItem.testTime = data[i].testTime;
    newItem.paperType = data[i].paperType;
    newItem.deviceNo = data[i].deviceNo;
    newItem.bathNumber = data[i].bathNumber;
    newItem.value = data[i].value;
    newItem.tgod = data[i].tgod;
    newItem.cgod = data[i].cgod;
    newItem.devicePicPathAli = data[i].devicePicPathAli;
    newData.push(newItem);
  }
  return newData;
}

export default class DevTest extends Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    data: [],
    total: '',
    current: 1,
    pageSize: 10,
    card_type:undefined,
    test_time:undefined,
    time:[]
    
  }
  loadData = (params) => {
    expDevTest(params).then(res => {
      console.log(res);
      let data = transformData(res.data.data?res.data.data.info:[])
      this.setState({
        data,
        current: params.page,
        pageSize: params.pageSize,
        total: res.data.data.total
      })
    })
  }
  componentDidMount() {
    this.loadData({
      page: 1,
      pageSize: 10
    })
  }

  

  //选择试剂卡类型
  typeChange = (e) => {
    console.log(e)
    this.setState({
      card_type:e,
    })
  }
  //选择时间
  tiemChange = (value,dateString) => {
    // console.log(date,string)
    let time = [];
    time.push(dateString[0] + ' 00:00:00')
    time.push(dateString[1] + ' 23:59:59')
    this.setState({
      test_time:value,
      time,
    })
  }
  
  search = () => {
    const { card_type, time } = this.state
    let params = {
      page: 1,
      pageSize: 10
    }
    if (card_type) {
      params.paperType = card_type
    }
    if (time[0]) {
      params.testStartTime = time[0]
      params.testEndTime = time[1]
    }
    // console.log(params);
    this.loadData(params)
  }
  //重置
  reset = () => {
    this.loadData({
      page: 1,
      pageSize: 10
    })
    this.setState({
      card_type:undefined,
      test_time:undefined,
      time:[]
    })
  }

  //表格翻页
  handTablechange = (pagination) =>{
    const { current, pageSize } = pagination
    const { card_type, time } = this.state
    let params = {
      page: current,
      pageSize
    }
    if (card_type) {
      params.paperType = card_type
    }
    if (time[0]) {
      params.testStartTime = time[0]
      params.testEndTime = time[1]
    }
    this.loadData(params)
 };

  render() {
    const { data, current, pageSize, total } = this.state
    return (
      <div className='sub-content'>
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

            <RangePicker 
              onChange={this.tiemChange}
              format='YYYY-MM-DD'//指定日期显示样式
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
          columns={columns}
          dataSource={data}
          bordered={true}
          style={{margin:'20px 0',borderBottom:'1px,soild'}}
          pagination={{
            position: ['bottomLeft'],
            total,
            showTotal: total => `共 ${total} 条`,
            showQuickJumper: true,
            showSizeChanger: true,
            current,
            pageSize
          }}
          onChange={this.handTablechange}
          // scroll={{y:700}}
        />
      </div>
    )
  }
}
