module.exports = {
  waitfornextpage: function() {
    var _waitNextPage = function() {
      if (!tukang.pageloaded) {
        setTimeout(_waitNextPage, 1000)
      } else {
        tukang.next()
      }
    }
  },
  open: function(params) {
    console.log(params[0])
    page.open(params[0], function(status) {
      if (status === "success") {
        tukang.next()
      } else {
        tukang.stop(status)
      }
    })
  },

}
