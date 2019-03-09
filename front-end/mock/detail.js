
export default {
  'get /api/detail/:id': function (req, res, next) {
    res.json({
      result: {
        title:"书",
        summary:"这是一本书",
        text: "介绍的内容",
        price: 1000,
        saleStatus: 'notPurchased',
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    });
  },
}
