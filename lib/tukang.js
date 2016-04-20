require.globals.page = require('webpage').create()
require.globals.engine = phantom ? phantom : slimer

var fs = require('fs')
var merge = require('./merge.js')
var Chance = require('./chance.js')
var random = new Chance()

require.globals.page.viewportSize = {
  width: 1024,
  height: 700
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

require.globals.page.onError = function(message, stack) {
  console.log(message)
};
require.globals.page.onConsoleMessage = function(message, line, file) {
  // Process message here
  console.log(message + ' #' + line + ' ->' + file)
}
require.globals.page.onLoadStarted = function(url, isFrame) {
  console.log('loading of ' + url);
  tukang.pageloaded = false
};
require.globals.page.onLoadFinished = function(status) {
  if (status === "success") {
    if (require.globals.page.injectJs('core.js')) {
      //console.log('load finished')

    }
    tukang.pageloaded = true
  } else {
    tukang.stop(status)
  }
}


var tukang = {
  pageloaded: false
  lines: [],
  compare: function(val, operator, val2) {
    switch (operator) {
      case 'contains':
        return val.indexOf(val2) > -1
        break
      case 'equal':
        return val = val2
        break
      case 'notequal':
        return val != val2
        break
      case 'lessthen':
        return parseInt(val) < parseInt(val2)
        break
      case 'greaterthan':
        return parseInt(val) > parseInt(val2)
        break
    }
  },
  isCSSselector: function(str) {
    var regExp = /^[A-Za-z0-9]+$/
    return !(str.match(regExp))
  },
  functions: {},
  process: false,
  index: 0,
  testCase: '',
  isStop: false,
  currentCase: false,
  startTime:false,
  next: function() {
    //console.log('END')
    require.globals.page.render('capture/'+tukang.testCase+'-LINE-'+tukang.index+'.jpeg', {
      format: 'jpeg',
      quality: '50'
    });
    this.index++
    this.process = false
  },
  report: function(){
    if(!tukang.isStop){
      console.log('* it '+tukang.currentCase)
      var timeSeconds = new Date((new Date()).getTime() - tukang.startTime).getSeconds()
      console.log('-> success '+ timeSeconds+ ' seconds')
    }
  },
  stop: function(message) {
    tukang.isStop = true
    console.log('* it '+tukang.currentCase)
    console.log("-> FAILED , "+ JSON.stringify(message))
    require.globals.engine.exit()
  },
  parseScript: function(scriptFile) {
    console.log('load test case ' + scriptFile)
    tukang.testCase = scriptFile.replaceAll('/','-')
    var script = fs.read(scriptFile)
    var scripts = script.split('\n')
    for (var n in scripts) {
      var line = tukang.parseCmd(scripts[n])
      if(line.cmd)
      tukang.lines.push(line)
    }
  },
  executeLine: function() {
    setTimeout(function() {
      if (!tukang.process && tukang.lines.length > tukang.index) {
        cmd = tukang.lines[tukang.index].cmd
        params = tukang.lines[tukang.index].params
        if (tukang.functions[cmd]) {

          tukang.process = true
          if(cmd!='it')
          //console.log("CALL " + '#' + tukang.index + " : " + cmd + JSON.stringify(params))
          for (var i in params) {
            var param = params[i].trim()
            if (param.indexOf('RANDOM_') > -1) {
              var ar = param.split('_')
              if (ar.length > 1) {
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
      if(tukang.lines.length <= tukang.index || tukang.isStop){
        tukang.next()
        tukang.report()
        require.globals.engine.exit()
      }else
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
require.globals.tukang = tukang
module.exports = tukang
