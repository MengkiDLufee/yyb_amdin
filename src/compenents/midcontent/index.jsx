//内容部分
import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {Layout, Spin } from 'antd';
import './index.less'
/*
配置路由懒加载
注意：懒加载组件需要在Suspense组件中才能渲染
*/
//首页
const Home = lazy(() => import('../../pages/home/home'));
//用户基础信息管理
const UserBasicInfoManagement = lazy(() => import('../../pages/userBasicInfoManagement/userBasicInfoManagement'));
const UserDeviceManagement = lazy(() => import('../../pages/userBasicInfoManagement/userDeviceManagement'));
const UserMobileMsgManagement = lazy(() => import('../../pages/userBasicInfoManagement/userMobileMsgManagement'));
const UserMsg = lazy(() => import('../../pages/userBasicInfoManagement/userMsg'));
const UserSMSmanagement = lazy(() => import('../../pages/userBasicInfoManagement/userSMSmanagement'));
const UserTestDataManagement = lazy(() => import('../../pages/userBasicInfoManagement/userTestDataManagement'));
const VerificationSMSinquire = lazy(() => import('../../pages/userBasicInfoManagement/verificationSMSinquire'));
//基础信息管理
const TestSet = lazy(() => import('../../pages/basicInfoManagement/testSet'));
const TestType = lazy(() => import('../../pages/basicInfoManagement/testType'));
const ReagentType = lazy(() => import('../../pages/basicInfoManagement/reagentType'));
const ReagentJudgeParams = lazy(() => import('../../pages/basicInfoManagement/reagentJudgeParams'));
const UnitManagement = lazy(() => import('../../pages/basicInfoManagement/unitManagement'));
const ProjectType = lazy(() => import('../../pages/basicInfoManagement/projectType'));
//专业测试管理
const ProfessionTestData = lazy(() => import('../../pages/professionTestManagement/professionTestData'));
const AccountInfo = lazy(() => import('../../pages/professionTestManagement/accountInfo'));
const PatientInfo = lazy(() => import('../../pages/professionTestManagement/patientInfo'));
//设备管理
const DeviceManagement = lazy(() => import('../../pages/deviceManagement/deviceManagement'));
// 实验管理
const ExperimentData = lazy(() => import('../../pages/experimentManagement/experimentData'));
const Experimenter = lazy(() => import('../../pages/experimentManagement/experimenter'));
const RegTest = lazy(() => import('../../pages/experimentManagement/regTest'));
const DevTest = lazy(() => import('../../pages/experimentManagement/devTest'))
// 优孕宝家庭版统计
const TestData = lazy(() => import('../../pages/yybHomeEditionStatistics/testData'));
const ActualTest = lazy(() => import('../../pages/yybHomeEditionStatistics/actualTest'));
const MissingTestThisPeriod = lazy(() => import('../../pages/yybHomeEditionStatistics/missingTestThisPeriod'));
const UserInTest = lazy(() => import('../../pages/yybHomeEditionStatistics/userInTest'));
const NewlyRegisteredUser = lazy(() => import('../../pages/yybHomeEditionStatistics/newlyRegisteredUser'));
const NewlyRegisteredUsingUser = lazy(() => import('../../pages/yybHomeEditionStatistics/newlyRegisteredUsingUser'));
const UserMedication = lazy(() => import('../../pages/yybHomeEditionStatistics/userMedication'));
const AllUser = lazy(() => import('../../pages/yybHomeEditionStatistics/allUser'));
const ValidUser = lazy(() => import('../../pages/yybHomeEditionStatistics/validUser'));
const MissingTsetUser = lazy(() => import('../../pages/yybHomeEditionStatistics/missingTsetUser'));
const TestUserThisPeriod = lazy(() => import('../../pages/yybHomeEditionStatistics/testUserThisPeriod'));
// 优孕宝专业版统计
const YybProfessionEditionStatistics = lazy(() => import('../../pages/yybProfessionEditionStatistics/yybProfessionEditionStatistics'));
// 客服系统
const UserManagement = lazy(() => import('../../pages/serviceSystem/userManagement'));
const DeviceManagement_Serve = lazy(() => import('../../pages/serviceSystem/deviceManagement'));
const ServiceManagement = lazy(() => import('../../pages/serviceSystem/serviceManagement'));
//系统管理
const User = lazy(() => import('../../pages/system/user'));
const Role = lazy(() => import('../../pages/system/role'));
const Partment = lazy(() => import('../../pages/system/partment'));
const LoginLog = lazy(() => import('../../pages/system/loginLog'));
const WorkLog = lazy(() => import('../../pages/system/workLog'));
const { Content } = Layout;
export default class Midcontent extends Component {
  render() {
    return (
      // <div className="outer">
        <Content className="mid-style">
          <Suspense fallback={<Spin tip="Loading..."></Spin>}>
            <Switch>
              <Route path="/home" exact component={Home} />

              <Route path="/user" exact component={UserBasicInfoManagement} />
              <Route path="/user/test" component={UserTestDataManagement} />
              <Route path="/user/device" component={UserDeviceManagement} />
              <Route path="/user/easemod/msg" component={UserMsg} />
              <Route path="/user/msg" component={UserSMSmanagement} />
              <Route path="/user/phone" component={UserMobileMsgManagement} />
              <Route path="/user/code" component={VerificationSMSinquire} />

              <Route path="/test" exact component={TestSet} />
              <Route path="/test/type" component={TestType} />
              <Route path="/reagent/type" component={ReagentType} />
              <Route path="/reagent/params" component={ReagentJudgeParams} />
              <Route path="/unit" component={UnitManagement} />
              <Route path="/plan/type" component={ProjectType} />

              <Route path="/prof/test" component={ProfessionTestData} />
              <Route path="/prof/account" component={AccountInfo} />
              <Route path="/prof/patient" component={PatientInfo} />

              <Route path="/device" component={DeviceManagement} />

              <Route path="/exp/data" component={ExperimentData} />
              <Route path="/exp/member" component={Experimenter} />
              <Route path="/exp/reg_test" component={RegTest} />
              <Route path="/exp/dev_test" component={DevTest} />

              <Route path="/home_e/test" component={TestData} />
              <Route path="/home_e/test_real" component={ActualTest} />
              <Route path="/home_e/miss" component={MissingTestThisPeriod} />
              <Route path="/home_e/test_on" component={UserInTest} />
              <Route path="/home_e/user_new" component={NewlyRegisteredUser} />
              <Route path="/home_e/using_new" component={NewlyRegisteredUsingUser} />
              <Route path="/home_e/med" component={UserMedication} />
              <Route path="/home_e/user_all" component={AllUser} />
              <Route path="/home_e/user_valid" component={ValidUser} />
              <Route path="/home_e/user_miss" component={MissingTsetUser} />
              <Route path="/home_e/user_period" component={TestUserThisPeriod} />

              <Route path="/pro_edition" component={YybProfessionEditionStatistics} />

              <Route path="/serve/user" component={UserManagement} />
              <Route path="/serve/device" component={DeviceManagement_Serve} />
              <Route path="/service" component={ServiceManagement} />

              <Route path="/system/user" component={User} />
              <Route path="/system/role" component={Role} />
              <Route path="/system/partment" component={Partment} />
              <Route path="/system/loginlog" component={LoginLog} />
              <Route path="/system/worklog" component={WorkLog} />
              <Redirect to="/home" />
            </Switch>
          </Suspense>
        </Content>
      // </div>
    )
  }
}
