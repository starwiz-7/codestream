import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
  IconButton,
  chakra,
} from '@chakra-ui/react';
import { createLocalStorageStateHook } from 'use-local-storage-state';
import Navbar from '../../components/navbar';
import RandomColor from 'randomcolor';
import { useParams } from 'react-router-dom';
import {
  VscChevronRight,
  VscFolderOpened,
  VscGist,
  VscRepoPull,
} from 'react-icons/vsc';
import './room.css';
import language from './languages.json';
//Editor and collab import
import './editor';
import { CodemirrorBinding } from 'y-codemirror';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { UnControlled as Editor } from 'react-codemirror2';
import User from '../../components/user';
import { socket } from '../../socket';

const getName = () => {
  return 'Anonymous shark';
};

const useStorage = createLocalStorageStateHook('name');
export default function App(props) {
  const [darkMode, setDarkMode] = useState('darkMode', () => false);
  const [lang, setLang] = useState('plaintext');
  const [name, setName] = useStorage('name', getName);
  const [users, setUsers] = useState();
  const { slug } = useParams();
  const toast = useToast();
  function handleDarkMode() {
    setDarkMode(!darkMode);
  }
  const [screen, setScreeen] = useState('screen', () => true);
  function handleScreen() {
    setScreeen(!screen);
  }
  const [editorInstance, setEditorInstance] = React.useState(null);
  const handleEditorDidMount = editor => {
    window.editor = editor;
    setEditorInstance(editor);
  };
  const prepareData = slug => {
    return {
      name: name,
      color: 'green',
      roomId: slug,
    };
  };
  React.useEffect(() => {
    console.log(slug);
    socket.emit('join-room', prepareData(slug));
    socket.on('emit-language-changed', lang => {
      console.error('langggg-changes');
      setLang(lang);
      toast({
        title: `${lang} changed`,
        description: 'User changed the language',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
    socket.on('on-join', (userMap, arg) => {
      setUsers(userMap);
      console.error(userMap);
      toast({
        title: `${arg}`,
        description: 'User changed the language',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
    socket.on('user-left', userMap => {
      setUsers(userMap);
    });
  }, []);

  const handleChangeLanguage = lang => {
    setLang(lang);
    console.error('handle-lang');
    socket.emit('language-changed', lang);
  };
  React.useEffect(() => {
    if (editorInstance) {
      const ydoc = new Y.Doc(); //create a ydoc

      let provider = null;
      try {
        provider = new WebrtcProvider('Any Room- Name', ydoc, {
          //Remember the other tab or
          //other user should be in same room for seeing real-time changes
          signaling: [
            'wss://signaling.yjs.dev',
            'wss://y-webrtc-signaling-eu.herokuapp.com',
            'wss://y-webrtc-signaling-us.herokuapp.com',
          ],
        });

        const yText = ydoc.getText('codemirror');

        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; //awareness is what makes other user aware about your actions

        const color = RandomColor(); //Provied any random color to be used for each user

        awareness.setLocalStateField('user', {
          name: name,
          color: color,
        });

        const getBinding = new CodemirrorBinding(
          yText,
          editorInstance,
          awareness,
          {
            yUndoManager,
          }
        );
      } catch (err) {
        alert('error in collaborating try refreshing or come back later !');
      }
      return () => {
        if (provider) {
          provider.disconnect(); //We destroy doc we created and disconnect
          ydoc.destroy(); //the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [editorInstance]);
  return (
    <Flex
      direction="column"
      h="100vh"
      bgColor={darkMode ? '#1e1e1e' : 'white'}
      color={darkMode ? '#cbcaca' : 'inherit'}
    >
      <Navbar screen="room" />
      <Flex flex="1 0" minH={0}>
        <Container
          w="xs"
          bgColor={darkMode ? '#252526' : '#f3f3f3'}
          overflowY="auto"
          maxW="full"
          lineHeight={1.4}
          py={4}
        >
          {/* <ConnectionStatus darkMode={darkMode} connection={connection} /> */}

          <Heading mt={4} mb={1.5} size="sm">
            Language
          </Heading>
          <Select
            size="sm"
            bgColor={darkMode ? '#3c3c3c' : 'white'}
            borderColor={darkMode ? '#3c3c3c' : 'white'}
            value={lang}
            onChange={event => handleChangeLanguage(event.target.value)}
          >
            {language.map(lang => (
              <option key={lang} value={lang} style={{ color: 'black' }}>
                {lang}
              </option>
            ))}
          </Select>

          <Heading mt={4} mb={1.5} size="sm">
            Active Users
          </Heading>
          <Stack spacing={0} mb={1.5} fontSize="sm">
            {/* {users?.map(([id, name, color]) => (
              <chakra.h1 color={color}>{name}</chakra.h1>
            ))} */}
            {/* <chakra.h1>{name}</chakra.h1> */}
            {/* <User
              info={{ name, hue }}
              isMe
              onChangeName={(name) => name.length > 0 && setName(name)}
              onChangeColor={() => setHue(generateHue())}
              darkMode={darkMode}
            />
            {Object.entries(users).map(([id, info]) => (
              <User key={id} info={info} darkMode={darkMode} />
            ))} */}
            <User
              info={{ name }}
              isMe
              onChangeName={name => name.length > 0 && setName(name)}
              // onChangeColor={() => setHue(generateHue())}
              darkMode={darkMode}
            />
            {users?.map(user => {
              let userName = user.name;
              <User info={{ userName }} />;
            })}
          </Stack>
        </Container>
        <Flex flex={1} direction="column">
          <HStack
            h={6}
            spacing={1}
            color="#888888"
            fontWeight="medium"
            fontSize="13px"
            px={3.5}
            flexShrink={0}
          >
            <Icon as={VscFolderOpened} fontSize="md" color="blue.500" />
            <Text>documents</Text>
            <Icon as={VscChevronRight} fontSize="md" />
            <Icon as={VscGist} fontSize="md" color="purple.500" />
            <Text>lol</Text>
          </HStack>
          <Box flex={1} overflow="hidden" style={{ fontSize: '14px' }}>
            <Editor
              position="absolute"
              autoScroll
              options={{
                mode: 'python',
                theme: 'monokai',
                lineWrapping: true,
                smartIndent: true,
                lineNumbers: true,
                foldGutter: true,
                tabSize: 2,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                autoCloseTags: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                extraKeys: {
                  'Ctrl-Space': 'autocomplete',
                },
              }}
              editorDidMount={editor => {
                handleEditorDidMount(editor);
                editor.setSize('100%', '100%');
              }}
            />
          </Box>
          {/* <Flex direction="row">
            <Button>Run</Button>
          </Flex> */}
        </Flex>
      </Flex>
      {/* <Box bgColor="#fff" textAlign="center">
        Star the repo
      </Box> */}
    </Flex>
  );
}
