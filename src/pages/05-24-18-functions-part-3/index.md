---
path: "/functions-part-3"
date: "2018-05-27"
title: "Functions Part 3"
image: ../../images/hooks-0.jpg
alt: "Carabiners and climbing gear in a pile on a grey rock-like surface."
tags:
  - fundamentals
  - concepts
  - functions
  - wordpress
author: "Adam"
category: "programming concepts"
---
This is part 3 of a series on functions. When I was first starting to learn web development, there were some aspects of functions that were confusing to me. Fortunately, after a lot of practice I'm not (quite) as confused as before! Progress!

In this post I want to take a brief look at WordPress action hooks as they relate to callback functions. If you're coming here and are confused by callback functions in general, that's ok. You might want to take a little time to [read part 2 of this series which deals with callback functions](/functions-part-2).

## WordPress Hooks.
In WordPress hooks are 
> Hooks are provided by WordPress to allow your plugin [or theme] to 'hook into' the rest of WordPress; that is, to call functions in your plugin at specific times...

Does this seem familiar? It should. It's a similar principle to event listners on a web page. However, WordPress hooks are a little different.

### Imagine a Factory
If you're feeling confused by this concept, imagine a factory. When something is made in a factory, parts are added one at a time, in sequence, at (usually) the same rate each time. That's what the WordPress action hooks are like. They take place in the same order every time WordPress runs. If you want to change the outcome of the action hook, you can. However, you can't really change _when_ it happens.

Event listeners on the other hand have to be added on each page where you want something to happen. Then you add an event handler to execute a function after the page "hears" the event. 

### A Pretend Event Listener
For instance let's say you have a button and you want an alert presented to the user when the button is clicked. The button doesn't come with a click event listener by default. With javascript it must be added like this.
```javascript
const button = document.getElementById('myButton');
button.addEventListener('click', (evt) => {
  alert('You clicked the button');
});
```
Even after it's added, the event listener never "knows" when it will be used. In some instances, it will _never_ be used.
> Event listeners wait and are non-sequential.

### A WordPress Hook
WordPress on the other hand comes with a whole range of hooks by default. [Here is a list of all the default WordPress hooks](https://codex.wordpress.org/Plugin_API/Action_Reference). As the documentation says, they wait for a sequence of events. 
> WordPress hooks occur in time, sequentially.

A great example of this is the `wp_enqueue_scripts` hook. It's used to take javascript and css files and add appropriate `<script>` and `<links>` for each. However, it is executed between `get_header` and (a little later) `wp_head`. For the moment it doesn't matter what these other hooks do. All that matters right now is that they occur _in sequence at the same time, every time_.

## What does this have to do with callback functions?
Well, the `wp_enqueue_scripts` hook might run at the same time every time WordPress runs. However, without explicit instruction, it won't add any stylesheets or scripts to the page. In order for `wp_enqueue_scripts` to "know" what to do, you use a callback function. 

The order in which things happen is
- the time for the `get_header` hook is reached
- the time for `wp_enqueue_scripts` is reached.
- the callback function is run
- the callback function runs anything inside itself _including other functions_!
- if everything works correctly, the time for the `wp_head` hook is reached.

Sometimes it starts to feel like functions-in-functions-in-functions..... 
```php
// the add_action function is how you access/modify the WordPress hooks.
add_action('wp_enqueue_scripts', function() {
  // anything placed in here will happen at the time wp_enqueue_scripts happens.
});
```
This pattern should look a little familiar. So if you want to enqueue two assets `index.js` and `style.css`, you can do it like this.
```php
// the add_action function is how you access/modify the WordPress hooks.
add_action('wp_enqueue_scripts', function() {
  // anything placed in here will happen at the time wp_enqueue_scripts happens.
  wp_enqueue_script('my-javascript', get_stylesheet_directory_uri() . '/index.js', array(), null, true);
  wp_enqueue_style('my-stylesheet', get_stylesheet_directory_uri() . '/style.css', array(), null);
});
```
For the sake of completeness, you can also do this...
```php
function my_callback_function() {
  wp_enqueue_script('my-javascript', get_stylesheet_directory_uri() . '/index.js', array(), null, true);
  wp_enqueue_style('my-stylesheet', get_stylesheet_directory_uri() . '/style.css', array(), null);
}
// the add_action function is how you access/modify the WordPress hooks.
add_action('wp_enqueue_scripts', 'my_callback_function');
```
## Conclusion
There are so many other things you can do with WordPress hooks including writing your own. For now, it's enough to know that
- WordPress action hooks occur in sequence
- You can use this sequence to run your own functions by way of callbacks.

I'll do a separate post on WordPress filters another time.


