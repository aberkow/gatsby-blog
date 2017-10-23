---
path: "/backwards-and-forwards"
date: "2017-10-15"
title: "Backwards and Forwards (or  —  Palindrome checker)"
image: ./assets/featured-image.jpg
tags:
  - javascript
  - functional programming
  - etude
  - array methods
  - string methods
author: "Adam"
category: "javascript"
---

Building on the techniques used in the last post, I’m going to write a simple function that checks to see if a given word is a palindrome or not. There are a few ways to do this. But, I’m trying my best to write code that is clear to understand and relies upon built in methods as opposed to lots of loops.

**Challenge — Check a given word to find out if it’s a palindrome.**

**Methods**
- String: `.toLowerCase(), .split()`
- Array: `.join(), .reverse(), .split()`
- Other: Ternary operator

**Test cases**
- Hello/hello
- Noon/noon

**Steps**
- Make sure the provided word has all the same case (upper or lower).
- Take the word apart, reverse it and put it back together.
- Check to see if the words are still equal

**1  —  Set up a function.**

This function will just log the result of the comparison (although I’ll provide an alternate for returning the result). I’m going to be using more and more ES6 syntax as I go. So the function will be:

```javascript 
const palindromeChecker = word => {

};
```
<br /><br />
**1a** Make two variables we can work with
```javascript
const palindromeChecker = word => {
  const wordLowered
  const drow
};
```
<br /><br />
**1b** Make sure both words are lowercase

```javascript 
const palindromeChecker = word => {
  const wordLowered = word.toLowerCase();
  const drow = word.toLowerCase();
};
```
<br /><br />
**2**  Ok. At this point both `wordLowered` and `drow` are the same. Given the string `“Test”`, they’ll both equal `“test”`. So, now we have to reverse the word to give us the drow. That’s where the other methods come in.
```javascript
const palindromeChecker = word => {
  const wordLowered = word.toLowerCase();
  const drow = word.toLowerCase().split('').reverse().join('');
};
```
<br /><br />
**2a**  Let’s go through these methods one at a time. `split()` takes the string and with the `‘’` (NB  —  that’s two quote marks without a space…) breaks it into an array of letters. Each letter of course is its own string. At this point given the word ‘Test’ what’s going on is
```javascript
const drow = "Test".toLowerCase() // - "test"
                   .split('')     // - ["t", "e", "s", "t"]
```
<br /><br />
**2b** ` reverse()` does exactly what it’s name suggests. It reverses the array created by `split()`.

```javascript
const drow = "Test".toLowerCase() // - "test"
                   .split('')     // - ["t", "e", "s", "t"]
                   .reverse()     // - ["t", "s", "e", "t"]
```  
<br /><br />                
**2c**  Finally `join()` puts the array back into a string and the `‘’` removes the quotes from around each index.
```javascript
const drow = "Test".toLowerCase() // - "test"
                   .split('')     // - ["t", "e", "s", "t"]
                   .reverse()     // - ["t", "s", "e", "t"]
                   .join('')      // - "tset"
```
<br /><br />
Note that we can chain these functions one right after the next. We don't have (and shouldn't) reset the variable for each one.

So let’s remember what our function looks like before we move on.
```javascript
// Given "Test"
const palindromeChecker = word => {
  const wordLowered = word.toLowerCase(); // 'test'
  const drow = word.toLowerCase().split('').reverse().join(''); //'tset'
}
```
<br /><br />
**3**   At this point we can make a comparison. We could use an `if` statement, but because the check is so short, I’m going to opt for a ternary operator. If you’re not familiar with them, ternary operators are like shorthand `if` statements. They can (in theory) get pretty complicated, but I don’t like making them too long or involved. They have three parts (that’s why they’re called ternary), which are separated by a `?` and `:` respectively.

In English, here's how a ternary operator works.

```javsacript
theThingToCompare ? if it's truthy, do this part. : if it's falsy, do this part.
```
<br /><br />
Our ternary operator looks like this…
```javascript
(wordLowered === drow) ? console.log('It\'s a palindrome!') : console.log('Nope...');
```
<br /><br />
You could also simply return the check like this, but you’d need a way to display the result.
```javascript
return (wordLowered === drow) ? 'It\'s a palindrome!' : 'Nope...';
```
<br /><br />
4 — Now we can finish the function by putting our ternary operator after the two `const`’s.
```javascript
const palindromeChecker = word => {  
  const wordLowered = word.toLowerCase(); // 'test'
  const drow = word.toLowerCase().split('').reverse().join('');
(wordLowered === drow) ? console.log('It\'s a palindrome!') : console.log('Nope...');
}
```
<br /><br />
**5**  Conclusion:

Given our test cases (“Hello, “hello”, “Noon”, “noon”), we should expect the following to be logged to the console.
- `palindromeChecker("Hello")` 'Nope...'
- `palindromeChecker("hello")` 'Nope...'
- `palindromeChecker("Noon")` 'It's a palindrome!'
- `palindromeChecker("noon")` 'It's a palindrome!'

That’s it for now, please let me know what you think or where I can improve!