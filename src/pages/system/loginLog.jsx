import React, { Component } from 'react'
import {
  Table,
  DatePicker,
  Button,
  Input,
  Row,
  Col,
  message,
  Modal,
} from 'antd'
import {
  SearchOutlined,  
  DeleteOutlined
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;

//主页面表格数据
const data = [
  {        
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {        
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {        
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {        
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
  {
    logName: '登录日志',
    userNmae:'admin',
    date: '2020-03-05 15:38:44',
    msg:"",
    ip:'0:0:0:0:0:0:0:1'
  },
];
 
export default class LoginLog extends Component {
  constructor(props){
    super(props)
    this.state={
      loading:false,
      visible:0,
    }
  }
 //初始化列表
initColumns=()=>{
  this.columns =[
    {
      title:'日志名称',
      dataIndex:'logName',      
      align:'center'
    },   
    {
      title:'用户名称',
      dataIndex:'userName',      
      align:'center'
    },    
    {
      title:'时间',
      dataIndex:'date',      
      align:'center',
    },
    {
      title:'具体消息',
      dataIndex:'msg',      
      align:'center',
    },
    {
      title:'ip',
      dataIndex:'ip',      
      align:'center'
    }, 
  ];
  }
 //选择框
 selectChange =(e,Option) => {
  console.log(e)
  console.log(Option)
  this.setState({
    input:Object.assign(this.state.input,{[Option.title]:e})
  })
}
//表格行选择
onSelectChange = row => {
  console.log('所选择行',row)
  //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
  this.setState(
    {selectedRowKeys:row}
  )
};

//获取日志数据
getLoginLogs=(logName,logType)=>{
  this.setState({loading:true})
  logName=logName||this.state.logName
  //const result = await reqlogs(logName)
  const result = setTimeout(()=>data,1000)
  this.setState({loading:false})    
  console.log("获取列表数据");  
  const worklogs = result         
  this.setState({worklogs})
}

  //搜索
search=()=>{
  message.info('搜索中')
}

//清空日志
empty=()=>{
  this.setState({visible:1})
}

//关闭弹窗
handleCancel=()=>{
  this.setState({visible:0})
}

componentWillMount(){
  this.initColumns()
}

componentDidMount(){
  this.getLoginLogs()
} 

  render() {
    const { selectedRowKeys,loading,visible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };   
    
    return (
      <div style={{height:'100%'}}>       
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>            
            <Col span={4}>
                <RangePicker 
                  locale={locale}
                  showTime                        
                />
            </Col>
            <Col>
                <Input 
                  placeholder="日志名称"
                  onChange={this.typeChange}
                  value={this.state.card_type}                  
                >              
                </Input>
            </Col>
            <Col>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="button3"
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col>
                <Button 
                  type="primary"
                  icon={<DeleteOutlined/> }                  
                  onClick={this.empty}
                >
                  清空日志
                </Button>
            </Col>
            </Row>         
        </div>
        {/* 表格 */}
        <Table 
          columns={this.columns}
          dataSource={data}
          bordered={true}
          style={{margin:'20px 0',borderBottom:'1px,soild'}}
          pagination={ this.state.paginationProps}
          onChange={this.handTablechange}
          rowSelection={rowSelection}
        />
        {/* 清空日志弹窗 */}
      <Modal 
          visible={visible}          
          title="信息"    
          onCancel={this.handleCancel}          
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleShow}>
              提交
            </Button>,
            <Button name="delete" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否清空所有日志</p>         
        </Modal>
      </div>
    )
  }
}
