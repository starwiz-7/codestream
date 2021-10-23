import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Textarea,
} from '@chakra-ui/react';
//Icons
import { BsCodeSlash } from 'react-icons/bs';
export default function Compile({ editor }) {
  let [output, setOutput] = useState('');
  const handleOutput = () => {
    setOutput(editor.getValue());
  };
  return (
    <Box>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Input</Tab>
          <Tab>Output</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Textarea placeholder="Input" fontSize="13px" />
          </TabPanel>
          <TabPanel>
            <Textarea
              isDisabled
              placeholder="Output"
              fontSize="13px"
              value={output}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={handleOutput} float="right" leftIcon={<BsCodeSlash />}>
        Run
      </Button>
    </Box>
  );
}
