import React, { Component } from 'react'
import {
  Card,
  Button,
  Table
}from 'antd'

export default class User extends Component {
  render() {
    const title =(
      <span>
        <Button type='primary'>搜索</Button>
        <Button type='primary'>添加</Button>
        <Button type='primary'>导出</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
        bordered
        rowKey='_id'
        columns={this.columns}
        pagination={{defaultPageSize:5,showQuickJumper:true}}
        />
      </Card>
    )
  }
}
