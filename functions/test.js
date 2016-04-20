module.exports = {
  expect: function(params) {
    var query = ''
    if (tukang.isCSSselector(params[0])) {
      query = params[0]
    } else {
      query = '*[name=' + params[0] + ']';
    }
    var exist = page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(params[0] + " not valid element")
    } else {
      var val = page.evaluate(function(query, params) {
        var val = false
        if (params[1] == 'text') {
          val = jQuery(query).text();
        } else
        if (params[1] == 'length') {
          val = jQuery(query).length();
        } else
        if (params[1] == 'html') {
          val = jQuery(query).html();
        } else
        if (params[1] == 'value') {
          val = jQuery(query).val();
        } else {
          var attr = jQuery(query).attr(params[1]);
          var css = jQuery(query).css(params[1]);
          val = attr ? attr : css
        }
        return val
      }, query, params)
      if (tukang.compare(val, params[2], params[3])) {
        tukang.next()
      } else {
        tukang.stop(params[0]+'.'+params[1] + ' not ' + params[2] + ' ' + params[3])
      }
    }
  }
}
