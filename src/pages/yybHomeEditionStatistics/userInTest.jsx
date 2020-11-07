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
      title: '月经时间',
      dataIndex: 'menses_time',
    },
    {
      title: '月经周期',
      dataIndex: 'menses_period',
    },
    {
      title: '已测试时间',
      dataIndex: 'tested_time',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 37; i++) {
    data.push({
      key: i,
      phone_num: `241312 ${i}`,
      name: `用户${i}号`,
      menses_time: `2020-01-01 11：11：11`,
      menses_period:'1个月',
      tested_time:`2020-02-02 11：11：11`,
    });
  }
export default class UserInTest extends Component {
    state = {
        current:1,
        pageSize:10,
    }

    handTablechange = (pagination) =>{
      console.log(pagination)
      console.log(pagination.pageSize)
      this.setState({
        current:pagination.current,
        pageSize:pagination.pageSize,
      },
      ()=>{console.log('表格参数',this.state.current,this.state.pageSize)}
      )
      
    }

    render() {
        return (
            <div>
                <div style={{fontWeight:'bold'}} >在测人数：{data.length}</div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="32" style={{display:"flex" }}  >
                <Col span={4}>
                    <Input  placeholder="姓名"  />
                </Col>
                <Col span={4}>
                    <Input  placeholder="手机号"  />
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
                <Col span={12} >

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

