import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
//Icons
import { BsCodeSlash } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { socket } from '../../socket';

export default function Compile({ editor, language }) {
  let [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  let [input, setInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState(false);

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setInput(inputValue);
    socket.emit('input-data', { data: inputValue });
  };

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  async function compileCode() {
    setLoading(true);
    socket.emit('execute-code-start');
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER}/api/execute`,
      data: {
        script: editor.getValue(),
        lang: language,
        stdin: input,
      },
      responseType: 'json',
    });
    socket.emit('code-executed', { data: response.data });
    if (response.data.memory === null || response.data.memory === null) {
      setError(true);
      toast.error('Error encountered while execution');
    } else {
      setError(false);
      toast.success('Code executed successfully!!');
    }
    setOutput(response.data.output);
    setTabIndex(1);
    setLoading(false);
  }
  useEffect(() => {
    var toastId;
    socket.on('emit-execute-code-start', () => {
      toastId = toast.loading('Compiling....');
      setLoading(true);
    });
    socket.on('emit-code-executed', response => {
      toast.dismiss(toastId);
      setOutput(response.output);
      setTabIndex(1);
      setLoading(false);
    });
    socket.on('emit-input-data', ({ inputData }) => {
      setInput(inputData);
    });
  }, []);

  return (
    <Box>
      <Tabs
        isFitted
        variant="enclosed"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList mb="1em">
          <Tab>Input</Tab>
          <Tab>Output</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Textarea
              placeholder="Input"
              fontSize="13px"
              value={input}
              onChange={handleInputChange}
              height={150}
              resize="none"
            />
          </TabPanel>
          <TabPanel>
            <Textarea
              isReadOnly
              placeholder="Output"
              fontSize="13px"
              value={output}
              height={150}
              resize="none"
              color={useColorModeValue(
                error ? ('red.500', 'red.500') : ('white', 'black')
              )}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        onClick={compileCode}
        float="right"
        leftIcon={<BsCodeSlash />}
        isLoading={loading}
        loadingText="Compiling"
        bgColor="green.400"
        _hover={{ bgColor: 'green.600' }}
        _active={{ bgColor: 'green.400' }}
        disabled={language === 'plaintext'}
      >
        Run
      </Button>
    </Box>
  );
}
