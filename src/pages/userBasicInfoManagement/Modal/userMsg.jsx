import { Modal, Button } from 'antd';
import React, { Component } from 'react'
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

 import httpRequest from "../../../http";
import '../index.css'
export default class userMsg extends Component {
    constructor(props) {
        super(props);
        
    }

    state = {
        visible: false,
        confirmLoading: false,
        modalText: 'Content of the modal',
        data:this.props,
        mode:this.props.mode=='show'?true:false
    };
    changeEvent(e){
        // console.log(e.target.id);
        // console.log(e.target.value);
        var data = {...this.state.data}; 
        data[e.target.id]=e.target.value;
        // console.log(data[e.target.id]);
        this.setState({
            data:data
        },()=>{
            console.log(this.state.data);
        }
        )
        
    };
    componentWillReceiveProps(){
        if(this.props.mode=='update'){
                this.setState({
                    visible: true,
                    mode:this.props.mode=='show'?true:false
                }
                )
            
        };
        console.log('子组件'+this.state.mode)
    }
    render() {
        
        
        const showModal = (e) => {
            console.log(e);
            this.setState({
                visible: true,
            }
            )
        };
        
        const handleOk = () => {
            this.setState(  {
                modalText: 'OKKKKK',
            }
            );
            var data1={
                 "page":1,
                 "pageSize":20
               };
             httpRequest('post','http://java.xixibackup.me:8080/user/management/test/list',data1).then(response=>{
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
            console.log(this.state.mode);
            this.setState({
                visible: false,
            }
            )
        };
        
        return (
            
            <div>
                <div type="primary" style={{textDecoration:'underline'}} 
                onClick={showModal}
                // className={this.state.mode==true?null:'hidden'}
                >
                    {this.props.userName}
                </div>
                <Modal
                    title="用户信息详情"
                    visible={this.state.visible}
                    onOk={handleOk}
                    okText='提交'
                    confirmLoading={this.state.confirmLoading}
                    onCancel={handleCancel}
                    cancelText='取消'
                    width='1000px'
                >
                    <div className="site-input-group-wrapper">
                    {/* 弹窗第一行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>姓名：</span>
                                       <Input style={{width:'190px'}}  disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id={'userName'} defaultValue={this.props.userName} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>性别：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id={'gender'} defaultValue={this.props.gender=='F'?'女':'男'} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第二行 */}
                    <Row gutter={12} style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>用户昵称：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id={'nickName'} defaultValue={this.props.nickName} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>测试账号：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='testAccount' defaultValue={this.props.testAccount} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第三行 */}
                    <Row gutter={12} style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={16}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>用户备注：</span>
                                       <Input style={{width:'513px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='userRemark' defaultValue={this.props.userRemark} />
                                       </div>
                    </Col>            
                    <Col span={4}>
                    </Col>
                    </Row>
                     {/* 弹窗第四行 */}
                     <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>男方年龄：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='manAge' defaultValue={this.props.manAge} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>女方年龄：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='womanAge' defaultValue={this.props.womanAge} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                     {/* 弹窗第五行 */}
                     <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>男方生日：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='manBirthday' defaultValue={this.props.manBirthday} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>女方生日：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='womanBirthday' defaultValue={this.props.womanBirthday} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第六行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>末次月经时间：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='lastBleeding' defaultValue={this.props.lastBleeding} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>末次月经周期天数：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='lastCycleNumber' defaultValue={this.props.lastCycleNumber} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第七行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>生理周期：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='cycle' defaultValue={this.props.cycle} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>测试时间：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='preferTestTime' defaultValue={this.props.preferTestTime} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第八行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>测试状态：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='testStatus' defaultValue={this.props.testStatus} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>状态：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='status' defaultValue={this.props.status} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第九行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>邮箱：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='email' defaultValue={this.props.email} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>手机号：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='phone' defaultValue={this.props.phone} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十行 */}
                    <Row gutter={12} style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={16}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>地址：</span>
                                       <Input style={{width:'513px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='address' defaultValue={this.props.address} />
                                       </div>
                    </Col>            
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十一行 */}
                    <Row gutter={12} style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={16}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>描述：</span>
                                       <Input style={{width:'513px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='description' defaultValue={this.props.description} />
                                       </div>
                    </Col>            
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十二行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>注册时间：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='regTime' defaultValue={this.props.regTime} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>注册状态：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='regStatus' defaultValue={this.props.regStatus} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十三行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>最短生理周期：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='minCycle' defaultValue={this.props.minCycle} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>最长生理周期：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='maxCycle' defaultValue={this.props.maxCycle} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十四行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>用户号：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='clientId' defaultValue={this.props.clientId} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>医生：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='doctor' defaultValue={this.props.doctor} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十五行 */}
                    <Row gutter={12} style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={16}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>当前使用设备：</span>
                                       <Input style={{width:'513px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='deviceNo' defaultValue={this.props.deviceNo} />
                                       </div>
                    </Col>            
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十六行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>配偶姓名：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='femaleName' defaultValue={this.props.femaleName} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>婚龄：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='marriedYears' defaultValue={this.props.marriedYears} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十七行1 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>是否有过生育：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='hasBearing' defaultValue={this.props.hasBearing} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>是否做过孕检：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='hasPregnantCheck' defaultValue={this.props.hasPregnantCheck} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十七行2 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>是否有生育疾病：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='hasPregnantIllness' defaultValue={this.props.hasPregnantIllness} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>生育疾病：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='pregnantIllness' defaultValue={this.props.pregnantIllness} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十八行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>常见生理周期：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='commonCycle' defaultValue={this.props.commonCycle} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>免打扰开始时间：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='dndTimeStart' defaultValue={this.props.dndTimeStart} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                    {/* 弹窗第十九行 */}
                    <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>免打扰结束时间：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='dndTimeEnd' defaultValue={this.props.dndTimeEnd} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>指导类型：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='schemeType' defaultValue={this.props.schemeType} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                   {/* 弹窗第二十行 */}
                   <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>终止测试：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='ended' defaultValue={this.props.ended} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>终止优孕保测试：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='eupregnaEnded' defaultValue={this.props.eupregnaEnded} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                   {/* 弹窗第二十一行 */}
                   <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>是否上传日志：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='uploadLogFlag' defaultValue={this.props.uploadLogFlag} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>微信OpenID：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='wechat' defaultValue={this.props.wechat} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>
                   {/* 弹窗第二十二行 */}
                   <Row gutter={12} 
                    style={{paddingBottom:'10px'}}>
                    <Col span={4}>
                    </Col>     
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>环信用户账号：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='csClientId' defaultValue={this.props.csClientId} />
                                       </div>
                    </Col>            
                    <Col span={8}>
                                   <div >
                                       <span style={{display:'inline-block',width:'70px'}}>环信用户密码：</span>
                                       <Input style={{width:'190px'}} disabled={this.state.mode} onChange={(e)=>this.changeEvent(e)} id='password' defaultValue={this.props.password} />
                                       </div>
                    </Col>
                    <Col span={4}>
                    </Col>
                    </Row>



                    </div>
                </Modal>
            </div>
        )
    }
}