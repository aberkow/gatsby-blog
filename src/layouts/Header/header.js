import Link from 'gatsby-link';
import React, { Component } from 'react';

import { HeaderWrapper } from '../../utils/styles';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
    this.menuHandler = this.menuHandler.bind(this);
  }
  menuHandler(evt) {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }))
  }
  render() {
    return (
      <HeaderWrapper className='header-wrapper'>
        <h1>
          <Link
            to="/"
          >
            Adam J Berkowitz
          </Link>
        </h1>
        <div id='menu-wrapper'>
          <h2 id='menu-label'
          onClick={this.menuHandler}>{this.state.isMenuOpen ? 'CLOSE' : 'MENU'}</h2>
        </div>
      </HeaderWrapper>
    );
  }
}