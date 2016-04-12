#!/usr/bin/env slimerjs

var system = require('system');
var args = system.args;
var fs = require('fs')

console.log('Tukang Test GUI - Slimerjs')
var tukang = require('./lib/tukang.js')


if (args.length > 1) {

  if (fs.exists(args[1])) {
    tukang.parseScript(args[1])
    tukang.loadFunctions()
    tukang.executeLine()
  } else {
    console.log('input not exist')
  }
} else {
  console.log('tukangtest testcase.txt')
}
