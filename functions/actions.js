module.exports = {      
    fill: function(params) {

        var query = '*:focus'
        if (params.length > 1) {
            query = 'input[name=' + params[0] + '],textarea[name=' + params[0] + '],input[id=' + params[0] + ']'
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
            tukang.web.page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
            tukang.next()
        }
    }    
}