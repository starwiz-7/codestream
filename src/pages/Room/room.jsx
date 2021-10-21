import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { createLocalStorageStateHook } from 'use-local-storage-state';
import Navbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { VscChevronRight, VscFolderOpened, VscGist } from 'react-icons/vsc';
import './room.css';
import language from './languages.json';
import { COLORS } from '../../colors';
//Editor and collab import
import './editor';
import { CodemirrorBinding } from 'y-codemirror';
import RandomColor from 'randomcolor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { UnControlled as Editor } from 'react-codemirror2';
import User from '../../components/user';
import { socket } from '../../socket';
import toast, { Toaster } from 'react-hot-toast';

const useStorage = createLocalStorageStateHook('name');
export default function App() {
  const [darkMode, setDarkMode] = useState('darkMode', () => false);
  const [lang, setLang] = useState('plaintext');
  const [name, setName] = useStorage('Anonymous shark');
  const [users, setUsers] = useState();
  const { slug } = useParams();

  const [editorInstance, setEditorInstance] = React.useState(null);
  const handleEditorDidMount = editor => {
    window.editor = editor;
    setEditorInstance(editor);
  };
  const prepareData = slug => {
    if (name === undefined) {
      setName('Anonymous shark');
    }
    return {
      name: name ? name : 'Anonymous Shark',
      color: 'green',
      roomId: slug,
      lang: lang,
    };
  };
  const changeData = (slug, newName) => {
    setName(newName);
    return {
      name: newName,
      color: 'green',
      roomId: slug,
    };
  };
  React.useEffect(() => {
    // On joining room
    socket.emit('join-room', prepareData(slug));

    //When someone in the room changes the language
    socket.on('emit-language-changed', (lang, langName) => {
      console.error('langggg-changes');
      setLang(lang);
      toast.success(`Language changed to ${langName}`, { duration: 5000 });
    });

    //When someone joins the room
    socket.on('on-join', (userMap, arg, language) => {
      setUsers(userMap);
      console.error(userMap);
      toast.success(`${arg}`, { icon: '🧑', duration: 5000 });
      setLang(language);
    });

    // When someone changes the name in room
    socket.on('name-changed', userMap => {
      setUsers(userMap);
    });

    // When a user leaves the room
    socket.on('user-left', (userMap, user) => {
      setUsers(userMap);
      toast.error(`${user} left the room`, { duration: 5000 });
    });
  }, []);

  const handleChangeLanguage = lang => {
    setLang(lang);
    console.error('handle-lang');
    socket.emit('language-changed', { lang, slug });
  };

  const handleNameChange = newName => {
    toast.success('Name changed successfully', { duration: 5000 });
    socket.emit('name-change', changeData(slug, newName));
  };
  React.useEffect(() => {
    if (editorInstance) {
      const ydoc = new Y.Doc(); //create a ydoc

      let provider = null;
      try {
        provider = new WebrtcProvider(slug, ydoc, {
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
  }, [editorInstance, name]);
  return (
    <Flex
      direction="column"
      h="100vh"
      bgColor={useColorModeValue(COLORS.white, COLORS.dark)}
      // bgColor={darkMode ? '#1e1e1e' : 'white'}
      color={useColorModeValue('#000', 'inherit')}
    >
      <div>
        <Toaster position="bottom-right" />
      </div>
      <Navbar screen="room" slug={slug} />
      <Flex flex="1 0" minH={0}>
        <Container
          w="xs"
          // bgColor={darkMode ? '#252526' : '#f3f3f3'}
          bgColor={useColorModeValue('f3f3f3', COLORS.dark)}
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
            value={lang}
            onChange={event => handleChangeLanguage(event.target.value)}
            // color="white"
          >
            {language.map(lang => (
              <option key={lang.name} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </Select>

          <Heading mt={4} mb={1.5} size="sm">
            Active Users
          </Heading>
          <Stack spacing={0} mb={1.5} fontSize="sm">
            <User
              info={{ name }}
              isMe
              onConfirm={handleNameChange}
              darkMode={darkMode}
            />
            {users?.map(user =>
              user.id !== socket.id ? <User info={user} /> : <></>
            )}
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
            <Text>{slug}</Text>
          </HStack>
          <Box flex={1} overflow="hidden" style={{ fontSize: '14px' }}>
            <Editor
              position="absolute"
              autoScroll
              options={{
                mode: lang,
                theme: useColorModeValue('eclipse', 'material'),
                lineWrapping: true,
                smartIndent: true,
                lineNumbers: true,
                foldGutter: true,
                tabSize: 4,
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
    </Flex>
  );
}
