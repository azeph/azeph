import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

import CompleteMessage from '../../components/completeMessage';
import { supabase, channel } from '../../data/supabase';

const General = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleNewMessage = (payload) => {
    const newMessage = {
      username: payload.payload.name,
      time: payload.payload.time,
      avatar: payload.payload.pfp,
      role: 'User',
      message: payload.payload.message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  channel.on('broadcast', { event: 'supa' }, (payload) => {
    handleNewMessage(payload);
  });

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('time');

      if (error) {
        // console.error('Error fetching messages:', error);
      } else {
        setMessages(
          data.map((message) => ({
            username: message.name,
            time: message.time,
            avatar: message.pfp,
            role: 'User',
            message: message.message,
          }))
        );
      }
    } catch (error) {
      // console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    scrollToBottom();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box width="100%" height="90vh" backgroundColor="#313338" overflow="auto">
      <CompleteMessage messages={messages} />
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default General;
