import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../layouts/Header/header';

import { ContentWrapper, HeaderWrapper, TitleStyle, SubTitleStyle } from '../utils/styles';

require('prismjs/themes/prism-okaidia.css');

const TemplateWrapper = ({ children }) =>
  <div>
    <Helmet
      title="Adam J Berkowitz"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <style type="text/css">
      {`
          body a {
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: all 0.4s ease-out;
            color: blue;
          }
          body a:hover {
            border-bottom: 2px solid;
            transition: all 0.4s ease-out;
            color: green;
          }
          body a:visited {
            color: red;
          }
          pre[class*="language-"] {
            border-radius: 0;
          }
      `}
    </style>
    <Header />
    <ContentWrapper className="content-wrapper">
      {children()}
    </ContentWrapper>
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
