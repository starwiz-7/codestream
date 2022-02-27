import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
const QuestionPane = ({ question, loading }) => {
  const [data, setData] = useState('');

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : question !== '' ? (
        question
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
};

export default QuestionPane;
