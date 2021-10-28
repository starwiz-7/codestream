import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import './room.css';

const Chat = () => {
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
        direction="column-reverse"
      >
        <Box
          borderRadius="20px 20px 0 20px"
          backgroundColor="#0086FF"
          float="right"
          padding={2}
          maxWidth={200}
          color="white"
          mt={5}
          ml="auto"
        >
          Helloooooo
          HellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHelloooooo
          HellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHelloooooo
          HellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHellooooooHelloooooo
        </Box>
        <Box
          borderRadius="20px 20px 20px 0px"
          float="left"
          padding={2}
          maxWidth={200}
          bgColor={useColorModeValue('#383B40', '#383B40')}
          color="white"
          mt={5}
          mr="auto"
        >
          Helloooooo
        </Box>
        <Box
          borderRadius="20px 20px 20px 0px"
          float="left"
          padding={2}
          maxWidth={200}
          bgColor={useColorModeValue('#383B40', '#383B40')}
          color="white"
          mt={5}
          mr="auto"
        >
          Helloooooo
        </Box>
      </Flex>
      <Flex direction="row" mt={10}>
        <Input mr={2} placeholder="Enter Message" />
        <Button>Send</Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
