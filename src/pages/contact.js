import React from 'react';

const Contact = () =>
  <div>
    <div>
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
        <div>
          <label>Name:</label>
          <input 
          name="name" 
          placeholder="Sam Smith"
          required 
          size="40"
          type="text"/>
        </div>
        <div>
          <label>Email:<input
            name="email"
            placeholder="sam@example.com" 
            type="email"/>
          </label>
        </div>
        <div>
          <label>
            Message:
            <textarea 
              cols="50" 
              rows="10" 
              name="message"
              placeholder="Your message"></textarea>
          </label>
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  </div>

export default Contact;