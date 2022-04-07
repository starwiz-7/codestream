import React from 'react';
import { Spinner } from '@chakra-ui/react';
import ScrapedQuestion from './ScrapedQuestions';
import LeetCode from './Leetcode';
const QuestionPane = ({ question, loading }) => {
  const host = question.hostname;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : question !== '' ? (
        host === 'leetcode.com' ? (
          <LeetCode
            question={question.htmlString}
            name={question.questionName}
          />
        ) : (
          <ScrapedQuestion hostname={host} htmlString={question.htmlString} />
        )
      ) : (
        <div>Add a question!</div>
      )}
    </div>
  );
};

export default QuestionPane;
