import React, { Component } from 'react';

export default class MenuToggle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='menu-wrapper'>
        <h2 onClick={this.props.onClick} id='menu-label'>
    
          {this.props.isMenuOpen ? 'CLOSE' : 'MENU'}
        </h2>
      </div>
    )
  }
}