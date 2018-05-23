---
path: "/functions-part-0"
date: "2018-05-12"
title: "Functions Part 0"
image: ../../images/coffee-zero.jpg
alt: "A cup of black coffee in a ceramic mug seen from the top on a cream colored background."
tags:
  - fundamentals
  - concepts
  - functions
author: "Adam"
category: "programming concepts"
---

## Confusion
When I first started learning programming, functions were _super_ confusing to me. There seemed to be so many different kinds:
- anonymous functions
- named functions
- callback functions
- factory functions
- closures (a kind of function inside a function...)
- (now with ES6) arrow functions
- methods (functions that are part of a class)

I could hardly keep track of them all. 

Then there was the issue of the `return` keyword that comes up over and over. I kept thinking - "Return from where? Return from what?" I sometimes got confused by arguments to a function. Not to mention what happens when a function is assigned to a variable...

## Clarity
What eventually clarified it for me was coming to understand that - 
> functions encapsulate behaviors of a program.
How about a story?

### Buying coffee
The other day, I went to the coffee shop to buy a bag of coffee. The coffee shop only sells bags with whole beans, but I like to get it ground there. I take a bag of coffee from the shelf, bring it to the cashier, pay, and say "I'd like this ground for a French press please." The cashier takes the coffee to the grinding machine and puts it in. She puts the empty bag under a spout, turns a dial, and pulls a lever. The machine makes a noise. Ground coffee goes back in the bag. When it's done, she hands me the bag of freshly ground coffee and I leave.

### Coffee as code
Still with me? Great! Let's put this story into code.

```javascript
const grindCoffee = (baggedCoffee, coarseness) => {
  let groundCoffee = null;
  // some things happen to groundCoffee...
  return groundCoffee;
}
```
When I give the coffee to the cashier, she takes it and grinds it. For this example, I don't care _how_ she grinds it. I only care that I've given her a bag of coffee and a coaresness and that she gives me ground coffee back. That's what `grindCoffee` does.

In order to work correctly `grindCoffee` needs two pieces of information:
- A bag of coffee to grind
- A coarseness to grind the coffee.
These are the **arguments** to the function. Without these two things the cashier either can't grind anything, or has no idea how to grind it. When this is all done, the cashier will `return` the bag of coffee to me transformed into its ground state. Here's the example with a little more code!
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
What is `myCoffee`? It's a variable (something that can be used elsewhere [like a coffee pot]) equal to the value of **whatever the result is of the `grindCoffee` function**.

## Real life
Obviously this is just an analogy for what a function does. It isn't even very flexible or fault tolerant!
- What if there are lots of kinds of coffee and many settings?
- What if some settings work better with some coffees than others?
- What if I needed a lot of different coffees ground one after another?
- What if there were default settings?
- What happens if something goes wrong in the process?
- What if the cashier gets the wrong kind of item to grind? Cookies for instance?

In the next post I'll expand (or maybe stretch) this analogy to answer some of these questions. For now, the important things to understand are:
- Functions perform actions (or behaviors) in a program.
- Functions sometimes need other pieces of information called arguments to work correctly.
- Functions need to give us something back (`return`) when they're done working in order to be useful.

What do you think? Does it help to think about functions in terms of real-life experiences? 