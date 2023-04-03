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

const Book = ({ bookDetails, index }: any) => {
  const styles = useStyles();

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="rank">
            <span>{index + 1}</span>
          </div>
          <div className="pb-16">
            <div className="book-title">{bookDetails.title}</div>
            <div className="author">{bookDetails.author}</div>
          </div>
        </div>
        <div className="flex-row">
          <img className="bookCover" src={bookDetails.img} alt="Preview of a Word document: About Us - Overview" />
          <div className="flex-column meta-info justify-center">
            <span>First Published: {bookDetails.firstPublished}</span>
            <span>Rating: {bookDetails.avgRating}</span>
            <span>Votes: {bookDetails.ratings}</span>
            <span>Shelved as Favourite : {bookDetails.totalShelved}</span>
          </div>
        </div>

        <p className="description">{bookDetails.description}</p>
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
};

export default Book;
