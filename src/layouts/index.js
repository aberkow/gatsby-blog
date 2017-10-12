import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { Home } from '../utils/styles';

import { HeaderWrapper, TitleStyle, SubTitleStyle } from '../utils/styles';

require('prismjs/themes/prism-okaidia.css');

const Header = () =>
  
    <HeaderWrapper className='header-wrapper'>
      <TitleStyle>
        <Link
          to="/"
        >
          Adam J Berkowitz
        </Link>
      </TitleStyle>
      <SubTitleStyle>Web Developer</SubTitleStyle>
    </HeaderWrapper>

const TemplateWrapper = ({ children }) =>
  <div>
    <Helmet
      title="Adam J Berkowitz"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <Home className="test">
      {children()}
    </Home>
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
