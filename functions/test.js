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
        if (params[2] == 'text') {
          val = jQuery(query).text();
        } else
        if (params[2] == 'length') {
          val = jQuery(query).length();
        } else
        if (params[2] == 'html') {
          val = jQuery(query).html();
        } else
        if (params[2] == 'value') {
          val = jQuery(query).val();
        } else {
          var attr = jQuery(query).attr(params[2]);
          var css = jQuery(query).css(params[2]);
          val = attr ? attr : css
        }
        return val
      }, query, params)
      if (tukang.compare(val, params[3], params[4])) {
        tukang.next()
      } else {
        tukang.stop(params[2] + ' not ' + params[3] + ' ' + params[4])
      }
    }
  }
}
