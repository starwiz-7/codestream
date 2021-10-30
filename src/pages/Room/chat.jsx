import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Heading,
  chakra,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import './room.css';
import { socket } from 'src/socket';
import { COLORS } from '../../colors';
import { VscAccount } from 'react-icons/vsc';

const Chat = ({ name, id }) => {
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const chatBoxRef = useRef(null);
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

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollIntoView();
  }, [messageData]);
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
        {messageData.map(element => {
          if (element.socketId === id) {
            return (
              <Flex
                direction="column"
                position="relative"
                float="right"
                ml="auto"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Flex
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                >
                  <Box
                    borderRadius={'20px 20px 0px 20px'}
                    mr={2}
                    padding={2}
                    maxWidth={200}
                    bgColor={'#0086FF'}
                    color="white"
                    mt={5}
                  >
                    {element.messages[0]}
                  </Box>

                  <Icon as={VscAccount} boxSize={6} />
                </Flex>
              </Flex>
            );
          }

          return (
            <Flex
              direction="column"
              position="relative"
              float="left"
              mr="auto"
              justifyContent="flex-start"
              alignItems="flex-start"
              ref={chatBoxRef}
            >
              <Flex
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-start"
              >
                <Icon as={VscAccount} boxSize={6} />
                <Box
                  borderRadius={'20px 20px 20px 0px'}
                  ml={2}
                  padding={2}
                  maxWidth={200}
                  bgColor={chatBg}
                  color={textBg}
                  mt={5}
                >
                  {element.messages[0]}
                </Box>
              </Flex>
              <chakra.p>{element.userInfo.name}</chakra.p>
            </Flex>
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
