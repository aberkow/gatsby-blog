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
          body {
            background-color: #fafafa;
          }
          body a {
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: all 0.4s ease-out;
            color: cornflowerblue;
          }
          
          body a:hover,
          body a:active,
          body a:visited:hover {
            border-bottom: 2px solid;
            transition: all 0.4s ease-out;
            color: orangered;
          }
          body a:visited {
            color: cadetblue;
          }

          code {
            background-color: #272822;
            color: #f8f8f2;
            padding: 2px;
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
