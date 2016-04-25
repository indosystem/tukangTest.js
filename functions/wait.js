module.exports = {
  waitfornextpage: function() {
    var _waitNextPage = function() {
        console.log('page loaded'+tukang.pageloaded)
      if (!tukang.pageloaded) {
        setTimeout(_waitNextPage, 1000)
      } else {
        tukang.next()
      }
    }
    _waitNextPage()
  },    
  wait: function(params){
    setTimeout(function(){
      tukang.next()
    },parseInt(params[0])*1000)
  },
  waitfor: function(params) {

        function _waituntil(callback, timeoutcallback, age) {
            if (!age) age = 0
            var query = ''
            if (tukang.isCSSselector(params[0])) {
              query = params[0]
            } else {
              query = '*[name=' + params[0] + ']';
            }

            var timeout = parseInt(params[1])
            timeout = timeout > 0 ? timeout : 15
            timeout = timeout * 10
            if (age > timeout) {
                tukang.stop("timeout "+query)
            } else
                setTimeout(function() {
                  console.log(query)
                    var contain = page.evaluate(function(query) {
                        if (typeof core !='undefined') {
                            return jQuery(query).length
                        } else {
                            return false
                        }
                    }, query)

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
