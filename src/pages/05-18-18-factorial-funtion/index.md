---
path: "/factorial-function"
date: "2018-05-13"
title: "Factorial Function"
image: ../../images/multiplication.jpg
alt: "A worksheet of multiplication problems with a yellow pencil on top."
tags:
  - fundamentals
  - concepts
  - functions
  - math
  - loops
author: "Adam"
category: "programming concepts"
---

The other day, a colleague said that he'd recently had an interview where they asked him to write a factorial function. A factorial is what you get when you 
- start with a number
- multiply that times the next lowest number
- multiply the product times the next lowest
- until you get to multiplying times 1.
I'm not the best at math, but I knew I could figure out how to write that. So I took 5 minutes and worked it out. Here's what I came up with
```javascript
const factorial = number => {
  let temp = number - 1;
  while (temp > 1) {
    number *= temp;
    temp--;
  }
  return number;
}
```
I'll walk through this step by step.
1. The function needs a number to start with as an argument. Let's say 5. 
2. I know that I'll need to multiply that times the next lowest number.
3. I create a `temp` variable that can store that number and be reassigned.
4. A `while` loop let's me do two things: multiply the original number times the temporary number thereby increasing the value of the original number and then decreasing the value of the temporary number on each pass through the loop.
5. As soon as the `temp` variable hits 1, the loop exits and the number is returned.

That's it!