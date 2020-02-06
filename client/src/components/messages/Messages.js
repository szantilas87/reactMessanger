import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';
import Preloader from '../layout/Preloader';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/messages');
    const data = await res.json();

    setMessages(data);
    setLoading(false);
  };

  if (loading) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'> System Logs </h4>{' '}
      </li>{' '}
      {!loading && messages.length === 0 ? (
        <p className='center'> No messages to show... </p>
      ) : (
        messages.map(message => (
          <MessageItem message={message} key={message._id} />
        ))
      )}{' '}
    </ul>
  );
};

export default Messages;
