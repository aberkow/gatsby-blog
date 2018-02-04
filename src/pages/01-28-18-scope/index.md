---
path: "/programming-concepts-part-1-scope"
date: "2018-01-22"
title: "Scope"
image: ./assets/featured-image.jpg
tags:
  - fundamentals
  - programming concepts
  - patterns
author: "Adam"
category: "programming concepts"
---
Before I start, just a quick note. All the code examples will be in javascript. That way they can be tried quickly and easily in the browser. If you don't understand all the examples, that's ok. It's the concepts that are more important than the specific examples. Also, I don't like `foo, bar, baz`. If you do, that's nice. I find them needlessly confusing.

Instead of starting with technical things, I'd like to share how I think about scope. I often pretend that the code I write is like people in a family (or a team) and these questions come up over and over - 

- Who knows about what information?
- How much information do they _really_ need to know and/or care about?
- Where do they know the information from?

For instance, I'm married and my wife and I have two young children. Because they're young, my wife and I need to know basically everything about our children
- where they are
- who they know
- how they're doing in school
- what they're reading, watching, eating...
- etc etc etc...

The list gets pretty long!

Essentially (within our family) our children are in the `global scope`. On the other hand, as parents, we're more selective about what we tell our children. They need to know some things about us as parents all the time (e.g. we love, respect, and will take care of them). Other information they either never need to know or need to know only at certain times and in well defined ways.

So how does this apply to programming? 

## The Problem
In javascript before `const`, this behavior was often a problem because of the possibility of overwriting a `var` by accident. For a quick example of how this could happen, try this...
```javascript
// global scope
var ex = 'example'; 
console.log(ex);

// re-defined in the global scope
var ex = 'not anymore!'; 
console.log(ex);

// global variable re-defined from inside a function
var exampleFunction = function() { 
	ex = 'gotcha!';
}
exampleFunction();
console.log(ex);
```

## Global Scope
Consider a global variable `const globalVariable = "I'm a global variable"`. Everything in our program could know everything there is to know about this variable. All of these examples (except the last two) would work.
```javascript
const globalVariable = "I'm a global variable";
const howLongIsIt = () => {
  // I'm wrapping this in a function to prove a point.
  return globalVariable.length;
}
const globalVariableLength = howLongIsIt();
console.log(globalVariableLength); // 22

const anObject = {};
const addToAnObject = () => {
  anObject.newProperty = globalVariable;
  return anObject;
}
addToAnObject();
console.log(anObject); // { newProperty: "I'm a global variable" }

const anArray = [];
anArray.push(globalVariable);
console.log(anArray); // ["I'm a global variable"]

const thisWillWork = () => {
  const scopedToAFunction = "Not a global variable";
  anArray.push(scopedToAFunction);
}
thisWillWork();
console.log(anArray); // ["I'm a global variable", "Not a global variable"]

const thisWontWork = () => {
  const scopedToAFunction = "Not a global variable";
  const returnThis = "I get returned";
  return returnThis;
}
thisWontWork();
console.log(scopedToAFunction); // Uncaught ReferenceError: scopedToAFunction is not defined

const thisWontWorkEither = () => {
  globalVariable = "something else...";
}
thisWontWorkEither();
console.log(globalVariable); // TypeError: Assignment to constant variable.
```

Even with `const` I still try to avoid cluttering the global scope. Partly because it just feels wrong to have too many global variables and partly because I don't want to create potential conflicts among variables later on. Often I try to get around this by containing or encapsulating variables inside objects, classes, or functions.

## The Pattern
It seems to me that this pattern of scope extends beyond variables. Lately I think about scope with respect to all kinds of other programming tasks. Usually these are tasks that require some amount of information or access being hidden or revealed. Some of these might include
- creating helper classes/functions in a utilities file
- implementing a model/view/controller architecture
- creating a single use Docker image
- making sure I've properly gitignored certain files (e.g. built files)
- creating environment variables for API keys or other credentials
- using css selectors intelligently

All of these examples take into account some aspect of a system (program, container, stylesheet...) "knowing" about and having access to certain information and not "knowing" about or having access to other information. What other examples can you think of? Do you agree with how I've framed the concept? Disagree? I'd love to hear and learn from you!