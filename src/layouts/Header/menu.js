import React, { Component } from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      menuText: 'MENU'
    }
  }
  render() {
    return (
      <div className="menu-wrapper">
        <h2>{this.state.menuText}</h2>
      </div>
    )
  }
}