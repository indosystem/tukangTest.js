module.exports = {
  keyboard: function(params){
    tukang.web.page.sendEvent(params[0],params[1])
    tukang.next()
  },
  select: function(params) {
    var query = ''
    if(tukang.isCSSselector(params[0])){
      query = params[0]
    }else{
      query = '*[name='+params[0]+']';
    }
    var exist = tukang.web.page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(params[0] + " not valid element")
    } else {
      tukang.web.page.evaluate(function(query, params) {
        $(query).find('option').filter(function() {
          return ($(this).text() == params[1]);
        }).prop('selected', true);
      }, query, params)
      tukang.next()
    }
  },
  type: function(params) {
    tukang.functions.fill(params)
  },
  fill: function(params) {

    var query = '*:focus'
    if (params.length > 1) {
      if (tukang.isCSSselector(params[0])) {
        query = params[0]
      } else
        query = 'input[name=' + params[0] + '],textarea[name=' + params[0] + ']'
    }

    var exist = tukang.web.page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(params[0] + " not valid element")
    } else {
      tukang.web.page.evaluate(function(query, params) {
        jQuery(query).val(params[1])
      }, query, params)
      tukang.next()
    }

  },
  click: function(params) {
    var query = '*:focus'
    var keyword = params[0]
    if (params.length > 0) {
      var match = params[0] == 'contains' ? params[0] : 'match'
      var keyword = params[0] == 'contains' ? params[1] : params[0]
      var mode = params[0] == 'contains' ? params[2] : params[1]
      mode = mode ? mode : 'click'
      query = "*:" + match + "(" + keyword + "),input[value='" + keyword + "'],button[value='" + keyword + "']"

    }
    var exist = tukang.web.page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(keyword + " not valid element")
    } else {
      var rect = tukang.web.page.evaluate(function(query) {
        return jQuery(query)[0].getBoundingClientRect();
      }, query)
      tukang.web.page.sendEvent(mode, rect.left + rect.width / 2, rect.top + rect.height / 2);
      tukang.next()
    }
  }
}
