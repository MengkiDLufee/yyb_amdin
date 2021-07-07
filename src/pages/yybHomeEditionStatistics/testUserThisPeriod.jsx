import React, { Component } from 'react'
import { Table, Button, Input, Row, Col, Select, DatePicker } from 'antd';
import { testUserPeriodHome } from "../../api/index";
import { type } from "./constant";
const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: '手机号',
    width: 150,
    dataIndex: 'phone',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '昵称',
    width: 100,
    dataIndex: 'nickName',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '周期数',
    width: 100,
    dataIndex: 'zhouqishu',
    align: 'center'
  },
  {
    title: '最新测试时间',
    width: 150,
    dataIndex: 'newTestTime',
    align: 'center'
  },
  {
    title: '测试阶段',
    width: 100,
    dataIndex: 'testTypeName',
    align: 'center'
  },
  {
    title: '总测试数',
    width: 100,
    dataIndex: 'testTotal',
    align: 'center'
  },
  {
    title: '精液液化',
    width: 150,
    dataIndex: 'yehua',
    align: 'center'
  },
  {
    title: '生精功能',
    width: 150,
    dataIndex: 'shengjing',
    align: 'center'
  },
  {
    title: '卵巢功能',
    width: 150,
    dataIndex: 'luanchao',
    align: 'center'
  },
  {
    title: '排卵',
    width: 150,
    dataIndex: 'pailuan',
    align: 'center'
  },
  {
    title: '怀孕',
    width: 100,
    dataIndex: 'huaiyun',
    align: 'center'
  },
  {
    title: '胚胎',
    width: 100,
    dataIndex: 'peitai',
    align: 'center'
  },
  {
    title: '注册时间',
    width: 150,
    dataIndex: 'regTime',
    align: 'center'
  },
  {
    title: '月经时间',
    width: 150,
    dataIndex: 'bleeDate',
    align: 'center'
  },
  {
    title: '排卵峰起时间',
    width: 150,
    dataIndex: 'layDate',
    align: 'center'
  },
  {
    title: '排卵峰降时间',
    width: 150,
    dataIndex: 'layeDate',
    align: 'center'
  },
  {
    title: '怀孕时间',
    width: 150,
    dataIndex: 'preDate',
    align: 'center'
  },
  {
    title: '同房时间',
    width: 150,
    dataIndex: 'sexDate',
    align: 'center'
  },
];

function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].clientId;
    newItem.phone = data[i].phone;
    newItem.nickName = data[i].nickName;
    newItem.zhouqishu = data[i].zhouqishu;
    newItem.newTestTime = data[i].newTestTime;
    newItem.testTypeName = data[i].testTypeName;
    newItem.testTotal = data[i].testTotal;
    newItem.yehua = data[i].yehua;
    newItem.shengjing = data[i].shengjing;
    newItem.luanchao = data[i].luanchao;
    newItem.pailuan = data[i].pailuan;
    newItem.huaiyun = data[i].huaiyun;
    newItem.peitai = data[i].peitai;
    newItem.regTime = data[i].regTime;
    newItem.bleeDate = data[i].bleeDate;
    newItem.layDate = data[i].layDate;
    newItem.layeDate = data[i].layeDate;
    newItem.preDate = data[i].preDate;
    newItem.sexDate = data[i].sexDate;
    newData.push(newItem);
  }
  return newData;
}

export default class TestUserThisPeriod extends Component {
  state = {
    data: [],
    total: '',
    current: 1,
    pageSize: 10,
    input: {
      nickName: '',
      phone: '',
      time: [],
      testTypeName: undefined
    },
    time: null,
    testType: type
  }
  loadData = (params) => {
    testUserPeriodHome(params).then(res => {
      // console.log(res);
      let data = transformData(res.data.data.info)
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

  handTablechange = (pagination) => {
    const { current, pageSize } = pagination
    const { nickName, phone, time, testTypeName } = this.state.input
    let params = {
      page: current,
      pageSize
    }
    if (nickName) {
      params.nickName = nickName
    }
    if (phone) {
      params.phone = phone
    }
    if (testTypeName) {
      params.testTypeName = testTypeName
    }
    if (time) {
      params.startTime = time[0]
      params.endTime = time[1]
    }
    this.loadData(params)
  }
  searchChange = (e) => {
    const ID = e.target.id
    const value = e.target.value
    this.setState({
      input: Object.assign(this.state.input, { [ID]: value })
    })
  }
  stageChange = (e) => {
    // console.log(e)
    this.setState({
      input: Object.assign(this.state.input, { testTypeName: e })
    })
  }

  timeChange = (value, dateString) => {
    // console.log(value);
    let time = [];
    time.push(dateString[0] + ' 00:00:00')
    time.push(dateString[1] + ' 23:59:59')
    // console.log(time)
    this.setState({
      input: Object.assign(this.state.input, { time }),
      time: value
    })
  }

  search = () => {
    const { nickName, phone, time, testTypeName } = this.state.input
    let params = {
      page: 1,
      pageSize: 10
    }
    if (nickName) {
      params.nickName = nickName
    }
    if (phone) {
      params.phone = phone
    }
    if (testTypeName) {
      params.testTypeName = testTypeName
    }
    if (time[0]) {
      params.startTime = time[0]
      params.endTime = time[1]
    }
    // console.log(params);
    this.loadData(params)
  }

  reset = () => {
    this.loadData({
      page: 1,
      pageSize: 10
    })
    let input = Object.assign(this.state.input, {
      nickName: '',
      phone: '',
      time: [],
      testTypeName: undefined
    })
    this.setState({
      input,
      time: null
    })
  }
  render() {
    const { data, current, pageSize, total } = this.state
    return (
      <div>
        <div style={{ fontWeight: 'bold' }}>测试人数：{total}</div>
        <div style={{ 'margin': '10px 0' }} >
          <Row justify="space-between" gutter="16" style={{ display: "flex" }}  >
            <Col span={3}>
              <Input
                placeholder="手机号"
                value={this.state.input.phone}
                onChange={this.searchChange}
                id="phone"
              />
            </Col>
            <Col span={3}>
              <Input
                placeholder="昵称"
                value={this.state.input.nickName}
                onChange={this.searchChange}
                id="nickName"
              />
            </Col>
            <Col span={3}>
              <Select
                placeholder="请选择测试阶段"
                style={{ width: '100%' }}
                onChange={this.stageChange}
                value={this.state.input.testTypeName}
              >
                {
                  this.state.testType.map((item, index) => {
                    return <Option key={index} value={item.testTypeName}>{item.name}</Option>
                  })
                }
              </Select>
            </Col>
            <Col span={4}>
              <RangePicker
                format="YYYY-MM-DD"
                onChange={this.timeChange}
                value={this.state.time}
              />
            </Col>
            <Col span={2} >
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={this.search}
              >搜索</Button>
            </Col>
            <Col span={2} >
              <Button
                type="primary"
                onClick={this.reset}
              >重置</Button>
            </Col>
            <Col span={4} >
            </Col>
          </Row>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            bordered={true}
            style={{ margin: '20px 0' }}
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
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    )
  }
}
