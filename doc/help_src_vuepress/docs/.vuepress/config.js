module.exports = {
  lang: 'zh-CN',
  title: 'PSI应用指南',
  description: 'PSI应用指南',

  base: '/help/',

  themeConfig: {
    editLink: false,
    contributors: false,
    backToHome: '返回首页',
    notFound: ['文档页面不存在'],
    lastUpdatedText: '文档更新时间',
    navbar: [
      {
        text: '使用手册',
        link: '/user/'
      },
      {
        text: '系统管理',
        link: '/admin/'
      },
      {
        text: '二次开发',
        link: '/dev/'
      }
    ],
    sidebar: false,
  },
}
