import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  shorthands,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from '@fluentui/react-components';
import * as React from 'react';

import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import './Book.css';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  card: {
    ...shorthands.margin('auto'),
    width: '720px',
    maxWidth: '100%',
  },
});

function Book() {
  const styles = useStyles();
  const book = {
    title: 'Harry Potter and the Philosopher’s Stone',
    author: 'J.K. Rowling',
    avgRating: 4.47,
    ratings: 9223787,
    firstPublished: 1997,
    totalShelved: 6488,
    img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg',
    description:
      "Harry Potter and the Philosopher's Stone is a 1997 fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school and with the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old. The book was first published in the United Kingdom on 26 June 1997 by Bloomsbury. It was published in the United States the following year by Scholastic Corporation under the title Harry Potter and the Sorcerer's Stone. It won most of the British book awards that were judged by children and other awards in the US. The book reached the top of the New York Times list of best-selling fiction in August 1999 and stayed near the top of that list for much of 1999 and 2000. It has been translated into at least 73 other languages and has been made into a feature-length film of the same name, as have all six of its sequels. The novel has sold in excess of 120 million copies, making it the third best-selling novel of all time. Most reviews were very favourable, commenting on Rowling's imagination, humour, simple, direct style and clever plot construction, although a few complained that the final chapters seemed rushed. The writing has been compared to that of Jane Austen, one of Rowling's favourite authors; Roald Dahl, whose works dominated children's stories before the appearance of Harry Potter; and the ancient Greek story-teller Homer. While some commentators thought the book looked backwards to Victorian and Edwardian boarding school stories, others thought it placed the genre firmly in the modern world by featuring contemporary ethical and social issues, as well as overcoming obstacles like bullies. The Harry Potter series has been used as a source of object lessons in educational techniques, sociological analysis and marketing.",
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="rank">
            <span>1</span>
          </div>
          <div className="pb-16">
            <div className="book-title">{book.title}</div>
            <div className="author">{book.author}</div>
          </div>
        </div>
        <div className="flex-row">
          <img className="bookCover" src={book.img} alt="Preview of a Word document: About Us - Overview" />
          <div className="flex-column meta-info justify-center">
            <span>First Published: {book.firstPublished}</span>
            <span>Rating: {book.avgRating}</span>
            <span>Votes: {book.ratings}</span>
            <span>Shelved as Favourite : {book.totalShelved}</span>
          </div>
        </div>

        <p className="description">{book.description}</p>
      </div>

      {/* 2nd card  */}
      <Card className={styles.card}>
        <CardHeader
          image={<img src={resolveAsset('avatar_elvia.svg')} alt="Elvia Atkins avatar picture" />}
          header={
            <Body1>
              <b>Elvia Atkins</b> mentioned you
            </Body1>
          }
          description={<Caption1>5h ago · About us - Overview</Caption1>}
        />

        <CardPreview logo={<img src={resolveAsset('word_logo.svg')} alt="Microsoft Word document" />}>
          <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document: About Us - Overview" />
        </CardPreview>

        <CardFooter>
          <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
          <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Book;
