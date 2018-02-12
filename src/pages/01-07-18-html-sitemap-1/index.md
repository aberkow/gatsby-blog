---
path: "/wordpress-html-sitemap-plugin-1"
date: "2018-01-04"
title: "Building a Wordpress HTML Sitemap Plugin"
image: ../../images/maps.jpg
alt: "Many antique maps in a pile"
tags:
  - wordpress
  - plugins
  - projects
author: "Adam"
category: "wordpress"
---

This is going to be a two part post on building an HTML sitemap plugin for Wordpress. If you know about building Wordpress plugins and themes, you might be wondering why I'd build a plugin for this instead of including it in the theme directly. Well, at work I needed a portable way to create a sitemap on multiple sites in multiple environments using multiple themes. So there you go!

## The Goal
The goal for the plugin is that once installed and activated a sitemap will be automatically generated when you add the shortcode `[sitemap]` to a page. 

## The Files.
Really just two files are needed for this - `sitemap_plugin.php` where the functions will go and `style.css`.

## The Functions
We need three functions to make this plugin work correctly. 

- A function to generate a list of pages and the markup.
- A shortcode handler
- A way to enqueue the styles for the plugin

### Function 1 - Page List Generator
This function needs to return all the markup necessary for the list. Sometimes I like to work backwards, so this is a sketch of what should happen by the end.
```php
function page_list_generator() {
  // generate a list of pages here...
  $page_list = "<ul id='sitemap-list'>$pages</ul>";
  return $page_list;
}
```
Here we can see that by the end the function will create an unordered list with some `$pages` and then return the complete list. Next, we need a way to create the pages.

