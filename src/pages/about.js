import React from 'react';
import Link from 'gatsby-link';

import { BlogPostContent, BlogPostContainer } from '../utils/styles';

const About = () => 
  <BlogPostContainer>
    <BlogPostContent>
      <h2>I'm Adam. Nice to meet you!</h2>
      <p>I'm a web developer based in West Hartford Connecticut. Believe it or not, web development is my second career. Before that, I was a professional musician (performer/educator) for over 10 years. Now, I work full-time for UConn's office of University Communications and I'm loving every minute of it! Every day I get to work on with an amazing (and small) team (2 other devs, 2 designers,and a project manager). Together we work on sites that get seen and used by thousands of people every day.</p>
      <p>My goal for this site is pretty simple. Because I'm self taught now that I've been working in this field for a year, I wanted to:</p>
      <ul>
        <li>share what I've learned so far</li>
        <li>keep a record of things I've found interesting and/or challenging</li>
        <li>take part in the conversation other developers are having.</li>
      </ul>
      <p>Because we're such a small team, I've had the good fortune to work on a lot of different kinds of projects. So, what you'll find on this site is going to be a combination of lots of different things!</p>
      <ul>
        <li>tips and tricks</li>
        <li>tutorials</li>
        <li>problems I've solved for the different technologies I work with like:</li>
          <ul>
            <li>web accessibility (aka a11y)</li>
            <li>command line tools and techniques</li>
            <li>Docker</li>
            <li>HTML/CSS/SCSS</li>
            <li>Javascript (e.g. es6, gulp, webpack, react, "vanilla", jquery, etc...</li>
            <li>WordPress and PHP in general</li>
          </ul>
        <li>programming concepts I've learned</li>
        <li>and a lot more!</li>
      </ul>
      <p>Here are some more lists</p>
      <p>Things I want to learn/learn more about:</p>
      <ul>
        <li>a11y</li>
        <li>kubernetes</li>
        <li>vue</li>
        <li>the web audio API</li>
      </ul>
      <p>I'd love to chat, share, and learn more about web development, programming, and music. Feel free to reach out by</p>
      <ul>
        <li><a href="mailto:adam@adamjberkowitz.com">email</a></li>
        <li><a href="https://twitter.com/adamjberkowitz">twitter</a></li>
        <li><a href="https://github.com/aberkow">github</a></li>
      </ul>
      <h2>Resume</h2>
      <h2>A few more things</h2>
    </BlogPostContent>
  </BlogPostContainer>
  

export default About;