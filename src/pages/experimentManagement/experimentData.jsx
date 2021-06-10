import React, { Component } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Form,
  Popconfirm,
  message,
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
  PlusSquareFilled,
  DeleteFilled,
} from "@ant-design/icons";


import "./index.less";
import {
  expList,
  getExpPerson,
  getPaper, //试剂种类
  expDataAdd, //添加
  expDataDelete, //删除
  getBathNum, //根据试剂类型获取批号
  getExpRes, //查看实验结果
  getExpResDetail, //实验结果中的详情
  getExpPlan, //实验计划
  exportFile, //导出
} from "../../api/index"; //接口
// import echarts from 'echarts/lib/echarts';
const { Option } = Select;
// const init = echarts.init
// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;


//使用人员弹窗表格数据
const data_modify = [];
for (let i = 0; i < 77; i++) {
  data_modify.push({
    key: `${i}${i}`,
    concentration: `${i + 10}`,
    exp_num: `${i + 7}`,
  });
}

function transformData(data) {
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let newItem = {};
    newItem.key = data[i].paperTestPlanId;
    newItem.batch_num = data[i].bathNumber;
    newItem.type = data[i].paperTypeId;
    newItem.r_time = data[i].reactiveTime;
    newItem.made_time = (data[i].madeTime || "").split("T")[0];
    newItem.test_time = (data[i].testDate || "").split("T")[0];
    newItem.start_time = (data[i].startDate || "").split("T")[0];
    newItem.end_time = (data[i].endDate || "").split("T")[0];
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
      visible_add: false, //添加弹窗
      visible_exp_result: false, //查看实验结果弹窗
      visible_exp_resultDetail: false,//实验结果详情弹窗
      visible_exp_plan: false, //查看实验计划
      visible_modify: false, //修改弹窗
      visible_static: false, //修改弹窗中修改数据弹窗
      selectedRowKeys: [],
      selectedRowKeysAll: [],//所有页面选择数据的id
      expPerson: [], //实验人员姓名和id
      //主页面表格
      tableData: [], //表格数据
      total: null, //数据总条数
      current: 1, //当前页数
      pageSize: 10, //当前页面条数
      //搜索栏输入选择框的值
      input: {
        batch: "", //批号
        type: undefined, //试剂类型
        exper: undefined, //实验人员
      },
      paperType: [], //试剂类型数据
      //修改弹窗
      modal: {
        batch: "",
        type: "",
        r_time: "",
        exper: "",
      },
      //修改实验数据
      static: {
        concentration: "",
        exp_num: "",
      },
      record: {}, //记录当前行表格数据
      bathNum_add: [], //修改弹窗批号选项数据
      data_plan: [], //查询实验计划表格数据
      data_res: [], //实验结果数据
      data_res_detail: [], //实验结果中的详情数据
      record_detail: [],//实验结果中详情的表格数据记录
    };
  }

  columns = [
    {
      title: "批号",
      dataIndex: "batch_num",
      width: 100,
      align: "center",
      fixed: "left",
    },
    {
      title: "试剂类型",
      dataIndex: "type",
      width: 150,
      align: "center",
      render: (type) => {
        return this.state.paperType.map((paper) => {
          if (paper.paperTypeId === type) return paper.paperTypeName;
          else return null;
        });
      },
    },
    {
      title: "反应时间",
      key: "r_time",
      dataIndex: "r_time",
      width: 100,
      align: "center",
    },

    {
      title: "生产时间",
      dataIndex: "made_time",
      width: 150,
      align: "center",
    },
    {
      title: "测试时间",
      dataIndex: "test_time",
      width: 150,
      align: "center",
    },
    {
      title: "开始时间",
      dataIndex: "start_time",
      width: 150,
      align: "center",
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      width: 100,
      align: "center",
    },
    {
      title: "实验人员",
      dataIndex: "exper",
      width: 100,
      align: "center",
    },
    {
      title: "实验状态",
      dataIndex: "state",
      width: 100,
      align: "center",
      render: (state) => (
        <Space>
          <p>
            {state === null
              ? "无状态"
              : state === "plan_finish"
                ? "已完成"
                : "进行中"}
          </p>
        </Space>
      ),
    },
    {
      title: "实验结果",
      // dataIndex: 'result',
      width: 100,
      align: "center",
      render: (record) => (
        <Space>
          <p>{record.state === "plan_finish" ? "查看实验结果" : "暂无结果"}</p>
        </Space>
      ),
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            style={{ color: "black", background: "white" }}
            onClick={() => {
              this.exp_plan(record);
            }}
          >
            查看实验计划
          </Button>
          <Button
            size="small"
            style={{ color: "black", background: "white", width: "100px" }}
            onClick={() => {
              this.exp_result(record);
            }}
            disabled={record.state === "plan_finish" ? false : true}
          >
            {record.state === "plan_finish" ? "查看实验结果" : "暂无结果"}
          </Button>
          <Button
            size="small"
            style={{ color: "black", background: "white" }}
            onClick={() => {
              this.modify(record);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => {
              this.delete(record);
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button
              size="small"
              style={{ color: "white", background: "#ff5621" }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  columns_plan = [
    {
      title: "试剂浓度值%",
      dataIndex: "concentrationValue",
      key: "concentrationValue",
      width: 150,
      align: "center",
    },
    {
      title: "所需实验次数",
      dataIndex: "allTestNumber",
      key: "allTestNumber",
      width: 150,
      align: "center",
    },
    {
      title: "已完成实验次数",
      dataIndex: "finishTestNumber",
      key: "finishTestNumber",
      width: 150,
      align: "center",
    },
  ];
  columns_res = [
    {
      title: "试剂浓度值",
      dataIndex: "concentrationValue",
      align: "center",
    },
    {
      title: "T-GOD",
      dataIndex: "tgod",
      align: "center",
    },
    {
      title: "T-GOD2",
      dataIndex: "tgod2",
      align: "center",
    },
    {
      title: "C-GOD",
      dataIndex: "cgod",
      align: "center",
    },
    {
      title: "CCOLOR",
      dataIndex: "ccolor",
      align: "center",
    },
    {
      title: "实验详情",
      dataIndex: "expDetail",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            style={{ color: "black", background: "white" }}
            onClick={() => {
              this.res_detail(record);
            }}
          >
            可查看
          </Button>
        </Space>
      ),
    },
  ];
  columns_res_detail = [
    {
      title: "批号",
      dataIndex: "batch_num",
      align: "center",
    },
    {
      title: "试剂类型",
      dataIndex: "type",
      align: "center",
      render: (type) => {
        return this.state.paperType.map((paper) => {
          if (paper.paperTypeId === type) return paper.paperTypeName;
          else return null;
        });
      }
    },
    {
      title: "T-GOD",
      dataIndex: "tgod",
      align: "center",
    },
    {
      title: "T-GOD2",
      dataIndex: "tgod2",
      align: "center",
    },
    {
      title: "C-GOD",
      dataIndex: "cgod",
      align: "center",
    },
    {
      title: "C-COLOR",
      dataIndex: "ccolor",
      align: "center",
    },
    {
      title: "数值",
      dataIndex: "value",
      align: "center",
    },
    {
      title: "数值2",
      dataIndex: "value2",
      align: "center",
    },
    {
      title: "图片信息",
      dataIndex: "paperTestPicPathServer",
      align: "center",
    },
  ]

  columns_modify = [
    {
      title: "试剂浓度值%",
      dataIndex: "concentration",
      key: "concentration",
      width: 150,
      align: "center",
    },
    {
      title: "所需试验次数",
      dataIndex: "exp_num",
      key: "exp_num",
      width: 150,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            style={{ color: "black", background: "white" }}
            onClick={() => {
              this.modify_plan(record);
            }}
          >
            修改
          </Button>
        </Space>
      ),
    },
  ];

  loadData = (params) => {
    expList(params).then((res) => {
      console.log(res);
      let data = transformData(res.data ? res.data.data.info : []);
      this.setState({
        tableData: data,
        current: params.current,
        pageSize: params.pageSize,
        total: res.data ? res.data.data.total : 0,
      });
    });
  };
  //组件挂载时请求数据
  componentDidMount() {
    getExpPerson().then((res) => {
      // console.log('实验人员', res);
      this.setState({
        expPerson: res.data.data || [],
      });
    });
    //请求试剂类型
    getPaper().then((res) => {
      console.log(res);
      this.setState({
        paperType: res.data.data || [],
      });
    });
    //请求表格数据
    this.loadData({
      page: 1,
      pageSize: 10,
    });
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
  onSelectChange = (row) => {
    let newArr = [...new Set([...row, ...this.state.selectedRowKeysAll])]//并集
    this.setState({
      selectedRowKeys: row,
      selectedRowKeysAll: newArr
    }, () => {
      console.log("所选择行", this.state.selectedRowKeys);
    });
  };
  //批号输入框
  batchChange = (e) => {
    this.setState({
      input: Object.assign(this.state.input, { batch: e.target.value })
    })
  };
  //搜索栏实验人员选择框
  experChange = (e) => {
    this.setState({
      input: Object.assign(this.state.input, { exper: e }),
    });
  };
  //搜索栏试剂类型输入框
  typeChange = (e) => {
    this.setState({
      input: Object.assign(this.state.input, { type: e }),
    });
  };
  search = () => {
    // console.log("搜索", this.state.input);
    let params = {
      page: 1,
      pageSize: 10
    }
    if (this.state.input.batch) {
      params.bathNumber = this.state.input.batch
    }
    if (this.state.input.type) {
      params.paperTypeId = this.state.input.type
    }
    if (this.state.input.exper) {
      params.testPersonId = this.state.input.exper
    }
    // console.log(params);
    this.loadData(params)
  };
  //重置
  reset = () => {
    // console.log("重置", this.state.current, this.state.pageSize);
    let input = Object.assign(this.state.input, {
      batch: "",
      type: undefined,
      exper: undefined,
    });
    this.setState({
      selectedRowKeys: [],
      input,
      current: 1,
      pageSize: 10,
    });
    this.loadData({
      page: 1,
      pageSize: 10,
    });
  };
  //添加
  add = () => {
    console.log("添加");
    this.setState({
      visible_add: true,
    });
  };

  //导出已选择数据
  exportChoose = () => {
    console.log("导出已选择数据", this.state.selectedRowKeysAll);
    exportFile("/experiment/data/export/choose", this.state.selectedRowKeysAll);
  };
  //按搜索条件导出
  exportSearch = () => {
    console.log("按搜索条件导出", this.state.input);
    let params = {
      page: 1,
      pageSize: 10
    }
    if (this.state.input.batch) {
      params.bathNumber = this.state.input.batch
    }
    if (this.state.input.type) {
      params.paperTypeId = this.state.input.type
    }
    if (this.state.input.exper) {
      params.testPersonId = this.state.input.exper
    }
    exportFile("/experiment/data/export/condition", params);
  };
  typeChange_add = (e) => {
    console.log(e);
    getBathNum({ paperTypeId: e }).then((res) => {
      console.log(res);
      this.setState({
        bathNum_add: res.data ? res.data.data : [],
      });
    });
  };

  //点击添加完成
  handleOk_add = () => {
    console.log(this.form);
    let form = this.form.current;
    form
      .validateFields() //表单输入校验
      .then((values) => {
        form.resetFields();
        console.log(values);
        expDataAdd({
          testPersonId: values.exp_member,
          paperParamProId: values.batch_num,
          reactiveTime: values.time,
          concentrationValue: values.sights[0].reagent,
          allTestNumber: values.sights[0].card_num,
        }).then((res) => {
          this.setState({
            visible_add: false,
          });
          this.loadData({page:1,pageSize:10})
          if (res.data.msg === "保存成功") {
            message.success('添加成功')
          } else {
            message.warning('添加失败')
          }
        });
        
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  //添加关闭
  handleCancel_add = () => {
    this.setState({
      visible_add: false,
    });
    console.log("添加关闭");
  };
  //查看实验计划
  exp_plan = (record) => {
    console.log(record);
    getExpPlan({ paperTestPlanId: record.paperTestPlanId }).then((res) => {
      console.log(res);
      let data_plan = res.data ? res.data.data : [];
      for (let i = 0; i < data_plan.length; i++) {
        data_plan[i].key = i;
      }
      this.setState({
        visible_exp_plan: true,
        record,
        data_plan,
      });
    });
  };
  handleOk_exp_plan = () => {
    this.setState({
      visible_exp_plan: false,
    });
  };
  handleCancel_exp_plan = () => {
    this.setState({
      visible_exp_plan: false,
    });
  };
  //查看实验结果
  exp_result = (record) => {

    // console.log(record);
    // let chartDom=document.getElementById('chart')
    // let myChart = echarts.init(document.getElementById('chart'));
    // let myChart
    // let option
    // let tgodData = []
    // let cgodData = []
  //   option = {
  //     title: {
  //         text: '折线图堆叠'
  //     },
  //     tooltip: {
  //         trigger: 'axis'
  //     },
  //     legend: {
  //         data: ['T-GOD', 'C-GOD']
  //     },
  //     grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //     },
  //     toolbox: {
  //         feature: {
  //             saveAsImage: {}
  //         }
  //     },
  //     xAxis: {
  //         type: 'category'
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [
  //         {
  //             name: 'T-GOD',
  //             type: 'line',
  //             stack: '总量',
  //             data: tgodData
  //         },
  //         {
  //             name: 'C-GOD',
  //             type: 'line',
  //             stack: '总量',
  //             data: cgodData
  //         }
  //     ]
  // };
//   option = {
//     title: {
//         text: '折线图堆叠'
//     },
//     tooltip: {
//         trigger: 'axis'
//     },
//     legend: {
//         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     toolbox: {
//         feature: {
//             saveAsImage: {}
//         }
//     },
//     xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
//     },
//     yAxis: {
//         type: 'value'
//     },
//     series: [
//         {
//             name: '邮件营销',
//             type: 'line',
//             stack: '总量',
//             data: [120, 132, 101, 134, 90, 230, 210]
//         },
//         {
//             name: '联盟广告',
//             type: 'line',
//             stack: '总量',
//             data: [220, 182, 191, 234, 290, 330, 310]
//         },
//         {
//             name: '视频广告',
//             type: 'line',
//             stack: '总量',
//             data: [150, 232, 201, 154, 190, 330, 410]
//         },
//         {
//             name: '直接访问',
//             type: 'line',
//             stack: '总量',
//             data: [320, 332, 301, 334, 390, 330, 320]
//         },
//         {
//             name: '搜索引擎',
//             type: 'line',
//             stack: '总量',
//             data: [820, 932, 901, 934, 1290, 1330, 1320]
//         }
//     ]
// };
// option && myChart.setOption(option);
    getExpRes({ paperTestPlanId: record.paperTestPlanId }).then((res) => {
      console.log(res);
      let data_res = res.data ? res.data.data : [];
      data_res.forEach((item, index) => {
        item.key = index;
        // tgodData.push(item.tgod)
        // cgodData.push(item.cgod)
      });
      // option && myChart.setOption(option);
      this.setState({
        record,
        data_res,
      });
    });

    this.setState({
      visible_exp_result: true,
    });
  };
  handleOk_exp_result = () => {
    this.setState({
      visible_exp_result: false,
    });
  };
  handleCancel_exp_result = () => {
    this.setState({
      visible_exp_result: false,
    });
  };
  // 查看实验结果详情
  res_detail = (record) => {
    console.log(record);
    getExpResDetail({ paperTestPlanId: record.paperTestPlanId }).then((res) => {
      console.log(res);
      let data_res_detail = res.data ? res.data.data : []
      data_res_detail.forEach((item, index) => {
        item.key = index;
        item.batch_num = this.state.record.batch_num
        item.type = this.state.record.type
      });
      this.setState({
        visible_exp_resultDetail: true,
        record_detail: record,
        data_res_detail,
      })
    });
  };
  //实验结果中的导出
  exportResDetail = () => {
    exportFile("/experiment/data/export/result", {
      paperTestPlanId: this.state.record.paperTestPlanId,
    });
  };
  handleOk_exp_resultDetail = () => {
    this.setState({
      visible_exp_resultDetail: false,
    });
  }
  handleCancel_exp_resultDetail = () => {
    this.setState({
      visible_exp_resultDetail: false,
    });
  }
  //修改
  modify = (record) => {
    console.log("修改", record);
    message.info(
      record.state === 'plan_testing'
        ?
        '实验进行中无法修改'
        :
        '实验已完成无法修改'
    )
    // let data = Object.assign(this.state.modal, {
    //   batch: record.batch_num,
    //   type: record.type,
    //   r_time: record.r_time,
    //   exper: record.exper,
    // });
    // this.setState({
    //   visible_modify: true,
    //   modal: data,
    // });
  };
  handleOk_modify = () => {
    this.setState({
      visible_modify: false,
    });
  };
  handleCancel_modify = () => {
    this.setState({
      visible_modify: false,
    });
    // console.log('修改弹窗关闭')
  };
  //删除
  delete = (record) => {
    console.log("删除", record);
    expDataDelete({
      paperTestPlanId: record.paperTestPlanId,
      // paperTestPlanId: '1397513471591026690'
    }).then((res) => {
      console.log(res);
      this.loadData({
        page: 1,
        pageSize: 10,
      });
    });
  };
  //修改弹窗中修改按钮
  modify_plan = (record) => {
    // console.log('弹窗修改',record)
    let data = Object.assign(this.state.static, {
      concentration: record.concentration,
      exp_num: record.exp_num,
    });
    this.setState({
      visible_static: true,
      static: data,
    });
  };
  handleOk_static = () => {
    console.log(this.state.static.concentration, this.state.static.exp_num);
    this.setState({
      visible_static: false,
    });
  };
  handleCancel_static = () => {
    this.setState({
      visible_static: false,
    });
  };
  //主页面表格页数变化
  handTablechange = (pagination) => {
    console.log(pagination, pagination.current, pagination.pageSize);
    console.log(this.state.current, this.state.pageSize);
    let arr = this.state.selectedRowKeysAll
    let params = {
      page: pagination.current,
      pageSize: pagination.pageSize
    }
    if (this.state.input.batch) {
      params.bathNumber = this.state.input.batch
    }
    if (this.state.input.type) {
      params.paperTypeId = this.state.input.type
    }
    if (this.state.input.exper) {
      params.testPersonId = this.state.input.exper
    }
    this.loadData(params)
    this.setState({
      selectedRowKeys: arr,
    })
  };


  //修改试剂浓度
  concentrationChange = (e) => {
    console.log(e.target.value);
    this.setState({
      static: Object.assign(this.state.static, {
        concentration: e.target.value,
      }),
    });
  };
  //修改试验次数
  expnumChange = (e) => {
    console.log(e.target.value);
    let data = Object.assign({}, this.state.static, {
      exp_num: e.target.value,
    });
    this.setState({
      static: data,
    });
  };

  //表单验证
  form = React.createRef();

  render() {
    const {
      selectedRowKeys,
      paperType,
      expPerson,
      tableData,
      current,
      pageSize,
      total,
      record,
      bathNum_add,
      data_plan,
      data_res,
      data_res_detail,
      record_detail,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{ height: "100%" }}>
        {/* 输入框等 */}
        <div style={{ margin: "0 0 15px  0" }}>
          <div justify="space-between" gutter="15" style={{ display: "flex" }}>
            <Input
              placeholder="批号"
              className="input1"
              onChange={this.batchChange}
              value={this.state.input.batch}
            />
            <Select
              placeholder="试剂类型"
              onChange={this.typeChange}
              className="input1"
              dropdownStyle={{ width: "300px" }}
              value={this.state.input.type}
              allowClear
            >
              {paperType.map((paper, index) => {
                return (
                  <Option key={index} value={paper.paperTypeId}>
                    {paper.paperTypeName}
                  </Option>
                );
              })}
            </Select>
            <Select
              placeholder="实验人员"
              onChange={this.experChange}
              className="input1"
              value={this.state.input.exper}
              allowClear
            >
              {expPerson.map((item) => {
                return (
                  <Option key={item.testPersonId} value={item.testPersonId}>
                    {item.personName}
                  </Option>
                );
              })}
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
            style={{ margin: "20px 0", borderBottom: "1px,soild" }}
            pagination={{
              position: ["bottomLeft"],
              total,
              showTotal: (total) => `共 ${total} 条`,
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
          <div style={{ borderBottom: "1px solid gray" }}>新建实验任务</div>

          <div
            className="modal-body"
            style={{ height: "400px", marginTop: "20px" }}
          >
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              ref={this.form} //表单验证，通过ref获取
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: "400px" }}>
                  <Form.Item
                    label="选择实验人员"
                    name="exp_member"
                    rules={[{ required: true, message: " 请选择实验人员" }]}
                  >
                    <Select style={{ width: "150px" }} placeholder="实验人员">
                      {this.state.expPerson.map((item) => {
                        return (
                          <Option
                            key={item.testPersonId}
                            value={item.testPersonId}
                          >
                            {item.personName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ width: "400px" }}>
                  <Form.Item
                    label="选择试剂类型"
                    name="type"
                    rules={[{ required: true, message: " 请选择试剂类型" }]}
                  >
                    <Select
                      style={{ width: "150px" }}
                      placeholder="试剂类型"
                      onChange={this.typeChange_add}
                    >
                      {paperType.map((paper, index) => {
                        return (
                          <Option key={index} value={paper.paperTypeId}>
                            {paper.paperTypeName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "400px" }}>
                  <Form.Item
                    label="批号"
                    name="batch_num"
                    rules={[{ required: true, message: " 请选择批号" }]}
                  >
                    <Select
                      style={{ width: "150px" }}
                      placeholder="请先选择试剂类型"
                    >
                      {bathNum_add.map((item, index) => {
                        return (
                          <Option key={index} value={item.paperParamProId}>
                            {item.bathNumber}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ width: "400px" }}>
                  <Form.Item
                    label="试剂卡反应时间（分）"
                    name="time"
                    rules={[
                      { required: true, message: " 请填写试剂卡反应时间" },
                    ]}
                  >
                    <Input
                      style={{ width: "150px" }}
                      placeholder="试剂卡反应时间"
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.List name="sights">
                {(fields, { add, remove }) => (
                  <>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "400px" }}>
                        <Form.Item>
                          <div style={{ width: "400px", display: "flex" }}>
                            <PlusSquareFilled
                              style={{
                                color: "#f05d73",
                                fontSize: "30px",
                                margin: "10px 10px 10px 60px",
                              }}
                              onClick={() => add()}
                            />
                            <div style={{ fontSize: "20px", margin: "8px" }}>
                              试剂浓度值
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                      <div style={{ width: "400px" }}>
                        <Form.Item>
                          <div style={{ width: "400px", display: "flex" }}>
                            <div
                              style={{
                                fontSize: "20px",
                                lineHeight: "50px",
                                marginLeft: "10px",
                              }}
                            >
                              所需实验试剂卡数量(个)
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area ||
                            prevValues.sights !== curValues.sights
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              name={[field.name, "reagent"]}
                              fieldKey={[field.fieldKey, "reagent"]}
                              rules={[
                                { required: true, message: "请填写试剂浓度！" },
                              ]}
                              style={{ marginLeft: "60px" }}
                            >
                              <Input
                                placeholder="试剂浓度"
                                style={{ width: "300px" }}
                              />
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "card_num"]}
                          fieldKey={[field.fieldKey, "card_num"]}
                          rules={[
                            {
                              required: true,
                              message: "请填写实验试剂卡数量！",
                            },
                          ]}
                        >
                          <Input
                            placeholder="实验试剂卡数量"
                            style={{ width: "300px" }}
                          />
                        </Form.Item>
                        <DeleteFilled
                          onClick={() => remove(field.name)}
                          style={{ color: "#f05d73" }}
                        />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </Modal>
        {/* 查看实验计划弹窗 */}
        <Modal
          title="查询实验计划"
          centered
          visible={this.state.visible_exp_plan}
          onOk={this.handleOk_exp_plan}
          okText="确定"
          onCancel={this.handleCancel_exp_plan}
          cancelText="关闭"
          width="1000px"
          height="600px"
        >
          <div className="ant-modal-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>实验人员:{record.exper}</p>
              <p>批号：{record.batch_num}</p>
              <p>
                试剂类型：
                {this.state.paperType.map((paper) => {
                if (paper.paperTypeId === record.type)
                  return paper.paperTypeName;
                else return null;
              })}
              </p>
              <p>试剂卡反应时间(min)：{record.r_time}</p>
            </div>
            <Table
              columns={this.columns_plan}
              dataSource={data_plan}
              bordered={true}
              style={{ margin: "20px 0", borderBottom: "1px,soild" }}
              pagination={{
                position: ["bottomLeft"],
                total: "data.length",
                showTotal: (total) => `共 ${total} 条`,
                showQuickJumper: true,
                showSizeChanger: true,
              }}
              size="small"
            />
          </div>
        </Modal>
        {/* 查看实验结果弹窗 */}
        <Modal
          title="查询实验结果"
          centered
          visible={this.state.visible_exp_result}
          onOk={this.handleOk_exp_result}
          okText="确定"
          onCancel={this.handleCancel_exp_result}
          cancelText="关闭"
          width="700px"
        >
          <div className="ant-modal-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>批号：{record.batch_num}</p>
              <p>
                试剂类型：
                {this.state.paperType.map((paper) => {
                if (paper.paperTypeId === record.type)
                  return paper.paperTypeName;
                else return null;
              })}
              </p>
            </div>
            <div id='chart' style={{width:'300px',height:'300px'}} ></div>
            <Table
              columns={this.columns_res}
              dataSource={data_res}
              bordered={true}
              style={{ margin: "20px 0", borderBottom: "1px,soild" }}
              pagination={{
                position: ["bottomLeft"],
                total: "data.length",
                showTotal: (total) => `共 ${total} 条`,
                showQuickJumper: true,
                showSizeChanger: true,
              }}
              size="small"
            />
            <Button
              type="primary"
              icon={<CloudDownloadOutlined className="icon1" />}
              onClick={this.exportResDetail}
              style={{
                width: '150px',
                height: '40px',
                fontSize: '18px',

              }}
            >
              导出
          </Button>
          </div>
        </Modal>
        {/* 实验结果中的实验详情弹窗 */}
        <Modal
          title="查询实验详情"
          centered
          visible={this.state.visible_exp_resultDetail}
          onOk={this.handleOk_exp_resultDetail}
          okText="确定"
          onCancel={this.handleCancel_exp_resultDetail}
          cancelText="关闭"
          width="1000px"
        >
          <div className="ant-modal-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>浓度:{record_detail.concentrationValue}</p>
              <p>实验次数:{record_detail.finishTestNumber}</p>
              <p>T-GOD平均值:{record_detail.tgod}</p>
              <p>T-GOD2平均值:{record_detail.tgod2}</p>
              <p>C-GOD平均值:{record_detail.cgod}</p>
              <p>C-COLOR平均值:{record_detail.ccolor}</p>
            </div>
            <Table
              columns={this.columns_res_detail}
              dataSource={data_res_detail}
              bordered={true}
              style={{ margin: "20px 0", borderBottom: "1px,soild" }}
              pagination={{
                position: ["bottomLeft"],
                total: "data.length",
                showTotal: (total) => `共 ${total} 条`,
                showQuickJumper: true,
                showSizeChanger: true,
              }}
              size="small"
            />

          </div>

        </Modal>
        {/* 修改弹窗 */}
        {/* <Modal
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
            <div style={{ fontWeight: "bold", marginTop: "-20px" }}>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  批号：{this.state.modal.batch}
                </div>
                <div style={{ width: "50%" }}>
                  试剂类型：{this.state.modal.type}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  试剂卡反应时间（分钟）：{this.state.modal.r_time}
                </div>
                <div style={{ width: "50%" }}>
                  实验人员:{this.state.modal.exper}
                </div>
              </div>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
              <Table
                columns={this.columns_modify}
                dataSource={data_modify}
                bordered={true}
                style={{ margin: "20px 0", borderBottom: "1px,soild" }}
                pagination={{
                  position: ["bottomLeft"],
                  total: "data.length",
                  showTotal: (total) => `共 ${total} 条`,
                  showQuickJumper: true,
                  showSizeChanger: true,
                }}
                size="small"
              />
            </div>
          </div>
        </Modal> */}
        {/* 修改弹窗中修改表格数据弹窗 */}
        {/* <Modal
          title="修改实验数据"
          centered
          visible={this.state.visible_static}
          onOk={this.handleOk_static}
          okText="确定"
          onCancel={this.handleCancel_static}
          cancelText="关闭"
          width="600px"
        >
          <div style={{ borderBottom: "1px solid gray" }}>基本信息</div>
          <div className="ant-modal-body">
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "20%", lineHeight: "28px" }}>
                  试剂浓度值
                </div>
                <input
                  value={this.state.static.concentration}
                  style={{ width: "60%" }}
                  onChange={this.concentrationChange.bind(this)}
                />
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div style={{ width: "20%", lineHeight: "28px" }}>
                  所需试验次数
                </div>
                <input
                  value={this.state.static.exp_num}
                  style={{ width: "60%" }}
                  onChange={this.expnumChange.bind(this)}
                />
              </div>
            </div>
          </div>
        </Modal> */}
      </div>
    );
  }
}
