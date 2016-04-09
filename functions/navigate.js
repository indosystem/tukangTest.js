module.exports = {
  open: function(params) {
        tukang.web.page.open(params[0], function(status) {
            if (status === "success") {
                tukang.next()
            } else {
                tukang.stop(status)
            }
        })
    }
}