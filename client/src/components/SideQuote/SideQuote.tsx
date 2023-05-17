import * as React from 'react';
import './SideQuote.css';
import quotes, { IQuote } from '../../data/quotes';
import { useEffect } from 'react';

interface IProps {
  selectedGenre: string;
}

const SideQuote = ({ selectedGenre }: IProps) => {
  const [selectedQuote, setSelectedQuote] = React.useState<IQuote>({ quote: '', cite: '' });
  const getRandomQuote = () => {
    const min = 0;
    const max = 9;
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    setSelectedQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [selectedGenre]);

  return (
    <>
      <div className="flex-column h-100-p">
        <div id="quote">
          <blockquote>{selectedQuote.quote}</blockquote>
          <cite>{selectedQuote.cite}</cite>
        </div>
      </div>
    </>
  );
};

export default SideQuote;
