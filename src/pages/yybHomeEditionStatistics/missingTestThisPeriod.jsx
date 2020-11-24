import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col} from 'antd';
import {ReloadOutlined,
    SearchOutlined ,
} from '@ant-design/icons'


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
  
  const data = [];
  for (let i = 0; i < 37; i++) {
    data.push({
      key: i,
      name: `漏测${i}号`,
      dev_code: `dev ${i}`,
      phone_num: `45241312 ${i}`,
      remarks:`${i}周期`,
    });
  }
export default class MissingTestThisPeriod extends Component {
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
                <div style={{fontWeight:'bold'}} >漏测人数：{data.length}</div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                    <Col span={3}>
                        <Input  placeholder="姓名"  />
                    </Col>
                    <Col span={3}>
                        <Input  placeholder="设备号"  />
                    </Col>
                    <Col span={3}>
                        <Input  placeholder="手机号"  />
                    </Col>
                    <Col span={4} offset={1} style={{display:'flex'}}>
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
                    <Col span={10}></Col>
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
