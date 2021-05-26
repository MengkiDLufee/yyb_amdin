import React, { Component } from 'react'
import { Table, Button, Input, Select, Space, Modal, Form, Popconfirm } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
  PlusSquareFilled,
  DeleteFilled
} from '@ant-design/icons'

import './index.less'
import {
  expList,
  getExpPerson,
  getPaper,//试剂种类
  expDataAdd,//添加
  expDataDelete,//删除
  getBathNum,//根据试剂类型获取批号
  // getExpRes,//查看实验结果
  // getExpResDetail,//实验结果中的详情
  getExpPlan,//实验计划
  exportFile//导出
} from '../../api/index'//接口



const { Option } = Select;





//使用人员弹窗表格数据
const data_modify = [];
for (let i = 0; i < 77; i++) {
  data_modify.push({
    key: `${i}${i}`,
    concentration: `${i + 10}`,
    exp_num: `${i + 7}`,
  })
}

function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = i;
    newItem.batch_num = data[i].bathNumber;
    newItem.type = data[i].paperTypeId;
    newItem.r_time = data[i].reactiveTime;
    newItem.made_time = (data[i].madeTime || "").split('T')[0];
    newItem.test_time = (data[i].testDate || "").split('T')[0];
    newItem.start_time = (data[i].startDate || "").split('T')[0];
    newItem.end_time = (data[i].endDate || "").split('T')[0];
    newItem.exper = data[i].personName;
    newItem.personId = data[i].personId;
    newItem.state = data[i].testStatus;
    newItem.paperTestPlanId = data[i].paperTestPlanId;
    // newItem.result = "缺少相应数据";
    newData.push(newItem);
  }
  // console.log(newData)
  return newData;
}



export default class ExperimentData extends Component {
  constructor() {
    super();
    this.state = {
      visible_add: false,//添加弹窗
      visible_exp_result: false,//查看实验结果弹窗
      visible_exp_plan: false,//查看实验计划
      visible_modify: false,//修改弹窗
      visible_static: false,//修改弹窗中修改数据弹窗
      selectedRowKeys: [], // Check here to configure the default column
      expPerson: [],//实验人员姓名和id
      //主页面表格
      tableData: [],//表格数据
      total: null,//数据总条数
      current: 1,//当前页数
      pageSize: 10,//当前页面条数
      //搜索栏输入选择框的值
      input: {
        batch: '',//批号
        type: '',//试剂类型
        exper: '',//实验人员
      },
      paperType: [],//试剂类型数据
      //修改弹窗
      modal: {
        batch: '',
        type: '',
        r_time: '',
        exper: ''
      },
      //修改实验数据
      static: {
        concentration: '',
        exp_num: '',
      },
      record: {},//记录当前行表格数据
      bathNum_add: [],//修改弹窗批号选项数据
    };
  }


