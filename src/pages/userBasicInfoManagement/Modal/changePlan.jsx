import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Table, Tag, Space } from 'antd';
import httpRequest from "../../../http";
import '../index.css'

export default class changePlan extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        visible: false,
        data: {
            eupregnaTestPaperDataId: this.props.eupregnaTestPaperDataId,
            planTime: '',
            outTime: '',
            changeReason: '',
        }
    }
    changeEvent(e, target) {
        // console.log(e.target.id);
        // console.log(e.target.value);
        var data = { ...this.state.data };
        data[target] = e._d.toLocaleDateString();
        this.setState({
            data: data
        }, () => {
            console.log(this.state.data);
        }
        )

    };
    render() {
        const showModal = (e) => {
            console.log(e);
            this.setState({
                visible: true,
            }
            )
        };

        const handleOk = () => {
            this.setState({
                modalText: 'OKKKKK',
            }
            );
            httpRequest('get', 'http://java.xixibackup.me:8080/user/test/data/modify/plan', this.state.data).then(response => {
                console.log(response.data.data)

            });
            setTimeout(() => {
                this.setState({
                    visible: true,
                    confirmLoading: true,
                }
                )
            }, 2000);
        };

        const handleCancel = () => {
            console.log('Clicked cancel button');
            this.setState({
                visible: false,
            }
            )
        };
        return (
            <div>
                <Button onClick={showModal}>修改</Button>
                <Modal title="修改测试计划" visible={this.state.visible} onOk={handleOk} onCancel={handleCancel}>
                    <p>基本信息</p>
                    <Button onClick={() => { console.log(this.props) }}>测试</Button>
                    <div style={{ marginLeft: '15px' }}>
                        <p>用户:{this.props.userName}</p>
                        <p>试剂:&nbsp;{this.props.paperName}</p>
                        <p>测试集:{this.props.testType}</p>
                        <span>计划时间:</span>
                        <DatePicker onChange={(e) => this.changeEvent(e, 'planTime')} style={{ width: '100%' }} />
                        <span>超时时间:</span>
                        <DatePicker onChange={(e) => this.changeEvent(e, 'outTime')} style={{ width: '100%' }} />
                        <span>计划修改原因</span>
                        <Input
                            onChange={(e) => this.changeEvent(e, 'changeReason')}
                            placeholder="输入修改原因" />
                    </div>
                </Modal>
            </div>
        )
    }

}