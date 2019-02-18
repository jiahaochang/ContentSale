let data = [
  {
    id: 1,
    name: 'umi',
    count: 123,
    unitPrice: 1000,
  },
  {
    id: 2,
    name: 'umi',
    count: 123,
    unitPrice: 1000,
  },
  {
    id: 3,
    name: 'umi',
    count: 123,
    unitPrice: 1000,
  },
  {
    id: 4,
    name: 'umi',
    count: 123,
    unitPrice: 1000,
  },
];

export default {
  'get /api/shoppingCarts': function (req, res, next) {
    setTimeout(() => {
      res.json({
        result: data,
      })
    }, 250)
  },
}
