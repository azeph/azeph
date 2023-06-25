import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

let isMobile = false;
if (window.innerWidth < 600) {
  isMobile = true;
}

const UserMessage = ({ username, time, avatar, role, message, image }) => {

  const regex = /^(1[0-2]|0?[1-9]):[0-5][0-9]$/;
  const is12HourFormat = regex.test(time);

  let realTime = ""

  if (is12HourFormat) {
    realTime = "Today at " + time;
  } else {
    // the time is like 2023-06-25T14:14:43.509Z so we need to convert it to Today at 2:14 PM or Yesterday at 2:14 PM or 25/06/2023 at 2:14 PM
    const date = new Date(time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      realTime = "Today at " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    else if (date.toDateString() === yesterday.toDateString()) {
      realTime = "Yesterday at " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    else {
      realTime = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    }
  }


  const renderMessageContent = () => {
    const linkRegex = /<a\s+href=(['"])(.*?)\1>(.*?)<\/a>/g; // Regular expression to match <a href="...">...</a>
    const imageRegex = /<img\s+src=(['"])(.*?)\1\s*\/?>/g; // Regular expression to match <img src="..." ... />
    const iframeRegex = /<iframe.*?<\/iframe>/g; // Regular expression to match <iframe ...></iframe>
    const ping = /@everyone|@here/g;
    const parts = message.split('\n');

    return (
      <Typography
        sx={{
          color: 'white',
          fontSize: '0.9rem',
          wordWrap: 'break-word',
          maxWidth: isMobile ? '80vw' : '50vw',
          whiteSpace: 'pre-line',
          fontFamily: 'GG Sans, sans-serif',
        }}
      >
        {parts.map((part, index) => {
          if (part.match(linkRegex)) {
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html: part.replace(linkRegex, (match, _, href, content) => {
                    return `<a href="${href}" 
                            style="color: #40c4fb;
                            text-decoration: none;
                            font-weight: bold;
                            cursor: pointer;    
                        ">${content}</a>`;
                  }),
                }}
              />
            );
          } else if (part.match(imageRegex)) {
            const src = part.match(imageRegex)[0].match(/src=(['"])(.*?)\1/)[2];
            return <img key={index} src={src} alt="message" style={{ maxWidth: '25vw', maxHeight: 'auto', marginTop: '8px', borderRadius: '4px' }} />;
          } else if (part.match(iframeRegex)) {
            // Render the iframe tag
            return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
          }
          else if (part.match(ping)) {
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: '#5865f24d',
                  padding: '2px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  color: '#c9cdfb',
                }}
              >
                {part}
              </Box>
            );
          } else {
            return <React.Fragment key={index}>
              {part}<br />
            </React.Fragment>;
          }
        })}
      </Typography>
    );
  };



  return (
    <Box
      sx={{
        display: 'flex',
        padding: '0px 8px 8px 8px',
        backgroundColor: message.includes('@everyone') || message.includes('@here') ? '#454039' : 'transparent',
        borderLeft: message.includes('@everyone') || message.includes('@here') ? '2px solid #e9a645' : 'none',
        paddingLeft: message.includes('@everyone') || message.includes('@here') ? '15px' : '15px',
        marginRight: '8px',
      }}
    >
      <Avatar
        sx={{
          marginRight: '8px',
          marginTop: '4px',
          width: '40px',
          height: '40px',
        }}
        alt={username}
        src={avatar}
      />
      <Box marginLeft="8px">
        <Typography
          sx={{
            fontSize: '1rem',
            color:
              role === 'Admin'
                ? '#d28cfa'
                : role === 'Owner'
                  ? '#40c4fb'
                  : '#878e95',
          }}
        >
          {username}
          <span style={{ marginLeft: '0.5rem', color: 'grey', fontSize: '0.8rem' }}>{realTime}</span>
        </Typography>
        {renderMessageContent()}
        {image ? (
          <img
            src={image}
            alt="message"
            style={{ maxWidth: '25vw', maxHeight: 'auto', marginTop: '8px', borderRadius: '8px' }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default UserMessage;
