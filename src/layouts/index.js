import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faAt, faUser } from '@fortawesome/free-solid-svg-icons';

import Header from '../layouts/Header/header';
import Navigation from '../layouts/Navigation/Navigation';

import '../sass/styles.scss'
require('prismjs/themes/prism-okaidia.css');

library.add(faHome, faAt, faUser);

const TemplateWrapper = ({ children }) =>
  <div className='site-wrapper'>
    <Helmet
      title="Adam J Berkowitz"
      meta={
        [
        { name: 'description', content: 'Web development blog and personal site for Adam Berkowitz' },
        { name: 'keywords', content: 'web development, blog, javascript, php, wordpress, tutorials, html, css, docker' },
      ]
    }
    />
    {/* <style type="text/css">
      {`  
          body {
            background-color: #fafafa;
          }
          body a {
            text-decoration-skip: ink;
            transition: all 0.4s ease-out;
            color: cornflowerblue;
          }
          
          body a:hover,
          body a:active,
          body a:visited:hover {
            color: orangered;
          }
          body a:visited {
            color: cornflowerblue;
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
    </style> */}
    <Header />
    <Navigation />
    <main className="content-wrapper">
      {children()}
    </main>
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
