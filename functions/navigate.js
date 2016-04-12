module.exports = {
  open: function(params) {
        console.log(params[0])
        page.open(params[0], function(status) {
            if (status === "success") {
                tukang.next()
            } else {
                tukang.stop(status)
            }
        })
    }
}
