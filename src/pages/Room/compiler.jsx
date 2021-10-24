import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Textarea,
} from '@chakra-ui/react';
//Icons
import { BsCodeSlash } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Compile({ editor, language }) {
  let [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  let [input, setInput] = useState('');
  const [tabIndex, setTabIndex] = React.useState(0);

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setInput(inputValue);
  };

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  async function compileCode() {
    setLoading(true);
    const response = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/execute`,
      data: {
        script: editor.getValue(),
        lang: language,
        stdin: input,
      },
      responseType: 'json',
    });
    setOutput(response.data.output);
    setTabIndex(1);
    setLoading(false);
  }
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
