import React, { Component } from 'react';
import MenuWrapper from '../../utils/styles';

const MenuContainer = (props) =>
  <MenuWrapper isMenuOpen={this.props.isMenuOpen}
    className="menu-wrapper">
    <p>test</p>
  </MenuWrapper>

export default MenuContainer


// export default class MenuContainer extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <MenuWrapper isMenuOpen={this.props.isMenuOpen}
//           className="menu-wrapper">
//           hello
//         </MenuWrapper>
//       </div>
//     )
//   }
// }