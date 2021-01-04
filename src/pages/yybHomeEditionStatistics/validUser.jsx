import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select ,DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
    {
      title: '手机号',
      width:150,
      dataIndex: 'phone_num',
      fixed:'left',
      align:'center'
    },
    {
      title: '昵称',
      width:100,
      dataIndex: 'name',
      fixed:'left',
      align:'center'
    },
    {
      title: '周期数',
      width:100,
      dataIndex: 'period',
      align:'center'
    },
    {
      title: '最新测试时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '测试阶段',
      width:100,
      dataIndex: 'test_stage',
      align:'center'
    },
    {
      title: '总测试数',
      width:100,
      dataIndex: 'test_num',
      align:'center'
    },
    {
      title: '精液液化',
      width:150,
      dataIndex: 'semen',
      align:'center'
    },
    {
      title: '生精功能',
      width:150,
      dataIndex: 'semen',
      align:'center'
    },
    {
      title: '卵巢功能',
      width:150,
      dataIndex: 'semen',
      align:'center'
    },
    {
      title: '排卵',
      width:150,
      dataIndex: 'semen',
      align:'center'
    },
    {
      title: '怀孕',
      width:100,
      dataIndex: 'preg',
      align:'center'
    },
    {
      title: '胚胎',
      width:100,
      dataIndex: 'preg',
      align:'center'
    },
    {
      title: '注册时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '月经时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '排卵峰起时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '排卵峰降时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '怀孕时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
    {
      title: '同房时间',
      width:150,
      dataIndex: 'time',
      align:'center'
    },
  ];

  const data = [];
  for (let i = 0; i < 88; i++) {
    data.push({
      key: i,
      phone_num: `13322224444`,
      name: `客户 ${i}`,
      period: `${i}`,
      time : `2020-07-14`,
      test_stage:`阶段${i}`,
      test_num:`${i}${i}`,
      semen:`测试进行中`,
      preg :`---`,
      wait :`待定`,
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }


export default class ValidUser extends Component {
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
    timeChange = (value,dateString) => {
      console.log(value);
      console.log(dateString);
      let startTime =  dateString[0] + ' 00:00:00';
      let endTime = dateString[1] + ' 23:59:59';
      console.log(startTime,endTime)
    }
    render() {
        return (
            <div>
                <div style={{fontWeight:'bold'}}>有效人数：{data.length}</div>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="16" style={{display:"flex" }}  >
                <Col span={3}>
                    <Input  placeholder="手机号"  />
                </Col>
                <Col span={3}>
                    <Input  placeholder="昵称"  />
                </Col>
                <Col span={3}>
                    <Select placeholder="请选择测试阶段" style={{width:'100%'}} onChange={handleChange}>
                      <Option value="1">精液液化能力</Option>
                      <Option value="2">生精功能检测</Option>
                      <Option value="3">卵巢功能评估</Option>
                      <Option value="4">寻找黄金优孕期</Option>
                      <Option value="5">早期妊娠确认</Option>
                      <Option value="6">早期胚胎发育监测</Option>
                    </Select>
                </Col> 
                <Col span={3}>
                    <RangePicker 
                      format="YYYY-MM-DD"
                      onChange={this.timeChange}
                    />
                </Col>         
                <Col span={2} >
                    <Button type="primary" style={{marginRight:'10px'}}>搜索</Button>
                </Col>
                <Col span={2} >
                <Button type="primary" >重置</Button>
                </Col>
                <Col span={7} >
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
                scroll={{x:1300}}
                />
                </div>
            </div>
        )
    }
}
