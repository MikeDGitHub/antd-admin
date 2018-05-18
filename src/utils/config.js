const APIV1 = '/api/v1'
const APIV2 = 'http://39.104.164.180:5000'
const APIV3 = 'http://39.104.164.180:5001'

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    //userLogin: `${APIV1}/user/login`,
    userLogin: `${APIV2}/connect/token`,
    getIdentity:'${APIV2}/api/account/getIdentity',
    userLogout: `${APIV1}/user/logout`,
    //userInfo: `${APIV1}/userInfo`,
    userInfo: `${APIV2}/api/account/queryUserInfo`,
    //users: `${APIV1}/users`,
    users: `${APIV2}/api/account/queryUserList`,
    posts: `${APIV1}/posts`,
    // user: `${APIV1}/user/:id`,
    user: `${APIV2}/api/account/register`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    genreList:`${APIV3}/api/genre/queryList`,
    genreInfo:`${APIV3}/api/genre/queryGenreInfo`,
    genreAdd:`${APIV3}/api/genre/Add`,

    typeList:`${APIV3}/api/type/queryList`,
    typeInfo:`${APIV3}/api/type/queryGenreInfo`,
    typeAdd:`${APIV3}/api/type/Add`
  },
  getQueryString:function(name){
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  }
}
