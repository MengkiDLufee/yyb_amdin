import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select ,DatePicker } from 'antd';
import { 
  testDataHome,
  testDataTypeIDHome
 } from '../../api/index';

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
  





export default class TestData extends Component {
    state = {
        data:[],//表格数据
        input:{
          client:'',
          name:'',
          type:undefined,
          stage:undefined,
          dev_num:'',
          time:[],
        },
        time:null,
        paperType:[],//试剂类型
        testType:[],//测试阶段
        paginationProps: {
          total: '',//数据总条数
          current: 1,//当前页数
          pageSize: 10,//当前页面条数
        }
    }
     transformData =(data)=> {
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        let newItem = {};
        newItem.key = this.state.paginationProps.current + i;
        newItem.customer = data[i].userName;
        newItem.name = data[i].nickName;
        newItem.reagent_type = data[i].paperTypeName;
        newItem.test_stage = data[i].testTypeName;
        newItem.num_value = data[i].value;
        newItem.TGOD = data[i].tgod;
        newItem.CGOD = data[i].cgod;
        newItem.conclusion = data[i].tipsHisValue;
        newItem.test_time = data[i].testTime;
        newItem.plan_time = data[i].planTime;
        newItem.dev_num = data[i].deviceNo;
        newData.push(newItem);
      }
      // console.log(newData)
      return newData;
    }


    loadData = (params)=> {
      testDataHome(params).then(res=>{
        
        let data = this.transformData(res.data.data.info)
        let paginationProps = Object.assign(
          this.state.paginationProps,
          {
              total:res.data.data.total,
              current:params.page,
              pageSize:params.pageSize
          })
        this.setState({
          data,
          paginationProps
        })
      })
    }

    componentDidMount(){
      this.loadData({
        page:1,
        pageSize:10
      })
      testDataTypeIDHome().then(res =>{
        const {paperType, testType} = res.data.data
        console.log(res);
        this.setState({
          paperType,
          testType
        })
      })
    }

    handTablechange = (pagination) =>{
      const { client, name, type, stage, dev_num, time } = this.state.input
      let params = {
        page:pagination.current,
        pageSize:pagination.pageSize
      }
      if (client) {
        params.userName = client
      }
      if (name) {
        params.nickName = name
      }
      if (type) {
        params.paperTypeId = type
      }
      if (stage) {
        params.testTypeCode = stage
      }
      if (dev_num) {
        params.deviceNo = dev_num
      }
      if (time) {
        params.testStartTime = time[0]
        params.testEndTime = time[1]
      }
      console.log(params);
      this.loadData(params)
    }
  //搜索栏输入框变化
    searchChange = (e) => {
      // console.log(e.target)
      const ID = e.target.id
      const value = e.target.value
      this.setState({
        input:Object.assign(this.state.input,{[ID]:value})
      })
    }
    //搜索栏类型选择框变化
    typeChange = (e) => {
      // console.log(e)
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
      // console.log(value);
      let time = [];
      time.push(dateString[0] +' 00:00:00')
      time.push(dateString[1] + ' 23:59:59')
      // console.log(time)
      this.setState({
        input:Object.assign(this.state.input,{time:time}),
        time:value
      })
    }
    //搜索按钮
    search = () => {
      const { client, name, type, stage, dev_num, time } = this.state.input
      let params = {
        page:1,
        pageSize:10
      }
      if (client) {
        params.userName = client
      }
      if (name) {
        params.nickName = name
      }
      if (type) {
        params.paperTypeId = type
      }
      if (stage) {
        params.testTypeCode = stage
      }
      if (dev_num) {
        params.deviceNo = dev_num
      }
      if (time) {
        params.testStartTime = time[0]
        params.testEndTime = time[1]
      }
      console.log(params);
      this.loadData(params)
    }
    reset = () => {
      this.loadData({
        page:1,
        pageSize:10
      })
      let input = Object.assign(this.state.input,{
        client:'',
        name:'',
        type:undefined,
        stage:undefined,
        time:null,
        dev_num:'',
      })
      this.setState({
        input,
        time:null
      },
      ()=>{console.log(this.state.input)})
    }


    render() {
      const {data} = this.state
      const { total, current, pageSize } = this.state.paginationProps
      return (
      <div>
        <div>测试人数：{total}</div>
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
                {
                  this.state.paperType.map((item,index) => {
                    return <Option key={index} value={item.paperTypeId}>{item.paperTypeName}</Option>
                  })
                }
            </Select>
          </Col>
          <Col span={3}>
            <Select 
                placeholder="请选择测试阶段 " 
                style={{width:'100%'}} 
                value={this.state.input.stage} 
                onChange={this.stageChange}
              >
                {
                  this.state.testType.map((item,index) => {
                    return <Option key={index}  value={item.testTypeId}>{item.testTypeName}</Option>
                  })
                }
            </Select>
          </Col>
          
          <Col span={4}>
              <RangePicker 
                format="YYYY-MM-DD"
                onChange={this.timeChange}
                value={this.state.time}
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
              total,
              showTotal:total => `共 ${total} 条`,
              showQuickJumper:true,
              showSizeChanger:true,
              current,//当前页数
              pageSize,//当前页面条数
            }}
            onChange={this.handTablechange}
          />
        </div>
      </div>
        )
    }
}
