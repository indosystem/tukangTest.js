var webpage = require('webpage').create();
webpage
  .open('http://google.com') // loads a page
  .then(function(){
    // click somewhere on the second page
    webpage.sendEvent("click", 5, 5,
                        'left', 0);
    slimer.exit()
  })
