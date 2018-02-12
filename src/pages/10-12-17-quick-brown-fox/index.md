---
path: "/the-quick-brown-fox"
date: "2017-09-15"
title: "THE qck brn FOX!"
image: ../../images/fox.jpg
alt: "A red fox standing on snow and looking at the photographer"
tags:
  - javscript
  - functional programming
  - etude
  - array methods
  - string methods
author: "Adam"
category: "javascript"
---

In this post, I’m going to show how to change a string (in this case a sentence) using JavaScript string and array methods.

## Today's Challenge
Take a given sentence and:
- turn all the words that are less than three letters into all caps
- remove all the vowels from the rest of the words then, 
- return the modified sentence. 

We need to make sure our solution can solve these two cases. (For the record, this challenge came from codewars).

```
The quick brown fox stole my lunch!
The quick brown fox stole my lunch, and ate it!
// Should become...
THE qck brwn FOX stl MY lnch!
THE qck brwn FOX stl MY lnch, AND ATE IT!
```
<br />
Here are the methods/tools I used to complete the challenge.

- String  — ` .split(), .toUpperCase(), .replace()`
- Array  — ` .map(), .join()`
- Other  — ` if/else, .length, regex (just a touch)`

The first thing I did to solve this challenge was to break it into parts. As I saw it, the steps I needed were to:
- Break the sentence (a string) into individual words (an array)
- Sort the words according to size
- Modify each word
- Take the array of modified words and combine them back into a sentence

## The function
Let’s start by defining a function. It’ll take one argument and return the modified sentence.
```javascript
const stringChange = (string) => {
  // do things
  return newString;
}
```
<br />
### Task 1 — Break ups are easy.
We have a whole string. In this case a sentence. We need to break it into pieces The string `split()` method is perfect for this. It takes any string and breaks it into pieces that will be held in an array. We’ll use `text.split(‘ ‘)` to make sure the text is broken into individual words. The (apparently empty) quotes inside the parentheses are what's called a `delimiter`. They tell the `split()` method where to break the string appart. In this case, on every space which gives an array of complete words. If we needed to break the string on a comma (for instance), we could use `.split(',')`.
```javascript
const stringChange = (string) => {
  const newString = string.split(‘ ‘);
}
```
<br />
### Task 2  —  Sorting and sifting.
Now that we’ve got an array, we’ve got to iterate (loop) through it somehow. There are two main ways to do this. One is the venerable for loop. The other is to use an array method. To practice array methods, we'll use `.map()`. This method goes through each item in the array and let’s you do things to it. When the `.map()` method is finished, it returns a new array. The method takes a callback as an argument to perform the operation. That means inside the callback we can use an `if...else` statement to sort the words. Plus, strings have a `.length` property which means we have a simple way to check how long each word is. Notice also that we can chain the `.split()` and `.map()` methods together. Perfect. Now we have…
```javascript
var stringChange = function(string) {
  var newString = 
  string.split(' ').map((word) => {
    if (word.length <= 3) {
      // if the word has fewer than 3 characters, do something.
    } else {
      // otherwise do a something else.
    };
  });
};
```
<br />
### Task 3  —  Sometimes change is easy too.
Back to our challenge, we want to turn all the short words `(<= 3 letters)` into all caps. This is super easy with the `.toUpperCase()` string method. It will automatically turn the characters of a word uppercase. 

Getting rid of the vowels is slightly trickier. The `.replace()` method with a little regex will help us here. We’re going to use `.replace(/[aeiou]/ig, '')` to look for the all the vowels and remove them (the '' at the end). Notice that we can chain the 
```javascript
const stringChange = (string) => {
  const newString = 
    string.split(' ').map((word) => {
      // At this point it might be useful to log what we're doing...
      if (word.length <= 3) {
        console.log(word.toUpperCase());
        return word.toUpperCase();
      }
      else {
        console.log(word.replace(/[aeiou]/ig, ‘’));
        return word.replace(/[aeiou]/ig, ‘’);
      };
  });
  // Notice that `newString` is an array?
  console.log(newString);
};
```
<br />
### Task 4  —  Time to get back together.
Now we need to recombine our `newString` so that it gives us back our sentence when we return the function. We can do this with the `.join()` array method which is the opposite of `.split()`. It takes our array and "joins" all the parts back together. Then we get rid of all the commas by using a delimiter of `','`.
```javascript
const stringChange = (string) => {
  const newString = 
    string.split(' ').map((word) => {
      // At this point it might be useful to log what we're doing...
      if (word.length <= 3) {
        console.log(word.toUpperCase());
        return word.toUpperCase();
      }
      else {
        console.log(word.replace(/[aeiou]/ig, ‘’));
        return word.replace(/[aeiou]/ig, ‘’);
      };
  }).join(',');
  // Notice that `newString` is now a string?
  console.log(newString);
};
```
<br />
### Task 5  —  Celebrate?
We did it! Sort of? You’re about to argue with me... I can tell... You’re going to say, “Yeah fine, but what about sentences that have commas in them (like this one)?” You’re right. The `join()` isn’t refined enough. It strips out the commas, but it gets rid of all of them. Including the ones that are supposed to be there. The solution is to use the `.replace()` method like this `newText = changedTextArr.join().replace(/,\b/ig, ' ');`. Notice that the delimiter for `.join()` has been removed. I found this solution in Eloquent Javascript which says

> “The code `\b` matches a ‘word boundary’, which can be punctuation, white-space, or the start or end of the string.” 

Exactly what we need. So, the full answer is now…
```javascript
const stringChange = string => {
  const newString = string.split(' ')
  .map((word) => {
    if (word.length <= 3) {
      return word.toUpperCase();
    } else {
      return word.replace(/[aeiou]/ig, '')
    }
  }).join()
    .replace(/,\b/ig, ' ');
  console.log(newString);
  return newString;
}
```
<br />
### Task 5a  —  Celebrate!
That’s it for now! Of course there are other ways of doing this like with a `for` loop or the `.forEach()` array method like the examples below. However the nice thing about `.map()` is that we can do the entire function using just one variable. Using the other methods would take (as I figure it) two more. I hope you’ll let me know what you think about this approach.

```javascript
const stringChange = string => {
  const changedTextArr = [];
  let newString;
  const wordArr = string.split(' ');
  for (i = 0; i < wordArr.length; i++) {
    if (wordArr[i].length <= 3) {
      changedTextArr.push(wordArr[i].toUpperCase());
    } else {
      changedTextArr.push(wordArr[i].replace(/[aeiou]/ig, ''));
    }
  }
  newString = changedTextArr.join().replace(/,\b/ig, ' ');
  return newString;
}
```
<br />
```javascript
// an approach using forEach
const stringChange = string => {
  const changedTextArr = [];
  let newText;
  const wordArr = string.split(' ').forEach((word) => {
    if (word.length <= 3) {
      changedTextArr.push(word.toUpperCase());
    } else {
      changedTextArr.push(word.replace(/[aeiou]/ig, ''));
    };
  });
  newText = changedSentenceArr.join().replace(/,\b/ig, ' ');
  return newText;
};
```
