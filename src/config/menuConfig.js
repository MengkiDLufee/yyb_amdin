//动态显示左侧导航栏信息，以数组展示导航栏的具体信息
//这样方便修改，也便于权限管理



//此方法没有生成对应的icon，还需要修改

const menuLsit =[
    {
        title:'首页',//菜单标题
        key:'/home',//对应的path
        icon:'HomeOutlined',//图标名称
    },
    {
        title:'用户基础信息管理',
        key:'/userbasic',
        icon:'home',
        children: [
            {
                title:'用户基础信息管理',
                key:'/user',
                icon:'UserOutlined',
            },
            {
                title:'用户测试数据管理',
                key:'/user/test',
                icon:'UserOutlined', 
            },
            {
                title:'用户设备管理',
                key:'/user/device',
                icon:'UserOutlined', 
            },
            {
                title:'用户消息',
                key:'/user/easemod/msg',
                icon:'UserOutlined', 
            },
            {
                title:'用户短信管理',
                key:'/user/msg',
                icon:'UserOutlined', 
            },
            {
                title:'用户手机信息管理',
                key:'/user/phone',
                icon:'UserOutlined', 
            },
            {
                title:'验证短信查询',
                key:'/user/code',
                icon:'UserOutlined', 
            },
        ]
    },
    {
        title:'基础信息管理',
        key:'/basic',
        icon:'home',
        children: [
            {
                title:'测试集',
                key:'/test',
                icon:'home', 
            },
            {
                title:'测试类型',
                key:'/test/type',
                icon:'home', 
            },
            {
                title:'试剂类型',
                key:'/reagent/type',
                icon:'home', 
            },
            {
                title:'试剂判读参数',
                key:'/reagent/params',
                icon:'home', 
            },
            {
                title:'单位管理',
                key:'/unit',
                icon:'home', 
            },
            {
                title:'计划类型',
                key:'/plan/type',
                icon:'home', 
            }
        ]
    },
    {
        title:'专业测试管理',
        key:'/prof',
        icon:'home',
        children: [
            {
                title:'专业测试数据',
                key:'/prof/test',
                icon:'home', 
            },
            {
                title:'账号信息',
                key:'/prof/account',
                icon:'home', 
            },
            {
                title:'病人信息',
                key:'/prof/patient',
                icon:'home', 
            }
        ]
    },
    {
        title:'设备管理',
        key:'/device',
        icon:'home',
    },
    {
        title:'实验管理',
        key:'/exp',
        icon:'home',
        children: [
            {
                title:'实验数据',
                key:'/exp/data',
                icon:'home', 
            },
            {
                title:'实验人员',
                key:'/exp/member',
                icon:'home', 
            },
            {
                title:'设备测试管理',
                key:'/exp/dev_test',
                icon:'home', 
            },

        ]
    },
    {
        title:'优孕宝家庭版统计',
        key:'/home_e',
        icon:'home',
        children: [
            {
                title:'测试数据',
                key:'/home_e/test',
                icon:'home', 
            },
            {
                title:'实际在测',
                key:'/home_e/test_real',
                icon:'home', 
            },
            {
                title:'本周期漏测',
                key:'/home_e/miss',
                icon:'home', 
            },
            {
                title:'在测用户',
                key:'/home_e/test_on',
                icon:'home', 
            },
            {
                title:'新注册用户',
                key:'/home_e/user_new',
                icon:'home', 
            },
            {
                title:'新注册使用用户',
                key:'/home_e/using_new',
                icon:'home', 
            },
            {
                title:'用户用药',
                key:'/home_e/med',
                icon:'home', 
            },
            {
                title:'所有用户',
                key:'/home_e/user_all',
                icon:'home', 
            },
            {
                title:'有效用户',
                key:'/home_e/user_valid',
                icon:'home', 
            },
            {
                title:'漏测用户',
                key:'/home_e/user_miss',
                icon:'home', 
            },
            {
                title:'当前周期测试用户',
                key:'/home_e/user_period',
                icon:'home', 
            },

        ]
    },
    {
        title:'优孕宝专业版统计',
        key:'/pro_edition',
        icon:'home',
    },
    {
        title:'客服系统',
        key:'/serve',
        icon:'home',
        children: [
            {
                title:'用户管理',
                key:'/serve/user',
                icon:'home', 
            },
            {
                title:'设备管理',
                key:'/serve/device',
                icon:'home', 
            },
            {
                title:'客服管理',
                key:'/service',
                icon:'home', 
            },


        ]
    },
    {
        title:'系统管理',
        key:'/system',
        icon:'home',
        children: [
            {
                title:'用户管理',
                key:'/system/user',
                icon:'home', 
            },
            {
                title:'角色管理',
                key:'/system/role',
                icon:'home', 
            },
            {
                title:'部门管理',
                key:'/system/partment',
                icon:'home', 
            },
            {
                title:'登录日志',
                key:'/system/loginlog',
                icon:'home', 
            },
            {
                title:'业务日志',
                key:'/system/worklog',
                icon:'home', 
            },

        ]
    },


]

export default menuLsit