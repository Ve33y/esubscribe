import React, { useState } from 'react';

export const Broadcast = () => {
  return (
    <div className='broadcast-container'>
        <h1>Send a message</h1>
        <div className='broadcast-sidebar'>
          <form id='broadcast-form' className='broadcast-form'>
            <input
              id='topic'
              type='text'
              className='form-field'
              placeholder='topic'
              required
            />
            <br />
            <textarea
              id='msg'
              type='text'
              className='tetxarea-msg'
              placeholder='Enter Message'
              required
              autocomplete='off'
            />
            <br />
            <button className='form-field-btn' type='submit'>Send</button>
          </form>
        </div>
        <div class='sent-messages'></div>
    </div>
  )
}