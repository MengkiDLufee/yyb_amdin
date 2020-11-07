import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col} from 'antd';
import {ReloadOutlined,
    SearchOutlined ,
} from '@ant-design/icons'


const columns = [
    {
        title: '手机号',
        dataIndex: 'phone_num',
      },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
        title: '测试类型',
        dataIndex: 'test_type',
      },
      {
        title: '事件值',
        dataIndex: 'issue_value',
      },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },

  ];
  
  const data = [];
  for (let i = 0; i < 37; i++) {
    data.push({
      key: i,
      phone_num: `241312 ${i}`,
      name: `用户${i}号`,
      tset_type:`类型${i}`,
      issue_value:`不用药`,
      create_time: `2020-01-01 11：11：11`,
    });
  }

export default class UserMedication extends Component {
    render() {
        return (
            <div>
                <div style={{fontWeight:'bold'}} >用户人数：{data.length}</div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="32" style={{display:"flex" }}  >
                <Col span={4}>
                    <Input  placeholder="姓名"  />
                </Col>
                <Col span={4}>
                    <Input  placeholder="手机号"  />
                </Col>
                <Col span={4}>
                    <Input  placeholder="创建时间"  />
                </Col>

                <Col span={4} style={{display:"flex"}}>
                    <Button type="primary" 
                            icon={<SearchOutlined /> }
                            style={{marginRight:'10px'}}
                    >   
                        搜索
                    </Button>
                    <Button type="primary"
                        icon={<ReloadOutlined /> }  
                    >
                        重置
                    </Button>
                </Col>
                <Col span={8} >
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
                    position: ['bottomLeft'] ,
                    total:'data.length',
                    showTotal:total => `共 ${total} 条`,
                    showQuickJumper:true,
                    showSizeChanger:true
                }}
                onChange={this.handTablechange}
                />
                </div>
            </div>
        )
    }
}
