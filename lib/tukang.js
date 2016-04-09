
var page = require('webpage').create()
var fs = require('fs')
var merge = require('./merge.js')
var Chance = require('./chance.js')
var random = new Chance()


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
    tukang.stop(status)
  }
}


var tukang = {
  lines: [],
  compare: function(val,operator,val2){
    switch (operator){
      case 'contains' : return val.indexOf(val2) > -1 break;
      case 'equal' : return val = val2 break;
      case 'notequal' : return val != val2 break;
      case 'lessthen' : return parseInt(val) < parseInt(val2) break;
      case 'greaterthan' : return parseInt(val) > parseInt(val2) break;
    }
  }
  isCSSselector: function(){
    return str.indexOf('#')>-1 || str.indexOf('.')>-1 || str.indexOf('>')>-1
  },
  engine: phantom,
  web: {
    page: page
  },
  functions: {},
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
    tukang.engine.exit()
  },
  parseScript: function(scriptFile) {
    console.log('load script ' + scriptFile)
    var script = fs.read(scriptFile)
    var scripts = script.split('\n')
    for (var n in scripts) {
      tukang.lines.push(tukang.parseCmd(scripts[n]))
    }
  },
  executeLine: function() {
    setTimeout(function() {
      if (!tukang.process && tukang.lines.length > tukang.index) {
        cmd = tukang.lines[tukang.index].cmd
        params = tukang.lines[tukang.index].params
        if (tukang.functions[cmd]) {

          tukang.process = true
          console.log("CALL " + '#' + tukang.index + " : " + cmd + JSON.stringify(params))
          for(var i in params){
            var param = params[i].trim()
            if(param.indexOf('RANDOM_')>-1){
                var ar = param.split('_')
                if(ar.length>1){
                  params[i] = random[ar[1].toLowerCase()]()
                }
            }
          }
          tukang.functions[cmd](params)

        } else {
          console.log(cmd, ' undefined function')
          tukang.next()
        }
      }
      tukang.executeLine()
    }, 100)
  },
  loadFunctions: function() {
    var functions = fs.list('./functions')
    functions.forEach(function(fn) {
      if (fn.indexOf('.js') > 0) {
        var sourceObj = require('../functions/' + fn)
        tukang.functions = merge(tukang.functions, sourceObj)
      }
    })
  },
  strParse: function(string) {
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
  },
  parseCmd: function(string) {
    var params = tukang.strParse(string)
    var cmd = params[0]
    params.splice(0, 1);
    return {
      cmd: cmd,
      params: params
    }
  }
}

module.exports = tukang
