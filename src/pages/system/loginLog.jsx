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
import {queryLoginLog,deleteLoginLog} from '../../api/sysManageIndex'
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class LoginLog extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginLogs:[],
      visible:0,//弹窗显示      
      selectedRowKeys: [],     
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      input:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        logName:'',//日志名称   
      }
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
      dataIndex:'account',      
      align:'center'
    },    
    {
      title:'时间',
      dataIndex:'createTime',      
      align:'center',
    },
    {
      title:'具体消息',
      dataIndex:'message',      
      align:'center',
    },
    {
      title:'ip',
      dataIndex:'ipAddress',      
      align:'center'
    }, 
  ];
  }

//主页面表格页数变化
handTablechange = (pagination) =>{
  this.setState({ 
    current:pagination.current,
    pageSize:pagination.pageSize,    
  },()=>{
    this.getLoginLogs()
  }) 
};

//表格行选择
onSelectChange = row => this.setState({selectedRowKeys:row})

//获取日志数据
getLoginLogs=()=>{
  this.setState({loading:true}) 
  const {input,current,pageSize}=this.state; 
  let inputData={page:current, pageSize,}
  for(let item of Object.entries(input)){ 
    if(item[1]!=="") 
    inputData[item[0]]=item[1]
  } 
  queryLoginLog(inputData)
  .then((result)=>{
    this.setState({loading:false})    
    const data = result.data.data 
    const loginLogs=data.info 
    for(const loginLog of loginLogs) loginLog.key=loginLog.loginlogId
    this.setState({loginLogs,total:data.total})
  })
  .catch(err=>{message.info(`查询失败${err}`)})  
}

//获取时间
dateChange(value,dateString){  
  const startDate=dateString[0]
  const endDate=dateString[1]
  this.setState({
    input:Object.assign(this.state.input,{startDate,endDate})
  })
}

//获取日志名称值
logNameChange(e){ 
  this.setState({
    input:Object.assign(this.state.input,{logName:e.target.value})
  }) 
}

  //搜索
search=()=>this.getLoginLogs()

//删除日志弹窗
deleteSelectedWorkLogs=()=>this.setState({visible:1})

//删除日志请求
LoginLogsDelete=()=>{
  this.setState({ loading: true }); 
  deleteLoginLog(this.state.selectedRowKeys)
  .then((result)=>{
    this.setState({ loading: false, visible:0 });
    message.info(result.data.msg,1.2)
    this.setState({ loading: false, visible:0 })
    this.getLoginLogs()
  })
  .catch(err=>{
    message.info(`删除失败${err}`,1.2)
    this.setState({ loading: false, visible:0 })
  }) 
}

//关闭弹窗
handleCancel=()=>this.setState({visible:0})

componentWillMount(){
  this.initColumns()
}

componentDidMount(){
  this.getLoginLogs()
} 

  render() {
    const { 
      selectedRowKeys,
      loading,
      visible,
      loginLogs,
      total} = this.state;
      
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
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col>
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
          dataSource={loginLogs}
          rowKey={loginLog=>loginLog.loginLogId}
          bordered={true}
          style={{margin:'20px 0',borderBottom:'1px,soild'}}
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
          visible={visible}          
          title="信息"    
          onCancel={this.handleCancel}          
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.LoginLogsDelete}>
              提交
            </Button>,
            <Button name="delete" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>是否删除所选日志</p>         
        </Modal>
      </div>
    )
  }
}
