import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col, DatePicker} from 'antd';
import {
  ReloadOutlined,
  SearchOutlined ,
} from '@ant-design/icons'
// import locale from 'antd/lib/date-picker/locale/zh_CN'
import { actualTestHome } from "../../api/index";

const { RangePicker } = DatePicker

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

  function transformData(data){
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let newItem = {};
      newItem.key = data[i].clientId;
      newItem.name = data[i].nickName;
      newItem.dev_code = data[i].deviceNo;
      newItem.phone_num = data[i].phone;
      newItem.remarks = data[i].zhouqi;
      newData.push(newItem);
    }
    console.log(newData)
    return newData;
  }
  






export default class ActualTest extends Component {
    state = {
        data:[],
        total: '',//数据总条数
        current: 1,//当前页数
        pageSize: 10,//当前页面条数
    }
    loadData = (params) =>{
      actualTestHome(params).then(res=>{
        console.log(res);
        let data = transformData(res.data.data.info)
        this.setState({
          data,
          current:params.page,
          pageSize:params.pageSize,
          total:res.data.data.total
        })
      })
    }

    componentDidMount(){
      this.loadData({
        page:1,
        pageSize:10
      })
    }

    handTablechange = (pagination) =>{
      console.log(pagination)
      console.log(pagination.pageSize)
      const {current,pageSize} = pagination
      this.loadData({
        page:current,
        pageSize,
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


    render() {
      const { data, current, pageSize, total} = this.state
     return (
      <div>
        <div style={{fontWeight:'bold'}} >在测人数：{total}</div>
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
            <Col span={6}>
                <RangePicker 
                  
                  format="YYYY-MM-DD"
                  onChange={this.timeChange}
                />
            </Col>
            <Col span={8} offset={1} style={{display:'flex'}}>
                <Button 
                  type="primary" 
                  icon={<SearchOutlined /> }
                  style={{marginRight:'10px'}}
                >   
                    搜索
                </Button>
                <Button
                   type="primary"
                   icon={<ReloadOutlined /> }  
                >
                    重置
                </Button>
            </Col>
            {/* <Col span={10}></Col> */}

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
            current,
            pageSize
          }}
          onChange={this.handTablechange}
          />
        </div>
      </div>
        )
    }
}
