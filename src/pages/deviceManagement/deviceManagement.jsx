import React, { Component } from 'react'
import { Table ,Button , Input , Row, Col ,Select, Space ,Modal} from 'antd';
import {ReloadOutlined,
        SearchOutlined ,
        PlusOutlined, 
        CloudUploadOutlined, 
        CloudDownloadOutlined,
        CheckCircleOutlined,
        CloseCircleTwoTone 
        } from '@ant-design/icons'
// import Column from 'antd/lib/table/Column';


const { Option } = Select;





  const data = [];
  for (let i = 0; i < 46; i++) {
    if(i%2 !== 0)
    {data.push({
      key: i,
      dev_code: `123123123${i}`,
      dev_num: `设备 ${i}`,
      on: 0,
      used:0,
      type:`正常`,
      status :`测试通过 `,
      share :0,
    });} else {
      data.push({
        key: i,
        dev_code: `123123123${i}`,
        dev_num: `设备 ${i}`,
        on: 1,
        used:1,
        type:`异常`,
        status :`停用 `,
        share :1,
      });
    }
  }


  
  function handleChange(value) {
    console.log(`selected ${value}`);
  }


export default class DeviceManagement extends Component {
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
          if (on === 0) {
            return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
          } else if(on === 1) {
            return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
          }
        }
      },

    {
      title: '已用',
      dataIndex: 'used',
      width: 100,
      align:'center',
      render: used =>{
        if (used === 0) {
          return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
        } else if(used === 1) {
          return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
        }
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 150,
      align:'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      align:'center',
    },
    {
      title: '共享',
      dataIndex: 'share',
      width: 100,
      align:'center',
      render: share =>{
        if (share === 0) {
          return (<CheckCircleOutlined style={{color:'#f05d73',fontSize:'23px',verticalAlign:'middle'}} />)
        } else if(share === 1) {
          return (<CloseCircleTwoTone   style={{fontSize:'25px',color:'white'}} twoToneColor="gary" />)
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
  //参数设置
  state = { visible_add: false ,
            visible_modify :false,
            selectedRowKeys: [], // Check here to configure the default column
          };
//表格下方分页属性
  paginationProps = {
    position: ['bottomLeft'] ,
    total:'data.length',
    showTotal:total => `共 ${total} 条`,
    showQuickJumper:true,
    showSizeChanger:true,
  }


  start = () => {

    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('已选择的表格行', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  //搜索
  search = () =>{
    console.log('搜索')
  };
  //重置
  reset = () => {
    console.log('重置')
  };
  //添加
  add =() =>{
    console.log('添加')
    this.setState({
      visible_add: true,
    });
  };
  //导入
  importStatic = () =>{
    console.log('导入')
  };
  //导出已选择数据
  exportChoose = () =>{
    console.log('导出已选择数据')
  };
  //按搜索条件导出
  exportSearch = () =>{
    console.log('按搜索条件导出')
  };

//点击添加完成
  handleOk_add = () => {
    this.setState({
      visible_add: false,
    });
    console.log('添加完成')
  };
  //添加关闭
  handleCancel_add = () => {
    this.setState({
      visible_add: false,
    });
    console.log('添加关闭')
  };
  //修改
  modify = (record)=> {
    console.log('修改',record)
    this.setState({
      visible_modify:true,
    })
  };
  handleOk_modify = () => {
    this.setState({
      visible_modify:false,
    })
  };
  handleCancel_modify = () =>{
    this.setState({
      visible_modify:false,
    })
    console.log('修改弹窗关闭')
  };
  //删除
  delete = (record) =>{
    console.log('删除',record)
  };
  user = (record) => {
    console.log('使用人员',record)
  };

  handTablechange = (pagination) =>{
    console.log(pagination)
     
  };



    render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };


        return (
            <div style={{height:"100%"}}>
                <div style={{'margin':'10px 0'}} >
                <Row justify="space-between" gutter="15" style={{display:"flex" }}  >
                    <Col span={3}>
                        <Input  placeholder="客户"  />
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择激活状态 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="on">已激活</Option>
                            <Option value="close">未激活</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择类型 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="type1">类型1</Option>
                            <Option value="type2">类型2</Option>
                            <Option value="type3">类型3</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Select placeholder="请选择状态 " style={{width:'100%'}} onChange={handleChange}>
                            <Option value="status1">测试通过</Option>
                            <Option value="status2">测试未通过</Option>
                        </Select>
                    </Col>
                    <Col span={1.5}>
                        <Button type="primary" icon={<SearchOutlined  style={{fontSize:'18px'}} onClick={this.search} />}>搜索</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<ReloadOutlined style={{fontSize:'18px'}} onClick={this.reset} /> } >重置</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<PlusOutlined style={{fontSize:'18px'}}  onClick={this.add} />} >添加</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudUploadOutlined style={{fontSize:'18px'}}  onClick={this.importStatic} />} >导入</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudDownloadOutlined style={{fontSize:'18px'}} onClick={this.exportChoose} />} >导出已选择数据</Button>
                    </Col>
                    <Col span={1.5} >
                        <Button type="primary" icon={<CloudDownloadOutlined style={{fontSize:'18px'}}  onClick={this.exportSearch} />} >按检索条件导出</Button>
                    </Col>
                    <Col span={2} ></Col>
                </Row>
                </div>

                {/* 表格 */}
                <div style={{height:"100%"}}>
                  <Table 
                   columns={this.columns} 
                  dataSource={data} 
                  bordered={true} 
                  rowSelection={rowSelection}
                  style={{margin:'20px 0',borderBottom:'1px,soild'}}
                  pagination={ this.paginationProps}
                  onChange={this.handTablechange}
                  
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
                >
                  <p>添加</p>
                  <p>添加</p>
                  <p>添加</p>
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
                >
                  <p>修改</p>
                </Modal>
            </div>
        )
    }
}
