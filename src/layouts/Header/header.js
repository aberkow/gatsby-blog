import Link from 'gatsby-link';
import React, { Component } from 'react';
import Menu from './menu';

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
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
      menuDisplay: !prevState.isMenuOpen ? 'block' : 'none'
    }))
  }
  render() {
    return (
      <div className='header-wrapper'>
        <span>
          <Link
            to="/"
          >
            Adam J Berkowitz
          </Link>
        </span>
        <Menu 
          isMenuOpen={this.state.isMenuOpen} 
          menuDisplay={this.state.menuDisplay} 
          onClick={this.menuHandler} />
        
      </div>
    );
  }
}