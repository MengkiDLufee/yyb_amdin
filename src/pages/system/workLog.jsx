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
  Select,
} from 'antd'
import {
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {queryWorkLog,deleteWorkLog} from '../../api/sysManageIndex'
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class WorkLog extends Component {
  constructor(props){
    super(props)
    this.state = {
      workLogs:[],
      visible:0,//弹窗显示      
      selectedRowKeys: [],     
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      input:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        logName:'',//日志名称
        logType:undefined,//日志类型     
      }
    }
  }
//初始化列表
initColumns=()=>{
  this.columns =[
    {
      title:'日志类型',
      dataIndex:'logType',
      width:200,
      align:'center'
    },   
    {
      title:'日志名称',
      dataIndex:'logName',
      width:200,
      align:'center'
    },    
    {
      title:'用户名称',
      dataIndex:'name',
      width:200,
      align:'center',
    },
    {
      title:'时间',
      dataIndex:'createTime',
      width:200,
      align:'center'
    },  
    {
      title:'具体消息',
      dataIndex:'message',
      width:200,
      align:'center',
      ellipsis: true,
      textOverflow:'ellipsis',     
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },  
    {
      title:'操作',
      width:200,
      align:'center',
      render:(workLog) => (//render会把每一行日志数据的对象作为参数传入       
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>this.showDetail(workLog)}>查看详情</Button>          
      ),
    },  
  ];
}

//表格行选择
onSelectChange = selectedRowKeys => this.setState({ selectedRowKeys })


// 获取业务日志数据
getWorkLogs=()=>{  
  this.setState({loading:true}) 
  const {input,current,pageSize}=this.state; 
  let inputData={page:current, pageSize,}
  for(let item of Object.entries(input)){ 
    if(item[1]!=="") 
    inputData[item[0]]=item[1]
  } 
  queryWorkLog(inputData)
  .then((result)=>{
    this.setState({loading:false})    
    const data = result.data.data 
    const workLogs=data.info 
    for(const workLog of workLogs) workLog.key=workLog.worklogId
    this.setState( { workLogs,total:data.total } )
  })
  .catch(
    err=>message.info(`查询失败${err}`)
  )  
}
//表格行选择操作
onSelectChange = selectedRowKeys => this.setState({ selectedRowKeys });


//主页面表格页数变化
handTablechange = (pagination) =>{
  this.setState({ 
    current:pagination.current,
    pageSize:pagination.pageSize,    
  },()=>this.getWorkLogs()) 
}

//获取日志名称值
logNameChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{logName:e.target.value}),
  })
}

//获取时间
dateChange(value,dateString){  
  const startDate=dateString[0]
  const endDate=dateString[1]
  this.setState({
    input:Object.assign(this.state.input,{
      startDate,
      endDate})
  })
}
//获取日志类型
logTypeChange=(value)=>{
  if(value==="全部") value=""
  this.setState(
    {input:Object.assign(this.state.input,{logType:value})},
    ()=>this.getWorkLogs()
  )
}
//删除日志弹窗
deleteSelectedWorkLogs=()=>this.setState({visible:1})

//搜索
search=()=>this.getWorkLogs()

//查看详情
showDetail=(workLog)=>{  
  this.workLog=workLog
  this.setState({visible:2})
}
//日志类型
typeChange = (e) => {
  this.setState({
    input:Object.assign(this.state.input,{Logtype:e.target.value})
  })
}
//关闭弹窗
handleCancel=()=> this.setState({visible:0})

//删除日志请求
WorkLogsDelete=()=>{
  this.setState({ loading: true }); 
  deleteWorkLog(this.state.selectedRowKeys)
  .then((result)=>{
    message.info(result.data.msg,1.2)
    this.setState({ loading: false, visible:0 })
    this.getWorkLogs()
  })
  .catch(err=>message.info(`删除失败${err}`,[0.9])) 
}

componentWillMount(){
  this.initColumns()
}

componentDidMount(){
  this.getWorkLogs()
}
  render() {
    const { 
      selectedRowKeys,
      workLogs,
      visible,
      loading,      
      total} = this.state;   

    const workLog = this.workLog || {}//如果还没有，指定一个空对象

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
   
    return (
      <div style={{height:'100%'}}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>            
            <Col>
                <RangePicker 
                  locale={locale}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                  onChange={(value,dateString)=>{this.dateChange(value,dateString)}}                                         
                />
            </Col>
            <Col>
                <Input 
                  placeholder="日志名称"  
                  onChange={(e)=>this.logNameChange(e)}               
                  value={this.state.input.logName}                  
                >              
                </Input>
            </Col>
            <Col>
            <Select               
              style={{ width: 120 }}
              placeholder="日志类型" 
              value={this.state.input.logType}  
              onChange={this.logTypeChange}           
              dropdownStyle={{width:'300px'}}              
              >
                <Option value="">全部</Option>
                <Option value="业务日志">业务日志</Option>
                <Option value="异常日志">异常日志</Option>
            </Select>
            </Col>
            <Col span>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col span>
                <Button 
                  type="primary"
                  icon={<DeleteOutlined/> }
                  onClick={this.deleteSelectedWorkLogs}
                >
                  删除所选日志
                </Button>
            </Col>
            
            </Row>         
        </div>
        {/* 表格 */}
        <Table           
          columns={this.columns}
          dataSource={workLogs}
          rowKey={workLog=>workLog.operationLogId}
          bordered={true}
          expandable          
          style={{margin:'20px 0'}}
          pagination={{
            position: ['bottomLeft'] ,
            total:total,
            showTotal:total => `共 ${total} 条`,
            showQuickJumper:true,
            showSizeChanger:true,
            current:this.state.current,
            pageSize:this.state.pageSize,
          }}
          onChange={this.handTablechange}
          rowSelection={rowSelection}  
        />
         {/* 删除日志弹窗 */}
      <Modal 
          visible={visible===1}          
          title="信息"    
          onCancel={this.handleCancel}          
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.WorkLogsDelete}>
              提交
            </Button>,
            <Button name="delete" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否删除所选日志</p>         
        </Modal>
         {/* 查看详情弹窗 */}
      <Modal 
          visible={visible===2} 
          width={'1200px'}         
          title="日志详情"    
          onCancel={this.handleCancel}  
          footer={null} 
        >
          <p>{workLog.message}</p>         
        </Modal>
      </div>
    )
  }
}
