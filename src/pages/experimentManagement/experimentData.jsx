import React, { Component } from 'react'
import { Table ,Button , Input , Select, Space ,Modal,Form} from 'antd';
import {ReloadOutlined,
        SearchOutlined ,
        PlusOutlined, 
        CloudUploadOutlined, 
        CloudDownloadOutlined,
        PlusSquareFilled
        } from '@ant-design/icons'


const { Option } = Select;




 //主页面表格数据
  const data = [];
  for (let i = 0; i < 46; i++) {
    if(i%2 !== 0)
    {data.push({
      key: i,
      batch_num: `${i}`,
      type: `类型 ${i}`,
      r_time:`33`,
      time: `2020-00-00 11.11.11`,
      exper:`test${i}`,
      state:`正常`,
      result :`测试通过 `,
    });} else {
      data.push({
        key: i,
        batch_num: `${i}`,
        type: `类型 ${i}`,
        r_time:`66`,
        time: `2020-00-00 11.11.11`,
        exper:`test${i}`,
        state:`异常`,
        result :`测试不通过 `,
      });
    }
  }
//使用人员弹窗表格数据
  const data_modify = [];
  for (let i = 0; i < 77 ; i++) {
    data_modify.push({
      key:i,
      concentration:`${i+10}`,
      exp_num:`${i+7}`,
    })
  }



export default class ExperimentData extends Component {
    state = { 
        visible_add: false ,//添加弹窗
        visible_modify :false,//修改弹窗
        visible_static:false,//修改弹窗中修改数据弹窗
        selectedRowKeys: [], // Check here to configure the default column
        paginationProps : {//分页栏参数
          position: ['bottomLeft'] ,
          total:'data.length',
          showTotal:total => `共 ${total} 条`,
          showQuickJumper:true,
          showSizeChanger:true,
        },
        current:1,//当前页数
        pageSize:10,//当前页面条数
  
        paginationProps_modify : {//修改弹窗分页栏参数
          position: ['bottomLeft'] ,
          total:'data.length',
          showTotal:total => `共 ${total} 条`,
          showQuickJumper:true,
          showSizeChanger:true,
        },
        //输入选择框的值
        batch_in:'',//批号
        type_in:'',//试剂类型
        exper_in:'',//实验人员

        //修改弹窗
        modal:{
          batch:'',
          type:'',
          r_time:'',
          exper:''
        },
        //修改实验数据
        static: {
          concentration:'',
          exp_num:'',
        }
      };
     
