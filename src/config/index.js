import departments from './Departments'
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'HealM',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://www.vaccum.ltd:8081', // 'http://localhost:3000',
    pro: 'http://www.vaccum.ltd:8081'
  },
  /**
   * @description socket请求路径
   */
  socketUrl: {
    dev: 'http://www.vaccum.ltd:10001',
    pro: 'http://www.vaccum.ltd:10001'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  /**
   * @description 不需要鉴权的请求
  */
  publicPath: [/^\/public/, /^\/login/],
  /**
   *  @description 请求的头部
   */
  requestHeader: '/api',
  /**
   *  @description  不需要用户信息的路由
   */
  openRouters: ['login', 'phoneLogin', 'forgetPassword'],
  /**
   *  @description 文件上传请求的路由
   */
  uploadImageUrl: '/api/home/uploadFile',
  /**
   * @description 文件路径头部
   */
  imageHeader: 'http://www.vaccum.ltd',
  /**
   * @description 所有科室
   */
  departments,
  /**
   * @description 不需要版权信息组件显示的页面
   */
  noCopyRightComponentsRouterList: ['about', 'chat-patient', 'chat-doctor', 'list', 'content'],
  /**
   * @description 签约时间存活时间
   */
  contractActiveTime: 60000,
  /**
   * 天行数据请求源
   */
  wxRequestUrl: 'http://api.tianapi.com',
  /**
   * 天行数据API KEY
   */
  wxApiKey: 'e4cd9e3ba3767d30eb0e2cf89bcad5d7',
  /**
   * 绑定qq时前往的页面
   */
  qqBindUrl: 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101957782&redirect_uri=http%3A%2F%2Fwww.vaccum.ltd%2FqqLogin&state=test&display=mobile'
}
