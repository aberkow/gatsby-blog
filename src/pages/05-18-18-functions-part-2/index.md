---
path: "/functions-part-2"
date: "2018-05-14"
title: "Functions Part 2"
image: ../../images/coffee-two.jpg
alt: "Coffee beans arranged into a square with four quadrants. Each quadrant has a different color roast."
tags:
  - fundamentals
  - concepts
  - functions
author: "Adam"
category: "programming concepts"
---
In [Part 0 of this series](/functions-part-0), I started by saying that functions encapsulate behaviors of a program. Then in [Part 1](/functions-part-1), I described how to 
- check the arguments passed into a function
- give meaningful feedback in the case of an error
- and set defaults for the function.
In this post I'd like to examine callback functions. They confused me so much for so long, but eventually I figured some things out. Also - they come up everywhere!

## Event listeners and handlers
So what is a callback function? It is 
- a function that is an argument to another function
- the callback waits for the first function to happen
- the callback does whatever it needs to do
- then the other function finishes

One of the most common uses for callbacks are as arguments to event listeners. An event listener is exactly what it sounds like. It's a function that waits for some event to happen. When the event happens, it lets the event handler do something. Let's go back to the coffee shop for a really bad play!

CHARACTERS:
YOU - a customer
CASHIER - a coffee shop employee
SCENE:
_You stand at the cash register holding a bag of coffee. You have just bought the coffee and are about to ask for it to be ground._
YOU - Please grind this bag of coffee for an espresso machine.
CASHIER - Of course. I can do that for you.
(_pause and grinding machine noises_)
CASHIER - Here you are. (_hands back coffee_)
YOU - Thank you very much.
_FIN_

I'll admit this is a little silly, but I'm having fun and I hope you are too! Let's think about this for a minute. The cashier has just sold you the coffee and is waiting (listening) for you to make a request. When you ask them to grind the coffee, they go away, grind it and then come back with the coffee. In code, this might look something like this...

```javascript
// grindRequest is an event listener
cashier.addEventListener('grindRequest', (item) => {
  // this part is the event handler
});
```
You could also use this form
```javascript
const grindCoffee = (item) => {
  // grindCoffee function...
}
// grindRequest is an event listener
cashier.addEventListener('grindRequest', grindCoffee);
```
`addEventListener` allows the `cashier` to wait for the `grindRequest` event to happen. Once it does, the `cashier` will `grindCoffee`.
## Let's get out of here
In the "real world" all kinds of event listeners can get added to different parts of the page you're working on. For instance if you wanted the page (aka `document`) to listen for when a mouse click happens and then print a message about which thing (aka `target`) was clicked to the console, you would write - 
```javascript
document.addEventListener('click', (evt) => {
  console.log(evt.target, 'the thing that got clicked on');
});
```
Again you could also do - 
```javascript
const clicky = (evt) => {
  console.log(evt.target, 'the thing that got clicked on');
}
document.addEventListener('click', clicky);
``` 
The argument `evt` (also sometimes `event` or even just `e` could be anything. Usually it helps to make arguments meaningful though...) is an object with, among other things, a `target` property. The `evt` object is automatically passed to the handler if it is used as an argument to the handler function.

Event listeners can appear in other contexts besides the `document` such as listening for server or database events with Node.

## Callback functions on class methods
Another common use for callback functions is on methods. Let's discuss array methods and callbacks. If you're not familiar with arrays, think of them as a kind of list that can contain all kinds of things (text, integers, other arrays, objects, etc...). For instance this is an array: `['orange', 'apple', 'grape', pear']`. Unlike objects which in javascript go between curly braces `{}`, arrays go between square braces `[]`. Also - arrays start at 0 not 1.

In javascript arrays have lots of methods to choose from. Let's choose the `forEach` array method. The name of the method gives a good clue to what it lets you do. If you're interested, you can read the full documentation for `forEach` from MDN. You can execute a function for each thing in the array.

Here's an example
```javascript
// an array of numbers
[1, 2, 3, 4].forEach((number) => {
  console.log(number + 1);
});
// when done will log...
// 2
// 3
// 4
// 5
```
Often though the array will be stored in a variable. The method and callback will then be applied to the variable.
```javascript
// an array of numbers
const numbers = [1, 2, 3, 4];
numbers.forEach((number) => {
  console.log(number + 1);
});
// when done will still log...
// 2
// 3
// 4
// 5
```
Using the `forEach` method you also get access to the index of the item in the array. So for instance...
```javascript
const items = ['orange', 'apple', 'pear'];
items.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// logs
// 0: orange
// 1: apple
// 2: pear
```
You could also do
```javascript
const items = ['orange', 'apple', 'pear'];
const myCallback = (item, index) => {
  console.log(`${index}: ${item}`);
};
items.forEach(myCallback);
// logs
// 0: orange
// 1: apple
// 2: pear
```
### AHHH I STILL DON'T GET IT!
Yeah. This can be confusing. How does `forEach` know about `item` and `index`? Well just like functions can take things like numbers, text (aka strings), objects, or arrays as arguments, they can also take other functions as arguments. Without getting into the weeds too much, the `forEach` method (which is a function on the array class) "knows" about `item` and `index` without you having to do anything. In fact it knows about other things as well and you can learn all about that from the [`forEach` documentation from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

## Callbacks and Wordpress
Next time I'll get into callbacks within the context of WordPress actions and hooks.
