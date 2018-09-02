import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ route, icon, text }) => (
  <Fragment>
    <li>
      <Link to={route}><FontAwesomeIcon icon={icon} />{text}</Link>
    </li>
  </Fragment>
)

export default MenuItem;