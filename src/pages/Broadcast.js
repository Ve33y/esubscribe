import React, { useState } from 'react';

export const Broadcast = () => {
  const [values, setValues] = useState({ topic: '', message: '' });
  const [sentMessage, setSentMessage] = useState({ topic: '', message: '' });

  const setVal = name => {
    return ({ target: { value } }) => setValues(oldValues => ({ ...oldValues, [name]: value}))
  }

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await sendSavePopulate();
      setSentMessage(values);
      setValues({topic: '', message: ''});
    } catch (e) {
      alert(`Message send failed! ${e.message}`);
    }
  }
  
  const sendSavePopulate = async () => {
    const res = await fetch('/api/broadcast', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );
    if (res.status !== 200) throw new Error(`Request failed: ${res.status}`); 
  }

  return (
    <div>
    <h1>Send a message</h1>
    <div className='broadcast-container'>
        <div className='broadcast-sidebar'>
          <form id='broadcast-form' className='broadcast-form'>
            <input
              id='topic'
              type='text'
              className='form-field'
              placeholder='topic'
              value={values.topic} 
              onChange={setVal('topic')} 
              required
            />
            <br />
            <textarea
              id='message'
              type='text'
              className='tetxarea-msg'
              placeholder='Enter Message'
              value={values.message} 
              onChange={setVal('message')} 
              required
              autocomplete='off'
            />
            <br />
            <button className='form-field-btn' type='submit' onClick={handleSend}>Send</button>
          </form>
        </div>
        <div class='sent-messages'>
          <ul>{sentMessage.topic}</ul>
          <ul>{sentMessage.message}</ul>
        </div>
    </div>
  </div>
  )
}