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
    sidebar: {
      '/user/': [
        {
          text: '使用手册',
          children: [{
            text: '通用操作',
            link: '/user/00.html',
          },
          {
            text: '登录',
            link: '/user/10.html',
          },
          {
            text: '采购业务',
            link: '/user/20.html',
            children: [
              { text: '采购订单', link: '/user/20-01.html' },
              { text: '采购入库', link: '/user/20-02.html' },
              { text: '采购退货出库', link: '/user/20-03.html' }]
          }],
        },
      ],
      '/admin/': [
        {
          text: '系统管理',
          children: [
            {text:'安装',link:'/admin/01.html'}
          ],
        },
      ],
      '/dev/': [
        {
          text: '二次开发',
          children: [{
            text: '如何新增一个模块',
            link: '/dev/100.html'
          }],
        },
      ],
    },
  },
}
