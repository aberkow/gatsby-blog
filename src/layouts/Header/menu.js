import React, { Component } from 'react';

import MenuContainer from './menuContainer';
import MenuToggle from './menuToggle';
console.log(MenuContainer, 'MenuContainer');
export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <MenuToggle 
          onClick={this.props.onClick} 
          isMenuOpen={this.props.isMenuOpen} />
        {/* This doesn't work...
        <MenuContainer 
          isMenuOpen={this.props.isMenuOpen} /> */}
      </div>
    )
  }
}