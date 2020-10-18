// 后台管理的路由组件
import React, { Component } from 'react'
import {Route , Switch , Link} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import './index.less'
// import './index.css'
//首页
import Home from '../home/home'
//用户基础信息管理
import UserBasicInfoManagement from '../userBasicInfoManagement/userBasicInfoManagement'
import UserDeviceManagement from '../userBasicInfoManagement/userDeviceManagement'
import UserMobileMsgManagement from '../userBasicInfoManagement/userMobileMsgManagement'
import UserMsg from '../userBasicInfoManagement/userMsg'
import UserSMSmanagement from '../userBasicInfoManagement/userSMSmanagement'
import UserTestDataManagement from '../userBasicInfoManagement/userTestDataManagement'
import VerificationSMSinquire from '../userBasicInfoManagement/verificationSMSinquire'
//基础信息管理
import TestSet from '../basicInfoManagement/testSet'
import TestType from '../basicInfoManagement/testType'
import ReagentType from '../basicInfoManagement/reagentType'
import ReagentJudgeParams from '../basicInfoManagement/reagentJudgeParams'
import UnitManagement from '../basicInfoManagement/unitManagement'
import ProjectType from '../basicInfoManagement/projectType'
//专业测试管理
import ProfessionTestData from '../professionTestManagement/professionTestData'
import AccountInfo from '../professionTestManagement/accountInfo'
import PatientInfo from '../professionTestManagement/patientInfo'
//设备管理
import DeviceManagement from '../deviceManagement/deviceManagement'
// 实验管理
import ExperimentData from  '../experimentManagement/experimentData'
import Experimenter from  '../experimentManagement/experimenter'
// 优孕宝家庭版统计
import TestData from  '../yybHomeEditionStatistics/testData'
import ActualTest from  '../yybHomeEditionStatistics/actualTest'
import MissingTestThisPeriod from  '../yybHomeEditionStatistics/missingTestThisPeriod'
import UserInTest from  '../yybHomeEditionStatistics/userInTest'
import NewlyRegisteredUser from  '../yybHomeEditionStatistics/newlyRegisteredUser'
import NewlyRegisteredUsingUser from  '../yybHomeEditionStatistics/newlyRegisteredUsingUser'
import UserMedication from  '../yybHomeEditionStatistics/userMedication'
import AllUser from  '../yybHomeEditionStatistics/allUser'
import ValidUser from  '../yybHomeEditionStatistics/validUser'
import MissingTsetUser from  '../yybHomeEditionStatistics/missingTsetUser'
import TestUserThisPeriod from  '../yybHomeEditionStatistics/testUserThisPeriod'
// 优孕宝专业版统计
import YybProfessionEditionStatistics from '../yybProfessionEditionStatistics/yybProfessionEditionStatistics'
// 客服系统
import UserManagement from '../serviceSystem/userManagement'
import DeviceManagement_Serve from '../serviceSystem/deviceManagement'
import ServiceManagement from '../serviceSystem/serviceManagement'



const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;





