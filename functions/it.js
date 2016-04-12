module.exports={
  it: function(params){
    if(tukang.currentCase){
      tukang.report()
    }
    tukang.currentCase = params[0]
    tukang.startTime = (new Date()).getTime()
    tukang.next()
  }
}
