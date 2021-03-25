import React, { Component } from 'react'
import { 
        Table,
        Button, 
        Input, 
        Select, 
        Space,
        Modal,
        Form,
        DatePicker,
        Radio,
        message,
      } from 'antd';
import {
        ReloadOutlined,
        SearchOutlined ,
        PlusOutlined, 
        CloudUploadOutlined, 
        CloudDownloadOutlined,
        CheckCircleOutlined,
        CloseCircleOutlined
        } from '@ant-design/icons'
import './index.less' //引入样式
import moment from 'moment';
import {
  devList,//表格数据
  exportFile,//导入
  devAdd,//添加
  devModify,//修改
  devHistoryUser,//设备历史使用人员
  } from '../../api/index'
import ImportFile from '../../compenents/importfile'

const { Option } = Select;
const { TextArea } = Input;




 //主页面表格数据
  // const data = [];
  // for (let i = 0; i < 46; i++) {
  //   if(i%2 !== 0)
  //   {data.push({
  //     key: i,
  //     dev_code: `123123123${i}`,
  //     dev_num: `设备 ${i}`,
  //     on: 0,
  //     used:0,
  //     type:1,
  //     status :0,
  //     share :0,
  //   });} else {
  //     data.push({
  //       key: i,
  //       dev_code: `123123123${i}`,
  //       dev_num: `设备 ${i}`,
  //       on: 1,
  //       used:1,
  //       type:0,
  //       status :1,
  //       share :1,
  //     });
  //   }
  // }
//使用人员弹窗表格数据
const data_user = [];
for (let i = 0; i < 33; i++) {
  if(i%2 !== 0)
  {data_user.push({
    key: i,
    user_name: `123123123${i}`,
    ed_type: `家庭版`,
    on_use: '是',
    bind_time:'2020-04-14',
    stop_time:`2020-10-10`,
  });} else {
    data_user.push({
      key: i,
      user_name: `123123${i}`,
      ed_type: `专业版`,
      on_use: '否',
      bind_time:'2019-11-11',
      stop_time:`2020-11-11`,
    });
  }
}

function transformData(data){
  let newData=[];
  for(let i = 0;i<data.length;i++){
    let newItem = {};
    newItem.key = data[i].deviceId;
    newItem.deviceId = data[i].deviceId;//设备id
    newItem.dev_code = data[i].deviceCode;//设备码
    newItem.dev_num = data[i].deviceNo;//设备号
    newItem.on = data[i].available;//激活
    newItem.used = data[i].active;//已用
    newItem.type = data[i].target;//类型
    newItem.status = data[i].status;//状态
    newItem.share = data[i].shared;//共享
    newItem.bluetooth = data[i].blePassword;//蓝牙密码
    newItem.correct = data[i].adjust;//矫正倍数
    newItem.hard_ed = data[i].hardwareVersion;
    newItem.soft_ed = data[i].softareVersion;
    newItem.refresh_time = data[i].renewalTime;
    newItem.time = data[i].activeTime;
    newItem.remark = data[i].memo;
    newData.push(newItem);
  }
  // console.log(newData)
  return newData;
}

function transformHistoryData(data) {
  let newData = []
  for (let i = 0; i < data.length; i++) {
    let dataItem  = {};
    dataItem.key = i;
    dataItem.user_name = data[i].userName;
    dataItem.ed_type = data[i].appType;
    dataItem.on_use = data[i].userFlag;
    dataItem.bind_time = data[i].bindTime;
    dataItem.stop_time = data[i].unbindTime;
    newData.push(dataItem);
  }
  return newData
}


export default class DeviceManagement extends Component {

