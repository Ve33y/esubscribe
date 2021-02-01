import React, { useState, useRef, useEffect } from 'react';

export const Broadcast = () => {
  const [values, setValues] = useState({ topic: '', message: '' });
  const [sentMessage, setSentMessage] = useState([{ topic: '', message: '' }]);

  const setVal = name => {
    return ({ target: { value } }) => setValues(oldValues => ({ ...oldValues, [name]: value}))
  }

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await sendSavePopulate();   
      setValues({topic: '', message: ''});
    } catch (e) {
      setSentMessage([...sentMessage, {topic: '', message: ''}]);
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
    setSentMessage([...sentMessage, values]);
    if (res.status !== 200) throw new Error(`Request failed: ${res.status}`);
  }

  const messagesRef = useRef(null)

  const scrollToBottom = () => {
    if(messagesRef.current){
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [sentMessage]);

  return (
    <div>
    <div className='broadcast-container'>
        <div className='broadcast-sidebar'>
          <form id='broadcast-form' className='broadcast-form'>
            <h1>Send a message</h1>
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
              autoComplete='off'
            />
            <br />
            <button className='form-field-btn' type='submit' onClick={handleSend}>Send</button>
          </form>
        </div>
        <div className='sent-messages'>
          <h1>Broadcast History</h1> 
          <div className='message-container'>
            {sentMessage.map((msg, i) => {
              if(msg.topic && msg.message){
                return (
                  <div className='singleMsg' key={`${msg.topic}${i}`}>                
                      <ul>Topic: {msg.topic}</ul>
                      <ul>Message: {msg.message}</ul>
                      <div ref={messagesRef}></div>
                  </div>
                  )
              }})
            }
          </div>
        </div>
    </div>
  </div>
  )
}