import React from 'react';
import { Box } from '@mui/material';

import CompleteMessage from '../../components/completeMessage';

const General = () => {
  const messages = [
    {
      username: "Kurizu",
      time: "12:00",
      avatar: "https://cdn.discordapp.com/attachments/970974282681307187/1119105882194726952/kurizutaz.png",
      role: "Owner",
      message: "Yello ppl !",
      image: "https://media.tenor.com/Jsj-LPg73J0AAAAM/cute-animals.gif",
    },
    {
      username: "Chikn_man",
      time: "1:00",
      avatar: "https://cdn.discordapp.com/attachments/1121657823986733077/1121657883164160051/chicken_man4.jpeg",
      role: "Poop Eater",
      message: "You don't know what to write here do you ?",
    },
    {
      username: "Kurizu",
      time: "12:00",
      avatar: "https://cdn.discordapp.com/attachments/970974282681307187/1119105882194726952/kurizutaz.png",
      role: "Owner",
      message: "Nope I have no idea what to write here",
    },
    {
      username: "Kat21",
      time: "12:00",
      avatar: "https://cdn.discordapp.com/attachments/1122159848663027822/1122160050740412467/BigCat01.png",
      role: "User",
      message: "Hello",
    },
  ];

  return (
    <Box width="100%" height="90vh" backgroundColor="#313338" overflow="auto">
      <CompleteMessage messages={messages} />
    </Box>
  );
};

export default General;
