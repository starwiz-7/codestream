import React from 'react';
import parse from 'html-react-parser';
import './ProblemPage.css';
import { Box, Divider } from '@chakra-ui/react';

const LeetCode = ({ question, name }) => {
  return (
    <div>
      <Box className="leetcode">
        <h1>{name}</h1>
        {parse(question)}
      </Box>
    </div>
  );
};

export default LeetCode;