      columns = [
        {
          title: '批号',
          dataIndex: 'batch_num',
          width: 100,
          align:'center',
          fixed:'left',
        },
        {
          title: '试剂类型',
          dataIndex: 'type',
          width: 150,
          align:'center',
        },
        {
          title: '反应时间',
          key:'r_time',
          dataIndex: 'r_time',
          width: 100,
          align:'center',
          },
    
        {
          title: '生产时间',
          dataIndex: 'time',
          width: 100,
          align:'center',
        },
        {
          title: '测试时间',
          dataIndex: 'time',
          width: 150,
          align:'center',
        },
        {
          title: '开始时间',
          dataIndex: 'time',
          width: 150,
          align:'center',
        },
        {
          title: '结束时间',
          dataIndex: 'time',
          width: 100,
          align:'center',
        },
        {
          title: '实验人员',
          dataIndex: 'exper',
          width: 100,
          align:'center',
        },
        {
          title: '实验状态',
          dataIndex: 'state',
          width: 100,
          align:'center',
        },
        {
          title: '实验结果',
          dataIndex: 'result',
          width: 100,
          align:'center',
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
            </Space>
          ),
        }
      ];

     
      columns_modify = [
        {
          title: '试剂浓度值%',
          dataIndex: 'concentration',
          key:'concentration',
          width: 150,
          align:'center',
        },
        {
          title: '所需试验次数',
          dataIndex: 'exp_num',
          key:'exp_num',
          width: 150,
          align:'center',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align:'center',
            width: 150,
            fixed:'right',
            render:(text,record) => (
              <Space >
                  <Button size="small" style={{color:'black',background:'white'}} onClick={()=>{this.modify_plan(record)}}>修改</Button>
              </Space>
            ),
          }
      ]

    start = () => {
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
          });
        }, 1000);
      };
      //表格行选择操作
      onSelectChange = selectedRowKey => {
        //setState为异步操作，若在this.setState函数外获取，则仍是赋值之前的值，没有改变
        this.setState(
          {selectedRowKeys:selectedRowKey},
          ()=>{console.log('所选择行',this.state.selectedRowKeys)}
        )
      };
      search = () =>{
        console.log('搜索')
      };
      //重置
      reset = () => {
        console.log('重置')
        this.setState(
          {
            selectedRowKeys:[],
            batch_in:'',
            type_in:'',
            exper_in:undefined,
          },
        )
        console.log(this.state);
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
        let data = Object.assign(this.state.modal,{
          batch:record.batch_num,
          type:record.type,
          r_time:record.r_time,
          exper:record.exper,
        })
        this.setState({
          visible_modify:true,
          modal:data,
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
      //修改弹窗中修改按钮
      modify_plan = (record) => {
        console.log('弹窗修改',record)
        let data = Object.assign(this.state.static,{
          concentration:record.concentration,
          exp_num:record.exp_num,
        })
        this.setState({
          visible_static:true,
          static:data,
        })
        
      }
      handleOk_static = () => {
        this.setState({
          visible_static:false,
        })
      }
      handleCancel_static = () => {
        this.setState({
          visible_static:false,
        })
      }
      //表换个页数变化
      handTablechange = (pagination) =>{
        console.log(pagination)
        // let C = pagination.current
        // let P = pagination.pageSize
        this.setState = ({
          current:pagination.current,
          pageSize:pagination.pageSize
        })
        console.log(this.state.current,this.state.pageSize,this.state)   
      };

    //使用人员表格变化
    handTablechange_modify = (pagination) =>{
        console.log(pagination)
    };
    //批号输入框
    batchChange = (e) => {
        console.log(e.target.value)
        this.setState({
        batch_in:e.target.value,
        })
    }
    //激活状态选择框
    activeChange = (e) => {
        console.log(e)
        this.setState({
        active_in:e
        })
    }
    //试剂类型输入框
    typeChange = (e) => {
        console.log(e.target.value)
    }

    render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
  
        return (
            <div style={{height:"100%"}}>
              {/* 输入框等 */}
              <div style={{'margin':'0 0 15px  0'}} >
                <div justify="space-between" gutter="15" style={{display:"flex" }}  >
                        <Input  placeholder="批号" className="input1" onChange={this.batchChange.bind(this)} value={this.state.batch_in} />
                        <Input  placeholder="试剂类型" className="input1" onChange={this.typeChange.bind(this)} value={this.state.type_in} />
                        <Select placeholder="试剂类型"   
                                onChange={this.activeChange} 
                                className="input1" 
                                vulue={this.state.active_in}
                                allowClear 
                                >
                            <Option value="on">已激活</Option>
                            <Option value="close">未激活</Option>
                        </Select>

                        <Button 
                          type="primary" 
                          icon={<SearchOutlined className="icon1" />}
                          onClick={this.search} 
                          className="button1"
                          >
                          搜索
                        </Button>

                        <Button type="primary" 
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
                  dataSource={data} 
                  bordered={true} 
                  rowSelection={rowSelection}
                  style={{margin:'20px 0',borderBottom:'1px,soild'}}
                  pagination={ this.state.paginationProps}
                  onChange={this.handTablechange}
                  
                  />
                </div>
                {/* 添加弹窗 */}
                <Modal
                  title="添加实验计划"
                  centered
                  visible={this.state.visible_add}
                  onOk={this.handleOk_add}
                  okText="确定"
                  onCancel={this.handleCancel_add}
                  cancelText="关闭"
                  className="modal1"
                  width="800px"
                >
                  <div style={{borderBottom:'1px solid gray'}}>新建实验任务</div>
                    
                    <div className="modal-body" style={{height:"400px",marginTop:'20px'}}>
                      <Form
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                      >
                        <div style={{display:'flex'}}>
                          <div style={{width:'400px'}}>
                            <Form.Item label="选择实验人员">
                              <Select style={{width:'150px'}} placeholder="实验人员">
                                <Option value="henan">河南</Option>
                                <Option value="sicuan">四川</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div style={{width:'400px'}} >
                            <Form.Item label="选择试剂类型" >
                              <Select  style={{width:'150px'}} placeholder="试剂类型">
                                <Option value="henan">河南</Option>
                                <Option value="sicuan">四川</Option>
                              </Select>
                            </Form.Item>
                          </div>
                        </div>
                        <div style={{display:'flex'}}>
                          <div style={{width:'400px'}}>
                            <Form.Item label="批号">
                              <Select style={{width:'150px'}} placeholder="批号">
                                <Option value="henan">河南</Option>
                                <Option value="sicuan">四川</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div style={{width:'400px'}} >
                            <Form.Item label="试剂卡反应时间（分）" >
                              <Input style={{width:'150px'}} placeholder="试剂卡反应时间"/>
                            </Form.Item>
                          </div>
                        </div>
                        <div style={{display:'flex',marginTop:'30px',height:'50px',border:'1px solid gray'}}>
                          <div style={{width:'400px',display:'flex'}}>
                            <PlusSquareFilled style={{color:'#f05d73',fontSize:'30px',lineHeight:'50px',marginLeft:'10px'}} />
                            <div style={{fontSize:'20px',lineHeight:'50px',marginLeft:'10px'}}>试剂浓度值</div>
                          </div>
                          <div style={{width:'400px',borderLeft:'1px solid gray'}} >

                          </div>
                        </div>
                        <div style={{display:'flex',height:'50px',borderBottom:'1px solid gray',borderLeft:'1px solid gray',borderRight:'1px solid gray'}}>
                          <div style={{width:'400px'}}>
                          
                          </div>
                          <div style={{width:'400px',borderLeft:'1px solid gray'}} >

                          </div>
                        </div>


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
                  width="600px"
                >
                  <div className="ant-modal-body">
                        <div style={{fontWeight:'bold',marginTop:"-20px"}}>
                            <div style={{display:'flex'}}>
                                <div style={{width:'50%'}}>
                                  批号：{this.state.modal.batch}
                                </div>
                                <div style={{width:'50%'}}>
                                  试剂类型：{this.state.modal.type}
                                </div>
                            </div>
                            <div style={{display:'flex'}}> 
                                <div style={{width:'50%'}}>
                                  试剂卡反应时间（分钟）：{this.state.modal.r_time}
                                </div>
                                <div style={{width:'50%'}}>
                                  实验人员:{this.state.modal.exper}
                                </div>
                            </div>
                        </div>
                        <div style={{height:"100%",width:"100%"}}>
                            <Table 
                                columns={this.columns_modify} 
                                dataSource={data_modify} 
                                bordered={true}      
                                style={{margin:'20px 0',borderBottom:'1px,soild'}}
                                pagination={ this.state.paginationProps_modify}
                                onChange={this.handTablechange_modify}
                                size="small"
                            />
                        </div>
                  </div>
                </Modal>

                <Modal
                  title="修改实验数据"
                  centered
                  visible={this.state.visible_static}
                  onOk={this.handleOk_static}
                  okText="确定"
                  onCancel={this.handleCancel_static}
                  cancelText="关闭"
                  width="600px"
                >
                  <div style={{borderBottom:'1px solid gray'}}>基本信息</div>
                  <div className="ant-modal-body">
                    
                    <div>
                      <div style={{display:'flex'}}>
                        <div style={{width:'20%',lineHeight:'28px'}}>试剂浓度值</div>
                        <input value={this.state.static.concentration} style={{width:'60%'}}/>
                      </div>
                      <div style={{display:'flex',marginTop:'20px',}}>
                        <div style={{width:'20%',lineHeight:'28px'}}>所需试验次数</div>
                        <input value={this.state.static.exp_num} style={{width:'60%'}}/>
                      </div>
                    </div>
                  </div>
                </Modal>
            </div>
        )
    }
}
