let data = [
  {
    id: 1,
    name: 'umi1',
    desc: '极快的类 Next.js 的 React 应用框架。',
    url: 'https://umijs.org',
  },
  {
    id: 2,
    name: 'antd2',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  },
  {
    id: 3,
    name: 'antd-pro3',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  },
  {
    id: 4,
    name: 'antd-pro4',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  },
  {
    id: 5,
    name: 'antd5',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  }
];

export default {
  'get /api/unpurchased': function (req, res, next) {
    setTimeout(() => {
      res.json({
        result: data,
      })
    }, 250)
  },
  'delete /api/unpurchased/:id': function (req, res, next) {
    data = data.filter(v => v.id !== parseInt(req.params.id));
    console.log(req.params.id);
    console.log(data);
    setTimeout(() => {
      res.json({
        success: true,
      })
    }, 250)
  },
  'post /api/unpurchased/add': function (req, res, next) {
    data = [...data, {
      ...req.body,
      id: data[data.length - 1].id + 1,
    }];

    res.json({
      success: true,
    });
  },
  'get /api/unpurchased/:id/statistic': function (req, res, next) {
    res.json({
      result: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 1150 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ]
    });
  },
}
