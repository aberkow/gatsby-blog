---
path: "/wordpress-html-sitemap-plugin-1"
date: "2018-01-04"
title: "Building a Wordpress HTML Sitemap Plugin (pt. 1)"
image: ./assets/featured-image.jpg
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

## The Functions
We need three functions to make this plugin work correctly. 

- A function to generate a list of pages and the markup.
- A shortcode handler
- A way to enqueue the styles for the plugin

### Function 1 - Page List Generator
Even though this is a fairly simple function, it's more complicated than the others. In the end, we want it to return all the markup necessary for the list. Let's sketch out the function like this.
```php
function page_list_generator() {

  $page_list = "<ul id='sitemap-list'>$pages</ul>";
  return $page_list;
}
```
Here we can see that by the end the function will create an unordered list with some `$pages` and then return the complete list. Next, we need a way to create the pages.

Wordpress has two ways (at least) to generate the list of pages we need. One way is with the `wp_list_pages()` function. However I've found that this function does some strange things to the markup. So we'll take a different approach using a combination of `get_pages()` and the `Walker_Page` class.

Getting a list of the pages with `get_pages()` is easy. All we have to do is pass in an array as an argument and it will return the pages we request. 
```php
function page_list_generator() {
  $current_page = (string)get_the_ID();
  $args = array(
    'exclude' => $current_page, // there's no point in listing the page the list is actually on...
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
Our function now does the following

- Gets a list of all published pages (except the page the shortcode is on).
- Walks over all the pages in the list
- Adds those pages as `<li>` elements with links to the pages

We're not quite done yet though. Supposing we have a very large list of pages we might not want to recreate the entire list everytime someone visits the page. To prevent this, we can use the [Wordpress transient API](https://codex.wordpress.org/Transients_API).

>[The Wordpress Transient API] offers a simple and standardized way of storing cached data in the database temporarily by giving it a custom name and a timeframe after which it will expire and be deleted.

To use this API effectively, we'll need to do two things
- Create a unique name to store the data in the database
- Check if the data is stored already.
  - If it is, retrieve the data
  - If not, set the data

We can create a unique name by making a hash of the date like this `$transient = "site_map_" . md5(date('c'));` Then we can use `get_transient()` to perform a check on the database. If it resolves to `true` we'll get the results. If it's `false` we'll use `set_transient()`. 

```php
function page_list_generator() {
	$transient = "site_map_" . md5(date('c'));
	$current_page = (string)get_the_ID();
	$args = array(
		'exclude' => $current_page,
		'post_type' => 'page',
		'post_status' => 'publish'
	);
	$list = get_pages($args);
	
	$walker_page = new Walker_Page();
	
	if (get_transient($transient)) {
		$pages = get_transient($transient);
	} else {
		$pages = $walker_page->walk($list, 0);
		set_transient($transient, $pages, DAY_IN_SECONDS);
	}

	$page_list = "<ul class='sitemap-list' aria-label='sitemap list'>$pages</ul>";
	return $page_list;
}
```
So much for the first function!
### Function 2 - The Shortcode Handler
This function is fairly straightforward. It will be used as the callback function inside the Wordpress `add_shortcode()` function. Further it will `echo` the results from our first function.

One important thing to remember when using shortcodes is to make sure to add output buffering inside the callback. If you don't, the shortcode markup can be placed at the wrong point in the page markup. This is especially a problem when using page builders.
```php
function sitemap_shortcode_handler() {
  ob_start();
	echo page_list_generator();
	return ob_get_clean();
}
add_shortcode('sitemap', 'sitemap_shortcode_handler');
```
