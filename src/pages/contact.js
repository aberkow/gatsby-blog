import React, { Component } from 'react';
import Link from 'gatsby-link';

import { BlogPostBuffer, BlogPostContainer } from '../utils/styles';

export default class Contact extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <h1>Let's talk!</h1>
          <form name="contact-form" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="from-name" value="contact-form" />
            <p>
              <label>Your Name: <input type="text" name="name" /></label>
            </p>
            <p>
              <label>Your Email: <input type="email" name="email" /></label>
            </p>
            <p>
              <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
