let data = [
  {
    id: 1,
    title: 'umi',
    count: 123,
    price: 1000,
  },
  {
    id: 2,
    title: 'umi',
    count: 123,
    price: 1000,
  },
  {
    id: 3,
    title: 'umi',
    count: 123,
    price: 1000,
  },
  {
    id: 4,
    title: 'umi',
    count: 123,
    price: 1000,
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