export default class Admin extends Component {
    state = {
        collapsed: false,
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    

    render() {
        return (
            <Layout style={{height:'100%'}}>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}  className="left-nav"> 
              <div className="logo" />
              <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    style={{background:' #f05d73'}}
                    inlineCollapsed={this.state.collapsed}
                    >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="用户基础信息管理"  >
                        <Menu.Item key="2"><Link to='/userBasicInfoManagement/userBasicInfoManagement'>用户基础信息管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/userBasicInfoManagement/userTestDataManagement' >用户测试数据管理</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/userBasicInfoManagement/userDeviceManagement' >用户设备管理</Link></Menu.Item>
                        <Menu.Item key="5"><Link to='/userBasicInfoManagement/userMsg' >用户消息</Link></Menu.Item>
                        <Menu.Item key="6"><Link to='/userBasicInfoManagement/userSMSmanagement' >用户短信管理</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/userBasicInfoManagement/userMobileMsgManagement' >用户手机信息管理</Link></Menu.Item>
                        <Menu.Item key="8"><Link to='/userBasicInfoManagement/verificationSMSinquire' >验证短信查询</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="基础信息管理">
                        <Menu.Item key="9"><Link to='/basicInfoManagement/testSet' />测试集</Menu.Item>
                        <Menu.Item key="10"><Link to='/basicInfoManagement/testType' />测试类型</Menu.Item>
                        <Menu.Item key="11"><Link to='/basicInfoManagement/reagentType' />试剂类型</Menu.Item>
                        <Menu.Item key="12"><Link to='/basicInfoManagement/reagentJudgeParams' />试剂判读参数</Menu.Item>
                        <Menu.Item key="13"><Link to='/basicInfoManagement/unitManagement' />单位管理</Menu.Item>
                        <Menu.Item key="14"><Link to='/basicInfoManagement/projectType' />计划类型</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title="专业测试管理">
                        <Menu.Item key="15"><Link to='/professionTestManagement/professionTestData' />专业测试数据</Menu.Item>
                        <Menu.Item key="16"><Link to='/professionTestManagement/accountInfo' />账号信息</Menu.Item>
                        <Menu.Item key="17"><Link to='/professionTestManagement/patientInfo' />病人信息</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="18" icon={<UserOutlined />}>
                    <Link to='/deviceManagement' />
                      设备管理
                    </Menu.Item>
                    <SubMenu key="sub4" title="实验管理">
                        <Menu.Item key="19"><Link to='/experimentManagement/experimentData' />实验数据</Menu.Item>
                        <Menu.Item key="20"><Link to='/experimentManagement/experimenter' />实验人员</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<UserOutlined />} title="优孕宝家庭版统计">
                        <Menu.Item key="21"><Link to='/yybHomeEditionStatistics/testData' />测试数据</Menu.Item>
                        <Menu.Item key="22"><Link to='/yybHomeEditionStatistics/actualTest' />实际在测</Menu.Item>
                        <Menu.Item key="23"><Link to='/yybHomeEditionStatistics/missingTestThisPeriod' />本周期漏测</Menu.Item>
                        <Menu.Item key="24"><Link to='/yybHomeEditionStatistics/userInTest' />在测用户</Menu.Item>
                        <Menu.Item key="25"><Link to='/yybHomeEditionStatistics/newlyRegisteredUser' />新注册用户</Menu.Item>
                        <Menu.Item key="26"><Link to='/yybHomeEditionStatistics/newlyRegisteredUsingUser' />新注册使用用户</Menu.Item>
                        <Menu.Item key="27"><Link to='/yybHomeEditionStatistics/userMedication' />用户用药</Menu.Item>
                        <Menu.Item key="28"><Link to='/yybHomeEditionStatistics/allUser' />所有用户</Menu.Item>
                        <Menu.Item key="29"><Link to='/yybHomeEditionStatistics/validUser' />有效用户</Menu.Item>
                        <Menu.Item key="30"><Link to='/yybHomeEditionStatistics/missingTsetUser' />漏测用户</Menu.Item>
                        <Menu.Item key="31"><Link to='/yybHomeEditionStatistics/testUserThisPeriod' />当前周期测试用户</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="32" icon={<UserOutlined />}>
                    <Link to='/yybProfessionEditionStatistics' />
                        优孕宝专业版统计
                    </Menu.Item>
                    <SubMenu key="sub6" title="客服系统">
                        <Menu.Item key="33"><Link to='/serviceSystem/userManagement' />用户管理</Menu.Item>
                        <Menu.Item key="34"><Link to='/serviceSystem/deviceManagement' />设备管理</Menu.Item>
                        <Menu.Item key="35"><Link to='/serviceSystem/serviceManagement' />客服管理</Menu.Item>
                    </SubMenu>
                    </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </Header>

              {/* 内容部分二级路由配置 */}
              <Content
                className="site-layout-background"
                style={{ margin: '24px 16px', padding: 24,  minHeight: 800, }}
              >
                <Switch>
                  <Route path="/home" exact component={Home} />

                  <Route path="/userBasicInfoManagement/userBasicInfoManagement"  component={UserBasicInfoManagement} />
                  <Route path="/userBasicInfoManagement/userDeviceManagement"  component={UserDeviceManagement} />
                  <Route path="/userBasicInfoManagement/userMobileMsgManagement"  component={UserMobileMsgManagement} />
                  <Route path="/userBasicInfoManagement/userMsg"  component={UserMsg} />
                  <Route path="/userBasicInfoManagement/userSMSmanagement"  component={UserSMSmanagement} />
                  <Route path="/userBasicInfoManagement/userTestDataManagement"  component={UserTestDataManagement} />
                  <Route path="/userBasicInfoManagement/verificationSMSinquire"  component={VerificationSMSinquire} />

                  <Route path="/basicInfoManagement/testSet"  component={TestSet} />
                  <Route path="/basicInfoManagement/testType"  component={TestType} />
                  <Route path="/basicInfoManagement/reagentType"  component={ReagentType} />
                  <Route path="/basicInfoManagement/reagentJudgeParams"  component={ReagentJudgeParams} />
                  <Route path="/basicInfoManagement/unitManagement"  component={UnitManagement} />
                  <Route path="/basicInfoManagement/projectType"  component={ProjectType} />

                  <Route path="/professionTestManagement/professionTestData"  component={ProfessionTestData} />
                  <Route path="/professionTestManagement/accountInfo"  component={AccountInfo} />
                  <Route path="/professionTestManagement/patientInfo"  component={PatientInfo} />

                  <Route path="/deviceManagement"  component={DeviceManagement} />

                  <Route path="/experimentManagement/experimentData"  component={ExperimentData} />
                  <Route path="/experimentManagement/experimenter"  component={Experimenter} />

                  <Route path="/yybHomeEditionStatistics/testData"  component={TestData} />
                  <Route path="/yybHomeEditionStatistics/actualTest"  component={ActualTest} />
                  <Route path="/yybHomeEditionStatistics/missingTestThisPeriod"  component={MissingTestThisPeriod} />
                  <Route path="/yybHomeEditionStatistics/userInTest"  component={UserInTest} />
                  <Route path="/yybHomeEditionStatistics/newlyRegisteredUser"  component={NewlyRegisteredUser} />
                  <Route path="/yybHomeEditionStatistics/newlyRegisteredUsingUser"  component={NewlyRegisteredUsingUser} />
                  <Route path="/yybHomeEditionStatistics/userMedication"  component={UserMedication} />
                  <Route path="/yybHomeEditionStatistics/allUser"  component={AllUser} />
                  <Route path="/yybHomeEditionStatistics/validUser"  component={ValidUser} />
                  <Route path="/yybHomeEditionStatistics/missingTsetUser"  component={MissingTsetUser} />
                  <Route path="/yybHomeEditionStatistics/testUserThisPeriod"  component={TestUserThisPeriod} />

                  <Route path="/yybProfessionEditionStatistics"  component={YybProfessionEditionStatistics} />

                  <Route path="/serviceSystem/userManagement"  component={UserManagement} />
                  <Route path="/serviceSystem/deviceManagement"  component={DeviceManagement_Serve} />
                  <Route path="/serviceSystem/serviceManagement"  component={ServiceManagement} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}
