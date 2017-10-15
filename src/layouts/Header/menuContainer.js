import React, { Component } from 'react';
import Link from 'gatsby-link';

import { MenuWrapper, MenuList } from '../../utils/styles';

const ListLink = (props) => 
  <li>
    <h1>
      <Link to={props.to}>{props.children}</Link>
    </h1>
  </li>

const MenuContainer = (props) => 
  <MenuWrapper
    style={{display: props.menuDisplay }}
    className="menu-wrapper">
    <MenuList onClick={props.onClick}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about">About</ListLink>
      <ListLink to="/contact">Contact</ListLink>
    </MenuList>
  </MenuWrapper>

export default MenuContainer;


