import React from 'react';
import Link from 'gatsby-link';

import { BlogPostContent, BlogPostContainer, FormButton, FormInputContainer, FormInput, FormTextArea } from '../utils/styles';

const Contact = () =>
  <BlogPostContainer>
    <BlogPostContent>
      <h2>Hi Friend!</h2>
      <p>
        Please feel free to be in touch.
      </p>
      <form 
        name="contact" 
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field">
        <div style={{ visibility: `hidden`, height: 0 }}>
          <input name="bot-field" />
        </div>
        <FormInputContainer>
          <label>Name:</label>
          <FormInput 
          name="name" 
          placeholder="Sam Smith"
          required 
          size="40"
          type="text"/>
        </FormInputContainer>
        <FormInputContainer>
          <label>Email:<FormInput
            name="email"
            placeholder="sam@example.com" 
            type="email"/>
          </label>
        </FormInputContainer>
        <FormInputContainer>
          <label>
            Message:
            <FormTextArea 
              cols="50" 
              rows="10" 
              name="message"
              placeholder="Your message"></FormTextArea>
          </label>
        </FormInputContainer>
        <FormInputContainer>
          <FormButton type="submit">Send</FormButton>
        </FormInputContainer>
      </form>
    </BlogPostContent>
  </BlogPostContainer>

export default Contact;