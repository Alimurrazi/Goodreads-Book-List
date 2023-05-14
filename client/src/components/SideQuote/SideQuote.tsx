import * as React from 'react';
import './SideQuote.css';

const SideQuote = () => {
  return (
    <>
      <div className="flex-column h-100-p">
        <div id="quote">
          <blockquote>So many books, so little time.</blockquote>
          <cite>Frank Zappa</cite>
        </div>
      </div>
    </>
  );
};

export default SideQuote;
