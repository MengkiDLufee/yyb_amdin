import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col, DatePicker} from 'antd';
import {ReloadOutlined,
    SearchOutlined ,
} from '@ant-design/icons'
import { userDrugHome } from "../../api/index";
const { RangePicker } = DatePicker


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
        title: '测试类型',
        dataIndex: 'testTypeName',
      },
      {
        title: '事件值',
        dataIndex: 'drug',
      },
    {
      title: '创建时间',
      dataIndex: 'startData',
    },

  ];
  function transformData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let newItem = {};
      newItem.key =i;
      newItem.nickName = data[i].nickName;
      newItem.phone = data[i].phone;
      newItem.testTypeName = data[i].testTypeName;
      newItem.drug = data[i].drug;
      newItem.startData = data[i].startData;
      newData.push(newItem);
    }
    return newData;
  }

export default class UserMedication extends Component {
  state = {
    data: [],
    total: '',
    current: 1,
    pageSize: 10,
    input: {
      nickName: '',
      phone: '',
      time: []
    },
    time: null
  }
  loadData = (params) => {
    userDrugHome(params).then(res => {
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
    const { nickName, phone, time } = this.state.input
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
  timeChange = (value, dateString) => {
    let time = [];
    time.push(dateString[0] + ' 00:00:00')
    time.push(dateString[1] + ' 23:59:59')
    this.setState({
      input: Object.assign(this.state.input, { time }),
      time: value
    })
  }

  search = () => {
    const { nickName, phone, time } = this.state.input
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
    if (time) {
      params.startTime = time[0]
      params.endTime = time[1]
    }
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
      time: null
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
                <div style={{fontWeight:'bold'}} >用户人数：{total}</div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="32" style={{display:"flex" }}  >
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
                <Col span={6}>
              <RangePicker
                value={this.state.time}
                format="YYYY-MM-DD"
                onChange={this.timeChange}
              />
            </Col>

                <Col span={4} style={{display:"flex"}}>
                    <Button type="primary" 
                            icon={<SearchOutlined /> }
                            style={{marginRight:'10px'}}
                            onClick={this.search}
                    >   
                        搜索
                    </Button>
                    <Button type="primary"
                        icon={<ReloadOutlined /> }  
                        onClick={this.reset}
                    >
                        重置
                    </Button>
                </Col>
                <Col span={6} >
                </Col>
                </Row>
                </div>
                <div>
                <Table 
                columns={columns} 
                dataSource={data} 
                bordered={true} 
                style={{margin:'20px 0'}}
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
