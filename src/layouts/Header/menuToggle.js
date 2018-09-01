import React, { Component } from 'react';

export default class MenuToggle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='menu-wrapper'>
        <span onClick={this.props.onClick} id='menu-label'>
    
          {this.props.isMenuOpen ? 'CLOSE' : 'MENU'}
        </span>
      </div>
    )
  }
}