---
path: "/functions-part-1"
date: "2018-05-13"
title: "Functions Part 1"
image: ../../images/coffee-one.jpg
alt: "A tall glass of iced coffee with milk swirling in the glass."
tags:
  - fundamentals
  - concepts
  - functions
author: "Adam"
category: "programming concepts"
---

[In the last post about functions](/functions-part-0), I used the analogy of buying coffee from a store to demonstrate:
- functions as behaviors of a program
- arguments to functions
- the `return` keyword
- assigning the result of a function to a variable

Now, I'd like to expand on the example a little and explore
- checking arguments
- giving errors
- setting default arguments

## Would you grind this?
One of the many tricky things about programming is that computers do _exactly what you tell them to_. Nothing more. Nothing less. Let's look at the previous example.
```javascript
const coffee = 'French Roast';
const setting = 'French Press';
const grindCoffee = (baggedCoffee, coarseness) => {
  let groundCoffee = null;
  // some things happen to baggedCoffee to turn it into groundCoffee...
  return groundCoffee;
}

const myCoffee = grindCoffee(coffee, setting);
```
Looks ok right? Well... Not really. What if I changed `const coffee = 'French Roast'` to `const coffee = 'Cookies'`? As it is right now, `const myCoffee = grindCoffee(coffee);` would still "work". That is, the program has no way to know that `cookies` and `coffee` are different things. Let's fix that by pretending the coffee shop also sells cookies.

```javascript
const frenchRoastCoffee = {
  name: 'french roast',
  type: 'coffee',
  options: {
    bestSetting: 'french press'
  },
  price: 14
}

const chocolateChipCookie = {
  name: 'chocolate chip',
  type: 'cookie',
  price: 2
}
```
### Is it really coffee?

Now there are two items in the store. They are represented by objects. If you don't know what an object is, that's ok. You can read the full [MDN documentation on objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) if you like. For now, you can think of it as a collection of properties or characteristics that describe something. In this case, the items for sale. What's more important is that in this naive example, the two items have a `type` property. This gives us something to check.

But before I do that, this example uses a generic `item` as the argument to the function. Why? It took a long time for me to understand this. The name of the argument is just a placeholder. It means that the function needs _something_ to work correctly. The `item` in this case will either be `frenchRoastCoffee` or `chocolateChipCookie`. I can now use the function as either `grindCoffee(frenchRoastCoffee);` or `grindCoffee(chocolateChipCookie);`

```javascript
// the argument is changed to a generic item which is an object.
const grindCoffee = (item) => {
  let groundCoffee = null;

  // if the item is coffee, continue grinding it.
  if (item.type === 'coffee') {
    // some things happen to the coffee to turn it into groundCoffee...
    return groundCoffee;
  } else {
    return;
  }
}
```

Now, that makes sense! If the item is coffee, it can be ground. Else, (see what I did there) `return` nothing so the function stops with no effect. But there's a better way!

Often it's useful to check if the thing you're checking is "wrong" first. This can save you steps.

```javascript
// the argument is changed to a generic item which is an object.
const grindCoffee = (item) => {
  let groundCoffee = null;

  // if the item is not coffee, stop the function.
  if (item.type !== 'coffee') return;

  // some things happen to the coffee to turn it into groundCoffee...
  return groundCoffee;
}
```
Now let's say, you do this...
```javascript
const myCoffee = grindCoffee(chocolateChipCookie);
```

What happens?

### Where's my coffee?
At the moment, there's if you give `grindCoffee` a cookie, the cookie won't be ground up (Hooray!). Sadly, the program doesn't know to do anything beyond that. What would be useful is if the program told us there's a problem. One way to do that is to `throw` an `Error`. The way to do this is `throw new Error('a meaningful error message goes here')`. Once the error is thrown, the function stops.

```javascript
// the argument is changed to a generic item which is an object.
const grindCoffee = (item) => {
  let groundCoffee = null;

  // if the item is not coffee, stop the function.
  if (item.type !== 'coffee') {
    throw new Error(`You can't grind ${item.name} because its type is ${item.type} not coffee`;)
  } else {
    // some things happen to the coffee to turn it into groundCoffee...
    return groundCoffee;
  }
}
```

Now if you give `grindCoffee` a cookie, the function will not only stop it will also tell you _why_ it stopped. In this case saying
> You can't grind Chocolate Chip because its type is cookie not coffee

However, if you do `const myCoffee = grindCoffee(frenchRoastCoffee);` You'll get your coffee.

If you're confused by the `${item.name}` and `${item.type}` that's ok. It's called variable interpolation! Fancy! Really it's just a way of creating placeholders for variables within some text using "template literals". You can read the [MDN documentation on template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) as well. You could also write this as `"You can't grind " + item.name + " because its type is " + item.type + " not coffee"`. Also, if for some reason you don't like throwing errors, you could use `console.log`, `console.warn`, or `console.error` and then `return` the function right after.

### I just wanted some coffee!
What if you wanted to do something like `const myCoffee = grindCoffee();` and you _don't_ want to pass in an argument? The way things are set up right now, this wouldn't work. But! You can make a default argument!  With ES6 syntax that's possible like this.

```javascript
const exampleFunction = (greeting = 'hello world!') => {
  return greeting;
}
```
Here, just running the function `exampleFunction()` would return 'hello world!'. If you passed in a different greeting though, it would return the different greeting.

In our case of trying to get coffee from a coffee shop, having a default would be like saying to the cashier "I'd like some ground coffee but I don't care what kind."

```javascript
const grindCoffee = ({
    name = 'regular coffee',
    type = 'coffee',
    price = 10
  } = {}) => {
  let groundCoffee = null;
  // if the item is not coffee, stop the function.
  if (item.type !== 'coffee') {
    throw new Error(`You can't grind ${item.name} because its type is ${item.type} not coffee`;)
  } else {
    // some things happen to the coffee to turn it into groundCoffee...
    return groundCoffee;
  }
}
```
By using a default like this, you can be sure that `grindCoffee` will `return` regular coffee even if you do `const myCoffee = grindCoffee();`.

## Moving on!
Excellent. Now you know how to check a function's argument and handle an error so you get feedback if something goes wrong. I also took a little look at how to set a default object as an argument. How do you handle argument validation and error checking in your functions? Do you have a different approach? Let me know! Next time, I'll go over callback functions because at one time I found them so incredibly confusing I spent a week trying to figure out what they did. 
