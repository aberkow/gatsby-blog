import Link from 'gatsby-link';
import React, { Component } from 'react';
import Menu from './menu';
import { HeaderTitle, HeaderWrapper } from '../../utils/styles';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      menuDisplay: 'none'
    }
    this.menuHandler = this.menuHandler.bind(this);
  }
  menuHandler(evt) {
    console.log(evt.target);
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
      menuDisplay: !prevState.isMenuOpen ? 'block' : 'none'
    }))
  }
  render() {
    return (
      <HeaderWrapper className='header-wrapper'>
        <HeaderTitle>
          <Link
            to="/"
          >
            Adam J Berkowitz
          </Link>
        </HeaderTitle>
        <Menu 
          isMenuOpen={this.state.isMenuOpen} 
          menuDisplay={this.state.menuDisplay} 
          onClick={this.menuHandler} />
        
      </HeaderWrapper>
    );
  }
}