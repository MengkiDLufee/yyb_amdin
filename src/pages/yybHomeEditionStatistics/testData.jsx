import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select } from 'antd';

const { Option } = Select;

const columns = [
    {
      title: '客户',
      dataIndex: 'customer',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '试剂类型',
      dataIndex: 'reagent_type',
    },
    {
      title: '测试阶段',
      dataIndex: 'test_stage',
    },
    {
      title: '数值',
      dataIndex: 'num_value',
    },
    {
      title: 'TGOD',
      dataIndex: 'TGOD',
    },
    {
      title: 'CGOD',
      dataIndex: 'CGOD',
    },
    {
      title: '结论',
      dataIndex: 'conclusion',
    },
    {
      title: '测试时间',
      dataIndex: 'test_time',
    },
    {
      title: '计划时间',
      dataIndex: 'plan_time',
    },
    {
      title: '设备号',
      dataIndex: 'dev_num',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      customer: `123123123${i}`,
      name: `客户 ${i}`,
      reagent_type: `类型 ${i}`,
      test_stage:`早期胚胎阶段`,
      num_value:`${i}.${i}`,
      TGOD :`dasd `,
      CGOD :`6.1${i}`,
      conclusion : `结论 ${i}`,
      test_time : `2020-07-14`,
      plan_time : `2018-07-20`,
      dev_num : `adx03${i}`,
    });
  }


  function handleChange(value) {
    console.log(`selected ${value}`);
  }


export default class TestData extends Component {
    state = {
      paginationparams:{
        current:1,
        pageSzie:10,
      }
    }

    handTablechange = (pagination) =>{
      console.log(pagination)
      this.setState({
        current:pagination.current,
        pageSzie:pagination.pageSzie,
      })
      console.log('表格参数',this.state.paginationparams)
    }


    render() {

        return (
      <div>
        <div>测试人数：55</div>
        <div style={{'margin':'10px 0'}} >
        <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
          <Col span={3}>
            <Input  placeholder="客户"  />
          </Col>
          <Col span={3}>
            <Input  placeholder="姓名"  />
          </Col>
          <Col span={3}>
            <Select placeholder="请选择试剂类型 " style={{width:'100%'}} onChange={handleChange}>
              <Option value="reagent1">试剂1</Option>
              <Option value="reagent2">试剂2</Option>
              <Option value="reagent3">试剂3</Option>
            </Select>
          </Col>
          <Col span={3}>
            <Select placeholder="请选择测试阶段 " style={{width:'100%'}} onChange={handleChange}>
              <Option value="stage1">阶段1</Option>
              <Option value="stage2">阶段2</Option>
              <Option value="stage3">阶段3</Option>
            </Select>
          </Col>
          
          <Col span={4}>
            <Input  placeholder="测试时间"  />
          </Col>
          
          <Col span={3}>
            <Input  placeholder="设备号"  />
          </Col>
          <Col span={1.5}>
            <Button type="primary" >搜索</Button>
          </Col>
          <Col span={1.5} >
          <Button type="primary" >重置</Button>
          </Col>
          <Col span={2} >

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
