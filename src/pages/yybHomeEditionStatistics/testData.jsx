import React, { Component } from 'react'
import { Table, Button } from 'antd';



const columns = [
    {
      title: '客户',
      dataIndex: 'customer',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '试剂类型',
      dataIndex: 'reagent_type',
    },
    {
      title: '测试阶段',
      dataIndex: 'test_stage',
    },
    {
      title: '数值',
      dataIndex: 'num_value',
    },
    {
      title: 'TGOD',
      dataIndex: 'TGOD',
    },
    {
      title: 'CGOD',
      dataIndex: 'CGOD',
    },
    {
      title: '结论',
      dataIndex: 'conclusion',
    },
    {
      title: '测试时间',
      dataIndex: 'test_time',
    },
    {
      title: '计划时间',
      dataIndex: 'plan_time',
    },
    {
      title: '设备号',
      dataIndex: 'dev_num',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      customer: `123123123${i}`,
      name: `客户 ${i}`,
      reagent_type: `类型 ${i}`,
      test_stage:`早期胚胎阶段`,
      num_value:`${i}.${i}`,
      TGOD :`dasd `,
      CGOD :`6.1${i}`,
      conclusion : `结论 ${i}`,
      test_time : `2020-07-14`,
      plan_time : `2018-07-20`,
      dev_num : `adx03${i}`,
    });
  }





export default class TestData extends Component {

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      };
    
      start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      };
    
      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };



    render() {

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;


        return (
<div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered={true} />
      </div>
        )
    }
}
