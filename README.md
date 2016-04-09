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
fill cssSelector mode
```
click "Some Button"
click "#someId"
click ".aClass"
click "div.parents div.child #someButton"
click "#id" rightClick
```

### Fill
fill cssSelector

```
fill nameElement "some text"
fill "form.someClass #email" "some text"
```

### WaitFor
waitfor cssSelector timeoutSeconds

```
waitfor "#id"
waitfor ".class"
waitfor ".class" 10
```

### WaitUntil 
waituntil cssSelector property

```
waitfor "#id" hide
waitfor "#id" visible
```

### Assert
assert expect cssSelector attribute operator value

```
assert expect #someElement text contains "success"
assert expect #someElement value equal 1000
assert expect #someElement length lessthan 10
assert expect #someElement backgroundColor "#ff0000"
assert expect #someElement display none
```

### Evaluate
evaluate javascript

```
evaluate "console.log($('#d').val())"
```


