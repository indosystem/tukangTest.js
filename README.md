# tukangTest.js
automated test for human

### How to Install in Linux
```
apt-get install slimerjs
git clone https://github.com/indosystem/tukangTest.js.git
```

### Install via NPM
```
npm install slimerjs -g
git clone https://github.com/indosystem/tukangTest.js.git
```
need sudo (Mac/Linux)

### How to Running
```
cd tukangTest.js
./tukangtest.js sometestCase.txt
```

### Example Test Case File

#### open create new event dialog
```
open http://neo.sandbox.loket.com/login
fill username thisisnotvaliduser
fill password contactyoutadmin
click "Sign In"
waitfor "Create New Event"
click "Create New Event"
expect "form.newEvent"
expect "title" contains "create new event"
```

### Use Random Text
### Example
```
fill email RANDOM_EMAIL
```
another random text available :

```
RANDOM_PARAGRAPH, RANDOM_WORD, RANDOM_SENTENCE, RANDOM_AGE, RANDOM_BIRTHDAY,
RANDOM_FIRST, RANDOM_GENDER, RANDOM_NAME, RANDOM_COLOR, RANDOM_DOMAIN, RANDOM_EMAIL,
RANDOM_IP, RANDOM_ADDRESS, RANDOM_CITY, RANDOM_ZIP, RANDOM_COUNTRY, RANDOM_PHONE,
RANDOM_PROVINCE, RANDOM_STATE, RANDOM_STREET, RANDOM_CC
```

### Commands
##### Open

```
open http://google.com
```

##### Click
fill cssSelector eventtype
event type : ‘mouseup’, ‘mousedown’, ‘mousemove’, ‘doubleclick’ or ‘click’

```
click "Some Button"
click "#someId"
click ".aClass"
click "div.parents div.child #someButton"
click "#id" doubleclick
```

##### Keyboard
keyboard eventType text/keyCode
event type : ‘keyup’, ‘keypress’ or ‘keydown’

```
keyboard keypress 13 //enter
keyboard keypress 27 //escape
keyboard keypress "hello"
```

##### Fill/Type
fill cssSelector

```
fill nameElement "some text"
type nameElement "some text"
fill "form.someClass #email" "some text"
```


##### Select
select cssSelector label

```
select "#dropDown_Qty" 10
```

##### WaitFor
waitfor cssSelector timeoutSeconds
default : 15 seconds

```
waitfor "#id"
waitfor ".class"
waitfor ".class" 10
```

##### WaitUntil (soon)
waituntil cssSelector property

```
waituntil "#id" hide
waituntil "#id" visible
```

##### Expect (Test Function)
expect cssSelector attribute/text/cssProperty operator value

```
expect #someElement html contains "success"
expect #someElement text contains "success"
expect #someElement value equal 1000
expect #someElement length lessthan 10
expect #someElement backgroundColor "#ff0000"
expect #someElement display none
```

##### Evaluate
evaluate javascript

```
evaluate "console.log($('#d').val())"
```
