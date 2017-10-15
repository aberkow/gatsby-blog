import React, { Component } from 'react';
import { MenuToggleText } from '../../utils/styles';

export default class MenuToggle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='menu-wrapper'>
        <MenuToggleText onClick={this.props.onClick} id='menu-label'>
    
          {this.props.isMenuOpen ? 'CLOSE' : 'MENU'}
        </MenuToggleText>
      </div>
    )
  }
}