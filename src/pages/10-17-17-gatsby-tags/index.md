---
path: "/tags-and-categories-in-gatsby-js"
date: "2017-10-17"
title: "Using Tags and Categories in Gatsby.js"
image: ../../images/graphql-code.jpg
alt: "Screenshot of a graphql query from this blog"
tags:
  - javscript
  - functional programming
  - gatsby.js
  - array methods
  - string methods
  - graphql
  - React
author: "Adam"
category: "javascript"
---

I started this site by following the great [tutorials](https://www.gatsbyjs.org/tutorial/) and [documentation](https://www.gatsbyjs.org/docs/) on the Gatsby JS site a while ago. But, one of the things I wanted for a blog was the ability to add tags and categories (after this I'll call them "taxonomies" a la Wordpress) to my posts. They're a tried and true way of creating some organization for visitors. I had tried reading the code in the example sites, but to be honest, it didn't make a lot of sense to me, so I decided to come up with my own way of doing things which I'd like to share. NB - I'm not going to cover a lot of the "basic" stuff about setting up a gatsby site. To start from scratch, consult their documentation/tutorials and/or watch [these great youtube videos from LevelupTuts](https://youtu.be/b2H7fWhQcdE).

Here's what I wanted in the end.
- Taxonomies should have archive pages located at `/{taxonomyName}`.
- Each post should have at least tags and categories
- On the archive pages each taxonomy should appear only once
- They should be in alphabetical order
- They should link to routes which list all the posts with that particular taxonomy (for example `/tags/{tagName}`)

Here's what we're going we're going to cover the first two points in this post and the other three in the next.

## Creating the pages
There are two main ways of creating pages using gatsby. 
- Add a js file to the `src/pages` directory. 
- Create a template that you import into the  `gatsby-node.js` file. By using the `createPage` function, data passed in will be used to create pages.

Let's look at the first method. The name of the file will become the name of the route at that page. In my case, I wanted an archive page, so I simply added a file called `tags.js`. This automatically creates a route at `/tags`. The markup is created simply by exporting a React component. An "about" page could be made just by doing...

```javascript
// src/pages/about-me.js
import React from 'react';
const AboutMe = () => 
  <div>
    <h1>About Me!</h1>
    <ul>
      // a list of things...
    </ul>
  </div>
export default AboutMe;
```
<br />
Easy!
The second approach was a little harder for me to figure out given my goal. The gatsby docs, give a great example of creating blog posts from a template, a graphql query, and the `gatsby-node.js file`. So it was easy enough to start with that as my example. Since each of my posts would have taxonomies, I could include them in the query which would be passed as a `result`. 

According to the tutorial I referenced, I could get all the data about the posts by doing `const posts = result.data.allMarkdownRemark.edges;`. Obviously this would include data about the taxonomies. I could then do something like this...
```javascript
const arrayReducer = require('./src/utils/helpers.js').arrayReducer;
// just under exports.createPages....
const { createPage } = boundActionCreators;
const tagTemplate = path.resolve(`src/templates/tag-template.js`);
---------
// after the query and error handling...

const tagsArray = arrayReducer(posts, 'tags');
// I'll explain arrayReducer later.
tagsArray.forEach((tag) => {
  createPage({ 
    path: `/tags/${tag}`,
    component: tagTemplate,
    context: {
      tag
    }
  });
});
```
<br />
The main thing to understand here is the `createPage()` function. It takes an object as an argument. Here, it has three properties: 
- path
- component
- context

The `path` lets us define the url the visitor will go to when clicking on a link from the `/tags` page or when tags are linked inside of posts for instance. So if we have an array of tags like `[gatsby, javascript, tutorials]`, by using `.forEach()` we end up with routes at 
- `/tags/gatsby`
- `/tags/javascript`
- `/tags/tutorials`

The `component` property tells `createPage` which file to use as the template. In this case, since taxonomy archive pages are different than blog posts in layout etc, we create the template by combining a React component with a graphql query.

The `context` lets you pass the value of the property as `props` to the template. This is really important and was the key to figuring out how to filter the results (more on that later).

Using the above as an example, I created a template similar to this...
```javascript
import React, { Component } from 'react';
import Link from 'gatsby-link';
import { postsWithDataFilter } from '../utils/helpers';
export default class TagRoute extends Component {
  render() {
    // tagToFind comes from the `context` property.
    const tagToFind = this.props.pathContext.tag;
    // here we get all the possible posts
    const posts = this.props.data.allMarkdownRemark.edges;
    // I'll explain this in a minute...
    const filteredPosts = postsWithDataFilter(posts, 'tags', tagToFind);
    // create the markup for each list item
    const postLinks = filteredPosts.map((post, index) => {
      const tagsArray = post.node.frontmatter.tags;
      return (
        <li className='tag-list-item' key={`item-${index}`}>
          <!-- link to each item -->
          <Link className='tag-list-link' 
            to={post.node.frontmatter.path} // this is the path to the individual post
            key={`link-${index}`}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      )
    })
    return (
      <div>
        <h2>{filteredPosts.length} {filteredPosts.length > 1 ? 'posts' : 'post' } with the tag: {tagToFind}</h2>
        <ul className="tag-list">
          {postLinks}
        </ul>
      </div>  
    );
  }
}
// our graphql query which contains only the data for each post we need.
export const query = graphql`
  query TagItems {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            path
            title
            tags
          }
        }
      }
    }
  }
