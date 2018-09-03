import React, { Fragment } from 'react';
import MenuItem from './MenuItem';

const Navigation = () => (
  <Fragment>
    <nav id="main-nav">
      <ul className="menu-list">
        <MenuItem route="/" icon="home" text="Home" />
        <MenuItem route="/about" icon="user" text="About" />
        <MenuItem route="/contact" icon="at" text="Contact" />
      </ul>
    </nav>
  </Fragment>
)

export default Navigation