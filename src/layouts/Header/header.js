import Link from 'gatsby-link';
import React, { Component } from 'react';

import { HeaderWrapper } from '../../utils/styles';

// this needs some debugging to get the state right....


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      menuLabelText: 'MENU'
    }
    this.menuHandler = this.menuHandler.bind(this);
  }
  menuHandler(evt) {
    const menuLabel = document.getElementById('menu-label');
    let menuLabelText = ''
    if (this.state.isMenuOpen) {
      menuLabelText = 'CLOSE';
    } else {
      menuLabelText = 'MENU';
    }
    this.setState((prevState, props) => {
      console.log(prevState, props, 'from this.setState');
      return {
        isMenuOpen: !this.state.isMenuOpen,
        menuLabelText

      }

    });
    console.log(this.state.isMenuOpen, this.state.menuLabelText, 'state from menuHandler');
  }
  render() {
    console.table(this.state);
    return (
      <HeaderWrapper className='header-wrapper'>
        <Link
          to="/"
        >
          Adam J Berkowitz
        </Link>
        <div id='menu-wrapper'>
          <h2 id='menu-label'
          onClick={this.menuHandler}>{this.state.menuLabelText}</h2>
        </div>
      </HeaderWrapper>
    );
  }
}