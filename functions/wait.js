module.exports = {
  waituntil: function(params) {
        function _waituntil(callback, timeoutcallback, age) {
            if (!age) age = 0
            var match = params[0] == 'contains' ? params[0] : 'match'
            var keyword = params[0] == 'contains' ? params[1] : params[0]
            var timeout = parseInt(params[2])
            timeout = timeout > 0 ? timeout : 15
            timeout = timeout * 10
            if (age > timeout) {
                tukang.stop("timeout")
            } else
                setTimeout(function() {

                    var contain = tukang.web.page.evaluate(function(text, match) {
                        if (typeof core !='undefined') {
                            return jQuery("*:" + match + "(" + text + ")").length
                        } else {
                            return false
                        }
                    }, keyword, match)

                    if (!contain) {
                        age++
                        _waituntil(callback, timeoutcallback, age)
                    } else {
                        callback && callback()
                    }
                }, 100)
        }
        _waituntil(function(params) {
            tukang.next()
        }, function() {
            tukang.stop(params[1] + '" not exist, after ' + +' ms')
        })

    }
}
