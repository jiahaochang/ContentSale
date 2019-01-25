let data = [
  {
    id: 1,
    name: 'umi',
    buyTime: '极快的类 Next.js 的 React 应用框架。',
    count: 123,
    price: 1000
  },
  {
    id: 1,
    name: 'umi',
    buyTime: '极快的类 Next.js 的 React 应用框架。',
    count: 123,
    price: 1000
  },
  {
    id: 1,
    name: 'umi',
    buyTime: '极快的类 Next.js 的 React 应用框架。',
    count: 123,
    price: 1000
  },
  {
    id: 1,
    name: 'umi',
    buyTime: '极快的类 Next.js 的 React 应用框架。',
    count: 123,
    price: 1000
  },
];

export default {
  'get /api/bills': function (req, res, next) {
    setTimeout(() => {
      res.json({
        result: data,
      })
    }, 250)
  },
}
