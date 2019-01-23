
export default {
  'get /api/detail/:id': function (req, res, next) {
    res.json({
      result: {
        title:"书",
        content:"这是一本书",
        intro: "介绍的内容",
      }
    });
  },
}
