import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select ,DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker

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




export default class TestData extends Component {
    state = {
        current:1,
        pageSize:10,
        input:{
          client:'',
          name:'',
          type:undefined,
          stage:undefined,
          dev_num:'',
          time:[],
        }
    }

    handTablechange = (pagination) =>{
      console.log(pagination)
      this.setState({
        current:pagination.current,
        pageSize:pagination.pageSize,
      },
      ()=>{console.log('表格参数',this.state.current,this.state.pageSize)}
      )
    }
  //搜索栏输入框变化
    searchChange = (e) => {
      console.log(e.target)
      const ID = e.target.id
      const value = e.target.value
      this.setState({
        input:Object.assign(this.state.input,{[ID]:value})
      })
    }
    //搜索栏类型选择框变化
    typeChange = (e) => {
      console.log(e)
      this.setState({
        input:Object.assign(this.state.input,{type:e})
      })
    }
    //搜索栏阶段选择框变化
    stageChange = (e) => {
      console.log(e)
      this.setState({
        input:Object.assign(this.state.input,{stage:e})
      })
    }
    timeChange = (value,dateString) => {
      console.log(value);
      let time = [];
      time.push(dateString[0] +' 00:00:00')
      time.push(dateString[1] + ' 23:59:59')
      console.log(time)
      this.setState({
        input:Object.assign(this.state.input,{time:time})
      })
    }
    //搜索按钮
    search = () => {
      console.log(this.state.input)
    }
    reset = () => {
      let data = Object.assign(this.state.input,{
        client:'',
        name:'',
        type:undefined,
        stage:undefined,
        time:'',
        dev_num:'',
      })
      this.setState({
        input:data
      })
    }


    render() {

      return (
      <div>
        <div>测试人数：{data.length}</div>
        <div style={{'margin':'10px 0'}} >
        <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
          <Col span={3}>
            <Input  
                placeholder="客户"  
                value={this.state.input.client}  
                onChange={this.searchChange} 
                id="client"
             />
          </Col>
          <Col span={3}>
            <Input  
                placeholder="姓名" 
                value={this.state.input.name} 
                onChange={this.searchChange}
                id="name"
             />
          </Col>
          <Col span={3}>
            <Select 
                placeholder="请选择试剂类型 " 
                style={{width:'100%'}} 
                value={this.state.input.type} 
                onChange={this.typeChange}
              >
              <Option value="reagent1">试剂1</Option>
              <Option value="reagent2">试剂2</Option>
              <Option value="reagent3">试剂3</Option>
            </Select>
          </Col>
          <Col span={3}>
            <Select 
                placeholder="请选择测试阶段 " 
                style={{width:'100%'}} 
                value={this.state.input.stage} 
                onChange={this.stageChange}
              >
              <Option value="stage1">阶段1</Option>
              <Option value="stage2">阶段2</Option>
              <Option value="stage3">阶段3</Option>
            </Select>
          </Col>
          
          <Col span={4}>
              <RangePicker 
                format="YYYY-MM-DD"
                onChange={this.timeChange}
              />
          </Col>
          
          <Col span={3}>
            <Input  
                placeholder="设备号" 
                value={this.state.input.dev_num} 
                onChange={this.searchChange}  
                id="dev_num"
                />
          </Col>
          <Col span={1.5}>
            <Button type="primary" onClick={this.search} >搜索</Button>
          </Col>
          <Col span={1.5} >
          <Button type="primary" onClick={this.reset} >重置</Button>
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