Wordpress has two ways (at least) to generate the list of pages we need. One way is with the [`wp_list_pages()`](https://developer.wordpress.org/reference/functions/wp_list_pages/) function and the other is by using the [`Walker_Page()`](https://codex.wordpress.org/Class_Reference/Walker_Page) class. I'll show both, but I like the `wp_list_pages()` method a little better. 

By the end, both functions will basically do the same things:

- Get a list of all published pages (except the page the shortcode is on).
- Walk over all the pages in the list
- Add those pages as `<li>` elements with links to the pages

#### wp_list_pages method
This way of generating the list is really nice. `wp_list_pages()` takes an array of arguments. The only thing that I needed to remember to do was to set the `'echo'` key to `false` and the `title_li` to an empty string. Why? Because otherwise, the function generates and displays its own markup in a slightly weird way. Let me show you! This is (sort of) what the markup looks like.
```html
<li>The Title</li>
  <ul>
  <!-- A list of pages in <li>'s-->
  </ul>
```
So I wrote the function like this...
```php
function page_list_generator() {
  $current_page = (string)get_the_ID();
  $args = array(
    'echo' => false,
    'exclude' => $current_page, // there's no point in listing the page the list is actually on...
    'post_type' => 'page',
    'post_status' => 'publish',
    'title_li' => ''
  );
  $pages = wp_list_pages($args);
  $page_list = "<ul id='sitemap-list'>$pages</ul>";
  return $page_list;
}
```
This way, the function generates the markup the way _I_ want.
#### Walker_Page method
So we'll take a different approach now using a combination of `get_pages()` and the `Walker_Page` class.

To do it, first get a list of the pages with the built in function WordPress function `get_pages()`. All we have to do is pass an array as an arguments again and it will return the pages we request. This time though it won't try to display them like `wp_list_pages()` does.

Then, the `Walker_Page` class has a method called `walk()` (shocking I know). It takes two arguments, the list of pages to walk over and a depth (how far into the tree of pages to go). From there the rest of the function is the same. 
```php
function page_list_generator() {
  $current_page = (string)get_the_ID();
  $args = array(
    'exclude' => $current_page,
    'post_type' => 'page',
    'post_status' => 'publish'
  );
  $list = get_pages($args);

  $walker_page = new Walker_Page();
  $pages = $walker_page->walk($list, 0);
  $page_list = "<ul id='sitemap-list'>$pages</ul>";
  return $page_list;
}
``` 
#### Transient Caching
We're not quite done yet though. Suppose we have a very large list of pages we might not want to recreate the entire list everytime someone visits the page. To prevent this, we can use the [Wordpress transient API](https://codex.wordpress.org/Transients_API).

>[The Wordpress Transient API] offers a simple and standardized way of storing cached data in the database temporarily by giving it a custom name and a timeframe after which it will expire and be deleted.

There are basically three functions in this API [`get_transient()`](https://codex.wordpress.org/Function_Reference/get_transient), [`set_transient()`](https://codex.wordpress.org/Function_Reference/set_transient), and [`delete_transient()`](https://codex.wordpress.org/Function_Reference/delete_transient). 

To use this API effectively, we'll need to do two things
- Create a unique name to store the data in the database
- Check if the data is stored already.
  - If it is, check if the list of pages has changed and either keep the cache or bust the cache and store a new list.
  - If not, set the data

This gets a bit tricky and honestly it took me a while to figure out a way to do this that wasn't completely ridiculous.

To use transient caching, the first thing to do is create a unique name as a key to store in the [`wp_options`](https://codex.wordpress.org/Database_Description#Table:_wp_options) part of the database. [The PHP `md5()` function](http://php.net/manual/en/function.md5.php) is nice for this since it will create a hash of any string.

```php
function page_list_generator() {
  $transient = "site_map_" . md5("page_list");
  // the rest of the code...
}
```
Now the next thing I want to do is check to see if the transient already exists in the database. If it is, great. If it isn't that's ok. Make a new transient.
```php
function page_list_generator() {
  $transient = "site_map_" . md5("page_list");
  // create the list of pages as above...
  if (get_transient($transient)) {
    // hmmmm this isn't quite going to work.
    $pages = get_transient($pages);
  } else {
    set_transient($transient, $pages, DAY_IN_SECONDS);
	  $page_list = "<ul class='sitemap-list' aria-label='sitemap list'>$pages</ul>";
  }
  return $page_list.
}
```
This kind of works. But it has one problem still. What happens if the list of pages changes while the transient cache still exists? We have no way of busting it and creating a new cache. Right now the transient lasts a maximum of a day. But what if the max was a week? Here's the way I handled that problem and the complete function.

```php
function page_list_generator() {
	$transient = "site_map_" . md5('page_list');
	$current_page = (string)get_the_ID();
  $args = array(
    'echo' => false,
    'exclude' => $current_page,
    'post_type' => 'page',
    'post_status' => 'publish',
    'title_li' => ''
  );
  $pages = wp_list_pages($args);
  	
	if (get_transient($transient)) {
    $transient_pages = get_transient($transient);
    // is the transient the same as the list of pages that was just generated?
    if ($pages == $transient_pages) {
      // Yep! We're good!
      $pages = $transient_pages;
    } else {
      // Nope... Bust the transient and create a new one.
      delete_transient($transient);
      set_transient($transient, $pages, DAY_IN_SECONDS);
    }
	} else { 
		set_transient($transient, $pages, DAY_IN_SECONDS);
	}
  $page_list = "<ul class='sitemap-list' aria-label='sitemap list'>$pages</ul>";
	return $page_list;
}
```
Phew! So much for the first function!
### Function 2 - The Shortcode Handler
This function is really straightforward compared to the last one. It will be used as the callback function inside the Wordpress [`add_shortcode()` function](https://codex.wordpress.org/Function_Reference/add_shortcode). All it has to do is `echo` the results from the first function.

One important thing to remember when using shortcodes is to [make sure to add output buffering](http://php.net/manual/en/book.outcontrol.php) inside the callback. If you don't, the shortcode markup will show up at the wrong point in the page markup. This is especially a problem when using page builders.
```php
function sitemap_shortcode_handler() {
  ob_start();
	echo page_list_generator();
	return ob_get_clean();
}
add_shortcode('sitemap', 'sitemap_shortcode_handler');
```
### Function 3 - Enqueueing the Stylesheet.
This plugin comes with a very small stylesheet. Really it's just enough to override the browser defaults for lists. The rest of the styles (links, colors, etc...) are left up to the theme. That way I could add the plugin to lots of themes without worrying too much. Here's the function. One thing to be careful of in Wordpress development is that you can accidentally add a lot of stylesheets and script calls to the DOM without meaning to. In this case I wanted to make sure that the stylesheet was added _only_ if the shortcode was present on the page. Fortunately, [Wordpress has the `has_shortcode()` function](https://codex.wordpress.org/Function_Reference/has_shortcode) that can check exactly that.
```php
function sitemap_styles() {
	if (has_shortcode($post->post_content, 'sitemap')) {
		wp_enqueue_style('sitemap-list-style', plugin_dir_url(__FILE__) . 'style.css');
	}
}	
add_action('wp_enqueue_scripts', 'sitemap_styles');
```
For reference, here are the AMAZING STYLES!
```css
#sitemap-list,
#sitemap-list ul {
  list-style-type: none;
  padding: 0;
}

#sitemap-list li {
  margin: 1rem 0;
}

#sitemap-list li ul > li {
  margin-left: 30px;
}
```
I hope this post helps people looking to learn more about Wordpress plugin development!