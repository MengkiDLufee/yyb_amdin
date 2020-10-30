// 后台管理的路由组件
import React, { Component } from 'react'
import {Route , Switch , Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    ReloadOutlined,
    FullscreenOutlined,
    EllipsisOutlined,
    CaretDownOutlined,
    UnorderedListOutlined,
    MinusOutlined
  } from '@ant-design/icons';
import './index.less'
import menuList from '../../config/menuConfig'
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
      refresh = () => {
        console.log('刷新')
      };

      //根据menu数据生成对应标签数组，动态生成导航栏，此方法没能解决动态生成icon、问题
      getMenuNodes = (menuList) => {
        return menuList.map(item =>{
          if(!item.children) {
            return (
              <Menu.Item key={item.key} icon={<UserOutlined />}>
                <Link to={item.key}>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu key={item.key} title={item.title} icon={<UnorderedListOutlined />} >
                {this.getMenuNodes(item.children)}
              </SubMenu>
            )
          }
        })
      }
      //顶部左侧显示页面名称
    getTitle = () => {
        const path = this.props.location.pathname
        console.log(path)
        let title
        menuList.forEach(el => {
          if(el.key === path) {
            title = el.title
          } else if (el.children) {
            //在children中查找匹配
            const c_el = el.children.find(c_el =>c_el.key===path)
            if(c_el) {
              title = c_el.title
            }
          }
        });
        return title
    }
          //顶部右侧显示页面名称
          getTitleRight = () => {
            const path = this.props.location.pathname
            console.log(path)
            let title
            menuList.forEach(el => {
              if(el.key === path) {
                title = el.title
              } else if (el.children) {
                //在children中查找匹配
                const c_el = el.children.find(c_el =>c_el.key===path)
                if(c_el) {
                  title = el.title+` / `+ c_el.title 
                }
              }
            });
            return title
        }

    render() {
        return (
            <Layout style={{height:'100%'}}>
              {/* 左侧导航栏 */}
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}  className="left-nav"> 
              <div className="logo" ><h1 style={{color:'white',paddingTop:'5px'}}>logo</h1></div>
              <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    style={{background:' #f05d73'}}
                    
                    >
                      {/* 调用生成导航栏函数 */}
                       {this.getMenuNodes(menuList)}

                    {/* <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to='/home' />首页
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="用户基础信息管理"  >
                        <Menu.Item key="2"><Link to='/user' />用户基础信息管理</Menu.Item>
                        <Menu.Item key="3"><Link to='/user/test' />用户测试数据管理</Menu.Item>
                        <Menu.Item key="4"><Link to='/user/device' />用户设备管理</Menu.Item>
                        <Menu.Item key="5"><Link to='/user/easemod/msg' />用户消息</Menu.Item>
                        <Menu.Item key="6"><Link to='/user/msg' />用户短信管理</Menu.Item>
                        <Menu.Item key="7"><Link to='/user/phone' />用户手机信息管理</Menu.Item>
                        <Menu.Item key="8"><Link to='/user/code' />验证短信查询</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="基础信息管理">
                        <Menu.Item key="9"><Link to='/test' />测试集</Menu.Item>
                        <Menu.Item key="10"><Link to='/test/type' />测试类型</Menu.Item>
                        <Menu.Item key="11"><Link to='/reagent/type' />试剂类型</Menu.Item>
                        <Menu.Item key="12"><Link to='/reagent/params' />试剂判读参数</Menu.Item>
                        <Menu.Item key="13"><Link to='/unit' />单位管理</Menu.Item>
                        <Menu.Item key="14"><Link to='/plan/type' />计划类型</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title="专业测试管理">
                        <Menu.Item key="15"><Link to='/prof/test' />专业测试数据</Menu.Item>
                        <Menu.Item key="16"><Link to='/prof/account' />账号信息</Menu.Item>
                        <Menu.Item key="17"><Link to='/prof/patient' />病人信息</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="18" icon={<UserOutlined />}>
                    <Link to='/device' />
                      设备管理
                    </Menu.Item>
                    <SubMenu key="sub4" title="实验管理">
                        <Menu.Item key="19"><Link to='/exp/data' />实验数据</Menu.Item>
                        <Menu.Item key="20"><Link to='/exp/member' />实验人员</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<UserOutlined />} title="优孕宝家庭版统计">
                        <Menu.Item key="21"><Link to='/home_e/test' />测试数据</Menu.Item>
                        <Menu.Item key="22"><Link to='/home_e/test_real' />实际在测</Menu.Item>
                        <Menu.Item key="23"><Link to='/home_e/miss' />本周期漏测</Menu.Item>
                        <Menu.Item key="24"><Link to='/home_e/test_on' />在测用户</Menu.Item>
                        <Menu.Item key="25"><Link to='/home_e/user_new' />新注册用户</Menu.Item>
                        <Menu.Item key="26"><Link to='/home_e/using_new' />新注册使用用户</Menu.Item>
                        <Menu.Item key="27"><Link to='/home_e/med' />用户用药</Menu.Item>
                        <Menu.Item key="28"><Link to='/home_e/user_all' />所有用户</Menu.Item>
                        <Menu.Item key="29"><Link to='/home_e/user_valid' />有效用户</Menu.Item>
                        <Menu.Item key="30"><Link to='/home_e/user_miss' />漏测用户</Menu.Item>
                        <Menu.Item key="31"><Link to='/home_e/user_period' />当前周期测试用户</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="32" icon={<UserOutlined />}>
                    <Link to='/pro_edition' />
                        优孕宝专业版统计
                    </Menu.Item>
                    <SubMenu key="sub6" title="客服系统">
                        <Menu.Item key="33"><Link to='/serve/user' />用户管理</Menu.Item>
                        <Menu.Item key="34"><Link to='/serve/device' />设备管理</Menu.Item>
                        <Menu.Item key="35"><Link to='/service' />客服管理</Menu.Item>
                    </SubMenu> */}
                    </Menu>
            </Sider>

            <Layout className="site-layout">
              {/* 顶部 */}
              <Header className="site-layout-background" style={{ padding: 0 ,height:'120px'}}>
                {/* 顶部上方 */}
                <div  className="header-top" >
                  <div>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: this.toggle,
                    }) }
                    <ReloadOutlined style={{fontSize:'18px'}} onClick={this.refresh} />

                    <span style={{fontSize:'18px',float:'right',marginRight:'20px'}} >
                      <FullscreenOutlined  style={{fontSize:'18px',marginRight:'60px'}}/>
                      {/* eupregna */}
                      <span style={{fontSize:'21px' }}>eupregna</span>
                      <CaretDownOutlined />
                      <EllipsisOutlined rotate="90" style={{marginLeft:'20px'}} />
                      </span>
                  </div>
                </div>
                {/* 顶部下方 */}
                <div className="header-bottom">
                    <span>
                      <span>                   
                          <MinusOutlined rotate="90" style={{color:'green' ,fontSize:'18px',marginLeft:'20px'}} />
                          <span style={{fontSize:'18px'}}>{this.getTitle()}</span>
                      </span>
                      <span  style={{float:'right',fontSize:'18px'}}>
                          {this.getTitleRight()}
                      </span>
                    </span>
                </div>
              </Header>

              {/* 内容部分二级路由配置 */}
              <Content
                style={{ margin: '24px 16px', padding: 24,background:'white'}}
              >
                <Switch>
                  <Route path="/home" exact component={Home} />

                  <Route path="/user"  component={UserBasicInfoManagement} />
                  <Route path="/user/test"  component={UserTestDataManagement} />
                  <Route path="user/device"  component={UserDeviceManagement} />
                  <Route path="/user/easemod/msg"  component={UserMsg} />
                  <Route path="/user/msg"  component={UserSMSmanagement} />
                  <Route path="/user/phone"  component={UserMobileMsgManagement} />
                  <Route path="/user/code"  component={VerificationSMSinquire} />

                  <Route path="/test"  component={TestSet} />
                  <Route path="/test/type"  component={TestType} />
                  <Route path="/reagent/type"  component={ReagentType} />
                  <Route path="/reagent/params"  component={ReagentJudgeParams} />
                  <Route path="/unit"  component={UnitManagement} />
                  <Route path="/plan/type"  component={ProjectType} />

                  <Route path="/prof/test"  component={ProfessionTestData} />
                  <Route path="/prof/account"  component={AccountInfo} />
                  <Route path="/prof/patient"  component={PatientInfo} />

                  <Route path="/device"  component={DeviceManagement} />

                  <Route path="/exp/data"  component={ExperimentData} />
                  <Route path="/exp/member"  component={Experimenter} />

                  <Route path="/home_e/test"  component={TestData} />
                  <Route path="/home_e/test_real"  component={ActualTest} />
                  <Route path="/home_e/miss"  component={MissingTestThisPeriod} />
                  <Route path="/home_e/test_on"  component={UserInTest} />
                  <Route path="/home_e/user_new"  component={NewlyRegisteredUser} />
                  <Route path="/home_e/using_new"  component={NewlyRegisteredUsingUser} />
                  <Route path="/home_e/med"  component={UserMedication} />
                  <Route path="/home_e/user_all"  component={AllUser} />
                  <Route path="/home_e/user_valid"  component={ValidUser} />
                  <Route path="/home_e/user_miss"  component={MissingTsetUser} />
                  <Route path="/home_e/user_period"  component={TestUserThisPeriod} />

                  <Route path="/pro_edition"  component={YybProfessionEditionStatistics} />

                  <Route path="/serve/user"  component={UserManagement} />
                  <Route path="/serve/device"  component={DeviceManagement_Serve} />
                  <Route path="/service"  component={ServiceManagement} />


                  {/* <Route path="/userBasicInfoManagement/userBasicInfoManagement"  component={UserBasicInfoManagement} />
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
                  <Route path="/serviceSystem/serviceManagement"  component={ServiceManagement} /> */}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}
