module.exports = {
  keyboard: function(params) {
    page.sendEvent(params[0], params[1])
    tukang.next()
  },
  checked: function(params) {
    var exist = page.evaluate(function(params) {
      return $(params[0]).length
    }, params)
    if (!exist) {
      tukang.stop(params[0] + " not valid element")
    } else {
      page.evaluate(function(params) {
        $(params[0]).prop('checked', true)
      }, params)
      this.click(params)
      tukang.next()
    }
  },
  select: function(params) {
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
      page.evaluate(function(query, params) {
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
    var exist = page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(params[0] + " not valid element")
    } else {
      page.evaluate(function(query, params) {
        jQuery(query).val(params[1])
      }, query, params)
      tukang.next()
    }

  },
  click: function(params) {
    var query = '*:focus'
    var keyword = params[0]
    if (tukang.isCSSselector(params[0])) {
      query = params[0]
      var mode = params[1]
      mode = mode ? mode : 'click'
    } else {
      if (params.length > 0) {
        var match = params[0] == 'contains' ? params[0] : 'match'
        var keyword = params[0] == 'contains' ? params[1] : params[0]
        query = "*:" + match + "(" + keyword + "),input[value='" + keyword + "'],button[value='" + keyword + "']"

      }
    }

    var exist = page.evaluate(function(query) {
      return jQuery(query).length;
    }, query)
    if (!exist) {
      tukang.stop(keyword + " not valid element")
    } else {

      var rect = page.evaluate(function(query) {
        return jQuery(query)[0].getBoundingClientRect();
      }, query)
      page.sendEvent(mode, rect.left + rect.width / 2, rect.top + rect.height / 2);
      page.evaluate(function(x, y) {
        x -= 25
        y -= 25
        $('<div style="border-radius: 50%;position:absolute;width:50px;height:50px;background:rgba(100,100,100,0.5);left:' + x + 'px;top:' + y + 'px;">&nbsp;</div>').appendTo('body')
      }, rect.left + rect.width / 2, rect.top + rect.height / 2)
      tukang.next()
    }
  }
}
