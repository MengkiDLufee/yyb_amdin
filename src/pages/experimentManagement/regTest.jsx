import React, { Component } from 'react'
import { Table, Button, Input, Row, Col, Space, Modal } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons'
import { expRegTest, exportFile, expRegDevTest } from '../../api/index'
import './index.less'



function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].clientId;
    newItem.userName = data[i].userName;
    newItem.personName = data[i].personName;
    newItem.deviceCode = data[i].deviceCode;
    newItem.historyDeviceNo = data[i].userHistoryDeviceIds;
    newItem.testPersonId = data[i].clientId;
    newData.push(newItem);
  }
  return newData;
}

const columns_history = [
  {
    title: '设备码',
    dataIndex: 'deviceCode',
    align: 'center'
  },
  {
    title: '是否使用',
    dataIndex: 'userFlag',
    align: 'center',
    render: (userFlag) => (
      <Space>
        <p>{userFlag === 0 ? '未使用' : '正在使用'}</p>
      </Space>
    )
  },
  {
    title: '绑定时间',
    dataIndex: 'bindTime',
    align: 'center'
  },
  {
    title: '解绑时间',
    dataIndex: 'unbindTime',
    align: 'center'
  },
]

function transformHisData(data) {
  data.forEach((Item, index) => {
    Item.key = index
  });
  return data
}


export default class RegTest extends Component {
  state = {
    data: [],
    total: '',
    current: 1,
    pageSize: 10,
    input: {
      userName: '',
      personName: '',
      deviceCode: ''
    },
    selectedRowKeys: [], // 当前页选择数据的id
    selectedRowKeysAll: [],//所有页面选择数据的id
    visible: false,
    dataHis: [],
    totalHis: null
  }
  columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center'
    },
    {
      title: '用户昵称',
      dataIndex: 'personName',
      align: 'center',
    },
    {
      title: '当前使用设备码',
      dataIndex: 'deviceCode',
      align: 'center'
    },
    {
      title: '历史使用设备数',
      dataIndex: 'historyDeviceNo',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record) => (
        <Space >
          <Button
            size="small"
            style={{ color: 'black', background: 'white' }}
            onClick={() => { this.checkHistoryDev(record) }}
          >查看历史设备</Button>
        </Space>
      ),
    }
  ];
  loadData = (params) => {
    expRegTest(params).then(res => {
      console.log(res);
      let data = transformData(res.data.data ? res.data.data.info : [])
      this.setState({
        data,
        current: params.page,
        pageSize: params.pageSize,
        total: res.data.data ? res.data.data.total : 0
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
    const { userName, personName, deviceCode } = this.state.input
    let params = {
      page: current,
      pageSize
    }
    if (userName) {
      params.userName = userName
    }
    if (personName) {
      params.personName = personName
    }
    if (deviceCode) {
      params.deviceCode = deviceCode
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

  exportChoose = () => {
    console.log('导出已选择数据', this.state.selectedRowKeys)
    exportFile('/experiment/paperTest/export/choose', this.state.selectedRowKeys)
  };

  exportSearch = () => {
    // console.log('按搜索条件导出', this.state.input)
    const { userName, personName, deviceCode } = this.state.input
    let params = {
      page: 1,
      pageSize: 10
    }
    if (userName) {
      params.userName = userName
    }
    if (personName) {
      params.personName = personName
    }
    if (deviceCode) {
      params.deviceCode = deviceCode
    }
    exportFile('/experiment/paperTest/export/condition', params)
  };

  search = () => {
    const { userName, personName, deviceCode } = this.state.input
    let params = {
      page: 1,
      pageSize: 10
    }
    if (userName) {
      params.userName = userName
    }
    if (personName) {
      params.personName = personName
    }
    if (deviceCode) {
      params.deviceCode = deviceCode
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
      userName: '',
      personName: '',
      deviceCode: ''
    })
    this.setState({
      input,
      selectedRowKeys: [],
      selectedRowKeysAll: [],
    })
  }
  //表格行选择
  onSelectChange = row => {
    let newArr = [...new Set([...row, ...this.state.selectedRowKeysAll])]//并集
    //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
    this.setState({
      selectedRowKeys: row,
      selectedRowKeysAll: newArr
    })
    console.log(row, newArr)
  };

  //查看历史设备
  checkHistoryDev = (record) => {
    expRegDevTest({
      testPersonId: record.testPersonId
    }).then(res => {
      console.log(res);
      this.setState({
        visible: true,
        dataHis: transformHisData(res.data.data ? res.data.data : []),
        totalHis: res.data.data ? res.data.data.length : 0
      })
    })
  }
  handleOk = () => {
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { data, current, pageSize, total, selectedRowKeys, dataHis, totalHis } = this.state
    const { userName, personName, deviceCode } = this.state.input
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{ 'margin': '10px 0' }} >
          <Row justify="space-between" gutter="16" style={{ display: "flex" }}  >
            <Col span={3}>
              <Input
                placeholder="用户名"
                value={userName}
                onChange={this.searchChange}
                id="userName"
              />
            </Col>
            <Col span={3}>
              <Input
                placeholder="用户昵称"
                value={personName}
                onChange={this.searchChange}
                id="personName"
              />
            </Col>
            <Col span={3}>
              <Input
                placeholder="当前使用设备码"
                value={deviceCode}
                onChange={this.searchChange}
                id="deviceCode"
              />
            </Col>

            <Col span={3} >
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={this.search}
                icon={<SearchOutlined className="icon1" />}
              >搜索</Button>
            </Col>
            <Col span={3} >
              <Button
                type="primary"
                onClick={this.reset}
                icon={<ReloadOutlined className="icon1" />}
              >重置</Button>
            </Col>
            <Col span={4} >
              <Button
                type="primary"
                icon={<CloudDownloadOutlined className="icon1" />}
                onClick={this.exportChoose}
                className="button2"
              >
                导出已选择数据
                          </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                icon={<CloudDownloadOutlined className="icon1" />}
                onClick={this.exportSearch}
                className="button2"
              >
                按检索条件导出
                        </Button>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={data}
            bordered={true}
            rowSelection={rowSelection}
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

        <Modal
          title="历史设备"
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="确定"
          onCancel={this.handleCancel}
          cancelText="关闭"
          className="modal1"
          width="800px"
        >
          <Table
            columns={columns_history}
            dataSource={dataHis}
            bordered={true}
            style={{ margin: '20px 0', borderBottom: '1px,soild' }}
            pagination={{
              position: ['bottomLeft'],
              total: { totalHis },
              showTotal: total => `共 ${total} 条`,
              showQuickJumper: true,
              showSizeChanger: true,
            }}
          />
        </Modal>
      </div>


    )
  }
}
