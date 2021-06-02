import React, { Component } from 'react'
import { Table, Button, Input, Row, Col } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { missTestPeriodHome } from "../../api/index";


const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '设备号',
    dataIndex: 'dev_code',
  },
  {
    title: '手机号',
    dataIndex: 'phone_num',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
];

// const data = [];
// for (let i = 0; i < 37; i++) {
//   data.push({
//     key: i,
//     name: `漏测${i}号`,
//     dev_code: `dev ${i}`,
//     phone_num: `45241312 ${i}`,
//     remarks:`${i}周期`,
//   });
// }
export default class MissingTestThisPeriod extends Component {
  state = {
    data: [],
    total: '',//数据总条数
    current: 1,//当前页数
    pageSize: 10,//当前页面条数
    input: {
      name: '',
      deviceNo: '',
      phone: ''
    }
  }
  loadData = (params) => {
    missTestPeriodHome(params).then(res => {
      console.log(res);
      let data = this.transformData(res.data.data.info)
      this.setState({
        data,
        current: params.page,
        pageSize: params.pageSize,
        total: res.data.data.total
      })
    })
  }
  transformData = function (data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let newItem = {};
      newItem.key = data[i].clientId;
      newItem.name = data[i].nickName;
      newItem.dev_code = data[i].deviceNo;
      newItem.phone_num = data[i].phone;
      newItem.remarks = data[i].zhouqi;
      newData.push(newItem);
    }
    // console.log(newData)
    return newData;
  }

  componentDidMount() {
    this.loadData({
      page: 1,
      pageSize: 10
    })
  }

  handTablechange = (pagination) => {
    const { current, pageSize } = pagination
    const { name, deviceNo, phone } = this.state.input
    let params = {
      page: current,
      pageSize,
    }
    if (name) {
      params.nickName = name
    }
    if (deviceNo) {
      params.deviceNo = deviceNo
    }
    if (phone) {
      params.phone = phone
    }
    this.loadData(params)
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
    const { name, deviceNo, phone } = this.state.input
    let params = {
      page: 1,
      pageSize: 10
    }
    if (name) {
      params.nickName = name
    }
    if (deviceNo) {
      params.deviceNo = deviceNo
    }
    if (phone) {
      params.phone = phone
    }
    console.log(params);
    this.loadData(params)
  }
  reset = () => {
    this.loadData({
      page: 1,
      pageSize: 10
    })
    let input = Object.assign(this.state.input, {
      name: '',
      deviceNo: '',
      phone: '',
    })
    this.setState({
      input
    })
  }

  render() {
    const { data, current, pageSize, total } = this.state
    const { name, deviceNo, phone } = this.state.input
    return (
      <div>
        <div style={{ fontWeight: 'bold' }} >漏测人数：{total}</div>
        <div style={{ 'margin': '10px 0' }} >
          <Row justify="space-between" gutter="15" style={{ display: "flex" }}  >
            <Col span={3}>
              <Input
                placeholder="姓名"
                value={name}
                onChange={this.searchChange}
                id="name"
              />
            </Col>
            <Col span={3}>
              <Input
                placeholder="设备号"
                value={deviceNo}
                onChange={this.searchChange}
                id="deviceNo"
              />
            </Col>
            <Col span={3}>
              <Input
                placeholder="手机号"
                value={phone}
                onChange={this.searchChange}
                id="phone"
              />
            </Col>
            <Col span={4} offset={1} style={{ display: 'flex' }}>
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
            <Col span={10}></Col>
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
