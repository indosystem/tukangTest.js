# tukangTest.js
automated test for human

## How to install
### Linux
```
apt-get install slimerjs
apt-get install phantomjs
```

### Install via NPM
```
npm install slimerjs -g
npm install phantomjs -g
```
need sudo (Mac/Linux)

```
./tukangtest-headless.js sometestCase.txt (support running under terminal server)
or
./tukangtest-gui.js sometestCase.txt (GUI)
```

## Commands
### Open

```
open http://google.com
```

### Click
fill cssSelector eventtype
event type : ‘mouseup’, ‘mousedown’, ‘mousemove’, ‘doubleclick’ or ‘click’

```
click "Some Button"
click "#someId"
click ".aClass"
click "div.parents div.child #someButton"
click "#id" doubleclick
```

### Keyboard
keyboard eventType text/keyCode
event type : ‘keyup’, ‘keypress’ or ‘keydown’

```
keyboard keypress 13 //enter
keyboard keypress 27 //escape
keyboard keypress "hello"
```

### Fill/Type
fill cssSelector

```
fill nameElement "some text"
type nameElement "some text"
fill "form.someClass #email" "some text"
```


### Select
select cssSelector label

```
select "#dropDown_Qty" 10
```

### WaitFor
waitfor cssSelector timeoutSeconds
default : 15 seconds

```
waitfor "#id"
waitfor ".class"
waitfor ".class" 10
```

### WaitUntil (soon)
waituntil cssSelector property

```
waituntil "#id" hide
waituntil "#id" visible
```

### Expect
expect cssSelector attribute/text/cssProperty operator value

```
expect #someElement html contains "success"
expect #someElement text contains "success"
expect #someElement value equal 1000
expect #someElement length lessthan 10
expect #someElement backgroundColor "#ff0000"
expect #someElement display none
```

### Evaluate
evaluate javascript

```
evaluate "console.log($('#d').val())"
```
