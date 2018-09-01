import React, { Component } from 'react';
import Link from 'gatsby-link';

const ListLink = (props) => 
  <li>
    <h1>
      <Link to={props.to}>{props.children}</Link>
    </h1>
  </li>

const MenuContainer = (props) => 
  <div
    style={{display: props.menuDisplay }}
    className="menu-wrapper">
    <ul onClick={props.onClick}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about">About</ListLink>
      <ListLink to="/contact">Contact</ListLink>
    </ul>
  </div>

export default MenuContainer;


