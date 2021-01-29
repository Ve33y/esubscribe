import React, { useState } from 'react';

export const Subscribe = () => {
  const [values, setValues] = useState({ subscriber: '', topic: '' });

  const setVal = name => {
    return ({ target: { value } }) => {
      if(!value.split('').includes(' ')){
        let valueToSet = value.toLowerCase();
        setValues(oldValues => ({ ...oldValues, [name]: valueToSet}))
      } else {
        alert(`You cannot include empty spaces`)
      }
    }
  }

  const saveFormData = async () => {
      const res = await fetch('/api/subscribe', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );
      if (res.status !== 200) throw new Error(`Request failed: ${res.status}`); 
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveFormData();
      alert('Your registration was successfully submitted!');
        setValues({subscriber: '', topic: ''});
    } catch (e) {
      alert(`Subscription failed! ${e.message}`);
    }
  }

  return (
    <div className='subscribe-container'>
      <form className='subscribe-form'>
        <input 
          id='email' 
          className='form-field' 
          type='email' 
          placeholder='e-mail' 
          value={values.subscriber} 
          onChange={setVal('subscriber')} 
          required />
        <input 
          id='topic' 
          className='form-field' 
          type='text' 
          placeholder='topic' 
          value={values.topic} 
          onChange={setVal('topic')} 
          required />
        <br />
        <button className='form-field-btn' type='submit' onClick={handleSubmit}>subscribe</button>
      </form>
    </div>
  )
}