`;
```
<br />
## Cleaning up the pages

Now, I promised that I would explain the `arrayReducer` and `postsWithDataFilter` functions. Without these two functions, this approach is broken in the following ways
- If you re-use taxonomy across posts, you'll end up with multiple instances of the same taxonomy in the archive page.
- The taxonomies will be organized by the order in which they appear in the posts.
- The page at a particular taxonomy route (`/tags/{tagName}`) will show _all_ the posts. Not just the ones with that tag.

So let me show you these two functions.
### arrayReducer
This function 
- creates an array of just the taxonomy we're looking for.
- flattens the result
- filters out multiple instances of the same taxonomy
- alphabetizes them
```javascript
// exported from helpers.js
arrayReducer: (postsArray, type) => {
    return postsArray = postsArray.map(( { node }) => { return node.frontmatter[type]; } )
    .reduce((a, b) => { return a.concat(b) }, [])
    .filter((type, index, array) => { return array.indexOf(type) === index})
    .sort();
  }
```
<br />
- First, the post data that we get in the query, is going to contain all the data about the post, not just the thing we're looking for. So, `.map()` will return the correct data for us and pass it to `.reduce()`. 
- At this point, the taxonomy we're looking for is an array of arrays. `[['one', 'two'], ['three, 'one'], ['four', 'two']]`. For our purposes, that's no good. 
- `.reduce()` flattens the array into `['one', 'two', 'three', 'one', 'four', 'two']`. 
- But, we still have multiples of the taxonomies, so we filter them giving us `['one', 'two', 'three', 'four']`. 
- They can then be alphabetized with `.sort()`. This gives us `['four', 'one', 'three', 'two']`. 

### postsWithDataFilter
```javascript
// exported from helpers.js
postsWithDataFilter: (postsArray, type, valueToFind) => {
    const newArray = postsArray.filter((post) => {
      const frontmatterType = post.node.frontmatter[type];
      if (frontmatterType.includes(valueToFind)) {
        return post;
      }
    });
    return newArray;
  }
```
<br />
Here, we need to
- take an array of posts
- filter it against a `type`
- and a `valueToFind`
- `return` the result of the filter
As I mentioned before, without the `context` property passed to `createPage`, we'd see all the posts at each taxonomy route. This function simply filters out any post that doesn't include the value we want and returns the remainder as an array from which we can create a list. 

## Conclusion
This all took me quite a while to figure out. First, I'd never really used graphql at all before this. Second, despite looking at code examples in the gatsby github repo, I couldn't always understand what was going on even after trying the same techniques. I certain there are ways to improve my approach. For one thing, I probably don't need separate templates for tags and categories. I could probably figure out a way to combine them. On the other hand, I'm learning a lot putting this project together which is never a bad thing! Until next time!