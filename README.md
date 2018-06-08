KISS.js
=======

Play with DOM directly, No Virtual DOM.

Easy to extension! Everything can be done with function!

[GitHub](https://github.com/codehz/KISS.js)
[Download](https://codehz.github.io/KISS.js/kiss.js)
[Issues](https://github.com/codehz/KISS.js/issues)

### First parameter

*   #### as HTMLElement
    
    ### Mount content onto this element
    
    `ce(document.body, ce('div', "I'm DIV"))`
    
*   #### as String
    
    ### Create a HTMLElement (format TAG#ID.CLASS1.CLASS2)
    
    `ce(document.body, ce('div#target.test', 'div content'))`
    

### Rest parameter

*   #### null or undefined
    
    ### Do nothing
    
    `ce(document.body, null, undefined)`
    
*   #### string
    
    ### Replace text content
    
    `ce(document.body, 'I will be overwrited', 'I will be shown')`
    
*   #### iterable or async generator
    
    ### Recursively call with it
    
    `ce(document.body, ['I will be overwrited', 'I will be shown (same as above)'])`
    
*   #### function and async function
    
    ### Call it, then handle the return value
    
    `ce(document.body, el => console.log(el), discard(el => (el.style.backgroundColor = 'red')))`
    

### Create a DIV

`ce(document.body, ce('div'))`

### Create a DIV with ID and classes

`ce(document.body, ce('div#target.top.left'))`

### Create a DIV with content and children

`ce(document.body, ce('div', 'parent content', ce('div.child', 'child content')))`

### Create a DIV and set attributes

`ce(document.body, ce('div', discard(div => (div.dataset.value = 1))))`

### Async!

`function wait(time) { return new Promise(resolve => setTimeout(resolve, time)) } ce(document.body, ce('div', 'wait...', async function () { await wait(2000) return "Success" }))`

### Async Generator!

`function wait(time) { return new Promise(resolve => setTimeout(resolve, time)) } ce(document.body, ce('div', 'wait...', async function* () { for (let i = 0; i < 50; i++) { await wait(100) yield i } yield "Finished" }))`

### Json array to list

`let data = [{id: 1, data: "123"}, {id: 2, data: "456"}] ce(document.body, ce('ul', data.map(({id, data}) => ce('li', ce('span', id), ce('div', data)))))`