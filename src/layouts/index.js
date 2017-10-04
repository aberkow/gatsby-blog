import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { NavWrapper } from '../utils/styles';

require('prismjs/themes/prism-okaidia.css');

const ListLink = props =>
  <li style={{ display: "inline-block" }}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>

const Header = () =>
  <NavWrapper>
    <div>
      <h1>
        <Link
          to="/"
        >
          Adam J Berkowitz
        </Link>
      </h1>
      <h2>Web Developer</h2>
      <ul style={{ listStyleType: 'none' }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
        </ul>
    </div>
  </NavWrapper>

const TemplateWrapper = ({ children }) =>
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <div
    >
      {children()}
    </div>
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
