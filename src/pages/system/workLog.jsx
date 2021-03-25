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

const { RangePicker } = DatePicker;
const { Option } = Select;

//主页面表格数据
const data = [
  {   
    key: '0',     
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {
    key: '2',
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {    
    key: '3',    
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {
    key: '4',
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {    
    key: '5',    
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {
    key: '6',
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {      
    key: '7',  
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
  {
    key: '8',
    logType: '异常日志',
    logName: '异常日志',
    userName:'admin',
    className:'entity',
    methodName:'add',
    date:'2021-4-5 10:01:32',
    msg: 'error',
  },
];

export default class WorkLog extends Component {
  constructor(props){
    super(props)
    this.state = {
      workLogs:[],
      visible:0,//弹窗显示
      logType:["全部","异常日志","业务日志"],//日志类型
      selectedRowKeys: [],      
      paginationProps : {//分页栏参数    
        showQuickJumper:true,
        showSizeChanger:true,
      },
      input:{
        startDate:'',
        endDate:'',
        logName:'',
        logType:''        
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
      dataIndex:'userName',
      width:200,
      align:'center',
    },
    {
      title:'类名',
      dataIndex:'className',
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
      dataIndex:'date',
      width:200,
      align:'center'
    },  
    {
      title:'具体消息',
      dataIndex:'msg',
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
  //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
  this.setState(
    {selectedRowKeys:row}
  )
};

//获取日志数据
getWorkLogs=(logName,logType)=>{
  this.setState({loading:true})
  logName=logName||this.state.logName
  //const result = await reqlogs(logName)
  const result = setTimeout(()=>data,1000)
  this.setState({loading:false})    
  console.log("获取列表数据");  
  const worklogs = result         
  this.setState({worklogs})
}

onSelectChange = selectedRowKeys => {    
  this.setState({ selectedRowKeys });
};
//清空日志
empty=()=>{
  this.setState({visible:1})
}
//搜索
search=()=>{
  message.info('搜索中')
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
    input:Object.assign(this.state.input,{type:e.target.value}),
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
  this.getWorkLogs()
}
 

  render() {
    const { selectedRowKeys,visible,loading,logType} = this.state;   
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
                  onChange={this.typeChange}
                  value={this.state.card_type}
                  className="input2"
                >              
                </Input>
            </Col>
            <Col>
            <Select 
              placeholder="日志类型"   
              onChange={this.typeChange}              
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
          dataSource={data}
          bordered={true}
          style={{margin:'20px 0'}}
          pagination={ this.state.paginationProps}
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
          footer={[            
            <Button key="submit" type="primary" loading={loading} onClick={this.handleShow}>
              提交
            </Button>,
            <Button name="delete" key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          ]}
        >
          <p>{worklog.msg}</p>         
        </Modal>
      </div>
    )
  }
}
