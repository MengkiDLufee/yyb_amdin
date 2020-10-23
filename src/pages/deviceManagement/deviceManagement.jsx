import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select, Space } from 'antd';
import {ReloadOutlined, SearchOutlined ,PlusOutlined, CloudUploadOutlined, CloudDownloadOutlined} from '@ant-design/icons'


const { Option } = Select;



const columns = [
    {
      title: '设备码',
      dataIndex: 'dev_code',
      width: 150,
    },
    {
      title: '设备号',
      dataIndex: 'dev_num',
      width: 150,
    },
    {
      title: '激活',
      dataIndex: 'on',
      width: 100,
    },
    {
      title: '已用',
      dataIndex: 'used',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
    },
    {
      title: '共享',
      dataIndex: 'share',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align:'center',
      width: 150,
      fixed:'right',
      render:() => (
        <Space >
        <Button size="small" style={{color:'black',background:'white'}} >修改</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}}>删除</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}}>使用人员</Button>
        </Space>
      ),
    }
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      dev_code: `123123123${i}`,
      dev_num: `客户 ${i}`,
      on: `类型 ${i}`,
      used:`早期胚胎阶段`,
      type:`${i}.${i}`,
      status :`dasd `,
      share :`6.1${i}`,
    });
  }

  
  function handleChange(value) {
    console.log(`selected ${value}`);
  }


export default class DeviceManagement extends Component {



    render() {
        return (
            <div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                    <Col span={3}>
                        <Input  placeholder="客户"  />
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择激活状态 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="on">已激活</Option>
                            <Option value="close">未激活</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择类型 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="type1">类型1</Option>
                            <Option value="type2">类型2</Option>
                            <Option value="type3">类型3</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择状态 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="status1">测试通过</Option>
                            <Option value="status2">测试未通过</Option>
                        </Select>
                    </Col>
                    <Col span={1.5}>
                        <Button type="primary" icon={<SearchOutlined  style={{fontSize:'18px'}} />}>搜索</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<ReloadOutlined style={{fontSize:'18px'}} /> } >重置</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<PlusOutlined style={{fontSize:'18px'}} />} >添加</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudUploadOutlined style={{fontSize:'18px'}} />} >导入</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudDownloadOutlined style={{fontSize:'18px'}} />} >导出已选择数据</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudDownloadOutlined style={{fontSize:'18px'}}  />} >按检索条件导出</Button>
                    </Col>
                    <Col span={2} ></Col>
                </Row>
                </div>
                <div>
                <Table 
                columns={columns} 
                dataSource={data} 
                bordered={true} 
                rowSelection={true}
                style={{margin:'20px 0'}}
                pagination={{ 
                    position: ['bottomLeft'] ,
                    total:'data.length',
                    showTotal:total => `共 ${total} 条`,
                    showQuickJumper:true,
                    showSizeChanger:true
                }}
                />
                </div>
            </div>
        )
    }
}
