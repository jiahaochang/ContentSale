let data = [
  {
    id: 1,
    name: 'umi',
    buyTime: 1549201949,
    count: 123,
    price: 1000,
    contentPicture: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    id: 2,
    name: 'umi',
    buyTime: 1549201949,
    count: 123,
    price: 1000,
    contentPicture: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    id: 3,
    name: 'umi',
    buyTime: 1549201949,
    count: 123,
    price: 1000,
    contentPicture: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
  {
    id: 4,
    name: 'umi',
    buyTime: 1549201949,
    count: 123,
    price: 1000,
    contentPicture: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
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