  columns = [
    {
      title: '批号',
      dataIndex: 'batch_num',
      width: 100,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '试剂类型',
      dataIndex: 'type',
      width: 150,
      align: 'center',
      render: type => {
        return this.state.paperType.map(paper => {
          if (paper.paperTypeId === type) return paper.paperTypeName
          else return null
        })
      }
    },
    {
      title: '反应时间',
      key: 'r_time',
      dataIndex: 'r_time',
      width: 100,
      align: 'center',
    },

    {
      title: '生产时间',
      dataIndex: 'made_time',
      width: 150,
      align: 'center',
    },
    {
      title: '测试时间',
      dataIndex: 'test_time',
      width: 150,
      align: 'center',
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      width: 150,
      align: 'center',
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      width: 100,
      align: 'center',
    },
    {
      title: '实验人员',
      dataIndex: 'exper',
      width: 100,
      align: 'center',
    },
    {
      title: '实验状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: (state) => (
        <Space>
          <p>{state === null ? '无状态' : (state === 'plan_finish' ? '已完成' : '进行中')}</p>
        </Space>
      )
    },
    {
      title: '实验结果',
      // dataIndex: 'result',
      width: 100,
      align: 'center',
      render: (record) => (
        <Space>
          <p >{record.state === 'plan_finish' ? '查看实验结果' : '暂无结果'}</p>
        </Space>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <Space >
          <Button size="small" style={{ color: 'black', background: 'white' }} onClick={() => { this.exp_plan(record) }}>查看实验计划</Button>
          <Button size="small" style={{ color: 'black', background: 'white', width: '100px' }} onClick={() => { this.exp_result(record) }} disabled={record.state === 'plan_finish' ? false : true}>
            {record.state === 'plan_finish' ? '查看实验结果' : '暂无结果'}
          </Button>
          <Button size="small" style={{ color: 'black', background: 'white' }} onClick={() => { this.modify(record) }}>修改</Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => { this.delete(record) }}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" style={{ color: 'white', background: '#ff5621' }}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];


  columns_modify = [
    {
      title: '试剂浓度值%',
      dataIndex: 'concentration',
      key: 'concentration',
      width: 150,
      align: 'center',
    },
    {
      title: '所需试验次数',
      dataIndex: 'exp_num',
      key: 'exp_num',
      width: 150,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <Space >
          <Button size="small" style={{ color: 'black', background: 'white' }} onClick={() => { this.modify_plan(record) }}>修改</Button>
        </Space>
      ),
    }
  ]

