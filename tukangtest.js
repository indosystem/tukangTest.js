#!/usr/bin/env slimerjs
console.log('Tukang Test')
var system = require('system');
var args = system.args;
var page = require('webpage').create()
var fs = require('fs')
page.viewportSize = {
    width: 800,
    height: 600
};
var app = {
    process: false,
    index: 0,
    next: function() {
        console.log('END')
        this.index++
        this.process = false
        page.render('screen.jpeg', {
            format: 'jpeg',
            quality: '50'
        });

    },
    stop: function(message) {
        console.log("[STOPED]", message)
        slimer.exit()
    }
}
page.onError = function(message, stack) {
    console.log(message)
};
page.onConsoleMessage = function(message, line, file) {
    // Process message here
    console.log(message + ' #' + line + ' ->' + file)
}
page.onLoadStarted = function(url, isFrame) {
    console.log('loading of ' + url);
};
page.onLoadFinished = function(status) {
    if (status === "success") {
        if (page.injectJs('core.js')) {
            console.log('load finished')
        }

    } else {
        app.stop(status)
    }
}

function strParse(string) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myString = string
    var myArray = [];

    do {
        //Each call to exec returns the next regex match as an array
        var match = myRegexp.exec(myString);
        if (match != null) {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);
    return myArray
}

function parseCmd(string) {
    var params = strParse(string)
    var cmd = params[0]
    params.splice(0, 1);
    return {
        cmd: cmd,
        params: params
    }
}
var func = {
    open: function(params) {
        page.open(params[0], function(status) {
            if (status === "success") {
                app.next()
            } else {
                app.stop(status)
            }
        })
    },
    fill: function(params) {

        var query = '*:focus'
        if (params.length > 1) {
            query = 'input[name=' + params[0] + '],textarea[name=' + params[0] + '],input[id=' + params[0] + ']'
        }

        var exist = page.evaluate(function(query) {
            return jQuery(query).length;
        }, query)
        if (!exist) {
            app.stop(params[0] + " not valid element")
        } else {

            page.evaluate(function(query, params) {
                jQuery(query).val(params[1])
            }, query, params)
            app.next()
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
        var exist = page.evaluate(function(query) {
            return jQuery(query).length;
        }, query)
        if (!exist) {
            app.stop(keyword + " not valid element")
        } else {
            var rect = page.evaluate(function(query) {
                return jQuery(query)[0].getBoundingClientRect();
            }, query)
            page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
            app.next()
        }
    },
    waituntil: function(params) {
        function _waituntil(callback, timeoutcallback, age) {
            if (!age) age = 0
            var match = params[0] == 'contains' ? params[0] : 'match'
            var keyword = params[0] == 'contains' ? params[1] : params[0]
            var timeout = parseInt(params[2])
            timeout = timeout > 0 ? timeout : 100

            if (age > timeout) {
                app.stop("timeout")
            } else
                setTimeout(function() {

                    var contain = page.evaluate(function(text, match) {
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
            app.next()
        }, function() {
            app.stop(params[1] + '" not exist, after ' + +' ms')
        })

    },
    exit: function() {
        phantom.exit()
    }
}
var lines = []

function threadLines() {
    setTimeout(function() {
        var cmdtxt = fs.read('cmd.txt')
        cmdtxt = cmdtxt.trim().replace(/(\r\n|\n|\r)/gm, "")
        if (cmdtxt != '') {
            lines.push(parseCmd(cmdtxt))
            fs.write('cmd.txt', '', 'w')
        }
        threadLines()
    }, 500)
}

function threadExec() {
    setTimeout(function() {
        if (!app.process && lines.length > app.index) {
            cmd = lines[app.index].cmd
            params = lines[app.index].params
            if (func[cmd]) {

                app.process = true
                console.log("CALL " + '#' + app.index + " : " + cmd + JSON.stringify(params))
                func[cmd](params)

            } else {
                console.log(cmd, ' undefined function')
                app.next()
            }
        }
        threadExec()
    }, 100)
}
if (args.length > 1) {

    if (fs.exists(args[1])) {
        console.log('load script ' + args[1])
        var script = fs.read(args[1])
        var scripts = script.split('\n')
        for (var n in scripts) {
            lines.push(parseCmd(scripts[n]))
        }
    } else {
        console.log('input not exist')
    }
}
threadLines()
threadExec()
