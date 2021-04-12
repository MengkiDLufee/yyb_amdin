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
import {queryWorkLog,emptyWorkLog} from '../../api/index'

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class WorkLog extends Component {
  constructor(props){
    super(props)
    this.state = {
      workLogs:[],
      visible:0,//弹窗显示
      logType:["全部","异常日志","业务日志"],//日志类型
      selectedRowKeys: [],     
      total:null,//数据总条数
      current:1,//当前页数
      pageSize:10,//当前页面条数
      input:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        nickName:'',//日志名称
        logType:'',//日志类型     
      }
    }
  }
//初始化列表
initColumns=()=>{
  this.columns =[
    {
      title:'日志类型',
      dataIndex:'clientId',
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
      dataIndex:'userName',
      width:200,
      align:'center',
    },
    {
      title:'类名',
      dataIndex:'nickName',
      width:200,
      align:'center',
    },
    {
      title:'方法名',
      dataIndex:'methodName',
      width:200,
      align:'center'
    },  
    {
      title:'时间',
      dataIndex:'regTime',
      width:200,
      align:'center'
    },  
    {
      title:'具体消息',
      dataIndex:'hasBearing',
      width:200,
      align:'center'
    },  
    {
      title:'操作',
      width:200,
      align:'center',
      render:(worklog) => (//render会把每一行日志数据的对象作为参数传入       
            <Button size="small" style={{color:'black',background:'white'}} onClick={()=>this.showDetail(worklog)}>查看详情</Button>          
      ),
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
  //setState为异步操作，
  //若在this.setState函数外获取，则仍是赋值之前的值，没有改变
  this.setState(
    {selectedRowKeys:row}
  )
};
// 获取业务日志数据
getWorkLogs=()=>{  
  this.setState({loading:true}) 
  const {input,current,pageSize}=this.state; 
  queryWorkLog({
    page:current,
    pageSize,
    nickName:input.nickName}).then((result)=>{
    this.setState({loading:false})    
  console.log("获取列表数据") 
  console.log(result) 
  const data = result.data.data      
  this.setState({
    workLogs:data.info,
    total:data.total,
  })
  })   
}
//表格行选择操作
onSelectChange = selectedRowKey => {
  //setState为异步操作，
  //若在this.setState函数外获取，则仍是赋值之前的值，没有改变
  this.setState(
    {selectedRowKeys:selectedRowKey},
    ()=>{console.log('所选择行',this.state.selectedRowKeys)}
  )
};
/* //主页面表格页数变化
handTablechange = (pagination) =>{
  console.log(pagination,pagination.current,pagination.pageSize);
  console.log(this.state.current,this.state.pageSize); 
  queryWorkLog({
    page:pagination.current,
    pageSize:pagination.pageSize,
  }).then(res=>{    
    console.log(res.data.data.info)
    this.setState({ 
      current:pagination.current,
      pageSize:pagination.pageSize,
      workLogs:res.data.data.info,
    })
  })
}; */
//主页面表格页数变化
handTablechange = (pagination) =>{
  this.setState({ 
    current:pagination.current,
    pageSize:pagination.pageSize,    
  }) 
  this.getWorkLogs()
};
//获取日志名称值
logNameChange(e){  
  this.setState({
    input:Object.assign(this.state.input,{nickName:e.target.value}),
  })
}

//清空日志
empty=()=>{
  this.setState({visible:1})
}
//搜索
search=()=>{  
  message.info('搜索成功');
  //请求表格数据
 console.log(this.state.input);
 this.getWorkLogs();
}
//查看详情
showDetail=(worklog)=>{  
  this.worklog=worklog
  console.log(this.worklog);  
  this.setState({visible:2})
}
//日志类型
typeChange = (e) => {
  console.log(e.target.value)
  this.setState({
    input:Object.assign(this.state.input,{Logtype:e.target.value}),
  })
}
//关闭弹窗
handleCancel=()=>{
  this.setState({visible:0})
}

componentWillMount(){
  this.initColumns()
}

componentDidMount(){
  // this.getWorkLogs()
  //请求表格数据
  queryWorkLog({
    page:1,
    pageSize:10
  }).then(res=>{
    var data=res.data.data.info;
    console.log(data)    
    this.setState({
      workLogs:data,
      total:res.data.data.total,
    })
  })
}
  render() {
    const { 
      selectedRowKeys,
      workLogs,
      visible,
      logType,
      loading,      
      total} = this.state;   
    const worklog = this.worklog || {}//如果还没有，指定一个空对象
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };  
   
    return (
      <div style={{height:'100%'}}>
        {/* 搜索栏 */}
        <div style={{'margin':'0 0 15px  0'}}>
            <Row gutter={{xs:8,sm:16,md:24,lg:32}}>            
            <Col>
                <RangePicker 
                  locale={locale}                                        
                />
            </Col>
            <Col>
                <Input 
                  placeholder="日志名称"  
                  onChange={(e)=>this.logNameChange(e)}               
                  value={this.state.input.nickName}                  
                >              
                </Input>
            </Col>
            <Col>
            <Select 
              placeholder="日志类型"   
              value={this.state.input.logType}              
              dropdownStyle={{width:'300px'}}
              allowClear 
            >
                {
                  logType.map(worklog=>{
                    return <Option key={worklog.id} value={worklog.id}>{worklog}</Option>
                  })
                }
            </Select>
            </Col>
            <Col span>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="button3"
                  onClick={this.search}
                >
                  搜索
                </Button>
            </Col>
            <Col span>
                <Button 
                  type="primary"
                  icon={<DeleteOutlined/> }
                  className="button3"
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
          dataSource={workLogs}
          bordered={true}
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
         {/* 清空日志弹窗 */}
      <Modal 
          visible={visible===1}          
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
         {/* 查看详情弹窗 */}
      <Modal 
          visible={visible===2}          
          title="日志详情"    
          onCancel={this.handleCancel}  
          footer={null} 
        >
          <p>{worklog.userName}</p>         
        </Modal>
      </div>
    )
  }
}