  loadData = (params) => {
    expList(params).then(res => {
      console.log(res);
      let data = transformData(res.data ? res.data.data.info : [])
      this.setState({
        tableData: data,
        current: params.current,
        pageSize: params.pageSize,
        total: res.data ? res.data.data.total : 0
      })
    })
  }
  //组件挂载时请求数据
  componentDidMount() {
    getExpPerson().then(res => {
      // console.log('实验人员', res);
      this.setState({
        expPerson: res.data.data || []
      })
    })
    //请求试剂类型
    getPaper().then(res => {
      console.log(res)
      this.setState({
        paperType: res.data.data || []
      })
    })
    //请求表格数据
    this.loadData({
      page: 1,
      pageSize: 10
    })




  }

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
      { selectedRowKeys: selectedRowKey },
      () => { console.log('所选择行', this.state.selectedRowKeys) }
    )
  };
  //批号输入框
  batchChange = (value) => {
    // console.log(e.target.value)
    // this.setState({
    //  input:Object.assign(this.state.input,{batch:e.target.value})
    // })
    console.log(value)
  }
  //搜索栏实验人员选择框
  experChange = (e) => {
    console.log(e)
    this.setState({
      input: Object.assign(this.state.input, { exper: e })
    })
  }
  //搜索栏试剂类型输入框
  typeChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input: Object.assign(this.state.input, { type: e.target.value }),
    })
  }
  search = () => {
    console.log('搜索', this.state.input)
  };
  //重置
  reset = () => {
    console.log('重置', this.state.current, this.state.pageSize)
    let data = Object.assign(this.state.input, {
      batch: '',
      type: '',
      exper: undefined,
    })
    this.setState({
      selectedRowKeys: [],
      input: data,
      current: 1,
      pageSize: 10,
    })
    this.loadData({
      page: 1,
      pageSize: 10
    })

  };
  //添加
  add = () => {
    console.log('添加')
    this.setState({
      visible_add: true,
    });
  };

  //导出已选择数据
  exportChoose = () => {
    console.log('导出已选择数据', this.state.selectedRowKeys)
    exportFile('/experiment/data/export/choose', ['1267999756647403521', '1268001674039922690'])
  };
  //按搜索条件导出
  exportSearch = () => {
    console.log('按搜索条件导出', this.state.input)
    exportFile('/experiment/data/export/condition', {
      bathNumber: "501001",
      paperTypeId: 33,
      testPersonId: '1267645485175279617'
    })
  };
  typeChange_add = (e) => {
    console.log(e);
    getBathNum({ paperTypeId: e }).then(res => {
      console.log(res);
      this.setState({
        bathNum_add: res.data ? res.data.data : []
      })
    })
  }

  //点击添加完成
  handleOk_add = () => {
    console.log(this.form)
    let form = this.form.current;
    form.validateFields()//表单输入校验
      .then((values) => {
        form.resetFields();
        console.log(values)
        expDataAdd({
          testPersonId: values.exp_member,
          paperParamProId: values.batch_num,
          reactiveTime: values.time,
          concentrationValue: values.sights[0].reagent,
          allTestNumber: values.sights[0].card_num
        }).then(res => {
          console.log(res);
        })
        this.setState({
          visible_add: false
        })
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
    console.log('添加关闭')
  };
  exp_plan = (record) => {
    console.log(record);
    getExpPlan({ paperTestPlanId: '1268003631676788738' }).then(res => {
      console.log(res);
    })
    this.setState({
      visible_exp_plan: true,
      record
    })
  };
  handleOk_exp_plan = () => {
    this.setState({
      visible_exp_plan: false
    })
  };
  handleCancel_exp_plan = () => {
    this.setState({
      visible_exp_plan: false
    })
  };
  //查看实验结果
  exp_result = () => {
    // getExpRes({ paperTestPlanId:'1268003631676788738'}).then(res => {
    //   console.log(res);
    // })
    // getExpResDetail({ paperTestPlanId:'1268003631676788738'}).then(res => {
    //   console.log(res);
    // })
    exportFile('/experiment/data/export/result', {
      paperTestPlanId: '1268003631676788738'
    })
    this.setState({
      visible_exp_result: true
    })
  }
  handleOk_exp_result = () => {
    this.setState({
      visible_exp_result: false
    })
  }
  handleCancel_exp_result = () => {
    this.setState({
      visible_exp_result: false
    })
  }
  //修改
  modify = (record) => {
    console.log('修改', record)
    let data = Object.assign(this.state.modal, {
      batch: record.batch_num,
      type: record.type,
      r_time: record.r_time,
      exper: record.exper,
    })
    this.setState({
      visible_modify: true,
      modal: data,
    })
  };
  handleOk_modify = () => {
    this.setState({
      visible_modify: false,
    })
  };
  handleCancel_modify = () => {
    this.setState({
      visible_modify: false,
    })
    console.log('修改弹窗关闭')
  };
  //删除
  delete = (record) => {
    console.log('删除', record)
    expDataDelete({
      paperTestPlanId: record.paperTestPlanId
      // paperTestPlanId: '1397513471591026690'
    }).then(res => {
      console.log(res);
      this.loadData({
        page: 1,
        pageSize: 10
      })

    }
    )

  };
  //修改弹窗中修改按钮
  modify_plan = (record) => {
    // console.log('弹窗修改',record)
    let data = Object.assign(this.state.static, {
      concentration: record.concentration,
      exp_num: record.exp_num,
    })
    this.setState({
      visible_static: true,
      static: data,
    })

  }
  handleOk_static = () => {
    console.log(this.state.static.concentration, this.state.static.exp_num)
    this.setState({
      visible_static: false,
    })
  }
  handleCancel_static = () => {
    this.setState({
      visible_static: false,
    })
  }
  //主页面表格页数变化
  handTablechange = (pagination) => {
    console.log(pagination, pagination.current, pagination.pageSize);
    console.log(this.state.current, this.state.pageSize);

    expList({
      page: pagination.current,
      pageSize: pagination.pageSize,
    }).then(res => {
      let data = transformData(res.data.data.info)
      console.log(data)
      this.setState({
        current: pagination.current,
        pageSize: pagination.pageSize,
        tableData: data,
      })
    })
  };

  //使用人员表格变化
  handTablechange_modify = (pagination) => {
    console.log(pagination)
  };

  //修改试剂浓度
  concentrationChange = (e) => {
    console.log(e.target.value)
    this.setState({
      static: Object.assign(this.state.static, { concentration: e.target.value })
    })
  }
  //修改试验次数
  expnumChange = (e) => {
    console.log(e.target.value)
    let data = Object.assign({}, this.state.static, { exp_num: e.target.value })
    this.setState({
      static: data,
    })
  }

  //表单验证
  form = React.createRef();

  render() {
    const {
      selectedRowKeys,
      paperType,
      tableData,
      current,
      pageSize,
      total,
      record,
      bathNum_add
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{ height: "100%" }}>
        {/* 输入框等 */}
        <div style={{ 'margin': '0 0 15px  0' }} >
          <div justify="space-between" gutter="15" style={{ display: "flex" }}  >
            <Input placeholder="批号" className="input1" onChange={this.batchChange.bind(this)} value={this.state.input.batch} />
            {/* <Input  placeholder="试剂类型" className="input1" onChange={this.typeChange.bind(this)} value={this.state.input.type} /> */}
            <Select
              placeholder="试剂类型"
              onChange={this.batchChange}
              className="input1"
              dropdownStyle={{ width: '300px' }}
              allowClear
            >
              {
                paperType.map((paper, index) => {
                  return <Option key={index} value={paper.paperTypeId} >{paper.paperTypeName}</Option>
                })
              }
            </Select>
            <Select
              placeholder="实验人员"
              onChange={this.experChange}
              className="input1"
              // vulue={this.state.input.exper}
              allowClear
            >
              {
                this.state.expPerson.map(item => {
                  return <Option key={item.testPersonId} value={item.testPersonId}>{item.personName}</Option>
                })
              }
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
              icon={<ReloadOutlined className="icon1" />}
              onClick={this.reset}
              className="button1"
            >
              重置
                        </Button>

            <Button
              type="primary"
              icon={<PlusOutlined className="icon1" />}
              onClick={this.add}
              className="button1"
            >
              添加
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
        <div style={{ height: "100%" }}>
          <Table
            columns={this.columns}
            dataSource={tableData}
            bordered={true}
            rowSelection={rowSelection}
            style={{ margin: '20px 0', borderBottom: '1px,soild' }}
            pagination={{
              position: ['bottomLeft'],
              total,
              showTotal: total => `共 ${total} 条`,
              showQuickJumper: true,
              showSizeChanger: true,
              current,
              pageSize,
            }}
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
          <div style={{ borderBottom: '1px solid gray' }}>新建实验任务</div>

          <div className="modal-body" style={{ height: "400px", marginTop: '20px' }}>
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              ref={this.form}//表单验证，通过ref获取
            >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '400px' }}>
                  <Form.Item label="选择实验人员" name="exp_member" rules={[{ required: true, message: ' 请选择实验人员' }]}>
                    <Select style={{ width: '150px' }} placeholder="实验人员" >
                      {
                        this.state.expPerson.map(item => {
                          return <Option key={item.testPersonId} value={item.testPersonId}>{item.personName}</Option>
                        })
                      }
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ width: '400px' }} >
                  <Form.Item label="选择试剂类型" name="type" rules={[{ required: true, message: ' 请选择试剂类型' }]} >
                    <Select style={{ width: '150px' }} placeholder="试剂类型" onChange={this.typeChange_add} >
                      {
                        paperType.map((paper, index) => {
                          return <Option key={index} value={paper.paperTypeId} >{paper.paperTypeName}</Option>
                        })
                      }
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '400px' }}>
                  <Form.Item label="批号" name="batch_num" rules={[{ required: true, message: ' 请选择批号' }]} >
                    <Select style={{ width: '150px' }} placeholder="请先选择试剂类型" >
                      {
                        bathNum_add.map((item, index) => {
                          return <Option key={index} value={item.paperParamProId} >{item.bathNumber}</Option>
                        })
                      }
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ width: '400px' }} >
                  <Form.Item label="试剂卡反应时间（分）" name="time" rules={[{ required: true, message: ' 请填写试剂卡反应时间' }]} >
                    <Input style={{ width: '150px' }} placeholder="试剂卡反应时间" />
                  </Form.Item>
                </div>
              </div>
              <Form.List name="sights">
                {(fields, { add, remove }) => (
                  <>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '400px' }}>
                        <Form.Item>
                          <div style={{ width: '400px', display: 'flex' }}>
                            <PlusSquareFilled style={{ color: '#f05d73', fontSize: '30px', margin: '10px 10px 10px 60px' }} onClick={() => add()} />
                            <div style={{ fontSize: '20px', margin: '8px' }}>试剂浓度值</div>
                          </div>
                        </Form.Item>
                      </div>
                      <div style={{ width: '400px' }} >
                        <Form.Item >
                          <div style={{ width: '400px', display: 'flex' }} >
                            <div style={{ fontSize: '20px', lineHeight: '50px', marginLeft: '10px' }}>所需实验试剂卡数量（个）</div>
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                    {fields.map(field => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              name={[field.name, 'reagent']}
                              fieldKey={[field.fieldKey, 'reagent']}
                              rules={[{ required: true, message: '请填写试剂浓度！' }]}
                              style={{ marginLeft: '60px' }}
                            >
                              <Input placeholder="试剂浓度" style={{ width: '300px' }} />
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, 'card_num']}
                          fieldKey={[field.fieldKey, 'card_num']}
                          rules={[{ required: true, message: '请填写实验试剂卡数量！' }]}
                        >
                          <Input placeholder="实验试剂卡数量" style={{ width: '300px' }} />
                        </Form.Item>
                        <DeleteFilled onClick={() => remove(field.name)} style={{ color: '#f05d73' }} />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </Modal>
        {/* 查看实验结果弹窗 */}
        <Modal
          title="查询实验计划"
          centered
          visible={this.state.visible_exp_plan}
          onOk={this.handleOk_exp_plan}
          okText="确定"
          onCancel={this.handleCancel_exp_plan}
          cancelText="关闭"
          width="700px"
        >
          <div className="ant-modal-body">
            <div>
              <p>实验人员:{record.exper}</p>
              <p>批号：{record.batch_num}</p>
              <p>试剂类型：{
                this.state.paperType.map(paper => {
                  if (paper.paperTypeId === record.type) return paper.paperTypeName
                  else return null
                })
              }</p>
              <p>试剂卡反应时间(min)：{record.r_time}</p>
            </div>
            查看实验计划
                  </div>
        </Modal>
        {/* 查看实验结果弹窗 */}
        <Modal
          title="修改"
          centered
          visible={this.state.visible_exp_result}
          onOk={this.handleOk_exp_result}
          okText="确定"
          onCancel={this.handleCancel_exp_result}
          cancelText="关闭"
          width="700px"
        >
          <div className="ant-modal-body">
            查看实验结果
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
          width="700px"
        >
          <div className="ant-modal-body">
            <div style={{ fontWeight: 'bold', marginTop: "-20px" }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  批号：{this.state.modal.batch}
                </div>
                <div style={{ width: '50%' }}>
                  试剂类型：{this.state.modal.type}
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  试剂卡反应时间（分钟）：{this.state.modal.r_time}
                </div>
                <div style={{ width: '50%' }}>
                  实验人员:{this.state.modal.exper}
                </div>
              </div>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
              <Table
                columns={this.columns_modify}
                dataSource={data_modify}
                bordered={true}
                style={{ margin: '20px 0', borderBottom: '1px,soild' }}
                pagination={{
                  position: ['bottomLeft'],
                  total: 'data.length',
                  showTotal: total => `共 ${total} 条`,
                  showQuickJumper: true,
                  showSizeChanger: true,
                }}
                onChange={this.handTablechange_modify}
                size="small"
              />
            </div>
          </div>
        </Modal>
        {/* 修改弹窗中修改表格数据弹窗 */}
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
          <div style={{ borderBottom: '1px solid gray' }}>基本信息</div>
          <div className="ant-modal-body">

            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '20%', lineHeight: '28px' }}>试剂浓度值</div>
                <input value={this.state.static.concentration} style={{ width: '60%' }} onChange={this.concentrationChange.bind(this)} />
              </div>
              <div style={{ display: 'flex', marginTop: '20px', }}>
                <div style={{ width: '20%', lineHeight: '28px' }}>所需试验次数</div>
                <input value={this.state.static.exp_num} style={{ width: '60%' }} onChange={this.expnumChange.bind(this)} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
