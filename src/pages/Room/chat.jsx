import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import './room.css';
import { socket } from 'src/socket';
import { COLORS } from '../../colors';

const Chat = ({ name, id }) => {
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);

  let chatBg = useColorModeValue('#383B40', '#F1F2F6');
  let textBg = useColorModeValue('white', 'black');
  useEffect(() => {
    socket.on('message', messageData => {
      receivedMessages(messageData);
    });

    const receivedMessages = newMessage => {
      setMessageData(messageData => {
        return [...messageData, newMessage];
      });
    };
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    console.log('cool');
    if (!message) return;
    console.log('Hello');
    const messageObject = {
      messages: [message],
      userInfo: {
        name: name,
      },
      socketId: id,
    };
    setMessageData(messageData => {
      return [...messageData, messageObject];
    });
    setMessage('');
    socket.emit('send-message', messageObject);
  };
  return (
    <Flex direction="column">
      <Heading mt={4} mb={1.5} size="sm">
        Chat
      </Heading>
      <Flex
        fontSize="sm"
        height={300}
        overflowX="hidden"
        overflowY="auto"
        py={4}
        className="chat-box"
        px={2}
        flexGrow={1}
        direction="column"
        border="1px solid"
        borderColor={useColorModeValue(COLORS.dark, COLORS.white)}
      >
        {messageData.map((element, index) => {
          if (element.socketId === id) {
            // return <ChatMsg isMe messages={[...element.messages]} />;
            return (
              <Box
                borderRadius={'20px 20px 0 20px'}
                float={'right'}
                padding={2}
                maxWidth={200}
                bgColor={'#0086FF'}
                color="white"
                mt={5}
                ml={'auto'}
              >
                {element.messages[0]}
              </Box>
            );
          }

          // return <ChatMsg messages={[...element.messages]} />;
          return (
            <div>
              <Box
                borderRadius={'20px 20px 20px 0px'}
                float={'left'}
                padding={2}
                maxWidth={200}
                bgColor={chatBg}
                color={textBg}
                mt={5}
                mr={'auto'}
              >
                {element.messages[0]}
              </Box>
              {/* <p>{element.userInfo.name}</p> */}
            </div>
          );
        })}
      </Flex>
      <Flex direction="row" mt={5}>
        <Input
          mr={2}
          placeholder="Enter Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
