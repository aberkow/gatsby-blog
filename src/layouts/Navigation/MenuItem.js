import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ route, icon, text }) => (
  <Fragment>
    <li className="menu-list_item">
      <Link to={route} className="menu-list_link">
        <FontAwesomeIcon icon={icon} className="menu-list_icon" />
        <span className="menu-list_text">{text}</span>
      </Link>
    </li>
  </Fragment>
)

export default MenuItem;