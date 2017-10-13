import React, { Component } from 'react';

import MenuContainer from './menuContainer';
import MenuToggle from './menuToggle';
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
        <MenuContainer
          menuDisplay={this.props.menuDisplay} />
      </div>
    )
  }
}