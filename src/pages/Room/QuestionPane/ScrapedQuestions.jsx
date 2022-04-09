//@ts-nocheck
import React, { createRef } from 'react';
import parse from 'html-react-parser';
import './ProblemPage.css';
import { Divider, useColorModeValue } from '@chakra-ui/react';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';

const ScrapedQuestion = ({ hostname, htmlString }) => {
  const MathRef = createRef();
  const color = useColorModeValue('#2d2d30', 'whitesmoke');
  React.useEffect(() => {
    if (MathRef) {
      renderMathInElement(MathRef.current, {
        delimiters: [
          { left: '$$$', right: '$$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '%%', right: '%%', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
      });
    }
  }, [MathRef]);

  return (
    <div>
      {hostname === 'codeforces.com' ? (
        <div
          className={'codeforces'}
          ref={MathRef}
          style={{
            color: color,
          }}
        >
          <div>{parse(htmlString)}</div>
        </div>
      ) : (
        <div className={'atcoder'} ref={MathRef}>
          <div>{parse(htmlString)}</div>
        </div>
      )}
      <Divider />
    </div>
  );
};
export default ScrapedQuestion;