  constructor(props){
    super(props);
    this.state = { 
      data:[],
      data_user:[],
      visible:false,
      visible_add: false ,
      visible_modify :false,
      visible_user :false,
      visible_import:false,
      selectedRowKeys: [], // Check here to configure the default column
      //主页面表格
      paginationProps: {
          total:'',//数据总条数
          current:1,//当前页数
          pageSize:10,//当前页面条数
      },
      paginationProps_user : {//使用人员分页栏参数
          total:'',
          current:1,
          pageSize:10,
      },
      devCode:undefined,//历史人员弹窗中的设备码
      //输入选择框的值
      input:{
        devCode:'',
        active:undefined,
        type:undefined,
        state:undefined,
      },
  
      //修改弹窗
      modal:{
        dev_id:'',//设备id
        dev_code:'',//设备码
        dev_num:'',//设备号
        hard_ed:'',//硬件版本
        soft_ed:'',//软件版本
        refresh_time:undefined,//软件更新时间
        bluetooth:'',//蓝牙密码
        is_valid:null,//是否可用
        is_on:null,//是否激活
        is_share:null,//是否共享
        correct:1,//矫正倍数
        time:undefined,//激活时间
      },
      justify_modal:null,
    }
    //参数设置
    this.onSelectChange = this.onSelectChange.bind(this);
    
  /*表单验证
    Form.useForm是是 React Hooks 的实现，只能用于函数组件
    class组件中通过 React.createRef()来获取数据域
  */
  this.form = React.createRef();
  this.form_modify = React.createRef();
  }

  

//表格栏
 columns = [
    {
      title: '设备码',
      dataIndex: 'dev_code',
      width: 150,
      align:'center',
    },
    {
      title: '设备号',
      dataIndex: 'dev_num',
      width: 150,
      align:'center',
    },
    {
      title: '激活',
      key:'on',
      dataIndex: 'on',
      width: 100,
      align:'center',
      render: on =>{
          if (on === '1') {
            return (<CheckCircleOutlined className='check-icon' />)
          } else if(on === '0') {
            return (<CloseCircleOutlined className='close-icon' />)
          }
        }
      },

    {
      title: '已用',
      dataIndex: 'used',
      width: 100,
      align:'center',
      render: used =>{
        if (used === '1') {
          return (<CheckCircleOutlined className='check-icon' />)
        } else if(used === '0') {
          return (<CloseCircleOutlined className='close-icon' />)
        }
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 150,
      align:'center',
      render: type => {
        if (type === 'device_normal'){
          return ('正常')
        } else if (type === 'device_testing'){
          return ('测试')
        }else if (type === 'eupregna') {
          return ('优孕保')
        }else if (type === 'eupregna_testing') {
          return ('优孕保测试')
        }else if (type === 'professional_normal') {
          return ('专业正常')
        }else if (type === 'professional_testing') {
          return ('专业测试')
        }else if (type === 'research') {
          return ('研究')
        }else if (type === 'other') {
          return ('其他')
        }else if (type === 'other_test') {
          return ('其他测试')
        } else {
          return null
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      align:'center',
      render: status => {
        if (status==='no_test'){
          return ('未测试')
        } else if (status === 'pass'){
          return ('测试通过')
        } else if (status === 'no_pass'){
          return ('测试未通过')
        } else if (status ==='repair'){
          return ('返修')
        } else if (status === 'cannot_use'){
          return ('存在故障,完全无法使用')
        } else if (status === 'use_no_testvalue'){
          return ('存在故障，可用但影响测试值')
        } else if (status === 'temporary_use'){
          return ('存在故障，可临时用')
        } else if (status === 'discard'){
          return ('废弃')
        } else {
          return null
        }
      }
    },
    {
      title: '共享',
      dataIndex: 'share',
      width: 100,
      align:'center',
      render: share =>{
        if (share === '1') {
          return (<CheckCircleOutlined className='check-icon'/>)
        } else if(share === '0') {
          return (<CloseCircleOutlined className='close-icon' />)
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align:'center',
      width: 150,
      fixed:'right',
      render:(text,record) => (
        <Space >
        <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify(record)}}>修改</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.delete(record)}}>删除</Button>
        <Button size="small" style={{color:'white',background:'#ff5621'}} onClick={()=>{this.user(record)}} >使用人员</Button>
        </Space>
      ),
    }
  ];
  //使用人员表格栏
columns_user = [
  {
    title: '用户名',
    dataIndex: 'user_name',
    width: 150,
    align:'center',
  },
  {
    title: '使用版本类型',
    dataIndex: 'ed_type',
    width: 150,
    align:'center',
  },
  {
    title: '正在使用',
    dataIndex: 'on_use',
    width: 150,
    align:'center',
  },
  {
    title: '绑定时间',
    dataIndex: 'bind_time',
    width: 150,
    align:'center',
  },
  {
    title: '终止时间',
    dataIndex: 'stop_time',
    width: 150,
    align:'center',
  },
];


//加载列表数据
loadList =  ()=>{
  devList({page:1,pageSize:10}).then(
    res => {
      console.log(res)
      let data = transformData(res.data.data.info)
      let paginationProps = Object.assign(this.state.paginationProps,{total:res.data.data.total})
      this.setState({
        data,
        paginationProps
      })
    }
  )
}
//组件挂载时请求数据
componentDidMount(){
  this.loadList()
}
  //表格行选择
  onSelectChange = row => {
    console.log('所选择行',row)
    //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
    this.setState(
      {selectedRowKeys:row}
    )
  };

//客户输入框
  devCodeChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input:Object.assign(this.state.input,{devCode:e.target.value}),
    })
  }
 //选择框
  selectChange =(e,Option) => {
      // console.log(e)
      // console.log(Option)
      this.setState({
        input:Object.assign(this.state.input,{[Option.name]:e})
      })
    }
  //搜索
  search = () =>{
    console.log('搜索',this.state.input)
    let params = {page:1,pageSize:10}
    let {devCode, active, type, state} = this.state.input
    if (devCode !== '') {
      params.deviceCode = devCode
    } 
    if (active !== undefined) {
      params.available = active
    } 
    if (type !== undefined) {
      params.target = type
    } 
    if (state !== undefined) {
      params.status = state
    }
    console.log(params)
    devList(params).then(
      res => {
        console.log(res)
        let data = transformData(res.data.data.info)
        let paginationProps = Object.assign(this.state.paginationProps,{total:res.data.data.total})
        this.setState({
          data,
          paginationProps
        })
      }
    )
  };
  //重置
  reset = () => {
    console.log('重置')
    let input = Object.assign(this.state.input,{
      devCode:'',
      active:undefined,
      type:undefined,
      state:undefined,
    })
    this.setState({
        selectedRowKeys:[],
        input,
      })
    //重载数据
    this.loadList()
  };
  //添加
  add =() =>{
    console.log('添加',this.form)
    this.setState({
      visible_add: true,
    });
  };
  //点击添加完成
  handleOk_add = () => {
    console.log('添加完成')
    console.log(this.form)
    let form = this.form.current;
    form.validateFields()//表单输入校验
      .then((values) => {
        form.resetFields();//清空表单内容
        console.log(values)
        this.setState({
          visible_add:false
        })
        let reg = /^\d/
        let params = {}
        params.deviceCode = values.add_dev_code
        params.deviceNo = values.add_dev_code.replace(reg,'adx')
        params.adjust = values.add_correct
        if (values.add_bluetooth !== undefined) {
          params.blePassword = values.add_bluetooth
        }
        if (values.add_hard_ed !== undefined) {
          params.hardwareVersion = values.add_hard_ed
        }
        if (values.add_is_on !== undefined) {
          params.available = values.add_is_on
        }
        if (values.add_is_share !== undefined) {
          params.shared = values.add_is_share
        }
        if (values.add_is_valid !== undefined) {
          params.active = values.add_is_valid
        }
        if (values.add_refresh_time !== undefined) {
          params.renewalTime =moment(values.add_refresh_time).format('YYYY-MM-DD HH:mm:ss') 
        }
        if (values.add_remark !== undefined) {
          params.memo = values.add_remark
        }
        if (values.add_soft_ed !== undefined) {
          params.softareVersion = values.add_soft_ed
        }
        if (values.add_status !== undefined) {
          params.status = values.add_status
        }
        if (values.add_time !== undefined) {
          params.activeTime = moment(values.add_time).format('YYYY-MM-DD HH:mm:ss') 
        }
        if (values.add_type !== undefined) {
          params.target = values.add_type
        }
        console.log(params)
        devAdd(params).then(
          () => {
          // console.log(res)
          this.loadList()
          message.success('添加成功！')
        }
        )
        //重载数据
        
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });


  };
  //添加关闭
  handleCancel_add = () => {
    this.setState({
      visible_add: false,
    });
    let form = this.form.current;
    form.resetFields();//清空表单内容
    console.log('添加关闭')
  };

  //导入
  importStatic = () =>{
    console.log('导入')
    this.setState({
      visible_import:true,
    })
  };
  handleCancel_import = () => {
    this.setState({
      visible_import:false,
    })
  }
  //导出已选择数据
  exportChoose = () =>{
    console.log('导出已选择数据',this.state.selectedRowKeys)
  };
  //按搜索条件导出
  exportSearch = () =>{
    console.log('按搜索条件导出',this.state.input)
    // exportFile('http://java.xixibackup.me:8080/device/manage/info/export/condition',{})
    // exportFile('/device/manage/info/export/condition',{})
    exportFile('/device/manage/info/export/choose',[2048])
  };
  //修改
  modify = (record)=> {
    console.log('修改',record,this.state.modal)
    // console.log(this.form_modify.current)
    let modal = Object.assign(this.state.modal,{dev_id:record.deviceId})
    this.setState({
      visible_modify:true,
      modal,
    })
    let form_modify=this.form_modify.current;
    if(this.form_modify.current){
        form_modify.setFieldsValue({
            dev_id:record.deviceId,
            dev_code:record.dev_code,
            dev_num:record.dev_num,
            is_valid:record.used,
            is_on:record.on,
            is_share:record.share,
            hard_ed:record.hard_ed,
            soft_ed:record.soft_ed,
            bluetooth:record.bluetooth,
            refresh_time:record.refresh_time ? moment(record.refresh_time,'YYYY/MM/DD') : undefined,
            time:record.time ? moment(record.time,'YYYY-MM-DD') : undefined,
            status:record.status,
            type:record.type,
            correct:record.correct,
            remark:record.remark
        })
    }

  };
  //完成修改
  handleOk_modify = () => {
    // console.log(this.form_modify)
    let form = this.form_modify.current;
    form.validateFields()//表单输入校验
      .then((values) => {
        // form.resetFields();
        console.log(values)
        this.setState({
          visible_modify:false
        })
        let params = {}
        params.deviceId = this.state.modal.dev_id
        params.deviceCode = values.dev_code
        params.deviceNo = values.dev_num
        params.adjust = values.correct
        if (values.bluetooth !== undefined) {
          params.blePassword = values.bluetooth
        }
        if (values.hard_ed !== undefined) {
          params.hardwareVersion = values.hard_ed
        }
        if (values.is_on !== undefined) {
          params.available = values.is_on
        }
        if (values.is_share !== undefined) {
          params.shared = values.is_share
        }
        if (values.is_valid !== undefined) {
          params.active = values.is_valid
        }
        if (values.refresh_time !== undefined) {
          params.renewalTime =moment(values.refresh_time).format('YYYY-MM-DD HH:mm:ss') 
        }
        if (values.remark !== undefined) {
          params.memo = values.remark
        }
        if (values.soft_ed !== undefined) {
          params.softareVersion = values.soft_ed
        }
        if (values.status !== undefined) {
          params.status = values.status
        }
        if (values.time !== undefined) {
          params.activeTime = moment(values.time).format('YYYY-MM-DD HH:mm:ss') 
        }
        if (values.type !== undefined) {
          params.target = values.type
        }
        console.log(params)
        devModify(params).then(() => {
            this.loadList()//重载数据
            message.success('修改成功！')
          }
        )
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  //关闭修改
  handleCancel_modify = () =>{
    this.setState({
      visible_modify:false,
    })
    console.log('修改弹窗关闭')
  };
  //修改弹窗中输入框变化
  modify_inputChange = (e) => {
    let name = e.target.name;
    console.log(name)
    this.setState({
      modal:Object.assign(this.state.modal,{[e.target.name]:e.target.value})
    })
  }
  //时间选择框变化
  time_change = (date,dateString) => {
    // console.log(date,dateString)
    console.log(moment(date).format('YYYY-MM-DD HH:mm:ss'))
  }


  //删除
  delete = (record) =>{
    console.log('删除',record)
    const deleteData = [...this.state.data];
    deleteData.forEach((item,index) => {
      if(item.key===record.key){
          deleteData.splice(index,1)
      }
  })
  
  this.setState({
      data:deleteData,
  },()=> console.log(this.state.data))

  };
  //使用人员按钮
  user = (record) => {
    console.log('使用人员',record)
    let { current, pageSize } = this.state.paginationProps_user
    let params = {
      deviceId: record.deviceId,
      page:current,
      pageSize,
    }
    console.log(params)
    devHistoryUser(params).then(res=> {
      console.log(res.data.data)
      

        let data_user = transformHistoryData(res.data.data.info)
        console.log(data_user,res.data.data.info.length)
        this.setState({
          visible_user:true,
          devCode:record.dev_code,
          data_user,
        })

      

    })

  };
  //使用人员弹窗关闭
  handleCancel_user = () =>{
    this.setState({
      visible_user:false,
      devCode:undefined,
    })
  }

//主页面表格翻页
  handTablechange = (pagination) =>{

    // let paginationProps = Object.assign(this.state.paginationProps,{
    //   current:pagination.current,
    //   pageSize:pagination.pageSize
    // })
    // this.setState({
    //   paginationProps
    // })
    let params = {};
    let {devCode, active, type, state} = this.state.input
    params.page = pagination.current;
    params.pageSize = pagination.pageSize;    
    if (devCode !== '') {
      params.deviceCode = devCode
    } 
    if (active !== undefined) {
      params.available = active
    } 
    if (type !== undefined) {
      params.target = type
    } 
    if (state !== undefined) {
      params.status = state
    }
    devList(params).then(
      res => {
        // console.log(res)
        let data = transformData(res.data.data.info)
        let paginationProps = Object.assign(this.state.paginationProps,{
          total:res.data.data.total,
          current:pagination.current,
          pageSize:pagination.pageSize
        })
        this.setState({
          data,
          paginationProps
        })
      }
    )
  };
  //使用人员表格变化
  handTablechange_user = (pagination) =>{
    console.log(pagination)
    let { current, pageSize } = pagination
    let paginationProps_user = Object.assign(this.state.paginationProps_user,{
      current,
      pageSize
    })
    let params = {
      pageSize,
      page:current,
      deviceId:this.state.modal.dev_id
    };
    console.log(params)
    devHistoryUser(params).then(res=> {
      let data_user = transformHistoryData(res.data.data.info)
      this.setState({
        paginationProps_user,
        data_user,
      })
    })
  };



  onFinish = (values) => {
    console.log('Success:', values);
    this.setState({
      justify_modal:0,
    })
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    this.setState({
      justify_modal:1,
    })
  };


  

    render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys:selectedRowKeys,
        onChange: this.onSelectChange,
      };
      const {total ,current, pageSize} = this.state.paginationProps
      // const [form] = Form.useForm();

        return (
            <div style={{height:"100%"}}>
              {/* 输入框等 */}
              <div style={{'margin':'0 0 15px  0'}} >
                <div justify="space-between" gutter="15" style={{display:"flex" }}  >
                  <Input  
                    placeholder="设备码" 
                    className="input1" 
                    onChange={this.devCodeChange} 
                    value={this.state.input.devCode} 
                  />
                  <Select 
                    placeholder="请选择激活状态 "  
                    onChange={this.selectChange} 
                    className="input1" 
                    value={this.state.input.active}
                  >
                    <Option name="active" value="1">已激活</Option>
                    <Option name="active" value="0">未激活</Option>
                  </Select>

                  <Select 
                    placeholder="请选择类型 "  
                    onChange={this.selectChange} 
                    className="input1" 
                    value={this.state.input.type}
                  >
                    <Option name="type" value="device_normal">正常</Option>
                    <Option name="type" value="device_testing">测试</Option>
                    <Option name="type" value="eupregna">优孕保</Option>
                    <Option name="type" value="eupregna_testing">优孕保测试</Option>
                    <Option name="type" value="professional_normal">专业正常</Option>
                    <Option name="type" value="professional_testing">专业测试</Option>
                    <Option name="type" value="research">研究</Option>
                    <Option name="type" value="other">其他</Option>
                    <Option name="type" value="other_test">其他测试</Option>
                  </Select>
                  <Select 
                    placeholder="请选择状态 " 
                    onChange={this.selectChange} 
                    className="input1" 
                    value={this.state.input.state}
                    >
                    <Option name="state" value="no_test">未测试</Option>
                    <Option name="state" value="pass">测试通过</Option>
                    <Option name="state" value="no_pass">测试未通过</Option>
                    <Option name="state" value="repair">返修</Option>
                    <Option name="state" value="cannot_use">存在故障,完全无法使用</Option>
                    <Option name="state" value="use_no_testvalue">存在故障，可用但影响测试值</Option>
                    <Option name="state" value=" temporary_use">存在故障，可临时用</Option>
                    <Option name="state" value="discard">废弃</Option>
                  </Select>

                  <Button 
                    type="primary" 
                    icon={<SearchOutlined className="icon1" />}
                    onClick={this.search} 
                    className="button1"
                    >
                    搜索
                  </Button>

                  <Button 
                    type="primary" 
                    icon={<ReloadOutlined className="icon1" /> }
                    onClick={this.reset} 
                    className="button1"
                    >
                      重置
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined  className="icon1" />} 
                    onClick={this.add}
                    className="button1"
                  >
                    添加
                  </Button>

                  <Button 
                    type="primary" 
                    icon={<CloudUploadOutlined className="icon1" />} 
                    onClick={this.importStatic}
                    className="button1"
                  >
                    导入
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<CloudDownloadOutlined className="icon1" />} 
                    onClick={this.exportChoose}
                    className="button2"
                  >
                    导出已选择数据
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<CloudDownloadOutlined className="icon1" />}    
                    onClick={this.exportSearch}
                    className="button2"
                  >
                    按检索条件导出
                  </Button>
                </div>
              </div>

              {/* 表格 */}
              <div style={{height:"100%"}}>
                <Table 
                  columns={this.columns} 
                  dataSource={this.state.data} 
                  bordered={true} 
                  rowSelection={rowSelection}
                  style={{margin:'20px 0',borderBottom:'1px,soild'}}
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
                  // size="middle"
                />
              </div>
              {/* 添加弹窗 */}
              <Modal
                title="添加"
                centered
                visible={this.state.visible_add}
                onOk={this.handleOk_add}
                okText="确定"
                onCancel={this.handleCancel_add}
                cancelText="关闭"
                className="modal1"
                width="700"
                forceRender={true}
              >
              <div className="modal-body" style={{height:"550px"}}>
                    <Form
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 16 }}
                      layout="horizontal"
                      ref={this.form}//表单验证，通过ref获取
                    >
                    <Form.Item 
                      label="设备码"
                      name="add_dev_code"
                      rules={[
                        {required:'true',message:'请输入设备码'}
                      ]}
                    >
                      <Input 
                      value={this.state.modal.dev_code} 
                      name="dev_code"
                      />
                    </Form.Item>
                    <Form.Item 
                      label="硬件版本"
                      name="add_hard_ed"
                      initialValue="1.0"
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                      label="软件版本"
                      name="add_soft_ed"
                      initialValue="1.0"
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                      label="软件更新时间"
                      name="add_refresh_time"
                    >
                      <DatePicker 
                        onChange={this.time_change} 
                        style={{width:368}}
                      />
                    </Form.Item>
                    <Form.Item
                      label="蓝牙密码"
                      name="add_bluetooth"
                    >
                      <Input
                        name="bluetooth"
                        />
                    </Form.Item>
                    <Form.Item 
                      label="是否可用" 
                      name="add_is_valid"
                      initialValue={1}
                    >
                      <Radio.Group >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item 
                      label="是否激活"
                      name="add_is_on" 
                      initialValue={1}
                    >
                      <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="激活时间"
                      name="add_time"
                    >
                        <DatePicker 
                        onChange={this.time_change} 
                        format='YYYY/MM/DD'//指定日期显示样式
                        style={{width:368}}
                        />
                    </Form.Item>
                    <Form.Item 
                      label="是否共享"
                      name="add_is_share" 
                      initialValue={1}
                    >
                      <Radio.Group >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="矫正倍数"
                      name="add_correct"
                      rules={[
                        {required:true,message:'请输入矫正倍数！'}
                      ]}
                      initialValue="1.0"//默认值
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                      label="类型"
                      name="add_type"
                    >
                      <Select placeholder="请选择类型！">
                        <Option name="type" value="device_normal">正常</Option>
                        <Option name="type" value="device_testing">测试</Option>
                        <Option name="type" value="eupregna">优孕保</Option>
                        <Option name="type" value="eupregna_testing">优孕保测试</Option>
                        <Option name="type" value="professional_normal">专业正常</Option>
                        <Option name="type" value="professional_testing">专业测试</Option>
                        <Option name="type" value="research">研究</Option>
                        <Option name="type" value="other">其他</Option>
                        <Option name="type" value="other_test">其他测试</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="状态"
                      name="add_status"
                    >
                      <Select placeholder="请选择状态！" >
                        <Option name="state" value="no_test">未测试</Option>
                        <Option name="state" value="pass">测试通过</Option>
                        <Option name="state" value="no_pass">测试未通过</Option>
                        <Option name="state" value="repair">返修</Option>
                        <Option name="state" value="cannot_use">存在故障,完全无法使用</Option>
                        <Option name="state" value="use_no_testvalue">存在故障，可用但影响测试值</Option>
                        <Option name="state" value=" temporary_use">存在故障，可临时用</Option>
                        <Option name="state" value="discard">废弃</Option>
                      </Select>
                    </Form.Item>
                    
                    <Form.Item
                      label="备注"
                      name="add_remark"
                    >
                      <TextArea 
                        placeholder="备注信息" 
                        autoSize={{minRows:2,maxRows:6}}
                      />
                    </Form.Item>
                    </Form>
                  </div>
              </Modal>
              {/* 修改弹窗 */}i
              <Modal
                title="修改"
                centered
                visible={this.state.visible_modify}
                onOk={this.handleOk_modify}
                okText="确定"
                onCancel={this.handleCancel_modify}
                cancelText="关闭"
                forceRender={true}
              >
                <div className="ant-modal-body">
                  <div className="modal-body" style={{height:"500px"}}>
                    <Form
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 16 }}
                      layout="horizontal"
                      ref={this.form_modify}
                    >
                      <Form.Item 
                        label="设备码"
                        name="dev_code"
                        rules={[
                          {required:'true',message:'请输入设备码'}
                        ]}
                      >
                        <Input 
                        value={this.state.modal.dev_code} 
                        onChange={this.modify_inputChange} 
                        name="dev_code"
                        disabled={true}
                        />
                      </Form.Item>
                      <Form.Item 
                        label="设备号"
                        name="dev_num"
                        rules={[
                          {required:true,message:'请输入设备号！'}
                        ]}
                      >
                        <Input 
                          value={this.state.modal.dev_num} 
                          onChange={this.modify_inputChange} 
                          name="dev_num"
                          disabled={true}
                        />
                      </Form.Item>
                      <Form.Item 
                        label="硬件版本"
                        name="hard_ed"
                      >
                        <Input  
                          value={this.state.modal.hard_ed} 
                          onChange={this.modify_inputChange}
                          name="hard_ed"
                        />
                      </Form.Item>
                      <Form.Item
                        label="软件版本"
                        name="soft_ed"
                      >
                        <Input  
                          value={this.state.modal.soft_ed} 
                          onChange={this.modify_inputChange}
                          name="soft_ed"
                        />
                      </Form.Item>
                      <Form.Item
                        label="软件更新时间"
                        name="refresh_time"
                      >
                        <DatePicker 
                          onChange={this.time_change} 
                          style={{width:282}}
                          format='MM/DD/YYYY'//指定日期显示样式
                        />
                      </Form.Item>
                      <Form.Item
                        label="蓝牙密码"
                        name="bluetooth"
                      >
                        <Input   
                          value={this.state.modal.bluetooth} 
                          onChange={this.modify_inputChange}
                          name="bluetooth"
                          />
                      </Form.Item>
                      <Form.Item 
                        label="是否可用" 
                        name="is_valid"
                      >
                        <Radio.Group >
                          <Radio value='1'>是</Radio>
                          <Radio value='0'>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item 
                        label="是否激活"
                        name="is_on" 
                      >
                        <Radio.Group >
                          <Radio value='1'>是</Radio>
                          <Radio value='0'>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="激活时间"
                        name="time"
                      >
                          <DatePicker 
                          onChange={this.time_change} 
                          format='YYYY/MM/DD'//指定日期显示样式
                          style={{width:282}}
                          />
                      </Form.Item>
                      <Form.Item 
                        label="是否共享"
                        name="is_share" 
                      >
                        <Radio.Group >
                          <Radio value='1'>是</Radio>
                          <Radio value='0'>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="矫正倍数"
                        name="correct"
                        rules={[
                          {required:true,message:'请输入矫正倍数！'}
                        ]}
                      >
                        <Input
                          onChange={this.modify_inputChange}
                          />
                      </Form.Item>
                      <Form.Item
                        label="类型"
                        name="type"
                      >
                        <Select>
                          <Option name="type" value="device_normal">正常</Option>
                          <Option name="type" value="device_testing">测试</Option>
                          <Option name="type" value="eupregna">优孕保</Option>
                          <Option name="type" value="eupregna_testing">优孕保测试</Option>
                          <Option name="type" value="professional_normal">专业正常</Option>
                          <Option name="type" value="professional_testing">专业测试</Option>
                          <Option name="type" value="research">研究</Option>
                          <Option name="type" value="other">其他</Option>
                          <Option name="type" value="other_test">其他测试</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="状态"
                        name="status"
                      >
                        <Select>
                          <Option name="state" value="no_test">未测试</Option>
                          <Option name="state" value="pass">测试通过</Option>
                          <Option name="state" value="no_pass">测试未通过</Option>
                          <Option name="state" value="repair">返修</Option>
                          <Option name="state" value="cannot_use">存在故障,完全无法使用</Option>
                          <Option name="state" value="use_no_testvalue">存在故障，可用但影响测试值</Option>
                          <Option name="state" value=" temporary_use">存在故障，可临时用</Option>
                          <Option name="state" value="discard">废弃</Option>
                        </Select>
                      </Form.Item>
                      
                      <Form.Item
                        label="备注"
                        name="remark"
                      >
                        <TextArea 
                          placeholder="备注信息" 
                          autoSize={{minRows:2,maxRows:6}}
                          onChange={this.modify_inputChange}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Modal>
                {/* 历史人员弹窗 */}i
                <Modal
                title="历史人员"
                centered
                visible={this.state.visible_user}
                onCancel={this.handleCancel_user}
                footer={null}
                width="800"
              >
                <div className="ant-modal-body" style={{height:"100%"}}>
                    <div style={{fontWeight:'bold',marginTop:"-20px"}}>
                      <div>设备码：{this.state.devCode}</div>
                      <div>历史连接人数：{this.state.data_user ? this.state.data_user.length : 0}</div>
                    </div>
                  <div style={{height:"100%",width:"100%"}}>
                    <Table 
                      columns={this.columns_user} 
                      dataSource={this.state.data_user} 
                      bordered={true}      
                      style={{margin:'20px 0',borderBottom:'1px,soild'}}
                      pagination={{
                        position: ['bottomLeft'] ,
                        total:this.state.data_user? this.state.data_user.length : 0,
                        showTotal:total => `共 ${total} 条`,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        current:this.state.paginationProps_user.current,
                        pageSize:this.state.paginationProps_user.pageSize
                      }}
                      onChange={this.handTablechange_user}
                      size="small"
                    />
                  </div>
                </div>
              </Modal>
              {/* 导入弹窗 */}
              <ImportFile
                url="http://123.57.33.240:8080/paper/param/pro/import" 
                visible={this.state.visible_import}
                onCancel={this.handleCancel_import}
              />
            </div>
        )
    }
}
