export const navItems = [
  {
    name: '首页',
    link:'/',
    childrenNav: []
  },
  {
    name: '文稿',
    link:'/blog',
    childrenNav: [
      {
      name: '生活',
      link:'/blog/categories/life',
      childrenNav: []
    },{
      name: '个人',
      link:'/blog/categories/personal',
      childrenNav: []
    },
      {
        name: '技术流水账',
        link:'/blog/categories/tech',
        childrenNav: []
      }]
  },
  {
    name: '知识库',
    link:'/knowledge/CS&SE',
    childrenNav: []
  }
]