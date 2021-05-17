import React, { Component } from 'react'
import { Table, Button, Input, Row, Col } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { userInTestHome } from "../../api/index";


const columns = [
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '姓名',
    dataIndex: 'nickName',
  },
  {
    title: '月经时间',
    dataIndex: 'bleedingDate',
  },
  {
    title: '月经周期',
    dataIndex: 'cycle',
  },
  {
    title: '已测试时间',
    dataIndex: 'startDate',
  },
];

function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].clientId;
    newItem.nickName = data[i].nickName;
    newItem.bleedingDate = data[i].bleedingDate;
    newItem.phone = data[i].phone;
    newItem.cycle = data[i].cycle;
    newItem.startDate = data[i].startDate;
    newData.push(newItem);
  }
  return newData;
}
export default class UserInTest extends Component {
  state = {
    data: [],
    total: '',
    current: 1,
    pageSize: 10,
    input: {
      nickName: '',
      phone: '',
    }
  }
  loadData = (params) => {
    userInTestHome(params).then(res => {
      console.log(res);
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
    this.loadData({
      page: current,
      pageSize,
    })
  }
  searchChange = (e) => {
    // console.log(e.target)
    const ID = e.target.id
    const value = e.target.value
    this.setState({
      input: Object.assign(this.state.input, { [ID]: value })
    })
  }
  search = () => {
    const { nickName, deviceNo, phone, time } = this.state.input
    let params = {
      page: 1,
      pageSize: 10
    }
    if (nickName) {
      params.nickName = nickName
    }
    if (deviceNo) {
      params.deviceNo = deviceNo
    }
    if (phone) {
      params.phone = phone
    }
    if (time) {
      params.testStartTime = time[0]
      params.testEndTime = time[1]
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
      phone: ''
    })
    this.setState({
      input
    })
  }

  render() {
    const { data, current, pageSize, total } = this.state
    return (
      <div>
        <div style={{ fontWeight: 'bold' }} >在测人数：{total}</div>
        <div style={{ 'margin': '10px 0' }} >
          <Row justify="space-between" gutter="32" style={{ display: "flex" }}  >
            <Col span={4}>
              <Input
                placeholder="姓名"
                value={this.state.input.nickName}
                onChange={this.searchChange}
                id="nickName"
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="手机号"
                value={this.state.input.phone}
                onChange={this.searchChange}
                id="phone"
              />
            </Col>

            <Col span={4} style={{ display: "flex" }}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{ marginRight: '10px' }}
                onClick={this.search}
              >
                搜索
                    </Button>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.reset}
              >
                重置
                    </Button>
            </Col>
            <Col span={12} >

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
          />
        </div>
      </div>
    )
  }
}

