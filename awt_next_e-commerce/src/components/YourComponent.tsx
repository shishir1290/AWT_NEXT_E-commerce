// YourComponent.tsx

import { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    try {
      await axios.post('/api/sendEmail', { to: email, subject, text: message });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      {/* Your form inputs */}
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default YourComponent;
