---
path: "/functions-part-3"
date: "2018-05-14"
title: "Functions Part 3"
image: ../../images/coffee-two.jpg
alt: "Coffee beans arranged into a square with four quadrants. Each quadrant has a different color roast."
tags:
  - fundamentals
  - concepts
  - functions
  - wordpress
author: "Adam"
category: "programming concepts"
---
This is part 3 of a series on functions. When I was first starting to learn web development, there were some aspects of functions that were confusing to me. Fortunately, after a lot of practice I'm not (quite) as confused as before! Progress!

In this post I want to take a brief look at WordPress action hooks and filters as they relate to callback functions. If you're coming here and are confused by callback functions in general, that's ok. You might want to take a little time to [read part 2 of this series which deals with callback functions](/functions-part-2).

## WordPress Hooks.
In WordPress hooks are 
> Hooks are provided by WordPress to allow your plugin [or theme] to 'hook into' the rest of WordPress; that is, to call functions in your plugin at specific times...

Does this seem familiar? It should. It's a similar principle to event listners on a web page. However, WordPress hooks are a little different. Event listeners have to be added on each page where you want something to happen. Then you add an event handler to execute a function after the page "hears" the event. 
> Event listeners wait and are non-sequential.

### A Pretend Event Listener
For instance let's say you have a button and you want an alert presented to the user when the button is clicked. The button doesn't come with a click event listener by default. With javascript it must be added like this.
```javascript
const button = document.getElementById('myButton');
button.addEventListener('click', (evt) => {
  alert('You clicked the button');
});
```

### A WordPress Hook
WordPress on the other hand comes with a whole range of hooks by default. [Here is a list of all the default WordPress hooks](https://codex.wordpress.org/Plugin_API/Action_Reference). As the documentation says, they wait for a sequence of events. 
> WordPress hooks occur in time, sequentially.

A great example of this is the `wp_enqueue_scripts` hook. It's used to take javascript and css files and add appropriate `<script>` and `<links>` for each. However, it is executed between `get_header` and (a little later) `wp_head`. For the moment it doesn't matter what these other hooks do. All that matters right now is that they occur _in sequence at the same time, every time_.

## What does this have to do with callback functions?

